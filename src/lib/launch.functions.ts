import { createServerFn } from "@tanstack/react-start";
import { parseCluster, type Cluster } from "./cluster";

function clusterOf(value: unknown): Cluster {
  return parseCluster(value);
}

export const uploadCoinMeta = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      symbol: string;
      description: string;
      imageBase64: string;
      imageType: string;
      twitter: string;
      telegram: string;
      website: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { pinMetadata } = await import("./pinata.server");
    return pinMetadata(data);
  });

export const loadLaunchConfig = createServerFn({ method: "POST" })
  .validator((data: { cluster: Cluster }) => ({ cluster: clusterOf(data.cluster) }))
  .handler(async ({ data }) => {
    const { launchConfig } = await import("./chain.server");
    return launchConfig(data.cluster);
  });

export const previewLaunch = createServerFn({ method: "POST" })
  .validator(
    (data: { cluster: Cluster; quoteMint: string; quoteUi: number; creatorFeeBps: number }) => ({
      ...data,
      cluster: clusterOf(data.cluster),
    }),
  )
  .handler(async ({ data }) => {
    const { previewLaunch: preview } = await import("./chain.server");
    return preview(data);
  });

export const prepareLaunch = createServerFn({ method: "POST" })
  .validator(
    (data: {
      cluster: Cluster;
      user: string;
      mint: string;
      name: string;
      symbol: string;
      uri: string;
      sol: number;
      holderReward: boolean;
      quoteMint: string;
      creatorFeeBps: number;
    }) => ({ ...data, cluster: clusterOf(data.cluster) }),
  )
  .handler(async ({ data }) => {
    const { buildLaunchTx } = await import("./chain.server");
    return buildLaunchTx(data);
  });

export const prepareTrade = createServerFn({ method: "POST" })
  .validator(
    (data: {
      cluster: Cluster;
      user: string;
      mint: string;
      side: "buy" | "sell";
      sol: number;
      tokens: number;
      slippage: number;
    }) => ({ ...data, cluster: clusterOf(data.cluster) }),
  )
  .handler(async ({ data }) => {
    const { buildTradeTx } = await import("./chain.server");
    return buildTradeTx(data);
  });

export const sendSignedTx = createServerFn({ method: "POST" })
  .validator((data: { tx: string; cluster: Cluster }) => ({ ...data, cluster: clusterOf(data.cluster) }))
  .handler(async ({ data }) => {
    const { submitSigned } = await import("./chain.server");
    return submitSigned(data.tx, data.cluster);
  });

export const loadCoin = createServerFn({ method: "POST" })
  .validator((data: { mint: string; user?: string; cluster: Cluster }) => ({
    ...data,
    cluster: clusterOf(data.cluster),
  }))
  .handler(async ({ data }) => {
    const { readCoin } = await import("./chain.server");
    return readCoin(data.mint, data.user, data.cluster);
  });

export const loadBalance = createServerFn({ method: "POST" })
  .validator((data: { user: string; cluster: Cluster }) => ({ ...data, cluster: clusterOf(data.cluster) }))
  .handler(async ({ data }) => {
    const { walletSol } = await import("./chain.server");
    return walletSol(data.user, data.cluster);
  });

export const loadCreated = createServerFn({ method: "POST" })
  .validator(
    (data: {
      user: string;
      cluster: Cluster;
      extra: { mint: string; name: string; symbol: string; image: string }[];
    }) => ({ ...data, cluster: clusterOf(data.cluster) }),
  )
  .handler(async ({ data }) => {
    const { createdCoins } = await import("./chain.server");
    return createdCoins(data);
  });

export const loadFees = createServerFn({ method: "POST" })
  .validator((data: { user: string; cluster: Cluster }) => ({ ...data, cluster: clusterOf(data.cluster) }))
  .handler(async ({ data }) => {
    const { creatorFees } = await import("./chain.server");
    return creatorFees(data.user, data.cluster);
  });

export const prepareCollect = createServerFn({ method: "POST" })
  .validator((data: { user: string; cluster: Cluster }) => ({ ...data, cluster: clusterOf(data.cluster) }))
  .handler(async ({ data }) => {
    const { buildCollectTx } = await import("./chain.server");
    return buildCollectTx(data.user, data.cluster);
  });
