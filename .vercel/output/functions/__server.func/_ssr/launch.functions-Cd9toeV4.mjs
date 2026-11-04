import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/launch.functions-Cd9toeV4.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var uploadCoinMeta_createServerFn_handler = createServerRpc({
	id: "417b4bc56d66c4530ab7911c2868a98112f40fe64265a3e29942b0a560ea559f",
	name: "uploadCoinMeta",
	filename: "src/lib/launch.functions.ts"
}, (opts) => uploadCoinMeta.__executeServer(opts));
var uploadCoinMeta = createServerFn({ method: "POST" }).validator((data) => data).handler(uploadCoinMeta_createServerFn_handler, async ({ data }) => {
	const { pinMetadata } = await import("./pinata.server-Dn8BkOpm.mjs");
	return pinMetadata(data);
});
var prepareLaunch_createServerFn_handler = createServerRpc({
	id: "16386dfffc3f5840e09400a578de29df76439b3a8bda20b8990f87cf7dd881a1",
	name: "prepareLaunch",
	filename: "src/lib/launch.functions.ts"
}, (opts) => prepareLaunch.__executeServer(opts));
var prepareLaunch = createServerFn({ method: "POST" }).validator((data) => data).handler(prepareLaunch_createServerFn_handler, async ({ data }) => {
	const { buildLaunchTx } = await import("./chain.server-BeXbRNyR.mjs");
	return buildLaunchTx(data);
});
var prepareTrade_createServerFn_handler = createServerRpc({
	id: "a7c3bc2c40668ec5ef06367a49be5e4fea63973ed652c3e1147f181f5f41b0b4",
	name: "prepareTrade",
	filename: "src/lib/launch.functions.ts"
}, (opts) => prepareTrade.__executeServer(opts));
var prepareTrade = createServerFn({ method: "POST" }).validator((data) => data).handler(prepareTrade_createServerFn_handler, async ({ data }) => {
	const { buildTradeTx } = await import("./chain.server-BeXbRNyR.mjs");
	return buildTradeTx(data);
});
var sendSignedTx_createServerFn_handler = createServerRpc({
	id: "5a9ea2ef41e069f641a04537a9ddb7161f95645d53a99a20713985164bbf88fa",
	name: "sendSignedTx",
	filename: "src/lib/launch.functions.ts"
}, (opts) => sendSignedTx.__executeServer(opts));
var sendSignedTx = createServerFn({ method: "POST" }).validator((data) => data).handler(sendSignedTx_createServerFn_handler, async ({ data }) => {
	const { submitSigned } = await import("./chain.server-BeXbRNyR.mjs");
	return submitSigned(data.tx);
});
var loadCoin_createServerFn_handler = createServerRpc({
	id: "8f1717b3e715ad33db2f41c70e0a92092dfa8ac37c4483d8d85ce3095bd2de2b",
	name: "loadCoin",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadCoin.__executeServer(opts));
var loadCoin = createServerFn({ method: "POST" }).validator((data) => data).handler(loadCoin_createServerFn_handler, async ({ data }) => {
	const { readCoin } = await import("./chain.server-BeXbRNyR.mjs");
	return readCoin(data.mint, data.user);
});
var loadBalance_createServerFn_handler = createServerRpc({
	id: "7dd0f03493ed603aabbdea64e0b6448afaeda9adb65b8249e5559c1d0e995202",
	name: "loadBalance",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadBalance.__executeServer(opts));
var loadBalance = createServerFn({ method: "POST" }).validator((data) => data).handler(loadBalance_createServerFn_handler, async ({ data }) => {
	const { walletSol } = await import("./chain.server-BeXbRNyR.mjs");
	return walletSol(data.user);
});
//#endregion
export { loadBalance_createServerFn_handler, loadCoin_createServerFn_handler, prepareLaunch_createServerFn_handler, prepareTrade_createServerFn_handler, sendSignedTx_createServerFn_handler, uploadCoinMeta_createServerFn_handler };
