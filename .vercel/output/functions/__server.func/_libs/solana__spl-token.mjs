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
/** Thrown if an account is not found at the expected address */
var TokenAccountNotFoundError = class extends TokenError {
	constructor() {
		super(...arguments);
		this.name = "TokenAccountNotFoundError";
	}
};
/** Thrown if a program state account is not owned by the expected token program */
var TokenInvalidAccountOwnerError = class extends TokenError {
	constructor() {
		super(...arguments);
		this.name = "TokenInvalidAccountOwnerError";
	}
};
/** Thrown if the byte length of an program state account doesn't match the expected size */
var TokenInvalidAccountSizeError = class extends TokenError {
	constructor() {
		super(...arguments);
		this.name = "TokenInvalidAccountSizeError";
	}
};
/** Thrown if the mint of a token account doesn't match the expected mint */
var TokenInvalidMintError = class extends TokenError {
	constructor() {
		super(...arguments);
		this.name = "TokenInvalidMintError";
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
//#region node_modules/@solana/spl-token/lib/esm/extensions/accountType.js
var AccountType;
(function(AccountType) {
	AccountType[AccountType["Uninitialized"] = 0] = "Uninitialized";
	AccountType[AccountType["Mint"] = 1] = "Mint";
	AccountType[AccountType["Account"] = 2] = "Account";
})(AccountType || (AccountType = {}));
/** Byte length of a multisig */
var MULTISIG_SIZE = (0, import_Layout.struct)([
	(0, import_Layout.u8)("m"),
	(0, import_Layout.u8)("n"),
	bool("isInitialized"),
	publicKey("signer1"),
	publicKey("signer2"),
	publicKey("signer3"),
	publicKey("signer4"),
	publicKey("signer5"),
	publicKey("signer6"),
	publicKey("signer7"),
	publicKey("signer8"),
	publicKey("signer9"),
	publicKey("signer10"),
	publicKey("signer11")
]).span;
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/state/account.js
/** Token account state as stored by the program */
var AccountState;
(function(AccountState) {
	AccountState[AccountState["Uninitialized"] = 0] = "Uninitialized";
	AccountState[AccountState["Initialized"] = 1] = "Initialized";
	AccountState[AccountState["Frozen"] = 2] = "Frozen";
})(AccountState || (AccountState = {}));
/** Byte length of a token account */
var ACCOUNT_SIZE = (0, import_Layout.struct)([
	publicKey("mint"),
	publicKey("owner"),
	u64("amount"),
	(0, import_Layout.u32)("delegateOption"),
	publicKey("delegate"),
	(0, import_Layout.u8)("state"),
	(0, import_Layout.u32)("isNativeOption"),
	u64("isNative"),
	u64("delegatedAmount"),
	(0, import_Layout.u32)("closeAuthorityOption"),
	publicKey("closeAuthority")
]).span;
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/state/mint.js
/** Buffer layout for de/serializing a mint */
var MintLayout = (0, import_Layout.struct)([
	(0, import_Layout.u32)("mintAuthorityOption"),
	publicKey("mintAuthority"),
	u64("supply"),
	(0, import_Layout.u8)("decimals"),
	bool("isInitialized"),
	(0, import_Layout.u32)("freezeAuthorityOption"),
	publicKey("freezeAuthority")
]);
/** Byte length of a mint */
var MINT_SIZE = MintLayout.span;
/**
* Unpack a mint
*
* @param address   Mint account
* @param info      Mint account data
* @param programId SPL Token program account
*
* @return Unpacked mint
*/
function unpackMint(address, info, programId = TOKEN_PROGRAM_ID) {
	if (!info) throw new TokenAccountNotFoundError();
	if (!info.owner.equals(programId)) throw new TokenInvalidAccountOwnerError();
	if (info.data.length < MINT_SIZE) throw new TokenInvalidAccountSizeError();
	const rawMint = MintLayout.decode(info.data.slice(0, MINT_SIZE));
	let tlvData = Buffer.alloc(0);
	if (info.data.length > MINT_SIZE) {
		if (info.data.length <= ACCOUNT_SIZE) throw new TokenInvalidAccountSizeError();
		if (info.data.length === MULTISIG_SIZE) throw new TokenInvalidAccountSizeError();
		if (info.data[ACCOUNT_SIZE] != AccountType.Mint) throw new TokenInvalidMintError();
		tlvData = info.data.slice(ACCOUNT_SIZE + 1);
	}
	return {
		address,
		mintAuthority: rawMint.mintAuthorityOption ? rawMint.mintAuthority : null,
		supply: rawMint.supply,
		decimals: rawMint.decimals,
		isInitialized: rawMint.isInitialized,
		freezeAuthority: rawMint.freezeAuthorityOption ? rawMint.freezeAuthority : null,
		tlvData
	};
}
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
export { TOKEN_PROGRAM_ID as a, TOKEN_2022_PROGRAM_ID as i, unpackMint as n, NATIVE_MINT as r, getAssociatedTokenAddressSync as t };
