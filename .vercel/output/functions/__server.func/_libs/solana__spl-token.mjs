import { o as __toESM } from "../_runtime.mjs";
import { n as bool, o as PublicKey, r as u64, t as publicKey } from "./@solana/buffer-layout-utils.mjs";
import { t as require_Layout } from "./solana__buffer-layout.mjs";
//#region node_modules/@solana/spl-token/lib/esm/constants.js
var import_Layout = /* @__PURE__ */ __toESM(require_Layout(), 1);
/** Address of the SPL Token program */
var TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
/** Address of the SPL Token 2022 program */
var TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
/** Address of the SPL Associated Token Account program */
var ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
/** Address of the special mint for wrapped native SOL in spl-token */
var NATIVE_MINT = new PublicKey("So11111111111111111111111111111111111111112");
new PublicKey("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");
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
export { TOKEN_PROGRAM_ID as i, NATIVE_MINT as n, TOKEN_2022_PROGRAM_ID as r, getAssociatedTokenAddressSync as t };
