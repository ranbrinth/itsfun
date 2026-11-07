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
  unpackMint,
} from "@solana/spl-token";
import BN from "bn.js";
import { JUPITER_API, SOLANA_RPC_DEVNET, SOLANA_RPC_MAINNET } from "./secrets.server";
import { type Cluster } from "./cluster";

export { parseCluster, type Cluster } from "./cluster";

const nodeRequire = createRequire(import.meta.url);
const {
  OnlinePumpSdk,
  PUMP_SDK,
  getBuyTokenAmountFromSolAmount,
  getSellSolAmountFromTokenAmount,
  normalizeQuoteMint,
} = nodeRequire("@pump-fun/pump-sdk") as {
  OnlinePumpSdk: new (connection: Connection) => Online;
  PUMP_SDK: PumpSdk;
  getBuyTokenAmountFromSolAmount: (args: Record<string, unknown>) => BN;
  getSellSolAmountFromTokenAmount: (args: Record<string, unknown>) => BN;
  normalizeQuoteMint: (mint: PublicKey) => PublicKey;
};

type CurveAccount = {
  complete: boolean;
  realSolReserves: BN;
  realQuoteReserves: BN;
  tokenTotalSupply: BN;
  quoteMint: PublicKey;
  creator: PublicKey;
  isMayhemMode: boolean;
  creatorFeeBps: BN;
};

type BuyState = {
  bondingCurveAccountInfo: unknown;
  bondingCurve: CurveAccount;
  associatedUserAccountInfo: unknown;
};

type GlobalView = {
  tokenTotalSupply: BN;
  feeBasisPoints: BN;
  creatorFeeBasisPoints: BN;
  creatorFeeConfigurable: boolean;
  maxConfigurableCreatorFeeBps: BN;
  isHolderRewardEnabled: boolean;
};

type ResolvedQuote = {
  mint: PublicKey;
  source: string;
  decimals: number;
  quoteTokenProgram: PublicKey;
  pumpQuote?: { curve: unknown; accounts: unknown };
};

type Online = {
  fetchGlobal: () => Promise<GlobalView>;
  fetchFeeConfig: () => Promise<unknown>;
  fetchQuoteControl: () => Promise<unknown>;
  fetchBondingCurve: (mint: PublicKey) => Promise<CurveAccount>;
  fetchBuyState: (mint: PublicKey, user: PublicKey, tokenProgram: PublicKey) => Promise<BuyState>;
  fetchSellState: (mint: PublicKey, user: PublicKey, tokenProgram: PublicKey) => Promise<BuyState>;
  fetchSupportedQuoteMints: () => Promise<{ mint: PublicKey; source: string }[]>;
  resolveQuoteMint: (mint?: PublicKey) => Promise<ResolvedQuote>;
  fetchQuoteTokenProgram: (mint: PublicKey) => Promise<PublicKey>;
  getCreatorVaultQuoteBalances: (creator: PublicKey) => Promise<
    { mint: PublicKey; total: BN; pumpVault: BN; ammVault: BN }[]
  >;
  collectCoinCreatorFeeAllQuotesInstructions: (creator: PublicKey) => Promise<TransactionInstruction[]>;
  collectCoinCreatorFeeInstructions: (creator: PublicKey) => Promise<TransactionInstruction[]>;
};

type PumpSdk = {
  createV2Instruction: (args: Record<string, unknown>) => Promise<TransactionInstruction>;
  createV2AndBuyV2Instructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
  buyInstructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
  sellInstructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
  buyV2Instructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
  sellV2Instructions: (args: Record<string, unknown>) => Promise<TransactionInstruction[]>;
};

const TOKEN_DECIMALS = 6;
const SOL_MINT = NATIVE_MINT.toBase58();
const USDC_MAINNET = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const USDC_DEVNET = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

const pools = new Map<Cluster, { connection: Connection; online: Online; rpc: string }>();

function pool(cluster: Cluster) {
  let hit = pools.get(cluster);
  if (!hit) {
    const rpc = cluster === "devnet" ? SOLANA_RPC_DEVNET : SOLANA_RPC_MAINNET;
    const connection = new Connection(rpc, "confirmed");
    hit = { connection, online: new OnlinePumpSdk(connection), rpc };
    pools.set(cluster, hit);
  }
  return hit;
}

function solToLamports(sol: number): BN {
  if (!Number.isFinite(sol) || sol < 0) throw new Error("Invalid SOL amount.");
  return new BN(Math.round(sol * 1_000_000_000));
}

function uiToRaw(amount: number, decimals: number): BN {
  if (!Number.isFinite(amount) || amount < 0) throw new Error("Invalid amount.");
  return new BN(Math.round(amount * 10 ** decimals));
}

function tokensToRaw(amount: number): BN {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Invalid token amount.");
  return new BN(Math.round(amount * 10 ** TOKEN_DECIMALS));
}

function quoteLabel(mint: PublicKey): string {
  if (mint.equals(NATIVE_MINT) || mint.equals(PublicKey.default)) return "SOL";
  const id = mint.toBase58();
  if (id === USDC_MAINNET || id === USDC_DEVNET) return "USDC";
  return `${id.slice(0, 4)}…${id.slice(-4)}`;
}

function knownDecimals(mint: PublicKey): number | null {
  if (mint.equals(NATIVE_MINT) || mint.equals(PublicKey.default)) return 9;
  const id = mint.toBase58();
  if (id === USDC_MAINNET || id === USDC_DEVNET) return 6;
  return null;
}

function formatRaw(raw: BN, decimals: number) {
  const n = Number(raw.toString()) / 10 ** decimals;
  return n.toLocaleString("en-US", { maximumFractionDigits: Math.min(decimals, 4) });
}

async function tokenProgramOf(connection: Connection, mint: PublicKey, cluster: Cluster): Promise<PublicKey> {
  const info = await connection.getAccountInfo(mint);
  if (!info) throw new Error(`Mint account not found on ${cluster}.`);
  if (info.owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  if (info.owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
  throw new Error("That address is not an SPL token mint.");
}

async function pack(
  connection: Connection,
  payer: PublicKey,
  instructions: TransactionInstruction[],
  units: number,
) {
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

function feeBps(input: number): BN | undefined {
  if (!Number.isFinite(input) || input <= 0) return undefined;
  if (!Number.isInteger(input)) throw new Error("Creator fee must be a whole number of basis points.");
  return new BN(input);
}

export async function launchConfig(cluster: Cluster) {
  const { online } = pool(cluster);
  const [global, listed] = await Promise.all([online.fetchGlobal(), online.fetchSupportedQuoteMints()]);
  const resolved = await Promise.all(
    listed.map(async (entry) => {
      try {
        const full = await online.resolveQuoteMint(entry.mint);
        return {
          mint: full.mint.toBase58(),
          label: quoteLabel(full.mint),
          decimals: full.decimals,
          source: entry.source,
        };
      } catch {
        return {
          mint: normalizeQuoteMint(entry.mint).toBase58(),
          label: quoteLabel(entry.mint),
          decimals: knownDecimals(entry.mint) ?? 6,
          source: entry.source,
        };
      }
    }),
  );
  const quotes = resolved.filter((q, i, all) => all.findIndex((o) => o.mint === q.mint) === i);
  if (!quotes.some((q) => q.label === "SOL")) {
    quotes.unshift({ mint: SOL_MINT, label: "SOL", decimals: 9, source: "sol" });
  }
  const supplyRaw = global.tokenTotalSupply.toString();
  return {
    supply: (Number(supplyRaw) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US"),
    supplyRaw,
    decimals: TOKEN_DECIMALS,
    protocolFeeBps: Number(global.feeBasisPoints.toString()),
    scheduleCreatorFeeBps: Number(global.creatorFeeBasisPoints.toString()),
    creatorFeeConfigurable: Boolean(global.creatorFeeConfigurable),
    maxCreatorFeeBps: Number(global.maxConfigurableCreatorFeeBps.toString()),
    holderRewardEnabled: Boolean(global.isHolderRewardEnabled),
    quotes,
  };
}

export async function previewLaunch(input: {
  cluster: Cluster;
  quoteMint: string;
  quoteUi: number;
  creatorFeeBps: number;
}) {
  const { online } = pool(input.cluster);
  const [global, feeConfig, quoteControl, resolved] = await Promise.all([
    online.fetchGlobal(),
    online.fetchFeeConfig(),
    online.fetchQuoteControl(),
    online.resolveQuoteMint(new PublicKey(input.quoteMint || SOL_MINT)),
  ]);
  const bps = feeBps(input.creatorFeeBps);
  const raw = uiToRaw(input.quoteUi, resolved.decimals);
  let estimated = "0";
  if (!raw.isZero()) {
    const amount = getBuyTokenAmountFromSolAmount({
      global,
      feeConfig,
      mintSupply: null,
      bondingCurve: null,
      amount: raw,
      quoteMint: resolved.mint,
      quoteControl,
      creatorFeeBps: bps,
      pumpQuote: resolved.pumpQuote?.curve,
    });
    estimated = (Number(amount.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });
  }
  return {
    supply: (Number(global.tokenTotalSupply.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US"),
    decimals: TOKEN_DECIMALS,
    protocolFeeBps: Number(global.feeBasisPoints.toString()),
    scheduleCreatorFeeBps: Number(global.creatorFeeBasisPoints.toString()),
    creatorFeeBps: bps ? Number(bps.toString()) : 0,
    estimatedTokens: estimated,
    quoteLabel: quoteLabel(resolved.mint),
    quoteMint: resolved.mint.toBase58(),
    quoteDecimals: resolved.decimals,
  };
}

export async function buildLaunchTx(input: {
  cluster: Cluster;
  user: string;
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  sol: number;
  holderReward: boolean;
  quoteMint: string;
  creatorFeeBps: number;
}) {
  const { connection, online } = pool(input.cluster);
  const user = new PublicKey(input.user);
  const mint = new PublicKey(input.mint);
  const name = input.name.trim();
  const symbol = input.symbol.trim();
  const uri = input.uri.trim();
  if (name.length < 1 || name.length > 32) throw new Error("Name must be 1–32 characters.");
  if (symbol.length < 1 || symbol.length > 10) throw new Error("Ticker must be 1–10 characters.");
  if (uri.length < 8 || uri.length > 200) throw new Error("Metadata URI is invalid.");

  const [global, feeConfig, quoteControl, resolved] = await Promise.all([
    online.fetchGlobal(),
    online.fetchFeeConfig(),
    online.fetchQuoteControl(),
    online.resolveQuoteMint(new PublicKey(input.quoteMint || SOL_MINT)),
  ]);
  const bps = feeBps(input.creatorFeeBps);
  const quoteAmount = uiToRaw(input.sol, resolved.decimals);
  const quoteArgs = {
    quoteMint: resolved.mint,
    quoteTokenProgram: resolved.quoteTokenProgram,
    creatorFeeBps: bps,
    holderReward: input.holderReward,
    pumpQuote: resolved.pumpQuote?.accounts,
  };

  if (quoteAmount.isZero()) {
    const ix = await PUMP_SDK.createV2Instruction({
      mint,
      name,
      symbol,
      uri,
      creator: user,
      user,
      mayhemMode: false,
      ...quoteArgs,
    });
    return {
      tx: await pack(connection, user, [ix], 400_000),
      estimatedTokens: "0",
      mode: "create" as const,
      quoteLabel: quoteLabel(resolved.mint),
    };
  }

  if (resolved.mint.equals(NATIVE_MINT) && input.sol > 100) throw new Error("Initial buy is capped at 100 SOL.");
  if (input.sol > 1_000_000) throw new Error("Initial buy is too large.");

  const amount = getBuyTokenAmountFromSolAmount({
    global,
    feeConfig,
    mintSupply: null,
    bondingCurve: null,
    amount: quoteAmount,
    quoteMint: resolved.mint,
    quoteControl,
    creatorFeeBps: bps,
    pumpQuote: resolved.pumpQuote?.curve,
  });
  if (amount.isZero()) throw new Error("Quote returned zero tokens. Raise the buy amount.");

  const ixs = await PUMP_SDK.createV2AndBuyV2Instructions({
    global,
    mint,
    name,
    symbol,
    uri,
    creator: user,
    user,
    amount,
    quoteAmount,
    mayhemMode: false,
    slippage: 5,
    ...quoteArgs,
  });

  return {
    tx: await pack(connection, user, ixs, 600_000),
    estimatedTokens: (Number(amount.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    }),
    mode: "create-buy" as const,
    quoteLabel: quoteLabel(resolved.mint),
  };
}

function curveSummary(curve: CurveAccount) {
  const quote = normalizeQuoteMint(curve.quoteMint);
  const solQuoted = quote.equals(NATIVE_MINT);
  const real = solQuoted ? curve.realSolReserves : curve.realQuoteReserves ?? curve.realSolReserves;
  return {
    complete: curve.complete,
    solQuoted,
    quoteMint: quote.toBase58(),
    quoteLabel: quoteLabel(quote),
    realSol: Number(curve.realSolReserves.toString()) / 1e9,
    realQuote: Number(real.toString()),
    creator: curve.creator.toBase58(),
    creatorFeeBps: Number(curve.creatorFeeBps?.toString?.() ?? "0"),
    supply: Number(curve.tokenTotalSupply.toString()) / 10 ** TOKEN_DECIMALS,
    mayhem: curve.isMayhemMode,
  };
}

async function quoteDecimalsOf(connection: Connection, quote: PublicKey) {
  const known = knownDecimals(quote);
  if (known !== null) return known;
  const info = await connection.getAccountInfo(quote);
  if (!info) return 6;
  try {
    return unpackMint(quote, info, info.owner).decimals;
  } catch {
    return 6;
  }
}

export async function readCoin(mintStr: string, userStr: string | undefined, cluster: Cluster) {
  const { connection, online } = pool(cluster);
  const mint = new PublicKey(mintStr);
  const program = await tokenProgramOf(connection, mint, cluster);

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
  const summary = curve ? curveSummary(curve) : null;
  const quoteDecimals = summary ? await quoteDecimalsOf(connection, new PublicKey(summary.quoteMint)) : 9;

  let meta: { name: string; symbol: string; image: string } | null = null;
  try {
    const das = (await rpc(cluster, "getAsset", { id: mint.toBase58() })) as {
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
    curve: summary ? { ...summary, quoteDecimals, realQuoteUi: summary.realQuote / 10 ** quoteDecimals } : null,
    balanceUi,
    balanceRaw,
    sol,
    meta,
  };
}

async function rpc(cluster: Cluster, method: string, params: unknown) {
  const { rpc: url } = pool(cluster);
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = (await res.json()) as { result?: unknown; error?: { message?: string } };
  if (json.error) throw new Error(json.error.message || "RPC error");
  return json.result;
}

type AssetHit = { id?: string; content?: { metadata?: { name?: string; symbol?: string }; links?: { image?: string } } };

async function dasMints(cluster: Cluster, method: string, params: unknown) {
  try {
    const result = (await rpc(cluster, method, params)) as { items?: AssetHit[] };
    return result.items ?? [];
  } catch {
    return [];
  }
}

export async function createdCoins(input: { user: string; cluster: Cluster; extra: { mint: string; name: string; symbol: string; image: string }[] }) {
  const { connection, online } = pool(input.cluster);
  const user = new PublicKey(input.user);
  const meta = new Map<string, { name: string; symbol: string; image: string }>();
  for (const row of input.extra) {
    if (row.mint) meta.set(row.mint, { name: row.name, symbol: row.symbol, image: row.image });
  }

  if (input.cluster === "mainnet") {
    try {
      const res = await fetch(
        `https://frontend-api-v3.pump.fun/coins/user-created-coins/${input.user}?offset=0&limit=20&includeNsfw=true`,
        { signal: AbortSignal.timeout(8000) },
      );
      if (res.ok) {
        const body = (await res.json()) as unknown;
        const rows = Array.isArray(body) ? body : ((body as { coins?: unknown[] }).coins ?? []);
        for (const row of rows as { mint?: string; name?: string; symbol?: string; image_uri?: string }[]) {
          if (!row.mint) continue;
          meta.set(row.mint, {
            name: row.name || meta.get(row.mint)?.name || "",
            symbol: row.symbol || meta.get(row.mint)?.symbol || "",
            image: row.image_uri || meta.get(row.mint)?.image || "",
          });
        }
      }
    } catch {
      /* indexer is optional */
    }
  }

  const [byCreator, byAuthority] = await Promise.all([
    dasMints(input.cluster, "getAssetsByCreator", {
      creatorAddress: input.user,
      onlyVerified: false,
      page: 1,
      limit: 20,
    }),
    dasMints(input.cluster, "getAssetsByAuthority", {
      authorityAddress: input.user,
      page: 1,
      limit: 20,
    }),
  ]);
  for (const asset of [...byCreator, ...byAuthority]) {
    if (!asset.id) continue;
    const prev = meta.get(asset.id);
    meta.set(asset.id, {
      name: asset.content?.metadata?.name || prev?.name || "",
      symbol: asset.content?.metadata?.symbol || prev?.symbol || "",
      image: asset.content?.links?.image || prev?.image || "",
    });
  }

  const balances = new Map<string, number>();
  try {
    const held = await connection.getParsedTokenAccountsByOwner(user, { programId: TOKEN_2022_PROGRAM_ID });
    for (const row of held.value) {
      const parsed = row.account.data.parsed as { info?: { mint?: string; tokenAmount?: { uiAmount?: number } } };
      const mint = parsed.info?.mint;
      if (!mint) continue;
      balances.set(mint, Number(parsed.info?.tokenAmount?.uiAmount ?? 0));
    }
  } catch {
    /* balance scan is optional */
  }

  const mints = [...meta.keys()].slice(0, 16);
  const coins = (
    await Promise.all(
      mints.map(async (mint) => {
        try {
          const curve = await online.fetchBondingCurve(new PublicKey(mint));
          const summary = curveSummary(curve);
          const known = meta.get(mint)!;
          return {
            mint,
            name: known.name,
            symbol: known.symbol,
            image: known.image,
            balanceUi: balances.get(mint) ?? 0,
            quoteMint: summary.quoteMint,
            quoteLabel: summary.quoteLabel,
            complete: summary.complete,
            creator: summary.creator,
          };
        } catch {
          return null;
        }
      }),
    )
  ).filter((row): row is NonNullable<typeof row> => Boolean(row));

  return { coins, sol: (await connection.getBalance(user)) / 1e9 };
}

export async function buildTradeTx(input: {
  cluster: Cluster;
  user: string;
  mint: string;
  side: "buy" | "sell";
  sol: number;
  tokens: number;
  slippage: number;
}) {
  const { connection, online } = pool(input.cluster);
  const user = new PublicKey(input.user);
  const mint = new PublicKey(input.mint);
  const slippage = Math.min(50, Math.max(1, Math.round(input.slippage || 5)));
  const program = await tokenProgramOf(connection, mint, input.cluster);

  let curve: CurveAccount | null = null;
  try {
    curve = await online.fetchBondingCurve(mint);
  } catch {
    curve = null;
  }
  const summary = curve ? curveSummary(curve) : null;
  const onCurve = summary && !summary.complete;

  if (!onCurve) {
    if (input.cluster !== "mainnet") {
      throw new Error("This coin is not on the devnet bonding curve, and Jupiter only runs on mainnet.");
    }
    return buildJupiterTx({
      user: user.toBase58(),
      mint: mint.toBase58(),
      side: input.side,
      sol: input.sol,
      tokens: input.tokens,
      slippageBps: slippage * 100,
    });
  }

  const quote = new PublicKey(summary.quoteMint);
  const decimals = await quoteDecimalsOf(connection, quote);
  const [global, feeConfig, state, quoteTokenProgram] = await Promise.all([
    online.fetchGlobal(),
    online.fetchFeeConfig(),
    input.side === "buy" ? online.fetchBuyState(mint, user, program) : online.fetchSellState(mint, user, program),
    quote.equals(NATIVE_MINT) ? Promise.resolve(TOKEN_PROGRAM_ID) : online.fetchQuoteTokenProgram(quote),
  ]);

  if (input.side === "buy") {
    const quoteAmount = uiToRaw(input.sol, decimals);
    if (quoteAmount.lten(0)) throw new Error("Enter an amount to buy.");
    const amount = getBuyTokenAmountFromSolAmount({
      global,
      feeConfig,
      mintSupply: state.bondingCurve.tokenTotalSupply,
      bondingCurve: state.bondingCurve,
      amount: quoteAmount,
      quoteMint: quote,
    });
    const ixs = summary.solQuoted
      ? await PUMP_SDK.buyInstructions({
          global,
          bondingCurveAccountInfo: state.bondingCurveAccountInfo,
          bondingCurve: state.bondingCurve,
          associatedUserAccountInfo: state.associatedUserAccountInfo,
          mint,
          user,
          amount,
          solAmount: quoteAmount,
          slippage,
          tokenProgram: program,
        })
      : await PUMP_SDK.buyV2Instructions({
          global,
          bondingCurveAccountInfo: state.bondingCurveAccountInfo,
          bondingCurve: state.bondingCurve,
          associatedUserAccountInfo: state.associatedUserAccountInfo,
          mint,
          user,
          amount,
          quoteAmount,
          slippage,
          tokenProgram: program,
          quoteTokenProgram,
        });
    return {
      tx: await pack(connection, user, ixs, 400_000),
      venue: "curve" as const,
      outLabel: `${(Number(amount.toString()) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 0 })} ${"tokens"}`,
    };
  }

  const amount = tokensToRaw(input.tokens);
  const quoteOut = getSellSolAmountFromTokenAmount({
    global,
    feeConfig,
    mintSupply: state.bondingCurve.tokenTotalSupply,
    bondingCurve: state.bondingCurve,
    amount,
  });
  const ixs = summary.solQuoted
    ? await PUMP_SDK.sellInstructions({
        global,
        bondingCurveAccountInfo: state.bondingCurveAccountInfo,
        bondingCurve: state.bondingCurve,
        mint,
        user,
        amount,
        solAmount: quoteOut,
        slippage,
        tokenProgram: program,
        mayhemMode: state.bondingCurve.isMayhemMode,
      })
    : await PUMP_SDK.sellV2Instructions({
        global,
        bondingCurveAccountInfo: state.bondingCurveAccountInfo,
        bondingCurve: state.bondingCurve,
        mint,
        user,
        amount,
        quoteAmount: quoteOut,
        slippage,
        tokenProgram: program,
        quoteTokenProgram,
      });
  return {
    tx: await pack(connection, user, ixs, 400_000),
    venue: "curve" as const,
    outLabel: `${formatRaw(quoteOut, decimals)} ${summary.quoteLabel}`,
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
  const amount = input.side === "buy" ? solToLamports(input.sol).toString() : tokensToRaw(input.tokens).toString();
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

export async function creatorFees(user: string, cluster: Cluster) {
  const { online } = pool(cluster);
  const rows = await online.getCreatorVaultQuoteBalances(new PublicKey(user));
  const { connection } = pool(cluster);
  const quotes = await Promise.all(
    rows.map(async (row) => {
      const decimals = await quoteDecimalsOf(connection, row.mint);
      return {
        mint: row.mint.toBase58(),
        label: quoteLabel(row.mint),
        amount: formatRaw(row.total, decimals),
        claimable: !row.total.isZero(),
      };
    }),
  );
  return { quotes };
}

export async function buildCollectTx(userStr: string, cluster: Cluster) {
  const { connection, online } = pool(cluster);
  const user = new PublicKey(userStr);
  let ixs: TransactionInstruction[] = [];
  try {
    ixs = await online.collectCoinCreatorFeeAllQuotesInstructions(user);
  } catch {
    ixs = [];
  }
  if (ixs.length === 0) {
    ixs = await online.collectCoinCreatorFeeInstructions(user);
  }
  if (ixs.length === 0) throw new Error("Nothing to collect.");
  try {
    return { tx: await pack(connection, user, ixs, 400_000) };
  } catch {
    const solOnly = await online.collectCoinCreatorFeeInstructions(user);
    return { tx: await pack(connection, user, solOnly, 200_000) };
  }
}

export async function submitSigned(txB64: string, cluster: Cluster) {
  const { connection } = pool(cluster);
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

export async function walletSol(user: string, cluster: Cluster) {
  const { connection } = pool(cluster);
  const lamports = await connection.getBalance(new PublicKey(user));
  return { sol: lamports / 1e9 };
}
