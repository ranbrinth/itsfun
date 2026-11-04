import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Loader2, Rocket, Wallet, Search } from "lucide-react";
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

const HISTORY_KEY = "funned.launches";

function messageOf(e: unknown) {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e && "message" in e) return String((e as { message: unknown }).message);
  return "Something failed.";
}

function Home() {
  const [tab, setTab] = useState<"launch" | "trade">("launch");
  const [wallet, setWallet] = useState<string | null>(null);
  const [sol, setSol] = useState<number | null>(null);
  const [walletReady, setWalletReady] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<Launch[]>([]);

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

  function remember(item: Launch) {
    const next = [item, ...history.filter((h) => h.mint !== item.mint)].slice(0, 12);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-5 md:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="font-mono text-xs tracking-[0.22em] text-primary">MAINNET</p>
          <h1 className="text-3xl font-semibold tracking-tight">FUNNED</h1>
          <p className="text-sm text-muted">Pump bonding curve. Real SOL. Your wallet signs.</p>
        </div>
        <WalletButton
          wallet={wallet}
          sol={sol}
          ready={walletReady}
          onConnect={async () => {
            const pk = await connectWallet();
            setWallet(pk);
          }}
          onDisconnect={async () => {
            await disconnectWallet();
            setWallet(null);
            setSol(null);
          }}
        />
      </header>

      <div className="mb-5 flex gap-2">
        {(["launch", "trade"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === id ? "bg-primary text-primary-ink" : "bg-surface text-muted"
            }`}
          >
            {id === "launch" ? "Launch" : "Trade"}
          </button>
        ))}
      </div>

      {status && (
        <p className="mb-4 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-fg">{status}</p>
      )}

      {tab === "launch" ? (
        <LaunchPanel
          wallet={wallet}
          busy={busy}
          setBusy={setBusy}
          setStatus={setStatus}
          onDone={(item) => {
            remember(item);
            if (wallet) {
              loadBalance({ data: { user: wallet } })
                .then((b) => setSol(b.sol))
                .catch(() => {});
            }
          }}
        />
      ) : (
        <TradePanel
          wallet={wallet}
          busy={busy}
          setBusy={setBusy}
          setStatus={setStatus}
          seedMint={history[0]?.mint}
        />
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted">Launched in this browser</h2>
        {history.length === 0 ? (
          <p className="text-sm text-muted">Nothing yet. A confirmed launch shows up here with Solscan links.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {history.map((h) => (
              <li key={h.mint} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
                {h.image ? (
                  <img src={h.image} alt="" className="h-11 w-11 rounded-md object-cover" />
                ) : (
                  <div className="h-11 w-11 rounded-md bg-surface-2" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {h.name} <span className="text-muted">${h.symbol}</span>
                  </p>
                  <p className="truncate font-mono text-xs text-muted">{h.mint}</p>
                </div>
                <a
                  className="text-primary"
                  href={`https://solscan.io/token/${h.mint}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open on Solscan"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function WalletButton({
  wallet,
  sol,
  ready,
  onConnect,
  onDisconnect,
}: {
  wallet: string | null;
  sol: number | null;
  ready: boolean;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}) {
  const [err, setErr] = useState<string | null>(null);
  if (!ready) {
    return (
      <a
        href="https://phantom.app/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-ink"
      >
        <Wallet className="h-4 w-4" /> Get Phantom
      </a>
    );
  }
  if (!wallet) {
    return (
      <div className="text-right">
        <button
          type="button"
          onClick={() => {
            setErr(null);
            onConnect().catch((e) => setErr(messageOf(e)));
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-ink"
        >
          <Wallet className="h-4 w-4" /> Connect wallet
        </button>
        {err && <p className="mt-1 max-w-xs text-xs text-danger">{err}</p>}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onDisconnect()}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 font-mono text-sm"
    >
      <span className="text-primary">{sol === null ? "…" : `${sol.toFixed(3)} SOL`}</span>
      <span className="text-muted">
        {wallet.slice(0, 4)}…{wallet.slice(-4)}
      </span>
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-bg px-3 text-fg outline-none focus:border-primary";

function LaunchPanel({
  wallet,
  busy,
  setBusy,
  setStatus,
  onDone,
}: {
  wallet: string | null;
  busy: boolean;
  setBusy: (v: boolean) => void;
  setStatus: (v: string | null) => void;
  onDone: (item: Launch) => void;
}) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [website, setWebsite] = useState("");
  const [solBuy, setSolBuy] = useState("0.05");
  const [holderReward, setHolderReward] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  useEffect(() => {
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
      const mint = await freshMint();
      const sol = Number(solBuy || "0");
      setStatus("Building create transaction…");
      const built = await prepareLaunch({
        data: {
          user: wallet,
          mint: mint.publicKey,
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          uri: pinned.uri,
          sol,
          holderReward,
        },
      });
      setStatus(
        built.mode === "create"
          ? "Approve the create in your wallet."
          : `Approve create + buy (~${built.estimatedTokens} tokens).`,
      );
      const sent = await signAndSend(built.tx, mint.secret);
      setStatus(
        sent.confirmed
          ? `Live. Mint ${mint.publicKey}`
          : `Submitted ${sent.signature}. Confirmation still pending — check Solscan.`,
      );
      onDone({
        mint: mint.publicKey,
        name: name.trim(),
        symbol: symbol.trim().toUpperCase(),
        image: pinned.image,
        signature: sent.signature,
        at: Date.now(),
      });
    } catch (e) {
      setStatus(messageOf(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        className="grid gap-3 rounded-lg border border-border bg-surface p-4"
        onSubmit={(e) => {
          e.preventDefault();
          void launch();
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input className={inputClass} maxLength={32} value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="Ticker">
            <input
              className={inputClass}
              maxLength={10}
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              required
            />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            className="min-h-24 w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg outline-none focus:border-primary"
            maxLength={400}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Website">
            <input className={inputClass} value={website} onChange={(e) => setWebsite(e.target.value)} />
          </Field>
          <Field label="X">
            <input className={inputClass} value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </Field>
          <Field label="Telegram">
            <input className={inputClass} value={telegram} onChange={(e) => setTelegram(e.target.value)} />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Initial buy (SOL)">
            <input
              className={inputClass}
              inputMode="decimal"
              value={solBuy}
              onChange={(e) => setSolBuy(e.target.value)}
            />
          </Field>
          <Field label="Logo">
            <input
              className="block h-11 w-full text-sm text-muted file:mr-3 file:h-11 file:border-0 file:bg-surface-2 file:px-3 file:text-fg"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={holderReward} onChange={(e) => setHolderReward(e.target.checked)} />
          Holder rewards (creator fees set aside for holders)
        </label>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-ink disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
          {busy ? "Working" : "Launch on mainnet"}
        </button>
        <p className="text-xs text-muted">
          Create uses pump <span className="font-mono">create_v2</span> and an optional first buy in one transaction.
          You pay rent plus the buy. This is not a simulation.
        </p>
      </form>
      <aside className="rounded-lg border border-border bg-surface p-4">
        <p className="text-xs tracking-wide text-muted">Preview</p>
        <div className="mt-3 flex items-center gap-3">
          {preview ? (
            <img src={preview} alt="" className="h-16 w-16 rounded-lg object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-surface-2" />
          )}
          <div>
            <p className="text-xl font-semibold">{name || "Unnamed"}</p>
            <p className="font-mono text-primary">{symbol ? `$${symbol}` : "$"}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{description || "Description shows on the token metadata."}</p>
      </aside>
    </div>
  );
}

function TradePanel({
  wallet,
  busy,
  setBusy,
  setStatus,
  seedMint,
}: {
  wallet: string | null;
  busy: boolean;
  setBusy: (v: boolean) => void;
  setStatus: (v: string | null) => void;
  seedMint?: string;
}) {
  const [mint, setMint] = useState(seedMint ?? "");
  const [coin, setCoin] = useState<CoinView | null>(null);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [solAmt, setSolAmt] = useState("0.01");
  const [tokenAmt, setTokenAmt] = useState("");
  const [slippage, setSlippage] = useState("10");

  async function lookup(target = mint) {
    const trimmed = target.trim();
    if (trimmed.length < 32) {
      setStatus("Paste a mint address.");
      return;
    }
    setBusy(true);
    setStatus("Reading curve…");
    try {
      const view = await loadCoin({ data: { mint: trimmed, user: wallet ?? undefined } });
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
      setStatus(`Approve ${side} on ${built.venue}. Est. ${built.outLabel}.`);
      const sent = await signAndSend(built.tx);
      setStatus(sent.confirmed ? `Filled ${sent.signature}` : `Submitted ${sent.signature}`);
      const view = await loadCoin({ data: { mint: coin.mint, user: wallet } });
      setCoin(view);
    } catch (e) {
      setStatus(messageOf(e));
    } finally {
      setBusy(false);
    }
  }

  const venue = !coin?.curve ? "Jupiter" : coin.curve.complete || !coin.curve.solQuoted ? "Jupiter" : "Bonding curve";

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-border bg-surface p-4">
        <Field label="Mint">
          <div className="flex gap-2">
            <input className={inputClass} value={mint} onChange={(e) => setMint(e.target.value)} placeholder="Mint address" />
            <button
              type="button"
              onClick={() => void lookup()}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-2"
              aria-label="Load mint"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </Field>
        {coin && (
          <div className="mt-4 flex items-center gap-3">
            {coin.meta?.image ? (
              <img src={coin.meta.image} alt="" className="h-12 w-12 rounded-md object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-md bg-surface-2" />
            )}
            <div>
              <p className="font-semibold">
                {coin.meta?.name || "Token"} <span className="text-muted">${coin.meta?.symbol || ""}</span>
              </p>
              <p className="text-sm text-muted">
                {coin.curve
                  ? coin.curve.complete
                    ? "Graduated"
                    : `${coin.curve.realSol.toFixed(3)} SOL in curve`
                  : "No bonding curve — Jupiter only"}
                {" · "}
                {coin.tokenProgram}
              </p>
              <p className="font-mono text-xs text-primary">You hold {coin.balanceUi.toLocaleString()} </p>
            </div>
          </div>
        )}
      </div>
      <div className="rounded-lg border border-border bg-surface p-4">
        <div className="mb-3 flex gap-2">
          {(["buy", "sell"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`h-10 flex-1 rounded-lg font-semibold ${
                side === s ? "bg-primary text-primary-ink" : "bg-bg text-muted"
              }`}
            >
              {s === "buy" ? "Buy" : "Sell"}
            </button>
          ))}
        </div>
        {side === "buy" ? (
          <Field label="SOL in">
            <input className={inputClass} value={solAmt} onChange={(e) => setSolAmt(e.target.value)} />
          </Field>
        ) : (
          <Field label="Tokens out">
            <input className={inputClass} value={tokenAmt} onChange={(e) => setTokenAmt(e.target.value)} />
            {coin && coin.balanceUi > 0 && (
              <div className="mt-2 flex gap-2">
                {[25, 50, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    className="rounded-full bg-bg px-3 py-1 text-xs text-muted"
                    onClick={() => setTokenAmt(((coin.balanceUi * pct) / 100).toString())}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            )}
          </Field>
        )}
        <div className="mt-3">
          <Field label="Slippage %">
            <input className={inputClass} value={slippage} onChange={(e) => setSlippage(e.target.value)} />
          </Field>
        </div>
        <p className="mt-3 text-xs text-muted">Route: {venue}. Graduated or non-SOL quotes go through Jupiter.</p>
        <button
          type="button"
          disabled={busy}
          onClick={() => void trade()}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-ink disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {side === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
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
