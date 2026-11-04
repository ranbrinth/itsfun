import { createRequire } from "node:module";
import {
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
  type TransactionInstruction,
} from "@solana/web3.js";
import {
  NATIVE_MINT,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import BN from "bn.js";
import { HELIUS_RPC, JUPITER_API } from "./secrets.server";

// Static import so the production bundle traces the CJS SDK (createRequire alone is invisible to the tracer).
import "@pump-fun/pump-sdk";

const nodeRequire = createRequire(import.meta.url);
const {
  OnlinePumpSdk,
  PUMP_SDK,
  getBuyTokenAmountFromSolAmount,
  getSellSolAmountFromTokenAmount,
  normalizeQuoteMint,
} = nodeRequire("@pump-fun/pump-sdk") as {
  OnlinePumpSdk: new (connection: Connection) => {
    fetchGlobal: () => Promise<Record<string, unknown>>;
    fetchFeeConfig: () => Promise<unknown>;
    fetchBondingCurve: (mint: PublicKey) => Promise<CurveAccount>;
    fetchBuyState: (mint: PublicKey, user: PublicKey, tokenProgram: PublicKey) => Promise<BuyState>;
    fetchSellState: (mint: PublicKey, user: PublicKey, tokenProgram: PublicKey) => Promise<SellState>;
  };
  PUMP_SDK: {
    createV2Instruction: (args: Record<string, unknown>) => Promise<TransactionInstruction>;
    createV2AndBuyInstructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
    buyInstructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
    sellInstructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
  };
  getBuyTokenAmountFromSolAmount: (args: Record<string, unknown>) => BN;
  getSellSolAmountFromTokenAmount: (args: Record<string, unknown>) => BN;
  normalizeQuoteMint: (mint: PublicKey) => PublicKey;
};

type CurveAccount = {
  complete: boolean;
  realSolReserves: BN;
  tokenTotalSupply: BN;
  quoteMint: PublicKey;
  creator: PublicKey;
  isMayhemMode: boolean;
};

type BuyState = {
  bondingCurveAccountInfo: unknown;
  bondingCurve: CurveAccount;
  associatedUserAccountInfo: unknown;
};

type SellState = BuyState;

const connection = new Connection(HELIUS_RPC, "confirmed");
const online = new OnlinePumpSdk(connection);

const TOKEN_DECIMALS = 6;

function solToLamports(sol: number): BN {
  if (!Number.isFinite(sol) || sol < 0) throw new Error("Invalid SOL amount.");
  return new BN(Math.round(sol * 1_000_000_000));
}

function tokensToRaw(amount: number): BN {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Invalid token amount.");
  return new BN(Math.round(amount * 10 ** TOKEN_DECIMALS));
}

async function tokenProgramOf(mint: PublicKey): Promise<PublicKey> {
  const info = await connection.getAccountInfo(mint);
  if (!info) throw new Error("Mint account not found on mainnet.");
  if (info.owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  if (info.owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
  throw new Error("That address is not an SPL token mint.");
}

async function pack(payer: PublicKey, instructions: TransactionInstruction[], units: number) {
  const ixs = [
    ComputeBudgetProgram.setComputeUnitLimit({ units }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 150_000 }),
    ...instructions,
  ];
  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  const message = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions: ixs,
  }).compileToV0Message();
  const tx = new VersionedTransaction(message);
  return Buffer.from(tx.serialize()).toString("base64");
}

export async function buildLaunchTx(input: {
  user: string;
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  sol: number;
  holderReward: boolean;
}) {
  const user = new PublicKey(input.user);
  const mint = new PublicKey(input.mint);
  const name = input.name.trim();
  const symbol = input.symbol.trim();
  const uri = input.uri.trim();
  if (name.length < 1 || name.length > 32) throw new Error("Name must be 1–32 characters.");
  if (symbol.length < 1 || symbol.length > 10) throw new Error("Ticker must be 1–10 characters.");
  if (uri.length < 8 || uri.length > 200) throw new Error("Metadata URI is invalid.");

  const [global, feeConfig] = await Promise.all([online.fetchGlobal(), online.fetchFeeConfig()]);
  const solAmount = solToLamports(input.sol);

  if (solAmount.isZero()) {
    const ix = await PUMP_SDK.createV2Instruction({
      mint,
      name,
      symbol,
      uri,
      creator: user,
      user,
      mayhemMode: false,
      holderReward: input.holderReward,
    });
    return {
      tx: await pack(user, [ix], 300_000),
      estimatedTokens: "0",
      mode: "create" as const,
    };
  }

  if (input.sol > 100) throw new Error("Initial buy is capped at 100 SOL.");

  const amount = getBuyTokenAmountFromSolAmount({
    global,
    feeConfig,
    mintSupply: null,
    bondingCurve: null,
    amount: solAmount,
    quoteMint: NATIVE_MINT,
  });
  if (amount.isZero()) throw new Error("Quote returned zero tokens. Raise the buy amount.");

  const ixs = await PUMP_SDK.createV2AndBuyInstructions({
    global,
    mint,
    name,
    symbol,
    uri,
    creator: user,
    user,
    amount,
    solAmount,
    mayhemMode: false,
    holderReward: input.holderReward,
  });

  return {
    tx: await pack(user, ixs, 500_000),
    estimatedTokens: (Number(amount.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    }),
    mode: "create-buy" as const,
  };
}

function curveSummary(curve: {
  complete: boolean;
  realSolReserves: BN;
  tokenTotalSupply: BN;
  quoteMint: PublicKey;
  creator: PublicKey;
}) {
  const quote = normalizeQuoteMint(curve.quoteMint);
  const solQuoted = quote.equals(NATIVE_MINT);
  const realSol = Number(curve.realSolReserves.toString()) / 1e9;
  return {
    complete: curve.complete,
    solQuoted,
    quoteMint: quote.toBase58(),
    realSol,
    creator: curve.creator.toBase58(),
    supply: Number(curve.tokenTotalSupply.toString()) / 10 ** TOKEN_DECIMALS,
  };
}

export async function readCoin(mintStr: string, userStr?: string) {
  const mint = new PublicKey(mintStr);
  const program = await tokenProgramOf(mint);

  let curve: CurveAccount | null = null;
  try {
    curve = await online.fetchBondingCurve(mint);
  } catch {
    curve = null;
  }

  let balanceRaw = "0";
  let balanceUi = 0;
  if (userStr) {
    const user = new PublicKey(userStr);
    const ata = getAssociatedTokenAddressSync(mint, user, true, program);
    try {
      const bal = await connection.getTokenAccountBalance(ata);
      balanceRaw = bal.value.amount;
      balanceUi = Number(bal.value.uiAmountString ?? "0");
    } catch {
      balanceUi = 0;
    }
  }

  const sol = userStr ? (await connection.getBalance(new PublicKey(userStr))) / 1e9 : 0;

  let meta: { name: string; symbol: string; image: string } | null = null;
  try {
    const das = (await rpc("getAsset", { id: mint.toBase58() })) as {
      content?: { metadata?: { name?: string; symbol?: string }; links?: { image?: string } };
    };
    meta = {
      name: das.content?.metadata?.name ?? "",
      symbol: das.content?.metadata?.symbol ?? "",
      image: das.content?.links?.image ?? "",
    };
  } catch {
    meta = null;
  }

  return {
    mint: mint.toBase58(),
    tokenProgram: program.equals(TOKEN_2022_PROGRAM_ID) ? "token-2022" : "spl",
    curve: curve ? curveSummary(curve) : null,
    balanceUi,
    balanceRaw,
    sol,
    meta,
  };
}

async function rpc(method: string, params: unknown) {
  const res = await fetch(HELIUS_RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = (await res.json()) as { result?: unknown; error?: { message?: string } };
  if (json.error) throw new Error(json.error.message || "RPC error");
  return json.result;
}

export async function buildTradeTx(input: {
  user: string;
  mint: string;
  side: "buy" | "sell";
  sol: number;
  tokens: number;
  slippage: number;
}) {
  const user = new PublicKey(input.user);
  const mint = new PublicKey(input.mint);
  const slippage = Math.min(50, Math.max(1, Math.round(input.slippage || 5)));
  const program = await tokenProgramOf(mint);

  let curve;
  try {
    curve = await online.fetchBondingCurve(mint);
  } catch {
    curve = null;
  }

  const summary = curve ? curveSummary(curve) : null;
  const onCurve = summary && !summary.complete && summary.solQuoted;

  if (!onCurve) {
    return buildJupiterTx({
      user: user.toBase58(),
      mint: mint.toBase58(),
      side: input.side,
      sol: input.sol,
      tokens: input.tokens,
      slippageBps: slippage * 100,
    });
  }

  const [global, feeConfig, buyState] = await Promise.all([
    online.fetchGlobal(),
    online.fetchFeeConfig(),
    input.side === "buy"
      ? online.fetchBuyState(mint, user, program)
      : online.fetchSellState(mint, user, program),
  ]);

  if (input.side === "buy") {
    const solAmount = solToLamports(input.sol);
    if (solAmount.lten(10_000)) throw new Error("Buy at least 0.00001 SOL.");
    const state = buyState as BuyState;
    const amount = getBuyTokenAmountFromSolAmount({
      global,
      feeConfig,
      mintSupply: state.bondingCurve.tokenTotalSupply,
      bondingCurve: state.bondingCurve,
      amount: solAmount,
      quoteMint: NATIVE_MINT,
    });
    const ixs = await PUMP_SDK.buyInstructions({
      global,
      bondingCurveAccountInfo: state.bondingCurveAccountInfo,
      bondingCurve: state.bondingCurve,
      associatedUserAccountInfo: state.associatedUserAccountInfo,
      mint,
      user,
      amount,
      solAmount,
      slippage,
      tokenProgram: program,
    });
    return {
      tx: await pack(user, ixs, 300_000),
      venue: "curve" as const,
      outLabel: `${(Number(amount.toString()) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 0 })} tokens`,
    };
  }

  const state = buyState as SellState;
  const amount = tokensToRaw(input.tokens);
  const solOut = getSellSolAmountFromTokenAmount({
    global,
    feeConfig,
    mintSupply: state.bondingCurve.tokenTotalSupply,
    bondingCurve: state.bondingCurve,
    amount,
  });
  const ixs = await PUMP_SDK.sellInstructions({
    global,
    bondingCurveAccountInfo: state.bondingCurveAccountInfo,
    bondingCurve: state.bondingCurve,
    mint,
    user,
    amount,
    solAmount: solOut,
    slippage,
    tokenProgram: program,
    mayhemMode: state.bondingCurve.isMayhemMode,
  });
  return {
    tx: await pack(user, ixs, 300_000),
    venue: "curve" as const,
    outLabel: `${(Number(solOut.toString()) / 1e9).toFixed(4)} SOL`,
  };
}

async function buildJupiterTx(input: {
  user: string;
  mint: string;
  side: "buy" | "sell";
  sol: number;
  tokens: number;
  slippageBps: number;
}) {
  const inputMint = input.side === "buy" ? NATIVE_MINT.toBase58() : input.mint;
  const outputMint = input.side === "buy" ? input.mint : NATIVE_MINT.toBase58();
  const amount =
    input.side === "buy" ? solToLamports(input.sol).toString() : tokensToRaw(input.tokens).toString();
  if (amount === "0") throw new Error("Amount is zero.");

  const quoteUrl = new URL("https://api.jup.ag/swap/v1/quote");
  quoteUrl.searchParams.set("inputMint", inputMint);
  quoteUrl.searchParams.set("outputMint", outputMint);
  quoteUrl.searchParams.set("amount", amount);
  quoteUrl.searchParams.set("slippageBps", String(input.slippageBps));

  const quoteRes = await fetch(quoteUrl, { headers: { "x-api-key": JUPITER_API } });
  if (!quoteRes.ok) {
    const text = await quoteRes.text();
    throw new Error(`Jupiter quote failed (${quoteRes.status}): ${text.slice(0, 180)}`);
  }
  const quote = await quoteRes.json();

  const swapRes = await fetch("https://api.jup.ag/swap/v1/swap", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": JUPITER_API },
    body: JSON.stringify({
      quoteResponse: quote,
      userPublicKey: input.user,
      wrapAndUnwrapSol: true,
      dynamicComputeUnitLimit: true,
    }),
  });
  if (!swapRes.ok) {
    const text = await swapRes.text();
    throw new Error(`Jupiter swap failed (${swapRes.status}): ${text.slice(0, 180)}`);
  }
  const swap = (await swapRes.json()) as { swapTransaction?: string };
  if (!swap.swapTransaction) throw new Error("Jupiter did not return a transaction.");

  const outAmount = Number((quote as { outAmount?: string }).outAmount ?? "0");
  const outLabel =
    input.side === "buy"
      ? `${(outAmount / 1e6).toLocaleString("en-US", { maximumFractionDigits: 2 })} tokens`
      : `${(outAmount / 1e9).toFixed(4)} SOL`;

  return { tx: swap.swapTransaction, venue: "jupiter" as const, outLabel };
}

export async function submitSigned(txB64: string) {
  const raw = Buffer.from(txB64, "base64");
  const signature = await connection.sendRawTransaction(raw, {
    skipPreflight: false,
    maxRetries: 3,
  });
  const latest = await connection.getLatestBlockhash("confirmed");
  const result = await Promise.race([
    connection.confirmTransaction({ signature, ...latest }, "confirmed"),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 25_000)),
  ]);
  if (result && result.value.err) {
    throw new Error(`Transaction failed: ${JSON.stringify(result.value.err)}`);
  }
  return { signature, confirmed: Boolean(result && !result.value.err) };
}

export async function walletSol(user: string) {
  const lamports = await connection.getBalance(new PublicKey(user));
  return { sol: lamports / 1e9 };
}
