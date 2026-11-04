import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as LoaderCircle, i as Rocket, o as ArrowUpRight, r as Search, t as Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_bCkbPO.js
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
	const { Keypair } = await import("../_libs/@solana/buffer-layout-utils.mjs").then((n) => n.l);
	const kp = Keypair.generate();
	return {
		publicKey: kp.publicKey.toBase58(),
		secret: kp.secretKey
	};
}
async function signAndSend(txB64, mintSecret) {
	const { Buffer } = await import("buffer");
	const { Keypair, VersionedTransaction } = await import("../_libs/@solana/buffer-layout-utils.mjs").then((n) => n.l);
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
	const [tab, setTab] = (0, import_react.useState)("launch");
	const [wallet, setWallet] = (0, import_react.useState)(null);
	const [sol, setSol] = (0, import_react.useState)(null);
	const [walletReady, setWalletReady] = (0, import_react.useState)(true);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
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
	function remember(item) {
		const next = [item, ...history.filter((h) => h.mint !== item.mint)].slice(0, 12);
		setHistory(next);
		localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-6xl px-4 py-5 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.22em] text-primary",
						children: "MAINNET"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold tracking-tight",
						children: "FUNNED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Pump bonding curve. Real SOL. Your wallet signs."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletButton, {
					wallet,
					sol,
					ready: walletReady,
					onConnect: async () => {
						const pk = await connectWallet();
						setWallet(pk);
					},
					onDisconnect: async () => {
						await disconnectWallet();
						setWallet(null);
						setSol(null);
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex gap-2",
				children: ["launch", "trade"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: `rounded-full px-4 py-2 text-sm font-semibold ${tab === id ? "bg-primary text-primary-ink" : "bg-surface text-muted"}`,
					children: id === "launch" ? "Launch" : "Trade"
				}, id))
			}),
			status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-fg",
				children: status
			}),
			tab === "launch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchPanel, {
				wallet,
				busy,
				setBusy,
				setStatus,
				onDone: (item) => {
					remember(item);
					if (wallet) loadBalance({ data: { user: wallet } }).then((b) => setSol(b.sol)).catch(() => {});
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradePanel, {
				wallet,
				busy,
				setBusy,
				setStatus,
				seedMint: history[0]?.mint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold tracking-wide text-muted",
					children: "Launched in this browser"
				}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing yet. A confirmed launch shows up here with Solscan links."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-lg border border-border bg-surface p-3",
						children: [
							h.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: h.image,
								alt: "",
								className: "h-11 w-11 rounded-md object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-11 rounded-md bg-surface-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate font-semibold",
									children: [
										h.name,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: ["$", h.symbol]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-mono text-xs text-muted",
									children: h.mint
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-primary",
								href: `https://solscan.io/token/${h.mint}`,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "Open on Solscan",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5" })
							})
						]
					}, h.mint))
				})]
			})
		]
	});
}
function WalletButton({ wallet, sol, ready, onConnect, onDisconnect }) {
	const [err, setErr] = (0, import_react.useState)(null);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "https://phantom.app/",
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }), " Get Phantom"]
	});
	if (!wallet) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-right",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				setErr(null);
				onConnect().catch((e) => setErr(messageOf(e)));
			},
			className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }), " Connect wallet"]
		}), err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-xs text-xs text-danger",
			children: err
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onDisconnect(),
		className: "inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 font-mono text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-primary",
			children: sol === null ? "…" : `${sol.toFixed(3)} SOL`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [
				wallet.slice(0, 4),
				"…",
				wallet.slice(-4)
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-medium tracking-wide text-muted",
			children: label
		}), children]
	});
}
var inputClass = "h-11 w-full rounded-lg border border-border bg-bg px-3 text-fg outline-none focus:border-primary";
function LaunchPanel({ wallet, busy, setBusy, setStatus, onDone }) {
	const [name, setName] = (0, import_react.useState)("");
	const [symbol, setSymbol] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [twitter, setTwitter] = (0, import_react.useState)("");
	const [telegram, setTelegram] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [solBuy, setSolBuy] = (0, import_react.useState)("0.05");
	const [holderReward, setHolderReward] = (0, import_react.useState)(false);
	const [file, setFile] = (0, import_react.useState)(null);
	const preview = (0, import_react.useMemo)(() => file ? URL.createObjectURL(file) : "", [file]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);
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
			const mint = await freshMint();
			const sol = Number(solBuy || "0");
			setStatus("Building create transaction…");
			const built = await prepareLaunch({ data: {
				user: wallet,
				mint: mint.publicKey,
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				uri: pinned.uri,
				sol,
				holderReward
			} });
			setStatus(built.mode === "create" ? "Approve the create in your wallet." : `Approve create + buy (~${built.estimatedTokens} tokens).`);
			const sent = await signAndSend(built.tx, mint.secret);
			setStatus(sent.confirmed ? `Live. Mint ${mint.publicKey}` : `Submitted ${sent.signature}. Confirmation still pending — check Solscan.`);
			onDone({
				mint: mint.publicKey,
				name: name.trim(),
				symbol: symbol.trim().toUpperCase(),
				image: pinned.image,
				signature: sent.signature,
				at: Date.now()
			});
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1.2fr_0.8fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3 rounded-lg border border-border bg-surface p-4",
			onSubmit: (e) => {
				e.preventDefault();
				launch();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							maxLength: 32,
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ticker",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							maxLength: 10,
							value: symbol,
							onChange: (e) => setSymbol(e.target.value.toUpperCase()),
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-24 w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg outline-none focus:border-primary",
						maxLength: 400,
						value: description,
						onChange: (e) => setDescription(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Website",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: website,
								onChange: (e) => setWebsite(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "X",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: twitter,
								onChange: (e) => setTwitter(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Telegram",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: telegram,
								onChange: (e) => setTelegram(e.target.value)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Initial buy (SOL)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							inputMode: "decimal",
							value: solBuy,
							onChange: (e) => setSolBuy(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Logo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "block h-11 w-full text-sm text-muted file:mr-3 file:h-11 file:border-0 file:bg-surface-2 file:px-3 file:text-fg",
							type: "file",
							accept: "image/png,image/jpeg,image/webp,image/gif",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: holderReward,
						onChange: (e) => setHolderReward(e.target.checked)
					}), "Holder rewards (creator fees set aside for holders)"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: busy,
					className: "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-ink disabled:opacity-60",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), busy ? "Working" : "Launch on mainnet"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"Create uses pump ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "create_v2"
						}),
						" and an optional first buy in one transaction. You pay rent plus the buy. This is not a simulation."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-lg border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted",
					children: "Preview"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-3",
					children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview,
						alt: "",
						className: "h-16 w-16 rounded-lg object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 w-16 rounded-lg bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-semibold",
						children: name || "Unnamed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-primary",
						children: symbol ? `$${symbol}` : "$"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: description || "Description shows on the token metadata."
				})
			]
		})]
	});
}
function TradePanel({ wallet, busy, setBusy, setStatus, seedMint }) {
	const [mint, setMint] = (0, import_react.useState)(seedMint ?? "");
	const [coin, setCoin] = (0, import_react.useState)(null);
	const [side, setSide] = (0, import_react.useState)("buy");
	const [solAmt, setSolAmt] = (0, import_react.useState)("0.01");
	const [tokenAmt, setTokenAmt] = (0, import_react.useState)("");
	const [slippage, setSlippage] = (0, import_react.useState)("10");
	async function lookup(target = mint) {
		const trimmed = target.trim();
		if (trimmed.length < 32) {
			setStatus("Paste a mint address.");
			return;
		}
		setBusy(true);
		setStatus("Reading curve…");
		try {
			const view = await loadCoin({ data: {
				mint: trimmed,
				user: wallet ?? void 0
			} });
			setCoin(view);
			setStatus(null);
		} catch (e) {
			setCoin(null);
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	async function trade() {
		if (!wallet) {
			setStatus("Connect a wallet first.");
			return;
		}
		if (!coin) {
			setStatus("Load a mint first.");
			return;
		}
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
			setStatus(`Approve ${side} on ${built.venue}. Est. ${built.outLabel}.`);
			const sent = await signAndSend(built.tx);
			setStatus(sent.confirmed ? `Filled ${sent.signature}` : `Submitted ${sent.signature}`);
			const view = await loadCoin({ data: {
				mint: coin.mint,
				user: wallet
			} });
			setCoin(view);
		} catch (e) {
			setStatus(messageOf(e));
		} finally {
			setBusy(false);
		}
	}
	const venue = !coin?.curve ? "Jupiter" : coin.curve.complete || !coin.curve.solQuoted ? "Jupiter" : "Bonding curve";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mint",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: mint,
						onChange: (e) => setMint(e.target.value),
						placeholder: "Mint address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void lookup(),
						className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-2",
						"aria-label": "Load mint",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
					})]
				})
			}), coin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				children: [coin.meta?.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: coin.meta.image,
					alt: "",
					className: "h-12 w-12 rounded-md object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-12 rounded-md bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold",
						children: [
							coin.meta?.name || "Token",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["$", coin.meta?.symbol || ""]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							coin.curve ? coin.curve.complete ? "Graduated" : `${coin.curve.realSol.toFixed(3)} SOL in curve` : "No bonding curve — Jupiter only",
							" · ",
							coin.tokenProgram
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-primary",
						children: [
							"You hold ",
							coin.balanceUi.toLocaleString(),
							" "
						]
					})
				] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex gap-2",
					children: ["buy", "sell"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSide(s),
						className: `h-10 flex-1 rounded-lg font-semibold ${side === s ? "bg-primary text-primary-ink" : "bg-bg text-muted"}`,
						children: s === "buy" ? "Buy" : "Sell"
					}, s))
				}),
				side === "buy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "SOL in",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: solAmt,
						onChange: (e) => setSolAmt(e.target.value)
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Tokens out",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: tokenAmt,
						onChange: (e) => setTokenAmt(e.target.value)
					}), coin && coin.balanceUi > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex gap-2",
						children: [
							25,
							50,
							100
						].map((pct) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "rounded-full bg-bg px-3 py-1 text-xs text-muted",
							onClick: () => setTokenAmt((coin.balanceUi * pct / 100).toString()),
							children: [pct, "%"]
						}, pct))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Slippage %",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: slippage,
							onChange: (e) => setSlippage(e.target.value)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						"Route: ",
						venue,
						". Graduated or non-SOL quotes go through Jupiter."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: busy,
					onClick: () => void trade(),
					className: "mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-ink disabled:opacity-60",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, side === "buy" ? "Buy" : "Sell"]
				})
			]
		})]
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
