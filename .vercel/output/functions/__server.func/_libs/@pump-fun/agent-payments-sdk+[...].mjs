import { o as __toESM } from "../../_runtime.mjs";
import { a as init_provider, c as PublicKey, h as require_Layout, i as AnchorProvider, m as init_index_esm, n as Program, r as init_program, t as import_bn } from "../@coral-xyz/anchor.mjs";
import { toBigIntLE, toBufferLE } from "bigint-buffer";
//#region node_modules/@solana/spl-token/lib/esm/constants.js
var import_Layout = /* @__PURE__ */ __toESM(require_Layout(), 1);
init_index_esm();
/** Address of the SPL Token program */
var TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
/** Address of the SPL Token 2022 program */
var TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
/** Address of the SPL Associated Token Account program */
var ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
/** Address of the special mint for wrapped native SOL in spl-token */
var NATIVE_MINT = new PublicKey("So11111111111111111111111111111111111111112");
/** Address of the special mint for wrapped native SOL in spl-token-2022 */
var NATIVE_MINT_2022 = new PublicKey("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");
//#endregion
//#region node_modules/@solana/buffer-layout-utils/lib/esm/base.mjs
var encodeDecode = (layout) => {
	return {
		decode: layout.decode.bind(layout),
		encode: layout.encode.bind(layout)
	};
};
//#endregion
//#region node_modules/@solana/buffer-layout-utils/lib/esm/bigint.mjs
var bigInt = (length) => (property) => {
	const layout = (0, import_Layout.blob)(length, property);
	const { encode, decode } = encodeDecode(layout);
	const bigIntLayout = layout;
	bigIntLayout.decode = (buffer, offset) => {
		const src = decode(buffer, offset);
		return toBigIntLE(Buffer.from(src));
	};
	bigIntLayout.encode = (bigInt, buffer, offset) => {
		const src = toBufferLE(bigInt, length);
		return encode(src, buffer, offset);
	};
	return bigIntLayout;
};
var u64 = bigInt(8);
//#endregion
//#region node_modules/@solana/buffer-layout-utils/lib/esm/native.mjs
var bool = (property) => {
	const layout = (0, import_Layout.u8)(property);
	const { encode, decode } = encodeDecode(layout);
	const boolLayout = layout;
	boolLayout.decode = (buffer, offset) => {
		return !!decode(buffer, offset);
	};
	boolLayout.encode = (bool, buffer, offset) => {
		const src = Number(bool);
		return encode(src, buffer, offset);
	};
	return boolLayout;
};
//#endregion
//#region node_modules/@solana/buffer-layout-utils/lib/esm/web3.mjs
init_index_esm();
var publicKey = (property) => {
	const layout = (0, import_Layout.blob)(32, property);
	const { encode, decode } = encodeDecode(layout);
	const publicKeyLayout = layout;
	publicKeyLayout.decode = (buffer, offset) => {
		const src = decode(buffer, offset);
		return new PublicKey(src);
	};
	publicKeyLayout.encode = (publicKey, buffer, offset) => {
		const src = publicKey.toBuffer();
		return encode(src, buffer, offset);
	};
	return publicKeyLayout;
};
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/errors.js
/** Base class for errors */
var TokenError = class extends Error {
	constructor(message) {
		super(message);
	}
};
/** Thrown if the owner of a token account is a PDA (Program Derived Address) */
var TokenOwnerOffCurveError = class extends TokenError {
	constructor() {
		super(...arguments);
		this.name = "TokenOwnerOffCurveError";
	}
};
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/state/mint.js
init_index_esm();
(0, import_Layout.struct)([
	(0, import_Layout.u32)("mintAuthorityOption"),
	publicKey("mintAuthority"),
	u64("supply"),
	(0, import_Layout.u8)("decimals"),
	bool("isInitialized"),
	(0, import_Layout.u32)("freezeAuthorityOption"),
	publicKey("freezeAuthority")
]).span;
/**
* Get the address of the associated token account for a given mint and owner
*
* @param mint                     Token mint account
* @param owner                    Owner of the new account
* @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
* @param programId                SPL Token program account
* @param associatedTokenProgramId SPL Associated Token program account
*
* @return Address of the associated token account
*/
function getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve = false, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
	if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new TokenOwnerOffCurveError();
	const [address] = PublicKey.findProgramAddressSync([
		owner.toBuffer(),
		programId.toBuffer(),
		mint.toBuffer()
	], associatedTokenProgramId);
	return address;
}
//#endregion
//#region node_modules/@pump-fun/agent-payments-sdk/dist/index.js
init_index_esm();
init_provider(), init_program();
var w = {
	address: "pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4",
	metadata: {
		name: "pump_agent_payments",
		version: "0.1.0",
		spec: "0.1.0",
		description: "Created with Anchor"
	},
	instructions: [
		{
			name: "agent_accept_payment",
			discriminator: [
				34,
				157,
				64,
				220,
				74,
				32,
				48,
				225
			],
			accounts: [
				{
					name: "user",
					writable: !0,
					signer: !0
				},
				{
					name: "user_token_account",
					writable: !0
				},
				{ name: "token_agent_payments" },
				{
					name: "token_agent_associated_account",
					writable: !0,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "token_agent_payments"
							},
							{
								kind: "const",
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169
								]
							},
							{
								kind: "account",
								path: "currency_mint"
							}
						],
						program: {
							kind: "const",
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{
					name: "token_agent_payment_in_currency",
					writable: !0,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								97,
								121,
								109,
								101,
								110,
								116,
								45,
								105,
								110,
								45,
								99,
								117,
								114,
								114,
								101,
								110,
								99,
								121
							]
						},
						{
							kind: "account",
							path: "token_agent_payments.mint",
							account: "TokenAgentPayments"
						},
						{
							kind: "account",
							path: "currency_mint"
						}
					] }
				},
				{
					name: "global_config",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{ name: "invoice_id" },
				{ name: "currency_mint" },
				{ name: "token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [
				{
					name: "amount",
					type: "u64"
				},
				{
					name: "memo",
					type: "u64"
				},
				{
					name: "start_time",
					type: "i64"
				},
				{
					name: "end_time",
					type: "i64"
				}
			]
		},
		{
			name: "agent_buyback_trigger",
			discriminator: [
				95,
				231,
				193,
				2,
				245,
				75,
				125,
				155
			],
			accounts: [
				{
					name: "global_buyback_authority",
					writable: !0,
					signer: !0
				},
				{
					name: "mint",
					writable: !0
				},
				{
					name: "token_agent_payments",
					pda: { seeds: [{
						kind: "const",
						value: [
							116,
							111,
							107,
							101,
							110,
							45,
							97,
							103,
							101,
							110,
							116,
							45,
							112,
							97,
							121,
							109,
							101,
							110,
							116,
							115
						]
					}, {
						kind: "account",
						path: "mint"
					}] }
				},
				{
					name: "token_agent_payment_in_currency",
					writable: !0,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								97,
								121,
								109,
								101,
								110,
								116,
								45,
								105,
								110,
								45,
								99,
								117,
								114,
								114,
								101,
								110,
								99,
								121
							]
						},
						{
							kind: "account",
							path: "token_agent_payments.mint",
							account: "TokenAgentPayments"
						},
						{
							kind: "account",
							path: "currency_mint"
						}
					] }
				},
				{ name: "currency_mint" },
				{
					name: "global_config",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{ name: "swap_program_to_invoke" },
				{
					name: "burn_authority",
					docs: ["Intentionally called burn_authority", "TO avoid any confusion with the global buyback authority."],
					pda: { seeds: [{
						kind: "const",
						value: [
							98,
							117,
							121,
							98,
							97,
							99,
							107,
							45,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}, {
						kind: "account",
						path: "token_agent_payments.mint",
						account: "TokenAgentPayments"
					}] }
				},
				{
					name: "burn_mint_vault",
					writable: !0,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "burn_authority"
							},
							{
								kind: "const",
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169
								]
							},
							{
								kind: "account",
								path: "mint"
							}
						],
						program: {
							kind: "const",
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{ name: "token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [{
				name: "swap_instruction_data",
				type: "bytes"
			}]
		},
		{
			name: "agent_distribute_payments",
			discriminator: [
				145,
				44,
				246,
				47,
				192,
				204,
				95,
				32
			],
			accounts: [
				{
					name: "user",
					writable: !0,
					signer: !0
				},
				{
					name: "global_config",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{ name: "currency_mint" },
				{ name: "token_agent_payments" },
				{
					name: "token_agent_payment_in_currency",
					writable: !0,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								97,
								121,
								109,
								101,
								110,
								116,
								45,
								105,
								110,
								45,
								99,
								117,
								114,
								114,
								101,
								110,
								99,
								121
							]
						},
						{
							kind: "account",
							path: "token_agent_payments.mint",
							account: "TokenAgentPayments"
						},
						{
							kind: "account",
							path: "currency_mint"
						}
					] }
				},
				{
					name: "token_agent_associated_account",
					writable: !0,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "token_agent_payments"
							},
							{
								kind: "const",
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169
								]
							},
							{
								kind: "account",
								path: "currency_mint"
							}
						],
						program: {
							kind: "const",
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{
					name: "buyback_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							98,
							117,
							121,
							98,
							97,
							99,
							107,
							45,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}, {
						kind: "account",
						path: "token_agent_payments.mint",
						account: "TokenAgentPayments"
					}] }
				},
				{
					name: "withdraw_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							119,
							105,
							116,
							104,
							100,
							114,
							97,
							119,
							45,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}, {
						kind: "account",
						path: "token_agent_payments.mint",
						account: "TokenAgentPayments"
					}] }
				},
				{
					name: "buyback_vault",
					writable: !0,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "buyback_authority"
							},
							{
								kind: "const",
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169
								]
							},
							{
								kind: "account",
								path: "currency_mint"
							}
						],
						program: {
							kind: "const",
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{
					name: "withdraw_vault",
					writable: !0,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "withdraw_authority"
							},
							{
								kind: "const",
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169
								]
							},
							{
								kind: "account",
								path: "currency_mint"
							}
						],
						program: {
							kind: "const",
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{ name: "token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: []
		},
		{
			name: "agent_initialize",
			discriminator: [
				180,
				248,
				163,
				8,
				49,
				94,
				126,
				96
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{
					name: "bonding_curve",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								98,
								111,
								110,
								100,
								105,
								110,
								103,
								45,
								99,
								117,
								114,
								118,
								101
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "const",
							value: [
								1,
								86,
								224,
								246,
								147,
								102,
								90,
								207,
								68,
								219,
								21,
								104,
								191,
								23,
								91,
								170,
								81,
								137,
								203,
								151,
								245,
								210,
								255,
								59,
								101,
								93,
								43,
								182,
								253,
								109,
								24,
								176
							]
						}
					}
				},
				{
					name: "global_config",
					writable: !0,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{ name: "mint" },
				{
					name: "token_agent_payments",
					writable: !0,
					pda: { seeds: [{
						kind: "const",
						value: [
							116,
							111,
							107,
							101,
							110,
							45,
							97,
							103,
							101,
							110,
							116,
							45,
							112,
							97,
							121,
							109,
							101,
							110,
							116,
							115
						]
					}, {
						kind: "account",
						path: "mint"
					}] }
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [{
				name: "authority",
				type: "pubkey"
			}, {
				name: "buyback_bps",
				type: "u16"
			}]
		},
		{
			name: "agent_update_authority",
			discriminator: [
				237,
				228,
				227,
				224,
				226,
				198,
				167,
				83
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{
					name: "global_config",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{
					name: "token_agent_payments",
					writable: !0
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [{
				name: "new_authority",
				type: "pubkey"
			}]
		},
		{
			name: "agent_update_buyback_bps",
			discriminator: [
				41,
				28,
				118,
				90,
				53,
				24,
				63,
				160
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{
					name: "token_agent_payments",
					writable: !0
				},
				{
					name: "global_config",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [{
				name: "buyback_bps",
				type: "u16"
			}]
		},
		{
			name: "agent_withdraw",
			discriminator: [
				13,
				149,
				99,
				245,
				171,
				171,
				185,
				53
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{ name: "token_agent_payments" },
				{ name: "currency_mint" },
				{
					name: "withdraw_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							119,
							105,
							116,
							104,
							100,
							114,
							97,
							119,
							45,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}, {
						kind: "account",
						path: "token_agent_payments.mint",
						account: "TokenAgentPayments"
					}] }
				},
				{
					name: "withdraw_vault",
					writable: !0,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "withdraw_authority"
							},
							{
								kind: "const",
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169
								]
							},
							{
								kind: "account",
								path: "currency_mint"
							}
						],
						program: {
							kind: "const",
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{
					name: "receiver_ata",
					writable: !0
				},
				{ name: "token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: []
		},
		{
			name: "close_account",
			discriminator: [
				125,
				255,
				149,
				14,
				110,
				34,
				72,
				24
			],
			accounts: [
				{
					name: "account",
					writable: !0
				},
				{
					name: "user",
					writable: !0,
					signer: !0
				},
				{
					name: "global_config",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				}
			],
			args: []
		},
		{
			name: "extend_account",
			discriminator: [
				234,
				102,
				194,
				203,
				150,
				72,
				62,
				229
			],
			accounts: [
				{
					name: "account",
					writable: !0
				},
				{
					name: "user",
					writable: !0,
					signer: !0
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: []
		},
		{
			name: "global_add_new_currency",
			discriminator: [
				46,
				135,
				47,
				120,
				118,
				204,
				177,
				224
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{
					name: "global_config",
					writable: !0,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{ name: "mint" },
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: []
		},
		{
			name: "global_config_initialize",
			discriminator: [
				61,
				23,
				208,
				192,
				232,
				52,
				8,
				66
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{
					name: "global_config",
					writable: !0,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [{
				name: "protocol_authority",
				type: "pubkey"
			}, {
				name: "buyback_authority",
				type: "pubkey"
			}]
		},
		{
			name: "global_update_authorities",
			discriminator: [
				91,
				137,
				72,
				77,
				183,
				184,
				168,
				125
			],
			accounts: [
				{
					name: "authority",
					writable: !0,
					signer: !0
				},
				{
					name: "global_config",
					writable: !0,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}] }
				},
				{
					name: "event_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							95,
							95,
							101,
							118,
							101,
							110,
							116,
							95,
							97,
							117,
							116,
							104,
							111,
							114,
							105,
							116,
							121
						]
					}] }
				},
				{ name: "program" }
			],
			args: [{
				name: "protocol_authority",
				type: { option: "pubkey" }
			}, {
				name: "buyback_authority",
				type: { option: "pubkey" }
			}]
		}
	],
	accounts: [
		{
			name: "BondingCurve",
			discriminator: [
				23,
				183,
				248,
				55,
				96,
				216,
				172,
				96
			]
		},
		{
			name: "GlobalConfig",
			discriminator: [
				149,
				8,
				156,
				202,
				160,
				252,
				176,
				217
			]
		},
		{
			name: "TokenAgentPaymentInCurrency",
			discriminator: [
				225,
				195,
				81,
				227,
				115,
				43,
				25,
				177
			]
		},
		{
			name: "TokenAgentPayments",
			discriminator: [
				136,
				241,
				242,
				217,
				173,
				77,
				112,
				186
			]
		}
	],
	events: [
		{
			name: "AgentAcceptPaymentEvent",
			discriminator: [
				114,
				190,
				188,
				192,
				105,
				79,
				41,
				147
			]
		},
		{
			name: "AgentBuybackTriggerEvent",
			discriminator: [
				139,
				240,
				9,
				225,
				214,
				63,
				232,
				165
			]
		},
		{
			name: "AgentDistributePaymentsEvent",
			discriminator: [
				137,
				116,
				114,
				140,
				54,
				111,
				230,
				26
			]
		},
		{
			name: "AgentInitializeEvent",
			discriminator: [
				192,
				5,
				183,
				151,
				0,
				64,
				100,
				207
			]
		},
		{
			name: "AgentUpdateAuthorityEvent",
			discriminator: [
				36,
				212,
				117,
				235,
				74,
				166,
				60,
				16
			]
		},
		{
			name: "AgentUpdateBuybackBpsEvent",
			discriminator: [
				165,
				251,
				40,
				19,
				114,
				26,
				128,
				232
			]
		},
		{
			name: "AgentWithdrawEvent",
			discriminator: [
				174,
				231,
				201,
				69,
				254,
				183,
				49,
				85
			]
		},
		{
			name: "ExtendAccountEvent",
			discriminator: [
				97,
				97,
				215,
				144,
				93,
				146,
				22,
				124
			]
		},
		{
			name: "GlobalAddNewCurrencyEvent",
			discriminator: [
				130,
				202,
				37,
				248,
				241,
				182,
				233,
				35
			]
		},
		{
			name: "GlobalConfigInitializeEvent",
			discriminator: [
				241,
				51,
				222,
				190,
				142,
				245,
				176,
				53
			]
		},
		{
			name: "GlobalUpdateAuthoritiesEvent",
			discriminator: [
				82,
				27,
				22,
				232,
				53,
				66,
				35,
				207
			]
		}
	],
	errors: [
		{
			code: 6e3,
			name: "UnauthorizedSigner",
			msg: "The given account is not authorized to execute this instruction."
		},
		{
			code: 6001,
			name: "CurrencyAlreadySupported",
			msg: "The given currency is already supported."
		},
		{
			code: 6002,
			name: "MaxCurrenciesReached",
			msg: "The maximum number of currencies has been reached."
		},
		{
			code: 6003,
			name: "InvalidBuybackBps",
			msg: "The buyback basis points is greater than 10000."
		},
		{
			code: 6004,
			name: "CurrencyNotSupported",
			msg: "The given currency is not supported."
		},
		{
			code: 6005,
			name: "MathOverflow",
			msg: "Math overflow."
		},
		{
			code: 6006,
			name: "InvalidRemainingAccountAddress",
			msg: "The given remaining account address is invalid."
		},
		{
			code: 6007,
			name: "PaymentVaultNotEmpty",
			msg: "The payment vault is not empty. Distribute the payments first."
		},
		{
			code: 6008,
			name: "InvalidInvoiceAccount",
			msg: "The invoice account does not match the expected PDA seeds"
		},
		{
			code: 6009,
			name: "InvalidProgramToInvoke",
			msg: "The program to invoke is not allowed."
		},
		{
			code: 6010,
			name: "InvalidCallbackProgram",
			msg: "The callback program is invalid."
		},
		{
			code: 6011,
			name: "SwapFailedAmountDidNotIncrease",
			msg: "The swap failed and the amount did not increase."
		},
		{
			code: 6012,
			name: "AccountTypeNotSupported",
			msg: "The account type is not supported for extension."
		}
	],
	types: [
		{
			name: "AgentAcceptPaymentEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "tokenized_agent_mint",
						type: "pubkey"
					},
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "currency_mint",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "memo",
						type: "u64"
					},
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "invoice_id",
						type: "pubkey"
					},
					{
						name: "agent_post_balance",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "AgentBuybackTriggerEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "amount_burned",
						type: "u64"
					},
					{
						name: "swap_program",
						type: "pubkey"
					},
					{
						name: "new_tokens_bought_and_burned_for_currency",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "AgentDistributePaymentsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "currency_mint",
						type: "pubkey"
					},
					{
						name: "buyback_bps",
						type: "u16"
					},
					{
						name: "buyback_amount",
						type: "u64"
					},
					{
						name: "withdraw_amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "AgentInitializeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "buyback_bps",
						type: "u16"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "tokenized_agent_sequence",
						type: "u64"
					}
				]
			}
		},
		{
			name: "AgentUpdateAuthorityEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "old_authority",
						type: "pubkey"
					},
					{
						name: "new_authority",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "AgentUpdateBuybackBpsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "old_buyback_bps",
						type: "u16"
					},
					{
						name: "new_buyback_bps",
						type: "u16"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "AgentWithdrawEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "token_agent_payments",
						type: "pubkey"
					},
					{
						name: "currency_mint",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "receiver",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "BondingCurve",
			type: {
				kind: "struct",
				fields: [
					{
						name: "virtual_token_reserves",
						type: "u64"
					},
					{
						name: "virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "real_token_reserves",
						type: "u64"
					},
					{
						name: "real_sol_reserves",
						type: "u64"
					},
					{
						name: "token_total_supply",
						type: "u64"
					},
					{
						name: "complete",
						type: "bool"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					}
				]
			}
		},
		{
			name: "ExtendAccountEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "account",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "current_size",
						type: "u64"
					},
					{
						name: "new_size",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "GlobalAddNewCurrencyEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "global_config",
						type: "pubkey"
					},
					{
						name: "currency_mint",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "GlobalConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "protocol_authority",
						type: "pubkey"
					},
					{
						name: "buyback_authority",
						type: "pubkey"
					},
					{
						name: "supported_currencies_mint",
						type: { array: ["pubkey", 10] }
					},
					{
						name: "tokenized_agent_sequence",
						type: "u64"
					}
				]
			}
		},
		{
			name: "GlobalConfigInitializeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "global_config",
						type: "pubkey"
					},
					{
						name: "protocol_authority",
						type: "pubkey"
					},
					{
						name: "buyback_authority",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "GlobalUpdateAuthoritiesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "global_config",
						type: "pubkey"
					},
					{
						name: "protocol_authority",
						type: { option: "pubkey" }
					},
					{
						name: "buyback_authority",
						type: { option: "pubkey" }
					},
					{
						name: "timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "TokenAgentPaymentInCurrency",
			type: {
				kind: "struct",
				fields: [
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "currency_mint",
						type: "pubkey"
					},
					{
						name: "total_invoice_payments_made",
						type: "u64"
					},
					{
						name: "total_buyback",
						type: "u64"
					},
					{
						name: "total_withdrawals",
						type: "u64"
					},
					{
						name: "tokens_bought_back_and_burned",
						type: "u64"
					}
				]
			}
		},
		{
			name: "TokenAgentPayments",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "buyback_bps",
						type: "u16"
					}
				]
			}
		}
	]
};
function h(a) {
	let e = {
		publicKey: PublicKey.default,
		signTransaction: () => Promise.reject(),
		signAllTransactions: () => Promise.reject()
	};
	return new Program(w, new AnchorProvider(a, e, {}));
}
var g = h(null);
function P(a) {
	return a ? h(a) : g;
}
var l = new PublicKey("pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4");
var G = new PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
var O = Buffer.from("global-config");
var R = Buffer.from("token-agent-payments");
var U = Buffer.from("payment-in-currency");
var M = Buffer.from("invoice-id");
var S = Buffer.from("buyback-authority");
var K = Buffer.from("withdraw-authority");
var W = Buffer.from("bonding-curve");
function k() {
	return PublicKey.findProgramAddressSync([O], l);
}
function p(a) {
	return PublicKey.findProgramAddressSync([R, a.toBuffer()], l);
}
function T(a, e) {
	return PublicKey.findProgramAddressSync([
		U,
		a.toBuffer(),
		e.toBuffer()
	], l);
}
function V(a, e, n, t, r, o) {
	return PublicKey.findProgramAddressSync([
		M,
		a.toBuffer(),
		e.toBuffer(),
		n.toArrayLike(Buffer, "le", 8),
		t.toArrayLike(Buffer, "le", 8),
		r.toArrayLike(Buffer, "le", 8),
		o.toArrayLike(Buffer, "le", 8)
	], l);
}
function A(a) {
	return PublicKey.findProgramAddressSync([S, a.toBuffer()], l);
}
function f(a) {
	return PublicKey.findProgramAddressSync([K, a.toBuffer()], l);
}
function F(a) {
	return PublicKey.findProgramAddressSync([W, a.toBuffer()], G);
}
function C(a) {
	return new import_bn.default(a.toString());
}
var v = class a {
	constructor(e, n = P()) {
		this.mint = e, this.program = n;
	}
	async create(e) {
		let { authority: n, mint: t, agentAuthority: r, buybackBps: o } = e, [i] = F(t), [s] = p(t);
		return this.program.methods.agentInitialize(r, o).accountsPartial({
			authority: n,
			bondingCurve: i,
			mint: t,
			tokenAgentPayments: s
		}).instruction();
	}
	static load(e, n) {
		return new a(e, P(n));
	}
	async withdraw(e) {
		let { authority: n, currencyMint: t, receiverAta: r, tokenProgram: o } = e, [i] = p(this.mint), [s] = f(this.mint), m = getAssociatedTokenAddressSync(t, s, !0);
		return this.program.methods.agentWithdraw().accountsPartial({
			authority: n,
			tokenAgentPayments: i,
			currencyMint: t,
			withdrawAuthority: s,
			withdrawVault: m,
			receiverAta: r,
			tokenProgram: o ?? TOKEN_PROGRAM_ID
		}).instruction();
	}
	async updateBuybackBps(e, n) {
		let { authority: t, buybackBps: r } = e, o = n?.supportedCurrenciesMint;
		if (!o) throw new Error("PumpAgentOffline.updateBuybackBps requires options.supportedCurrenciesMint.");
		let [i] = p(this.mint), [s] = k(), m = [];
		for (let u of o) {
			if (u.equals(PublicKey.default)) continue;
			let c = getAssociatedTokenAddressSync(u, i, !0);
			m.push({
				pubkey: c,
				isWritable: !1,
				isSigner: !1
			});
		}
		return this.program.methods.agentUpdateBuybackBps(r).accountsPartial({
			authority: t,
			tokenAgentPayments: i,
			globalConfig: s
		}).remainingAccounts(m).instruction();
	}
	async acceptPayment(e) {
		let { user: n, userTokenAccount: t, currencyMint: r, amount: o, memo: i, startTime: s, endTime: m, tokenProgram: u } = e, [c] = p(this.mint), [y] = k(), [d] = T(this.mint, r), [E] = V(this.mint, r, o, i, s, m), I = getAssociatedTokenAddressSync(r, c, !0);
		return this.program.methods.agentAcceptPayment(o, i, s, m).accountsPartial({
			user: n,
			userTokenAccount: t,
			tokenAgentPayments: c,
			tokenAgentAssociatedAccount: I,
			tokenAgentPaymentInCurrency: d,
			globalConfig: y,
			invoiceId: E,
			currencyMint: r,
			tokenProgram: u ?? TOKEN_PROGRAM_ID
		}).instruction();
	}
	async acceptPaymentSimple(e) {
		let { amount: n, memo: t, startTime: r, endTime: o, ...i } = e;
		return this.acceptPayment({
			...i,
			amount: C(n),
			memo: C(t),
			startTime: C(r),
			endTime: C(o)
		});
	}
	async distributePayments(e) {
		let { user: n, currencyMint: t, tokenProgram: r } = e, [o] = p(this.mint), [i] = k(), [s] = T(this.mint, t), [m] = A(this.mint), [u] = f(this.mint), c = getAssociatedTokenAddressSync(t, o, !0), y = getAssociatedTokenAddressSync(t, m, !0), d = getAssociatedTokenAddressSync(t, u, !0);
		return this.program.methods.agentDistributePayments().accountsPartial({
			user: n,
			globalConfig: i,
			currencyMint: t,
			tokenAgentPayments: o,
			tokenAgentPaymentInCurrency: s,
			tokenAgentAssociatedAccount: c,
			buybackAuthority: m,
			withdrawAuthority: u,
			buybackVault: y,
			withdrawVault: d,
			tokenProgram: r ?? TOKEN_PROGRAM_ID
		}).instruction();
	}
	async buybackTrigger(e) {
		let { globalBuybackAuthority: n, currencyMint: t, swapProgramToInvoke: r, swapInstructionData: o, remainingAccounts: i, tokenProgram: s } = e, [m] = p(this.mint), [u] = k(), [c] = A(this.mint), [y] = T(this.mint, t), d = getAssociatedTokenAddressSync(this.mint, c, !0);
		return this.program.methods.agentBuybackTrigger(o).accountsPartial({
			globalBuybackAuthority: n,
			mint: this.mint,
			tokenAgentPayments: m,
			tokenAgentPaymentInCurrency: y,
			currencyMint: t,
			globalConfig: u,
			swapProgramToInvoke: r,
			burnAuthority: c,
			burnMintVault: d,
			tokenProgram: s ?? TOKEN_PROGRAM_ID
		}).remainingAccounts(i).instruction();
	}
	async extendAccount(e) {
		let { account: n, user: t } = e;
		return this.program.methods.extendAccount().accountsPartial({
			account: n,
			user: t
		}).instruction();
	}
	async updateAuthority(e) {
		let { authority: n, newAuthority: t } = e, [r] = p(this.mint);
		return this.program.methods.agentUpdateAuthority(t).accountsPartial({
			authority: n,
			tokenAgentPayments: r
		}).instruction();
	}
};
new PublicKey(w.address);
//#endregion
export { NATIVE_MINT_2022 as a, NATIVE_MINT as i, getAssociatedTokenAddressSync as n, TOKEN_2022_PROGRAM_ID as o, ASSOCIATED_TOKEN_PROGRAM_ID as r, TOKEN_PROGRAM_ID as s, v as t };
