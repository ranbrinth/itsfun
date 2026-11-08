import { t as parseCluster } from "./cluster-B945SrPr.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/launch.functions-Bl0RfwCB.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clusterOf(value) {
	return parseCluster(value);
}
var uploadCoinMeta_createServerFn_handler = createServerRpc({
	id: "417b4bc56d66c4530ab7911c2868a98112f40fe64265a3e29942b0a560ea559f",
	name: "uploadCoinMeta",
	filename: "src/lib/launch.functions.ts"
}, (opts) => uploadCoinMeta.__executeServer(opts));
var uploadCoinMeta = createServerFn({ method: "POST" }).validator((data) => data).handler(uploadCoinMeta_createServerFn_handler, async ({ data }) => {
	const { pinMetadata } = await import("./pinata.server-DQXLNCc_.mjs");
	return pinMetadata(data);
});
var loadLaunchConfig_createServerFn_handler = createServerRpc({
	id: "31900bcf209f1b53d574a52edf95109b1e923183d30e74dec8a5cec9cc46df47",
	name: "loadLaunchConfig",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadLaunchConfig.__executeServer(opts));
var loadLaunchConfig = createServerFn({ method: "POST" }).validator((data) => ({ cluster: clusterOf(data.cluster) })).handler(loadLaunchConfig_createServerFn_handler, async ({ data }) => {
	const { launchConfig } = await import("./chain.server-DipVsTmx.mjs");
	return launchConfig(data.cluster);
});
var previewLaunch_createServerFn_handler = createServerRpc({
	id: "9e587f1b59575b909d0b2e2e37a0ac26b76a4db1138419126abd126e508f68f7",
	name: "previewLaunch",
	filename: "src/lib/launch.functions.ts"
}, (opts) => previewLaunch.__executeServer(opts));
var previewLaunch = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(previewLaunch_createServerFn_handler, async ({ data }) => {
	const { previewLaunch: preview } = await import("./chain.server-DipVsTmx.mjs");
	return preview(data);
});
var prepareLaunch_createServerFn_handler = createServerRpc({
	id: "16386dfffc3f5840e09400a578de29df76439b3a8bda20b8990f87cf7dd881a1",
	name: "prepareLaunch",
	filename: "src/lib/launch.functions.ts"
}, (opts) => prepareLaunch.__executeServer(opts));
var prepareLaunch = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(prepareLaunch_createServerFn_handler, async ({ data }) => {
	const { buildLaunchTx } = await import("./chain.server-DipVsTmx.mjs");
	return buildLaunchTx(data);
});
var prepareTrade_createServerFn_handler = createServerRpc({
	id: "a7c3bc2c40668ec5ef06367a49be5e4fea63973ed652c3e1147f181f5f41b0b4",
	name: "prepareTrade",
	filename: "src/lib/launch.functions.ts"
}, (opts) => prepareTrade.__executeServer(opts));
var prepareTrade = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(prepareTrade_createServerFn_handler, async ({ data }) => {
	const { buildTradeTx } = await import("./chain.server-DipVsTmx.mjs");
	return buildTradeTx(data);
});
var sendSignedTx_createServerFn_handler = createServerRpc({
	id: "5a9ea2ef41e069f641a04537a9ddb7161f95645d53a99a20713985164bbf88fa",
	name: "sendSignedTx",
	filename: "src/lib/launch.functions.ts"
}, (opts) => sendSignedTx.__executeServer(opts));
var sendSignedTx = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(sendSignedTx_createServerFn_handler, async ({ data }) => {
	const { submitSigned } = await import("./chain.server-DipVsTmx.mjs");
	return submitSigned(data.tx, data.cluster);
});
var loadCoin_createServerFn_handler = createServerRpc({
	id: "8f1717b3e715ad33db2f41c70e0a92092dfa8ac37c4483d8d85ce3095bd2de2b",
	name: "loadCoin",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadCoin.__executeServer(opts));
var loadCoin = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(loadCoin_createServerFn_handler, async ({ data }) => {
	const { readCoin } = await import("./chain.server-DipVsTmx.mjs");
	return readCoin(data.mint, data.user, data.cluster);
});
var loadBalance_createServerFn_handler = createServerRpc({
	id: "7dd0f03493ed603aabbdea64e0b6448afaeda9adb65b8249e5559c1d0e995202",
	name: "loadBalance",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadBalance.__executeServer(opts));
var loadBalance = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(loadBalance_createServerFn_handler, async ({ data }) => {
	const { walletSol } = await import("./chain.server-DipVsTmx.mjs");
	return walletSol(data.user, data.cluster);
});
var loadCreated_createServerFn_handler = createServerRpc({
	id: "c892162644e03333821e99d54e28e9875db53a1878fdf91eb87487c53c744914",
	name: "loadCreated",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadCreated.__executeServer(opts));
var loadCreated = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(loadCreated_createServerFn_handler, async ({ data }) => {
	const { createdCoins } = await import("./chain.server-DipVsTmx.mjs");
	return createdCoins(data);
});
var loadFees_createServerFn_handler = createServerRpc({
	id: "610d90bb1a315be6a11d2a1e05fac79fb8936de9f7b07a0751e9df35118e9bfc",
	name: "loadFees",
	filename: "src/lib/launch.functions.ts"
}, (opts) => loadFees.__executeServer(opts));
var loadFees = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(loadFees_createServerFn_handler, async ({ data }) => {
	const { creatorFees } = await import("./chain.server-DipVsTmx.mjs");
	return creatorFees(data.user, data.cluster);
});
var prepareCollect_createServerFn_handler = createServerRpc({
	id: "4b0fe09723fe3fa144d819bb9c4fec10306cd4571508eb9a6075ab1e470b97ac",
	name: "prepareCollect",
	filename: "src/lib/launch.functions.ts"
}, (opts) => prepareCollect.__executeServer(opts));
var prepareCollect = createServerFn({ method: "POST" }).validator((data) => ({
	...data,
	cluster: clusterOf(data.cluster)
})).handler(prepareCollect_createServerFn_handler, async ({ data }) => {
	const { buildCollectTx } = await import("./chain.server-DipVsTmx.mjs");
	return buildCollectTx(data.user, data.cluster);
});
//#endregion
export { loadBalance_createServerFn_handler, loadCoin_createServerFn_handler, loadCreated_createServerFn_handler, loadFees_createServerFn_handler, loadLaunchConfig_createServerFn_handler, prepareCollect_createServerFn_handler, prepareLaunch_createServerFn_handler, prepareTrade_createServerFn_handler, previewLaunch_createServerFn_handler, sendSignedTx_createServerFn_handler, uploadCoinMeta_createServerFn_handler };
