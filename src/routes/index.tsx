import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { loadBalance, loadCoin, prepareLaunch, prepareTrade, uploadCoinMeta } from "@/lib/launch.functions";
import { connectWallet, disconnectWallet, freshMint, hasWallet, signAndSend } from "@/lib/wallet";

export const Route = createFileRoute("/")({ component: Home });

type Launch = {
  mint: string;
  name: string;
  symbol: string;
  image: string;
  signature: string;
  at: number;
};

type CoinView = Awaited<ReturnType<typeof loadCoin>>;

type Step = "welcome" | "wallet" | "name" | "story" | "logo" | "review" | "live" | "mint" | "trade";

const HISTORY_KEY = "funned.launches";

function messageOf(e: unknown) {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e && "message" in e) return String((e as { message: unknown }).message);
  return "Something failed.";
}

function Home() {
  const [step, setStep] = useState<Step>("welcome");
  const [intent, setIntent] = useState<"launch" | "trade">("launch");
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
  const [file, setFile] = useState<File | null>(null);
  const [launched, setLaunched] = useState<Launch | null>(null);

  const [mint, setMint] = useState("");
  const [coin, setCoin] = useState<CoinView | null>(null);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [solAmt, setSolAmt] = useState("0.01");
  const [tokenAmt, setTokenAmt] = useState("");
  const [slippage, setSlippage] = useState("10");

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    setWalletReady(hasWallet());
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as Launch[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!wallet) return;
    let stop = false;
    loadBalance({ data: { user: wallet } })
      .then((b) => {
        if (!stop) setSol(b.sol);
      })
      .catch(() => {});
    return () => {
      stop = true;
    };
  }, [wallet]);

  function go(next: Step) {
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
          user: wallet,
          mint: mintKp.publicKey,
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          uri: pinned.uri,
          sol: buy,
          holderReward,
        },
      });
      const sent = await signAndSend(built.tx, mintKp.secret);
      const item: Launch = {
        mint: mintKp.publicKey,
        name: name.trim(),
        symbol: symbol.trim().toUpperCase(),
        image: pinned.image,
        signature: sent.signature,
        at: Date.now(),
      };
      setLaunched(item);
      const next = [item, ...history.filter((h) => h.mint !== item.mint)].slice(0, 12);
      setHistory(next);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      setStatus(sent.confirmed ? null : "Submitted. Confirmation is still pending.");
      setStep("live");
      loadBalance({ data: { user: wallet } })
        .then((b) => setSol(b.sol))
        .catch(() => {});
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
      const view = await loadCoin({ data: { mint: trimmed, user: wallet } });
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
      const built = await prepareTrade({
        data: {
          user: wallet,
          mint: coin.mint,
          side,
          sol: Number(solAmt || "0"),
          tokens: Number(tokenAmt || "0"),
          slippage: Number(slippage || "10"),
        },
      });
      setStatus(`Approve ${side}. Est. ${built.outLabel}.`);
      const sent = await signAndSend(built.tx);
      setStatus(sent.confirmed ? "Filled." : "Submitted. Check Solscan.");
      const view = await loadCoin({ data: { mint: coin.mint, user: wallet } });
      setCoin(view);
      const bal = await loadBalance({ data: { user: wallet } });
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
      case "review":
        return "logo";
      case "live":
        return "welcome";
      case "mint":
        return "welcome";
      case "trade":
        return "mint";
      default:
        return null;
    }
  };

  const continueMeta = (): { label: string; enabled: boolean; run: () => void } => {
    switch (step) {
      case "welcome":
        return { label: "Continue", enabled: true, run: () => { setIntent("launch"); go("wallet"); } };
      case "wallet":
        return {
          label: wallet ? "Continue" : "Continue",
          enabled: !busy && (walletReady || Boolean(wallet)),
          run: () => {
            if (wallet) go(intent === "trade" ? "mint" : "name");
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
        return { label: "Continue", enabled: Boolean(file), run: () => go("review") };
      case "review":
        return { label: busy ? "Launching" : "Launch", enabled: !busy, run: () => void launch() };
      case "live":
        return {
          label: "Trade this coin",
          enabled: Boolean(launched),
          run: () => {
            if (!launched) return;
            setMint(launched.mint);
            setStatus(null);
            setBusy(true);
            loadCoin({ data: { mint: launched.mint, user: wallet ?? undefined } })
              .then((view) => {
                setCoin(view);
                setStep("trade");
              })
              .catch((e) => setStatus(messageOf(e)))
              .finally(() => setBusy(false));
          },
        };
      case "mint":
        return { label: busy ? "Loading" : "Continue", enabled: mint.trim().length >= 32 && !busy, run: () => void lookup() };
      case "trade":
        return { label: busy ? "Working" : side === "buy" ? "Buy" : "Sell", enabled: !busy && Boolean(coin), run: () => void trade() };
    }
  };

  const cta = continueMeta();
  const prev = back();

  return (
    <main className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex h-14 items-center px-4">
        {prev && (
          <button
            type="button"
            onClick={() => go(prev)}
            className="inline-flex h-11 items-center gap-0.5 text-base font-medium text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
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
            className="ml-auto font-medium text-muted"
          >
            {sol === null ? `${wallet.slice(0, 4)}…${wallet.slice(-4)}` : `${sol.toFixed(3)} SOL`}
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
                value={wallet ? `${wallet.slice(0, 4)}…${wallet.slice(-4)}` : ""}
                placeholder={walletReady ? "Phantom" : "Install Phantom"}
                readOnly
                onChange={() => {}}
              />
              <p className="text-center text-sm text-muted">Mainnet. You sign every transaction.</p>
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
              <LogoField file={file} preview={preview} onFile={setFile} />
              <FloatField
                label="First buy"
                value={solBuy}
                onChange={setSolBuy}
                placeholder="0.00"
                inputMode="decimal"
                suffix="SOL"
              />
              <button
                type="button"
                onClick={() => setHolderReward((v) => !v)}
                className={`flex h-14 w-full items-center justify-between rounded-card border border-dashed px-4 text-left ${
                  holderReward ? "border-primary text-fg" : "border-line text-muted"
                }`}
              >
                <span className="text-xs font-medium tracking-widest">HOLDER REWARDS</span>
                <span className={holderReward ? "font-semibold text-primary" : ""}>{holderReward ? "On" : "Off"}</span>
              </button>
            </Screen>
          )}
          {step === "review" && (
            <Screen title="Ready to launch">
              <StatusCard
                ok
                title="Ready"
                detail={`First buy ${Number(solBuy || "0") || 0} SOL`}
              />
              <div className="flex items-center gap-3 rounded-card bg-surface px-4 py-3">
                {preview ? (
                  <img src={preview} alt="" className="h-12 w-12 rounded-xl object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-surface-2" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold">{name}</p>
                  <p className="text-muted">${symbol}</p>
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
                href={`https://solscan.io/tx/${launched.signature}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center font-medium text-primary"
              >
                View transaction
              </a>
            </Screen>
          )}
          {step === "mint" && (
            <Screen title="Which coin?">
              <FloatField label="Mint" value={mint} onChange={setMint} placeholder="Paste mint address" />
              {history.length > 0 && (
                <div className="flex flex-col gap-2">
                  {history.slice(0, 3).map((h) => (
                    <button
                      key={h.mint}
                      type="button"
                      onClick={() => setMint(h.mint)}
                      className="flex h-14 items-center gap-3 rounded-card border border-dashed border-line px-4 text-left"
                    >
                      {h.image ? (
                        <img src={h.image} alt="" className="h-8 w-8 rounded-lg object-cover" />
                      ) : (
                        <span className="h-8 w-8 rounded-lg bg-surface-2" />
                      )}
                      <span className="font-semibold">${h.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </Screen>
          )}
          {step === "trade" && coin && (
            <Screen title={coin.meta?.name || "Trade"}>
              <Segment
                value={side}
                options={[
                  { id: "buy", label: "Buy" },
                  { id: "sell", label: "Sell" },
                ]}
                onChange={setSide}
              />
              {side === "buy" ? (
                <FloatField label="Spend" value={solAmt} onChange={setSolAmt} placeholder="0.00" inputMode="decimal" suffix="SOL" />
              ) : (
                <FloatField label="Sell" value={tokenAmt} onChange={setTokenAmt} placeholder="0" inputMode="decimal" />
              )}
              {side === "sell" && coin.balanceUi > 0 && (
                <div className="flex justify-center gap-2">
                  {[25, 50, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted"
                      onClick={() => setTokenAmt(((coin.balanceUi * pct) / 100).toString())}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              )}
              <StatusCard
                ok
                title={coin.curve ? (coin.curve.complete ? "Graduated" : "On curve") : "Jupiter"}
                detail={
                  coin.curve && !coin.curve.complete
                    ? `${coin.curve.realSol.toFixed(3)} SOL in curve`
                    : `You hold ${coin.balanceUi.toLocaleString()}`
                }
              />
              <FloatField label="Slippage" value={slippage} onChange={setSlippage} placeholder="10" inputMode="decimal" suffix="%" />
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
        {step === "welcome" && (
          <button
            type="button"
            onClick={() => {
              setIntent("trade");
              go(wallet ? "mint" : "wallet");
            }}
            className="mt-3 h-11 w-full text-base font-medium text-muted"
          >
            Trade instead
          </button>
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
        <span className={file ? "text-fg" : "text-muted"}>{file ? file.name : "Add a logo"}</span>
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
