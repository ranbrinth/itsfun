import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  loadBalance,
  loadCoin,
  loadCreated,
  loadFees,
  loadLaunchConfig,
  prepareCollect,
  prepareLaunch,
  prepareTrade,
  previewLaunch,
  uploadCoinMeta,
} from "@/lib/launch.functions";
import { connectWallet, disconnectWallet, freshMint, hasWallet, signAndSend } from "@/lib/wallet";

export const Route = createFileRoute("/")({ component: Home });

type Cluster = "mainnet" | "devnet";
type Intent = "launch" | "trade" | "fees";
type Step =
  | "welcome"
  | "wallet"
  | "name"
  | "story"
  | "logo"
  | "quote"
  | "fee"
  | "review"
  | "live"
  | "coins"
  | "trade"
  | "fees";

type Launch = {
  mint: string;
  name: string;
  symbol: string;
  image: string;
  signature: string;
  at: number;
  cluster?: Cluster;
  quoteLabel?: string;
};

type CoinView = Awaited<ReturnType<typeof loadCoin>>;
type LaunchConfig = Awaited<ReturnType<typeof loadLaunchConfig>>;
type Preview = Awaited<ReturnType<typeof previewLaunch>>;
type CreatedCoin = Awaited<ReturnType<typeof loadCreated>>["coins"][number];
type FeeView = Awaited<ReturnType<typeof loadFees>>;

const HISTORY_KEY = "funned.launches";
const CLUSTER_KEY = "funned.cluster";
const SOL_MINT = "So11111111111111111111111111111111111111112";

function messageOf(e: unknown) {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e && "message" in e) return String((e as { message: unknown }).message);
  return "Something failed.";
}

function short(value: string) {
  if (value.length < 12) return value;
  return `${value.slice(0, 4)}…${value.slice(-4)}`;
}

function Home() {
  const [step, setStep] = useState<Step>("welcome");
  const [intent, setIntent] = useState<Intent>("launch");
  const [cluster, setCluster] = useState<Cluster>("devnet");
  const [wallet, setWallet] = useState<string | null>(null);
  const [sol, setSol] = useState<number | null>(null);
  const [walletReady, setWalletReady] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<Launch[]>([]);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [website, setWebsite] = useState("");
  const [solBuy, setSolBuy] = useState("0.05");
  const [holderReward, setHolderReward] = useState(false);
  const [customFee, setCustomFee] = useState(false);
  const [feeBps, setFeeBps] = useState("100");
  const [quoteMint, setQuoteMint] = useState(SOL_MINT);
  const [config, setConfig] = useState<LaunchConfig | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [previewBusy, setPreviewBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [launched, setLaunched] = useState<Launch | null>(null);

  const [coins, setCoins] = useState<CreatedCoin[]>([]);
  const [coinsBusy, setCoinsBusy] = useState(false);
  const [coin, setCoin] = useState<CoinView | null>(null);
  const [solAmt, setSolAmt] = useState("0.01");
  const [slippage, setSlippage] = useState("10");
  const [fees, setFees] = useState<FeeView | null>(null);
  const [feesBusy, setFeesBusy] = useState(false);
  const [coinTick, setCoinTick] = useState(0);

  const image = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  useEffect(() => {
    setWalletReady(hasWallet());
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as Launch[]);
      const saved = localStorage.getItem(CLUSTER_KEY);
      if (saved === "mainnet" || saved === "devnet") setCluster(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!wallet) return;
    let stop = false;
    loadBalance({ data: { user: wallet, cluster } })
      .then((b) => {
        if (!stop) setSol(b.sol);
      })
      .catch(() => {});
    return () => {
      stop = true;
    };
  }, [wallet, cluster]);

  useEffect(() => {
    let stop = false;
    loadLaunchConfig({ data: { cluster } })
      .then((next) => {
        if (stop || !next?.quotes?.length) return;
        setConfig(next);
        setQuoteMint((prev) => (next.quotes.some((q) => q.mint === prev) ? prev : next.quotes[0].mint));
      })
      .catch(() => {});
    return () => {
      stop = true;
    };
  }, [cluster]);

  const quote = config?.quotes.find((q) => q.mint === quoteMint);
  const quoteLabel = quote?.label ?? "SOL";
  const creatorFeeBps = customFee ? Number(feeBps || "0") : 0;

  useEffect(() => {
    if (step !== "review") return;
    let stop = false;
    setPreviewBusy(true);
    previewLaunch({
      data: {
        cluster,
        quoteMint,
        quoteUi: Number(solBuy || "0"),
        creatorFeeBps: Number.isFinite(creatorFeeBps) ? creatorFeeBps : 0,
      },
    })
      .then((next) => {
        if (!stop) setPreview(next);
      })
      .catch((e) => {
        if (!stop) setStatus(messageOf(e));
      })
      .finally(() => {
        if (!stop) setPreviewBusy(false);
      });
    return () => {
      stop = true;
    };
  }, [step, cluster, quoteMint, solBuy, creatorFeeBps]);

  useEffect(() => {
    if (step !== "coins" || !wallet) return;
    let stop = false;
    setCoinsBusy(true);
    loadCreated({
      data: {
        user: wallet,
        cluster,
        extra: history
          .filter((h) => !h.cluster || h.cluster === cluster)
          .map((h) => ({ mint: h.mint, name: h.name, symbol: h.symbol, image: h.image })),
      },
    })
      .then((res) => {
        if (stop || !res?.coins) return;
        setCoins(res.coins);
        setSol(res.sol);
      })
      .catch((e) => {
        if (!stop) setStatus(messageOf(e));
      })
      .finally(() => {
        if (!stop) setCoinsBusy(false);
      });
    return () => {
      stop = true;
    };
  }, [step, wallet, cluster, history, coinTick]);

  useEffect(() => {
    if (step !== "fees" || !wallet) return;
    let stop = false;
    setFeesBusy(true);
    loadFees({ data: { user: wallet, cluster } })
      .then((next) => {
        if (!stop) setFees(next);
      })
      .catch((e) => {
        if (!stop) setStatus(messageOf(e));
      })
      .finally(() => {
        if (!stop) setFeesBusy(false);
      });
    return () => {
      stop = true;
    };
  }, [step, wallet, cluster]);

  function go(next: Step) {
    setStatus(null);
    setStep(next);
  }

  function chooseCluster(next: Cluster) {
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
      const pinned = await uploadCoinMeta({
        data: {
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          description: description.trim(),
          imageBase64: dataUrl,
          imageType: file.type || "image/png",
          twitter: twitter.trim(),
          telegram: telegram.trim(),
          website: website.trim(),
        },
      });
      const mintKp = await freshMint();
      const buy = Number(solBuy || "0");
      setStatus("Approve the transaction in your wallet.");
      const built = await prepareLaunch({
        data: {
          cluster,
          user: wallet,
          mint: mintKp.publicKey,
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          uri: pinned.uri,
          sol: buy,
          holderReward,
          quoteMint,
          creatorFeeBps: bps,
        },
      });
      const sent = await signAndSend(built.tx, mintKp.secret, cluster);
      const item: Launch = {
        mint: mintKp.publicKey,
        name: name.trim(),
        symbol: symbol.trim().toUpperCase(),
        image: pinned.image,
        signature: sent.signature,
        at: Date.now(),
        cluster,
        quoteLabel: built.quoteLabel,
      };
      setLaunched(item);
      const next = [item, ...history.filter((h) => h.mint !== item.mint)].slice(0, 12);
      setHistory(next);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      setStatus(sent.confirmed ? null : "Submitted. Confirmation is still pending.");
      setStep("live");
      loadBalance({ data: { user: wallet, cluster } })
        .then((b) => setSol(b.sol))
        .catch(() => {});
    } catch (e) {
      setStatus(messageOf(e));
    } finally {
      setBusy(false);
    }
  }

  async function openCoin(id: string) {
    if (!wallet) return;
    setBusy(true);
    setStatus("Reading the coin…");
    try {
      const view = await loadCoin({ data: { mint: id, user: wallet, cluster } });
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
      const built = await prepareTrade({
        data: {
          cluster,
          user: wallet,
          mint: coin.mint,
          side: "buy",
          sol: Number(solAmt || "0"),
          tokens: 0,
          slippage: Number(slippage || "10"),
        },
      });
      setStatus(`Approve the swap. Est. ${built.outLabel}.`);
      const sent = await signAndSend(built.tx, undefined, cluster);
      setStatus(sent.confirmed ? "Swapped." : "Submitted. Check Solscan.");
      const view = await loadCoin({ data: { mint: coin.mint, user: wallet, cluster } });
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
      const built = await prepareCollect({ data: { user: wallet, cluster } });
      const sent = await signAndSend(built.tx, undefined, cluster);
      setStatus(sent.confirmed ? "Collected." : "Submitted.");
      const next = await loadFees({ data: { user: wallet, cluster } });
      setFees(next);
      const bal = await loadBalance({ data: { user: wallet, cluster } });
      setSol(bal.sol);
    } catch (e) {
      setStatus(messageOf(e));
    } finally {
      setBusy(false);
    }
  }

  const back = (): Step | null => {
    switch (step) {
      case "wallet":
        return "welcome";
      case "name":
        return "wallet";
      case "story":
        return "name";
      case "logo":
        return "story";
      case "quote":
        return "logo";
      case "fee":
        return "quote";
      case "review":
        return "fee";
      case "live":
        return "welcome";
      case "coins":
        return "wallet";
      case "trade":
        return "coins";
      case "fees":
        return "wallet";
      default:
        return null;
    }
  };

  const claimable = fees?.quotes.some((q) => q.claimable) ?? false;
  const spendLabel =
    coin && coin.curve && !coin.curve.complete && !coin.curve.solQuoted ? coin.curve.quoteLabel : "SOL";

  const continueMeta = (): { label: string; enabled: boolean; run: () => void } => {
    switch (step) {
      case "welcome":
        return {
          label: "Continue",
          enabled: true,
          run: () => {
            setIntent("launch");
            go("wallet");
          },
        };
      case "wallet":
        return {
          label: wallet ? "Continue" : "Connect",
          enabled: !busy && (walletReady || Boolean(wallet)),
          run: () => {
            if (wallet) go(intent === "trade" ? "coins" : intent === "fees" ? "fees" : "name");
            else void onConnect();
          },
        };
      case "name":
        return {
          label: "Continue",
          enabled: name.trim().length > 0 && symbol.trim().length > 0,
          run: () => go("story"),
        };
      case "story":
        return { label: "Continue", enabled: true, run: () => go("logo") };
      case "logo":
        return { label: "Continue", enabled: Boolean(file), run: () => go("quote") };
      case "quote":
        return { label: "Continue", enabled: Number(solBuy || "0") >= 0, run: () => go("fee") };
      case "fee":
        return {
          label: "Continue",
          enabled: !customFee || (Number.isInteger(Number(feeBps)) && Number(feeBps) >= 0),
          run: () => {
            try {
              feeOrThrow();
              go("review");
            } catch (e) {
              setStatus(messageOf(e));
            }
          },
        };
      case "review":
        return { label: busy ? "Launching" : "Launch", enabled: !busy, run: () => void launch() };
      case "live":
        return {
          label: "Swap this coin",
          enabled: Boolean(launched) && !busy,
          run: () => {
            if (!launched) return;
            void openCoin(launched.mint);
          },
        };
      case "coins":
        return { label: coinsBusy ? "Reading" : "Refresh", enabled: !coinsBusy && Boolean(wallet), run: () => setCoinTick((n) => n + 1) };
      case "trade":
        return { label: busy ? "Swapping" : "Swap", enabled: !busy && Boolean(coin), run: () => void trade() };
      case "fees":
        return {
          label: busy ? "Collecting" : "Collect",
          enabled: !busy && !feesBusy && claimable,
          run: () => void collect(),
        };
    }
  };

  const cta = continueMeta();
  const prev = back();
  const creatorLabel = customFee
    ? `${Number.isFinite(creatorFeeBps) ? creatorFeeBps : 0} bps`
    : `Schedule ${preview?.scheduleCreatorFeeBps ?? config?.scheduleCreatorFeeBps ?? "—"} bps`;

  return (
    <main className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex h-16 items-center px-4">
        {prev && (
          <button type="button" onClick={() => go(prev)} className="nav-back inline-flex items-center gap-1 text-primary">
            <ChevronLeft strokeWidth={2.75} aria-hidden />
            Back
          </button>
        )}
        {wallet && step !== "welcome" && (
          <button
            type="button"
            onClick={() => {
              void disconnectWallet();
              setWallet(null);
              setSol(null);
            }}
            className="ml-auto text-sm font-medium text-muted"
          >
            {sol === null ? short(wallet) : `${sol.toFixed(3)} SOL`}
          </button>
        )}
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
        <div className="m-auto w-full max-w-md">
          {step === "welcome" && <Welcome />}
          {step === "wallet" && (
            <Screen title="Connect wallet">
              <FloatField
                label="Wallet"
                value={wallet ? short(wallet) : ""}
                placeholder={walletReady ? "Phantom" : "Install Phantom"}
                readOnly
                onChange={() => {}}
              />
              <p className="text-center text-sm text-muted">
                {cluster === "devnet" ? "Devnet. Practice before real SOL." : "Mainnet. This spends real SOL."} You sign
                every transaction.
              </p>
            </Screen>
          )}
          {step === "name" && (
            <Screen title="Name the coin">
              <FloatField label="Coin name" value={name} onChange={setName} placeholder="Enter coin name" maxLength={32} />
              <FloatField
                label="Ticker"
                value={symbol}
                onChange={(v) => setSymbol(v.toUpperCase())}
                placeholder="Enter ticker"
                maxLength={10}
              />
            </Screen>
          )}
          {step === "story" && (
            <Screen title="Tell the story">
              <FloatArea label="Description" value={description} onChange={setDescription} placeholder="What is this coin?" />
              <FloatField label="Website" value={website} onChange={setWebsite} placeholder="Optional" />
              <FloatField label="X" value={twitter} onChange={setTwitter} placeholder="Optional" />
              <FloatField label="Telegram" value={telegram} onChange={setTelegram} placeholder="Optional" />
            </Screen>
          )}
          {step === "logo" && (
            <Screen title="Set the look">
              <LogoField file={file} preview={image} onFile={setFile} />
            </Screen>
          )}
          {step === "quote" && (
            <Screen title="Quote token">
              <p className="text-center text-sm text-muted">Create v2. The curve is priced in this token.</p>
              {config && config.quotes.length > 1 ? (
                <Segment
                  value={quoteMint}
                  options={config.quotes.map((q) => ({ id: q.mint, label: q.label }))}
                  onChange={setQuoteMint}
                />
              ) : (
                <StatusCard ok title={quoteLabel} detail="Default quote" />
              )}
              <FloatField
                label="First buy"
                value={solBuy}
                onChange={setSolBuy}
                placeholder="0.00"
                inputMode="decimal"
                suffix={quoteLabel}
              />
              {(config?.holderRewardEnabled ?? true) && (
                <RadioRow label="Holder rewards" on={holderReward} onToggle={() => setHolderReward((v) => !v)} />
              )}
            </Screen>
          )}
          {step === "fee" && (
            <Screen title="Creator fee">
              <StatusCard
                ok
                title={config?.creatorFeeConfigurable === false ? "Fixed schedule" : "Your fee"}
                detail={
                  config
                    ? `Protocol ${config.protocolFeeBps} bps · max ${config.maxCreatorFeeBps} bps`
                    : "Reading the fee schedule…"
                }
              />
              <RadioRow label="Custom creator fee" on={customFee} onToggle={() => setCustomFee((v) => !v)} />
              {customFee && (
                <FloatField
                  label="Basis points"
                  value={feeBps}
                  onChange={(v) => setFeeBps(v.replace(/[^\d]/g, ""))}
                  placeholder="100"
                  inputMode="decimal"
                  suffix="bps"
                />
              )}
            </Screen>
          )}
          {step === "review" && (
            <Screen title="Ready to launch">
              <div className="flex flex-col items-center gap-2">
                {image ? (
                  <img src={image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                ) : (
                  <div className="h-20 w-20 rounded-2xl bg-surface" />
                )}
                <p className="text-2xl font-bold">{name || "Unnamed"}</p>
                <p className="text-muted">${symbol || "—"}</p>
              </div>
              <div className="rounded-card bg-surface px-4 py-2">
                <Row k="Supply" v={preview?.supply ?? config?.supply ?? "—"} />
                <Row k="Decimals" v={String(preview?.decimals ?? config?.decimals ?? 6)} />
                <Row k="Ticker" v={symbol.toUpperCase() || "—"} />
                <Row k="Symbol" v={symbol ? `$${symbol.toUpperCase()}` : "—"} />
                <Row k="Dev wallet" v={wallet ? short(wallet) : "—"} />
                <Row k="Network" v={cluster === "devnet" ? "Devnet" : "Mainnet"} />
                <Row k="Quote" v={`${preview?.quoteLabel ?? quoteLabel}`} />
                <Row k="First buy" v={`${solBuy || "0"} ${preview?.quoteLabel ?? quoteLabel}`} />
                <Row k="Est. tokens" v={previewBusy ? "…" : (preview?.estimatedTokens ?? "—")} />
                <Row k="Protocol fee" v={`${preview?.protocolFeeBps ?? config?.protocolFeeBps ?? "—"} bps`} />
                <Row k="Creator fee" v={creatorLabel} />
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-sm text-muted">Holder rewards</span>
                  <Dot on={holderReward} />
                </div>
              </div>
            </Screen>
          )}
          {step === "live" && launched && (
            <Screen title="You're live">
              <p className="text-center text-muted">Welcome to</p>
              <p className="-mt-4 text-center text-4xl font-bold tracking-tight">${launched.symbol}</p>
              <StatusCard ok={status === null} title={status ? "Pending" : "Confirmed"} detail={launched.name} />
              <a
                href={`https://solscan.io/tx/${launched.signature}${cluster === "devnet" ? "?cluster=devnet" : ""}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center font-medium text-primary"
              >
                View transaction
              </a>
            </Screen>
          )}
          {step === "coins" && (
            <Screen title="Your coins">
              <p className="text-center text-3xl font-bold">{sol === null ? "—" : `${sol.toFixed(3)} SOL`}</p>
              <p className="text-center text-sm text-muted">
                {cluster === "devnet" ? "Devnet" : "Mainnet"} balance. Tap a coin to swap SOL into it.
              </p>
              {coinsBusy && <p className="text-center text-sm text-muted">Reading coins from this wallet…</p>}
              {!coinsBusy && coins.length === 0 && (
                <StatusCard ok={false} title="None yet" detail="Launch one, or switch cluster." />
              )}
              <div className="flex flex-col gap-2">
                {coins.map((row) => (
                  <button
                    key={row.mint}
                    type="button"
                    onClick={() => void openCoin(row.mint)}
                    className="flex h-16 items-center gap-3 rounded-card border border-dashed border-line px-4 text-left"
                  >
                    {row.image ? (
                      <img src={row.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <span className="h-10 w-10 rounded-lg bg-surface-2" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">${row.symbol || short(row.mint)}</span>
                      <span className="block text-sm text-muted">
                        {row.balanceUi.toLocaleString()} · {row.quoteLabel}
                        {row.complete ? " · graduated" : ""}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </Screen>
          )}
          {step === "trade" && coin && (
            <Screen title="Swap">
              <div className="text-center">
                <p className="text-lg text-muted">{coin.meta?.name || "Coin"}</p>
                <p className="text-4xl font-bold tracking-tight">${coin.meta?.symbol || short(coin.mint)}</p>
              </div>
              <StatusCard
                ok
                title={`${(sol ?? coin.sol).toFixed(3)} SOL`}
                detail={`You hold ${coin.balanceUi.toLocaleString()} ${coin.meta?.symbol || ""}`.trim()}
              />
              <FloatField
                label="Spend"
                value={solAmt}
                onChange={setSolAmt}
                placeholder="0.00"
                inputMode="decimal"
                suffix={spendLabel}
              />
              <FloatField label="Slippage" value={slippage} onChange={setSlippage} placeholder="10" inputMode="decimal" suffix="%" />
              <p className="text-center text-sm text-muted">
                {coin.curve && !coin.curve.complete
                  ? `Curve in ${coin.curve.quoteLabel}. ${coin.curve.realQuoteUi.toLocaleString()} in reserves.`
                  : cluster === "mainnet"
                    ? "Graduated. Routed through Jupiter for SOL."
                    : "Not on the devnet curve."}
              </p>
            </Screen>
          )}
          {step === "fees" && (
            <Screen title="Collect fees">
              <p className="text-center text-sm text-muted">
                Creator fees and quote rewards for this wallet on {cluster === "devnet" ? "devnet" : "mainnet"}.
              </p>
              {feesBusy && <p className="text-center text-sm text-muted">Reading vaults…</p>}
              {!feesBusy && (fees?.quotes.length ?? 0) === 0 && (
                <StatusCard ok={false} title="Nothing to collect" detail="Trade your coins to earn fees." />
              )}
              <div className="flex flex-col gap-2">
                {fees?.quotes.map((row) => (
                  <div key={row.mint} className="flex h-16 items-center justify-between rounded-card bg-surface px-4">
                    <div>
                      <p className="font-semibold">{row.label}</p>
                      <p className="text-sm text-muted">{short(row.mint)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{row.amount}</span>
                      <Dot on={row.claimable} />
                    </div>
                  </div>
                ))}
              </div>
            </Screen>
          )}
        </div>
      </div>

      <footer className="dock mx-auto w-full max-w-md px-6 pt-2">
        {status && step !== "live" && <p className="mb-3 text-center text-sm text-danger">{status}</p>}
        <button
          type="button"
          disabled={!cta.enabled}
          onClick={cta.run}
          className={`inline-flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg font-semibold ${
            cta.enabled ? "bg-primary text-fg" : "bg-surface text-muted"
          }`}
        >
          {busy && <Loader2 className="h-5 w-5 animate-spin" />}
          {cta.label}
        </button>
        {step === "wallet" && (
          <div className="mt-4">
            <Segment
              value={cluster}
              options={[
                { id: "devnet", label: "Devnet" },
                { id: "mainnet", label: "Mainnet" },
              ]}
              onChange={chooseCluster}
            />
            <p className="mt-2 text-center text-xs text-muted">Uses the Helius mainnet and devnet RPC in .env</p>
          </div>
        )}
        {step === "welcome" && (
          <div className="mt-1 flex flex-col">
            <button
              type="button"
              onClick={() => {
                setIntent("trade");
                go("wallet");
              }}
              className="mt-3 h-11 w-full text-base font-medium text-muted"
            >
              Trade instead
            </button>
            <button
              type="button"
              onClick={() => {
                setIntent("fees");
                go("wallet");
              }}
              className="h-11 w-full text-base font-medium text-muted"
            >
              Collect fees
            </button>
          </div>
        )}
      </footer>
    </main>
  );
}

function Welcome() {
  return (
    <div className="py-10 text-center">
      <p className="text-lg text-muted">Welcome to</p>
      <h1 className="mt-2 text-5xl font-bold tracking-tight">funned</h1>
    </div>
  );
}

function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-muted">{k}</span>
      <span className="text-right font-semibold">{v}</span>
    </div>
  );
}

function Dot({ on }: { on: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-primary" : "border-line"}`}
      aria-hidden
    >
      {on ? <span className="h-3 w-3 rounded-full bg-primary" /> : null}
    </span>
  );
}

function RadioRow({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`flex h-14 w-full items-center justify-between rounded-card border border-dashed px-4 text-left ${
        on ? "border-primary" : "border-line"
      }`}
    >
      <span className={`text-xs font-medium tracking-widest ${on ? "text-primary" : "text-muted"}`}>{label.toUpperCase()}</span>
      <Dot on={on} />
    </button>
  );
}

function FloatField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  inputMode,
  readOnly,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  maxLength?: number;
  inputMode?: "decimal" | "text";
  readOnly?: boolean;
  suffix?: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="relative block">
      <span
        className={`absolute left-4 top-0 z-10 -translate-y-1/2 bg-bg px-1 text-xs font-medium tracking-widest ${
          focus ? "text-primary" : "text-muted"
        }`}
      >
        {label.toUpperCase()}
      </span>
      <input
        value={value}
        readOnly={readOnly}
        maxLength={maxLength}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`h-14 w-full rounded-card border border-dashed bg-bg px-4 text-lg text-fg outline-none placeholder:text-muted ${
          suffix ? "pr-16" : ""
        } ${focus ? "border-primary" : "border-line"}`}
      />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted">{suffix}</span>}
    </label>
  );
}

function FloatArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="relative block">
      <span
        className={`absolute left-4 top-0 z-10 -translate-y-1/2 bg-bg px-1 text-xs font-medium tracking-widest ${
          focus ? "text-primary" : "text-muted"
        }`}
      >
        {label.toUpperCase()}
      </span>
      <textarea
        value={value}
        maxLength={400}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`min-h-28 w-full resize-none rounded-card border border-dashed bg-bg px-4 py-4 text-lg text-fg outline-none placeholder:text-muted ${
          focus ? "border-primary" : "border-line"
        }`}
      />
    </label>
  );
}

function LogoField({ file, preview, onFile }: { file: File | null; preview: string; onFile: (f: File | null) => void }) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="relative block">
      <span
        className={`absolute left-4 top-0 z-10 -translate-y-1/2 bg-bg px-1 text-xs font-medium tracking-widest ${
          focus ? "text-primary" : "text-muted"
        }`}
      >
        LOGO
      </span>
      <span
        className={`flex h-14 items-center gap-3 rounded-card border border-dashed px-4 ${
          focus ? "border-primary" : "border-line"
        }`}
      >
        {preview ? <img src={preview} alt="" className="h-8 w-8 rounded-lg object-cover" /> : null}
        <span className={file ? "truncate text-fg" : "text-muted"}>{file ? file.name : "Add a logo"}</span>
      </span>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="absolute inset-0 cursor-pointer opacity-0"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

function StatusCard({ ok, title, detail }: { ok: boolean; title: string; detail: string }) {
  return (
    <div className="rounded-card bg-surface px-4 py-6 text-center">
      <p className={`text-lg font-semibold ${ok ? "text-ok" : "text-muted"}`}>
        <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-ok" : "bg-muted"}`} />
        {title}
      </p>
      <p className="mt-1 text-lg font-semibold">{detail}</p>
    </div>
  );
}

function Segment<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex rounded-full bg-surface p-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`h-10 flex-1 rounded-full text-sm font-semibold ${
            value === opt.id ? "bg-surface-2 text-fg" : "text-muted"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.readAsDataURL(file);
  });
}
