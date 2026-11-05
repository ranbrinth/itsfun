import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as LoaderCircle, r as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NQv4qeBI.js
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
var uploadCoinMeta = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("417b4bc56d66c4530ab7911c2868a98112f40fe64265a3e29942b0a560ea559f"));
var prepareLaunch = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("16386dfffc3f5840e09400a578de29df76439b3a8bda20b8990f87cf7dd881a1"));
var prepareTrade = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a7c3bc2c40668ec5ef06367a49be5e4fea63973ed652c3e1147f181f5f41b0b4"));
var sendSignedTx = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("5a9ea2ef41e069f641a04537a9ddb7161f95645d53a99a20713985164bbf88fa"));
var loadCoin = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("8f1717b3e715ad33db2f41c70e0a92092dfa8ac37c4483d8d85ce3095bd2de2b"));
var loadBalance = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("7dd0f03493ed603aabbdea64e0b6448afaeda9adb65b8249e5559c1d0e995202"));
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
	const { Keypair } = await import("../_libs/@coral-xyz/anchor.mjs").then((n) => (n.m(), n.p));
	const kp = Keypair.generate();
	return {
		publicKey: kp.publicKey.toBase58(),
		secret: kp.secretKey
	};
}
async function signAndSend(txB64, mintSecret) {
	const { Buffer } = await import("buffer");
	const { Keypair, VersionedTransaction } = await import("../_libs/@coral-xyz/anchor.mjs").then((n) => (n.m(), n.p));
	const p = provider();
	if (!p) throw new Error("Wallet disconnected.");
	const tx = VersionedTransaction.deserialize(Buffer.from(txB64, "base64"));
	if (mintSecret) tx.sign([Keypair.fromSecretKey(mintSecret)]);
	const signed = await p.signTransaction(tx);
	return sendSignedTx({ data: { tx: Buffer.from(signed.serialize()).toString("base64") } });
}
var HISTORY_KEY = "funned.launches";
function messageOf(e) {
	if (e instanceof Error) return e.message;
	if (typeof e === "object" && e && "message" in e) return String(e.message);
	return "Something failed.";
}
function Home() {
	const [step, setStep] = (0, import_react.useState)("welcome");
	const [intent, setIntent] = (0, import_react.useState)("launch");
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
	const [file, setFile] = (0, import_react.useState)(null);
	const [launched, setLaunched] = (0, import_react.useState)(null);
	const [mint, setMint] = (0, import_react.useState)("");
	const [coin, setCoin] = (0, import_react.useState)(null);
	const [side, setSide] = (0, import_react.useState)("buy");
	const [solAmt, setSolAmt] = (0, import_react.useState)("0.01");
	const [tokenAmt, setTokenAmt] = (0, import_react.useState)("");
	const [slippage, setSlippage] = (0, import_react.useState)("10");
	const preview = (0, import_react.useMemo)(() => file ? URL.createObjectURL(file) : "", [file]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);
	(0, import_react.useEffect)(() => {
		setWalletReady(hasWallet());
		try {
			const raw = localStorage.getItem(HISTORY_KEY);
			if (raw) setHistory(JSON.parse(raw));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!wallet) return;
		let stop = false;
		loadBalance({ data: { user: wallet } }).then((b) => {
			if (!stop) setSol(b.sol);
		}).catch(() => {});
		return () => {
			stop = true;
		};
	}, [wallet]);
	function go(next) {
		setStatus(null);
		setStep(next);
	}
	async function onConnect() {
		setBusy(true);
		setStatus(null);
		try {
			const pk = await connectWallet();
			setWallet(pk);
			go(intent === "trade" ? "mint" : "name");
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
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
			const sent = await signAndSend((await prepareLaunch({ data: {
				user: wallet,
				mint: mintKp.publicKey,
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				uri: pinned.uri,
				sol: buy,
				holderReward
			} })).tx, mintKp.secret);
			const item = {
				mint: mintKp.publicKey,
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				image: pinned.image,
				signature: sent.signature,
				at: Date.now()
			};
			setLaunched(item);
			const next = [item, ...history.filter((h) => h.mint !== item.mint)].slice(0, 12);
			setHistory(next);
			localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
			setStatus(sent.confirmed ? null : "Submitted. Confirmation is still pending.");
			setStep("live");
			loadBalance({ data: { user: wallet } }).then((b) => setSol(b.sol)).catch(() => {});
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	async function lookup() {
		const trimmed = mint.trim();
		if (trimmed.length < 32) {
			setStatus("Paste a mint address.");
			return;
		}
		if (!wallet) {
			setStatus("Connect a wallet first.");
			return;
		}
		setBusy(true);
		setStatus("Reading the curve…");
		try {
			const view = await loadCoin({ data: {
				mint: trimmed,
				user: wallet
			} });
			setCoin(view);
			setStatus(null);
			setStep("trade");
		} catch (e) {
			setCoin(null);
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
				user: wallet,
				mint: coin.mint,
				side,
				sol: Number(solAmt || "0"),
				tokens: Number(tokenAmt || "0"),
				slippage: Number(slippage || "10")
			} });
			setStatus(`Approve ${side}. Est. ${built.outLabel}.`);
			const sent = await signAndSend(built.tx);
			setStatus(sent.confirmed ? "Filled." : "Submitted. Check Solscan.");
			const view = await loadCoin({ data: {
				mint: coin.mint,
				user: wallet
			} });
			setCoin(view);
			const bal = await loadBalance({ data: { user: wallet } });
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
			case "review": return "logo";
			case "live": return "welcome";
			case "mint": return "welcome";
			case "trade": return "mint";
			default: return null;
		}
	};
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
				label: wallet ? "Continue" : "Continue",
				enabled: !busy && (walletReady || Boolean(wallet)),
				run: () => {
					if (wallet) go(intent === "trade" ? "mint" : "name");
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
				run: () => go("review")
			};
			case "review": return {
				label: busy ? "Launching" : "Launch",
				enabled: !busy,
				run: () => void launch()
			};
			case "live": return {
				label: "Trade this coin",
				enabled: Boolean(launched),
				run: () => {
					if (!launched) return;
					setMint(launched.mint);
					setStatus(null);
					setBusy(true);
					loadCoin({ data: {
						mint: launched.mint,
						user: wallet ?? void 0
					} }).then((view) => {
						setCoin(view);
						setStep("trade");
					}).catch((e) => setStatus(messageOf(e))).finally(() => setBusy(false));
				}
			};
			case "mint": return {
				label: busy ? "Loading" : "Continue",
				enabled: mint.trim().length >= 32 && !busy,
				run: () => void lookup()
			};
			case "trade": return {
				label: busy ? "Working" : side === "buy" ? "Buy" : "Sell",
				enabled: !busy && Boolean(coin),
				run: () => void trade()
			};
		}
	};
	const cta = continueMeta();
	const prev = back();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 items-center px-4",
				children: [prev && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go(prev),
					className: "inline-flex h-11 items-center gap-0.5 text-base font-medium text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" }), "Back"]
				}), wallet && step !== "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						disconnectWallet();
						setWallet(null);
						setSol(null);
					},
					className: "ml-auto font-medium text-muted",
					children: sol === null ? `${wallet.slice(0, 4)}…${wallet.slice(-4)}` : `${sol.toFixed(3)} SOL`
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
								value: wallet ? `${wallet.slice(0, 4)}…${wallet.slice(-4)}` : "",
								placeholder: walletReady ? "Phantom" : "Install Phantom",
								readOnly: true,
								onChange: () => {}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-sm text-muted",
								children: "Mainnet. You sign every transaction."
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
						step === "logo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Set the look",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoField, {
									file,
									preview,
									onFile: setFile
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "First buy",
									value: solBuy,
									onChange: setSolBuy,
									placeholder: "0.00",
									inputMode: "decimal",
									suffix: "SOL"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setHolderReward((v) => !v),
									className: `flex h-14 w-full items-center justify-between rounded-card border border-dashed px-4 text-left ${holderReward ? "border-primary text-fg" : "border-line text-muted"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium tracking-widest",
										children: "HOLDER REWARDS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: holderReward ? "font-semibold text-primary" : "",
										children: holderReward ? "On" : "Off"
									})]
								})
							]
						}),
						step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Ready to launch",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
								ok: true,
								title: "Ready",
								detail: `First buy ${Number(solBuy || "0") || 0} SOL`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-card bg-surface px-4 py-3",
								children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: preview,
									alt: "",
									className: "h-12 w-12 rounded-xl object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-12 rounded-xl bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-lg font-semibold",
										children: name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted",
										children: ["$", symbol]
									})]
								})]
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
									href: `https://solscan.io/tx/${launched.signature}`,
									target: "_blank",
									rel: "noreferrer",
									className: "block text-center font-medium text-primary",
									children: "View transaction"
								})
							]
						}),
						step === "mint" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: "Which coin?",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
								label: "Mint",
								value: mint,
								onChange: setMint,
								placeholder: "Paste mint address"
							}), history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-2",
								children: history.slice(0, 3).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMint(h.mint),
									className: "flex h-14 items-center gap-3 rounded-card border border-dashed border-line px-4 text-left",
									children: [h.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: h.image,
										alt: "",
										className: "h-8 w-8 rounded-lg object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-8 w-8 rounded-lg bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold",
										children: ["$", h.symbol]
									})]
								}, h.mint))
							})]
						}),
						step === "trade" && coin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
							title: coin.meta?.name || "Trade",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
									value: side,
									options: [{
										id: "buy",
										label: "Buy"
									}, {
										id: "sell",
										label: "Sell"
									}],
									onChange: setSide
								}),
								side === "buy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Spend",
									value: solAmt,
									onChange: setSolAmt,
									placeholder: "0.00",
									inputMode: "decimal",
									suffix: "SOL"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Sell",
									value: tokenAmt,
									onChange: setTokenAmt,
									placeholder: "0",
									inputMode: "decimal"
								}),
								side === "sell" && coin.balanceUi > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center gap-2",
									children: [
										25,
										50,
										100
									].map((pct) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted",
										onClick: () => setTokenAmt((coin.balanceUi * pct / 100).toString()),
										children: [pct, "%"]
									}, pct))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, {
									ok: true,
									title: coin.curve ? coin.curve.complete ? "Graduated" : "On curve" : "Jupiter",
									detail: coin.curve && !coin.curve.complete ? `${coin.curve.realSol.toFixed(3)} SOL in curve` : `You hold ${coin.balanceUi.toLocaleString()}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatField, {
									label: "Slippage",
									value: slippage,
									onChange: setSlippage,
									placeholder: "10",
									inputMode: "decimal",
									suffix: "%"
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
					step === "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIntent("trade");
							go(wallet ? "mint" : "wallet");
						},
						className: "mt-3 h-11 w-full text-base font-medium text-muted",
						children: "Trade instead"
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
					className: file ? "text-fg" : "text-muted",
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
