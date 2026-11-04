import { sendSignedTx } from "./launch.functions";

type SolanaProvider = {
  isPhantom?: boolean;
  publicKey: { toBase58?: () => string; toString: () => string } | null;
  connect: () => Promise<{ publicKey: { toBase58?: () => string; toString: () => string } }>;
  disconnect: () => Promise<void>;
  signTransaction: (tx: unknown) => Promise<{ serialize: () => Uint8Array }>;
};

function provider(): SolanaProvider | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    solana?: SolanaProvider;
    phantom?: { solana?: SolanaProvider };
  };
  return w.phantom?.solana ?? w.solana ?? null;
}

export function hasWallet() {
  return Boolean(provider());
}

function keyOf(pk: { toBase58?: () => string; toString: () => string }) {
  return pk.toBase58 ? pk.toBase58() : pk.toString();
}

export async function connectWallet(): Promise<string> {
  const p = provider();
  if (!p) throw new Error("Install Phantom (or another Solana wallet) and refresh.");
  const res = await p.connect();
  return keyOf(res.publicKey);
}

export async function disconnectWallet() {
  const p = provider();
  await p?.disconnect();
}

export async function freshMint() {
  const { Keypair } = await import("@solana/web3.js");
  const kp = Keypair.generate();
  return { publicKey: kp.publicKey.toBase58(), secret: kp.secretKey };
}

export async function signAndSend(txB64: string, mintSecret?: Uint8Array) {
  const { Buffer } = await import("buffer");
  const { Keypair, VersionedTransaction } = await import("@solana/web3.js");
  const p = provider();
  if (!p) throw new Error("Wallet disconnected.");
  const tx = VersionedTransaction.deserialize(Buffer.from(txB64, "base64"));
  if (mintSecret) tx.sign([Keypair.fromSecretKey(mintSecret)]);
  const signed = await p.signTransaction(tx);
  return sendSignedTx({ data: { tx: Buffer.from(signed.serialize()).toString("base64") } });
}
