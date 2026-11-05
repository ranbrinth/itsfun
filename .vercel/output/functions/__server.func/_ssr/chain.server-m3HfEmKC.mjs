import { o as __toESM } from "../_runtime.mjs";
import { n as JUPITER_API, t as HELIUS_RPC } from "./secrets.server-BACvW82w.mjs";
import { c as PublicKey, d as TransactionMessage, f as VersionedTransaction, g as require_bn, m as init_index_esm, o as ComputeBudgetProgram, s as Connection } from "../_libs/@coral-xyz/anchor.mjs";
import { i as NATIVE_MINT, n as getAssociatedTokenAddressSync, o as TOKEN_2022_PROGRAM_ID, s as TOKEN_PROGRAM_ID } from "../_libs/@pump-fun/agent-payments-sdk+[...].mjs";
import "../_libs/@pump-fun/pump-sdk+[...].mjs";
import { createRequire } from "node:module";
//#region node_modules/.nitro/vite/services/ssr/assets/chain.server-m3HfEmKC.js
init_index_esm();
var import_bn = /* @__PURE__ */ __toESM(require_bn());
var { OnlinePumpSdk, PUMP_SDK, getBuyTokenAmountFromSolAmount, getSellSolAmountFromTokenAmount, normalizeQuoteMint } = createRequire(import.meta.url)("@pump-fun/pump-sdk");
var connection = new Connection(HELIUS_RPC, "confirmed");
var online = new OnlinePumpSdk(connection);
var TOKEN_DECIMALS = 6;
function solToLamports(sol) {
	if (!Number.isFinite(sol) || sol < 0) throw new Error("Invalid SOL amount.");
	return new import_bn.default(Math.round(sol * 1e9));
}
function tokensToRaw(amount) {
	if (!Number.isFinite(amount) || amount <= 0) throw new Error("Invalid token amount.");
	return new import_bn.default(Math.round(amount * 10 ** TOKEN_DECIMALS));
}
async function tokenProgramOf(mint) {
	const info = await connection.getAccountInfo(mint);
	if (!info) throw new Error("Mint account not found on mainnet.");
	if (info.owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
	if (info.owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
	throw new Error("That address is not an SPL token mint.");
}
async function pack(payer, instructions, units) {
	const ixs = [
		ComputeBudgetProgram.setComputeUnitLimit({ units }),
		ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 15e4 }),
		...instructions
	];
	const { blockhash } = await connection.getLatestBlockhash("confirmed");
	const message = new TransactionMessage({
		payerKey: payer,
		recentBlockhash: blockhash,
		instructions: ixs
	}).compileToV0Message();
	const tx = new VersionedTransaction(message);
	return Buffer.from(tx.serialize()).toString("base64");
}
async function buildLaunchTx(input) {
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
	if (solAmount.isZero()) return {
		tx: await pack(user, [await PUMP_SDK.createV2Instruction({
			mint,
			name,
			symbol,
			uri,
			creator: user,
			user,
			mayhemMode: false,
			holderReward: input.holderReward
		})], 3e5),
		estimatedTokens: "0",
		mode: "create"
	};
	if (input.sol > 100) throw new Error("Initial buy is capped at 100 SOL.");
	const amount = getBuyTokenAmountFromSolAmount({
		global,
		feeConfig,
		mintSupply: null,
		bondingCurve: null,
		amount: solAmount,
		quoteMint: NATIVE_MINT
	});
	if (amount.isZero()) throw new Error("Quote returned zero tokens. Raise the buy amount.");
	return {
		tx: await pack(user, await PUMP_SDK.createV2AndBuyInstructions({
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
			holderReward: input.holderReward
		}), 5e5),
		estimatedTokens: (Number(amount.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US", { maximumFractionDigits: 0 }),
		mode: "create-buy"
	};
}
function curveSummary(curve) {
	const quote = normalizeQuoteMint(curve.quoteMint);
	const solQuoted = quote.equals(NATIVE_MINT);
	const realSol = Number(curve.realSolReserves.toString()) / 1e9;
	return {
		complete: curve.complete,
		solQuoted,
		quoteMint: quote.toBase58(),
		realSol,
		creator: curve.creator.toBase58(),
		supply: Number(curve.tokenTotalSupply.toString()) / 10 ** TOKEN_DECIMALS
	};
}
async function readCoin(mintStr, userStr) {
	const mint = new PublicKey(mintStr);
	const program = await tokenProgramOf(mint);
	let curve = null;
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
	const sol = userStr ? await connection.getBalance(new PublicKey(userStr)) / 1e9 : 0;
	let meta = null;
	try {
		const das = await rpc("getAsset", { id: mint.toBase58() });
		meta = {
			name: das.content?.metadata?.name ?? "",
			symbol: das.content?.metadata?.symbol ?? "",
			image: das.content?.links?.image ?? ""
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
		meta
	};
}
async function rpc(method, params) {
	const json = await (await fetch(HELIUS_RPC, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			jsonrpc: "2.0",
			id: 1,
			method,
			params
		})
	})).json();
	if (json.error) throw new Error(json.error.message || "RPC error");
	return json.result;
}
async function buildTradeTx(input) {
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
	if (!(summary && !summary.complete && summary.solQuoted)) return buildJupiterTx({
		user: user.toBase58(),
		mint: mint.toBase58(),
		side: input.side,
		sol: input.sol,
		tokens: input.tokens,
		slippageBps: slippage * 100
	});
	const [global, feeConfig, buyState] = await Promise.all([
		online.fetchGlobal(),
		online.fetchFeeConfig(),
		input.side === "buy" ? online.fetchBuyState(mint, user, program) : online.fetchSellState(mint, user, program)
	]);
	if (input.side === "buy") {
		const solAmount = solToLamports(input.sol);
		if (solAmount.lten(1e4)) throw new Error("Buy at least 0.00001 SOL.");
		const state = buyState;
		const amount = getBuyTokenAmountFromSolAmount({
			global,
			feeConfig,
			mintSupply: state.bondingCurve.tokenTotalSupply,
			bondingCurve: state.bondingCurve,
			amount: solAmount,
			quoteMint: NATIVE_MINT
		});
		return {
			tx: await pack(user, await PUMP_SDK.buyInstructions({
				global,
				bondingCurveAccountInfo: state.bondingCurveAccountInfo,
				bondingCurve: state.bondingCurve,
				associatedUserAccountInfo: state.associatedUserAccountInfo,
				mint,
				user,
				amount,
				solAmount,
				slippage,
				tokenProgram: program
			}), 3e5),
			venue: "curve",
			outLabel: `${(Number(amount.toString()) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 0 })} tokens`
		};
	}
	const state = buyState;
	const amount = tokensToRaw(input.tokens);
	const solOut = getSellSolAmountFromTokenAmount({
		global,
		feeConfig,
		mintSupply: state.bondingCurve.tokenTotalSupply,
		bondingCurve: state.bondingCurve,
		amount
	});
	return {
		tx: await pack(user, await PUMP_SDK.sellInstructions({
			global,
			bondingCurveAccountInfo: state.bondingCurveAccountInfo,
			bondingCurve: state.bondingCurve,
			mint,
			user,
			amount,
			solAmount: solOut,
			slippage,
			tokenProgram: program,
			mayhemMode: state.bondingCurve.isMayhemMode
		}), 3e5),
		venue: "curve",
		outLabel: `${(Number(solOut.toString()) / 1e9).toFixed(4)} SOL`
	};
}
async function buildJupiterTx(input) {
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
		headers: {
			"content-type": "application/json",
			"x-api-key": JUPITER_API
		},
		body: JSON.stringify({
			quoteResponse: quote,
			userPublicKey: input.user,
			wrapAndUnwrapSol: true,
			dynamicComputeUnitLimit: true
		})
	});
	if (!swapRes.ok) {
		const text = await swapRes.text();
		throw new Error(`Jupiter swap failed (${swapRes.status}): ${text.slice(0, 180)}`);
	}
	const swap = await swapRes.json();
	if (!swap.swapTransaction) throw new Error("Jupiter did not return a transaction.");
	const outAmount = Number(quote.outAmount ?? "0");
	const outLabel = input.side === "buy" ? `${(outAmount / 1e6).toLocaleString("en-US", { maximumFractionDigits: 2 })} tokens` : `${(outAmount / 1e9).toFixed(4)} SOL`;
	return {
		tx: swap.swapTransaction,
		venue: "jupiter",
		outLabel
	};
}
async function submitSigned(txB64) {
	const raw = Buffer.from(txB64, "base64");
	const signature = await connection.sendRawTransaction(raw, {
		skipPreflight: false,
		maxRetries: 3
	});
	const latest = await connection.getLatestBlockhash("confirmed");
	const result = await Promise.race([connection.confirmTransaction({
		signature,
		...latest
	}, "confirmed"), new Promise((resolve) => setTimeout(() => resolve(null), 25e3))]);
	if (result && result.value.err) throw new Error(`Transaction failed: ${JSON.stringify(result.value.err)}`);
	return {
		signature,
		confirmed: Boolean(result && !result.value.err)
	};
}
async function walletSol(user) {
	return { sol: await connection.getBalance(new PublicKey(user)) / 1e9 };
}
//#endregion
export { buildLaunchTx, buildTradeTx, readCoin, submitSigned, walletSol };
