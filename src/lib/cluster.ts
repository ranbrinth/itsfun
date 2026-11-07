export type Cluster = "mainnet" | "devnet";

export function parseCluster(value: unknown): Cluster {
  return value === "devnet" ? "devnet" : "mainnet";
}
