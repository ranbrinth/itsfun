import { o as __toESM } from "../_runtime.mjs";
import { t as parseCluster } from "./cluster-B945SrPr.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as LoaderCircle, r as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_HbGBp7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clusterOf(value) {
	return parseCluster(value);
}
var uploadCoinMeta = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("417b4bc56d66c4530ab7911c2868a98112f40fe64265a3e29942b0a560ea559f"));
var loadLaunchConfig = createServerFn({ method: "POST" }).validator((data) => ({ cluster: clusterOf(data.cluster) })).handler(createSsrRpc("31900bcf209f1b53d574a52edf95109b1e923183d30e74dec8a5cec9cc46df47"));
var previewLaunch = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("9e587f1b59575b909d0b2e2e37a0ac26b76a4db1138419126abd126e508f68f7"));
var prepareLaunch = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("16386dfffc3f5840e09400a578de29df76439b3a8bda20b8990f87cf7dd881a1"));
var prepareTrade = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("a7c3bc2c40668ec5ef06367a49be5e4fea63973ed652c3e1147f181f5f41b0b4"));
var sendSignedTx = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("5a9ea2ef41e069f641a04537a9ddb7161f95645d53a99a20713985164bbf88fa"));
var loadCoin = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("8f1717b3e715ad33db2f41c70e0a92092dfa8ac37c4483d8d85ce3095bd2de2b"));
var loadBalance = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("7dd0f03493ed603aabbdea64e0b6448afaeda9adb65b8249e5559c1d0e995202"));
var loadCreated = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("c892162644e03333821e99d54e28e9875db53a1878fdf91eb87487c53c744914"));
var loadFees = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("610d90bb1a315be6a11d2a1e05fac79fb8936de9f7b07a0751e9df35118e9bfc"));
var prepareCollect = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(createSsrRpc("4b0fe09723fe3fa144d819bb9c4fec10306cd4571508eb9a6075ab1e470b97ac"));
function provider() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.phantom?.solana ?? w.solana ?? null;
}
function hasWallet() {
	return Boolean(provider());
}
function keyOf(pk) {
	return pk.toBase58 ? pk.toBase58() : pk.toString();
}
async function connectWallet() {
	const p = provider();
	if (!p) throw new Error("Install Phantom (or another Solana wallet) and refresh.");
	return keyOf((await p.connect()).publicKey);
}
async function disconnectWallet() {
	await provider()?.disconnect();
}
async function freshMint() {
	const { Keypair } = await import("../_libs/@solana/buffer-layout-utils.mjs").then((n) => n.l);
	const kp = Keypair.generate();
	return {
		publicKey: kp.publicKey.toBase58(),
		secret: kp.secretKey
	};
}
async function signAndSend(txB64, mintSecret, cluster = "mainnet") {
	const { Buffer } = await import("buffer");
	const { Keypair, VersionedTransaction } = await import("../_libs/@solana/buffer-layout-utils.mjs").then((n) => n.l);
	const p = provider();
	if (!p) throw new Error("Wallet disconnected.");
	const tx = VersionedTransaction.deserialize(Buffer.from(txB64, "base64"));
	if (mintSecret) tx.sign([Keypair.fromSecretKey(mintSecret)]);
	const signed = await p.signTransaction(tx);
	return sendSignedTx({ data: {
		tx: Buffer.from(signed.serialize()).toString("base64"),
		cluster
	} });
}
var HISTORY_KEY = "funned.launches";
var CLUSTER_KEY = "funned.cluster";
var SOL_MINT = "So11111111111111111111111111111111111111112";
function messageOf(e) {
	if (e instanceof Error) return e.message;
	if (typeof e === "object" && e && "message" in e) return String(e.message);
	return "Something failed.";
}
function short(value) {
	if (value.length < 12) return value;
	return `${value.slice(0, 4)}…${value.slice(-4)}`;
}
function Home() {
	const [step, setStep] = (0, import_react.useState)("welcome");
	const [intent, setIntent] = (0, import_react.useState)("launch");
	const [cluster, setCluster] = (0, import_react.useState)("devnet");
	const [wallet, setWallet] = (0, import_react.useState)(null);
	const [sol, setSol] = (0, import_react.useState)(null);
	const [walletReady, setWalletReady] = (0, import_react.useState)(true);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [name, setName] = (0, import_react.useState)("");
	const [symbol, setSymbol] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [twitter, setTwitter] = (0, import_react.useState)("");
	const [telegram, setTelegram] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [solBuy, setSolBuy] = (0, import_react.useState)("0.05");
	const [holderReward, setHolderReward] = (0, import_react.useState)(false);
	const [customFee, setCustomFee] = (0, import_react.useState)(false);
	const [feeBps, setFeeBps] = (0, import_react.useState)("100");
	const [quoteMint, setQuoteMint] = (0, import_react.useState)(SOL_MINT);
	const [config, setConfig] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [previewBusy, setPreviewBusy] = (0, import_react.useState)(false);
	const [file, setFile] = (0, import_react.useState)(null);
	const [launched, setLaunched] = (0, import_react.useState)(null);
	const [coins, setCoins] = (0, import_react.useState)([]);
	const [coinsBusy, setCoinsBusy] = (0, import_react.useState)(false);
	const [coin, setCoin] = (0, import_react.useState)(null);
	const [solAmt, setSolAmt] = (0, import_react.useState)("0.01");
	const [slippage, setSlippage] = (0, import_react.useState)("10");
	const [fees, setFees] = (0, import_react.useState)(null);
	const [feesBusy, setFeesBusy] = (0, import_react.useState)(false);
	const [coinTick, setCoinTick] = (0, import_react.useState)(0);
	const image = (0, import_react.useMemo)(() => file ? URL.createObjectURL(file) : "", [file]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (image) URL.revokeObjectURL(image);
		};
	}, [image]);
	(0, import_react.useEffect)(() => {
		setWalletReady(hasWallet());
		try {
			const raw = localStorage.getItem(HISTORY_KEY);
			if (raw) setHistory(JSON.parse(raw));
			const saved = localStorage.getItem(CLUSTER_KEY);
			if (saved === "mainnet" || saved === "devnet") setCluster(saved);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!wallet) return;
		let stop = false;
		loadBalance({ data: {
			user: wallet,
			cluster
		} }).then((b) => {
			if (!stop) setSol(b.sol);
		}).catch(() => {});
		return () => {
			stop = true;
		};
	}, [wallet, cluster]);
	(0, import_react.useEffect)(() => {
		let stop = false;
		loadLaunchConfig({ data: { cluster } }).then((next) => {
			if (stop || !next?.quotes?.length) return;
			setConfig(next);
			setQuoteMint((prev) => next.quotes.some((q) => q.mint === prev) ? prev : next.quotes[0].mint);
		}).catch(() => {});
		return () => {
			stop = true;
		};
	}, [cluster]);
	const quoteLabel = (config?.quotes.find((q) => q.mint === quoteMint))?.label ?? "SOL";
	const creatorFeeBps = customFee ? Number(feeBps || "0") : 0;
	(0, import_react.useEffect)(() => {
		if (step !== "review") return;
		let stop = false;
		setPreviewBusy(true);
		previewLaunch({ data: {
			cluster,
			quoteMint,
			quoteUi: Number(solBuy || "0"),
			creatorFeeBps: Number.isFinite(creatorFeeBps) ? creatorFeeBps : 0
		} }).then((next) => {
			if (!stop) setPreview(next);
		}).catch((e) => {
			if (!stop) setStatus(messageOf(e));
		}).finally(() => {
			if (!stop) setPreviewBusy(false);
		});
		return () => {
			stop = true;
		};
	}, [
		step,
		cluster,
		quoteMint,
		solBuy,
		creatorFeeBps
	]);
	(0, import_react.useEffect)(() => {
		if (step !== "coins" || !wallet) return;
		let stop = false;
		setCoinsBusy(true);
		loadCreated({ data: {
			user: wallet,
			cluster,
			extra: history.filter((h) => !h.cluster || h.cluster === cluster).map((h) => ({
				mint: h.mint,
				name: h.name,
				symbol: h.symbol,
				image: h.image
			}))
		} }).then((res) => {
			if (stop || !res?.coins) return;
			setCoins(res.coins);
			setSol(res.sol);
		}).catch((e) => {
			if (!stop) setStatus(messageOf(e));
		}).finally(() => {
			if (!stop) setCoinsBusy(false);
		});
		return () => {
			stop = true;
		};
	}, [
		step,
		wallet,
		cluster,
		history,
		coinTick
	]);
	(0, import_react.useEffect)(() => {
		if (step !== "fees" || !wallet) return;
		let stop = false;
		setFeesBusy(true);
		loadFees({ data: {
			user: wallet,
			cluster
		} }).then((next) => {
			if (!stop) setFees(next);
		}).catch((e) => {
			if (!stop) setStatus(messageOf(e));
		}).finally(() => {
			if (!stop) setFeesBusy(false);
		});
		return () => {
			stop = true;
		};
	}, [
		step,
		wallet,
		cluster
	]);
	function go(next) {
		setStatus(null);
		setStep(next);
	}
	function chooseCluster(next) {
		setCluster(next);
		localStorage.setItem(CLUSTER_KEY, next);
		setCoin(null);
		setFees(null);
		setCoins([]);
		setPreview(null);
	}
	async function onConnect() {
		setBusy(true);
		setStatus(null);
		try {
			const pk = await connectWallet();
			setWallet(pk);
			go(intent === "trade" ? "coins" : intent === "fees" ? "fees" : "name");
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	function feeOrThrow() {
		if (!customFee) return 0;
		const n = Number(feeBps);
		if (!Number.isInteger(n) || n < 0) throw new Error("Creator fee must be a whole number of basis points.");
		if (config && n > config.maxCreatorFeeBps) throw new Error(`Creator fee max is ${config.maxCreatorFeeBps} bps.`);
		return n;
	}
	async function launch() {
		if (!wallet) {
			setStatus("Connect a wallet first.");
			return;
		}
		if (!file) {
			setStatus("Add a logo image.");
			return;
		}
		setBusy(true);
		try {
			const bps = feeOrThrow();
			setStatus("Uploading metadata to IPFS…");
			const dataUrl = await fileToDataUrl(file);
			const pinned = await uploadCoinMeta({ data: {
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				description: description.trim(),
				imageBase64: dataUrl,
				imageType: file.type || "image/png",
				twitter: twitter.trim(),
				telegram: telegram.trim(),
				website: website.trim()
			} });
			const mintKp = await freshMint();
			const buy = Number(solBuy || "0");
			setStatus("Approve the transaction in your wallet.");
			const built = await prepareLaunch({ data: {
				cluster,
				user: wallet,
				mint: mintKp.publicKey,
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				uri: pinned.uri,
				sol: buy,
				holderReward,
				quoteMint,
				creatorFeeBps: bps
			} });
			const sent = await signAndSend(built.tx, mintKp.secret, cluster);
			const item = {
				mint: mintKp.publicKey,
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				image: pinned.image,
				signature: sent.signature,
				at: Date.now(),
				cluster,
				quoteLabel: built.quoteLabel
			};
			setLaunched(item);
			const next = [item, ...history.filter((h) => h.mint !== item.mint)].slice(0, 12);
			setHistory(next);
			localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
			setStatus(sent.confirmed ? null : "Submitted. Confirmation is still pending.");
			setStep("live");
			loadBalance({ data: {
				user: wallet,
				cluster
			} }).then((b) => setSol(b.sol)).catch(() => {});
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	async function openCoin(id) {
		if (!wallet) return;
		setBusy(true);
		setStatus("Reading the coin…");
		try {
			const view = await loadCoin({ data: {
				mint: id,
				user: wallet,
				cluster
			} });
			setCoin(view);
			setStatus(null);
			setStep("trade");
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	async function trade() {
		if (!wallet || !coin) return;
		setBusy(true);
		try {
			setStatus("Quoting…");
			const built = await prepareTrade({ data: {
				cluster,
				user: wallet,
				mint: coin.mint,
				side: "buy",
				sol: Number(solAmt || "0"),
				tokens: 0,
				slippage: Number(slippage || "10")
			} });
			setStatus(`Approve the swap. Est. ${built.outLabel}.`);
			const sent = await signAndSend(built.tx, void 0, cluster);
			setStatus(sent.confirmed ? "Swapped." : "Submitted. Check Solscan.");
			const view = await loadCoin({ data: {
				mint: coin.mint,
				user: wallet,
				cluster
			} });
			setCoin(view);
			setSol(view.sol);
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	async function collect() {
		if (!wallet) return;
		setBusy(true);
		try {
			setStatus("Approve fee collection.");
			const sent = await signAndSend((await prepareCollect({ data: {
				user: wallet,
				cluster
			} })).tx, void 0, cluster);
			setStatus(sent.confirmed ? "Collected." : "Submitted.");
			const next = await loadFees({ data: {
				user: wallet,
				cluster
			} });
			setFees(next);
			const bal = await loadBalance({ data: {
				user: wallet,
				cluster
			} });
			setSol(bal.sol);
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	const back = () => {
		switch (step) {
			case "wallet": return "welcome";
			case "name": return "wallet";
			case "story": return "name";
			case "logo": return "story";
			case "quote": return "logo";
			case "fee": return "quote";
			case "review": return "fee";
			case "live": return "welcome";
			case "coins": return "wallet";
			case "trade": return "coins";
			case "fees": return "wallet";
			default: return null;
		}
	};
	const claimable = fees?.quotes.some((q) => q.claimable) ?? false;
	const spendLabel = coin && coin.curve && !coin.curve.complete && !coin.curve.solQuoted ? coin.curve.quoteLabel : "SOL";
	const continueMeta = () => {
		switch (step) {
			case "welcome": return {
				label: "Continue",
				enabled: true,
				run: () => {
					setIntent("launch");
					go("wallet");
				}
			};
			case "wallet": return {
				label: wallet ? "Continue" : "Connect",
				enabled: !busy && (walletReady || Boolean(wallet)),
				run: () => {
					if (wallet) go(intent === "trade" ? "coins" : intent === "fees" ? "fees" : "name");
					else onConnect();
				}
			};
			case "name": return {
				label: "Continue",
				enabled: name.trim().length > 0 && symbol.trim().length > 0,
				run: () => go("story")
			};
			case "story": return {
				label: "Continue",
				enabled: true,
				run: () => go("logo")
			};
			case "logo": return {
				label: "Continue",
				enabled: Boolean(file),
				run: () => go("quote")
			};
			case "quote": return {
				label: "Continue",
				enabled: Number(solBuy || "0") >= 0,
				run: () => go("fee")
			};
			case "fee": return {
				label: "Continue",
				enabled: !customFee || Number.isInteger(Number(feeBps)) && Number(feeBps) >= 0,
				run: () => {
					try {
						feeOrThrow();
						go("review");
					} catch (e) {
						setStatus(messageOf(e));
					}
				}
			};
			case "review": return {
				label: busy ? "Launching" : "Launch",
				enabled: !busy,
				run: () => void launch()
			};
			case "live": return {
				label: "Swap this coin",
				enabled: Boolean(launched) && !busy,
				run: () => {
					if (!launched) return;
					openCoin(launched.mint);
				}
			};
			case "coins": return {
				label: coinsBusy ? "Reading" : "Refresh",
				enabled: !coinsBusy && Boolean(wallet),
				run: () => setCoinTick((n) => n + 1)
			};
			case "trade": return {
				label: busy ? "Swapping" : "Swap",
				enabled: !busy && Boolean(coin),
				run: () => void trade()
			};
			case "fees": return {
				label: busy ? "Collecting" : "Collect",
				enabled: !busy && !feesBusy && claimable,
				run: () => void collect()
			};
		}
	};
	const cta = continueMeta();
	const prev = back();
	const creatorLabel = customFee ? `${Number.isFinite(creatorFeeBps) ? creatorFeeBps : 0} bps` : `Schedule ${preview?.scheduleCreatorFeeBps ?? config?.scheduleCreatorFeeBps ?? "—"} bps`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-16 items-center px-4",
				children: [prev && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go(prev),
					className: "nav-back inline-flex items-center gap-1 text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						strokeWidth: 2.75,
						"aria-hidden": true
					}), "Back"]
				}), wallet && step !== "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						disconnectWallet();
						setWallet(null);
						setSol(null);
					},
					className: "ml-auto text-sm font-medium text-muted",
					children: sol === null ? short(wallet) : `${sol.toFixed(3)} SOL`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 flex-col overflow-y-auto px-6 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "m-auto w-full max-w-md",
					children: [
						step === "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {}),
						step === "wallet" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Connect wallet",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
								label: "Wallet",
								value: wallet ? short(wallet) : "",
								placeholder: walletReady ? "Phantom" : "Install Phantom",
								readOnly: true,
								onChange: () => {}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-sm text-muted",
								children: [cluster === "devnet" ? "Devnet. Practice before real SOL." : "Mainnet. This spends real SOL.", " You sign every transaction."]
							})]
						}),
						step === "name" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Name the coin",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
								label: "Coin name",
								value: name,
								onChange: setName,
								placeholder: "Enter coin name",
								maxLength: 32
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
								label: "Ticker",
								value: symbol,
								onChange: (v) => setSymbol(v.toUpperCase()),
								placeholder: "Enter ticker",
								maxLength: 10
							})]
						}),
						step === "story" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Tell the story",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatArea, {
									label: "Description",
									value: description,
									onChange: setDescription,
									placeholder: "What is this coin?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Website",
									value: website,
									onChange: setWebsite,
									placeholder: "Optional"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "X",
									value: twitter,
									onChange: setTwitter,
									placeholder: "Optional"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Telegram",
									value: telegram,
									onChange: setTelegram,
									placeholder: "Optional"
								})
							]
						}),
						step === "logo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, {
							title: "Set the look",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoField, {
								file,
								preview: image,
								onFile: setFile
							})
						}),
						step === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Quote token",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-sm text-muted",
									children: "Create v2. The curve is priced in this token."
								}),
								config && config.quotes.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
									value: quoteMint,
									options: config.quotes.map((q) => ({
										id: q.mint,
										label: q.label
									})),
									onChange: setQuoteMint
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: true,
									title: quoteLabel,
									detail: "Default quote"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "First buy",
									value: solBuy,
									onChange: setSolBuy,
									placeholder: "0.00",
									inputMode: "decimal",
									suffix: quoteLabel
								}),
								(config?.holderRewardEnabled ?? true) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioRow, {
									label: "Holder rewards",
									on: holderReward,
									onToggle: () => setHolderReward((v) => !v)
								})
							]
						}),
						step === "fee" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Creator fee",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: true,
									title: config?.creatorFeeConfigurable === false ? "Fixed schedule" : "Your fee",
									detail: config ? `Protocol ${config.protocolFeeBps} bps · max ${config.maxCreatorFeeBps} bps` : "Reading the fee schedule…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioRow, {
									label: "Custom creator fee",
									on: customFee,
									onToggle: () => setCustomFee((v) => !v)
								}),
								customFee && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Basis points",
									value: feeBps,
									onChange: (v) => setFeeBps(v.replace(/[^\d]/g, "")),
									placeholder: "100",
									inputMode: "decimal",
									suffix: "bps"
								})
							]
						}),
						step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Ready to launch",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [
									image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: image,
										alt: "",
										className: "h-20 w-20 rounded-2xl object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-20 rounded-2xl bg-surface" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-bold",
										children: name || "Unnamed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted",
										children: ["$", symbol || "—"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-card bg-surface px-4 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Supply",
										v: preview?.supply ?? config?.supply ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Decimals",
										v: String(preview?.decimals ?? config?.decimals ?? 6)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Ticker",
										v: symbol.toUpperCase() || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Symbol",
										v: symbol ? `$${symbol.toUpperCase()}` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Dev wallet",
										v: wallet ? short(wallet) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Network",
										v: cluster === "devnet" ? "Devnet" : "Mainnet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Quote",
										v: `${preview?.quoteLabel ?? quoteLabel}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "First buy",
										v: `${solBuy || "0"} ${preview?.quoteLabel ?? quoteLabel}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Est. tokens",
										v: previewBusy ? "…" : preview?.estimatedTokens ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Protocol fee",
										v: `${preview?.protocolFeeBps ?? config?.protocolFeeBps ?? "—"} bps`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Creator fee",
										v: creatorLabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4 py-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: "Holder rewards"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { on: holderReward })]
									})
								]
							})]
						}),
						step === "live" && launched && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "You're live",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-muted",
									children: "Welcome to"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "-mt-4 text-center text-4xl font-bold tracking-tight",
									children: ["$", launched.symbol]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: status === null,
									title: status ? "Pending" : "Confirmed",
									detail: launched.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://solscan.io/tx/${launched.signature}${cluster === "devnet" ? "?cluster=devnet" : ""}`,
									target: "_blank",
									rel: "noreferrer",
									className: "block text-center font-medium text-primary",
									children: "View transaction"
								})
							]
						}),
						step === "coins" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Your coins",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-3xl font-bold",
									children: sol === null ? "—" : `${sol.toFixed(3)} SOL`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-center text-sm text-muted",
									children: [cluster === "devnet" ? "Devnet" : "Mainnet", " balance. Tap a coin to swap SOL into it."]
								}),
								coinsBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-sm text-muted",
									children: "Reading coins from this wallet…"
								}),
								!coinsBusy && coins.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: false,
									title: "None yet",
									detail: "Launch one, or switch cluster."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2",
									children: coins.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void openCoin(row.mint),
										className: "flex h-16 items-center gap-3 rounded-card border border-dashed border-line px-4 text-left",
										children: [row.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: row.image,
											alt: "",
											className: "h-10 w-10 rounded-lg object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-10 w-10 rounded-lg bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block truncate font-semibold",
												children: ["$", row.symbol || short(row.mint)]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-sm text-muted",
												children: [
													row.balanceUi.toLocaleString(),
													" · ",
													row.quoteLabel,
													row.complete ? " · graduated" : ""
												]
											})]
										})]
									}, row.mint))
								})
							]
						}),
						step === "trade" && coin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Swap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg text-muted",
										children: coin.meta?.name || "Coin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-4xl font-bold tracking-tight",
										children: ["$", coin.meta?.symbol || short(coin.mint)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: true,
									title: `${(sol ?? coin.sol).toFixed(3)} SOL`,
									detail: `You hold ${coin.balanceUi.toLocaleString()} ${coin.meta?.symbol || ""}`.trim()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Spend",
									value: solAmt,
									onChange: setSolAmt,
									placeholder: "0.00",
									inputMode: "decimal",
									suffix: spendLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Slippage",
									value: slippage,
									onChange: setSlippage,
									placeholder: "10",
									inputMode: "decimal",
									suffix: "%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-sm text-muted",
									children: coin.curve && !coin.curve.complete ? `Curve in ${coin.curve.quoteLabel}. ${coin.curve.realQuoteUi.toLocaleString()} in reserves.` : cluster === "mainnet" ? "Graduated. Routed through Jupiter for SOL." : "Not on the devnet curve."
								})
							]
						}),
						step === "fees" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Collect fees",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-center text-sm text-muted",
									children: [
										"Creator fees and quote rewards for this wallet on ",
										cluster === "devnet" ? "devnet" : "mainnet",
										"."
									]
								}),
								feesBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-sm text-muted",
									children: "Reading vaults…"
								}),
								!feesBusy && (fees?.quotes.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: false,
									title: "Nothing to collect",
									detail: "Trade your coins to earn fees."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2",
									children: fees?.quotes.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex h-16 items-center justify-between rounded-card bg-surface px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: row.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: short(row.mint)
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: row.amount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { on: row.claimable })]
										})]
									}, row.mint))
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "dock mx-auto w-full max-w-md px-6 pt-2",
				children: [
					status && step !== "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-center text-sm text-danger",
						children: status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !cta.enabled,
						onClick: cta.run,
						className: `inline-flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg font-semibold ${cta.enabled ? "bg-primary text-fg" : "bg-surface text-muted"}`,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), cta.label]
					}),
					step === "wallet" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
							value: cluster,
							options: [{
								id: "devnet",
								label: "Devnet"
							}, {
								id: "mainnet",
								label: "Mainnet"
							}],
							onChange: chooseCluster
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-xs text-muted",
							children: "Uses the Helius mainnet and devnet RPC in .env"
						})]
					}),
					step === "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setIntent("trade");
								go("wallet");
							},
							className: "mt-3 h-11 w-full text-base font-medium text-muted",
							children: "Trade instead"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setIntent("fees");
								go("wallet");
							},
							className: "h-11 w-full text-base font-medium text-muted",
							children: "Collect fees"
						})]
					})
				]
			})
		]
	});
}
function Welcome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg text-muted",
			children: "Welcome to"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-5xl font-bold tracking-tight",
			children: "funned"
		})]
	});
}
function Screen({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl",
			children: title
		}), children]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-right font-semibold",
			children: v
		})]
	});
}
function Dot({ on }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-primary" : "border-line"}`,
		"aria-hidden": true,
		children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-primary" }) : null
	});
}
function RadioRow({ label, on, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onToggle,
		"aria-pressed": on,
		className: `flex h-14 w-full items-center justify-between rounded-card border border-dashed px-4 text-left ${on ? "border-primary" : "border-line"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-xs font-medium tracking-widest ${on ? "text-primary" : "text-muted"}`,
			children: label.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { on })]
	});
}
function FloatField({ label, value, onChange, placeholder, maxLength, inputMode, readOnly, suffix }) {
	const [focus, setFocus] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `absolute left-4 top-0 z-10 -translate-y-1/2 bg-bg px-1 text-xs font-medium tracking-widest ${focus ? "text-primary" : "text-muted"}`,
				children: label.toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				readOnly,
				maxLength,
				inputMode,
				placeholder,
				onChange: (e) => onChange(e.target.value),
				onFocus: () => setFocus(true),
				onBlur: () => setFocus(false),
				className: `h-14 w-full rounded-card border border-dashed bg-bg px-4 text-lg text-fg outline-none placeholder:text-muted ${suffix ? "pr-16" : ""} ${focus ? "border-primary" : "border-line"}`
			}),
			suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted",
				children: suffix
			})
		]
	});
}
function FloatArea({ label, value, onChange, placeholder }) {
	const [focus, setFocus] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `absolute left-4 top-0 z-10 -translate-y-1/2 bg-bg px-1 text-xs font-medium tracking-widest ${focus ? "text-primary" : "text-muted"}`,
			children: label.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			maxLength: 400,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			onFocus: () => setFocus(true),
			onBlur: () => setFocus(false),
			className: `min-h-28 w-full resize-none rounded-card border border-dashed bg-bg px-4 py-4 text-lg text-fg outline-none placeholder:text-muted ${focus ? "border-primary" : "border-line"}`
		})]
	});
}
function LogoField({ file, preview, onFile }) {
	const [focus, setFocus] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `absolute left-4 top-0 z-10 -translate-y-1/2 bg-bg px-1 text-xs font-medium tracking-widest ${focus ? "text-primary" : "text-muted"}`,
				children: "LOGO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `flex h-14 items-center gap-3 rounded-card border border-dashed px-4 ${focus ? "border-primary" : "border-line"}`,
				children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: preview,
					alt: "",
					className: "h-8 w-8 rounded-lg object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: file ? "truncate text-fg" : "text-muted",
					children: file ? file.name : "Add a logo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/png,image/jpeg,image/webp,image/gif",
				className: "absolute inset-0 cursor-pointer opacity-0",
				onFocus: () => setFocus(true),
				onBlur: () => setFocus(false),
				onChange: (e) => onFile(e.target.files?.[0] ?? null)
			})
		]
	});
}
function StatusCard({ ok, title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-card bg-surface px-4 py-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: `text-lg font-semibold ${ok ? "text-ok" : "text-muted"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mr-2 inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-ok" : "bg-muted"}` }), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-semibold",
			children: detail
		})]
	});
}
function Segment({ value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-full bg-surface p-1",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.id),
			className: `h-10 flex-1 rounded-full text-sm font-semibold ${value === opt.id ? "bg-surface-2 text-fg" : "text-muted"}`,
			children: opt.label
		}, opt.id))
	});
}
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the image."));
		reader.readAsDataURL(file);
	});
}
//#endregion
export { Home as component };
