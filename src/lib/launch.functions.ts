import { createServerFn } from "@tanstack/react-start";

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

export const prepareLaunch = createServerFn({ method: "POST" })
  .validator(
    (data: {
      user: string;
      mint: string;
      name: string;
      symbol: string;
      uri: string;
      sol: number;
      holderReward: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { buildLaunchTx } = await import("./chain.server");
    return buildLaunchTx(data);
  });

export const prepareTrade = createServerFn({ method: "POST" })
  .validator(
    (data: {
      user: string;
      mint: string;
      side: "buy" | "sell";
      sol: number;
      tokens: number;
      slippage: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { buildTradeTx } = await import("./chain.server");
    return buildTradeTx(data);
  });

export const sendSignedTx = createServerFn({ method: "POST" })
  .validator((data: { tx: string }) => data)
  .handler(async ({ data }) => {
    const { submitSigned } = await import("./chain.server");
    return submitSigned(data.tx);
  });

export const loadCoin = createServerFn({ method: "POST" })
  .validator((data: { mint: string; user?: string }) => data)
  .handler(async ({ data }) => {
    const { readCoin } = await import("./chain.server");
    return readCoin(data.mint, data.user);
  });

export const loadBalance = createServerFn({ method: "POST" })
  .validator((data: { user: string }) => data)
  .handler(async ({ data }) => {
    const { walletSol } = await import("./chain.server");
    return walletSol(data.user);
  });
