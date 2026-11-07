import { o as __toESM } from "../_runtime.mjs";
import { i as SOLANA_RPC_MAINNET, r as SOLANA_RPC_DEVNET, t as JUPITER_API } from "./secrets.server-DNwvpzhR.mjs";
import { a as Connection, c as VersionedTransaction, i as ComputeBudgetProgram, o as PublicKey, s as TransactionMessage, u as require_bn } from "../_libs/@solana/buffer-layout-utils.mjs";
import { a as TOKEN_PROGRAM_ID, i as TOKEN_2022_PROGRAM_ID, n as unpackMint, r as NATIVE_MINT, t as getAssociatedTokenAddressSync } from "../_libs/solana__spl-token.mjs";
import { createRequire } from "node:module";
//#region node_modules/.nitro/vite/services/ssr/assets/chain.server-CID6KNNj.js
var import_bn = /* @__PURE__ */ __toESM(require_bn());
var { OnlinePumpSdk, PUMP_SDK, getBuyTokenAmountFromSolAmount, getSellSolAmountFromTokenAmount, normalizeQuoteMint } = createRequire(import.meta.url)("@pump-fun/pump-sdk");
var TOKEN_DECIMALS = 6;
var SOL_MINT = NATIVE_MINT.toBase58();
var USDC_MAINNET = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
var USDC_DEVNET = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
var pools = /* @__PURE__ */ new Map();
function pool(cluster) {
	let hit = pools.get(cluster);
	if (!hit) {
		const rpc = cluster === "devnet" ? SOLANA_RPC_DEVNET : SOLANA_RPC_MAINNET;
		const connection = new Connection(rpc, "confirmed");
		hit = {
			connection,
			online: new OnlinePumpSdk(connection),
			rpc
		};
		pools.set(cluster, hit);
	}
	return hit;
}
function solToLamports(sol) {
	if (!Number.isFinite(sol) || sol < 0) throw new Error("Invalid SOL amount.");
	return new import_bn.default(Math.round(sol * 1e9));
}
function uiToRaw(amount, decimals) {
	if (!Number.isFinite(amount) || amount < 0) throw new Error("Invalid amount.");
	return new import_bn.default(Math.round(amount * 10 ** decimals));
}
function tokensToRaw(amount) {
	if (!Number.isFinite(amount) || amount <= 0) throw new Error("Invalid token amount.");
	return new import_bn.default(Math.round(amount * 10 ** TOKEN_DECIMALS));
}
function quoteLabel(mint) {
	if (mint.equals(NATIVE_MINT) || mint.equals(PublicKey.default)) return "SOL";
	const id = mint.toBase58();
	if (id === USDC_MAINNET || id === USDC_DEVNET) return "USDC";
	return `${id.slice(0, 4)}…${id.slice(-4)}`;
}
function knownDecimals(mint) {
	if (mint.equals(NATIVE_MINT) || mint.equals(PublicKey.default)) return 9;
	const id = mint.toBase58();
	if (id === USDC_MAINNET || id === USDC_DEVNET) return 6;
	return null;
}
function formatRaw(raw, decimals) {
	return (Number(raw.toString()) / 10 ** decimals).toLocaleString("en-US", { maximumFractionDigits: Math.min(decimals, 4) });
}
async function tokenProgramOf(connection, mint, cluster) {
	const info = await connection.getAccountInfo(mint);
	if (!info) throw new Error(`Mint account not found on ${cluster}.`);
	if (info.owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
	if (info.owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
	throw new Error("That address is not an SPL token mint.");
}
async function pack(connection, payer, instructions, units) {
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
function feeBps(input) {
	if (!Number.isFinite(input) || input <= 0) return void 0;
	if (!Number.isInteger(input)) throw new Error("Creator fee must be a whole number of basis points.");
	return new import_bn.default(input);
}
async function launchConfig(cluster) {
	const { online } = pool(cluster);
	const [global, listed] = await Promise.all([online.fetchGlobal(), online.fetchSupportedQuoteMints()]);
	const quotes = (await Promise.all(listed.map(async (entry) => {
		try {
			const full = await online.resolveQuoteMint(entry.mint);
			return {
				mint: full.mint.toBase58(),
				label: quoteLabel(full.mint),
				decimals: full.decimals,
				source: entry.source
			};
		} catch {
			return {
				mint: normalizeQuoteMint(entry.mint).toBase58(),
				label: quoteLabel(entry.mint),
				decimals: knownDecimals(entry.mint) ?? 6,
				source: entry.source
			};
		}
	}))).filter((q, i, all) => all.findIndex((o) => o.mint === q.mint) === i);
	if (!quotes.some((q) => q.label === "SOL")) quotes.unshift({
		mint: SOL_MINT,
		label: "SOL",
		decimals: 9,
		source: "sol"
	});
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
		quotes
	};
}
async function previewLaunch(input) {
	const { online } = pool(input.cluster);
	const [global, feeConfig, quoteControl, resolved] = await Promise.all([
		online.fetchGlobal(),
		online.fetchFeeConfig(),
		online.fetchQuoteControl(),
		online.resolveQuoteMint(new PublicKey(input.quoteMint || SOL_MINT))
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
			pumpQuote: resolved.pumpQuote?.curve
		});
		estimated = (Number(amount.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US", { maximumFractionDigits: 0 });
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
		quoteDecimals: resolved.decimals
	};
}
async function buildLaunchTx(input) {
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
		online.resolveQuoteMint(new PublicKey(input.quoteMint || SOL_MINT))
	]);
	const bps = feeBps(input.creatorFeeBps);
	const quoteAmount = uiToRaw(input.sol, resolved.decimals);
	const quoteArgs = {
		quoteMint: resolved.mint,
		quoteTokenProgram: resolved.quoteTokenProgram,
		creatorFeeBps: bps,
		holderReward: input.holderReward,
		pumpQuote: resolved.pumpQuote?.accounts
	};
	if (quoteAmount.isZero()) return {
		tx: await pack(connection, user, [await PUMP_SDK.createV2Instruction({
			mint,
			name,
			symbol,
			uri,
			creator: user,
			user,
			mayhemMode: false,
			...quoteArgs
		})], 4e5),
		estimatedTokens: "0",
		mode: "create",
		quoteLabel: quoteLabel(resolved.mint)
	};
	if (resolved.mint.equals(NATIVE_MINT) && input.sol > 100) throw new Error("Initial buy is capped at 100 SOL.");
	if (input.sol > 1e6) throw new Error("Initial buy is too large.");
	const amount = getBuyTokenAmountFromSolAmount({
		global,
		feeConfig,
		mintSupply: null,
		bondingCurve: null,
		amount: quoteAmount,
		quoteMint: resolved.mint,
		quoteControl,
		creatorFeeBps: bps,
		pumpQuote: resolved.pumpQuote?.curve
	});
	if (amount.isZero()) throw new Error("Quote returned zero tokens. Raise the buy amount.");
	return {
		tx: await pack(connection, user, await PUMP_SDK.createV2AndBuyV2Instructions({
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
			...quoteArgs
		}), 6e5),
		estimatedTokens: (Number(amount.toString()) / 10 ** TOKEN_DECIMALS).toLocaleString("en-US", { maximumFractionDigits: 0 }),
		mode: "create-buy",
		quoteLabel: quoteLabel(resolved.mint)
	};
}
function curveSummary(curve) {
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
		mayhem: curve.isMayhemMode
	};
}
async function quoteDecimalsOf(connection, quote) {
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
async function readCoin(mintStr, userStr, cluster) {
	const { connection, online } = pool(cluster);
	const mint = new PublicKey(mintStr);
	const program = await tokenProgramOf(connection, mint, cluster);
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
	const summary = curve ? curveSummary(curve) : null;
	const quoteDecimals = summary ? await quoteDecimalsOf(connection, new PublicKey(summary.quoteMint)) : 9;
	let meta = null;
	try {
		const das = await rpc(cluster, "getAsset", { id: mint.toBase58() });
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
		curve: summary ? {
			...summary,
			quoteDecimals,
			realQuoteUi: summary.realQuote / 10 ** quoteDecimals
		} : null,
		balanceUi,
		balanceRaw,
		sol,
		meta
	};
}
async function rpc(cluster, method, params) {
	const { rpc: url } = pool(cluster);
	const json = await (await fetch(url, {
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
async function dasMints(cluster, method, params) {
	try {
		return (await rpc(cluster, method, params)).items ?? [];
	} catch {
		return [];
	}
}
async function createdCoins(input) {
	const { connection, online } = pool(input.cluster);
	const user = new PublicKey(input.user);
	const meta = /* @__PURE__ */ new Map();
	for (const row of input.extra) if (row.mint) meta.set(row.mint, {
		name: row.name,
		symbol: row.symbol,
		image: row.image
	});
	if (input.cluster === "mainnet") try {
		const res = await fetch(`https://frontend-api-v3.pump.fun/coins/user-created-coins/${input.user}?offset=0&limit=20&includeNsfw=true`, { signal: AbortSignal.timeout(8e3) });
		if (res.ok) {
			const body = await res.json();
			const rows = Array.isArray(body) ? body : body.coins ?? [];
			for (const row of rows) {
				if (!row.mint) continue;
				meta.set(row.mint, {
					name: row.name || meta.get(row.mint)?.name || "",
					symbol: row.symbol || meta.get(row.mint)?.symbol || "",
					image: row.image_uri || meta.get(row.mint)?.image || ""
				});
			}
		}
	} catch {}
	const [byCreator, byAuthority] = await Promise.all([dasMints(input.cluster, "getAssetsByCreator", {
		creatorAddress: input.user,
		onlyVerified: false,
		page: 1,
		limit: 20
	}), dasMints(input.cluster, "getAssetsByAuthority", {
		authorityAddress: input.user,
		page: 1,
		limit: 20
	})]);
	for (const asset of [...byCreator, ...byAuthority]) {
		if (!asset.id) continue;
		const prev = meta.get(asset.id);
		meta.set(asset.id, {
			name: asset.content?.metadata?.name || prev?.name || "",
			symbol: asset.content?.metadata?.symbol || prev?.symbol || "",
			image: asset.content?.links?.image || prev?.image || ""
		});
	}
	const balances = /* @__PURE__ */ new Map();
	try {
		const held = await connection.getParsedTokenAccountsByOwner(user, { programId: TOKEN_2022_PROGRAM_ID });
		for (const row of held.value) {
			const parsed = row.account.data.parsed;
			const mint = parsed.info?.mint;
			if (!mint) continue;
			balances.set(mint, Number(parsed.info?.tokenAmount?.uiAmount ?? 0));
		}
	} catch {}
	const mints = [...meta.keys()].slice(0, 16);
	return {
		coins: (await Promise.all(mints.map(async (mint) => {
			try {
				const summary = curveSummary(await online.fetchBondingCurve(new PublicKey(mint)));
				const known = meta.get(mint);
				return {
					mint,
					name: known.name,
					symbol: known.symbol,
					image: known.image,
					balanceUi: balances.get(mint) ?? 0,
					quoteMint: summary.quoteMint,
					quoteLabel: summary.quoteLabel,
					complete: summary.complete,
					creator: summary.creator
				};
			} catch {
				return null;
			}
		}))).filter((row) => Boolean(row)),
		sol: await connection.getBalance(user) / 1e9
	};
}
async function buildTradeTx(input) {
	const { connection, online } = pool(input.cluster);
	const user = new PublicKey(input.user);
	const mint = new PublicKey(input.mint);
	const slippage = Math.min(50, Math.max(1, Math.round(input.slippage || 5)));
	const program = await tokenProgramOf(connection, mint, input.cluster);
	let curve = null;
	try {
		curve = await online.fetchBondingCurve(mint);
	} catch {
		curve = null;
	}
	const summary = curve ? curveSummary(curve) : null;
	if (!(summary && !summary.complete)) {
		if (input.cluster !== "mainnet") throw new Error("This coin is not on the devnet bonding curve, and Jupiter only runs on mainnet.");
		return buildJupiterTx({
			user: user.toBase58(),
			mint: mint.toBase58(),
			side: input.side,
			sol: input.sol,
			tokens: input.tokens,
			slippageBps: slippage * 100
		});
	}
	const quote = new PublicKey(summary.quoteMint);
	const decimals = await quoteDecimalsOf(connection, quote);
	const [global, feeConfig, state, quoteTokenProgram] = await Promise.all([
		online.fetchGlobal(),
		online.fetchFeeConfig(),
		input.side === "buy" ? online.fetchBuyState(mint, user, program) : online.fetchSellState(mint, user, program),
		quote.equals(NATIVE_MINT) ? Promise.resolve(TOKEN_PROGRAM_ID) : online.fetchQuoteTokenProgram(quote)
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
			quoteMint: quote
		});
		return {
			tx: await pack(connection, user, summary.solQuoted ? await PUMP_SDK.buyInstructions({
				global,
				bondingCurveAccountInfo: state.bondingCurveAccountInfo,
				bondingCurve: state.bondingCurve,
				associatedUserAccountInfo: state.associatedUserAccountInfo,
				mint,
				user,
				amount,
				solAmount: quoteAmount,
				slippage,
				tokenProgram: program
			}) : await PUMP_SDK.buyV2Instructions({
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
				quoteTokenProgram
			}), 4e5),
			venue: "curve",
			outLabel: `${(Number(amount.toString()) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 0 })} tokens`
		};
	}
	const amount = tokensToRaw(input.tokens);
	const quoteOut = getSellSolAmountFromTokenAmount({
		global,
		feeConfig,
		mintSupply: state.bondingCurve.tokenTotalSupply,
		bondingCurve: state.bondingCurve,
		amount
	});
	return {
		tx: await pack(connection, user, summary.solQuoted ? await PUMP_SDK.sellInstructions({
			global,
			bondingCurveAccountInfo: state.bondingCurveAccountInfo,
			bondingCurve: state.bondingCurve,
			mint,
			user,
			amount,
			solAmount: quoteOut,
			slippage,
			tokenProgram: program,
			mayhemMode: state.bondingCurve.isMayhemMode
		}) : await PUMP_SDK.sellV2Instructions({
			global,
			bondingCurveAccountInfo: state.bondingCurveAccountInfo,
			bondingCurve: state.bondingCurve,
			mint,
			user,
			amount,
			quoteAmount: quoteOut,
			slippage,
			tokenProgram: program,
			quoteTokenProgram
		}), 4e5),
		venue: "curve",
		outLabel: `${formatRaw(quoteOut, decimals)} ${summary.quoteLabel}`
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
async function creatorFees(user, cluster) {
	const { online } = pool(cluster);
	const rows = await online.getCreatorVaultQuoteBalances(new PublicKey(user));
	const { connection } = pool(cluster);
	return { quotes: await Promise.all(rows.map(async (row) => {
		const decimals = await quoteDecimalsOf(connection, row.mint);
		return {
			mint: row.mint.toBase58(),
			label: quoteLabel(row.mint),
			amount: formatRaw(row.total, decimals),
			claimable: !row.total.isZero()
		};
	})) };
}
async function buildCollectTx(userStr, cluster) {
	const { connection, online } = pool(cluster);
	const user = new PublicKey(userStr);
	let ixs = [];
	try {
		ixs = await online.collectCoinCreatorFeeAllQuotesInstructions(user);
	} catch {
		ixs = [];
	}
	if (ixs.length === 0) ixs = await online.collectCoinCreatorFeeInstructions(user);
	if (ixs.length === 0) throw new Error("Nothing to collect.");
	try {
		return { tx: await pack(connection, user, ixs, 4e5) };
	} catch {
		return { tx: await pack(connection, user, await online.collectCoinCreatorFeeInstructions(user), 2e5) };
	}
}
async function submitSigned(txB64, cluster) {
	const { connection } = pool(cluster);
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
async function walletSol(user, cluster) {
	const { connection } = pool(cluster);
	return { sol: await connection.getBalance(new PublicKey(user)) / 1e9 };
}
//#endregion
export { buildCollectTx, buildLaunchTx, buildTradeTx, createdCoins, creatorFees, launchConfig, previewLaunch, readCoin, submitSigned, walletSol };
