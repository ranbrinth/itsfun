import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Server-only. Never import this from a client component. */

function dotEnv(): Record<string, string> {
  try {
    const text = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    const out: Record<string, string> = {};
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

const file = dotEnv();

function pick(key: string, fallback: string) {
  const fromProcess = process.env[key]?.trim();
  return fromProcess || file[key] || fallback;
}

export const PINATA_JWT = pick(
  "PINATA_JWT",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NThhZDNkOS1jYmI2LTQyN2UtOGJlZS1hYjczMjgwNzYzOWMiLCJlbWFpbCI6InJhbmJyaW50aEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWM1MzJkMTUyMGVlNzQ1MTAwYzIiLCJzY29wZWRLZXlTZWNyZXQiOiJiYjk0MjAzZTQ4ODZlYzMzY2EyMzI2ZTFhNWZjZjY2OWYyN2MyOGIzYWVjNmIxNjVlMWZlYTk2OTQxZDhjY2NmIiwiZXhwIjoxODA2OTM3MDIzfQ.ft2kLSdX9Snc1zJW2tWQUIRL-LQzgYSl4d0C_qLhPDc",
);

export const JUPITER_API = pick(
  "JUPITER_API",
  "jup_1fdb7754274dbce25e0c04004dfacfc345540324d330eaa413a81acdda7f6da2",
);

export const SOLANA_RPC_MAINNET = pick(
  "SOLANA_RPC_MAINNET",
  "https://mainnet.helius-rpc.com/?api-key=a5efa526-633e-4d11-b8ea-a2461bc4f0de",
);

export const SOLANA_RPC_DEVNET = pick(
  "SOLANA_RPC_DEVNET",
  "https://devnet.helius-rpc.com/?api-key=a5efa526-633e-4d11-b8ea-a2461bc4f0de",
);
