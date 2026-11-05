import { o as __toESM$1 } from "../../_runtime.mjs";
import { a as init_provider, c as PublicKey, g as require_bn, h as require_Layout, i as AnchorProvider, l as SystemProgram, m as init_index_esm, n as Program, r as init_program, u as TransactionInstruction } from "../@coral-xyz/anchor.mjs";
import { a as NATIVE_MINT_2022, i as NATIVE_MINT, n as getAssociatedTokenAddressSync, o as TOKEN_2022_PROGRAM_ID, r as ASSOCIATED_TOKEN_PROGRAM_ID, s as TOKEN_PROGRAM_ID, t as v } from "./agent-payments-sdk+[...].mjs";
import { Buffer as Buffer$1 } from "buffer";
//#region node_modules/@solana/spl-token/lib/esm/instructions/types.js
var import_bn = /* @__PURE__ */ __toESM$1(require_bn());
var import_Layout = /* @__PURE__ */ __toESM$1(require_Layout(), 1);
init_index_esm();
/** Instructions defined by the program */
var TokenInstruction;
(function(TokenInstruction) {
	TokenInstruction[TokenInstruction["InitializeMint"] = 0] = "InitializeMint";
	TokenInstruction[TokenInstruction["InitializeAccount"] = 1] = "InitializeAccount";
	TokenInstruction[TokenInstruction["InitializeMultisig"] = 2] = "InitializeMultisig";
	TokenInstruction[TokenInstruction["Transfer"] = 3] = "Transfer";
	TokenInstruction[TokenInstruction["Approve"] = 4] = "Approve";
	TokenInstruction[TokenInstruction["Revoke"] = 5] = "Revoke";
	TokenInstruction[TokenInstruction["SetAuthority"] = 6] = "SetAuthority";
	TokenInstruction[TokenInstruction["MintTo"] = 7] = "MintTo";
	TokenInstruction[TokenInstruction["Burn"] = 8] = "Burn";
	TokenInstruction[TokenInstruction["CloseAccount"] = 9] = "CloseAccount";
	TokenInstruction[TokenInstruction["FreezeAccount"] = 10] = "FreezeAccount";
	TokenInstruction[TokenInstruction["ThawAccount"] = 11] = "ThawAccount";
	TokenInstruction[TokenInstruction["TransferChecked"] = 12] = "TransferChecked";
	TokenInstruction[TokenInstruction["ApproveChecked"] = 13] = "ApproveChecked";
	TokenInstruction[TokenInstruction["MintToChecked"] = 14] = "MintToChecked";
	TokenInstruction[TokenInstruction["BurnChecked"] = 15] = "BurnChecked";
	TokenInstruction[TokenInstruction["InitializeAccount2"] = 16] = "InitializeAccount2";
	TokenInstruction[TokenInstruction["SyncNative"] = 17] = "SyncNative";
	TokenInstruction[TokenInstruction["InitializeAccount3"] = 18] = "InitializeAccount3";
	TokenInstruction[TokenInstruction["InitializeMultisig2"] = 19] = "InitializeMultisig2";
	TokenInstruction[TokenInstruction["InitializeMint2"] = 20] = "InitializeMint2";
	TokenInstruction[TokenInstruction["GetAccountDataSize"] = 21] = "GetAccountDataSize";
	TokenInstruction[TokenInstruction["InitializeImmutableOwner"] = 22] = "InitializeImmutableOwner";
	TokenInstruction[TokenInstruction["AmountToUiAmount"] = 23] = "AmountToUiAmount";
	TokenInstruction[TokenInstruction["UiAmountToAmount"] = 24] = "UiAmountToAmount";
	TokenInstruction[TokenInstruction["InitializeMintCloseAuthority"] = 25] = "InitializeMintCloseAuthority";
	TokenInstruction[TokenInstruction["TransferFeeExtension"] = 26] = "TransferFeeExtension";
	TokenInstruction[TokenInstruction["ConfidentialTransferExtension"] = 27] = "ConfidentialTransferExtension";
	TokenInstruction[TokenInstruction["DefaultAccountStateExtension"] = 28] = "DefaultAccountStateExtension";
	TokenInstruction[TokenInstruction["Reallocate"] = 29] = "Reallocate";
	TokenInstruction[TokenInstruction["MemoTransferExtension"] = 30] = "MemoTransferExtension";
	TokenInstruction[TokenInstruction["CreateNativeMint"] = 31] = "CreateNativeMint";
	TokenInstruction[TokenInstruction["InitializeNonTransferableMint"] = 32] = "InitializeNonTransferableMint";
	TokenInstruction[TokenInstruction["InterestBearingMintExtension"] = 33] = "InterestBearingMintExtension";
	TokenInstruction[TokenInstruction["CpiGuardExtension"] = 34] = "CpiGuardExtension";
	TokenInstruction[TokenInstruction["InitializePermanentDelegate"] = 35] = "InitializePermanentDelegate";
	TokenInstruction[TokenInstruction["TransferHookExtension"] = 36] = "TransferHookExtension";
	TokenInstruction[TokenInstruction["MetadataPointerExtension"] = 39] = "MetadataPointerExtension";
	TokenInstruction[TokenInstruction["GroupPointerExtension"] = 40] = "GroupPointerExtension";
	TokenInstruction[TokenInstruction["GroupMemberPointerExtension"] = 41] = "GroupMemberPointerExtension";
	TokenInstruction[TokenInstruction["ScaledUiAmountExtension"] = 43] = "ScaledUiAmountExtension";
	TokenInstruction[TokenInstruction["PausableExtension"] = 44] = "PausableExtension";
})(TokenInstruction || (TokenInstruction = {}));
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/instructions/internal.js
/** @internal */
function addSigners(keys, ownerOrAuthority, multiSigners) {
	if (multiSigners.length) {
		keys.push({
			pubkey: ownerOrAuthority,
			isSigner: false,
			isWritable: false
		});
		for (const signer of multiSigners) keys.push({
			pubkey: signer instanceof PublicKey ? signer : signer.publicKey,
			isSigner: true,
			isWritable: false
		});
	} else keys.push({
		pubkey: ownerOrAuthority,
		isSigner: true,
		isWritable: false
	});
	return keys;
}
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/instructions/closeAccount.js
init_index_esm();
/** TODO: docs */
var closeAccountInstructionData = (0, import_Layout.struct)([(0, import_Layout.u8)("instruction")]);
/**
* Construct a CloseAccount instruction
*
* @param account      Account to close
* @param destination  Account to receive the remaining balance of the closed account
* @param authority    Account close authority
* @param multiSigners Signing accounts if `authority` is a multisig
* @param programId    SPL Token program account
*
* @return Instruction to add to a transaction
*/
function createCloseAccountInstruction(account, destination, authority, multiSigners = [], programId = TOKEN_PROGRAM_ID) {
	const keys = addSigners([{
		pubkey: account,
		isSigner: false,
		isWritable: true
	}, {
		pubkey: destination,
		isSigner: false,
		isWritable: true
	}], authority, multiSigners);
	const data = Buffer.alloc(closeAccountInstructionData.span);
	closeAccountInstructionData.encode({ instruction: TokenInstruction.CloseAccount }, data);
	return new TransactionInstruction({
		keys,
		programId,
		data
	});
}
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/instructions/associatedTokenAccount.js
init_index_esm();
/**
* Construct a CreateAssociatedTokenAccountIdempotent instruction
*
* @param payer                    Payer of the initialization fees
* @param associatedToken          New associated token account
* @param owner                    Owner of the new account
* @param mint                     Token mint account
* @param programId                SPL Token program account
* @param associatedTokenProgramId SPL Associated Token program account
*
* @return Instruction to add to a transaction
*/
function createAssociatedTokenAccountIdempotentInstruction(payer, associatedToken, owner, mint, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
	return buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, Buffer.from([1]), programId, associatedTokenProgramId);
}
function buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, instructionData, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
	const keys = [
		{
			pubkey: payer,
			isSigner: true,
			isWritable: true
		},
		{
			pubkey: associatedToken,
			isSigner: false,
			isWritable: true
		},
		{
			pubkey: owner,
			isSigner: false,
			isWritable: false
		},
		{
			pubkey: mint,
			isSigner: false,
			isWritable: false
		},
		{
			pubkey: SystemProgram.programId,
			isSigner: false,
			isWritable: false
		},
		{
			pubkey: programId,
			isSigner: false,
			isWritable: false
		}
	];
	return new TransactionInstruction({
		keys,
		programId: associatedTokenProgramId,
		data: instructionData
	});
}
//#endregion
//#region node_modules/@solana/spl-token/lib/esm/instructions/syncNative.js
init_index_esm();
/** TODO: docs */
var syncNativeInstructionData = (0, import_Layout.struct)([(0, import_Layout.u8)("instruction")]);
/**
* Construct a SyncNative instruction
*
* @param account   Native account to sync lamports from
* @param programId SPL Token program account
*
* @return Instruction to add to a transaction
*/
function createSyncNativeInstruction(account, programId = TOKEN_PROGRAM_ID) {
	const keys = [{
		pubkey: account,
		isSigner: false,
		isWritable: true
	}];
	const data = Buffer.alloc(syncNativeInstructionData.span);
	syncNativeInstructionData.encode({ instruction: TokenInstruction.SyncNative }, data);
	return new TransactionInstruction({
		keys,
		programId,
		data
	});
}
//#endregion
//#region node_modules/@pump-fun/pump-swap-sdk/dist/esm/index.js
init_index_esm();
init_provider(), init_program();
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var require_base64_js = __commonJS({ "node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
	"use strict";
	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	var i;
	var len;
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len2 = b64.length;
		if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len2;
		var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i2 = 0;
		for (; i2 < len2; i2 += 4) {
			tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i2 = start; i2 < end; i2 += 3) {
			tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray(uint8) {
		var tmp;
		var len2 = uint8.length;
		var extraBytes = len2 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len2 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
} });
var require_ieee754 = __commonJS({ "node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js"(exports) {
	"use strict";
	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
		var e, m;
		var eLen = nBytes * 8 - mLen - 1;
		var eMax = (1 << eLen) - 1;
		var eBias = eMax >> 1;
		var nBits = -7;
		var i = isLE ? nBytes - 1 : 0;
		var d = isLE ? -1 : 1;
		var s = buffer[offset + i];
		i += d;
		e = s & (1 << -nBits) - 1;
		s >>= -nBits;
		nBits += eLen;
		for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
		m = e & (1 << -nBits) - 1;
		e >>= -nBits;
		nBits += mLen;
		for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
		if (e === 0) e = 1 - eBias;
		else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
		else {
			m = m + Math.pow(2, mLen);
			e = e - eBias;
		}
		return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};
	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
		var e, m, c;
		var eLen = nBytes * 8 - mLen - 1;
		var eMax = (1 << eLen) - 1;
		var eBias = eMax >> 1;
		var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
		var i = isLE ? 0 : nBytes - 1;
		var d = isLE ? 1 : -1;
		var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
		value = Math.abs(value);
		if (isNaN(value) || value === Infinity) {
			m = isNaN(value) ? 1 : 0;
			e = eMax;
		} else {
			e = Math.floor(Math.log(value) / Math.LN2);
			if (value * (c = Math.pow(2, -e)) < 1) {
				e--;
				c *= 2;
			}
			if (e + eBias >= 1) value += rt / c;
			else value += rt * Math.pow(2, 1 - eBias);
			if (value * c >= 2) {
				e++;
				c /= 2;
			}
			if (e + eBias >= eMax) {
				m = 0;
				e = eMax;
			} else if (e + eBias >= 1) {
				m = (value * c - 1) * Math.pow(2, mLen);
				e = e + eBias;
			} else {
				m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
				e = 0;
			}
		}
		for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8);
		e = e << mLen | m;
		eLen += mLen;
		for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8);
		buffer[offset + i - d] |= s * 128;
	};
} });
var import_buffer = __toESM(__commonJS({ "node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js"(exports) {
	"use strict";
	var base64 = require_base64_js();
	var ieee754 = require_ieee754();
	var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
	exports.Buffer = Buffer3;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;
	var K_MAX_LENGTH = 2147483647;
	exports.kMaxLength = K_MAX_LENGTH;
	Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
	if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
	function typedArraySupport() {
		try {
			const arr = /* @__PURE__ */ new Uint8Array(1);
			const proto = { foo: function() {
				return 42;
			} };
			Object.setPrototypeOf(proto, Uint8Array.prototype);
			Object.setPrototypeOf(arr, proto);
			return arr.foo() === 42;
		} catch (e) {
			return false;
		}
	}
	Object.defineProperty(Buffer3.prototype, "parent", {
		enumerable: true,
		get: function() {
			if (!Buffer3.isBuffer(this)) return void 0;
			return this.buffer;
		}
	});
	Object.defineProperty(Buffer3.prototype, "offset", {
		enumerable: true,
		get: function() {
			if (!Buffer3.isBuffer(this)) return void 0;
			return this.byteOffset;
		}
	});
	function createBuffer(length) {
		if (length > K_MAX_LENGTH) throw new RangeError("The value \"" + length + "\" is invalid for option \"size\"");
		const buf = new Uint8Array(length);
		Object.setPrototypeOf(buf, Buffer3.prototype);
		return buf;
	}
	function Buffer3(arg, encodingOrOffset, length) {
		if (typeof arg === "number") {
			if (typeof encodingOrOffset === "string") throw new TypeError("The \"string\" argument must be of type string. Received type number");
			return allocUnsafe(arg);
		}
		return from(arg, encodingOrOffset, length);
	}
	Buffer3.poolSize = 8192;
	function from(value, encodingOrOffset, length) {
		if (typeof value === "string") return fromString(value, encodingOrOffset);
		if (ArrayBuffer.isView(value)) return fromArrayView(value);
		if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
		if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
		if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
		if (typeof value === "number") throw new TypeError("The \"value\" argument must not be of type number. Received type number");
		const valueOf = value.valueOf && value.valueOf();
		if (valueOf != null && valueOf !== value) return Buffer3.from(valueOf, encodingOrOffset, length);
		const b = fromObject(value);
		if (b) return b;
		if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
		throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
	}
	Buffer3.from = function(value, encodingOrOffset, length) {
		return from(value, encodingOrOffset, length);
	};
	Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
	Object.setPrototypeOf(Buffer3, Uint8Array);
	function assertSize(size) {
		if (typeof size !== "number") throw new TypeError("\"size\" argument must be of type number");
		else if (size < 0) throw new RangeError("The value \"" + size + "\" is invalid for option \"size\"");
	}
	function alloc(size, fill, encoding) {
		assertSize(size);
		if (size <= 0) return createBuffer(size);
		if (fill !== void 0) return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
		return createBuffer(size);
	}
	Buffer3.alloc = function(size, fill, encoding) {
		return alloc(size, fill, encoding);
	};
	function allocUnsafe(size) {
		assertSize(size);
		return createBuffer(size < 0 ? 0 : checked(size) | 0);
	}
	Buffer3.allocUnsafe = function(size) {
		return allocUnsafe(size);
	};
	Buffer3.allocUnsafeSlow = function(size) {
		return allocUnsafe(size);
	};
	function fromString(string, encoding) {
		if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
		if (!Buffer3.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
		const length = byteLength(string, encoding) | 0;
		let buf = createBuffer(length);
		const actual = buf.write(string, encoding);
		if (actual !== length) buf = buf.slice(0, actual);
		return buf;
	}
	function fromArrayLike(array) {
		const length = array.length < 0 ? 0 : checked(array.length) | 0;
		const buf = createBuffer(length);
		for (let i = 0; i < length; i += 1) buf[i] = array[i] & 255;
		return buf;
	}
	function fromArrayView(arrayView) {
		if (isInstance(arrayView, Uint8Array)) {
			const copy = new Uint8Array(arrayView);
			return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
		}
		return fromArrayLike(arrayView);
	}
	function fromArrayBuffer(array, byteOffset, length) {
		if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("\"offset\" is outside of buffer bounds");
		if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("\"length\" is outside of buffer bounds");
		let buf;
		if (byteOffset === void 0 && length === void 0) buf = new Uint8Array(array);
		else if (length === void 0) buf = new Uint8Array(array, byteOffset);
		else buf = new Uint8Array(array, byteOffset, length);
		Object.setPrototypeOf(buf, Buffer3.prototype);
		return buf;
	}
	function fromObject(obj) {
		if (Buffer3.isBuffer(obj)) {
			const len = checked(obj.length) | 0;
			const buf = createBuffer(len);
			if (buf.length === 0) return buf;
			obj.copy(buf, 0, 0, len);
			return buf;
		}
		if (obj.length !== void 0) {
			if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
			return fromArrayLike(obj);
		}
		if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
	}
	function checked(length) {
		if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
		return length | 0;
	}
	function SlowBuffer(length) {
		if (+length != length) length = 0;
		return Buffer3.alloc(+length);
	}
	Buffer3.isBuffer = function isBuffer(b) {
		return b != null && b._isBuffer === true && b !== Buffer3.prototype;
	};
	Buffer3.compare = function compare(a, b) {
		if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
		if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
		if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
		if (a === b) return 0;
		let x = a.length;
		let y = b.length;
		for (let i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
			x = a[i];
			y = b[i];
			break;
		}
		if (x < y) return -1;
		if (y < x) return 1;
		return 0;
	};
	Buffer3.isEncoding = function isEncoding(encoding) {
		switch (String(encoding).toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "latin1":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return true;
			default: return false;
		}
	};
	Buffer3.concat = function concat(list, length) {
		if (!Array.isArray(list)) throw new TypeError("\"list\" argument must be an Array of Buffers");
		if (list.length === 0) return Buffer3.alloc(0);
		let i;
		if (length === void 0) {
			length = 0;
			for (i = 0; i < list.length; ++i) length += list[i].length;
		}
		const buffer = Buffer3.allocUnsafe(length);
		let pos = 0;
		for (i = 0; i < list.length; ++i) {
			let buf = list[i];
			if (isInstance(buf, Uint8Array)) {
				if (pos + buf.length > buffer.length) {
					if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
					buf.copy(buffer, pos);
				} else Uint8Array.prototype.set.call(buffer, buf, pos);
			} else if (!Buffer3.isBuffer(buf)) throw new TypeError("\"list\" argument must be an Array of Buffers");
			else buf.copy(buffer, pos);
			pos += buf.length;
		}
		return buffer;
	};
	function byteLength(string, encoding) {
		if (Buffer3.isBuffer(string)) return string.length;
		if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
		if (typeof string !== "string") throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof string);
		const len = string.length;
		const mustMatch = arguments.length > 2 && arguments[2] === true;
		if (!mustMatch && len === 0) return 0;
		let loweredCase = false;
		for (;;) switch (encoding) {
			case "ascii":
			case "latin1":
			case "binary": return len;
			case "utf8":
			case "utf-8": return utf8ToBytes(string).length;
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return len * 2;
			case "hex": return len >>> 1;
			case "base64": return base64ToBytes(string).length;
			default:
				if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length;
				encoding = ("" + encoding).toLowerCase();
				loweredCase = true;
		}
	}
	Buffer3.byteLength = byteLength;
	function slowToString(encoding, start, end) {
		let loweredCase = false;
		if (start === void 0 || start < 0) start = 0;
		if (start > this.length) return "";
		if (end === void 0 || end > this.length) end = this.length;
		if (end <= 0) return "";
		end >>>= 0;
		start >>>= 0;
		if (end <= start) return "";
		if (!encoding) encoding = "utf8";
		while (true) switch (encoding) {
			case "hex": return hexSlice(this, start, end);
			case "utf8":
			case "utf-8": return utf8Slice(this, start, end);
			case "ascii": return asciiSlice(this, start, end);
			case "latin1":
			case "binary": return latin1Slice(this, start, end);
			case "base64": return base64Slice(this, start, end);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return utf16leSlice(this, start, end);
			default:
				if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
				encoding = (encoding + "").toLowerCase();
				loweredCase = true;
		}
	}
	Buffer3.prototype._isBuffer = true;
	function swap(b, n, m) {
		const i = b[n];
		b[n] = b[m];
		b[m] = i;
	}
	Buffer3.prototype.swap16 = function swap16() {
		const len = this.length;
		if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
		for (let i = 0; i < len; i += 2) swap(this, i, i + 1);
		return this;
	};
	Buffer3.prototype.swap32 = function swap32() {
		const len = this.length;
		if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
		for (let i = 0; i < len; i += 4) {
			swap(this, i, i + 3);
			swap(this, i + 1, i + 2);
		}
		return this;
	};
	Buffer3.prototype.swap64 = function swap64() {
		const len = this.length;
		if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
		for (let i = 0; i < len; i += 8) {
			swap(this, i, i + 7);
			swap(this, i + 1, i + 6);
			swap(this, i + 2, i + 5);
			swap(this, i + 3, i + 4);
		}
		return this;
	};
	Buffer3.prototype.toString = function toString() {
		const length = this.length;
		if (length === 0) return "";
		if (arguments.length === 0) return utf8Slice(this, 0, length);
		return slowToString.apply(this, arguments);
	};
	Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
	Buffer3.prototype.equals = function equals(b) {
		if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
		if (this === b) return true;
		return Buffer3.compare(this, b) === 0;
	};
	Buffer3.prototype.inspect = function inspect() {
		let str = "";
		const max = exports.INSPECT_MAX_BYTES;
		str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
		if (this.length > max) str += " ... ";
		return "<Buffer " + str + ">";
	};
	if (customInspectSymbol) Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
	Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
		if (isInstance(target, Uint8Array)) target = Buffer3.from(target, target.offset, target.byteLength);
		if (!Buffer3.isBuffer(target)) throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof target);
		if (start === void 0) start = 0;
		if (end === void 0) end = target ? target.length : 0;
		if (thisStart === void 0) thisStart = 0;
		if (thisEnd === void 0) thisEnd = this.length;
		if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
		if (thisStart >= thisEnd && start >= end) return 0;
		if (thisStart >= thisEnd) return -1;
		if (start >= end) return 1;
		start >>>= 0;
		end >>>= 0;
		thisStart >>>= 0;
		thisEnd >>>= 0;
		if (this === target) return 0;
		let x = thisEnd - thisStart;
		let y = end - start;
		const len = Math.min(x, y);
		const thisCopy = this.slice(thisStart, thisEnd);
		const targetCopy = target.slice(start, end);
		for (let i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
			x = thisCopy[i];
			y = targetCopy[i];
			break;
		}
		if (x < y) return -1;
		if (y < x) return 1;
		return 0;
	};
	function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
		if (buffer.length === 0) return -1;
		if (typeof byteOffset === "string") {
			encoding = byteOffset;
			byteOffset = 0;
		} else if (byteOffset > 2147483647) byteOffset = 2147483647;
		else if (byteOffset < -2147483648) byteOffset = -2147483648;
		byteOffset = +byteOffset;
		if (numberIsNaN(byteOffset)) byteOffset = dir ? 0 : buffer.length - 1;
		if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
		if (byteOffset >= buffer.length) {
			if (dir) return -1;
			else byteOffset = buffer.length - 1;
		} else if (byteOffset < 0) {
			if (dir) byteOffset = 0;
			else return -1;
		}
		if (typeof val === "string") val = Buffer3.from(val, encoding);
		if (Buffer3.isBuffer(val)) {
			if (val.length === 0) return -1;
			return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
		} else if (typeof val === "number") {
			val = val & 255;
			if (typeof Uint8Array.prototype.indexOf === "function") {
				if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
				else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
			}
			return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
		}
		throw new TypeError("val must be string, number or Buffer");
	}
	function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
		let indexSize = 1;
		let arrLength = arr.length;
		let valLength = val.length;
		if (encoding !== void 0) {
			encoding = String(encoding).toLowerCase();
			if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
				if (arr.length < 2 || val.length < 2) return -1;
				indexSize = 2;
				arrLength /= 2;
				valLength /= 2;
				byteOffset /= 2;
			}
		}
		function read(buf, i2) {
			if (indexSize === 1) return buf[i2];
			else return buf.readUInt16BE(i2 * indexSize);
		}
		let i;
		if (dir) {
			let foundIndex = -1;
			for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
				if (foundIndex === -1) foundIndex = i;
				if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
			} else {
				if (foundIndex !== -1) i -= i - foundIndex;
				foundIndex = -1;
			}
		} else {
			if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
			for (i = byteOffset; i >= 0; i--) {
				let found = true;
				for (let j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
					found = false;
					break;
				}
				if (found) return i;
			}
		}
		return -1;
	}
	Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
		return this.indexOf(val, byteOffset, encoding) !== -1;
	};
	Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
		return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
	};
	Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
		return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
	};
	function hexWrite(buf, string, offset, length) {
		offset = Number(offset) || 0;
		const remaining = buf.length - offset;
		if (!length) length = remaining;
		else {
			length = Number(length);
			if (length > remaining) length = remaining;
		}
		const strLen = string.length;
		if (length > strLen / 2) length = strLen / 2;
		let i = 0;
		for (; i < length; ++i) {
			const parsed = parseInt(string.substr(i * 2, 2), 16);
			if (numberIsNaN(parsed)) return i;
			buf[offset + i] = parsed;
		}
		return i;
	}
	function utf8Write(buf, string, offset, length) {
		return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}
	function asciiWrite(buf, string, offset, length) {
		return blitBuffer(asciiToBytes(string), buf, offset, length);
	}
	function base64Write(buf, string, offset, length) {
		return blitBuffer(base64ToBytes(string), buf, offset, length);
	}
	function ucs2Write(buf, string, offset, length) {
		return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}
	Buffer3.prototype.write = function write(string, offset, length, encoding) {
		if (offset === void 0) {
			encoding = "utf8";
			length = this.length;
			offset = 0;
		} else if (length === void 0 && typeof offset === "string") {
			encoding = offset;
			length = this.length;
			offset = 0;
		} else if (isFinite(offset)) {
			offset = offset >>> 0;
			if (isFinite(length)) {
				length = length >>> 0;
				if (encoding === void 0) encoding = "utf8";
			} else {
				encoding = length;
				length = void 0;
			}
		} else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
		const remaining = this.length - offset;
		if (length === void 0 || length > remaining) length = remaining;
		if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
		if (!encoding) encoding = "utf8";
		let loweredCase = false;
		for (;;) switch (encoding) {
			case "hex": return hexWrite(this, string, offset, length);
			case "utf8":
			case "utf-8": return utf8Write(this, string, offset, length);
			case "ascii":
			case "latin1":
			case "binary": return asciiWrite(this, string, offset, length);
			case "base64": return base64Write(this, string, offset, length);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return ucs2Write(this, string, offset, length);
			default:
				if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
				encoding = ("" + encoding).toLowerCase();
				loweredCase = true;
		}
	};
	Buffer3.prototype.toJSON = function toJSON() {
		return {
			type: "Buffer",
			data: Array.prototype.slice.call(this._arr || this, 0)
		};
	};
	function base64Slice(buf, start, end) {
		if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
		else return base64.fromByteArray(buf.slice(start, end));
	}
	function utf8Slice(buf, start, end) {
		end = Math.min(buf.length, end);
		const res = [];
		let i = start;
		while (i < end) {
			const firstByte = buf[i];
			let codePoint = null;
			let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
			if (i + bytesPerSequence <= end) {
				let secondByte, thirdByte, fourthByte, tempCodePoint;
				switch (bytesPerSequence) {
					case 1:
						if (firstByte < 128) codePoint = firstByte;
						break;
					case 2:
						secondByte = buf[i + 1];
						if ((secondByte & 192) === 128) {
							tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
							if (tempCodePoint > 127) codePoint = tempCodePoint;
						}
						break;
					case 3:
						secondByte = buf[i + 1];
						thirdByte = buf[i + 2];
						if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
							tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
							if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) codePoint = tempCodePoint;
						}
						break;
					case 4:
						secondByte = buf[i + 1];
						thirdByte = buf[i + 2];
						fourthByte = buf[i + 3];
						if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
							tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
							if (tempCodePoint > 65535 && tempCodePoint < 1114112) codePoint = tempCodePoint;
						}
				}
			}
			if (codePoint === null) {
				codePoint = 65533;
				bytesPerSequence = 1;
			} else if (codePoint > 65535) {
				codePoint -= 65536;
				res.push(codePoint >>> 10 & 1023 | 55296);
				codePoint = 56320 | codePoint & 1023;
			}
			res.push(codePoint);
			i += bytesPerSequence;
		}
		return decodeCodePointsArray(res);
	}
	var MAX_ARGUMENTS_LENGTH = 4096;
	function decodeCodePointsArray(codePoints) {
		const len = codePoints.length;
		if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
		let res = "";
		let i = 0;
		while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
		return res;
	}
	function asciiSlice(buf, start, end) {
		let ret = "";
		end = Math.min(buf.length, end);
		for (let i = start; i < end; ++i) ret += String.fromCharCode(buf[i] & 127);
		return ret;
	}
	function latin1Slice(buf, start, end) {
		let ret = "";
		end = Math.min(buf.length, end);
		for (let i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
		return ret;
	}
	function hexSlice(buf, start, end) {
		const len = buf.length;
		if (!start || start < 0) start = 0;
		if (!end || end < 0 || end > len) end = len;
		let out = "";
		for (let i = start; i < end; ++i) out += hexSliceLookupTable[buf[i]];
		return out;
	}
	function utf16leSlice(buf, start, end) {
		const bytes = buf.slice(start, end);
		let res = "";
		for (let i = 0; i < bytes.length - 1; i += 2) res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
		return res;
	}
	Buffer3.prototype.slice = function slice(start, end) {
		const len = this.length;
		start = ~~start;
		end = end === void 0 ? len : ~~end;
		if (start < 0) {
			start += len;
			if (start < 0) start = 0;
		} else if (start > len) start = len;
		if (end < 0) {
			end += len;
			if (end < 0) end = 0;
		} else if (end > len) end = len;
		if (end < start) end = start;
		const newBuf = this.subarray(start, end);
		Object.setPrototypeOf(newBuf, Buffer3.prototype);
		return newBuf;
	};
	function checkOffset(offset, ext, length) {
		if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
		if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
	}
	Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
		offset = offset >>> 0;
		byteLength2 = byteLength2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength2, this.length);
		let val = this[offset];
		let mul = 1;
		let i = 0;
		while (++i < byteLength2 && (mul *= 256)) val += this[offset + i] * mul;
		return val;
	};
	Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
		offset = offset >>> 0;
		byteLength2 = byteLength2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength2, this.length);
		let val = this[offset + --byteLength2];
		let mul = 1;
		while (byteLength2 > 0 && (mul *= 256)) val += this[offset + --byteLength2] * mul;
		return val;
	};
	Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 1, this.length);
		return this[offset];
	};
	Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		return this[offset] | this[offset + 1] << 8;
	};
	Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		return this[offset] << 8 | this[offset + 1];
	};
	Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
	};
	Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};
	Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const lo = first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
		const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 2 ** 16 + last * 2 ** 24;
		return BigInt(lo) + (BigInt(hi) << BigInt(32));
	});
	Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
		const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last;
		return (BigInt(hi) << BigInt(32)) + BigInt(lo);
	});
	Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
		offset = offset >>> 0;
		byteLength2 = byteLength2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength2, this.length);
		let val = this[offset];
		let mul = 1;
		let i = 0;
		while (++i < byteLength2 && (mul *= 256)) val += this[offset + i] * mul;
		mul *= 128;
		if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
		return val;
	};
	Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
		offset = offset >>> 0;
		byteLength2 = byteLength2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength2, this.length);
		let i = byteLength2;
		let mul = 1;
		let val = this[offset + --i];
		while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
		mul *= 128;
		if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
		return val;
	};
	Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 1, this.length);
		if (!(this[offset] & 128)) return this[offset];
		return (255 - this[offset] + 1) * -1;
	};
	Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		const val = this[offset] | this[offset + 1] << 8;
		return val & 32768 ? val | 4294901760 : val;
	};
	Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		const val = this[offset + 1] | this[offset] << 8;
		return val & 32768 ? val | 4294901760 : val;
	};
	Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};
	Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};
	Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 2 ** 16 + (last << 24);
		return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
	});
	Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
		return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last);
	});
	Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return ieee754.read(this, offset, true, 23, 4);
	};
	Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return ieee754.read(this, offset, false, 23, 4);
	};
	Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 8, this.length);
		return ieee754.read(this, offset, true, 52, 8);
	};
	Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 8, this.length);
		return ieee754.read(this, offset, false, 52, 8);
	};
	function checkInt(buf, value, offset, ext, max, min) {
		if (!Buffer3.isBuffer(buf)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
		if (value > max || value < min) throw new RangeError("\"value\" argument is out of bounds");
		if (offset + ext > buf.length) throw new RangeError("Index out of range");
	}
	Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		byteLength2 = byteLength2 >>> 0;
		if (!noAssert) {
			const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
			checkInt(this, value, offset, byteLength2, maxBytes, 0);
		}
		let mul = 1;
		let i = 0;
		this[offset] = value & 255;
		while (++i < byteLength2 && (mul *= 256)) this[offset + i] = value / mul & 255;
		return offset + byteLength2;
	};
	Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		byteLength2 = byteLength2 >>> 0;
		if (!noAssert) {
			const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
			checkInt(this, value, offset, byteLength2, maxBytes, 0);
		}
		let i = byteLength2 - 1;
		let mul = 1;
		this[offset + i] = value & 255;
		while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
		return offset + byteLength2;
	};
	Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
		this[offset] = value & 255;
		return offset + 1;
	};
	Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
		this[offset] = value & 255;
		this[offset + 1] = value >>> 8;
		return offset + 2;
	};
	Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
		this[offset] = value >>> 8;
		this[offset + 1] = value & 255;
		return offset + 2;
	};
	Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
		this[offset + 3] = value >>> 24;
		this[offset + 2] = value >>> 16;
		this[offset + 1] = value >>> 8;
		this[offset] = value & 255;
		return offset + 4;
	};
	Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
		this[offset] = value >>> 24;
		this[offset + 1] = value >>> 16;
		this[offset + 2] = value >>> 8;
		this[offset + 3] = value & 255;
		return offset + 4;
	};
	function wrtBigUInt64LE(buf, value, offset, min, max) {
		checkIntBI(value, min, max, buf, offset, 7);
		let lo = Number(value & BigInt(4294967295));
		buf[offset++] = lo;
		lo = lo >> 8;
		buf[offset++] = lo;
		lo = lo >> 8;
		buf[offset++] = lo;
		lo = lo >> 8;
		buf[offset++] = lo;
		let hi = Number(value >> BigInt(32) & BigInt(4294967295));
		buf[offset++] = hi;
		hi = hi >> 8;
		buf[offset++] = hi;
		hi = hi >> 8;
		buf[offset++] = hi;
		hi = hi >> 8;
		buf[offset++] = hi;
		return offset;
	}
	function wrtBigUInt64BE(buf, value, offset, min, max) {
		checkIntBI(value, min, max, buf, offset, 7);
		let lo = Number(value & BigInt(4294967295));
		buf[offset + 7] = lo;
		lo = lo >> 8;
		buf[offset + 6] = lo;
		lo = lo >> 8;
		buf[offset + 5] = lo;
		lo = lo >> 8;
		buf[offset + 4] = lo;
		let hi = Number(value >> BigInt(32) & BigInt(4294967295));
		buf[offset + 3] = hi;
		hi = hi >> 8;
		buf[offset + 2] = hi;
		hi = hi >> 8;
		buf[offset + 1] = hi;
		hi = hi >> 8;
		buf[offset] = hi;
		return offset + 8;
	}
	Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
		return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
	});
	Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
		return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
	});
	Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) {
			const limit = Math.pow(2, 8 * byteLength2 - 1);
			checkInt(this, value, offset, byteLength2, limit - 1, -limit);
		}
		let i = 0;
		let mul = 1;
		let sub = 0;
		this[offset] = value & 255;
		while (++i < byteLength2 && (mul *= 256)) {
			if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
			this[offset + i] = (value / mul >> 0) - sub & 255;
		}
		return offset + byteLength2;
	};
	Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) {
			const limit = Math.pow(2, 8 * byteLength2 - 1);
			checkInt(this, value, offset, byteLength2, limit - 1, -limit);
		}
		let i = byteLength2 - 1;
		let mul = 1;
		let sub = 0;
		this[offset + i] = value & 255;
		while (--i >= 0 && (mul *= 256)) {
			if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
			this[offset + i] = (value / mul >> 0) - sub & 255;
		}
		return offset + byteLength2;
	};
	Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
		if (value < 0) value = 255 + value + 1;
		this[offset] = value & 255;
		return offset + 1;
	};
	Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
		this[offset] = value & 255;
		this[offset + 1] = value >>> 8;
		return offset + 2;
	};
	Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
		this[offset] = value >>> 8;
		this[offset + 1] = value & 255;
		return offset + 2;
	};
	Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
		this[offset] = value & 255;
		this[offset + 1] = value >>> 8;
		this[offset + 2] = value >>> 16;
		this[offset + 3] = value >>> 24;
		return offset + 4;
	};
	Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
		if (value < 0) value = 4294967295 + value + 1;
		this[offset] = value >>> 24;
		this[offset + 1] = value >>> 16;
		this[offset + 2] = value >>> 8;
		this[offset + 3] = value & 255;
		return offset + 4;
	};
	Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
		return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
	});
	Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
		return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
	});
	function checkIEEE754(buf, value, offset, ext, max, min) {
		if (offset + ext > buf.length) throw new RangeError("Index out of range");
		if (offset < 0) throw new RangeError("Index out of range");
	}
	function writeFloat(buf, value, offset, littleEndian, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
		ieee754.write(buf, value, offset, littleEndian, 23, 4);
		return offset + 4;
	}
	Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
		return writeFloat(this, value, offset, true, noAssert);
	};
	Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
		return writeFloat(this, value, offset, false, noAssert);
	};
	function writeDouble(buf, value, offset, littleEndian, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
		ieee754.write(buf, value, offset, littleEndian, 52, 8);
		return offset + 8;
	}
	Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
		return writeDouble(this, value, offset, true, noAssert);
	};
	Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
		return writeDouble(this, value, offset, false, noAssert);
	};
	Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
		if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
		if (!start) start = 0;
		if (!end && end !== 0) end = this.length;
		if (targetStart >= target.length) targetStart = target.length;
		if (!targetStart) targetStart = 0;
		if (end > 0 && end < start) end = start;
		if (end === start) return 0;
		if (target.length === 0 || this.length === 0) return 0;
		if (targetStart < 0) throw new RangeError("targetStart out of bounds");
		if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
		if (end < 0) throw new RangeError("sourceEnd out of bounds");
		if (end > this.length) end = this.length;
		if (target.length - targetStart < end - start) end = target.length - targetStart + start;
		const len = end - start;
		if (this === target && typeof Uint8Array.prototype.copyWithin === "function") this.copyWithin(targetStart, start, end);
		else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
		return len;
	};
	Buffer3.prototype.fill = function fill(val, start, end, encoding) {
		if (typeof val === "string") {
			if (typeof start === "string") {
				encoding = start;
				start = 0;
				end = this.length;
			} else if (typeof end === "string") {
				encoding = end;
				end = this.length;
			}
			if (encoding !== void 0 && typeof encoding !== "string") throw new TypeError("encoding must be a string");
			if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
			if (val.length === 1) {
				const code = val.charCodeAt(0);
				if (encoding === "utf8" && code < 128 || encoding === "latin1") val = code;
			}
		} else if (typeof val === "number") val = val & 255;
		else if (typeof val === "boolean") val = Number(val);
		if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
		if (end <= start) return this;
		start = start >>> 0;
		end = end === void 0 ? this.length : end >>> 0;
		if (!val) val = 0;
		let i;
		if (typeof val === "number") for (i = start; i < end; ++i) this[i] = val;
		else {
			const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
			const len = bytes.length;
			if (len === 0) throw new TypeError("The value \"" + val + "\" is invalid for argument \"value\"");
			for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
		}
		return this;
	};
	var errors = {};
	function E(sym, getMessage, Base) {
		errors[sym] = class NodeError extends Base {
			constructor() {
				super();
				Object.defineProperty(this, "message", {
					value: getMessage.apply(this, arguments),
					writable: true,
					configurable: true
				});
				this.name = `${this.name} [${sym}]`;
				this.stack;
				delete this.name;
			}
			get code() {
				return sym;
			}
			set code(value) {
				Object.defineProperty(this, "code", {
					configurable: true,
					enumerable: true,
					value,
					writable: true
				});
			}
			toString() {
				return `${this.name} [${sym}]: ${this.message}`;
			}
		};
	}
	E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
		if (name) return `${name} is outside of buffer bounds`;
		return "Attempt to access memory outside buffer bounds";
	}, RangeError);
	E("ERR_INVALID_ARG_TYPE", function(name, actual) {
		return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
	}, TypeError);
	E("ERR_OUT_OF_RANGE", function(str, range, input) {
		let msg = `The value of "${str}" is out of range.`;
		let received = input;
		if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = addNumericalSeparator(String(input));
		else if (typeof input === "bigint") {
			received = String(input);
			if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = addNumericalSeparator(received);
			received += "n";
		}
		msg += ` It must be ${range}. Received ${received}`;
		return msg;
	}, RangeError);
	function addNumericalSeparator(val) {
		let res = "";
		let i = val.length;
		const start = val[0] === "-" ? 1 : 0;
		for (; i >= start + 4; i -= 3) res = `_${val.slice(i - 3, i)}${res}`;
		return `${val.slice(0, i)}${res}`;
	}
	function checkBounds(buf, offset, byteLength2) {
		validateNumber(offset, "offset");
		if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) boundsError(offset, buf.length - (byteLength2 + 1));
	}
	function checkIntBI(value, min, max, buf, offset, byteLength2) {
		if (value > max || value < min) {
			const n = typeof min === "bigint" ? "n" : "";
			let range;
			if (byteLength2 > 3) {
				if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
				else range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
			} else range = `>= ${min}${n} and <= ${max}${n}`;
			throw new errors.ERR_OUT_OF_RANGE("value", range, value);
		}
		checkBounds(buf, offset, byteLength2);
	}
	function validateNumber(value, name) {
		if (typeof value !== "number") throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
	}
	function boundsError(value, length, type) {
		if (Math.floor(value) !== value) {
			validateNumber(value, type);
			throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
		}
		if (length < 0) throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
		throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
	}
	var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
	function base64clean(str) {
		str = str.split("=")[0];
		str = str.trim().replace(INVALID_BASE64_RE, "");
		if (str.length < 2) return "";
		while (str.length % 4 !== 0) str = str + "=";
		return str;
	}
	function utf8ToBytes(string, units) {
		units = units || Infinity;
		let codePoint;
		const length = string.length;
		let leadSurrogate = null;
		const bytes = [];
		for (let i = 0; i < length; ++i) {
			codePoint = string.charCodeAt(i);
			if (codePoint > 55295 && codePoint < 57344) {
				if (!leadSurrogate) {
					if (codePoint > 56319) {
						if ((units -= 3) > -1) bytes.push(239, 191, 189);
						continue;
					} else if (i + 1 === length) {
						if ((units -= 3) > -1) bytes.push(239, 191, 189);
						continue;
					}
					leadSurrogate = codePoint;
					continue;
				}
				if (codePoint < 56320) {
					if ((units -= 3) > -1) bytes.push(239, 191, 189);
					leadSurrogate = codePoint;
					continue;
				}
				codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
			} else if (leadSurrogate) {
				if ((units -= 3) > -1) bytes.push(239, 191, 189);
			}
			leadSurrogate = null;
			if (codePoint < 128) {
				if ((units -= 1) < 0) break;
				bytes.push(codePoint);
			} else if (codePoint < 2048) {
				if ((units -= 2) < 0) break;
				bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
			} else if (codePoint < 65536) {
				if ((units -= 3) < 0) break;
				bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
			} else if (codePoint < 1114112) {
				if ((units -= 4) < 0) break;
				bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
			} else throw new Error("Invalid code point");
		}
		return bytes;
	}
	function asciiToBytes(str) {
		const byteArray = [];
		for (let i = 0; i < str.length; ++i) byteArray.push(str.charCodeAt(i) & 255);
		return byteArray;
	}
	function utf16leToBytes(str, units) {
		let c, hi, lo;
		const byteArray = [];
		for (let i = 0; i < str.length; ++i) {
			if ((units -= 2) < 0) break;
			c = str.charCodeAt(i);
			hi = c >> 8;
			lo = c % 256;
			byteArray.push(lo);
			byteArray.push(hi);
		}
		return byteArray;
	}
	function base64ToBytes(str) {
		return base64.toByteArray(base64clean(str));
	}
	function blitBuffer(src, dst, offset, length) {
		let i = 0;
		for (; i < length; ++i) {
			if (i + offset >= dst.length || i >= src.length) break;
			dst[i + offset] = src[i];
		}
		return i;
	}
	function isInstance(obj, type) {
		return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
	}
	function numberIsNaN(obj) {
		return obj !== obj;
	}
	var hexSliceLookupTable = (function() {
		const alphabet = "0123456789abcdef";
		const table = new Array(256);
		for (let i = 0; i < 16; ++i) {
			const i16 = i * 16;
			for (let j = 0; j < 16; ++j) table[i16 + j] = alphabet[i] + alphabet[j];
		}
		return table;
	})();
	function defineBigIntMethod(fn) {
		return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
	}
	function BufferBigIntNotDefined() {
		throw new Error("BigInt not supported");
	}
} })());
var PUMP_PROGRAM_ID$1 = new PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
var PUMP_AMM_PROGRAM_ID$1 = new PublicKey("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");
var PUMP_FEE_PROGRAM_ID$1 = new PublicKey("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");
new PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn");
function pumpPda(seeds) {
	return PublicKey.findProgramAddressSync(seeds, PUMP_PROGRAM_ID$1)[0];
}
function pumpAmmPda(seeds) {
	return PublicKey.findProgramAddressSync(seeds, PUMP_AMM_PROGRAM_ID$1)[0];
}
function pumpFeePda(seeds) {
	return PublicKey.findProgramAddressSync(seeds, PUMP_FEE_PROGRAM_ID$1)[0];
}
var GLOBAL_CONFIG_PDA = pumpAmmPda([import_buffer.Buffer.from("global_config")]);
var PUMP_AMM_EVENT_AUTHORITY_PDA$1 = pumpAmmPda([import_buffer.Buffer.from("__event_authority")]);
pumpAmmPda([import_buffer.Buffer.from("global_volume_accumulator")]);
pumpFeePda([import_buffer.Buffer.from("fee_config"), PUMP_AMM_PROGRAM_ID$1.toBuffer()]);
function poolPda(index, owner, baseMint, quoteMint) {
	return pumpAmmPda([
		import_buffer.Buffer.from("pool"),
		new import_bn.default(index).toArrayLike(import_buffer.Buffer, "le", 2),
		owner.toBuffer(),
		baseMint.toBuffer(),
		quoteMint.toBuffer()
	]);
}
function pumpPoolAuthorityPda$1(mint) {
	return pumpPda([import_buffer.Buffer.from("pool-authority"), mint.toBuffer()]);
}
var MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
function bondingCurvePda$1(mint) {
	return pumpPda([import_buffer.Buffer.from("bonding-curve"), mint.toBuffer()]);
}
function metadataPda(mint) {
	return PublicKey.findProgramAddressSync([
		import_buffer.Buffer.from("metadata"),
		MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
		mint.toBuffer()
	], MPL_TOKEN_METADATA_PROGRAM_ID)[0];
}
function userVolumeAccumulatorPda$1(user) {
	return pumpAmmPda([import_buffer.Buffer.from("user_volume_accumulator"), user.toBuffer()]);
}
function coinCreatorVaultAuthorityPda(coinCreator) {
	return pumpAmmPda([import_buffer.Buffer.from("creator_vault"), coinCreator.toBuffer()]);
}
function coinCreatorVaultAtaPda(coinCreatorVaultAuthority, quoteMint, quoteTokenProgram) {
	return getAssociatedTokenAddressSync(quoteMint, coinCreatorVaultAuthority, true, quoteTokenProgram);
}
function poolV2Pda(baseMint) {
	return pumpAmmPda([import_buffer.Buffer.from("pool-v2"), baseMint.toBuffer()]);
}
function boostVaultAuthorityPda$1(pool) {
	return pumpAmmPda([import_buffer.Buffer.from("boost_vault"), pool.toBuffer()]);
}
function boostVaultAta(boostVaultAuthority, quoteMint, quoteTokenProgram) {
	return getAssociatedTokenAddressSync(quoteMint, boostVaultAuthority, true, quoteTokenProgram);
}
var pump_amm_default$1 = {
	address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
	metadata: {
		name: "pump_amm",
		version: "0.1.0",
		spec: "0.1.0",
		description: "Created with Anchor"
	},
	instructions: [
		{
			name: "admin_set_coin_creator",
			docs: ["Overrides the coin creator for a canonical pump pool"],
			discriminator: [
				242,
				40,
				117,
				145,
				73,
				96,
				105,
				104
			],
			accounts: [
				{
					name: "admin_set_coin_creator_authority",
					signer: true,
					relations: ["global_config"]
				},
				{ name: "global_config" },
				{
					name: "pool",
					writable: true
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
				name: "coin_creator",
				type: "pubkey"
			}]
		},
		{
			name: "admin_set_coin_creator_fee_editable",
			discriminator: [
				204,
				65,
				86,
				207,
				110,
				84,
				239,
				104
			],
			accounts: [
				{
					name: "admin_set_coin_creator_authority",
					writable: true,
					signer: true,
					relations: ["global_config"]
				},
				{ name: "global_config" },
				{
					name: "pool",
					writable: true
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
			name: "admin_update_token_incentives",
			discriminator: [
				209,
				11,
				115,
				87,
				213,
				23,
				124,
				204
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					relations: ["global_config"]
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
							95,
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
					name: "global_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{ name: "mint" },
				{
					name: "global_incentive_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "global_volume_accumulator"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{ name: "token_program" },
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
					name: "start_time",
					type: "i64"
				},
				{
					name: "end_time",
					type: "i64"
				},
				{
					name: "seconds_in_a_day",
					type: "i64"
				},
				{
					name: "day_number",
					type: "u64"
				},
				{
					name: "token_supply_per_day",
					type: "u64"
				}
			]
		},
		{
			name: "boost_buy_and_burn",
			discriminator: [
				105,
				68,
				6,
				175,
				0,
				7,
				35,
				162
			],
			accounts: [
				{ name: "pool" },
				{
					name: "authority",
					writable: true,
					signer: true
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
							95,
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
					name: "base_mint",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "boost_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							98,
							111,
							111,
							115,
							116,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool"
					}] }
				},
				{
					name: "boost_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "boost_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
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
				name: "quote_amount_in",
				type: "u64"
			}, {
				name: "min_base_amount_burned",
				type: "u64"
			}]
		},
		{
			name: "buy",
			docs: ["For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].", "If provided and valid, the ATA will be initialized if needed."],
			discriminator: [
				102,
				6,
				61,
				18,
				1,
				218,
				235,
				234
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "protocol_fee_recipient" },
				{
					name: "protocol_fee_recipient_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "protocol_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool.coin_creator",
						account: "Pool"
					}] }
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [
				{
					name: "base_amount_out",
					type: "u64"
				},
				{
					name: "max_quote_amount_in",
					type: "u64"
				},
				{
					name: "track_volume",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_exact_quote_in",
			docs: [
				"Given a budget of spendable_quote_in, buy at least min_base_amount_out",
				"Fees will be deducted from spendable_quote_in",
				"",
				"f(quote) = tokens, where tokens >= min_base_amount_out",
				"",
				"Make sure the payer has enough SOL to cover creation of the following accounts (unless already created):",
				"- protocol_fee_recipient_token_account: rent.minimum_balance(TokenAccount::LEN)",
				"- coin_creator_vault_ata: rent.minimum_balance(TokenAccount::LEN)",
				"- user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)",
				"",
				"For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].",
				"If provided and valid, the ATA will be initialized if needed."
			],
			discriminator: [
				198,
				46,
				21,
				82,
				180,
				217,
				232,
				112
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "protocol_fee_recipient" },
				{
					name: "protocol_fee_recipient_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "protocol_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool.coin_creator",
						account: "Pool"
					}] }
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [
				{
					name: "spendable_quote_in",
					type: "u64"
				},
				{
					name: "min_base_amount_out",
					type: "u64"
				},
				{
					name: "track_volume",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "claim_cashback",
			docs: ["Pays out the user's accrued cashback. `user_wsol_token_account` may be any token account", "of `quote_mint` owned by `user`, not only the associated one."],
			discriminator: [
				37,
				58,
				35,
				126,
				190,
				53,
				228,
				197
			],
			accounts: [
				{
					name: "user",
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "user_volume_accumulator_wsol_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user_volume_accumulator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user_wsol_token_account",
					writable: true
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				}
			],
			args: []
		},
		{
			name: "claim_token_incentives",
			discriminator: [
				16,
				4,
				71,
				28,
				204,
				1,
				40,
				27
			],
			accounts: [
				{ name: "user" },
				{
					name: "user_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "global_incentive_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "global_volume_accumulator"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "mint",
					relations: ["global_volume_accumulator"]
				},
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "payer",
					writable: true,
					signer: true
				}
			],
			args: []
		},
		{
			name: "close_user_volume_accumulator",
			discriminator: [
				249,
				69,
				164,
				218,
				150,
				103,
				84,
				138
			],
			accounts: [
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "collect_coin_creator_fee",
			discriminator: [
				160,
				57,
				89,
				42,
				181,
				139,
				43,
				66
			],
			accounts: [
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{ name: "coin_creator" },
				{
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "coin_creator"
					}] }
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_token_account",
					writable: true
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
			name: "create_config",
			discriminator: [
				201,
				207,
				243,
				114,
				75,
				111,
				47,
				189
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					address: "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8"
				},
				{
					name: "global_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
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
			args: [
				{
					name: "lp_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_recipients",
					type: { array: ["pubkey", 8] }
				},
				{
					name: "coin_creator_fee_basis_points",
					type: "u64"
				},
				{
					name: "admin_set_coin_creator_authority",
					type: "pubkey"
				}
			]
		},
		{
			name: "create_pool",
			discriminator: [
				233,
				146,
				209,
				142,
				207,
				104,
				64,
				188
			],
			accounts: [
				{
					name: "pool",
					writable: true,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								111,
								111,
								108
							]
						},
						{
							kind: "arg",
							path: "index"
						},
						{
							kind: "account",
							path: "creator"
						},
						{
							kind: "account",
							path: "base_mint"
						},
						{
							kind: "account",
							path: "quote_mint"
						}
					] }
				},
				{ name: "global_config" },
				{
					name: "creator",
					writable: true,
					signer: true
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{
					name: "lp_mint",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							112,
							111,
							111,
							108,
							95,
							108,
							112,
							95,
							109,
							105,
							110,
							116
						]
					}, {
						kind: "account",
						path: "pool"
					}] }
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "user_pool_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator"
							},
							{
								kind: "account",
								path: "token_2022_program"
							},
							{
								kind: "account",
								path: "lp_mint"
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
					name: "pool_base_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "pool_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
				},
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
					name: "index",
					type: "u16"
				},
				{
					name: "base_amount_in",
					type: "u64"
				},
				{
					name: "quote_amount_in",
					type: "u64"
				},
				{
					name: "coin_creator",
					type: "pubkey"
				},
				{
					name: "is_mayhem_mode",
					type: "bool"
				},
				{
					name: "is_cashback_coin",
					type: { defined: { name: "OptionBool" } }
				},
				{
					name: "creator_fee_bps",
					type: { defined: { name: "OptionU64" } }
				},
				{
					name: "can_edit_creator_fee",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "deposit",
			discriminator: [
				242,
				35,
				198,
				137,
				82,
				225,
				242,
				182
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{ name: "global_config" },
				{
					name: "user",
					signer: true
				},
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "lp_mint",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "user_pool_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
					name: "lp_token_amount_out",
					type: "u64"
				},
				{
					name: "max_base_amount_in",
					type: "u64"
				},
				{
					name: "max_quote_amount_in",
					type: "u64"
				}
			]
		},
		{
			name: "disable",
			discriminator: [
				185,
				173,
				187,
				90,
				216,
				15,
				238,
				233
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
					name: "disable_create_pool",
					type: "bool"
				},
				{
					name: "disable_deposit",
					type: "bool"
				},
				{
					name: "disable_withdraw",
					type: "bool"
				},
				{
					name: "disable_buy",
					type: "bool"
				},
				{
					name: "disable_sell",
					type: "bool"
				}
			]
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
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
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
			name: "init_boost",
			discriminator: [
				140,
				233,
				33,
				94,
				132,
				90,
				194,
				143
			],
			accounts: [
				{
					name: "pool",
					writable: true
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
							95,
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
					name: "creator",
					writable: true,
					signer: true
				},
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "pool_base_token_account",
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "boost_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							98,
							111,
							111,
							115,
							116,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool"
					}] }
				},
				{
					name: "boost_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "boost_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
			name: "init_user_volume_accumulator",
			discriminator: [
				94,
				6,
				202,
				115,
				255,
				96,
				232,
				183
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "user" },
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "migrate_pool_coin_creator",
			docs: ["Migrate Pool Coin Creator to Sharing Config"],
			discriminator: [
				208,
				8,
				159,
				4,
				74,
				175,
				16,
				58
			],
			accounts: [
				{
					name: "pool",
					writable: true,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								111,
								111,
								108
							]
						},
						{
							kind: "account",
							path: "pool.index",
							account: "Pool"
						},
						{
							kind: "account",
							path: "pool.creator",
							account: "Pool"
						},
						{
							kind: "account",
							path: "pool.base_mint",
							account: "Pool"
						},
						{
							kind: "account",
							path: "pool.quote_mint",
							account: "Pool"
						}
					] }
				},
				{
					name: "sharing_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "pool.base_mint",
							account: "Pool"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
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
			name: "sell",
			discriminator: [
				51,
				230,
				133,
				164,
				1,
				127,
				131,
				173
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "protocol_fee_recipient" },
				{
					name: "protocol_fee_recipient_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "protocol_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool.coin_creator",
						account: "Pool"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [{
				name: "base_amount_in",
				type: "u64"
			}, {
				name: "min_quote_amount_out",
				type: "u64"
			}]
		},
		{
			name: "set_boost_authority",
			discriminator: [
				227,
				149,
				76,
				42,
				130,
				39,
				234,
				205
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
				},
				{ name: "boost_authority" },
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
			name: "set_coin_creator",
			docs: ["Sets Pool::coin_creator from Metaplex metadata creator or BondingCurve::creator"],
			discriminator: [
				210,
				149,
				128,
				45,
				188,
				58,
				78,
				175
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "metadata",
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									109,
									101,
									116,
									97,
									100,
									97,
									116,
									97
								]
							},
							{
								kind: "const",
								value: [
									11,
									112,
									101,
									177,
									227,
									209,
									124,
									69,
									56,
									157,
									82,
									127,
									107,
									4,
									195,
									205,
									88,
									184,
									108,
									115,
									26,
									160,
									253,
									181,
									73,
									182,
									209,
									188,
									3,
									248,
									41,
									70
								]
							},
							{
								kind: "account",
								path: "pool.base_mint",
								account: "Pool"
							}
						],
						program: {
							kind: "const",
							value: [
								11,
								112,
								101,
								177,
								227,
								209,
								124,
								69,
								56,
								157,
								82,
								127,
								107,
								4,
								195,
								205,
								88,
								184,
								108,
								115,
								26,
								160,
								253,
								181,
								73,
								182,
								209,
								188,
								3,
								248,
								41,
								70
							]
						}
					}
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
							path: "pool.base_mint",
							account: "Pool"
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
			name: "set_coin_creator_fee_bps",
			discriminator: [
				66,
				89,
				202,
				237,
				8,
				118,
				158,
				169
			],
			accounts: [
				{
					name: "coin_creator",
					signer: true
				},
				{ name: "global_config" },
				{
					name: "pool",
					writable: true
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
				name: "creator_fee_bps",
				type: "u64"
			}]
		},
		{
			name: "set_reserved_fee_recipients",
			discriminator: [
				111,
				172,
				162,
				232,
				114,
				89,
				213,
				142
			],
			accounts: [
				{
					name: "global_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
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
					name: "admin",
					signer: true,
					relations: ["global_config"]
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
				name: "whitelist_pda",
				type: "pubkey"
			}]
		},
		{
			name: "sync_user_volume_accumulator",
			discriminator: [
				86,
				31,
				192,
				87,
				163,
				87,
				79,
				238
			],
			accounts: [
				{ name: "user" },
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "toggle_boost",
			discriminator: [
				117,
				161,
				160,
				74,
				223,
				137,
				118,
				99
			],
			accounts: [{
				name: "admin",
				signer: true,
				relations: ["global_config"]
			}, {
				name: "global_config",
				writable: true
			}],
			args: [{
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "toggle_cashback_enabled",
			discriminator: [
				115,
				103,
				224,
				255,
				189,
				89,
				86,
				195
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "toggle_mayhem_mode",
			discriminator: [
				1,
				9,
				111,
				208,
				100,
				31,
				255,
				163
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "transfer_creator_fees_to_pump",
			docs: [
				"Transfer creator fees to pump creator vault",
				"If coin creator fees are currently below rent.minimum_balance(TokenAccount::LEN)",
				"The transfer will be skipped"
			],
			discriminator: [
				139,
				52,
				134,
				85,
				228,
				229,
				108,
				241
			],
			accounts: [
				{
					name: "wsol_mint",
					docs: ["Pump Canonical Pool are quoted in wSOL"]
				},
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "coin_creator" },
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "coin_creator"
					}] }
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "wsol_mint"
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
					name: "pump_creator_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "coin_creator"
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
			name: "transfer_creator_fees_to_pump_v2",
			discriminator: [
				1,
				33,
				78,
				185,
				33,
				67,
				44,
				92
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "quote_mint" },
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "coin_creator" },
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "coin_creator"
					}] }
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "pump_creator_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "coin_creator"
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
					name: "pump_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pump_creator_vault"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
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
			name: "update_admin",
			discriminator: [
				161,
				176,
				40,
				213,
				60,
				184,
				179,
				228
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
				},
				{ name: "new_admin" },
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
			name: "update_buyback_config",
			discriminator: [
				251,
				224,
				171,
				146,
				160,
				26,
				113,
				233
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "buyback_basis_points",
				type: { option: "u64" }
			}]
		},
		{
			name: "update_creator_fee_config",
			discriminator: [
				61,
				175,
				160,
				249,
				66,
				66,
				136,
				175
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "creator_fee_configurable",
				type: "bool"
			}, {
				name: "max_configurable_creator_fee_bps",
				type: "u64"
			}]
		},
		{
			name: "update_fee_config",
			discriminator: [
				104,
				184,
				103,
				242,
				88,
				151,
				107,
				20
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
					name: "lp_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_recipients",
					type: { array: ["pubkey", 8] }
				},
				{
					name: "coin_creator_fee_basis_points",
					type: "u64"
				},
				{
					name: "admin_set_coin_creator_authority",
					type: "pubkey"
				}
			]
		},
		{
			name: "withdraw",
			discriminator: [
				183,
				18,
				70,
				156,
				148,
				109,
				161,
				34
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{ name: "global_config" },
				{
					name: "user",
					signer: true
				},
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "lp_mint",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "user_pool_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
					name: "lp_token_amount_in",
					type: "u64"
				},
				{
					name: "min_base_amount_out",
					type: "u64"
				},
				{
					name: "min_quote_amount_out",
					type: "u64"
				}
			]
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
			name: "FeeConfig",
			discriminator: [
				143,
				52,
				146,
				187,
				219,
				123,
				76,
				155
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
			name: "GlobalVolumeAccumulator",
			discriminator: [
				202,
				42,
				246,
				43,
				142,
				190,
				30,
				255
			]
		},
		{
			name: "Pool",
			discriminator: [
				241,
				154,
				109,
				4,
				17,
				177,
				109,
				188
			]
		},
		{
			name: "SharingConfig",
			discriminator: [
				216,
				74,
				9,
				0,
				56,
				140,
				93,
				75
			]
		},
		{
			name: "UserVolumeAccumulator",
			discriminator: [
				86,
				255,
				112,
				14,
				102,
				53,
				154,
				250
			]
		}
	],
	events: [
		{
			name: "AdminSetCoinCreatorEvent",
			discriminator: [
				45,
				220,
				93,
				24,
				25,
				97,
				172,
				104
			]
		},
		{
			name: "AdminSetCoinCreatorFeeEditableEvent",
			discriminator: [
				191,
				198,
				127,
				188,
				109,
				174,
				9,
				105
			]
		},
		{
			name: "AdminUpdateTokenIncentivesEvent",
			discriminator: [
				147,
				250,
				108,
				120,
				247,
				29,
				67,
				222
			]
		},
		{
			name: "BoostBuyAndBurnEvent",
			discriminator: [
				63,
				69,
				28,
				22,
				48,
				92,
				194,
				185
			]
		},
		{
			name: "BuyEvent",
			discriminator: [
				103,
				244,
				82,
				31,
				44,
				245,
				119,
				119
			]
		},
		{
			name: "ClaimCashbackEvent",
			discriminator: [
				226,
				214,
				246,
				33,
				7,
				242,
				147,
				229
			]
		},
		{
			name: "ClaimTokenIncentivesEvent",
			discriminator: [
				79,
				172,
				246,
				49,
				205,
				91,
				206,
				232
			]
		},
		{
			name: "CloseUserVolumeAccumulatorEvent",
			discriminator: [
				146,
				159,
				189,
				172,
				146,
				88,
				56,
				244
			]
		},
		{
			name: "CollectCoinCreatorFeeEvent",
			discriminator: [
				232,
				245,
				194,
				238,
				234,
				218,
				58,
				89
			]
		},
		{
			name: "CreateConfigEvent",
			discriminator: [
				107,
				52,
				89,
				129,
				55,
				226,
				81,
				22
			]
		},
		{
			name: "CreatePoolEvent",
			discriminator: [
				177,
				49,
				12,
				210,
				160,
				118,
				167,
				116
			]
		},
		{
			name: "DepositEvent",
			discriminator: [
				120,
				248,
				61,
				83,
				31,
				142,
				107,
				144
			]
		},
		{
			name: "DisableEvent",
			discriminator: [
				107,
				253,
				193,
				76,
				228,
				202,
				27,
				104
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
			name: "InitBoostEvent",
			discriminator: [
				174,
				124,
				74,
				249,
				4,
				81,
				246,
				17
			]
		},
		{
			name: "InitUserVolumeAccumulatorEvent",
			discriminator: [
				134,
				36,
				13,
				72,
				232,
				101,
				130,
				216
			]
		},
		{
			name: "MigratePoolCoinCreatorEvent",
			discriminator: [
				170,
				221,
				82,
				199,
				147,
				165,
				247,
				46
			]
		},
		{
			name: "ReservedFeeRecipientsEvent",
			discriminator: [
				43,
				188,
				250,
				18,
				221,
				75,
				187,
				95
			]
		},
		{
			name: "SellEvent",
			discriminator: [
				62,
				47,
				55,
				10,
				165,
				3,
				220,
				42
			]
		},
		{
			name: "SetBondingCurveCoinCreatorEvent",
			discriminator: [
				242,
				231,
				235,
				102,
				65,
				99,
				189,
				211
			]
		},
		{
			name: "SetBoostAuthorityEvent",
			discriminator: [
				89,
				128,
				240,
				141,
				91,
				202,
				71,
				105
			]
		},
		{
			name: "SetCoinCreatorFeeBpsEvent",
			discriminator: [
				230,
				138,
				241,
				158,
				28,
				232,
				228,
				211
			]
		},
		{
			name: "SetMetaplexCoinCreatorEvent",
			discriminator: [
				150,
				107,
				199,
				123,
				124,
				207,
				102,
				228
			]
		},
		{
			name: "SyncUserVolumeAccumulatorEvent",
			discriminator: [
				197,
				122,
				167,
				124,
				116,
				81,
				91,
				255
			]
		},
		{
			name: "UpdateAdminEvent",
			discriminator: [
				225,
				152,
				171,
				87,
				246,
				63,
				66,
				234
			]
		},
		{
			name: "UpdateCreatorFeeConfigEvent",
			discriminator: [
				152,
				198,
				124,
				124,
				106,
				246,
				127,
				191
			]
		},
		{
			name: "UpdateFeeConfigEvent",
			discriminator: [
				90,
				23,
				65,
				35,
				62,
				244,
				188,
				208
			]
		},
		{
			name: "WithdrawEvent",
			discriminator: [
				22,
				9,
				133,
				26,
				160,
				44,
				71,
				192
			]
		}
	],
	errors: [
		{
			code: 6e3,
			name: "FeeBasisPointsExceedsMaximum"
		},
		{
			code: 6001,
			name: "ZeroBaseAmount"
		},
		{
			code: 6002,
			name: "ZeroQuoteAmount"
		},
		{
			code: 6003,
			name: "TooLittlePoolTokenLiquidity"
		},
		{
			code: 6004,
			name: "ExceededSlippage"
		},
		{
			code: 6005,
			name: "InvalidAdmin"
		},
		{
			code: 6006,
			name: "UnsupportedBaseMint"
		},
		{
			code: 6007,
			name: "UnsupportedQuoteMint"
		},
		{
			code: 6008,
			name: "InvalidBaseMint"
		},
		{
			code: 6009,
			name: "InvalidQuoteMint"
		},
		{
			code: 6010,
			name: "InvalidLpMint"
		},
		{
			code: 6011,
			name: "AllProtocolFeeRecipientsShouldBeNonZero"
		},
		{
			code: 6012,
			name: "UnsortedNotUniqueProtocolFeeRecipients"
		},
		{
			code: 6013,
			name: "InvalidProtocolFeeRecipient"
		},
		{
			code: 6014,
			name: "InvalidPoolBaseTokenAccount"
		},
		{
			code: 6015,
			name: "InvalidPoolQuoteTokenAccount"
		},
		{
			code: 6016,
			name: "BuyMoreBaseAmountThanPoolReserves"
		},
		{
			code: 6017,
			name: "DisabledCreatePool"
		},
		{
			code: 6018,
			name: "DisabledDeposit"
		},
		{
			code: 6019,
			name: "DisabledWithdraw"
		},
		{
			code: 6020,
			name: "DisabledBuy"
		},
		{
			code: 6021,
			name: "DisabledSell"
		},
		{
			code: 6022,
			name: "SameMint"
		},
		{
			code: 6023,
			name: "Overflow"
		},
		{
			code: 6024,
			name: "Truncation"
		},
		{
			code: 6025,
			name: "DivisionByZero"
		},
		{
			code: 6026,
			name: "NewSizeLessThanCurrentSize"
		},
		{
			code: 6027,
			name: "AccountTypeNotSupported"
		},
		{
			code: 6028,
			name: "OnlyCanonicalPumpPoolsCanHaveCoinCreator"
		},
		{
			code: 6029,
			name: "InvalidAdminSetCoinCreatorAuthority"
		},
		{
			code: 6030,
			name: "StartTimeInThePast"
		},
		{
			code: 6031,
			name: "EndTimeInThePast"
		},
		{
			code: 6032,
			name: "EndTimeBeforeStartTime"
		},
		{
			code: 6033,
			name: "TimeRangeTooLarge"
		},
		{
			code: 6034,
			name: "EndTimeBeforeCurrentDay"
		},
		{
			code: 6035,
			name: "SupplyUpdateForFinishedRange"
		},
		{
			code: 6036,
			name: "DayIndexAfterEndIndex"
		},
		{
			code: 6037,
			name: "DayInActiveRange"
		},
		{
			code: 6038,
			name: "InvalidIncentiveMint"
		},
		{
			code: 6039,
			name: "BuyNotEnoughQuoteTokensToCoverFees",
			msg: "buy: Not enough quote tokens to cover for fees."
		},
		{
			code: 6040,
			name: "BuySlippageBelowMinBaseAmountOut",
			msg: "buy: slippage - would buy less tokens than expected min_base_amount_out"
		},
		{
			code: 6041,
			name: "MayhemModeDisabled"
		},
		{
			code: 6042,
			name: "OnlyPumpPoolsMayhemMode"
		},
		{
			code: 6043,
			name: "MayhemModeInDesiredState"
		},
		{
			code: 6044,
			name: "NotEnoughRemainingAccounts"
		},
		{
			code: 6045,
			name: "InvalidSharingConfigBaseMint"
		},
		{
			code: 6046,
			name: "InvalidSharingConfigCoinCreator"
		},
		{
			code: 6047,
			name: "CoinCreatorMigratedToSharingConfig",
			msg: "coin creator has been migrated to sharing config, use pump_fees::reset_fee_sharing_config instead"
		},
		{
			code: 6048,
			name: "CreatorVaultMigratedToSharingConfig",
			msg: "creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead"
		},
		{
			code: 6049,
			name: "CashbackNotEnabled",
			msg: "Cashback is disabled"
		},
		{
			code: 6050,
			name: "OnlyPumpPoolsCashback"
		},
		{
			code: 6051,
			name: "CashbackNotInDesiredState"
		},
		{
			code: 6052,
			name: "TokensInVaultLessThanCashbackEarned"
		},
		{
			code: 6053,
			name: "BuybackFeeRecipientNotAuthorized",
			msg: "Buyback fee recipient not authorized"
		},
		{
			code: 6054,
			name: "AllBuybackFeeRecipientsShouldBeNonZero"
		},
		{
			code: 6055,
			name: "NotUniqueBuybackFeeRecipients"
		},
		{
			code: 6056,
			name: "BuybackBasisPointsOutOfRange",
			msg: "buyback_basis_points must be <= 10_000"
		},
		{
			code: 6057,
			name: "WrongBuybackFeeRecipientsCount",
			msg: "buyback fee recipients require exactly 8 remaining accounts (or none)"
		},
		{
			code: 6058,
			name: "BuybackFeeRecipientMissing"
		},
		{
			code: 6059,
			name: "MissingCashbackAccounts",
			msg: "Cashback trade is missing the required remaining accounts"
		},
		{
			code: 6060,
			name: "InvalidCashbackAccumulator",
			msg: "Cashback user_volume_accumulator account is invalid"
		},
		{
			code: 6061,
			name: "InvalidCashbackAccumulatorAta",
			msg: "Cashback user_volume_accumulator ATA is missing or invalid"
		},
		{
			code: 6062,
			name: "InvalidPoolV2",
			msg: "pool_v2 remaining account is missing or invalid"
		},
		{
			code: 6063,
			name: "InsufficientRealQuoteReserves",
			msg: "BOOST: sell output exceeds the real quote vault. effective = real + virtual is pricing-only; payout is capped at real_vault, so quote min(out, real_vault)"
		},
		{
			code: 6064,
			name: "BoostPoolLiquidityUnsupported",
			msg: "BOOST: deposit/withdraw don't apply to boost pools"
		},
		{
			code: 6065,
			name: "PoolCannotBoost",
			msg: "BOOST: pool cannot be boosted (no virtual reserves)"
		},
		{
			code: 6066,
			name: "BoostDisabled",
			msg: "BOOST: boost is disabled"
		},
		{
			code: 6067,
			name: "SeedLockViolation",
			msg: "BOOST: lp_supply must never drop below the circulating LP mint supply"
		},
		{
			code: 6068,
			name: "CreatorFeeNotConfigurable",
			msg: "Configurable creator fee is disabled"
		},
		{
			code: 6069,
			name: "CreatorFeeBpsOutOfRange",
			msg: "Creator fee basis points must be between 1 and the configured maximum"
		},
		{
			code: 6070,
			name: "CreatorFeeNotEditable",
			msg: "Creator fee is not editable for this pool"
		},
		{
			code: 6071,
			name: "CreatorFeeNotAllowedForCashbackCoin",
			msg: "Cashback coins cannot have a creator fee"
		},
		{
			code: 6072,
			name: "SharingConfigNotActive",
			msg: "Sharing config is not active"
		},
		{
			code: 6073,
			name: "NotAuthorized",
			msg: "Not authorized"
		}
	],
	types: [
		{
			name: "AdminSetCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin_set_coin_creator_authority",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "old_coin_creator",
						type: "pubkey"
					},
					{
						name: "new_coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "AdminSetCoinCreatorFeeEditableEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin_set_coin_creator_authority",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "AdminUpdateTokenIncentivesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "day_number",
						type: "u64"
					},
					{
						name: "token_supply_per_day",
						type: "u64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "seconds_in_a_day",
						type: "i64"
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
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					}
				]
			}
		},
		{
			name: "BoostBuyAndBurnEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "quote_amount_in_requested",
						type: "u64"
					},
					{
						name: "quote_amount_in_used",
						type: "u64"
					},
					{
						name: "base_amount_burned",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "real_quote_reserves_after",
						type: "u64"
					},
					{
						name: "base_reserves_after",
						type: "u64"
					},
					{
						name: "boost_vault_remaining",
						type: "u64"
					}
				]
			}
		},
		{
			name: "BuyEvent",
			docs: ["ix_name: \"buy\" | \"buy_exact_quote_in\""],
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_amount_out",
						type: "u64"
					},
					{
						name: "max_quote_amount_in",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "quote_amount_in",
						type: "u64"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "lp_fee",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee",
						type: "u64"
					},
					{
						name: "quote_amount_in_with_lp_fee",
						type: "u64"
					},
					{
						name: "user_quote_amount_in",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient_token_account",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "coin_creator_fee",
						type: "u64"
					},
					{
						name: "track_volume",
						type: "bool"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					},
					{
						name: "min_base_amount_out",
						type: "u64"
					},
					{
						name: "ix_name",
						type: "string"
					},
					{
						name: "cashback_fee_basis_points",
						type: "u64"
					},
					{
						name: "cashback",
						type: "u64"
					},
					{
						name: "buyback_fee_basis_points",
						type: "u64"
					},
					{
						name: "buyback_fee",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "can_boost",
						type: "bool"
					},
					{
						name: "base_supply",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ClaimCashbackEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_claimed",
						type: "u64"
					},
					{
						name: "total_cashback_earned",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ClaimTokenIncentivesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					}
				]
			}
		},
		{
			name: "CloseUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "CollectCoinCreatorFeeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "coin_creator_fee",
						type: "u64"
					},
					{
						name: "coin_creator_vault_ata",
						type: "pubkey"
					},
					{
						name: "coin_creator_token_account",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "ConfigStatus",
			type: {
				kind: "enum",
				variants: [{ name: "Paused" }, { name: "Active" }]
			}
		},
		{
			name: "CreateConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "admin_set_coin_creator_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "CreatePoolEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "index",
						type: "u16"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "base_mint_decimals",
						type: "u8"
					},
					{
						name: "quote_mint_decimals",
						type: "u8"
					},
					{
						name: "base_amount_in",
						type: "u64"
					},
					{
						name: "quote_amount_in",
						type: "u64"
					},
					{
						name: "pool_base_amount",
						type: "u64"
					},
					{
						name: "pool_quote_amount",
						type: "u64"
					},
					{
						name: "minimum_liquidity",
						type: "u64"
					},
					{
						name: "initial_liquidity",
						type: "u64"
					},
					{
						name: "lp_token_amount_out",
						type: "u64"
					},
					{
						name: "pool_bump",
						type: "u8"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "lp_mint",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					},
					{
						name: "can_edit_creator_fee",
						type: "bool"
					}
				]
			}
		},
		{
			name: "DepositEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "lp_token_amount_out",
						type: "u64"
					},
					{
						name: "max_base_amount_in",
						type: "u64"
					},
					{
						name: "max_quote_amount_in",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "base_amount_in",
						type: "u64"
					},
					{
						name: "quote_amount_in",
						type: "u64"
					},
					{
						name: "lp_mint_supply",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "user_pool_token_account",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "DisableEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "disable_create_pool",
						type: "bool"
					},
					{
						name: "disable_deposit",
						type: "bool"
					},
					{
						name: "disable_withdraw",
						type: "bool"
					},
					{
						name: "disable_buy",
						type: "bool"
					},
					{
						name: "disable_sell",
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
						name: "timestamp",
						type: "i64"
					},
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
					}
				]
			}
		},
		{
			name: "FeeConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "flat_fees",
						type: { defined: { name: "Fees" } }
					},
					{
						name: "fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "stable_fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "exotic_flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "FeeTier",
			type: {
				kind: "struct",
				fields: [{
					name: "market_cap_lamports_threshold",
					type: "u128"
				}, {
					name: "fees",
					type: { defined: { name: "Fees" } }
				}]
			}
		},
		{
			name: "Fees",
			type: {
				kind: "struct",
				fields: [
					{
						name: "lp_fee_bps",
						type: "u64"
					},
					{
						name: "protocol_fee_bps",
						type: "u64"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
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
						name: "admin",
						docs: ["The admin pubkey"],
						type: "pubkey"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "disable_flags",
						docs: [
							"Flags to disable certain functionality",
							"bit 0 - Disable create pool",
							"bit 1 - Disable deposit",
							"bit 2 - Disable withdraw",
							"bit 3 - Disable buy",
							"bit 4 - Disable sell"
						],
						type: "u8"
					},
					{
						name: "protocol_fee_recipients",
						docs: ["Addresses of the protocol fee recipients"],
						type: { array: ["pubkey", 8] }
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "admin_set_coin_creator_authority",
						docs: ["The admin authority for setting coin creators"],
						type: "pubkey"
					},
					{
						name: "whitelist_pda",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "mayhem_mode_enabled",
						type: "bool"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					},
					{
						name: "is_cashback_enabled",
						type: "bool"
					},
					{
						name: "buyback_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "buyback_basis_points",
						type: "u64"
					},
					{
						name: "boost_authority",
						type: "pubkey"
					},
					{
						name: "boost_enabled",
						type: "bool"
					},
					{
						name: "creator_fee_configurable",
						type: "bool"
					},
					{
						name: "max_configurable_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "GlobalVolumeAccumulator",
			type: {
				kind: "struct",
				fields: [
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "seconds_in_a_day",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "total_token_supply",
						type: { array: ["u64", 30] }
					},
					{
						name: "sol_volumes",
						type: { array: ["u64", 30] }
					}
				]
			}
		},
		{
			name: "InitBoostEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "real_quote_reserves_after",
						type: "u64"
					}
				]
			}
		},
		{
			name: "InitUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "payer",
						type: "pubkey"
					},
					{
						name: "user",
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
			name: "MigratePoolCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "old_coin_creator",
						type: "pubkey"
					},
					{
						name: "new_coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "OptionBool",
			type: {
				kind: "struct",
				fields: ["bool"]
			}
		},
		{
			name: "OptionU64",
			type: {
				kind: "struct",
				fields: ["u64"]
			}
		},
		{
			name: "Pool",
			type: {
				kind: "struct",
				fields: [
					{
						name: "pool_bump",
						type: "u8"
					},
					{
						name: "index",
						type: "u16"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "lp_mint",
						type: "pubkey"
					},
					{
						name: "pool_base_token_account",
						type: "pubkey"
					},
					{
						name: "pool_quote_token_account",
						type: "pubkey"
					},
					{
						name: "lp_supply",
						docs: ["True circulating supply without burns and lock-ups"],
						type: "u64"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					},
					{
						name: "virtual_quote_reserves",
						docs: ["For non-boost pools, value is 0, so the behavior is identical to legacy pools."],
						type: "i128"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					},
					{
						name: "can_edit_creator_fee",
						type: "bool"
					}
				]
			}
		},
		{
			name: "ReservedFeeRecipientsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					}
				]
			}
		},
		{
			name: "SellEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_amount_in",
						type: "u64"
					},
					{
						name: "min_quote_amount_out",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "quote_amount_out",
						type: "u64"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "lp_fee",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee",
						type: "u64"
					},
					{
						name: "quote_amount_out_without_lp_fee",
						type: "u64"
					},
					{
						name: "user_quote_amount_out",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient_token_account",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "coin_creator_fee",
						type: "u64"
					},
					{
						name: "cashback_fee_basis_points",
						type: "u64"
					},
					{
						name: "cashback",
						type: "u64"
					},
					{
						name: "buyback_fee_basis_points",
						type: "u64"
					},
					{
						name: "buyback_fee",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "can_boost",
						type: "bool"
					},
					{
						name: "base_supply",
						type: "u64"
					}
				]
			}
		},
		{
			name: "SetBondingCurveCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetBoostAuthorityEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "old_boost_authority",
						type: "pubkey"
					},
					{
						name: "new_boost_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetCoinCreatorFeeBpsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "old_creator_fee_bps",
						type: "u64"
					},
					{
						name: "new_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "SetMetaplexCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "metadata",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "Shareholder",
			type: {
				kind: "struct",
				fields: [{
					name: "address",
					type: "pubkey"
				}, {
					name: "share_bps",
					type: "u16"
				}]
			}
		},
		{
			name: "SharingConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "version",
						type: "u8"
					},
					{
						name: "status",
						type: { defined: { name: "ConfigStatus" } }
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "admin_revoked",
						type: "bool"
					},
					{
						name: "shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					}
				]
			}
		},
		{
			name: "SyncUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "total_claimed_tokens_before",
						type: "u64"
					},
					{
						name: "total_claimed_tokens_after",
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
			name: "UpdateAdminEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "new_admin",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "UpdateCreatorFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "creator_fee_configurable",
						type: "bool"
					},
					{
						name: "max_configurable_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "UpdateFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "admin_set_coin_creator_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "UserVolumeAccumulator",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "needs_claim",
						type: "bool"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					},
					{
						name: "has_total_claimed_tokens",
						type: "bool"
					},
					{
						name: "cashback_earned",
						type: "u64"
					},
					{
						name: "total_cashback_claimed",
						type: "u64"
					}
				]
			}
		},
		{
			name: "WithdrawEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "lp_token_amount_in",
						type: "u64"
					},
					{
						name: "min_base_amount_out",
						type: "u64"
					},
					{
						name: "min_quote_amount_out",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "base_amount_out",
						type: "u64"
					},
					{
						name: "quote_amount_out",
						type: "u64"
					},
					{
						name: "lp_mint_supply",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "user_pool_token_account",
						type: "pubkey"
					}
				]
			}
		}
	]
};
function ceilDiv(a, b) {
	if (b.isZero()) throw new Error("Cannot divide by zero.");
	return a.add(b).subn(1).div(b);
}
function fee(amount, basisPoints) {
	return ceilDiv(amount.mul(basisPoints), new import_bn.default(1e4));
}
function getPumpAmmProgram(connection) {
	return new Program(pump_amm_default$1, new AnchorProvider(connection, null, {}));
}
function isPumpPool(baseMint, poolCreator) {
	return pumpPoolAuthorityPda$1(baseMint).equals(poolCreator);
}
var PUMP_AMM_TOTAL_TOKEN_SUPPLY = new import_bn.default("1000000000000000");
function poolMarketCap({ baseMintSupply, baseReserve, quoteReserve, isMayhemMode = false }) {
	if (baseReserve.isZero()) throw new Error("Division by zero: pool base token reserves cannot be zero");
	const circulatingSupply = isMayhemMode ? PUMP_AMM_TOTAL_TOKEN_SUPPLY : baseMintSupply;
	return quoteReserve.mul(circulatingSupply).div(baseReserve);
}
function depositToken0(token0, slippage, token0Reserve, token1Reserve, totalLpTokens) {
	if (slippage < 0 || slippage > 100) throw new Error("Slippage must be between 0 and 100 (0% to 100%)");
	const token1 = token0.mul(token1Reserve).div(token0Reserve);
	const slippageFactor = new import_bn.default((1 + slippage / 100) * 1e9);
	const maxToken0 = token0.mul(slippageFactor).div(new import_bn.default(1e9));
	const maxToken1 = token1.mul(slippageFactor).div(new import_bn.default(1e9));
	return {
		token1,
		lpToken: token0.mul(totalLpTokens).div(token0Reserve),
		maxToken0,
		maxToken1
	};
}
function ceilDiv2(numerator, denominator) {
	return numerator.add(denominator).sub(new import_bn.default(1)).div(denominator);
}
function depositLpToken(lpToken, slippage, baseReserve, quoteReserve, totalLpTokens) {
	if (totalLpTokens.isZero()) throw new Error("Division by zero: totalLpTokens cannot be zero");
	const baseAmountIn = ceilDiv2(baseReserve.mul(lpToken), totalLpTokens);
	const quoteAmountIn = ceilDiv2(quoteReserve.mul(lpToken), totalLpTokens);
	const slippageFactor = new import_bn.default((1 + slippage / 100) * 1e9);
	const slippageDenominator = new import_bn.default(1e9);
	return {
		maxBase: baseAmountIn.mul(slippageFactor).div(slippageDenominator),
		maxQuote: quoteAmountIn.mul(slippageFactor).div(slippageDenominator)
	};
}
function withdraw(lpAmount, slippage, baseReserve, quoteReserve, totalLpTokens) {
	if (lpAmount.isZero() || totalLpTokens.isZero()) throw new Error("LP amount or total LP tokens cannot be zero.");
	const base = baseReserve.mul(lpAmount).div(totalLpTokens);
	const quote = quoteReserve.mul(lpAmount).div(totalLpTokens);
	const scaleFactor = new import_bn.default(1e9);
	const slippageFactor = new import_bn.default((1 - slippage / 100) * 1e9);
	return {
		base,
		quote,
		minBase: base.mul(slippageFactor).div(scaleFactor),
		minQuote: quote.mul(slippageFactor).div(scaleFactor)
	};
}
var USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
var STABLE_QUOTE_MINTS$1 = Object.freeze([USDC_MINT]);
var SOL_LIKE_QUOTE_MINTS$1 = Object.freeze([
	PublicKey.default,
	NATIVE_MINT,
	NATIVE_MINT_2022
]);
function isSolLikeQuoteMint(quoteMint) {
	return SOL_LIKE_QUOTE_MINTS$1.some((mint) => mint.equals(quoteMint));
}
function isStableQuoteMint(quoteMint) {
	return STABLE_QUOTE_MINTS$1.some((mint) => mint.equals(quoteMint));
}
function isZeroFees(fees) {
	return fees.lpFeeBps.isZero() && fees.protocolFeeBps.isZero() && fees.creatorFeeBps.isZero();
}
function computeFeesBps({ globalConfig, feeConfig, creator, baseMintSupply, baseMint, baseReserve, quoteReserve, quoteMint = NATIVE_MINT, isMayhemMode = false, creatorFeeBps }) {
	if (feeConfig != null) {
		const marketCap = poolMarketCap({
			baseMintSupply,
			baseReserve,
			quoteReserve,
			isMayhemMode
		});
		const fees = feesForQuoteMint({
			feeConfig,
			isPumpPool: isPumpPool(baseMint, creator),
			marketCap,
			quoteMint
		});
		return globalConfig.creatorFeeConfigurable && creatorFeeBps?.gtn(0) ? {
			...fees,
			creatorFeeBps
		} : fees;
	}
	return {
		lpFeeBps: globalConfig.lpFeeBasisPoints,
		protocolFeeBps: globalConfig.protocolFeeBasisPoints,
		creatorFeeBps: globalConfig.coinCreatorFeeBasisPoints
	};
}
function feesForQuoteMint({ feeConfig, isPumpPool: isPumpPool2, marketCap, quoteMint }) {
	if (!isPumpPool2) return feeConfig.flatFees;
	if (isSolLikeQuoteMint(quoteMint)) return calculateFeeTier({
		feeTiers: feeConfig.feeTiers,
		marketCap
	});
	if (isStableQuoteMint(quoteMint)) return calculateFeeTier({
		feeTiers: feeConfig.stableFeeTiers.length > 0 ? feeConfig.stableFeeTiers : feeConfig.feeTiers,
		marketCap
	});
	return isZeroFees(feeConfig.exoticFlatFees) ? feeConfig.flatFees : feeConfig.exoticFlatFees;
}
function calculateFeeTier({ feeTiers, marketCap }) {
	if (feeTiers.length === 0) throw new Error("Fee tiers cannot be empty.");
	const firstTier = feeTiers[0];
	if (marketCap.lt(firstTier.marketCapLamportsThreshold)) return firstTier.fees;
	for (const tier of feeTiers.slice().reverse()) if (marketCap.gte(tier.marketCapLamportsThreshold)) return tier.fees;
	return firstTier.fees;
}
function getFeeRecipient$1(globalConfig, isMayhemMode) {
	if (isMayhemMode) {
		const feeRecipients = [globalConfig.reservedFeeRecipient, ...globalConfig.reservedFeeRecipients];
		return feeRecipients[Math.floor(Math.random() * feeRecipients.length)];
	} else return globalConfig.protocolFeeRecipients[Math.floor(Math.random() * globalConfig.protocolFeeRecipients.length)];
}
function getBuybackFeeRecipient(globalConfig) {
	return globalConfig.buybackFeeRecipients[Math.floor(Math.random() * globalConfig.buybackFeeRecipients.length)];
}
function buyBaseInput({ base, slippage, baseReserve, quoteReserve, virtualQuoteReserves = new import_bn.default(0), globalConfig, baseMintAccount, baseMint, coinCreator, creator, feeConfig, quoteMint, isMayhemMode, creatorFeeBps }) {
	if (baseReserve.isZero() || quoteReserve.isZero()) throw new Error("Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.");
	if (base.gt(baseReserve)) throw new Error("Cannot buy more base tokens than the pool reserves.");
	const effectiveQuoteReserve = quoteReserve.add(virtualQuoteReserves);
	const numerator = effectiveQuoteReserve.mul(base);
	const denominator = baseReserve.sub(base);
	if (denominator.isZero()) throw new Error("Pool would be depleted; denominator is zero.");
	const quoteAmountIn = ceilDiv(numerator, denominator);
	const { lpFeeBps, protocolFeeBps, creatorFeeBps: coinCreatorFeeBps } = computeFeesBps({
		globalConfig,
		feeConfig,
		creator,
		baseMintSupply: new import_bn.default(baseMintAccount.supply.toString()),
		baseMint,
		baseReserve,
		quoteReserve: effectiveQuoteReserve,
		quoteMint,
		isMayhemMode,
		creatorFeeBps
	});
	const lpFee = fee(quoteAmountIn, lpFeeBps);
	const protocolFee = fee(quoteAmountIn, protocolFeeBps);
	const coinCreatorFee = PublicKey.default.equals(coinCreator) ? new import_bn.default(0) : fee(quoteAmountIn, coinCreatorFeeBps);
	const totalQuote = quoteAmountIn.add(lpFee).add(protocolFee).add(coinCreatorFee);
	const precision = new import_bn.default(1e9);
	const slippageFactorFloat = (1 + slippage / 100) * 1e9;
	const slippageFactor = new import_bn.default(Math.floor(slippageFactorFloat));
	return {
		internalQuoteAmount: quoteAmountIn,
		uiQuote: totalQuote,
		maxQuote: totalQuote.mul(slippageFactor).div(precision)
	};
}
function buyQuoteInput({ quote, slippage, baseReserve, quoteReserve, virtualQuoteReserves = new import_bn.default(0), globalConfig, baseMintAccount, baseMint, coinCreator, creator, feeConfig, quoteMint, isMayhemMode, creatorFeeBps }) {
	if (baseReserve.isZero() || quoteReserve.isZero()) throw new Error("Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.");
	const effectiveQuoteReserve = quoteReserve.add(virtualQuoteReserves);
	const { lpFeeBps, protocolFeeBps, creatorFeeBps: coinCreatorFeeBps } = computeFeesBps({
		globalConfig,
		feeConfig,
		creator,
		baseMintSupply: new import_bn.default(baseMintAccount.supply.toString()),
		baseMint,
		baseReserve,
		quoteReserve: effectiveQuoteReserve,
		quoteMint,
		isMayhemMode,
		creatorFeeBps
	});
	const totalFeeBps = lpFeeBps.add(protocolFeeBps).add(PublicKey.default.equals(coinCreator) ? new import_bn.default(0) : coinCreatorFeeBps);
	const denominator = new import_bn.default(1e4).add(totalFeeBps);
	let effectiveQuote = quote.mul(new import_bn.default(1e4)).div(denominator);
	const lpFee = fee(effectiveQuote, lpFeeBps);
	const protocolFee = fee(effectiveQuote, protocolFeeBps);
	const coinCreatorFee = PublicKey.default.equals(coinCreator) ? new import_bn.default(0) : fee(effectiveQuote, coinCreatorFeeBps);
	const totalWithFees = effectiveQuote.add(lpFee).add(protocolFee).add(coinCreatorFee);
	if (totalWithFees.gt(quote)) effectiveQuote = effectiveQuote.sub(totalWithFees.sub(quote));
	const inputAmount = effectiveQuote.subn(1);
	const numerator = baseReserve.mul(inputAmount);
	const denominatorEffective = effectiveQuoteReserve.add(inputAmount);
	if (denominatorEffective.isZero()) throw new Error("Pool would be depleted; denominator is zero.");
	const baseAmountOut = numerator.div(denominatorEffective);
	const precision = new import_bn.default(1e9);
	const slippageFactorFloat = (1 + slippage / 100) * 1e9;
	const slippageFactor = new import_bn.default(Math.floor(slippageFactorFloat));
	const maxQuote = quote.mul(slippageFactor).div(precision);
	return {
		base: baseAmountOut,
		internalQuoteWithoutFees: effectiveQuote,
		maxQuote
	};
}
function sellBaseInput({ base, slippage, baseReserve, quoteReserve, virtualQuoteReserves = new import_bn.default(0), globalConfig, baseMintAccount, baseMint, coinCreator, creator, feeConfig, quoteMint, isMayhemMode, creatorFeeBps }) {
	if (baseReserve.isZero() || quoteReserve.isZero()) throw new Error("Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.");
	const effectiveQuoteReserve = quoteReserve.add(virtualQuoteReserves);
	const quoteAmountOut = effectiveQuoteReserve.mul(base).div(baseReserve.add(base));
	const { lpFeeBps, protocolFeeBps, creatorFeeBps: coinCreatorFeeBps } = computeFeesBps({
		globalConfig,
		feeConfig,
		creator,
		baseMintSupply: new import_bn.default(baseMintAccount.supply.toString()),
		baseMint,
		baseReserve,
		quoteReserve: effectiveQuoteReserve,
		quoteMint,
		isMayhemMode,
		creatorFeeBps
	});
	const lpFee = fee(quoteAmountOut, lpFeeBps);
	const protocolFee = fee(quoteAmountOut, protocolFeeBps);
	const coinCreatorFee = PublicKey.default.equals(coinCreator) ? new import_bn.default(0) : fee(quoteAmountOut, coinCreatorFeeBps);
	if (quoteReserve.lt(quoteAmountOut.sub(lpFee))) throw new Error("Insufficient real quote reserves to cover the sell output.");
	const finalQuote = quoteAmountOut.sub(lpFee).sub(protocolFee).sub(coinCreatorFee);
	if (finalQuote.isNeg()) throw new Error("Fees exceed total output; final quote is negative.");
	const precision = new import_bn.default(1e9);
	const slippageFactorFloat = (1 - slippage / 100) * 1e9;
	const slippageFactor = new import_bn.default(Math.floor(slippageFactorFloat));
	return {
		uiQuote: finalQuote,
		minQuote: finalQuote.mul(slippageFactor).div(precision),
		internalQuoteAmountOut: quoteAmountOut
	};
}
var MAX_FEE_BASIS_POINTS = new import_bn.default(1e4);
function calculateQuoteAmountOut(userQuoteAmountOut, lpFeeBasisPoints, protocolFeeBasisPoints, coinCreatorFeeBasisPoints) {
	const totalFeeBasisPoints = lpFeeBasisPoints.add(protocolFeeBasisPoints).add(coinCreatorFeeBasisPoints);
	const denominator = MAX_FEE_BASIS_POINTS.sub(totalFeeBasisPoints);
	return ceilDiv(userQuoteAmountOut.mul(MAX_FEE_BASIS_POINTS), denominator);
}
function sellQuoteInput({ quote, slippage, baseReserve, quoteReserve, virtualQuoteReserves = new import_bn.default(0), globalConfig, baseMintAccount, baseMint, coinCreator, creator, feeConfig, quoteMint, isMayhemMode, creatorFeeBps }) {
	if (baseReserve.isZero() || quoteReserve.isZero()) throw new Error("Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.");
	if (quote.gt(quoteReserve)) throw new Error("Cannot receive more quote tokens than the pool quote reserves.");
	const effectiveQuoteReserve = quoteReserve.add(virtualQuoteReserves);
	const { lpFeeBps, protocolFeeBps, creatorFeeBps: coinCreatorFeeBps } = computeFeesBps({
		globalConfig,
		feeConfig,
		creator,
		baseMintSupply: new import_bn.default(baseMintAccount.supply.toString()),
		baseMint,
		baseReserve,
		quoteReserve: effectiveQuoteReserve,
		quoteMint,
		isMayhemMode,
		creatorFeeBps
	});
	const rawQuote = calculateQuoteAmountOut(quote, lpFeeBps, protocolFeeBps, PublicKey.default.equals(coinCreator) ? new import_bn.default(0) : coinCreatorFeeBps);
	if (rawQuote.gte(effectiveQuoteReserve)) throw new Error("Invalid input: Desired quote amount exceeds available reserve.");
	const baseAmountIn = ceilDiv(baseReserve.mul(rawQuote), effectiveQuoteReserve.sub(rawQuote));
	const precision = new import_bn.default(1e9);
	const slippageFactorFloat = (1 - slippage / 100) * 1e9;
	const slippageFactor = new import_bn.default(Math.floor(slippageFactorFloat));
	return {
		internalRawQuote: rawQuote,
		base: baseAmountIn,
		minQuote: quote.mul(slippageFactor).div(precision)
	};
}
var FEE_CONFIG_SIZE_PRE_STABLE = 2512;
var FEE_CONFIG_SIZE_POST_EXOTIC = 4097;
var FEE_CONFIG_FEE_TIERS_OFFSET$1 = 65;
var FEES_SIZE = 24;
var FEE_TIER_SIZE = 16 + FEES_SIZE;
function padTrailing(data, size) {
	return data.length >= size ? data : Buffer.concat([data, Buffer.alloc(size - data.length)]);
}
function feeTierVecEnd$1(data, offset) {
	if (offset + 4 > data.length) throw new Error(`FeeConfig fee tier vector length at offset ${offset} runs past the account data (${data.length} bytes)`);
	const end = offset + 4 + data.readUInt32LE(offset) * FEE_TIER_SIZE;
	if (end > data.length) throw new Error(`FeeConfig fee tier vector at offset ${offset} runs past the account data (${data.length} bytes)`);
	return end;
}
function versionedFeeConfigData(data) {
	if (data.length < 2512) throw new Error(`FeeConfig account is ${data.length} bytes; expected at least ${FEE_CONFIG_SIZE_PRE_STABLE}`);
	let end = feeTierVecEnd$1(data, FEE_CONFIG_FEE_TIERS_OFFSET$1);
	if (data.length >= 4073) end = feeTierVecEnd$1(data, end);
	if (data.length >= 4097) {
		end += FEES_SIZE;
		if (end > data.length) throw new Error(`FeeConfig exotic flat fees run past the account data (${data.length} bytes)`);
	}
	return padTrailing(data.subarray(0, end), FEE_CONFIG_SIZE_POST_EXOTIC);
}
var OFFLINE_PUMP_AMM_PROGRAM = getPumpAmmProgram(null);
var PumpAmmSdk = class {
	constructor() {
		this.offlineProgram = OFFLINE_PUMP_AMM_PROGRAM;
	}
	decodeGlobalConfig(globalConfigAccountInfo) {
		return this.offlineProgram.coder.accounts.decode("globalConfig", padTrailing(globalConfigAccountInfo.data, this.offlineProgram.account.globalConfig.size));
	}
	decodeFeeConfig(feeConfigAccountInfo) {
		return this.offlineProgram.coder.accounts.decode("feeConfig", versionedFeeConfigData(feeConfigAccountInfo.data));
	}
	decodePool(poolAccountInfo) {
		return this.offlineProgram.coder.accounts.decode("pool", padTrailing(poolAccountInfo.data, this.offlineProgram.account.pool.size));
	}
	decodePoolNullable(poolAccountInfo) {
		try {
			return this.decodePool(poolAccountInfo);
		} catch (e) {
			console.warn("Failed to decode pool account", e);
			return null;
		}
	}
	decodeGlobalVolumeAccumulator(globalVolumeAccumulatorAccountInfo) {
		return this.offlineProgram.coder.accounts.decode("globalVolumeAccumulator", globalVolumeAccumulatorAccountInfo.data);
	}
	decodeUserVolumeAccumulator(userVolumeAccumulatorAccountInfo) {
		return this.offlineProgram.coder.accounts.decode("userVolumeAccumulator", userVolumeAccumulatorAccountInfo.data);
	}
	decodeUserVolumeAccumulatorNullable(userVolumeAccumulatorAccountInfo) {
		try {
			return this.decodeUserVolumeAccumulator(userVolumeAccumulatorAccountInfo);
		} catch (e) {
			console.warn("Failed to decode user volume accumulator", e);
			return null;
		}
	}
	/**
	* Builds `create_pool` (plus the pool ATA creates and wSOL wrapping it needs) for a
	* permissionless pool: `coin_creator` is the default key and `creator` is a wallet signer (a
	* canonical pump pool's creator is pump's pool-authority PDA, which signs only through pump's
	* `migrate` / `migrate_v2` CPI). `creatorFeeBps` and `canEditCreatorFee` are the instruction's
	* two trailing arguments, always encoded (0 / false when unset), so `create_pool` data is 9
	* bytes longer than before they existed; the deployed program ignores the trailing bytes, the
	* upgraded one reads them. The program stores the values for canonical pools only and rejects a
	* nonzero / true value on a permissionless pool with `OnlyCanonicalPumpPoolsCanHaveCoinCreator`,
	* so through this builder any non-default value fails on-chain: the options exist to keep the
	* encoding aligned with the IDL. Canonical pools receive the bonding curve's values from
	* `migrate_v2`.
	*/
	async createPoolInstructions(createPoolSolanaState, baseIn, quoteIn, { creatorFeeBps = new import_bn.default(0), canEditCreatorFee = false } = {}) {
		const { index, creator, baseMint, quoteMint, poolKey, baseTokenProgram, quoteTokenProgram, userBaseTokenAccount, userQuoteTokenAccount, poolBaseTokenAccount, poolQuoteTokenAccount, userBaseAccountInfo, userQuoteAccountInfo, poolBaseAccountInfo, poolQuoteAccountInfo } = createPoolSolanaState;
		return await this.withWsolAccounts(creator, baseMint, userBaseTokenAccount, this.accountExists(userBaseAccountInfo, baseTokenProgram), baseIn, quoteMint, userQuoteTokenAccount, this.accountExists(userQuoteAccountInfo, quoteTokenProgram), quoteIn, async () => {
			const instructions = [];
			if (!this.accountExists(poolBaseAccountInfo, baseTokenProgram)) instructions.push(createAssociatedTokenAccountIdempotentInstruction(creator, poolBaseTokenAccount, poolKey, baseMint, baseTokenProgram));
			if (!this.accountExists(poolQuoteAccountInfo, quoteTokenProgram)) instructions.push(createAssociatedTokenAccountIdempotentInstruction(creator, poolQuoteTokenAccount, poolKey, quoteMint, quoteTokenProgram));
			instructions.push(await this.offlineProgram.methods.createPool(index, baseIn, quoteIn, SystemProgram.programId, false, { 0: false }, { 0: creatorFeeBps }, { 0: canEditCreatorFee }).accountsPartial({
				globalConfig: GLOBAL_CONFIG_PDA,
				baseMint,
				quoteMint,
				creator,
				userBaseTokenAccount,
				userQuoteTokenAccount,
				baseTokenProgram,
				quoteTokenProgram
			}).instruction());
			return instructions;
		});
	}
	async depositInstructionsInternal(liquiditySolanaState, lpToken, maxBase, maxQuote) {
		const { pool, user, userPoolAccountInfo, userBaseTokenAccount, userQuoteTokenAccount, userPoolTokenAccount, userBaseAccountInfo, userQuoteAccountInfo, baseTokenProgram, quoteTokenProgram } = liquiditySolanaState;
		const { baseMint, quoteMint, lpMint } = pool;
		const liquidityAccounts = this.liquidityAccounts(liquiditySolanaState);
		return await this.withFixPoolInstructions(liquiditySolanaState, async () => {
			return await this.withWsolAccounts(user, baseMint, userBaseTokenAccount, this.accountExists(userBaseAccountInfo, baseTokenProgram), maxBase, quoteMint, userQuoteTokenAccount, this.accountExists(userQuoteAccountInfo, quoteTokenProgram), maxQuote, async () => {
				const instructions = [];
				if (!this.accountExists(userPoolAccountInfo, TOKEN_2022_PROGRAM_ID)) instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, userPoolTokenAccount, user, lpMint, TOKEN_2022_PROGRAM_ID));
				instructions.push(await this.offlineProgram.methods.deposit(lpToken, maxBase, maxQuote).accounts(liquidityAccounts).instruction());
				return instructions;
			});
		});
	}
	async withWsolAccounts(user, baseMint, userBaseAta, userBaseAtaExists, baseAmount, quoteMint, userQuoteAta, userQuoteAtaExists, quoteAmount, block) {
		return await this.withWsolAccount(user, user, baseMint, userBaseAta, userBaseAtaExists, baseAmount, async () => this.withWsolAccount(user, user, quoteMint, userQuoteAta, userQuoteAtaExists, quoteAmount, block));
	}
	/**
	* Creates `ata` (the associated token account of `owner` for `mint` under `tokenProgram`) when
	* it does not exist yet; any mint and either token program.
	*/
	ensureAtaInstructions(payer, owner, mint, ata, ataExists, tokenProgram) {
		return ataExists ? [] : [createAssociatedTokenAccountIdempotentInstruction(payer, ata, owner, mint, tokenProgram)];
	}
	/**
	* Runs `block` with the wSOL handling a legacy-WSOL leg needs: the user's wSOL ATA is created
	* when missing, funded with `amount` lamports and closed again afterwards to unwrap. For any
	* other mint `block` runs alone; that ATA holds the user's own tokens and is left as is.
	*/
	async withWsolAccount(payer, user, mint, ata, ataExists, amount, block) {
		const instructions = [];
		if (mint.equals(NATIVE_MINT)) {
			instructions.push(...this.ensureAtaInstructions(payer, user, NATIVE_MINT, ata, ataExists, TOKEN_PROGRAM_ID));
			if (amount.gtn(0)) instructions.push(SystemProgram.transfer({
				fromPubkey: user,
				toPubkey: ata,
				lamports: BigInt(amount.toString())
			}), createSyncNativeInstruction(ata));
		}
		const blockInstructions = await block();
		instructions.push(...blockInstructions);
		if (mint.equals(NATIVE_MINT)) instructions.push(createCloseAccountInstruction(ata, user, user, void 0, TOKEN_PROGRAM_ID));
		return instructions;
	}
	accountExists(accountInfo, owner) {
		return accountInfo !== null && accountInfo.owner.equals(owner);
	}
	depositBaseInput(liquiditySolanaState, base, slippage) {
		const { pool, poolBaseTokenAccount, poolQuoteTokenAccount } = liquiditySolanaState;
		const { token1, lpToken, maxToken0, maxToken1 } = depositToken0(base, slippage, new import_bn.default(poolBaseTokenAccount.amount.toString()), new import_bn.default(poolQuoteTokenAccount.amount.toString()), pool.lpSupply);
		return {
			quote: token1,
			lpToken,
			maxBase: maxToken0,
			maxQuote: maxToken1
		};
	}
	depositQuoteInput(liquiditySolanaState, quote, slippage) {
		const { pool, poolBaseTokenAccount, poolQuoteTokenAccount } = liquiditySolanaState;
		const { token1, lpToken, maxToken0, maxToken1 } = depositToken0(quote, slippage, new import_bn.default(poolQuoteTokenAccount.amount.toString()), new import_bn.default(poolBaseTokenAccount.amount.toString()), pool.lpSupply);
		return {
			base: token1,
			lpToken,
			maxBase: maxToken1,
			maxQuote: maxToken0
		};
	}
	async withdrawInstructionsInternal(liquiditySolanaState, lpTokenAmountIn, minBaseAmountOut, minQuoteAmountOut) {
		const { pool, baseTokenProgram, quoteTokenProgram, user, userBaseAccountInfo, userQuoteAccountInfo, userBaseTokenAccount, userQuoteTokenAccount } = liquiditySolanaState;
		const { baseMint, quoteMint } = pool;
		const liquidityAccounts = this.liquidityAccounts(liquiditySolanaState);
		return await this.withFixPoolInstructions(liquiditySolanaState, async () => {
			const instructions = [];
			let baseWsolAtaCreated = false;
			if (!this.accountExists(userBaseAccountInfo, baseTokenProgram)) {
				instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, userBaseTokenAccount, user, baseMint, baseTokenProgram));
				if (baseMint.equals(NATIVE_MINT)) baseWsolAtaCreated = true;
			}
			let quoteWsolAtaCreated = false;
			if (!this.accountExists(userQuoteAccountInfo, quoteTokenProgram)) {
				instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, userQuoteTokenAccount, user, quoteMint, quoteTokenProgram));
				if (quoteMint.equals(NATIVE_MINT)) quoteWsolAtaCreated = true;
			}
			instructions.push(await this.offlineProgram.methods.withdraw(lpTokenAmountIn, minBaseAmountOut, minQuoteAmountOut).accounts(liquidityAccounts).instruction());
			if (baseWsolAtaCreated) instructions.push(createCloseAccountInstruction(userBaseTokenAccount, user, user, void 0, TOKEN_PROGRAM_ID));
			if (quoteWsolAtaCreated) instructions.push(createCloseAccountInstruction(userQuoteTokenAccount, user, user, void 0, TOKEN_PROGRAM_ID));
			return instructions;
		});
	}
	withdrawInputs(liquiditySolanaState, lpAmount, slippage) {
		const { pool, poolBaseTokenAccount, poolQuoteTokenAccount } = liquiditySolanaState;
		return withdraw(lpAmount, slippage, new import_bn.default(poolBaseTokenAccount.amount.toString()), new import_bn.default(poolQuoteTokenAccount.amount.toString()), pool.lpSupply);
	}
	liquidityAccounts(liquiditySolanaState) {
		const { poolKey, pool, user, userBaseTokenAccount, userQuoteTokenAccount, userPoolTokenAccount } = liquiditySolanaState;
		const { baseMint, quoteMint, lpMint, poolBaseTokenAccount, poolQuoteTokenAccount } = pool;
		return {
			pool: poolKey,
			globalConfig: GLOBAL_CONFIG_PDA,
			user,
			baseMint,
			quoteMint,
			lpMint,
			userBaseTokenAccount,
			userQuoteTokenAccount,
			userPoolTokenAccount,
			poolBaseTokenAccount,
			poolQuoteTokenAccount,
			tokenProgram: TOKEN_PROGRAM_ID,
			token2022Program: TOKEN_2022_PROGRAM_ID,
			eventAuthority: PUMP_AMM_EVENT_AUTHORITY_PDA$1,
			program: PUMP_AMM_PROGRAM_ID$1
		};
	}
	async buyInstructions(swapSolanaState, baseOut, maxQuoteIn) {
		return await this.withFixPoolInstructions(swapSolanaState, async () => {
			return await this.buyInstructionsNoPool(swapSolanaState, baseOut, maxQuoteIn);
		});
	}
	async buyInstructionsNoPool(swapSolanaState, baseOut, maxQuoteIn) {
		const { userBaseAccountInfo, userQuoteAccountInfo, pool } = swapSolanaState;
		const swapAccounts = this.swapAccounts(swapSolanaState);
		const { user, baseMint, quoteMint, userBaseTokenAccount, userQuoteTokenAccount, baseTokenProgram, quoteTokenProgram, buybackFeeRecipient, buybackFeeRecipientTokenAccount } = swapAccounts;
		const poolV2PdaKey = poolV2Pda(pool.baseMint);
		return this.withWsolAccount(user, user, quoteMint, userQuoteTokenAccount, this.accountExists(userQuoteAccountInfo, quoteTokenProgram), maxQuoteIn, async () => {
			const instructions = [];
			if (!this.accountExists(userBaseAccountInfo, baseTokenProgram)) instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, userBaseTokenAccount, user, baseMint, baseTokenProgram));
			const remainingAccounts = [];
			if (pool.isCashbackCoin) remainingAccounts.push({
				pubkey: getAssociatedTokenAddressSync(quoteMint, userVolumeAccumulatorPda$1(user), true, quoteTokenProgram),
				isWritable: true,
				isSigner: false
			});
			if (!pool.coinCreator.equals(PublicKey.default)) remainingAccounts.push({
				pubkey: poolV2PdaKey,
				isWritable: false,
				isSigner: false
			});
			remainingAccounts.push({
				pubkey: buybackFeeRecipient,
				isWritable: false,
				isSigner: false
			}, {
				pubkey: buybackFeeRecipientTokenAccount,
				isWritable: true,
				isSigner: false
			});
			const instruction = await this.offlineProgram.methods.buy(baseOut, maxQuoteIn, { 0: true }).accounts(swapAccounts).remainingAccounts([...remainingAccounts]).instruction();
			instructions.push(instruction);
			if (baseMint.equals(NATIVE_MINT)) instructions.push(createCloseAccountInstruction(userBaseTokenAccount, user, user, void 0, TOKEN_PROGRAM_ID));
			return instructions;
		});
	}
	async buyBaseInput(swapSolanaState, base, slippage) {
		const { baseMint, baseMintAccount, feeConfig, globalConfig, pool, poolBaseAmount, poolQuoteAmount } = swapSolanaState;
		const { coinCreator, creator } = pool;
		const { maxQuote } = buyBaseInput({
			base,
			slippage,
			baseReserve: poolBaseAmount,
			quoteReserve: poolQuoteAmount,
			virtualQuoteReserves: pool.virtualQuoteReserves,
			baseMintAccount,
			baseMint,
			coinCreator,
			creator,
			feeConfig,
			globalConfig,
			quoteMint: pool.quoteMint,
			isMayhemMode: pool.isMayhemMode,
			creatorFeeBps: pool.creatorFeeBps
		});
		return this.buyInstructions(swapSolanaState, base, maxQuote);
	}
	async buyQuoteInput(swapSolanaState, quote, slippage) {
		const { baseMint, baseMintAccount, feeConfig, globalConfig, pool, poolBaseAmount, poolQuoteAmount } = swapSolanaState;
		const { coinCreator, creator } = pool;
		const { base, maxQuote } = buyQuoteInput({
			quote,
			slippage,
			baseReserve: poolBaseAmount,
			quoteReserve: poolQuoteAmount,
			virtualQuoteReserves: pool.virtualQuoteReserves,
			baseMintAccount,
			baseMint,
			coinCreator,
			creator,
			feeConfig,
			globalConfig,
			quoteMint: pool.quoteMint,
			isMayhemMode: pool.isMayhemMode,
			creatorFeeBps: pool.creatorFeeBps
		});
		return this.buyInstructions(swapSolanaState, base, maxQuote);
	}
	async sellInstructions(swapSolanaState, baseAmountIn, minQuoteAmountOut) {
		return await this.withFixPoolInstructions(swapSolanaState, async () => {
			return await this.sellInstructionsNoPool(swapSolanaState, baseAmountIn, minQuoteAmountOut);
		});
	}
	async withFixPoolInstructions(commonSolanaState, block) {
		const { poolAccountInfo, poolKey, user } = commonSolanaState;
		const instructions = [];
		if (poolAccountInfo === null || poolAccountInfo.data.length < 300) instructions.push(await this.offlineProgram.methods.extendAccount().accountsPartial({
			account: poolKey,
			user
		}).instruction());
		return [...instructions, ...await block()];
	}
	async sellInstructionsNoPool(swapSolanaState, baseAmountIn, minQuoteAmountOut) {
		const { userBaseAccountInfo, userQuoteAccountInfo, pool } = swapSolanaState;
		const swapAccounts = this.swapAccounts(swapSolanaState);
		const poolV2PdaKey = poolV2Pda(pool.baseMint);
		const { user, baseMint, quoteMint, userBaseTokenAccount, userQuoteTokenAccount, baseTokenProgram, quoteTokenProgram, buybackFeeRecipient, buybackFeeRecipientTokenAccount } = swapAccounts;
		return this.withWsolAccount(user, user, baseMint, userBaseTokenAccount, this.accountExists(userBaseAccountInfo, baseTokenProgram), baseAmountIn, async () => {
			const instructions = [];
			if (!this.accountExists(userQuoteAccountInfo, quoteTokenProgram)) instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, userQuoteTokenAccount, user, quoteMint, quoteTokenProgram));
			const remainingAccounts = [];
			if (pool.isCashbackCoin) remainingAccounts.push({
				pubkey: getAssociatedTokenAddressSync(quoteMint, userVolumeAccumulatorPda$1(user), true, quoteTokenProgram),
				isWritable: true,
				isSigner: false
			}, {
				pubkey: userVolumeAccumulatorPda$1(user),
				isWritable: true,
				isSigner: false
			});
			if (!pool.coinCreator.equals(PublicKey.default)) remainingAccounts.push({
				pubkey: poolV2PdaKey,
				isWritable: false,
				isSigner: false
			});
			remainingAccounts.push({
				pubkey: buybackFeeRecipient,
				isWritable: false,
				isSigner: false
			}, {
				pubkey: buybackFeeRecipientTokenAccount,
				isWritable: true,
				isSigner: false
			});
			instructions.push(await this.offlineProgram.methods.sell(baseAmountIn, minQuoteAmountOut).accounts(swapAccounts).remainingAccounts([...remainingAccounts]).instruction());
			if (quoteMint.equals(NATIVE_MINT)) instructions.push(createCloseAccountInstruction(userQuoteTokenAccount, user, user, void 0, TOKEN_PROGRAM_ID));
			return instructions;
		});
	}
	async sellBaseInput(swapSolanaState, base, slippage) {
		const { baseMint, baseMintAccount, feeConfig, globalConfig, pool, poolBaseAmount, poolQuoteAmount } = swapSolanaState;
		const { coinCreator, creator } = pool;
		const { minQuote } = sellBaseInput({
			base,
			slippage,
			baseReserve: poolBaseAmount,
			quoteReserve: poolQuoteAmount,
			virtualQuoteReserves: pool.virtualQuoteReserves,
			baseMintAccount,
			baseMint,
			coinCreator,
			creator,
			feeConfig,
			globalConfig,
			quoteMint: pool.quoteMint,
			isMayhemMode: pool.isMayhemMode,
			creatorFeeBps: pool.creatorFeeBps
		});
		return this.sellInstructions(swapSolanaState, base, minQuote);
	}
	async sellQuoteInput(swapSolanaState, quote, slippage) {
		const { baseMint, baseMintAccount, feeConfig, globalConfig, pool, poolBaseAmount, poolQuoteAmount } = swapSolanaState;
		const { coinCreator, creator } = pool;
		const { base, minQuote } = sellQuoteInput({
			quote,
			slippage,
			baseReserve: poolBaseAmount,
			quoteReserve: poolQuoteAmount,
			virtualQuoteReserves: pool.virtualQuoteReserves,
			baseMintAccount,
			baseMint,
			coinCreator,
			creator,
			feeConfig,
			globalConfig,
			quoteMint: pool.quoteMint,
			isMayhemMode: pool.isMayhemMode,
			creatorFeeBps: pool.creatorFeeBps
		});
		return this.sellInstructions(swapSolanaState, base, minQuote);
	}
	async extendAccount(account, user) {
		return this.offlineProgram.methods.extendAccount().accountsPartial({
			account,
			user
		}).instruction();
	}
	async boostBuyAndBurnInstruction(poolKey, pool, authority, quoteAmountIn, minBaseAmountBurned, baseTokenProgram, quoteTokenProgram) {
		const boostVaultAuthority = boostVaultAuthorityPda$1(poolKey);
		return this.offlineProgram.methods.boostBuyAndBurn(quoteAmountIn, minBaseAmountBurned).accountsPartial({
			pool: poolKey,
			authority,
			globalConfig: GLOBAL_CONFIG_PDA,
			baseMint: pool.baseMint,
			quoteMint: pool.quoteMint,
			poolBaseTokenAccount: pool.poolBaseTokenAccount,
			poolQuoteTokenAccount: pool.poolQuoteTokenAccount,
			boostVaultAuthority,
			boostVault: boostVaultAta(boostVaultAuthority, pool.quoteMint, quoteTokenProgram),
			baseTokenProgram,
			quoteTokenProgram
		}).instruction();
	}
	/**
	* Moves the creator's accumulated AMM fees, quoted in the state's `quoteMint`, from the creator
	* vault ATA to `coinCreatorTokenAccount`. The program transfers between two existing token
	* accounts and creates neither, so the vault ATA and, when it is the destination, the creator's
	* ATA are created here (rent paid by `payer`) when missing, under the quote mint's token
	* program. The program accepts any token account the creator owns as the destination, but
	* only an ATA can be created idempotently, so a custom `coinCreatorTokenAccount` must already
	* exist (an error is thrown otherwise). A wSOL payout is unwrapped by closing the creator's
	* ATA, but only when the creator pays for the transaction themselves.
	*/
	async collectCoinCreatorFee(collectCoinCreatorFeeSolanaState, payer = void 0) {
		const { coinCreator, quoteMint, quoteTokenProgram, coinCreatorVaultAuthority, coinCreatorVaultAta, coinCreatorTokenAccount, coinCreatorVaultAtaAccountInfo, coinCreatorTokenAccountInfo } = collectCoinCreatorFeeSolanaState;
		const actualPayer = payer ?? coinCreator;
		const shouldCloseCoinCreatorATA = quoteMint.equals(NATIVE_MINT) && coinCreator.equals(actualPayer);
		const coinCreatorTokenAccountExists = this.accountExists(coinCreatorTokenAccountInfo, quoteTokenProgram);
		const coinCreatorTokenAccountIsAta = coinCreatorTokenAccount.equals(getAssociatedTokenAddressSync(quoteMint, coinCreator, true, quoteTokenProgram));
		if (!coinCreatorTokenAccountExists && !coinCreatorTokenAccountIsAta) throw new Error(`coinCreatorTokenAccount=${coinCreatorTokenAccount.toString()} does not exist; only the creator's ATA is created automatically`);
		const instructions = [
			...this.ensureAtaInstructions(actualPayer, coinCreatorVaultAuthority, quoteMint, coinCreatorVaultAta, this.accountExists(coinCreatorVaultAtaAccountInfo, quoteTokenProgram), quoteTokenProgram),
			...this.ensureAtaInstructions(actualPayer, coinCreator, quoteMint, coinCreatorTokenAccount, coinCreatorTokenAccountExists, quoteTokenProgram),
			await this.offlineProgram.methods.collectCoinCreatorFee().accountsPartial({
				coinCreator,
				coinCreatorTokenAccount,
				quoteMint,
				quoteTokenProgram
			}).instruction()
		];
		if (shouldCloseCoinCreatorATA) instructions.push(createCloseAccountInstruction(coinCreatorTokenAccount, coinCreator, coinCreator, void 0, TOKEN_PROGRAM_ID));
		return instructions;
	}
	/**
	* Moves a coin creator's accumulated AMM fees, quoted in `quoteMint`, into their pump creator
	* vault (the `creator-vault` PDA of the pump program), for coins whose creator fees are paid
	* out through that vault. The program unwraps a wSOL vault into the PDA itself and moves any
	* other quote into the PDA's quote ATA, which it creates (rent paid by `payer`) when missing;
	* `pump_creator_vault_ata` is part of the account list even for wSOL. `quoteTokenProgram`
	* must be the quote mint's owner program, SPL Token or Token-2022; every quote-side ATA is
	* derived under it.
	*/
	async transferCreatorFeesToPumpV2Instruction({ payer, coinCreator, quoteMint, quoteTokenProgram }) {
		return this.offlineProgram.methods.transferCreatorFeesToPumpV2().accountsPartial({
			payer,
			quoteMint,
			tokenProgram: quoteTokenProgram,
			coinCreator
		}).instruction();
	}
	/**
	* Builds `set_coin_creator`, the permissionless instruction that fills in a canonical pool's
	* coin creator from the base mint's Metaplex metadata (its first creator) or, when the metadata
	* lists none, from the bonding curve's creator; a no-op once the pool has one. With `baseMint`
	* the `metadata` and `bonding_curve` accounts are derived here (`metadataPda`,
	* `bondingCurvePda`). Without it they are left to Anchor's account resolver, which reads the
	* pool through the provider's connection (the offline program has none) and, with this IDL,
	* cannot decode a pre-upgrade 261-byte pool, so pass `baseMint` or use
	* `OnlinePumpAmmSdk.setCoinCreatorInstructions`. The program writes the whole `Pool` back, so a
	* pre-upgrade pool must be grown by `extend_account` first.
	*/
	async setCoinCreator(pool, baseMint) {
		return this.offlineProgram.methods.setCoinCreator().accountsPartial(baseMint === void 0 ? { pool } : {
			pool,
			metadata: metadataPda(baseMint),
			bondingCurve: bondingCurvePda$1(baseMint)
		}).instruction();
	}
	/**
	* Sets the per-pool creator fee of the canonical pump pool `pool`, in basis points, once per
	* editability flip. The program requires `GlobalConfig.creatorFeeConfigurable`, a non-cashback
	* pool, `Pool.canEditCreatorFee` (set by `admin_set_coin_creator_fee_editable`; writing clears
	* it again) and `1 <= creatorFeeBps <= GlobalConfig.maxConfigurableCreatorFeeBps`. `coinCreator`
	* signs: `Pool.coinCreator`, or, when the coin creator is the coin's pump-fees SharingConfig
	* (`feeSharingConfigPda(pool.baseMint)`), that config's admin with the config passed as
	* `sharingConfig` (remaining account 0; it must be Active with the admin not revoked). Nothing
	* is validated here, the program is the authority;
	* `OnlinePumpAmmSdk.setCoinCreatorFeeBpsInstructions` checks what it can.
	*/
	async setCoinCreatorFeeBpsInstruction({ coinCreator, pool, creatorFeeBps, sharingConfig }) {
		return this.offlineProgram.methods.setCoinCreatorFeeBps(creatorFeeBps).accountsPartial({
			coinCreator,
			globalConfig: GLOBAL_CONFIG_PDA,
			pool
		}).remainingAccounts(sharingConfig === void 0 ? [] : [{
			pubkey: sharingConfig,
			isWritable: false,
			isSigner: false
		}]).instruction();
	}
	/**
	* Lets the creator of the canonical pump pool `pool` set its creator fee once
	* (`Pool.canEditCreatorFee = true`). Signed by `GlobalConfig.adminSetCoinCreatorAuthority`,
	* which also pays the rent that grows a pre-upgrade 261-byte pool to `POOL_SIZE` bytes (no
	* separate `extend_account` needed). Idempotent; not gated by `creatorFeeConfigurable`.
	*/
	async adminSetCoinCreatorFeeEditableInstruction({ adminSetCoinCreatorAuthority, pool }) {
		return this.offlineProgram.methods.adminSetCoinCreatorFeeEditable().accountsPartial({
			adminSetCoinCreatorAuthority,
			globalConfig: GLOBAL_CONFIG_PDA,
			pool
		}).instruction();
	}
	swapAccounts(swapSolanaState) {
		const { globalConfig, poolKey, pool, baseTokenProgram, quoteTokenProgram, user, userBaseTokenAccount, userQuoteTokenAccount } = swapSolanaState;
		const protocolFeeRecipient = getFeeRecipient$1(globalConfig, pool.isMayhemMode);
		const buybackFeeRecipient = getBuybackFeeRecipient(globalConfig);
		const { baseMint, quoteMint, poolBaseTokenAccount, poolQuoteTokenAccount, coinCreator } = pool;
		const coinCreatorVaultAuthority = coinCreatorVaultAuthorityPda(coinCreator);
		return {
			pool: poolKey,
			globalConfig: GLOBAL_CONFIG_PDA,
			user,
			baseMint,
			quoteMint,
			userBaseTokenAccount,
			userQuoteTokenAccount,
			poolBaseTokenAccount,
			poolQuoteTokenAccount,
			protocolFeeRecipient,
			protocolFeeRecipientTokenAccount: getAssociatedTokenAddressSync(quoteMint, protocolFeeRecipient, true, quoteTokenProgram),
			buybackFeeRecipient,
			buybackFeeRecipientTokenAccount: getAssociatedTokenAddressSync(quoteMint, buybackFeeRecipient, true, quoteTokenProgram),
			baseTokenProgram,
			quoteTokenProgram,
			systemProgram: SystemProgram.programId,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			eventAuthority: PUMP_AMM_EVENT_AUTHORITY_PDA$1,
			program: PUMP_AMM_PROGRAM_ID$1,
			coinCreatorVaultAta: coinCreatorVaultAtaPda(coinCreatorVaultAuthority, quoteMint, quoteTokenProgram),
			coinCreatorVaultAuthority
		};
	}
	async syncUserVolumeAccumulator(user) {
		return await this.offlineProgram.methods.syncUserVolumeAccumulator().accountsPartial({ user }).instruction();
	}
	async initUserVolumeAccumulator({ payer, user }) {
		return await this.offlineProgram.methods.initUserVolumeAccumulator().accountsPartial({
			payer,
			user
		}).instruction();
	}
	async closeUserVolumeAccumulator(user) {
		return await this.offlineProgram.methods.closeUserVolumeAccumulator().accountsPartial({ user }).instruction();
	}
	async createAutocompleteInitialPoolPrice(initialBase, initialQuote) {
		return initialQuote.div(initialBase);
	}
	async depositInstructions(liquiditySolanaState, lpToken, slippage) {
		const { pool, poolBaseTokenAccount, poolQuoteTokenAccount } = liquiditySolanaState;
		const { maxBase, maxQuote } = depositLpToken(lpToken, slippage, new import_bn.default(poolBaseTokenAccount.amount.toString()), new import_bn.default(poolQuoteTokenAccount.amount.toString()), pool.lpSupply);
		return this.depositInstructionsInternal(liquiditySolanaState, lpToken, maxBase, maxQuote);
	}
	depositAutocompleteQuoteAndLpTokenFromBase(liquiditySolanaState, base, slippage) {
		const { quote, lpToken } = this.depositBaseInput(liquiditySolanaState, base, slippage);
		return {
			quote,
			lpToken
		};
	}
	depositAutocompleteBaseAndLpTokenFromQuote(liquiditySolanaState, quote, slippage) {
		const { base, lpToken } = this.depositQuoteInput(liquiditySolanaState, quote, slippage);
		return {
			base,
			lpToken
		};
	}
	async withdrawInstructions(liquiditySolanaState, lpToken, slippage) {
		const { minBase, minQuote } = this.withdrawInputs(liquiditySolanaState, lpToken, slippage);
		return this.withdrawInstructionsInternal(liquiditySolanaState, lpToken, minBase, minQuote);
	}
	withdrawAutoCompleteBaseAndQuoteFromLpToken(liquiditySolanaState, lpAmount, slippage) {
		const { base, quote } = this.withdrawInputs(liquiditySolanaState, lpAmount, slippage);
		return {
			base,
			quote
		};
	}
};
new PumpAmmSdk();
/*! Bundled license information:

ieee754/index.js:
(*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
(*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*)
*/
//#endregion
//#region node_modules/@pump-fun/pump-sdk/dist/esm/index.js
init_index_esm();
init_provider(), init_program();
var pump_default = {
	address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
	metadata: {
		name: "pump",
		version: "0.1.0",
		spec: "0.1.0",
		description: "Created with Anchor"
	},
	instructions: [
		{
			name: "add_quote_control_mint",
			discriminator: [
				2,
				14,
				61,
				138,
				170,
				142,
				14,
				95
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "quote_control",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							113,
							117,
							111,
							116,
							101,
							45,
							99,
							111,
							110,
							116,
							114,
							111,
							108
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
				name: "quote_mint",
				type: "pubkey"
			}, {
				name: "initial_virtual_quote_reserves",
				type: "u64"
			}]
		},
		{
			name: "add_quote_mint",
			discriminator: [
				111,
				121,
				21,
				56,
				40,
				24,
				94,
				209
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "quote_mint",
				type: "pubkey"
			}]
		},
		{
			name: "admin_cto",
			discriminator: [
				125,
				126,
				214,
				134,
				77,
				229,
				188,
				89
			],
			accounts: [
				{
					name: "admin_set_creator_authority",
					writable: true,
					signer: true,
					relations: ["global"]
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "mint" },
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "current_creator",
					docs: [
						"Not declared writable: a pre-creator (legacy) curve stores the zero key, which is the",
						"system program, whose write lock the runtime always demotes. Callers MUST still pass this",
						"account as writable whenever it is a wallet, so the outgoing creator can be paid from its",
						"vaults; otherwise the instruction fails with `CtoCreatorAccountNotWritable`. A creator that",
						"is not a system-owned wallet (a program, a sysvar, a pump-fees or other program-owned",
						"account) is skipped, its vault balances stay collectable, and it may be passed read-only."
					]
				},
				{
					name: "current_creator_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "current_creator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "current_creator"
					}] }
				},
				{
					name: "creator_vault_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "holder_creator_vault",
					docs: [
						"`[\"creator-vault\", find_program_address([\"holder-rewards\", mint], pump)]`. The sweep",
						"destination on the holder path of a fee-shared coin, ignored otherwise. Re-derived in the",
						"handler before it is written to; kept out of the seeds constraints to stay under the sBPF",
						"stack frame."
					],
					writable: true
				},
				{
					name: "holder_creator_vault_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "holder_creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pump_amm",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "amm_global_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "pool_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							112,
							111,
							111,
							108,
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
						path: "mint"
					}] }
				},
				{
					name: "pool",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									112,
									111,
									111,
									108
								]
							},
							{
								kind: "const",
								value: [0, 0]
							},
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "mint"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "pump_amm_event_authority",
					pda: {
						seeds: [{
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
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								95,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "current_creator"
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "sharing_config",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "account",
							path: "pump_fees"
						}
					}
				},
				{
					name: "pump_fees",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				},
				{
					name: "pump_fees_event_authority",
					pda: {
						seeds: [{
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
						}],
						program: {
							kind: "account",
							path: "pump_fees"
						}
					}
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
					name: "is_holder_reward",
					type: { option: "bool" }
				},
				{
					name: "creator_fee_bps",
					type: { option: "u64" }
				},
				{
					name: "new_creator",
					type: { option: "pubkey" }
				}
			]
		},
		{
			name: "admin_set_idl_authority",
			discriminator: [
				8,
				217,
				96,
				231,
				144,
				104,
				192,
				5
			],
			accounts: [
				{
					name: "authority",
					signer: true,
					relations: ["global"]
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "idl_account",
					writable: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "program_signer",
					pda: { seeds: [] }
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
				name: "idl_authority",
				type: "pubkey"
			}]
		},
		{
			name: "admin_update_token_incentives",
			discriminator: [
				209,
				11,
				115,
				87,
				213,
				23,
				124,
				204
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "global_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{ name: "mint" },
				{
					name: "global_incentive_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "global_volume_accumulator"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{ name: "token_program" },
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
					name: "start_time",
					type: "i64"
				},
				{
					name: "end_time",
					type: "i64"
				},
				{
					name: "seconds_in_a_day",
					type: "i64"
				},
				{
					name: "day_number",
					type: "u64"
				},
				{
					name: "pump_token_supply_per_day",
					type: "u64"
				}
			]
		},
		{
			name: "buy",
			docs: ["Buys tokens from a bonding curve."],
			discriminator: [
				102,
				6,
				61,
				18,
				1,
				218,
				235,
				234
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "fee_recipient",
					writable: true
				},
				{ name: "mint" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "associated_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "associated_user",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{ name: "token_program" },
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [
				{
					name: "amount",
					type: "u64"
				},
				{
					name: "max_sol_cost",
					type: "u64"
				},
				{
					name: "track_volume",
					type: { defined: { name: "OptionBool" } }
				},
				{
					name: "partial_fill",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_exact_quote_in_v2",
			discriminator: [
				194,
				171,
				28,
				70,
				104,
				77,
				91,
				47
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "fee_recipient",
					writable: true
				},
				{
					name: "associated_quote_fee_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "buyback_fee_recipient",
					writable: true
				},
				{
					name: "associated_quote_buyback_fee_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "buyback_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "associated_base_user",
					writable: true
				},
				{
					name: "associated_quote_user",
					docs: ["canonical SPL associated-token PDA. Validated in handlers via", "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades."],
					writable: true
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
					}] }
				},
				{
					name: "associated_creator_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "sharing_config",
					docs: [
						"seeds; the account is intentionally not deserialized here because it may be uninitialized",
						"for mints that have not created a fee sharing config. Handlers must check",
						"`data_is_empty()` / owner before reading."
					],
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "base_mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "associated_user_volume_accumulator",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user_volume_accumulator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [
				{
					name: "spendable_quote_in",
					type: "u64"
				},
				{
					name: "min_tokens_out",
					type: "u64"
				},
				{
					name: "partial_fill",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_exact_quote_in_v3",
			discriminator: [
				225,
				247,
				80,
				30,
				213,
				179,
				132,
				136
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					docs: ["Must already exist on a token quote (create_v2 creates it); ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "associated_base_user",
					writable: true
				},
				{
					name: "associated_quote_user",
					docs: ["canonical SPL associated-token PDA. Validated in the handlers via", "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades."],
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "buyback_fee_recipient",
					writable: true
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [
				{
					name: "spendable_quote_in",
					type: "u64"
				},
				{
					name: "min_tokens_out",
					type: "u64"
				},
				{
					name: "partial_fill",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_exact_sol_in",
			docs: [
				"Given a budget of spendable SOL, buy at least min_tokens_out tokens.",
				"Fees are deducted from spendable_sol_in.",
				"",
				"# Quote formulas",
				"Where:",
				"- total_fee_bps = protocol_fee_bps + creator_fee_bps (creator_fee_bps is 0 if no creator)",
				"- floor(a/b) = a / b (integer division)",
				"- ceil(a/b) = (a + b - 1) / b",
				"",
				"SOL → tokens quote",
				"To calculate tokens_out for a given spendable_sol_in:",
				"1. net_sol = floor(spendable_sol_in * 10_000 / (10_000 + total_fee_bps))",
				"2. fees = ceil(net_sol * protocol_fee_bps / 10_000) + ceil(net_sol * creator_fee_bps / 10_000) (creator_fee_bps is 0 if no creator)",
				"3. if net_sol + fees > spendable_sol_in: net_sol = net_sol - (net_sol + fees - spendable_sol_in)",
				"4. tokens_out = floor((net_sol - 1) * virtual_token_reserves / (virtual_sol_reserves + net_sol - 1))",
				"",
				"Reverse quote (tokens → SOL)",
				"To calculate spendable_sol_in for a desired number of tokens:",
				"1. net_sol = ceil(tokens * virtual_sol_reserves / (virtual_token_reserves - tokens)) + 1",
				"2. spendable_sol_in = ceil(net_sol * (10_000 + total_fee_bps) / 10_000)",
				"",
				"Rent",
				"Separately make sure the instruction's payer has enough SOL to cover rent for:",
				"- creator_vault: rent.minimum_balance(0)",
				"- user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)"
			],
			discriminator: [
				56,
				252,
				116,
				8,
				158,
				223,
				205,
				95
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "fee_recipient",
					writable: true
				},
				{ name: "mint" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "associated_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "associated_user",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{ name: "token_program" },
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [
				{
					name: "spendable_sol_in",
					type: "u64"
				},
				{
					name: "min_tokens_out",
					type: "u64"
				},
				{
					name: "track_volume",
					type: { defined: { name: "OptionBool" } }
				},
				{
					name: "partial_fill",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_v2",
			discriminator: [
				184,
				23,
				238,
				97,
				103,
				197,
				211,
				61
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "fee_recipient",
					writable: true
				},
				{
					name: "associated_quote_fee_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "buyback_fee_recipient",
					writable: true
				},
				{
					name: "associated_quote_buyback_fee_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "buyback_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "associated_base_user",
					writable: true
				},
				{
					name: "associated_quote_user",
					docs: ["canonical SPL associated-token PDA. Validated in handlers via", "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades."],
					writable: true
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
					}] }
				},
				{
					name: "associated_creator_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "sharing_config",
					docs: [
						"seeds; the account is intentionally not deserialized here because it may be uninitialized",
						"for mints that have not created a fee sharing config. Handlers must check",
						"`data_is_empty()` / owner before reading."
					],
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "base_mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "associated_user_volume_accumulator",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user_volume_accumulator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [
				{
					name: "amount",
					type: "u64"
				},
				{
					name: "max_sol_cost",
					type: "u64"
				},
				{
					name: "partial_fill",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_v3",
			discriminator: [
				7,
				5,
				29,
				196,
				245,
				23,
				101,
				80
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					docs: ["Must already exist on a token quote (create_v2 creates it); ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "associated_base_user",
					writable: true
				},
				{
					name: "associated_quote_user",
					docs: ["canonical SPL associated-token PDA. Validated in the handlers via", "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades."],
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "buyback_fee_recipient",
					writable: true
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [
				{
					name: "amount",
					type: "u64"
				},
				{
					name: "max_sol_cost",
					type: "u64"
				},
				{
					name: "partial_fill",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "claim_cashback",
			discriminator: [
				37,
				58,
				35,
				126,
				190,
				53,
				228,
				197
			],
			accounts: [
				{
					name: "user",
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: []
		},
		{
			name: "claim_cashback_v2",
			docs: ["Pays out the user's accrued cashback. For a token quote, `associated_quote_user` may be", "any token account of `quote_mint` owned by `user`, not only the associated one."],
			discriminator: [
				122,
				243,
				204,
				65,
				94,
				116,
				29,
				55
			],
			accounts: [
				{
					name: "user",
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "associated_user_volume_accumulator",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user_volume_accumulator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "associated_quote_user",
					writable: true
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: []
		},
		{
			name: "claim_token_incentives",
			discriminator: [
				16,
				4,
				71,
				28,
				204,
				1,
				40,
				27
			],
			accounts: [
				{ name: "user" },
				{
					name: "user_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "global_incentive_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "global_volume_accumulator"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "mint",
					relations: ["global_volume_accumulator"]
				},
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "payer",
					writable: true,
					signer: true
				}
			],
			args: []
		},
		{
			name: "close_user_volume_accumulator",
			discriminator: [
				249,
				69,
				164,
				218,
				150,
				103,
				84,
				138
			],
			accounts: [
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "collect_creator_fee",
			docs: ["Collects creator_fee from creator_vault to the coin creator account"],
			discriminator: [
				20,
				22,
				86,
				123,
				198,
				28,
				219,
				132
			],
			accounts: [
				{
					name: "creator",
					writable: true
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "creator"
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
			args: []
		},
		{
			name: "collect_creator_fee_v2",
			docs: ["Collects creator_fee from creator_vault to the coin creator account"],
			discriminator: [
				207,
				17,
				138,
				242,
				4,
				34,
				19,
				56
			],
			accounts: [
				{
					name: "creator",
					writable: true
				},
				{
					name: "creator_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "creator"
					}] }
				},
				{
					name: "creator_vault_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
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
			name: "create",
			docs: ["Creates a new coin and bonding curve."],
			discriminator: [
				24,
				30,
				200,
				40,
				5,
				28,
				7,
				119
			],
			accounts: [
				{
					name: "mint",
					writable: true,
					signer: true
				},
				{
					name: "mint_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							109,
							105,
							110,
							116,
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
					}] }
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "associated_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
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
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "mpl_token_metadata",
					address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
				},
				{
					name: "metadata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									109,
									101,
									116,
									97,
									100,
									97,
									116,
									97
								]
							},
							{
								kind: "const",
								value: [
									11,
									112,
									101,
									177,
									227,
									209,
									124,
									69,
									56,
									157,
									82,
									127,
									107,
									4,
									195,
									205,
									88,
									184,
									108,
									115,
									26,
									160,
									253,
									181,
									73,
									182,
									209,
									188,
									3,
									248,
									41,
									70
								]
							},
							{
								kind: "account",
								path: "mint"
							}
						],
						program: {
							kind: "account",
							path: "mpl_token_metadata"
						}
					}
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "rent",
					address: "SysvarRent111111111111111111111111111111111"
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
					name: "name",
					type: "string"
				},
				{
					name: "symbol",
					type: "string"
				},
				{
					name: "uri",
					type: "string"
				},
				{
					name: "creator",
					type: "pubkey"
				}
			]
		},
		{
			name: "create_v2",
			docs: [
				"Creates a new spl-22 coin and bonding curve.",
				"",
				"Remaining accounts select the quote mint (none = SOL): `quote_mint`,",
				"`associated_quote_bonding_curve`, `quote_token_program` (SPL Token or Token-2022; must own",
				"the mint), plus an optional fourth account, the `quote-control` PDA, read only when `Global`",
				"does not whitelist the mint. A mint admitted through quote-control seeds the curve's",
				"virtual quote reserves from its quote-control entry instead of `Global`, and cannot be",
				"used with `is_mayhem_mode` (`MayhemModeQuoteMintNotAllowed`). When neither list admits the",
				"mint Q, an optional fifth account, Q's own pump `bonding-curve` PDA, admits a pump coin as",
				"the quote (`InvalidQuoteBondingCurve` if it is not that PDA; missing keeps",
				"`UnsupportedQuoteMint`): the new curve's depth, Q's depth plus one, must not exceed",
				"`Global.max_curve_depth` or the program's cap of 5 (`CurveDepthExceeded`; 0 disables the",
				"path, 1 admits children of depth-0 coins only), and Q's curve must not be mayhem mode",
				"(`QuoteBondingCurveNotEligible`). The new curve's virtual quote reserves are then derived",
				"from the live reserves of every coin on Q's quote chain, Q down to its depth-0 root R (Q",
				"itself at depth 1), whose own quote must be SOL, a `Global`-whitelisted mint or a",
				"quote-control mint (`QuoteBondingCurveNotEligible`): the graduation raise of a Target, the",
				"seed a fresh curve in R's quote would get today, is bought on R's constant product, the R",
				"tokens that returns are bought on the next coin up, and so on to Q; the Q tokens the last",
				"buy returns are the new curve's graduation raise and its seed is that raise scaled back by",
				"the curve's raise ratio. Each coin is priced over its curve `virtual_token_reserves` and",
				"`virtual_quote_reserves` while its curve trades, a buy past its real token reserves",
				"completing the curve at the remainder's price and continuing in the pool the migration",
				"would create (the migration deposit against the raise, as `buy_v3` does), or over its",
				"canonical pump-amm pool base vault balance and its quote vault balance plus",
				"`Pool.virtual_quote_reserves` once it is migrated (a complete coin not yet migrated fails",
				"`QuoteCurveAwaitingMigration`). The chain",
				"follows Q's group: one group per coin below Q, nearest first, each the coin's",
				"`bonding-curve` PDA alone while it trades or that PDA followed by its pool (index 0 under",
				"pump's `pool-authority` PDA for the coin, quote seed WSOL for a SOL-quoted coin) and the",
				"pool's base and quote vaults once migrated, Q's own pool accounts being the sixth to",
				"eighth (`QuoteChainAccountsRequired`, `QuotePoolAccountsRequired`, `QuotePoolNotFound`,",
				"`InvalidQuotePool`). The derived value must be at least 1 (`QuoteReservesOutOfRange`); each",
				"buy returns less than that coin's token side, so there is no supply bound. The new curve",
				"stores `depth = Q.depth + 1` and, like a quote-control coin, cannot be mayhem mode. The Token-2022",
				"native mint is rejected, and a Token-2022 quote mint may only carry the xStock operable",
				"extension set (metadata pointer/metadata, permanent delegate, initialized default account",
				"state, scaled UI amount, pausable, confidential-transfer mint, and a transfer hook with no",
				"program). The trailing `creator_fee_bps` argument (EOF-tolerant) sets the coin's own creator",
				"fee rate for a quote mint admitted through quote-control or through a pump coin's curve,",
				"and then requires `Global.creator_fee_configurable`, a non-cashback coin and a value in",
				"`1..=Global.max_configurable_creator_fee_bps`; on a SOL or `Global`-whitelisted quote it is",
				"ignored, and omitted or zero stores 0 so the pump-fees schedule rate applies.",
				"`is_cashback_enabled` is deprecated and must be false. `is_holder_reward` (EOF-tolerant,",
				"gated by `Global.is_holder_reward_enabled`) sets the creator to the `holder-rewards` PDA",
				"of the mint, so creator fees accrue to its creator vault, are collected onto the PDA with",
				"`collect_creator_fee*` and paid out through `distribute_fee_to_holders`."
			],
			discriminator: [
				214,
				144,
				76,
				236,
				95,
				139,
				49,
				180
			],
			accounts: [
				{
					name: "mint",
					writable: true,
					signer: true
				},
				{
					name: "mint_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							109,
							105,
							110,
							116,
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
					}] }
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "associated_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "token_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "mayhem_program_id",
					writable: true,
					address: "MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e"
				},
				{
					name: "global_params",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108,
								45,
								112,
								97,
								114,
								97,
								109,
								115
							]
						}],
						program: {
							kind: "const",
							value: [
								5,
								42,
								229,
								215,
								167,
								218,
								167,
								36,
								166,
								234,
								176,
								167,
								41,
								84,
								145,
								133,
								90,
								212,
								160,
								103,
								22,
								96,
								103,
								76,
								78,
								3,
								69,
								89,
								128,
								61,
								101,
								163
							]
						}
					}
				},
				{
					name: "sol_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								111,
								108,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}],
						program: {
							kind: "const",
							value: [
								5,
								42,
								229,
								215,
								167,
								218,
								167,
								36,
								166,
								234,
								176,
								167,
								41,
								84,
								145,
								133,
								90,
								212,
								160,
								103,
								22,
								96,
								103,
								76,
								78,
								3,
								69,
								89,
								128,
								61,
								101,
								163
							]
						}
					}
				},
				{
					name: "mayhem_state",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								109,
								97,
								121,
								104,
								101,
								109,
								45,
								115,
								116,
								97,
								116,
								101
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "const",
							value: [
								5,
								42,
								229,
								215,
								167,
								218,
								167,
								36,
								166,
								234,
								176,
								167,
								41,
								84,
								145,
								133,
								90,
								212,
								160,
								103,
								22,
								96,
								103,
								76,
								78,
								3,
								69,
								89,
								128,
								61,
								101,
								163
							]
						}
					}
				},
				{
					name: "mayhem_token_vault",
					writable: true
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
					name: "name",
					type: "string"
				},
				{
					name: "symbol",
					type: "string"
				},
				{
					name: "uri",
					type: "string"
				},
				{
					name: "creator",
					type: "pubkey"
				},
				{
					name: "is_mayhem_mode",
					type: "bool"
				},
				{
					name: "is_cashback_enabled",
					type: { defined: { name: "OptionBool" } }
				},
				{
					name: "creator_fee_bps",
					type: { defined: { name: "OptionU64" } }
				},
				{
					name: "is_holder_reward",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "distribute_creator_fees",
			docs: [
				"Distributes creator fees to shareholders based on their share percentages",
				"The creator vault needs to have at least the minimum distributable amount to distribute fees",
				"This can be checked with the get_minimum_distributable_fee instruction"
			],
			discriminator: [
				165,
				114,
				103,
				0,
				121,
				206,
				247,
				81
			],
			accounts: [
				{
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "bonding_curve",
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "sharing_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [],
			returns: { defined: { name: "DistributeCreatorFeesEvent" } }
		},
		{
			name: "distribute_creator_fees_v2",
			discriminator: [
				255,
				203,
				19,
				79,
				244,
				68,
				8,
				159
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "bonding_curve",
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "sharing_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "creator_vault_quote_token_account",
					docs: ["Deserialized manually in the handler for non-legacy quote mints."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				}
			],
			args: [{
				name: "initialize_ata",
				type: "bool"
			}],
			returns: { defined: { name: "DistributeCreatorFeesEvent" } }
		},
		{
			name: "distribute_fee_to_holders",
			docs: [
				"Pays fees collected on the `holder-rewards` PDA (via `collect_creator_fee*` with the PDA",
				"as creator) out to holders: `amounts[i]` goes to remaining accounts `[2i]` (owner) /",
				"`[2i + 1]` (its quote ATA, created if missing). `holder_rewards_token_account` is any",
				"quote token account owned by the PDA (normally its ATA): the source on a token quote, and",
				"on a SOL quote a parked WSOL account closed into the PDA first; pass the program id when",
				"there is none. Signed by `Global.holder_reward_claim_authority`."
			],
			discriminator: [
				98,
				54,
				145,
				97,
				2,
				70,
				173,
				43
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "holder_reward_claim_authority",
					writable: true,
					signer: true,
					relations: ["global"]
				},
				{ name: "mint" },
				{
					name: "holder_rewards",
					docs: ["deliver the collected fees here (lamports on a SOL quote)"],
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							104,
							111,
							108,
							100,
							101,
							114,
							45,
							114,
							101,
							119,
							97,
							114,
							100,
							115
						]
					}, {
						kind: "account",
						path: "mint"
					}] }
				},
				{
					name: "holder_rewards_token_account",
					writable: true,
					optional: true
				},
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
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
				name: "amounts",
				type: { vec: "u64" }
			}]
		},
		{
			name: "extend_account",
			docs: ["Extends the size of program-owned accounts"],
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
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
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
			name: "get_minimum_distributable_fee",
			docs: ["Permissionless instruction to check the minimum required fees for distribution", "Returns the minimum required balance from the creator_vault and whether distribution can proceed"],
			discriminator: [
				117,
				225,
				127,
				202,
				134,
				95,
				68,
				35
			],
			accounts: [
				{
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "bonding_curve",
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "sharing_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "creator_vault",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
					}] }
				}
			],
			args: [],
			returns: { defined: { name: "MinimumDistributableFeeEvent" } }
		},
		{
			name: "init_user_volume_accumulator",
			discriminator: [
				94,
				6,
				202,
				115,
				255,
				96,
				232,
				183
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "user" },
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "initialize",
			docs: ["Creates the global state."],
			discriminator: [
				175,
				175,
				109,
				31,
				13,
				152,
				155,
				237
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				}
			],
			args: []
		},
		{
			name: "initialize_quote_control",
			discriminator: [
				239,
				73,
				245,
				173,
				209,
				177,
				84,
				66
			],
			accounts: [
				{
					name: "quote_control",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							113,
							117,
							111,
							116,
							101,
							45,
							99,
							111,
							110,
							116,
							114,
							111,
							108
						]
					}] }
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				}
			],
			args: []
		},
		{
			name: "migrate",
			docs: ["Migrates liquidity to pump_amm if the bonding curve is complete"],
			discriminator: [
				155,
				234,
				231,
				146,
				236,
				158,
				162,
				30
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "withdraw_authority",
					writable: true,
					relations: ["global"]
				},
				{ name: "mint" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "associated_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "mint"
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
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "pump_amm",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "pool",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									112,
									111,
									111,
									108
								]
							},
							{
								kind: "const",
								value: [0, 0]
							},
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "mint"
							},
							{
								kind: "account",
								path: "wsol_mint"
							}
						],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "pool_authority",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							112,
							111,
							111,
							108,
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
						path: "mint"
					}] }
				},
				{
					name: "pool_authority_mint_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "mint"
							},
							{
								kind: "account",
								path: "mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pool_authority_wsol_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "wsol_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "amm_global_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "wsol_mint",
					address: "So11111111111111111111111111111111111111112"
				},
				{
					name: "lp_mint",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								112,
								111,
								111,
								108,
								95,
								108,
								112,
								95,
								109,
								105,
								110,
								116
							]
						}, {
							kind: "account",
							path: "pool"
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "user_pool_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "token_2022_program"
							},
							{
								kind: "account",
								path: "lp_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pool_base_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "mint"
							},
							{
								kind: "account",
								path: "mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "wsol_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "pump_amm_event_authority",
					pda: {
						seeds: [{
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
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "rent",
					address: "SysvarRent111111111111111111111111111111111"
				}
			],
			args: []
		},
		{
			name: "migrate_bonding_curve_creator",
			discriminator: [
				87,
				124,
				52,
				191,
				52,
				38,
				214,
				232
			],
			accounts: [
				{
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "sharing_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
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
			name: "migrate_v2",
			docs: ["Migrates liquidity to pump_amm if the bonding curve is complete"],
			discriminator: [
				187,
				203,
				18,
				31,
				206,
				237,
				254,
				41
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "withdraw_authority",
					writable: true,
					relations: ["global"]
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "pump_amm",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "pool",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									112,
									111,
									111,
									108
								]
							},
							{
								kind: "const",
								value: [0, 0]
							},
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "base_mint"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "pool_authority",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							112,
							111,
							111,
							108,
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
						path: "base_mint"
					}] }
				},
				{
					name: "pool_authority_mint_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pool_authority_quote_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "amm_global_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "lp_mint",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								112,
								111,
								111,
								108,
								95,
								108,
								112,
								95,
								109,
								105,
								110,
								116
							]
						}, {
							kind: "account",
							path: "pool"
						}],
						program: {
							kind: "account",
							path: "pump_amm"
						}
					}
				},
				{
					name: "user_pool_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool_authority"
							},
							{
								kind: "account",
								path: "token_2022_program"
							},
							{
								kind: "account",
								path: "lp_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pool_base_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "pump_amm_event_authority" },
				{
					name: "rent",
					address: "SysvarRent111111111111111111111111111111111"
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
			name: "multi_hop_curve_swap",
			discriminator: [
				225,
				154,
				117,
				22,
				215,
				86,
				246,
				103
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "pump_amm_global_config",
					signer: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}],
						program: {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}
					}
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "source_authority",
					signer: true
				},
				{
					name: "source",
					writable: true
				},
				{
					name: "destination",
					writable: true
				},
				{
					name: "buyback_fee_recipient",
					writable: true
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [{
				name: "amount_in",
				type: "u64"
			}, {
				name: "hop_fees",
				type: "bytes"
			}],
			returns: { defined: { name: "CurveRunResult" } }
		},
		{
			name: "remove_quote_control_mint",
			discriminator: [
				223,
				7,
				253,
				26,
				81,
				165,
				218,
				166
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "quote_control",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							113,
							117,
							111,
							116,
							101,
							45,
							99,
							111,
							110,
							116,
							114,
							111,
							108
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
				name: "quote_mint",
				type: "pubkey"
			}]
		},
		{
			name: "remove_quote_mint",
			discriminator: [
				177,
				65,
				223,
				38,
				88,
				209,
				158,
				155
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "quote_mint",
				type: "pubkey"
			}]
		},
		{
			name: "sell",
			docs: [
				"Sells tokens into a bonding curve.",
				"For cashback coins, pass as remaining_accounts: [0] user_volume_accumulator,",
				"[1] bonding_curve_v2. If provided and valid, creator_fee goes to user_volume_accumulator.",
				"Otherwise, falls back to transferring creator_fee to creator_vault."
			],
			discriminator: [
				51,
				230,
				133,
				164,
				1,
				127,
				131,
				173
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "fee_recipient",
					writable: true
				},
				{ name: "mint" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "associated_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "associated_user",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
					}] }
				},
				{ name: "token_program" },
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [{
				name: "amount",
				type: "u64"
			}, {
				name: "min_sol_output",
				type: "u64"
			}]
		},
		{
			name: "sell_v2",
			discriminator: [
				93,
				246,
				130,
				60,
				231,
				233,
				64,
				178
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "fee_recipient",
					writable: true
				},
				{
					name: "associated_quote_fee_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "buyback_fee_recipient",
					writable: true
				},
				{
					name: "associated_quote_buyback_fee_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "buyback_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "associated_base_user",
					writable: true
				},
				{
					name: "associated_quote_user",
					docs: ["canonical SPL associated-token PDA. Validated in `sell_v2_ix` via", "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades."],
					writable: true
				},
				{
					name: "creator_vault",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							45,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "bonding_curve.creator",
						account: "BondingCurve"
					}] }
				},
				{
					name: "associated_creator_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator_vault"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "sharing_config",
					docs: [
						"seeds; the account is intentionally not deserialized here because it may be uninitialized",
						"for mints that have not created a fee sharing config. Handlers must check",
						"`data_is_empty()` / owner before reading."
					],
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "base_mint"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "associated_user_volume_accumulator",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user_volume_accumulator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [{
				name: "amount",
				type: "u64"
			}, {
				name: "min_sol_output",
				type: "u64"
			}]
		},
		{
			name: "sell_v3",
			discriminator: [
				28,
				146,
				222,
				119,
				38,
				196,
				105,
				213
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_base_bonding_curve",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "associated_quote_bonding_curve",
					docs: ["Must already exist on a token quote (create_v2 creates it); ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "associated_base_user",
					writable: true
				},
				{
					name: "associated_quote_user",
					docs: ["canonical SPL associated-token PDA. Validated in the handlers via", "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades."],
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "buyback_fee_recipient",
					writable: true
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
				{
					name: "program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				}
			],
			args: [{
				name: "amount",
				type: "u64"
			}, {
				name: "min_sol_output",
				type: "u64"
			}]
		},
		{
			name: "set_creator",
			docs: ["Allows Global::set_creator_authority to set the bonding curve creator from Metaplex metadata or input argument"],
			discriminator: [
				254,
				148,
				255,
				112,
				207,
				142,
				170,
				165
			],
			accounts: [
				{
					name: "set_creator_authority",
					signer: true,
					relations: ["global"]
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "mint" },
				{
					name: "metadata",
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									109,
									101,
									116,
									97,
									100,
									97,
									116,
									97
								]
							},
							{
								kind: "const",
								value: [
									11,
									112,
									101,
									177,
									227,
									209,
									124,
									69,
									56,
									157,
									82,
									127,
									107,
									4,
									195,
									205,
									88,
									184,
									108,
									115,
									26,
									160,
									253,
									181,
									73,
									182,
									209,
									188,
									3,
									248,
									41,
									70
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
								11,
								112,
								101,
								177,
								227,
								209,
								124,
								69,
								56,
								157,
								82,
								127,
								107,
								4,
								195,
								205,
								88,
								184,
								108,
								115,
								26,
								160,
								253,
								181,
								73,
								182,
								209,
								188,
								3,
								248,
								41,
								70
							]
						}
					}
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
				name: "creator",
				type: "pubkey"
			}]
		},
		{
			name: "set_max_curve_depth",
			discriminator: [
				32,
				154,
				152,
				219,
				142,
				108,
				218,
				165
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "max_curve_depth",
				type: "u8"
			}]
		},
		{
			name: "set_mayhem_virtual_params",
			discriminator: [
				61,
				169,
				188,
				191,
				153,
				149,
				42,
				97
			],
			accounts: [
				{
					name: "sol_vault_authority",
					writable: true,
					signer: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								111,
								108,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}],
						program: {
							kind: "const",
							value: [
								5,
								42,
								229,
								215,
								167,
								218,
								167,
								36,
								166,
								234,
								176,
								167,
								41,
								84,
								145,
								133,
								90,
								212,
								160,
								103,
								22,
								96,
								103,
								76,
								78,
								3,
								69,
								89,
								128,
								61,
								101,
								163
							]
						}
					}
				},
				{
					name: "mayhem_token_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "sol_vault_authority"
							},
							{
								kind: "account",
								path: "token_program"
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
				{ name: "mint" },
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
					}] }
				},
				{
					name: "token_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
			name: "set_metaplex_creator",
			docs: ["Syncs the bonding curve creator with the Metaplex metadata creator if it exists"],
			discriminator: [
				138,
				96,
				174,
				217,
				48,
				85,
				197,
				246
			],
			accounts: [
				{ name: "mint" },
				{
					name: "metadata",
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									109,
									101,
									116,
									97,
									100,
									97,
									116,
									97
								]
							},
							{
								kind: "const",
								value: [
									11,
									112,
									101,
									177,
									227,
									209,
									124,
									69,
									56,
									157,
									82,
									127,
									107,
									4,
									195,
									205,
									88,
									184,
									108,
									115,
									26,
									160,
									253,
									181,
									73,
									182,
									209,
									188,
									3,
									248,
									41,
									70
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
								11,
								112,
								101,
								177,
								227,
								209,
								124,
								69,
								56,
								157,
								82,
								127,
								107,
								4,
								195,
								205,
								88,
								184,
								108,
								115,
								26,
								160,
								253,
								181,
								73,
								182,
								209,
								188,
								3,
								248,
								41,
								70
							]
						}
					}
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
			args: []
		},
		{
			name: "set_params",
			docs: ["Sets the global state parameters."],
			discriminator: [
				27,
				234,
				178,
				52,
				147,
				2,
				187,
				141
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
					name: "initial_virtual_token_reserves",
					type: "u64"
				},
				{
					name: "initial_virtual_sol_reserves",
					type: "u64"
				},
				{
					name: "initial_real_token_reserves",
					type: "u64"
				},
				{
					name: "token_total_supply",
					type: "u64"
				},
				{
					name: "fee_basis_points",
					type: "u64"
				},
				{
					name: "withdraw_authority",
					type: "pubkey"
				},
				{
					name: "enable_migrate",
					type: "bool"
				},
				{
					name: "pool_migration_fee",
					type: "u64"
				},
				{
					name: "creator_fee_basis_points",
					type: "u64"
				},
				{
					name: "set_creator_authority",
					type: "pubkey"
				},
				{
					name: "admin_set_creator_authority",
					type: "pubkey"
				}
			]
		},
		{
			name: "set_quote_control_admin",
			discriminator: [
				62,
				79,
				161,
				211,
				165,
				170,
				214,
				210
			],
			accounts: [
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					signer: true,
					relations: ["global"]
				},
				{
					name: "quote_control",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							113,
							117,
							111,
							116,
							101,
							45,
							99,
							111,
							110,
							116,
							114,
							111,
							108
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
				name: "new_admin",
				type: "pubkey"
			}]
		},
		{
			name: "set_quote_control_mint_reserves",
			discriminator: [
				116,
				220,
				107,
				83,
				191,
				44,
				32,
				73
			],
			accounts: [
				{
					name: "authority",
					signer: true
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "quote_control",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							113,
							117,
							111,
							116,
							101,
							45,
							99,
							111,
							110,
							116,
							114,
							111,
							108
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
				name: "quote_mint",
				type: "pubkey"
			}, {
				name: "initial_virtual_quote_reserves",
				type: "u64"
			}]
		},
		{
			name: "set_quote_control_reserves_admin",
			discriminator: [
				161,
				195,
				222,
				165,
				225,
				101,
				192,
				62
			],
			accounts: [
				{
					name: "authority",
					signer: true
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "quote_control",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							113,
							117,
							111,
							116,
							101,
							45,
							99,
							111,
							110,
							116,
							114,
							111,
							108
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
				name: "new_reserves_admin",
				type: "pubkey"
			}]
		},
		{
			name: "set_reserved_fee_recipients",
			discriminator: [
				111,
				172,
				162,
				232,
				114,
				89,
				213,
				142
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					signer: true,
					relations: ["global"]
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
				name: "whitelist_pda",
				type: "pubkey"
			}]
		},
		{
			name: "set_virtual_quote_reserves",
			discriminator: [
				101,
				135,
				191,
				104,
				9,
				88,
				20,
				96
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "initial_virtual_quote_reserves",
				type: "u64"
			}]
		},
		{
			name: "sweep_creator_fee",
			discriminator: [
				32,
				246,
				191,
				52,
				8,
				201,
				73,
				186
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_quote_bonding_curve",
					docs: ["the source on a token quote, ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "recipient",
					docs: ["recipient (`check_fee_recipient`) or the creator vault PDA of `bonding_curve.creator`."],
					writable: true
				},
				{
					name: "associated_quote_recipient",
					docs: ["created idempotently on a token quote, ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
			name: "sweep_protocol_fee",
			discriminator: [
				8,
				48,
				190,
				7,
				182,
				68,
				183,
				229
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "global",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "bonding_curve",
					writable: true,
					pda: { seeds: [{
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
						path: "base_mint"
					}] }
				},
				{
					name: "associated_quote_bonding_curve",
					docs: ["the source on a token quote, ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "bonding_curve"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "recipient",
					docs: ["recipient (`check_fee_recipient`) or the creator vault PDA of `bonding_curve.creator`."],
					writable: true
				},
				{
					name: "associated_quote_recipient",
					docs: ["created idempotently on a token quote, ignored on a SOL quote."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
			name: "sync_user_volume_accumulator",
			discriminator: [
				86,
				31,
				192,
				87,
				163,
				87,
				79,
				238
			],
			accounts: [
				{ name: "user" },
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "toggle_cashback_enabled",
			discriminator: [
				115,
				103,
				224,
				255,
				189,
				89,
				86,
				195
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "toggle_create_v2",
			discriminator: [
				28,
				255,
				230,
				240,
				172,
				107,
				203,
				171
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "toggle_mayhem_mode",
			discriminator: [
				1,
				9,
				111,
				208,
				100,
				31,
				255,
				163
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "update_buyback_config",
			discriminator: [
				251,
				224,
				171,
				146,
				160,
				26,
				113,
				233
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "buyback_basis_points",
				type: { option: "u64" }
			}]
		},
		{
			name: "update_creator_fee_config",
			discriminator: [
				61,
				175,
				160,
				249,
				66,
				66,
				136,
				175
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "creator_fee_configurable",
				type: "bool"
			}, {
				name: "max_configurable_creator_fee_bps",
				type: "u64"
			}]
		},
		{
			name: "update_global_authority",
			discriminator: [
				227,
				181,
				74,
				196,
				208,
				21,
				97,
				213
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					signer: true,
					relations: ["global"]
				},
				{ name: "new_authority" },
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
			name: "update_holder_reward_config",
			discriminator: [
				225,
				252,
				66,
				4,
				199,
				35,
				236,
				16
			],
			accounts: [
				{
					name: "global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["global"]
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
				name: "is_holder_reward_enabled",
				type: "bool"
			}, {
				name: "holder_reward_claim_authority",
				type: "pubkey"
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
			name: "FeeConfig",
			discriminator: [
				143,
				52,
				146,
				187,
				219,
				123,
				76,
				155
			]
		},
		{
			name: "Global",
			discriminator: [
				167,
				232,
				232,
				177,
				200,
				108,
				114,
				127
			]
		},
		{
			name: "GlobalVolumeAccumulator",
			discriminator: [
				202,
				42,
				246,
				43,
				142,
				190,
				30,
				255
			]
		},
		{
			name: "QuoteControl",
			discriminator: [
				56,
				244,
				35,
				238,
				193,
				213,
				162,
				201
			]
		},
		{
			name: "SharingConfig",
			discriminator: [
				216,
				74,
				9,
				0,
				56,
				140,
				93,
				75
			]
		},
		{
			name: "UserVolumeAccumulator",
			discriminator: [
				86,
				255,
				112,
				14,
				102,
				53,
				154,
				250
			]
		}
	],
	events: [
		{
			name: "AddQuoteControlMintEvent",
			discriminator: [
				164,
				175,
				87,
				74,
				88,
				45,
				33,
				62
			]
		},
		{
			name: "AdminCtoEvent",
			discriminator: [
				110,
				124,
				226,
				98,
				170,
				255,
				17,
				120
			]
		},
		{
			name: "AdminSetIdlAuthorityEvent",
			discriminator: [
				245,
				59,
				70,
				34,
				75,
				185,
				109,
				92
			]
		},
		{
			name: "AdminUpdateTokenIncentivesEvent",
			discriminator: [
				147,
				250,
				108,
				120,
				247,
				29,
				67,
				222
			]
		},
		{
			name: "ClaimCashbackEvent",
			discriminator: [
				226,
				214,
				246,
				33,
				7,
				242,
				147,
				229
			]
		},
		{
			name: "ClaimTokenIncentivesEvent",
			discriminator: [
				79,
				172,
				246,
				49,
				205,
				91,
				206,
				232
			]
		},
		{
			name: "CloseUserVolumeAccumulatorEvent",
			discriminator: [
				146,
				159,
				189,
				172,
				146,
				88,
				56,
				244
			]
		},
		{
			name: "CollectCreatorFeeEvent",
			discriminator: [
				122,
				2,
				127,
				1,
				14,
				191,
				12,
				175
			]
		},
		{
			name: "CompleteEvent",
			discriminator: [
				95,
				114,
				97,
				156,
				212,
				46,
				152,
				8
			]
		},
		{
			name: "CompletePumpAmmMigrationEvent",
			discriminator: [
				189,
				233,
				93,
				185,
				92,
				148,
				234,
				148
			]
		},
		{
			name: "CreateEvent",
			discriminator: [
				27,
				114,
				169,
				77,
				222,
				235,
				99,
				118
			]
		},
		{
			name: "DistributeCreatorFeesEvent",
			discriminator: [
				165,
				55,
				129,
				112,
				4,
				179,
				202,
				40
			]
		},
		{
			name: "DistributeFeeToHoldersEvent",
			discriminator: [
				227,
				190,
				215,
				206,
				176,
				180,
				165,
				132
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
			name: "InitUserVolumeAccumulatorEvent",
			discriminator: [
				134,
				36,
				13,
				72,
				232,
				101,
				130,
				216
			]
		},
		{
			name: "MigrateBondingCurveCreatorEvent",
			discriminator: [
				155,
				167,
				104,
				220,
				213,
				108,
				243,
				3
			]
		},
		{
			name: "MinimumDistributableFeeEvent",
			discriminator: [
				168,
				216,
				132,
				239,
				235,
				182,
				49,
				52
			]
		},
		{
			name: "PostCompleteBuyEvent",
			discriminator: [
				111,
				176,
				109,
				139,
				49,
				108,
				213,
				251
			]
		},
		{
			name: "RemoveQuoteControlMintEvent",
			discriminator: [
				46,
				33,
				86,
				134,
				0,
				213,
				209,
				48
			]
		},
		{
			name: "ReservedFeeRecipientsEvent",
			discriminator: [
				43,
				188,
				250,
				18,
				221,
				75,
				187,
				95
			]
		},
		{
			name: "SetCreatorEvent",
			discriminator: [
				237,
				52,
				123,
				37,
				245,
				251,
				72,
				210
			]
		},
		{
			name: "SetMetaplexCreatorEvent",
			discriminator: [
				142,
				203,
				6,
				32,
				127,
				105,
				191,
				162
			]
		},
		{
			name: "SetParamsEvent",
			discriminator: [
				223,
				195,
				159,
				246,
				62,
				48,
				143,
				131
			]
		},
		{
			name: "SetQuoteControlAdminEvent",
			discriminator: [
				74,
				248,
				141,
				69,
				202,
				81,
				30,
				247
			]
		},
		{
			name: "SetQuoteControlMintReservesEvent",
			discriminator: [
				169,
				67,
				39,
				109,
				102,
				134,
				182,
				232
			]
		},
		{
			name: "SetQuoteControlReservesAdminEvent",
			discriminator: [
				67,
				251,
				179,
				182,
				87,
				92,
				169,
				33
			]
		},
		{
			name: "SweepBondingCurveFeeEvent",
			discriminator: [
				116,
				43,
				77,
				189,
				17,
				122,
				72,
				43
			]
		},
		{
			name: "SyncUserVolumeAccumulatorEvent",
			discriminator: [
				197,
				122,
				167,
				124,
				116,
				81,
				91,
				255
			]
		},
		{
			name: "TradeEvent",
			discriminator: [
				189,
				219,
				127,
				211,
				78,
				230,
				97,
				238
			]
		},
		{
			name: "UpdateCreatorFeeConfigEvent",
			discriminator: [
				152,
				198,
				124,
				124,
				106,
				246,
				127,
				191
			]
		},
		{
			name: "UpdateGlobalAuthorityEvent",
			discriminator: [
				182,
				195,
				137,
				42,
				35,
				206,
				207,
				247
			]
		},
		{
			name: "UpdateMayhemVirtualParamsEvent",
			discriminator: [
				117,
				123,
				228,
				182,
				161,
				168,
				220,
				214
			]
		}
	],
	errors: [
		{
			code: 6e3,
			name: "NotAuthorized",
			msg: "The given account is not authorized to execute this instruction."
		},
		{
			code: 6001,
			name: "AlreadyInitialized",
			msg: "The program is already initialized."
		},
		{
			code: 6002,
			name: "TooMuchSolRequired",
			msg: "slippage: Too much SOL required to buy the given amount of tokens."
		},
		{
			code: 6003,
			name: "TooLittleSolReceived",
			msg: "slippage: Too little SOL received to sell the given amount of tokens."
		},
		{
			code: 6004,
			name: "MintDoesNotMatchBondingCurve",
			msg: "The mint does not match the bonding curve."
		},
		{
			code: 6005,
			name: "BondingCurveComplete",
			msg: "The bonding curve has completed and liquidity migrated to raydium."
		},
		{
			code: 6006,
			name: "BondingCurveNotComplete",
			msg: "The bonding curve has not completed."
		},
		{
			code: 6007,
			name: "NotInitialized",
			msg: "The program is not initialized."
		},
		{
			code: 6008,
			name: "WithdrawTooFrequent",
			msg: "Withdraw too frequent"
		},
		{
			code: 6009,
			name: "NewSizeShouldBeGreaterThanCurrentSize",
			msg: "new_size should be > current_size"
		},
		{
			code: 6010,
			name: "AccountTypeNotSupported",
			msg: "Account type not supported"
		},
		{
			code: 6011,
			name: "InitialRealTokenReservesShouldBeLessThanTokenTotalSupply",
			msg: "initial_real_token_reserves should be less than token_total_supply"
		},
		{
			code: 6012,
			name: "InitialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves",
			msg: "initial_virtual_token_reserves should be greater than initial_real_token_reserves"
		},
		{
			code: 6013,
			name: "FeeBasisPointsGreaterThanMaximum",
			msg: "fee_basis_points greater than maximum"
		},
		{
			code: 6014,
			name: "AllZerosWithdrawAuthority",
			msg: "Withdraw authority cannot be set to System Program ID"
		},
		{
			code: 6015,
			name: "PoolMigrationFeeShouldBeLessThanFinalRealSolReserves",
			msg: "pool_migration_fee should be less than final_real_sol_reserves"
		},
		{
			code: 6016,
			name: "PoolMigrationFeeShouldBeGreaterThanCreatorFeePlusMaxMigrateFees",
			msg: "pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES"
		},
		{
			code: 6017,
			name: "DisabledWithdraw",
			msg: "Migrate instruction is disabled"
		},
		{
			code: 6018,
			name: "DisabledMigrate",
			msg: "Migrate instruction is disabled"
		},
		{
			code: 6019,
			name: "InvalidCreator",
			msg: "Invalid creator pubkey"
		},
		{
			code: 6020,
			name: "BuyZeroAmount",
			msg: "Buy zero amount"
		},
		{
			code: 6021,
			name: "NotEnoughTokensToBuy",
			msg: "Not enough tokens to buy"
		},
		{
			code: 6022,
			name: "SellZeroAmount",
			msg: "Sell zero amount"
		},
		{
			code: 6023,
			name: "NotEnoughTokensToSell",
			msg: "Not enough tokens to sell"
		},
		{
			code: 6024,
			name: "Overflow",
			msg: "Overflow"
		},
		{
			code: 6025,
			name: "Truncation",
			msg: "Truncation"
		},
		{
			code: 6026,
			name: "DivisionByZero",
			msg: "Division by zero"
		},
		{
			code: 6027,
			name: "NotEnoughRemainingAccounts",
			msg: "Not enough remaining accounts"
		},
		{
			code: 6028,
			name: "AllFeeRecipientsShouldBeNonZero",
			msg: "All fee recipients should be non-zero"
		},
		{
			code: 6029,
			name: "UnsortedNotUniqueFeeRecipients",
			msg: "Unsorted or not unique fee recipients"
		},
		{
			code: 6030,
			name: "CreatorShouldNotBeZero",
			msg: "Creator should not be zero"
		},
		{
			code: 6031,
			name: "StartTimeInThePast"
		},
		{
			code: 6032,
			name: "EndTimeInThePast"
		},
		{
			code: 6033,
			name: "EndTimeBeforeStartTime"
		},
		{
			code: 6034,
			name: "TimeRangeTooLarge"
		},
		{
			code: 6035,
			name: "EndTimeBeforeCurrentDay"
		},
		{
			code: 6036,
			name: "SupplyUpdateForFinishedRange"
		},
		{
			code: 6037,
			name: "DayIndexAfterEndIndex"
		},
		{
			code: 6038,
			name: "DayInActiveRange"
		},
		{
			code: 6039,
			name: "InvalidIncentiveMint"
		},
		{
			code: 6040,
			name: "BuyNotEnoughSolToCoverRent",
			msg: "Buy: Not enough SOL to cover for rent exemption."
		},
		{
			code: 6041,
			name: "BuyNotEnoughSolToCoverFees",
			msg: "Buy: Not enough SOL to cover for fees."
		},
		{
			code: 6042,
			name: "BuySlippageBelowMinTokensOut",
			msg: "Slippage: Would buy less tokens than expected min_tokens_out"
		},
		{
			code: 6043,
			name: "NameTooLong"
		},
		{
			code: 6044,
			name: "SymbolTooLong"
		},
		{
			code: 6045,
			name: "UriTooLong"
		},
		{
			code: 6046,
			name: "CreateV2Disabled"
		},
		{
			code: 6047,
			name: "CpitializeMayhemFailed"
		},
		{
			code: 6048,
			name: "MayhemModeDisabled"
		},
		{
			code: 6049,
			name: "CreatorMigratedToSharingConfig",
			msg: "creator has been migrated to sharing config"
		},
		{
			code: 6050,
			name: "UnableToDistributeCreatorVaultMigratedToSharingConfig",
			msg: "creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead"
		},
		{
			code: 6051,
			name: "SharingConfigNotActive",
			msg: "Sharing config is not active"
		},
		{
			code: 6052,
			name: "UnableToDistributeCreatorFeesToExecutableRecipient",
			msg: "The recipient account is executable, so it cannot receive lamports, remove it from the team first"
		},
		{
			code: 6053,
			name: "BondingCurveAndSharingConfigCreatorMismatch",
			msg: "Bonding curve creator does not match sharing config"
		},
		{
			code: 6054,
			name: "ShareholdersAndRemainingAccountsMismatch",
			msg: "Remaining accounts do not match shareholders, make sure to pass exactly the same pubkeys in the same order"
		},
		{
			code: 6055,
			name: "InvalidShareBps",
			msg: "Share bps must be greater than 0"
		},
		{
			code: 6056,
			name: "CashbackNotEnabled",
			msg: "Cashback is not enabled"
		},
		{
			code: 6057,
			name: "BuybackFeeRecipientNotAuthorized",
			msg: "Buyback fee recipient not authorized"
		},
		{
			code: 6058,
			name: "AllBuybackFeeRecipientsShouldBeNonZero"
		},
		{
			code: 6059,
			name: "NotUniqueBuybackFeeRecipients"
		},
		{
			code: 6060,
			name: "BuybackBasisPointsOutOfRange",
			msg: "buyback_basis_points must be <= 10_000"
		},
		{
			code: 6061,
			name: "WrongBuybackFeeRecipientsCount",
			msg: "buyback fee recipients require exactly 8 remaining accounts (or none)"
		},
		{
			code: 6062,
			name: "BuybackFeeRecipientMissing"
		},
		{
			code: 6063,
			name: "UnsupportedQuoteMint",
			msg: "Unsupported quote mint"
		},
		{
			code: 6064,
			name: "InvalidQuoteTokenProgram",
			msg: "Create v2: quote token program must be SPL Token or Token-2022"
		},
		{
			code: 6065,
			name: "InvalidAssociatedQuoteBondingCurve",
			msg: "Create v2: associated quote bonding curve address does not match derivation"
		},
		{
			code: 6066,
			name: "QuoteMintWhitelistFull",
			msg: "Quote mint whitelist is full"
		},
		{
			code: 6067,
			name: "QuoteMintAlreadyWhitelisted",
			msg: "Quote mint is already whitelisted"
		},
		{
			code: 6068,
			name: "QuoteMintNotWhitelisted",
			msg: "Quote mint is not in the whitelist"
		},
		{
			code: 6069,
			name: "QuoteMintNotEligibleForWhitelist",
			msg: "Quote mint cannot be added or removed via whitelist (default or native SOL mint)"
		},
		{
			code: 6070,
			name: "UnableToDistributeCreatorFeesToUninitializedAccount",
			msg: "Unable to distribute creator fees to uninitialized account"
		},
		{
			code: 6071,
			name: "MayhemModeQuoteMintNotAllowed",
			msg: "Mayhem mode quote mint not allowed"
		},
		{
			code: 6072,
			name: "MissingCashbackAccounts",
			msg: "Cashback trade is missing the required remaining accounts"
		},
		{
			code: 6073,
			name: "InvalidCashbackAccumulator",
			msg: "Cashback user_volume_accumulator account is invalid"
		},
		{
			code: 6074,
			name: "InvalidBondingCurveV2",
			msg: "bonding_curve_v2 remaining account is missing or invalid"
		},
		{
			code: 6075,
			name: "InvalidQuoteControl",
			msg: "quote_control remaining account does not match derivation or is uninitialized"
		},
		{
			code: 6076,
			name: "InvalidCashbackRecipient",
			msg: "Cashback recipient token account is not owned by user"
		},
		{
			code: 6077,
			name: "CreatorFeeNotConfigurable",
			msg: "Configurable creator fees are disabled"
		},
		{
			code: 6078,
			name: "CreatorFeeBpsOutOfRange",
			msg: "Creator fee basis points must be between 1 and the configured maximum"
		},
		{
			code: 6079,
			name: "CreatorFeeNotEditable",
			msg: "Creator fee is not editable for this bonding curve"
		},
		{
			code: 6080,
			name: "CreatorFeeNotAllowedForCashbackCoin",
			msg: "Creator fee cannot be configured for a cashback coin"
		},
		{
			code: 6081,
			name: "BondingCurveAlreadyMigrated",
			msg: "Bonding curve has already migrated"
		},
		{
			code: 6082,
			name: "CashbackDeprecated",
			msg: "Cashback coins can no longer be created"
		},
		{
			code: 6083,
			name: "HolderRewardCreatorImmutable",
			msg: "The creator of a holder-reward coin cannot be changed"
		},
		{
			code: 6084,
			name: "HolderRewardDisabled",
			msg: "Holder-reward coins are disabled"
		},
		{
			code: 6085,
			name: "HolderRewardRecipientsMismatch",
			msg: "Holder-reward amounts and recipient accounts do not match"
		},
		{
			code: 6086,
			name: "HolderRewardsRentFloor",
			msg: "The holder-rewards PDA cannot be left below its rent-exempt minimum"
		},
		{
			code: 6087,
			name: "HolderRewardTokenAccountMissing",
			msg: "A holder-rewards token account is required on a token quote"
		},
		{
			code: 6088,
			name: "CtoNotAllowedForMayhemCoin",
			msg: "CTO is not allowed on a mayhem-mode coin"
		},
		{
			code: 6089,
			name: "CtoNewCreatorRequired",
			msg: "new_creator is required unless converting to holder rewards"
		},
		{
			code: 6090,
			name: "CtoNewCreatorNotAllowed",
			msg: "new_creator must be omitted when converting to holder rewards"
		},
		{
			code: 6091,
			name: "CreatorFeeNotConfigurableForQuote",
			msg: "Creator fee is not configurable on a SOL or whitelisted quote; the fee schedule applies"
		},
		{
			code: 6092,
			name: "CtoCreatorAccountNotWritable",
			msg: "current_creator must be passed writable so the outgoing creator can be paid"
		},
		{
			code: 6093,
			name: "CtoSharedVaultFrozen",
			msg: "A frozen sharing-config vault account holds a balance; thaw it before the holder conversion"
		},
		{
			code: 6094,
			name: "CashbackCoinNotSupported",
			msg: "v3 trades do not support cashback coins; use the v2 instructions"
		},
		{
			code: 6095,
			name: "CreatorFeesNotSwept",
			msg: "creator_fee must be swept before the creator changes or the vault is distributed"
		},
		{
			code: 6096,
			name: "FeeTiersEmpty",
			msg: "The fee config tier table is empty"
		},
		{
			code: 6097,
			name: "FeeConfigTooShort",
			msg: "The fee config account is shorter than its initialize size"
		},
		{
			code: 6098,
			name: "MultiHopDiscontinuousPath",
			msg: "multi-hop: a hop's input mint is neither side of its bonding curve"
		},
		{
			code: 6099,
			name: "InvalidQuoteBondingCurve",
			msg: "Quote bonding curve remaining account does not match derivation or is uninitialized"
		},
		{
			code: 6100,
			name: "QuoteBondingCurveNotEligible",
			msg: "Quote bonding curve is not eligible as a quote: mayhem mode, or the chain's depth-0 root is quoted in a mint no list admits"
		},
		{
			code: 6101,
			name: "QuotePoolAccountsRequired",
			msg: "A quote-chain bonding curve has migrated: its pool and vault remaining accounts are required"
		},
		{
			code: 6102,
			name: "QuotePoolNotFound",
			msg: "Quote pool remaining account is not an initialized pump-amm pool"
		},
		{
			code: 6103,
			name: "InvalidQuotePool",
			msg: "Quote pool or vault remaining accounts do not match derivation or are invalid"
		},
		{
			code: 6104,
			name: "QuoteReservesOutOfRange",
			msg: "Derived quote reserves are zero"
		},
		{
			code: 6105,
			name: "CurveDepthExceeded",
			msg: "The new curve's depth (quote coin depth plus one) exceeds Global.max_curve_depth or the program's cap of 5"
		},
		{
			code: 6106,
			name: "MultiHopHopFeesMismatch",
			msg: "multi-hop: hop_fees must carry one flag byte per curve hop using only the protocol and creator bits"
		},
		{
			code: 6107,
			name: "QuoteCurveAwaitingMigration",
			msg: "A quote-chain coin's curve is complete but not yet migrated; retry once migrate_v2 creates its pool"
		},
		{
			code: 6108,
			name: "MultiHopMayhemCurveNotSupported",
			msg: "multi-hop: mayhem-mode curves are not routable; use the v2 instructions"
		},
		{
			code: 6109,
			name: "QuoteChainAccountsRequired",
			msg: "The quote coin is nested: a bonding curve remaining account is required for every coin on its quote chain down to the depth-0 root"
		}
	],
	types: [
		{
			name: "AddQuoteControlMintEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "quote_control",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "initial_virtual_quote_reserves",
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
			name: "AdminCtoEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "old_creator",
						type: "pubkey"
					},
					{
						name: "new_creator",
						type: "pubkey"
					},
					{
						name: "is_holder_reward",
						type: "bool"
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					},
					{
						name: "old_creator_fee_bps",
						type: "u64"
					},
					{
						name: "new_creator_fee_bps",
						type: "u64"
					},
					{
						name: "sharing_config_reset",
						type: "bool"
					},
					{
						name: "swept_to_holder_vault",
						type: "u64"
					},
					{
						name: "pool_updated",
						type: "bool"
					}
				]
			}
		},
		{
			name: "AdminSetIdlAuthorityEvent",
			type: {
				kind: "struct",
				fields: [{
					name: "idl_authority",
					type: "pubkey"
				}]
			}
		},
		{
			name: "AdminUpdateTokenIncentivesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "day_number",
						type: "u64"
					},
					{
						name: "token_supply_per_day",
						type: "u64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "seconds_in_a_day",
						type: "i64"
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
						name: "virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "real_token_reserves",
						type: "u64"
					},
					{
						name: "real_quote_reserves",
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
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					},
					{
						name: "can_edit_creator_fee",
						type: "bool"
					},
					{
						name: "is_holder_reward",
						type: "bool"
					},
					{
						name: "creator_fee",
						type: "u64"
					},
					{
						name: "protocol_fees",
						type: "u64"
					},
					{
						name: "depth",
						type: "u8"
					},
					{
						name: "initial_virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "post_complete_base_out",
						type: "u64"
					},
					{
						name: "post_complete_quote_in",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ClaimCashbackEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_claimed",
						type: "u64"
					},
					{
						name: "total_cashback_earned",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ClaimTokenIncentivesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					}
				]
			}
		},
		{
			name: "CloseUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "CollectCreatorFeeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "creator_fee",
						type: "u64"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "CompleteEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "CompletePumpAmmMigrationEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "mint_amount",
						type: "u64"
					},
					{
						name: "sol_amount",
						docs: [
							"The variable is interpreted as `amount` in the offchain services",
							"It is amount in terms of quoteMint for the bondingCurve",
							"The rename is not done yet to avoid breaking changes in offchain services."
						],
						type: "u64"
					},
					{
						name: "pool_migration_fee",
						type: "u64"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "ConfigStatus",
			type: {
				kind: "enum",
				variants: [{ name: "Paused" }, { name: "Active" }]
			}
		},
		{
			name: "CreateEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "name",
						type: "string"
					},
					{
						name: "symbol",
						type: "string"
					},
					{
						name: "uri",
						type: "string"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
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
						name: "token_total_supply",
						type: "u64"
					},
					{
						name: "token_program",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					},
					{
						name: "is_cashback_enabled",
						type: "bool"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					},
					{
						name: "is_holder_reward",
						type: "bool"
					},
					{
						name: "depth",
						type: "u8"
					}
				]
			}
		},
		{
			name: "CurveRunResult",
			type: {
				kind: "struct",
				fields: [{
					name: "amount_out",
					type: "u64"
				}, {
					name: "buyback_fee",
					type: "u64"
				}]
			}
		},
		{
			name: "DistributeCreatorFeesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					},
					{
						name: "distributed",
						type: "u64"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "DistributeFeeToHoldersEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "recipients",
						type: "u64"
					},
					{
						name: "total",
						type: "u64"
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
			name: "FeeConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "flat_fees",
						type: { defined: { name: "Fees" } }
					},
					{
						name: "fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "stable_fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "exotic_flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "FeeTier",
			type: {
				kind: "struct",
				fields: [{
					name: "market_cap_lamports_threshold",
					type: "u128"
				}, {
					name: "fees",
					type: { defined: { name: "Fees" } }
				}]
			}
		},
		{
			name: "Fees",
			type: {
				kind: "struct",
				fields: [
					{
						name: "lp_fee_bps",
						type: "u64"
					},
					{
						name: "protocol_fee_bps",
						type: "u64"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "Global",
			type: {
				kind: "struct",
				fields: [
					{
						name: "initialized",
						docs: ["Unused"],
						type: "bool"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "fee_recipient",
						type: "pubkey"
					},
					{
						name: "initial_virtual_token_reserves",
						type: "u64"
					},
					{
						name: "initial_virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "initial_real_token_reserves",
						type: "u64"
					},
					{
						name: "token_total_supply",
						type: "u64"
					},
					{
						name: "fee_basis_points",
						type: "u64"
					},
					{
						name: "withdraw_authority",
						type: "pubkey"
					},
					{
						name: "enable_migrate",
						docs: ["Unused"],
						type: "bool"
					},
					{
						name: "pool_migration_fee",
						type: "u64"
					},
					{
						name: "creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "fee_recipients",
						type: { array: ["pubkey", 7] }
					},
					{
						name: "set_creator_authority",
						type: "pubkey"
					},
					{
						name: "admin_set_creator_authority",
						type: "pubkey"
					},
					{
						name: "create_v2_enabled",
						type: "bool"
					},
					{
						name: "whitelist_pda",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "mayhem_mode_enabled",
						type: "bool"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					},
					{
						name: "is_cashback_enabled",
						type: "bool"
					},
					{
						name: "buyback_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "buyback_basis_points",
						type: "u64"
					},
					{
						name: "initial_virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "whitelisted_quote_mints",
						type: { array: ["pubkey", 1] }
					},
					{
						name: "creator_fee_configurable",
						type: "bool"
					},
					{
						name: "max_configurable_creator_fee_bps",
						type: "u64"
					},
					{
						name: "holder_reward_claim_authority",
						type: "pubkey"
					},
					{
						name: "is_holder_reward_enabled",
						type: "bool"
					},
					{
						name: "max_curve_depth",
						type: "u8"
					}
				]
			}
		},
		{
			name: "GlobalVolumeAccumulator",
			type: {
				kind: "struct",
				fields: [
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "seconds_in_a_day",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "total_token_supply",
						type: { array: ["u64", 30] }
					},
					{
						name: "sol_volumes",
						type: { array: ["u64", 30] }
					}
				]
			}
		},
		{
			name: "InitUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "payer",
						type: "pubkey"
					},
					{
						name: "user",
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
			name: "MigrateBondingCurveCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "old_creator",
						type: "pubkey"
					},
					{
						name: "new_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "MinimumDistributableFeeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "minimum_required",
						type: "u64"
					},
					{
						name: "distributable_fees",
						type: "u64"
					},
					{
						name: "can_distribute",
						type: "bool"
					}
				]
			}
		},
		{
			name: "OptionBool",
			type: {
				kind: "struct",
				fields: ["bool"]
			}
		},
		{
			name: "OptionU64",
			type: {
				kind: "struct",
				fields: ["u64"]
			}
		},
		{
			name: "PostCompleteBuyEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_out",
						type: "u64"
					},
					{
						name: "quote_in",
						type: "u64"
					},
					{
						name: "fee_basis_points",
						type: "u64"
					},
					{
						name: "fee",
						type: "u64"
					},
					{
						name: "creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "creator_fee",
						type: "u64"
					},
					{
						name: "buyback_fee",
						type: "u64"
					},
					{
						name: "pool_base_reserves_before",
						type: "u64"
					},
					{
						name: "pool_quote_reserves_before",
						type: "u64"
					},
					{
						name: "pool_base_reserves_after",
						type: "u64"
					},
					{
						name: "pool_quote_reserves_after",
						type: "u64"
					}
				]
			}
		},
		{
			name: "QuoteControl",
			type: {
				kind: "struct",
				fields: [
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "reserves_admin",
						type: "pubkey"
					},
					{
						name: "_reserved",
						type: { array: ["u8", 32] }
					},
					{
						name: "mints",
						type: { vec: { defined: { name: "QuoteControlMint" } } }
					}
				]
			}
		},
		{
			name: "QuoteControlMint",
			type: {
				kind: "struct",
				fields: [{
					name: "mint",
					type: "pubkey"
				}, {
					name: "initial_virtual_quote_reserves",
					type: "u64"
				}]
			}
		},
		{
			name: "RemoveQuoteControlMintEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "quote_control",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "quote_mint",
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
			name: "ReservedFeeRecipientsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					}
				]
			}
		},
		{
			name: "SetCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetMetaplexCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "metadata",
						type: "pubkey"
					},
					{
						name: "creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetParamsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "initial_virtual_token_reserves",
						type: "u64"
					},
					{
						name: "initial_virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "initial_real_token_reserves",
						type: "u64"
					},
					{
						name: "final_real_sol_reserves",
						type: "u64"
					},
					{
						name: "token_total_supply",
						type: "u64"
					},
					{
						name: "fee_basis_points",
						type: "u64"
					},
					{
						name: "withdraw_authority",
						type: "pubkey"
					},
					{
						name: "enable_migrate",
						type: "bool"
					},
					{
						name: "pool_migration_fee",
						type: "u64"
					},
					{
						name: "creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "set_creator_authority",
						type: "pubkey"
					},
					{
						name: "admin_set_creator_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetQuoteControlAdminEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "quote_control",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "old_admin",
						type: "pubkey"
					},
					{
						name: "new_admin",
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
			name: "SetQuoteControlMintReservesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "quote_control",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "old_initial_virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "new_initial_virtual_quote_reserves",
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
			name: "SetQuoteControlReservesAdminEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "quote_control",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "old_reserves_admin",
						type: "pubkey"
					},
					{
						name: "new_reserves_admin",
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
			name: "Shareholder",
			type: {
				kind: "struct",
				fields: [{
					name: "address",
					type: "pubkey"
				}, {
					name: "share_bps",
					type: "u16"
				}]
			}
		},
		{
			name: "SharingConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "version",
						type: "u8"
					},
					{
						name: "status",
						type: { defined: { name: "ConfigStatus" } }
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "admin_revoked",
						type: "bool"
					},
					{
						name: "shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					}
				]
			}
		},
		{
			name: "SweepBondingCurveFeeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "recipient",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "bucket",
						type: "u8"
					}
				]
			}
		},
		{
			name: "SyncUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "total_claimed_tokens_before",
						type: "u64"
					},
					{
						name: "total_claimed_tokens_after",
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
			name: "TradeEvent",
			docs: ["ix_name: \"buy\" | \"sell\" | \"buy_exact_sol_in\""],
			type: {
				kind: "struct",
				fields: [
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "sol_amount",
						type: "u64"
					},
					{
						name: "token_amount",
						type: "u64"
					},
					{
						name: "is_buy",
						type: "bool"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "virtual_token_reserves",
						type: "u64"
					},
					{
						name: "real_sol_reserves",
						type: "u64"
					},
					{
						name: "real_token_reserves",
						type: "u64"
					},
					{
						name: "fee_recipient",
						type: "pubkey"
					},
					{
						name: "fee_basis_points",
						type: "u64"
					},
					{
						name: "fee",
						type: "u64"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "creator_fee",
						type: "u64"
					},
					{
						name: "track_volume",
						type: "bool"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					},
					{
						name: "ix_name",
						type: "string"
					},
					{
						name: "mayhem_mode",
						type: "bool"
					},
					{
						name: "cashback_fee_basis_points",
						type: "u64"
					},
					{
						name: "cashback",
						type: "u64"
					},
					{
						name: "buyback_fee_basis_points",
						type: "u64"
					},
					{
						name: "buyback_fee",
						type: "u64"
					},
					{
						name: "shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "quote_amount",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "real_quote_reserves",
						type: "u64"
					},
					{
						name: "holder_rewards_bps",
						type: "u64"
					},
					{
						name: "holder_rewards",
						type: "u64"
					},
					{
						name: "creator_fee_unclaimed",
						type: "u64"
					}
				]
			}
		},
		{
			name: "UpdateCreatorFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "creator_fee_configurable",
						type: "bool"
					},
					{
						name: "max_configurable_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "UpdateGlobalAuthorityEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "global",
						type: "pubkey"
					},
					{
						name: "authority",
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
			name: "UpdateMayhemVirtualParamsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "virtual_token_reserves",
						type: "u64"
					},
					{
						name: "virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "new_virtual_token_reserves",
						type: "u64"
					},
					{
						name: "new_virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "real_token_reserves",
						type: "u64"
					},
					{
						name: "real_sol_reserves",
						type: "u64"
					}
				]
			}
		},
		{
			name: "UserVolumeAccumulator",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "needs_claim",
						type: "bool"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					},
					{
						name: "has_total_claimed_tokens",
						type: "bool"
					},
					{
						name: "cashback_earned",
						type: "u64"
					},
					{
						name: "total_cashback_claimed",
						type: "u64"
					},
					{
						name: "stable_cashback_earned",
						type: "u64"
					},
					{
						name: "total_stable_cashback_claimed",
						type: "u64"
					}
				]
			}
		}
	]
};
var NoShareholdersError = class extends Error {
	constructor() {
		super("No shareholders provided");
		this.name = "NoShareholdersError";
	}
};
var TooManyShareholdersError = class extends Error {
	constructor(count, max) {
		super(`Too many shareholders. Maximum allowed is ${max}, got ${count}`);
		this.count = count;
		this.max = max;
		this.name = "TooManyShareholdersError";
	}
};
var ZeroShareError = class extends Error {
	constructor(address) {
		super(`Zero or negative share not allowed for address ${address}`);
		this.address = address;
		this.name = "ZeroShareError";
	}
};
var InvalidShareTotalError = class extends Error {
	constructor(total) {
		super(`Invalid share total. Must equal 10,000 basis points (100%). Got ${total}`);
		this.total = total;
		this.name = "InvalidShareTotalError";
	}
};
var DuplicateShareholderError = class extends Error {
	constructor() {
		super("Duplicate shareholder addresses not allowed");
		this.name = "DuplicateShareholderError";
	}
};
var CreatorFeeNotConfigurableError = class extends Error {
	constructor() {
		super("Configurable creator fees are disabled (Global.creatorFeeConfigurable is false)");
		this.name = "CreatorFeeNotConfigurableError";
	}
};
var CreatorFeeBpsOutOfRangeError = class extends Error {
	constructor(creatorFeeBps, max) {
		super(`Creator fee of ${creatorFeeBps.toString()} bps is outside 1..=${max.toString()} (Global.maxConfigurableCreatorFeeBps)`);
		this.creatorFeeBps = creatorFeeBps;
		this.max = max;
		this.name = "CreatorFeeBpsOutOfRangeError";
	}
};
var CashbackDeprecatedError = class extends Error {
	constructor(mint) {
		super(`Cashback coins can no longer be created (mint ${mint.toBase58()}): is_cashback_enabled is deprecated`);
		this.mint = mint;
		this.name = "CashbackDeprecatedError";
	}
};
var HolderRewardDisabledError = class extends Error {
	constructor() {
		super("Holder-reward coins are disabled (Global.isHolderRewardEnabled is false)");
		this.name = "HolderRewardDisabledError";
	}
};
var CashbackCoinNotSupportedError = class extends Error {
	constructor(mint) {
		super(`v3 trades do not support cashback coin ${mint.toBase58()}; use the v2 instructions`);
		this.mint = mint;
		this.name = "CashbackCoinNotSupportedError";
	}
};
new import_bn.default(0x38d7ea4c68000);
Object.freeze([
	PublicKey.default,
	NATIVE_MINT,
	NATIVE_MINT_2022
]);
Object.freeze([new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")]);
function getFeeRecipient(global, mayhemMode) {
	const [primary, ...others] = mayhemMode ? [global.reservedFeeRecipient, ...global.reservedFeeRecipients] : [global.feeRecipient, ...global.feeRecipients];
	const feeRecipients = [primary, ...others].filter((key) => !key.equals(PublicKey.default));
	if (feeRecipients.length === 0) return primary;
	return feeRecipients[Math.floor(Math.random() * feeRecipients.length)];
}
var pump_amm_default = {
	address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
	metadata: {
		name: "pump_amm",
		version: "0.1.0",
		spec: "0.1.0",
		description: "Created with Anchor"
	},
	instructions: [
		{
			name: "admin_cto_pool",
			discriminator: [
				45,
				61,
				165,
				151,
				104,
				0,
				49,
				189
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "pool",
					writable: true
				},
				{
					name: "pool_authority",
					signer: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								112,
								111,
								111,
								108,
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
							path: "pool.base_mint",
							account: "Pool"
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
					name: "coin_creator",
					type: "pubkey"
				},
				{
					name: "is_holder_reward",
					type: "bool"
				},
				{
					name: "creator_fee_bps",
					type: { option: "u64" }
				}
			]
		},
		{
			name: "admin_update_token_incentives",
			discriminator: [
				209,
				11,
				115,
				87,
				213,
				23,
				124,
				204
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					relations: ["global_config"]
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
							95,
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
					name: "global_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{ name: "mint" },
				{
					name: "global_incentive_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "global_volume_accumulator"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{ name: "token_program" },
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
					name: "start_time",
					type: "i64"
				},
				{
					name: "end_time",
					type: "i64"
				},
				{
					name: "seconds_in_a_day",
					type: "i64"
				},
				{
					name: "day_number",
					type: "u64"
				},
				{
					name: "token_supply_per_day",
					type: "u64"
				}
			]
		},
		{
			name: "boost_buy_and_burn",
			discriminator: [
				105,
				68,
				6,
				175,
				0,
				7,
				35,
				162
			],
			accounts: [
				{ name: "pool" },
				{
					name: "authority",
					writable: true,
					signer: true
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
							95,
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
					name: "base_mint",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "boost_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							98,
							111,
							111,
							115,
							116,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool"
					}] }
				},
				{
					name: "boost_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "boost_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
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
				name: "quote_amount_in",
				type: "u64"
			}, {
				name: "min_base_amount_burned",
				type: "u64"
			}]
		},
		{
			name: "buy",
			docs: ["For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].", "If provided and valid, the ATA will be initialized if needed."],
			discriminator: [
				102,
				6,
				61,
				18,
				1,
				218,
				235,
				234
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "protocol_fee_recipient" },
				{
					name: "protocol_fee_recipient_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "protocol_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool.coin_creator",
						account: "Pool"
					}] }
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [
				{
					name: "base_amount_out",
					type: "u64"
				},
				{
					name: "max_quote_amount_in",
					type: "u64"
				},
				{
					name: "track_volume",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_exact_quote_in",
			docs: [
				"Given a budget of spendable_quote_in, buy at least min_base_amount_out",
				"Fees will be deducted from spendable_quote_in",
				"",
				"f(quote) = tokens, where tokens >= min_base_amount_out",
				"",
				"Make sure the payer has enough SOL to cover creation of the following accounts (unless already created):",
				"- protocol_fee_recipient_token_account: rent.minimum_balance(TokenAccount::LEN)",
				"- coin_creator_vault_ata: rent.minimum_balance(TokenAccount::LEN)",
				"- user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)",
				"",
				"For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].",
				"If provided and valid, the ATA will be initialized if needed."
			],
			discriminator: [
				198,
				46,
				21,
				82,
				180,
				217,
				232,
				112
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "protocol_fee_recipient" },
				{
					name: "protocol_fee_recipient_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "protocol_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool.coin_creator",
						account: "Pool"
					}] }
				},
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [
				{
					name: "spendable_quote_in",
					type: "u64"
				},
				{
					name: "min_base_amount_out",
					type: "u64"
				},
				{
					name: "track_volume",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "buy_exact_quote_in_v2",
			discriminator: [
				194,
				171,
				28,
				70,
				104,
				77,
				91,
				47
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "buyback_fee_recipient",
					writable: true
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				}
			],
			args: [{
				name: "spendable_quote_in",
				type: "u64"
			}, {
				name: "min_base_amount_out",
				type: "u64"
			}]
		},
		{
			name: "buy_v2",
			discriminator: [
				184,
				23,
				238,
				97,
				103,
				197,
				211,
				61
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "buyback_fee_recipient",
					writable: true
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				}
			],
			args: [{
				name: "base_amount_out",
				type: "u64"
			}, {
				name: "max_quote_amount_in",
				type: "u64"
			}]
		},
		{
			name: "claim_cashback",
			docs: ["Pays out the user's accrued cashback. `user_wsol_token_account` may be any token account", "of `quote_mint` owned by `user`, not only the associated one."],
			discriminator: [
				37,
				58,
				35,
				126,
				190,
				53,
				228,
				197
			],
			accounts: [
				{
					name: "user",
					writable: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{
					name: "user_volume_accumulator_wsol_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user_volume_accumulator"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "user_wsol_token_account",
					writable: true
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				}
			],
			args: []
		},
		{
			name: "claim_token_incentives",
			discriminator: [
				16,
				4,
				71,
				28,
				204,
				1,
				40,
				27
			],
			accounts: [
				{ name: "user" },
				{
					name: "user_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "user"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "global_incentive_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "global_volume_accumulator"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "mint",
					relations: ["global_volume_accumulator"]
				},
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "payer",
					writable: true,
					signer: true
				}
			],
			args: []
		},
		{
			name: "close_user_volume_accumulator",
			discriminator: [
				249,
				69,
				164,
				218,
				150,
				103,
				84,
				138
			],
			accounts: [
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "collect_coin_creator_fee",
			discriminator: [
				160,
				57,
				89,
				42,
				181,
				139,
				43,
				66
			],
			accounts: [
				{ name: "quote_mint" },
				{ name: "quote_token_program" },
				{ name: "coin_creator" },
				{
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "coin_creator"
					}] }
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_token_account",
					writable: true
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
			name: "create_config",
			discriminator: [
				201,
				207,
				243,
				114,
				75,
				111,
				47,
				189
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					address: "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8"
				},
				{
					name: "global_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
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
			args: [
				{
					name: "lp_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_recipients",
					type: { array: ["pubkey", 8] }
				},
				{
					name: "coin_creator_fee_basis_points",
					type: "u64"
				},
				{
					name: "admin_set_coin_creator_authority",
					type: "pubkey"
				}
			]
		},
		{
			name: "create_pool",
			discriminator: [
				233,
				146,
				209,
				142,
				207,
				104,
				64,
				188
			],
			accounts: [
				{
					name: "pool",
					writable: true,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								111,
								111,
								108
							]
						},
						{
							kind: "arg",
							path: "index"
						},
						{
							kind: "account",
							path: "creator"
						},
						{
							kind: "account",
							path: "base_mint"
						},
						{
							kind: "account",
							path: "quote_mint"
						}
					] }
				},
				{ name: "global_config" },
				{
					name: "creator",
					writable: true,
					signer: true
				},
				{ name: "base_mint" },
				{ name: "quote_mint" },
				{
					name: "lp_mint",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							112,
							111,
							111,
							108,
							95,
							108,
							112,
							95,
							109,
							105,
							110,
							116
						]
					}, {
						kind: "account",
						path: "pool"
					}] }
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "user_pool_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "creator"
							},
							{
								kind: "account",
								path: "token_2022_program"
							},
							{
								kind: "account",
								path: "lp_mint"
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
					name: "pool_base_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "base_token_program"
							},
							{
								kind: "account",
								path: "base_mint"
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
					name: "pool_quote_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pool"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
				},
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
					name: "index",
					type: "u16"
				},
				{
					name: "base_amount_in",
					type: "u64"
				},
				{
					name: "quote_amount_in",
					type: "u64"
				},
				{
					name: "coin_creator",
					type: "pubkey"
				},
				{
					name: "is_mayhem_mode",
					type: "bool"
				},
				{
					name: "is_cashback_coin",
					type: { defined: { name: "OptionBool" } }
				},
				{
					name: "creator_fee_bps",
					type: { defined: { name: "OptionU64" } }
				},
				{
					name: "can_edit_creator_fee",
					type: { defined: { name: "OptionBool" } }
				},
				{
					name: "is_holder_reward",
					type: { defined: { name: "OptionBool" } }
				}
			]
		},
		{
			name: "deposit",
			discriminator: [
				242,
				35,
				198,
				137,
				82,
				225,
				242,
				182
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{ name: "global_config" },
				{
					name: "user",
					signer: true
				},
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "lp_mint",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "user_pool_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
					name: "lp_token_amount_out",
					type: "u64"
				},
				{
					name: "max_base_amount_in",
					type: "u64"
				},
				{
					name: "max_quote_amount_in",
					type: "u64"
				}
			]
		},
		{
			name: "disable",
			discriminator: [
				185,
				173,
				187,
				90,
				216,
				15,
				238,
				233
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
					name: "disable_create_pool",
					type: "bool"
				},
				{
					name: "disable_deposit",
					type: "bool"
				},
				{
					name: "disable_withdraw",
					type: "bool"
				},
				{
					name: "disable_buy",
					type: "bool"
				},
				{
					name: "disable_sell",
					type: "bool"
				}
			]
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
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
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
			name: "init_boost",
			discriminator: [
				140,
				233,
				33,
				94,
				132,
				90,
				194,
				143
			],
			accounts: [
				{
					name: "pool",
					writable: true
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
							95,
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
					name: "creator",
					writable: true,
					signer: true
				},
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "pool_base_token_account",
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "boost_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							98,
							111,
							111,
							115,
							116,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool"
					}] }
				},
				{
					name: "boost_vault",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "boost_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
			name: "init_user_volume_accumulator",
			discriminator: [
				94,
				6,
				202,
				115,
				255,
				96,
				232,
				183
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "user" },
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "migrate_pool_coin_creator",
			docs: ["Migrate Pool Coin Creator to Sharing Config"],
			discriminator: [
				208,
				8,
				159,
				4,
				74,
				175,
				16,
				58
			],
			accounts: [
				{
					name: "pool",
					writable: true,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								112,
								111,
								111,
								108
							]
						},
						{
							kind: "account",
							path: "pool.index",
							account: "Pool"
						},
						{
							kind: "account",
							path: "pool.creator",
							account: "Pool"
						},
						{
							kind: "account",
							path: "pool.base_mint",
							account: "Pool"
						},
						{
							kind: "account",
							path: "pool.quote_mint",
							account: "Pool"
						}
					] }
				},
				{
					name: "sharing_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								115,
								104,
								97,
								114,
								105,
								110,
								103,
								45,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "account",
							path: "pool.base_mint",
							account: "Pool"
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
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
			name: "multi_hop_swap",
			discriminator: [
				43,
				100,
				73,
				19,
				233,
				246,
				111,
				148
			],
			accounts: [
				{
					name: "user",
					writable: true,
					signer: true
				},
				{
					name: "user_in_token_account",
					writable: true
				},
				{
					name: "user_out_token_account",
					writable: true
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
							95,
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
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "buyback_fee_recipient",
					writable: true
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "pump_program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{ name: "pump_global" },
				{ name: "pump_fee_config" },
				{ name: "pump_event_authority" }
			],
			args: [{
				name: "amount_in",
				type: "u64"
			}, {
				name: "min_amount_out",
				type: "u64"
			}]
		},
		{
			name: "sell",
			discriminator: [
				51,
				230,
				133,
				164,
				1,
				127,
				131,
				173
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "protocol_fee_recipient" },
				{
					name: "protocol_fee_recipient_token_account",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "protocol_fee_recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "coin_creator_vault_authority",
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "pool.coin_creator",
						account: "Pool"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "account",
							path: "fee_program"
						}
					}
				},
				{
					name: "fee_program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [{
				name: "base_amount_in",
				type: "u64"
			}, {
				name: "min_quote_amount_out",
				type: "u64"
			}]
		},
		{
			name: "sell_v2",
			discriminator: [
				93,
				246,
				130,
				60,
				231,
				233,
				64,
				178
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "user",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{ name: "base_token_program" },
				{ name: "quote_token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
					}] }
				},
				{
					name: "fee_config",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								102,
								101,
								101,
								95,
								99,
								111,
								110,
								102,
								105,
								103
							]
						}, {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}],
						program: {
							kind: "const",
							value: [
								12,
								53,
								255,
								169,
								5,
								90,
								142,
								86,
								141,
								168,
								247,
								188,
								7,
								86,
								21,
								39,
								76,
								241,
								201,
								44,
								164,
								31,
								64,
								0,
								156,
								81,
								106,
								164,
								20,
								194,
								124,
								112
							]
						}
					}
				},
				{
					name: "buyback_fee_recipient",
					writable: true
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
				{
					name: "program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				}
			],
			args: [{
				name: "base_amount_in",
				type: "u64"
			}, {
				name: "min_quote_amount_out",
				type: "u64"
			}]
		},
		{
			name: "set_boost_authority",
			discriminator: [
				227,
				149,
				76,
				42,
				130,
				39,
				234,
				205
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
				},
				{ name: "boost_authority" },
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
			name: "set_coin_creator",
			docs: ["Sets Pool::coin_creator from Metaplex metadata creator or BondingCurve::creator"],
			discriminator: [
				210,
				149,
				128,
				45,
				188,
				58,
				78,
				175
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{
					name: "metadata",
					pda: {
						seeds: [
							{
								kind: "const",
								value: [
									109,
									101,
									116,
									97,
									100,
									97,
									116,
									97
								]
							},
							{
								kind: "const",
								value: [
									11,
									112,
									101,
									177,
									227,
									209,
									124,
									69,
									56,
									157,
									82,
									127,
									107,
									4,
									195,
									205,
									88,
									184,
									108,
									115,
									26,
									160,
									253,
									181,
									73,
									182,
									209,
									188,
									3,
									248,
									41,
									70
								]
							},
							{
								kind: "account",
								path: "pool.base_mint",
								account: "Pool"
							}
						],
						program: {
							kind: "const",
							value: [
								11,
								112,
								101,
								177,
								227,
								209,
								124,
								69,
								56,
								157,
								82,
								127,
								107,
								4,
								195,
								205,
								88,
								184,
								108,
								115,
								26,
								160,
								253,
								181,
								73,
								182,
								209,
								188,
								3,
								248,
								41,
								70
							]
						}
					}
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
							path: "pool.base_mint",
							account: "Pool"
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
			name: "set_reserved_fee_recipients",
			discriminator: [
				111,
				172,
				162,
				232,
				114,
				89,
				213,
				142
			],
			accounts: [
				{
					name: "global_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
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
					name: "admin",
					signer: true,
					relations: ["global_config"]
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
				name: "whitelist_pda",
				type: "pubkey"
			}]
		},
		{
			name: "sweep_creator_fee",
			discriminator: [
				32,
				246,
				191,
				52,
				8,
				201,
				73,
				186
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "pool",
					writable: true
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{ name: "quote_token_program" },
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "recipient",
					docs: ["protocol fee recipient (`check_protocol_fee_recipient`) or the coin-creator vault", "authority PDA of `pool.coin_creator`."]
				},
				{
					name: "recipient_token_account",
					docs: ["idempotently when missing (the payer pays)."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
			name: "sweep_protocol_fee",
			discriminator: [
				8,
				48,
				190,
				7,
				182,
				68,
				183,
				229
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "global_config" },
				{
					name: "pool",
					writable: true
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{ name: "quote_token_program" },
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "recipient",
					docs: ["protocol fee recipient (`check_protocol_fee_recipient`) or the coin-creator vault", "authority PDA of `pool.coin_creator`."]
				},
				{
					name: "recipient_token_account",
					docs: ["idempotently when missing (the payer pays)."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
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
			name: "sync_user_volume_accumulator",
			discriminator: [
				86,
				31,
				192,
				87,
				163,
				87,
				79,
				238
			],
			accounts: [
				{ name: "user" },
				{
					name: "global_volume_accumulator",
					pda: { seeds: [{
						kind: "const",
						value: [
							103,
							108,
							111,
							98,
							97,
							108,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}] }
				},
				{
					name: "user_volume_accumulator",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							117,
							115,
							101,
							114,
							95,
							118,
							111,
							108,
							117,
							109,
							101,
							95,
							97,
							99,
							99,
							117,
							109,
							117,
							108,
							97,
							116,
							111,
							114
						]
					}, {
						kind: "account",
						path: "user"
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
			args: []
		},
		{
			name: "toggle_boost",
			discriminator: [
				117,
				161,
				160,
				74,
				223,
				137,
				118,
				99
			],
			accounts: [{
				name: "admin",
				signer: true,
				relations: ["global_config"]
			}, {
				name: "global_config",
				writable: true
			}],
			args: [{
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "toggle_cashback_enabled",
			discriminator: [
				115,
				103,
				224,
				255,
				189,
				89,
				86,
				195
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "toggle_mayhem_mode",
			discriminator: [
				1,
				9,
				111,
				208,
				100,
				31,
				255,
				163
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "enabled",
				type: "bool"
			}]
		},
		{
			name: "transfer_creator_fees_to_pump",
			docs: [
				"Transfer creator fees to pump creator vault",
				"If coin creator fees are currently below rent.minimum_balance(TokenAccount::LEN)",
				"The transfer will be skipped"
			],
			discriminator: [
				139,
				52,
				134,
				85,
				228,
				229,
				108,
				241
			],
			accounts: [
				{
					name: "wsol_mint",
					docs: ["Pump Canonical Pool are quoted in wSOL"]
				},
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "coin_creator" },
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "coin_creator"
					}] }
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "wsol_mint"
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
					name: "pump_creator_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "coin_creator"
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
			name: "transfer_creator_fees_to_pump_v2",
			discriminator: [
				1,
				33,
				78,
				185,
				33,
				67,
				44,
				92
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{ name: "quote_mint" },
				{ name: "token_program" },
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "coin_creator" },
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							99,
							114,
							101,
							97,
							116,
							111,
							114,
							95,
							118,
							97,
							117,
							108,
							116
						]
					}, {
						kind: "account",
						path: "coin_creator"
					}] }
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
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
					name: "pump_creator_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "coin_creator"
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
					name: "pump_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pump_creator_vault"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
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
			name: "update_admin",
			discriminator: [
				161,
				176,
				40,
				213,
				60,
				184,
				179,
				228
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
				},
				{ name: "new_admin" },
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
			name: "update_buyback_config",
			discriminator: [
				251,
				224,
				171,
				146,
				160,
				26,
				113,
				233
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "buyback_basis_points",
				type: { option: "u64" }
			}]
		},
		{
			name: "update_creator_fee_config",
			discriminator: [
				61,
				175,
				160,
				249,
				66,
				66,
				136,
				175
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
				name: "creator_fee_configurable",
				type: "bool"
			}, {
				name: "max_configurable_creator_fee_bps",
				type: "u64"
			}]
		},
		{
			name: "update_fee_config",
			discriminator: [
				104,
				184,
				103,
				242,
				88,
				151,
				107,
				20
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["global_config"]
				},
				{
					name: "global_config",
					writable: true
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
					name: "lp_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_basis_points",
					type: "u64"
				},
				{
					name: "protocol_fee_recipients",
					type: { array: ["pubkey", 8] }
				},
				{
					name: "coin_creator_fee_basis_points",
					type: "u64"
				},
				{
					name: "admin_set_coin_creator_authority",
					type: "pubkey"
				}
			]
		},
		{
			name: "withdraw",
			discriminator: [
				183,
				18,
				70,
				156,
				148,
				109,
				161,
				34
			],
			accounts: [
				{
					name: "pool",
					writable: true
				},
				{ name: "global_config" },
				{
					name: "user",
					signer: true
				},
				{
					name: "base_mint",
					relations: ["pool"]
				},
				{
					name: "quote_mint",
					relations: ["pool"]
				},
				{
					name: "lp_mint",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "user_base_token_account",
					writable: true
				},
				{
					name: "user_quote_token_account",
					writable: true
				},
				{
					name: "user_pool_token_account",
					writable: true
				},
				{
					name: "pool_base_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "pool_quote_token_account",
					writable: true,
					relations: ["pool"]
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "token_2022_program",
					address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
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
					name: "lp_token_amount_in",
					type: "u64"
				},
				{
					name: "min_base_amount_out",
					type: "u64"
				},
				{
					name: "min_quote_amount_out",
					type: "u64"
				}
			]
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
			name: "FeeConfig",
			discriminator: [
				143,
				52,
				146,
				187,
				219,
				123,
				76,
				155
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
			name: "GlobalVolumeAccumulator",
			discriminator: [
				202,
				42,
				246,
				43,
				142,
				190,
				30,
				255
			]
		},
		{
			name: "Pool",
			discriminator: [
				241,
				154,
				109,
				4,
				17,
				177,
				109,
				188
			]
		},
		{
			name: "SharingConfig",
			discriminator: [
				216,
				74,
				9,
				0,
				56,
				140,
				93,
				75
			]
		},
		{
			name: "UserVolumeAccumulator",
			discriminator: [
				86,
				255,
				112,
				14,
				102,
				53,
				154,
				250
			]
		}
	],
	events: [
		{
			name: "AdminCtoPoolEvent",
			discriminator: [
				47,
				35,
				163,
				249,
				150,
				157,
				147,
				122
			]
		},
		{
			name: "AdminUpdateTokenIncentivesEvent",
			discriminator: [
				147,
				250,
				108,
				120,
				247,
				29,
				67,
				222
			]
		},
		{
			name: "BoostBuyAndBurnEvent",
			discriminator: [
				63,
				69,
				28,
				22,
				48,
				92,
				194,
				185
			]
		},
		{
			name: "BuyEvent",
			discriminator: [
				103,
				244,
				82,
				31,
				44,
				245,
				119,
				119
			]
		},
		{
			name: "ClaimCashbackEvent",
			discriminator: [
				226,
				214,
				246,
				33,
				7,
				242,
				147,
				229
			]
		},
		{
			name: "ClaimTokenIncentivesEvent",
			discriminator: [
				79,
				172,
				246,
				49,
				205,
				91,
				206,
				232
			]
		},
		{
			name: "CloseUserVolumeAccumulatorEvent",
			discriminator: [
				146,
				159,
				189,
				172,
				146,
				88,
				56,
				244
			]
		},
		{
			name: "CollectCoinCreatorFeeEvent",
			discriminator: [
				232,
				245,
				194,
				238,
				234,
				218,
				58,
				89
			]
		},
		{
			name: "CreateConfigEvent",
			discriminator: [
				107,
				52,
				89,
				129,
				55,
				226,
				81,
				22
			]
		},
		{
			name: "CreatePoolEvent",
			discriminator: [
				177,
				49,
				12,
				210,
				160,
				118,
				167,
				116
			]
		},
		{
			name: "DepositEvent",
			discriminator: [
				120,
				248,
				61,
				83,
				31,
				142,
				107,
				144
			]
		},
		{
			name: "DisableEvent",
			discriminator: [
				107,
				253,
				193,
				76,
				228,
				202,
				27,
				104
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
			name: "InitBoostEvent",
			discriminator: [
				174,
				124,
				74,
				249,
				4,
				81,
				246,
				17
			]
		},
		{
			name: "InitUserVolumeAccumulatorEvent",
			discriminator: [
				134,
				36,
				13,
				72,
				232,
				101,
				130,
				216
			]
		},
		{
			name: "MigratePoolCoinCreatorEvent",
			discriminator: [
				170,
				221,
				82,
				199,
				147,
				165,
				247,
				46
			]
		},
		{
			name: "ReservedFeeRecipientsEvent",
			discriminator: [
				43,
				188,
				250,
				18,
				221,
				75,
				187,
				95
			]
		},
		{
			name: "SellEvent",
			discriminator: [
				62,
				47,
				55,
				10,
				165,
				3,
				220,
				42
			]
		},
		{
			name: "SetBondingCurveCoinCreatorEvent",
			discriminator: [
				242,
				231,
				235,
				102,
				65,
				99,
				189,
				211
			]
		},
		{
			name: "SetBoostAuthorityEvent",
			discriminator: [
				89,
				128,
				240,
				141,
				91,
				202,
				71,
				105
			]
		},
		{
			name: "SetMetaplexCoinCreatorEvent",
			discriminator: [
				150,
				107,
				199,
				123,
				124,
				207,
				102,
				228
			]
		},
		{
			name: "SweepPoolFeeEvent",
			discriminator: [
				130,
				164,
				36,
				97,
				228,
				130,
				135,
				165
			]
		},
		{
			name: "SyncUserVolumeAccumulatorEvent",
			discriminator: [
				197,
				122,
				167,
				124,
				116,
				81,
				91,
				255
			]
		},
		{
			name: "UpdateAdminEvent",
			discriminator: [
				225,
				152,
				171,
				87,
				246,
				63,
				66,
				234
			]
		},
		{
			name: "UpdateCreatorFeeConfigEvent",
			discriminator: [
				152,
				198,
				124,
				124,
				106,
				246,
				127,
				191
			]
		},
		{
			name: "UpdateFeeConfigEvent",
			discriminator: [
				90,
				23,
				65,
				35,
				62,
				244,
				188,
				208
			]
		},
		{
			name: "WithdrawEvent",
			discriminator: [
				22,
				9,
				133,
				26,
				160,
				44,
				71,
				192
			]
		}
	],
	errors: [
		{
			code: 6e3,
			name: "FeeBasisPointsExceedsMaximum"
		},
		{
			code: 6001,
			name: "ZeroBaseAmount"
		},
		{
			code: 6002,
			name: "ZeroQuoteAmount"
		},
		{
			code: 6003,
			name: "TooLittlePoolTokenLiquidity"
		},
		{
			code: 6004,
			name: "ExceededSlippage"
		},
		{
			code: 6005,
			name: "InvalidAdmin"
		},
		{
			code: 6006,
			name: "UnsupportedBaseMint"
		},
		{
			code: 6007,
			name: "UnsupportedQuoteMint"
		},
		{
			code: 6008,
			name: "InvalidBaseMint"
		},
		{
			code: 6009,
			name: "InvalidQuoteMint"
		},
		{
			code: 6010,
			name: "InvalidLpMint"
		},
		{
			code: 6011,
			name: "AllProtocolFeeRecipientsShouldBeNonZero"
		},
		{
			code: 6012,
			name: "UnsortedNotUniqueProtocolFeeRecipients"
		},
		{
			code: 6013,
			name: "InvalidProtocolFeeRecipient"
		},
		{
			code: 6014,
			name: "InvalidPoolBaseTokenAccount"
		},
		{
			code: 6015,
			name: "InvalidPoolQuoteTokenAccount"
		},
		{
			code: 6016,
			name: "BuyMoreBaseAmountThanPoolReserves"
		},
		{
			code: 6017,
			name: "DisabledCreatePool"
		},
		{
			code: 6018,
			name: "DisabledDeposit"
		},
		{
			code: 6019,
			name: "DisabledWithdraw"
		},
		{
			code: 6020,
			name: "DisabledBuy"
		},
		{
			code: 6021,
			name: "DisabledSell"
		},
		{
			code: 6022,
			name: "SameMint"
		},
		{
			code: 6023,
			name: "Overflow"
		},
		{
			code: 6024,
			name: "Truncation"
		},
		{
			code: 6025,
			name: "DivisionByZero"
		},
		{
			code: 6026,
			name: "NewSizeLessThanCurrentSize"
		},
		{
			code: 6027,
			name: "AccountTypeNotSupported"
		},
		{
			code: 6028,
			name: "OnlyCanonicalPumpPoolsCanHaveCoinCreator"
		},
		{
			code: 6029,
			name: "InvalidAdminSetCoinCreatorAuthority"
		},
		{
			code: 6030,
			name: "StartTimeInThePast"
		},
		{
			code: 6031,
			name: "EndTimeInThePast"
		},
		{
			code: 6032,
			name: "EndTimeBeforeStartTime"
		},
		{
			code: 6033,
			name: "TimeRangeTooLarge"
		},
		{
			code: 6034,
			name: "EndTimeBeforeCurrentDay"
		},
		{
			code: 6035,
			name: "SupplyUpdateForFinishedRange"
		},
		{
			code: 6036,
			name: "DayIndexAfterEndIndex"
		},
		{
			code: 6037,
			name: "DayInActiveRange"
		},
		{
			code: 6038,
			name: "InvalidIncentiveMint"
		},
		{
			code: 6039,
			name: "BuyNotEnoughQuoteTokensToCoverFees",
			msg: "buy: Not enough quote tokens to cover for fees."
		},
		{
			code: 6040,
			name: "BuySlippageBelowMinBaseAmountOut",
			msg: "buy: slippage - would buy less tokens than expected min_base_amount_out"
		},
		{
			code: 6041,
			name: "MayhemModeDisabled"
		},
		{
			code: 6042,
			name: "OnlyPumpPoolsMayhemMode"
		},
		{
			code: 6043,
			name: "MayhemModeInDesiredState"
		},
		{
			code: 6044,
			name: "NotEnoughRemainingAccounts"
		},
		{
			code: 6045,
			name: "InvalidSharingConfigBaseMint"
		},
		{
			code: 6046,
			name: "InvalidSharingConfigCoinCreator"
		},
		{
			code: 6047,
			name: "CoinCreatorMigratedToSharingConfig",
			msg: "coin creator has been migrated to sharing config"
		},
		{
			code: 6048,
			name: "CreatorVaultMigratedToSharingConfig",
			msg: "creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead"
		},
		{
			code: 6049,
			name: "CashbackNotEnabled",
			msg: "Cashback is disabled"
		},
		{
			code: 6050,
			name: "OnlyPumpPoolsCashback"
		},
		{
			code: 6051,
			name: "CashbackNotInDesiredState"
		},
		{
			code: 6052,
			name: "TokensInVaultLessThanCashbackEarned"
		},
		{
			code: 6053,
			name: "BuybackFeeRecipientNotAuthorized",
			msg: "Buyback fee recipient not authorized"
		},
		{
			code: 6054,
			name: "AllBuybackFeeRecipientsShouldBeNonZero"
		},
		{
			code: 6055,
			name: "NotUniqueBuybackFeeRecipients"
		},
		{
			code: 6056,
			name: "BuybackBasisPointsOutOfRange",
			msg: "buyback_basis_points must be <= 10_000"
		},
		{
			code: 6057,
			name: "WrongBuybackFeeRecipientsCount",
			msg: "buyback fee recipients require exactly 8 remaining accounts (or none)"
		},
		{
			code: 6058,
			name: "BuybackFeeRecipientMissing"
		},
		{
			code: 6059,
			name: "MissingCashbackAccounts",
			msg: "Cashback trade is missing the required remaining accounts"
		},
		{
			code: 6060,
			name: "InvalidCashbackAccumulator",
			msg: "Cashback user_volume_accumulator account is invalid"
		},
		{
			code: 6061,
			name: "InvalidCashbackAccumulatorAta",
			msg: "Cashback user_volume_accumulator ATA is missing or invalid"
		},
		{
			code: 6062,
			name: "InvalidPoolV2",
			msg: "pool_v2 remaining account is missing or invalid"
		},
		{
			code: 6063,
			name: "InsufficientRealQuoteReserves",
			msg: "BOOST: sell output exceeds the real quote vault. effective = real + virtual is pricing-only; payout is capped at real_vault, so quote min(out, real_vault)"
		},
		{
			code: 6064,
			name: "BoostPoolLiquidityUnsupported",
			msg: "BOOST: deposit/withdraw don't apply to boost pools"
		},
		{
			code: 6065,
			name: "PoolCannotBoost",
			msg: "BOOST: pool cannot be boosted (no virtual reserves)"
		},
		{
			code: 6066,
			name: "BoostDisabled",
			msg: "BOOST: boost is disabled"
		},
		{
			code: 6067,
			name: "SeedLockViolation",
			msg: "BOOST: lp_supply must never drop below the circulating LP mint supply"
		},
		{
			code: 6068,
			name: "CreatorFeeNotConfigurable",
			msg: "Configurable creator fee is disabled"
		},
		{
			code: 6069,
			name: "CreatorFeeBpsOutOfRange",
			msg: "Creator fee basis points must be between 1 and the configured maximum"
		},
		{
			code: 6070,
			name: "CreatorFeeNotEditable",
			msg: "Creator fee is not editable for this pool"
		},
		{
			code: 6071,
			name: "CreatorFeeNotAllowedForCashbackCoin",
			msg: "Cashback coins cannot have a creator fee"
		},
		{
			code: 6072,
			name: "SharingConfigNotActive",
			msg: "Sharing config is not active"
		},
		{
			code: 6073,
			name: "NotAuthorized",
			msg: "Not authorized"
		},
		{
			code: 6074,
			name: "HolderRewardCreatorImmutable",
			msg: "The coin creator of a holder-reward pool cannot be changed"
		},
		{
			code: 6075,
			name: "CtoNotAllowedForMayhemPool",
			msg: "CTO is not allowed on a mayhem-mode pool"
		},
		{
			code: 6076,
			name: "InvalidHolderRewardCoinCreator",
			msg: "A holder-reward pool's coin creator must be the holder-rewards PDA"
		},
		{
			code: 6077,
			name: "CreatorFeeNotConfigurableForQuote",
			msg: "Creator fee is not configurable on a SOL or USDC quote; the fee schedule applies"
		},
		{
			code: 6078,
			name: "OnlyPumpPools",
			msg: "Only canonical pump pools are supported by this instruction"
		},
		{
			code: 6079,
			name: "CashbackCoinNotSupported",
			msg: "v2 trades do not support cashback coins; use the v1 instructions"
		},
		{
			code: 6080,
			name: "MayhemPoolNotSupported",
			msg: "v2 trades do not support mayhem-mode pools; use the v1 instructions"
		},
		{
			code: 6081,
			name: "CreatorFeesNotSwept",
			msg: "creator_fees must be swept before the coin creator changes"
		},
		{
			code: 6082,
			name: "FeeTiersEmpty",
			msg: "The fee config tier table is empty"
		},
		{
			code: 6083,
			name: "FeeConfigTooShort",
			msg: "The fee config account is shorter than its initialize size"
		},
		{
			code: 6084,
			name: "MultiHopDiscontinuousPath",
			msg: "multi-hop: a hop's input mint is neither side of its pool or curve, or the route does not end in user_out_token_account's mint"
		},
		{
			code: 6085,
			name: "MultiHopCurveRunMismatch",
			msg: "multi-hop: the balances around the bonding-curve hops do not match the amounts pump reported"
		},
		{
			code: 6086,
			name: "MultiHopMixedDirection",
			msg: "multi-hop: every hop must trade in the same direction, all buys or all sells"
		},
		{
			code: 6087,
			name: "SelfTransferNotAllowed",
			msg: "A transfer's source is its destination and the signer does not own it"
		}
	],
	types: [
		{
			name: "AdminCtoPoolEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "old_coin_creator",
						type: "pubkey"
					},
					{
						name: "new_coin_creator",
						type: "pubkey"
					},
					{
						name: "is_holder_reward",
						type: "bool"
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					},
					{
						name: "old_creator_fee_bps",
						type: "u64"
					},
					{
						name: "new_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "AdminUpdateTokenIncentivesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "day_number",
						type: "u64"
					},
					{
						name: "token_supply_per_day",
						type: "u64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "seconds_in_a_day",
						type: "i64"
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
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					}
				]
			}
		},
		{
			name: "BoostBuyAndBurnEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "quote_amount_in_requested",
						type: "u64"
					},
					{
						name: "quote_amount_in_used",
						type: "u64"
					},
					{
						name: "base_amount_burned",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "real_quote_reserves_after",
						type: "u64"
					},
					{
						name: "base_reserves_after",
						type: "u64"
					},
					{
						name: "boost_vault_remaining",
						type: "u64"
					}
				]
			}
		},
		{
			name: "BuyEvent",
			docs: ["ix_name: \"buy\" | \"buy_exact_quote_in\""],
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_amount_out",
						type: "u64"
					},
					{
						name: "max_quote_amount_in",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "quote_amount_in",
						type: "u64"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "lp_fee",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee",
						type: "u64"
					},
					{
						name: "quote_amount_in_with_lp_fee",
						type: "u64"
					},
					{
						name: "user_quote_amount_in",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient_token_account",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "coin_creator_fee",
						type: "u64"
					},
					{
						name: "track_volume",
						type: "bool"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					},
					{
						name: "min_base_amount_out",
						type: "u64"
					},
					{
						name: "ix_name",
						type: "string"
					},
					{
						name: "cashback_fee_basis_points",
						type: "u64"
					},
					{
						name: "cashback",
						type: "u64"
					},
					{
						name: "buyback_fee_basis_points",
						type: "u64"
					},
					{
						name: "buyback_fee",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "can_boost",
						type: "bool"
					},
					{
						name: "base_supply",
						type: "u64"
					},
					{
						name: "holder_rewards_bps",
						type: "u64"
					},
					{
						name: "holder_rewards",
						type: "u64"
					},
					{
						name: "creator_fee_unclaimed",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ClaimCashbackEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_claimed",
						type: "u64"
					},
					{
						name: "total_cashback_earned",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ClaimTokenIncentivesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					}
				]
			}
		},
		{
			name: "CloseUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					}
				]
			}
		},
		{
			name: "CollectCoinCreatorFeeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "coin_creator_fee",
						type: "u64"
					},
					{
						name: "coin_creator_vault_ata",
						type: "pubkey"
					},
					{
						name: "coin_creator_token_account",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "ConfigStatus",
			type: {
				kind: "enum",
				variants: [{ name: "Paused" }, { name: "Active" }]
			}
		},
		{
			name: "CreateConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "admin_set_coin_creator_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "CreatePoolEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "index",
						type: "u16"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "base_mint_decimals",
						type: "u8"
					},
					{
						name: "quote_mint_decimals",
						type: "u8"
					},
					{
						name: "base_amount_in",
						type: "u64"
					},
					{
						name: "quote_amount_in",
						type: "u64"
					},
					{
						name: "pool_base_amount",
						type: "u64"
					},
					{
						name: "pool_quote_amount",
						type: "u64"
					},
					{
						name: "minimum_liquidity",
						type: "u64"
					},
					{
						name: "initial_liquidity",
						type: "u64"
					},
					{
						name: "lp_token_amount_out",
						type: "u64"
					},
					{
						name: "pool_bump",
						type: "u8"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "lp_mint",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					},
					{
						name: "can_edit_creator_fee",
						type: "bool"
					},
					{
						name: "is_holder_reward",
						type: "bool"
					}
				]
			}
		},
		{
			name: "DepositEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "lp_token_amount_out",
						type: "u64"
					},
					{
						name: "max_base_amount_in",
						type: "u64"
					},
					{
						name: "max_quote_amount_in",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "base_amount_in",
						type: "u64"
					},
					{
						name: "quote_amount_in",
						type: "u64"
					},
					{
						name: "lp_mint_supply",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "user_pool_token_account",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "DisableEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "disable_create_pool",
						type: "bool"
					},
					{
						name: "disable_deposit",
						type: "bool"
					},
					{
						name: "disable_withdraw",
						type: "bool"
					},
					{
						name: "disable_buy",
						type: "bool"
					},
					{
						name: "disable_sell",
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
						name: "timestamp",
						type: "i64"
					},
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
					}
				]
			}
		},
		{
			name: "FeeConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "flat_fees",
						type: { defined: { name: "Fees" } }
					},
					{
						name: "fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "stable_fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "exotic_flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "FeeTier",
			type: {
				kind: "struct",
				fields: [{
					name: "market_cap_lamports_threshold",
					type: "u128"
				}, {
					name: "fees",
					type: { defined: { name: "Fees" } }
				}]
			}
		},
		{
			name: "Fees",
			type: {
				kind: "struct",
				fields: [
					{
						name: "lp_fee_bps",
						type: "u64"
					},
					{
						name: "protocol_fee_bps",
						type: "u64"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
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
						name: "admin",
						docs: ["The admin pubkey"],
						type: "pubkey"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "disable_flags",
						docs: [
							"Flags to disable certain functionality",
							"bit 0 - Disable create pool",
							"bit 1 - Disable deposit",
							"bit 2 - Disable withdraw",
							"bit 3 - Disable buy",
							"bit 4 - Disable sell"
						],
						type: "u8"
					},
					{
						name: "protocol_fee_recipients",
						docs: ["Addresses of the protocol fee recipients"],
						type: { array: ["pubkey", 8] }
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "admin_set_coin_creator_authority",
						docs: ["The admin authority for setting coin creators"],
						type: "pubkey"
					},
					{
						name: "whitelist_pda",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "mayhem_mode_enabled",
						type: "bool"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					},
					{
						name: "is_cashback_enabled",
						type: "bool"
					},
					{
						name: "buyback_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "buyback_basis_points",
						type: "u64"
					},
					{
						name: "boost_authority",
						type: "pubkey"
					},
					{
						name: "boost_enabled",
						type: "bool"
					},
					{
						name: "creator_fee_configurable",
						type: "bool"
					},
					{
						name: "max_configurable_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "GlobalVolumeAccumulator",
			type: {
				kind: "struct",
				fields: [
					{
						name: "start_time",
						type: "i64"
					},
					{
						name: "end_time",
						type: "i64"
					},
					{
						name: "seconds_in_a_day",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "total_token_supply",
						type: { array: ["u64", 30] }
					},
					{
						name: "sol_volumes",
						type: { array: ["u64", 30] }
					}
				]
			}
		},
		{
			name: "InitBoostEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "real_quote_reserves_after",
						type: "u64"
					}
				]
			}
		},
		{
			name: "InitUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "payer",
						type: "pubkey"
					},
					{
						name: "user",
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
			name: "MigratePoolCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "old_coin_creator",
						type: "pubkey"
					},
					{
						name: "new_coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "OptionBool",
			type: {
				kind: "struct",
				fields: ["bool"]
			}
		},
		{
			name: "OptionU64",
			type: {
				kind: "struct",
				fields: ["u64"]
			}
		},
		{
			name: "Pool",
			type: {
				kind: "struct",
				fields: [
					{
						name: "pool_bump",
						type: "u8"
					},
					{
						name: "index",
						type: "u16"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "lp_mint",
						type: "pubkey"
					},
					{
						name: "pool_base_token_account",
						type: "pubkey"
					},
					{
						name: "pool_quote_token_account",
						type: "pubkey"
					},
					{
						name: "lp_supply",
						docs: ["True circulating supply without burns and lock-ups"],
						type: "u64"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					},
					{
						name: "virtual_quote_reserves",
						docs: ["For non-boost pools, value is 0, so the behavior is identical to legacy pools."],
						type: "i128"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					},
					{
						name: "can_edit_creator_fee",
						type: "bool"
					},
					{
						name: "is_holder_reward",
						type: "bool"
					},
					{
						name: "protocol_fees",
						type: "u64"
					},
					{
						name: "creator_fees",
						type: "u64"
					}
				]
			}
		},
		{
			name: "ReservedFeeRecipientsEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					}
				]
			}
		},
		{
			name: "SellEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_amount_in",
						type: "u64"
					},
					{
						name: "min_quote_amount_out",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "quote_amount_out",
						type: "u64"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "lp_fee",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee",
						type: "u64"
					},
					{
						name: "quote_amount_out_without_lp_fee",
						type: "u64"
					},
					{
						name: "user_quote_amount_out",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient",
						type: "pubkey"
					},
					{
						name: "protocol_fee_recipient_token_account",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "coin_creator_fee",
						type: "u64"
					},
					{
						name: "cashback_fee_basis_points",
						type: "u64"
					},
					{
						name: "cashback",
						type: "u64"
					},
					{
						name: "buyback_fee_basis_points",
						type: "u64"
					},
					{
						name: "buyback_fee",
						type: "u64"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					},
					{
						name: "can_boost",
						type: "bool"
					},
					{
						name: "base_supply",
						type: "u64"
					},
					{
						name: "holder_rewards_bps",
						type: "u64"
					},
					{
						name: "holder_rewards",
						type: "u64"
					},
					{
						name: "creator_fee_unclaimed",
						type: "u64"
					}
				]
			}
		},
		{
			name: "SetBondingCurveCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetBoostAuthorityEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "old_boost_authority",
						type: "pubkey"
					},
					{
						name: "new_boost_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetMetaplexCoinCreatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "metadata",
						type: "pubkey"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "Shareholder",
			type: {
				kind: "struct",
				fields: [{
					name: "address",
					type: "pubkey"
				}, {
					name: "share_bps",
					type: "u16"
				}]
			}
		},
		{
			name: "SharingConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "version",
						type: "u8"
					},
					{
						name: "status",
						type: { defined: { name: "ConfigStatus" } }
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "admin_revoked",
						type: "bool"
					},
					{
						name: "shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					}
				]
			}
		},
		{
			name: "SweepPoolFeeEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "recipient",
						type: "pubkey"
					},
					{
						name: "payer",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					},
					{
						name: "bucket",
						type: "u8"
					}
				]
			}
		},
		{
			name: "SyncUserVolumeAccumulatorEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "total_claimed_tokens_before",
						type: "u64"
					},
					{
						name: "total_claimed_tokens_after",
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
			name: "UpdateAdminEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "new_admin",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "UpdateCreatorFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "creator_fee_configurable",
						type: "bool"
					},
					{
						name: "max_configurable_creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "UpdateFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "lp_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_basis_points",
						type: "u64"
					},
					{
						name: "protocol_fee_recipients",
						type: { array: ["pubkey", 8] }
					},
					{
						name: "coin_creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "admin_set_coin_creator_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "UserVolumeAccumulator",
			type: {
				kind: "struct",
				fields: [
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "needs_claim",
						type: "bool"
					},
					{
						name: "total_unclaimed_tokens",
						type: "u64"
					},
					{
						name: "total_claimed_tokens",
						type: "u64"
					},
					{
						name: "current_sol_volume",
						type: "u64"
					},
					{
						name: "last_update_timestamp",
						type: "i64"
					},
					{
						name: "has_total_claimed_tokens",
						type: "bool"
					},
					{
						name: "cashback_earned",
						type: "u64"
					},
					{
						name: "total_cashback_claimed",
						type: "u64"
					}
				]
			}
		},
		{
			name: "WithdrawEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "lp_token_amount_in",
						type: "u64"
					},
					{
						name: "min_base_amount_out",
						type: "u64"
					},
					{
						name: "min_quote_amount_out",
						type: "u64"
					},
					{
						name: "user_base_token_reserves",
						type: "u64"
					},
					{
						name: "user_quote_token_reserves",
						type: "u64"
					},
					{
						name: "pool_base_token_reserves",
						type: "u64"
					},
					{
						name: "pool_quote_token_reserves",
						type: "u64"
					},
					{
						name: "base_amount_out",
						type: "u64"
					},
					{
						name: "quote_amount_out",
						type: "u64"
					},
					{
						name: "lp_mint_supply",
						type: "u64"
					},
					{
						name: "pool",
						type: "pubkey"
					},
					{
						name: "user",
						type: "pubkey"
					},
					{
						name: "user_base_token_account",
						type: "pubkey"
					},
					{
						name: "user_quote_token_account",
						type: "pubkey"
					},
					{
						name: "user_pool_token_account",
						type: "pubkey"
					}
				]
			}
		}
	]
};
var pump_fees_default = {
	address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
	metadata: {
		name: "pump_fees",
		version: "0.1.0",
		spec: "0.1.0",
		description: "Created with Anchor"
	},
	instructions: [
		{
			name: "admin_cto_sharing_config",
			discriminator: [
				60,
				100,
				144,
				156,
				64,
				138,
				182,
				37
			],
			accounts: [
				{
					name: "pool_authority",
					signer: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								112,
								111,
								111,
								108,
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
					name: "authority",
					signer: true
				},
				{
					name: "global",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108
							]
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
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "sharing_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							115,
							104,
							97,
							114,
							105,
							110,
							103,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "mint"
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
				{
					name: "program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				}
			],
			args: [{
				name: "new_admin",
				type: { option: "pubkey" }
			}]
		},
		{
			name: "claim_social_fee_pda",
			discriminator: [
				225,
				21,
				251,
				133,
				161,
				30,
				199,
				226
			],
			accounts: [
				{
					name: "recipient",
					writable: true
				},
				{
					name: "social_fee_pda",
					writable: true
				},
				{
					name: "fee_program_global",
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "social_claim_authority",
					signer: true,
					relations: ["fee_program_global"]
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
				name: "user_id",
				type: "string"
			}, {
				name: "platform",
				type: "u8"
			}],
			returns: { option: { defined: { name: "SocialFeePdaClaimed" } } }
		},
		{
			name: "claim_social_fee_pda_v2",
			discriminator: [
				17,
				77,
				240,
				134,
				58,
				188,
				53,
				149
			],
			accounts: [
				{
					name: "recipient",
					writable: true
				},
				{
					name: "social_fee_pda",
					writable: true
				},
				{
					name: "quote_mint",
					docs: ["Quote mint for claim"],
					writable: true
				},
				{
					name: "associated_social_fee_pda",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "social_fee_pda"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "associated_recipient",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "recipient"
							},
							{
								kind: "account",
								path: "quote_token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{ name: "quote_token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "fee_program_global",
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "social_claim_authority",
					signer: true,
					relations: ["fee_program_global"]
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
				name: "user_id",
				type: "string"
			}, {
				name: "platform",
				type: "u8"
			}],
			returns: { option: { defined: { name: "SocialFeePdaClaimed" } } }
		},
		{
			name: "crank_donation_fee_pda",
			discriminator: [
				220,
				10,
				189,
				167,
				169,
				17,
				25,
				69
			],
			accounts: [
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
				{
					name: "program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				},
				{
					name: "payer",
					docs: ["Pays rent when [`temp_wsol_token_account`] is created (`init_if_needed`); receives rent when it is closed after the relay CPI."],
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "rent",
					address: "SysvarRent111111111111111111111111111111111"
				},
				{
					name: "fee_program_global",
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "donation_fee_pda",
					writable: true,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								100,
								111,
								110,
								97,
								116,
								105,
								111,
								110,
								45,
								102,
								101,
								101,
								45,
								112,
								100,
								97
							]
						},
						{
							kind: "account",
							path: "donation_fee_pda.base_mint",
							account: "DonationFeePda"
						},
						{
							kind: "account",
							path: "donation_fee_pda.config_id",
							account: "DonationFeePda"
						}
					] }
				},
				{
					name: "quote_mint",
					docs: ["Quote mint from donation fee pda."],
					writable: true
				},
				{
					name: "donation_fee_pda_ata",
					docs: ["WSOL ATA owned by `donation_fee_pda`."],
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "donation_fee_pda"
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
								path: "quote_mint"
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
					name: "donation_relay_program",
					address: "RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu"
				},
				{ name: "donation_relay_event_authority" },
				{ name: "mint_whitelist" },
				{
					name: "epoch_tracker",
					writable: true
				},
				{
					name: "debouncer",
					writable: true
				},
				{
					name: "debouncer_ata",
					writable: true
				}
			],
			args: []
		},
		{
			name: "create_donation_fee_pda",
			discriminator: [
				244,
				139,
				16,
				88,
				14,
				255,
				122,
				26
			],
			accounts: [
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
				{
					name: "program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				},
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "fee_program_global",
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "donation_fee_pda",
					writable: true,
					pda: { seeds: [
						{
							kind: "const",
							value: [
								100,
								111,
								110,
								97,
								116,
								105,
								111,
								110,
								45,
								102,
								101,
								101,
								45,
								112,
								100,
								97
							]
						},
						{
							kind: "account",
							path: "base_mint"
						},
						{
							kind: "account",
							path: "config_id"
						}
					] }
				},
				{
					name: "config_id",
					docs: ["stored on the PDA, so distinct `config_id`s for the same `base_mint` derive distinct addresses."]
				},
				{ name: "base_mint" },
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
							path: "base_mint"
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
				{ name: "pool" },
				{
					name: "sharing_config",
					docs: ["(derived from `[SHARING_CONFIG_SEED, base_mint]`)"],
					pda: { seeds: [{
						kind: "const",
						value: [
							115,
							104,
							97,
							114,
							105,
							110,
							103,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "base_mint"
					}] }
				}
			],
			args: []
		},
		{
			name: "create_fee_sharing_config",
			docs: ["Create Fee Sharing Config"],
			discriminator: [
				195,
				78,
				86,
				76,
				111,
				52,
				251,
				213
			],
			accounts: [
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
				{
					name: "program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				},
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "global",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108
							]
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
				{ name: "mint" },
				{
					name: "sharing_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							115,
							104,
							97,
							114,
							105,
							110,
							103,
							45,
							99,
							111,
							110,
							102,
							105,
							103
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
					name: "bonding_curve",
					writable: true,
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
					name: "pump_program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "pump_event_authority",
					pda: {
						seeds: [{
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
					name: "pool",
					writable: true,
					optional: true
				},
				{
					name: "pump_amm_program",
					optional: true,
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "pump_amm_event_authority",
					optional: true,
					pda: {
						seeds: [{
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}
					}
				}
			],
			args: []
		},
		{
			name: "create_social_fee_pda",
			discriminator: [
				144,
				224,
				59,
				211,
				78,
				248,
				202,
				220
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "social_fee_pda",
					writable: true
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "fee_program_global",
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
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
				name: "user_id",
				type: "string"
			}, {
				name: "platform",
				type: "u8"
			}]
		},
		{
			name: "extend_fee_config",
			docs: ["Realloc the fee_config PDA to [`FeeConfig::CURRENT_SIZE`] (signer pays rent delta)."],
			discriminator: [
				68,
				179,
				244,
				90,
				173,
				56,
				17,
				217
			],
			accounts: [
				{
					name: "fee_config",
					writable: true
				},
				{
					name: "user",
					signer: true
				},
				{ name: "config_program_id" },
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
			name: "get_fees",
			docs: ["Get Fees"],
			discriminator: [
				231,
				37,
				126,
				85,
				207,
				91,
				63,
				52
			],
			accounts: [{
				name: "fee_config",
				pda: { seeds: [{
					kind: "const",
					value: [
						102,
						101,
						101,
						95,
						99,
						111,
						110,
						102,
						105,
						103
					]
				}, {
					kind: "account",
					path: "config_program_id"
				}] }
			}, { name: "config_program_id" }],
			args: [
				{
					name: "is_pump_pool",
					type: "bool"
				},
				{
					name: "market_cap_lamports",
					type: "u128"
				},
				{
					name: "trade_size_lamports",
					type: "u64"
				},
				{
					name: "is_new_quote_mint",
					type: { defined: { name: "OptionBool" } }
				}
			],
			returns: { defined: { name: "Fees" } }
		},
		{
			name: "get_fees_with_quote_mint",
			discriminator: [
				154,
				237,
				138,
				92,
				162,
				2,
				162,
				187
			],
			accounts: [{
				name: "fee_config",
				pda: { seeds: [{
					kind: "const",
					value: [
						102,
						101,
						101,
						95,
						99,
						111,
						110,
						102,
						105,
						103
					]
				}, {
					kind: "account",
					path: "config_program_id"
				}] }
			}, { name: "config_program_id" }],
			args: [
				{
					name: "is_pump_pool",
					type: "bool"
				},
				{
					name: "market_cap_lamports",
					type: "u128"
				},
				{
					name: "quote_mint",
					type: "pubkey"
				}
			],
			returns: { defined: { name: "Fees" } }
		},
		{
			name: "initialize_buyback",
			discriminator: [
				250,
				129,
				236,
				160,
				227,
				36,
				103,
				134
			],
			accounts: [
				{
					name: "payer",
					writable: true,
					signer: true
				},
				{
					name: "buyback_vault",
					writable: true
				},
				{
					name: "buyback_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "buyback_vault"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "mint" },
				{ name: "token_program" },
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
				name: "index",
				type: "u8"
			}]
		},
		{
			name: "initialize_fee_config",
			docs: ["Initialize FeeConfig admin"],
			discriminator: [
				62,
				162,
				20,
				133,
				121,
				65,
				145,
				27
			],
			accounts: [
				{
					name: "admin",
					writable: true,
					signer: true,
					address: "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8"
				},
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{ name: "config_program_id" },
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
			name: "initialize_fee_program_global",
			discriminator: [
				35,
				215,
				130,
				84,
				233,
				56,
				124,
				167
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["pump_global"]
				},
				{
					name: "pump_global",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108
							]
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
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
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
			args: [
				{
					name: "social_claim_authority",
					type: "pubkey"
				},
				{
					name: "disable_flags",
					type: "u8"
				},
				{
					name: "claim_rate_limit",
					type: "u64"
				}
			]
		},
		{
			name: "revoke_fee_sharing_authority",
			docs: ["Revoke Fee Sharing Authority"],
			discriminator: [
				18,
				233,
				158,
				39,
				185,
				207,
				58,
				104
			],
			accounts: [],
			args: []
		},
		{
			name: "set_authority",
			discriminator: [
				133,
				250,
				37,
				21,
				110,
				163,
				26,
				121
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["fee_program_global"]
				},
				{
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
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
				name: "new_authority",
				type: "pubkey"
			}]
		},
		{
			name: "set_claim_rate_limit",
			discriminator: [
				185,
				211,
				159,
				174,
				212,
				49,
				88,
				4
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["fee_program_global"]
				},
				{
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
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
				name: "claim_rate_limit",
				type: "u64"
			}]
		},
		{
			name: "set_disable_flags",
			discriminator: [
				194,
				217,
				112,
				35,
				114,
				222,
				51,
				190
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["fee_program_global"]
				},
				{
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
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
				name: "disable_flags",
				type: "u8"
			}]
		},
		{
			name: "set_exotic_flat_fees",
			discriminator: [
				30,
				234,
				149,
				138,
				252,
				230,
				39,
				73
			],
			accounts: [
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{
					name: "admin",
					writable: true,
					signer: true,
					relations: ["fee_config"]
				},
				{ name: "config_program_id" },
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
				name: "exotic_flat_fees",
				type: { defined: { name: "Fees" } }
			}]
		},
		{
			name: "set_social_claim_authority",
			discriminator: [
				147,
				54,
				184,
				154,
				136,
				237,
				185,
				153
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["fee_program_global"]
				},
				{
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
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
				name: "social_claim_authority",
				type: "pubkey"
			}]
		},
		{
			name: "sweep_buyback",
			discriminator: [
				138,
				33,
				204,
				38,
				207,
				161,
				159,
				226
			],
			accounts: [
				{
					name: "destination",
					writable: true
				},
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["buyback_vault"]
				},
				{
					name: "buyback_vault",
					writable: true
				},
				{
					name: "buyback_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "buyback_vault"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "destination_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "destination"
							},
							{
								kind: "account",
								path: "token_program"
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
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{ name: "mint" },
				{ name: "token_program" },
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
				name: "index",
				type: "u8"
			}]
		},
		{
			name: "transfer_fee_sharing_authority",
			docs: ["Transfer Fee Sharing Authority"],
			discriminator: [
				202,
				10,
				75,
				200,
				164,
				34,
				210,
				96
			],
			accounts: [],
			args: []
		},
		{
			name: "update_admin",
			docs: ["Update admin (only callable by admin)"],
			discriminator: [
				161,
				176,
				40,
				213,
				60,
				184,
				179,
				228
			],
			accounts: [
				{
					name: "admin",
					signer: true,
					relations: ["fee_config"]
				},
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{ name: "new_admin" },
				{ name: "config_program_id" },
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
			name: "update_buyback_authority",
			discriminator: [
				66,
				98,
				113,
				202,
				121,
				37,
				219,
				107
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["fee_program_global"]
				},
				{
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "buyback_vault",
					writable: true
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
				name: "index",
				type: "u8"
			}, {
				name: "new_authority",
				type: "pubkey"
			}]
		},
		{
			name: "update_buyback_claim_rate_limit",
			discriminator: [
				186,
				95,
				135,
				190,
				255,
				199,
				137,
				170
			],
			accounts: [
				{
					name: "authority",
					writable: true,
					signer: true,
					relations: ["fee_program_global"]
				},
				{
					name: "fee_program_global",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							45,
							112,
							114,
							111,
							103,
							114,
							97,
							109,
							45,
							103,
							108,
							111,
							98,
							97,
							108
						]
					}] }
				},
				{
					name: "buyback_vault",
					writable: true
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
				name: "index",
				type: "u8"
			}, {
				name: "claim_rate_limit",
				type: "i64"
			}]
		},
		{
			name: "update_fee_config",
			docs: ["Set/Replace fee parameters entirely (only callable by admin)"],
			discriminator: [
				104,
				184,
				103,
				242,
				88,
				151,
				107,
				20
			],
			accounts: [
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{
					name: "admin",
					signer: true,
					relations: ["fee_config"]
				},
				{ name: "config_program_id" },
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
				name: "fee_tiers",
				type: { vec: { defined: { name: "FeeTier" } } }
			}, {
				name: "flat_fees",
				type: { defined: { name: "Fees" } }
			}]
		},
		{
			name: "update_fee_shares",
			docs: ["Update Fee Shares, make sure to distribute all the fees before calling this"],
			discriminator: [
				189,
				13,
				136,
				99,
				187,
				164,
				237,
				35
			],
			accounts: [
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
				{
					name: "program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				},
				{
					name: "authority",
					signer: true
				},
				{
					name: "global",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108
							]
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
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "sharing_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							115,
							104,
							97,
							114,
							105,
							110,
							103,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "mint"
					}] }
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
					name: "pump_creator_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "sharing_config"
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
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "pump_program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "pump_event_authority",
					pda: {
						seeds: [{
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
					name: "pump_amm_program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "amm_event_authority",
					pda: {
						seeds: [{
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}
					}
				},
				{
					name: "wsol_mint",
					address: "So11111111111111111111111111111111111111112"
				},
				{
					name: "token_program",
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
				},
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								95,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "sharing_config"
						}],
						program: {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}
					}
				},
				{
					name: "coin_creator_vault_ata",
					writable: true
				}
			],
			args: [{
				name: "shareholders",
				type: { vec: { defined: { name: "Shareholder" } } }
			}]
		},
		{
			name: "update_fee_shares_v2",
			docs: ["Update Fee Shares, make sure to distribute all the fees before calling this"],
			discriminator: [
				111,
				251,
				49,
				6,
				78,
				78,
				106,
				18
			],
			accounts: [
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
				{
					name: "program",
					address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
				},
				{
					name: "authority",
					writable: true,
					signer: true
				},
				{
					name: "global",
					pda: {
						seeds: [{
							kind: "const",
							value: [
								103,
								108,
								111,
								98,
								97,
								108
							]
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
					name: "mint",
					relations: ["sharing_config"]
				},
				{
					name: "sharing_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							115,
							104,
							97,
							114,
							105,
							110,
							103,
							45,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "mint"
					}] }
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
					name: "pump_creator_vault",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								45,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "sharing_config"
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
					name: "pump_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "pump_creator_vault"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				},
				{
					name: "system_program",
					address: "11111111111111111111111111111111"
				},
				{
					name: "pump_program",
					address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
				},
				{
					name: "pump_event_authority",
					pda: {
						seeds: [{
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
					name: "pump_amm_program",
					address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
				},
				{
					name: "amm_event_authority",
					pda: {
						seeds: [{
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
						}],
						program: {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}
					}
				},
				{ name: "quote_mint" },
				{ name: "token_program" },
				{
					name: "associated_token_program",
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
				},
				{
					name: "coin_creator_vault_authority",
					writable: true,
					pda: {
						seeds: [{
							kind: "const",
							value: [
								99,
								114,
								101,
								97,
								116,
								111,
								114,
								95,
								118,
								97,
								117,
								108,
								116
							]
						}, {
							kind: "account",
							path: "sharing_config"
						}],
						program: {
							kind: "const",
							value: [
								12,
								20,
								222,
								252,
								130,
								94,
								198,
								118,
								148,
								37,
								8,
								24,
								187,
								101,
								64,
								101,
								244,
								41,
								141,
								49,
								86,
								213,
								113,
								180,
								212,
								248,
								9,
								12,
								24,
								233,
								168,
								99
							]
						}
					}
				},
				{
					name: "coin_creator_vault_ata",
					writable: true,
					pda: {
						seeds: [
							{
								kind: "account",
								path: "coin_creator_vault_authority"
							},
							{
								kind: "account",
								path: "token_program"
							},
							{
								kind: "account",
								path: "quote_mint"
							}
						],
						program: {
							kind: "account",
							path: "associated_token_program"
						}
					}
				}
			],
			args: [{
				name: "shareholders",
				type: { vec: { defined: { name: "Shareholder" } } }
			}]
		},
		{
			name: "update_stable_fee_config",
			docs: ["Set/Replace fee parameters entirely (only callable by admin)"],
			discriminator: [
				107,
				169,
				100,
				179,
				134,
				155,
				146,
				221
			],
			accounts: [
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{
					name: "admin",
					signer: true,
					relations: ["fee_config"]
				},
				{ name: "config_program_id" },
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
				name: "fee_tiers",
				type: { vec: { defined: { name: "FeeTier" } } }
			}]
		},
		{
			name: "upsert_fee_tiers",
			docs: ["Update or expand fee tiers (only callable by admin)"],
			discriminator: [
				227,
				23,
				150,
				12,
				77,
				86,
				94,
				4
			],
			accounts: [
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{
					name: "admin",
					signer: true,
					relations: ["fee_config"]
				},
				{ name: "config_program_id" },
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
				name: "fee_tiers",
				type: { vec: { defined: { name: "FeeTier" } } }
			}, {
				name: "offset",
				type: "u8"
			}]
		},
		{
			name: "upsert_stable_fee_tiers",
			docs: ["Update or expand fee tiers (only callable by admin)"],
			discriminator: [
				181,
				160,
				162,
				252,
				74,
				76,
				224,
				221
			],
			accounts: [
				{
					name: "fee_config",
					writable: true,
					pda: { seeds: [{
						kind: "const",
						value: [
							102,
							101,
							101,
							95,
							99,
							111,
							110,
							102,
							105,
							103
						]
					}, {
						kind: "account",
						path: "config_program_id"
					}] }
				},
				{
					name: "admin",
					signer: true,
					relations: ["fee_config"]
				},
				{ name: "config_program_id" },
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
				name: "fee_tiers",
				type: { vec: { defined: { name: "FeeTier" } } }
			}, {
				name: "offset",
				type: "u8"
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
			name: "BuybackVault",
			discriminator: [
				153,
				166,
				71,
				144,
				179,
				189,
				137,
				251
			]
		},
		{
			name: "DonationFeePda",
			discriminator: [
				246,
				197,
				96,
				9,
				193,
				30,
				93,
				115
			]
		},
		{
			name: "FeeConfig",
			discriminator: [
				143,
				52,
				146,
				187,
				219,
				123,
				76,
				155
			]
		},
		{
			name: "FeeProgramGlobal",
			discriminator: [
				162,
				165,
				245,
				49,
				29,
				37,
				55,
				242
			]
		},
		{
			name: "Global",
			discriminator: [
				167,
				232,
				232,
				177,
				200,
				108,
				114,
				127
			]
		},
		{
			name: "Pool",
			discriminator: [
				241,
				154,
				109,
				4,
				17,
				177,
				109,
				188
			]
		},
		{
			name: "SharingConfig",
			discriminator: [
				216,
				74,
				9,
				0,
				56,
				140,
				93,
				75
			]
		},
		{
			name: "SocialFeePda",
			discriminator: [
				139,
				96,
				53,
				17,
				42,
				169,
				206,
				150
			]
		}
	],
	events: [
		{
			name: "CreateFeeSharingConfigEvent",
			discriminator: [
				133,
				105,
				170,
				200,
				184,
				116,
				251,
				88
			]
		},
		{
			name: "DonationFeePdaCranked",
			discriminator: [
				30,
				208,
				107,
				93,
				177,
				0,
				223,
				78
			]
		},
		{
			name: "DonationFeePdaCreated",
			discriminator: [
				94,
				20,
				137,
				239,
				35,
				77,
				225,
				235
			]
		},
		{
			name: "ExtendFeeConfigEvent",
			discriminator: [
				226,
				203,
				224,
				35,
				153,
				10,
				88,
				51
			]
		},
		{
			name: "InitializeFeeConfigEvent",
			discriminator: [
				89,
				138,
				244,
				230,
				10,
				56,
				226,
				126
			]
		},
		{
			name: "InitializeFeeProgramGlobalEvent",
			discriminator: [
				40,
				233,
				156,
				78,
				95,
				0,
				8,
				199
			]
		},
		{
			name: "ResetFeeSharingConfigEvent",
			discriminator: [
				203,
				204,
				151,
				226,
				120,
				55,
				214,
				243
			]
		},
		{
			name: "SetAuthorityEvent",
			discriminator: [
				18,
				175,
				132,
				66,
				208,
				201,
				87,
				242
			]
		},
		{
			name: "SetClaimRateLimitEvent",
			discriminator: [
				13,
				143,
				143,
				235,
				181,
				19,
				51,
				40
			]
		},
		{
			name: "SetDisableFlagsEvent",
			discriminator: [
				5,
				8,
				179,
				65,
				49,
				55,
				145,
				126
			]
		},
		{
			name: "SetExoticFlatFeesEvent",
			discriminator: [
				195,
				138,
				108,
				15,
				8,
				77,
				68,
				9
			]
		},
		{
			name: "SetSocialClaimAuthorityEvent",
			discriminator: [
				60,
				118,
				127,
				132,
				239,
				52,
				254,
				14
			]
		},
		{
			name: "SocialFeePdaClaimed",
			discriminator: [
				50,
				18,
				193,
				65,
				237,
				210,
				234,
				236
			]
		},
		{
			name: "SocialFeePdaCreated",
			discriminator: [
				183,
				183,
				218,
				147,
				24,
				124,
				137,
				169
			]
		},
		{
			name: "SweepBuybackEvent",
			discriminator: [
				43,
				56,
				42,
				214,
				153,
				57,
				166,
				137
			]
		},
		{
			name: "UpdateAdminEvent",
			discriminator: [
				225,
				152,
				171,
				87,
				246,
				63,
				66,
				234
			]
		},
		{
			name: "UpdateFeeConfigEvent",
			discriminator: [
				90,
				23,
				65,
				35,
				62,
				244,
				188,
				208
			]
		},
		{
			name: "UpdateFeeSharesEvent",
			discriminator: [
				21,
				186,
				196,
				184,
				91,
				228,
				225,
				203
			]
		},
		{
			name: "UpdateStableFeeConfigEvent",
			discriminator: [
				94,
				5,
				43,
				237,
				103,
				147,
				232,
				245
			]
		},
		{
			name: "UpsertFeeTiersEvent",
			discriminator: [
				171,
				89,
				169,
				187,
				122,
				186,
				33,
				204
			]
		},
		{
			name: "UpsertStableFeeTiersEvent",
			discriminator: [
				232,
				237,
				237,
				52,
				98,
				146,
				73,
				243
			]
		}
	],
	errors: [
		{
			code: 6e3,
			name: "UnauthorizedProgram",
			msg: "Only Pump and PumpSwap programs can call this instruction"
		},
		{
			code: 6001,
			name: "InvalidAdmin",
			msg: "Invalid admin"
		},
		{
			code: 6002,
			name: "NoFeeTiers",
			msg: "No fee tiers provided"
		},
		{
			code: 6003,
			name: "TooManyFeeTiers",
			msg: "format"
		},
		{
			code: 6004,
			name: "OffsetNotContinuous",
			msg: "The offset should be <= fee_config.fee_tiers.len()"
		},
		{
			code: 6005,
			name: "FeeTiersNotSorted",
			msg: "Fee tiers must be sorted by market cap threshold (ascending)"
		},
		{
			code: 6006,
			name: "InvalidFeeTotal",
			msg: "Fee total must not exceed 10_000bps"
		},
		{
			code: 6007,
			name: "InvalidSharingConfig",
			msg: "Invalid Sharing Config"
		},
		{
			code: 6008,
			name: "InvalidPool",
			msg: "Invalid Pool"
		},
		{
			code: 6009,
			name: "SharingConfigAdminRevoked",
			msg: "Sharing config authority has been revoked - sharing config can only be updated once"
		},
		{
			code: 6010,
			name: "NoShareholders",
			msg: "No shareholders provided"
		},
		{
			code: 6011,
			name: "TooManyShareholders",
			msg: "format"
		},
		{
			code: 6012,
			name: "DuplicateShareholder",
			msg: "Duplicate shareholder address"
		},
		{
			code: 6013,
			name: "NotEnoughRemainingAccounts",
			msg: "Not enough remaining accounts"
		},
		{
			code: 6014,
			name: "InvalidShareTotal",
			msg: "Invalid share total - must equal 10_000 basis points"
		},
		{
			code: 6015,
			name: "ShareCalculationOverflow",
			msg: "Share calculation overflow"
		},
		{
			code: 6016,
			name: "NotAuthorized",
			msg: "The given account is not authorized to execute this instruction."
		},
		{
			code: 6017,
			name: "ZeroShareNotAllowed",
			msg: "Shareholder cannot have zero share"
		},
		{
			code: 6018,
			name: "SharingConfigNotActive",
			msg: "Fee sharing config is not active"
		},
		{
			code: 6019,
			name: "AmmAccountsRequiredForGraduatedCoin",
			msg: "AMM accounts are required for graduated coins"
		},
		{
			code: 6020,
			name: "ShareholderAccountMismatch",
			msg: "Remaining account key doesn't match shareholder address"
		},
		{
			code: 6021,
			name: "FeatureDeactivated",
			msg: "Feature is currently deactivated"
		},
		{
			code: 6022,
			name: "UserIdTooLong",
			msg: "User ID exceeds maximum length"
		},
		{
			code: 6023,
			name: "DeprecatedInstruction",
			msg: "Instruction is deprecated"
		},
		{
			code: 6024,
			name: "FeeSharesAlreadyUpdated",
			msg: "Reward split can only be updated once"
		},
		{
			code: 6025,
			name: "MathOverflow",
			msg: "Math overflow"
		},
		{
			code: 6026,
			name: "InvalidBuybackIndex",
			msg: "Invalid buybackindex"
		},
		{
			code: 6027,
			name: "ClaimRateLimitExceeded",
			msg: "Claim rate limit exceeded"
		},
		{
			code: 6028,
			name: "InvalidFeeConfigAccount",
			msg: "Account is not a valid FeeConfig for this instruction"
		},
		{
			code: 6029,
			name: "AccountTypeNotSupported",
			msg: "Account type not supported"
		},
		{
			code: 6030,
			name: "InvalidMint",
			msg: "Mint does not match quote mint"
		},
		{
			code: 6031,
			name: "UnsupportedQuoteMint",
			msg: "Unsupported quote mint"
		},
		{
			code: 6032,
			name: "InvalidRemainingAccounts",
			msg: "Invalid remaining accounts"
		},
		{
			code: 6033,
			name: "PoolCreatorFeesNotSwept",
			msg: "Pool creator_fees must be swept before the shares change"
		},
		{
			code: 6034,
			name: "InvalidQuoteMint",
			msg: "quote_mint is not the bonding curve's quote mint"
		}
	],
	types: [
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
						name: "virtual_quote_reserves",
						type: "u64"
					},
					{
						name: "real_token_reserves",
						type: "u64"
					},
					{
						name: "real_quote_reserves",
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
			name: "BuybackVault",
			type: {
				kind: "struct",
				fields: [
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "total_claimed",
						type: "u64"
					},
					{
						name: "total_claimed_token1",
						type: "u64"
					},
					{
						name: "total_claimed_token2",
						type: "u64"
					},
					{
						name: "last_claimed",
						type: "i64"
					},
					{
						name: "claim_rate_limit",
						type: "i64"
					},
					{
						name: "_reserved",
						type: { array: ["u8", 128] }
					}
				]
			}
		},
		{
			name: "ConfigStatus",
			type: {
				kind: "enum",
				variants: [{ name: "Paused" }, { name: "Active" }]
			}
		},
		{
			name: "CreateFeeSharingConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "bonding_curve",
						type: "pubkey"
					},
					{
						name: "pool",
						type: { option: "pubkey" }
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "initial_shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					},
					{
						name: "status",
						type: { defined: { name: "ConfigStatus" } }
					}
				]
			}
		},
		{
			name: "DonationFeePda",
			docs: ["Escrow PDA for donation relay: one per (mint, donation campaign `config_id`)."],
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "version",
						type: "u8"
					},
					{
						name: "config_id",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "total_donated",
						type: "u64"
					},
					{
						name: "last_crank_ts",
						type: "i64"
					},
					{
						name: "_reserved",
						type: { array: ["u8", 64] }
					}
				]
			}
		},
		{
			name: "DonationFeePdaCranked",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "signer",
						type: "pubkey"
					},
					{
						name: "donation_fee_pda",
						type: "pubkey"
					},
					{
						name: "config_id",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "amount",
						type: "u64"
					}
				]
			}
		},
		{
			name: "DonationFeePdaCreated",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "created_by",
						type: "pubkey"
					},
					{
						name: "donation_fee_pda",
						type: "pubkey"
					},
					{
						name: "config_id",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "creator",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "ExtendFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "fee_config",
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
			name: "FeeConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						docs: ["The bump for the PDA"],
						type: "u8"
					},
					{
						name: "admin",
						docs: ["The admin account that can update the fee config"],
						type: "pubkey"
					},
					{
						name: "flat_fees",
						docs: ["The flat fees for non-pump pools"],
						type: { defined: { name: "Fees" } }
					},
					{
						name: "fee_tiers",
						docs: ["The fee tiers"],
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "stable_fee_tiers",
						docs: ["The fee tiers"],
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "exotic_flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "FeeProgramGlobal",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "disable_flags",
						type: "u8"
					},
					{
						name: "social_claim_authority",
						type: "pubkey"
					},
					{
						name: "claim_rate_limit",
						type: "u64"
					},
					{
						name: "_reserved",
						type: { array: ["u8", 256] }
					}
				]
			}
		},
		{
			name: "FeeTier",
			type: {
				kind: "struct",
				fields: [{
					name: "market_cap_lamports_threshold",
					type: "u128"
				}, {
					name: "fees",
					type: { defined: { name: "Fees" } }
				}]
			}
		},
		{
			name: "Fees",
			type: {
				kind: "struct",
				fields: [
					{
						name: "lp_fee_bps",
						type: "u64"
					},
					{
						name: "protocol_fee_bps",
						type: "u64"
					},
					{
						name: "creator_fee_bps",
						type: "u64"
					}
				]
			}
		},
		{
			name: "Global",
			type: {
				kind: "struct",
				fields: [
					{
						name: "initialized",
						type: "bool"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "fee_recipient",
						type: "pubkey"
					},
					{
						name: "initial_virtual_token_reserves",
						type: "u64"
					},
					{
						name: "initial_virtual_sol_reserves",
						type: "u64"
					},
					{
						name: "initial_real_token_reserves",
						type: "u64"
					},
					{
						name: "token_total_supply",
						type: "u64"
					},
					{
						name: "fee_basis_points",
						type: "u64"
					},
					{
						name: "withdraw_authority",
						type: "pubkey"
					},
					{
						name: "enable_migrate",
						type: "bool"
					},
					{
						name: "pool_migration_fee",
						type: "u64"
					},
					{
						name: "creator_fee_basis_points",
						type: "u64"
					},
					{
						name: "fee_recipients",
						type: { array: ["pubkey", 7] }
					},
					{
						name: "set_creator_authority",
						type: "pubkey"
					},
					{
						name: "admin_set_creator_authority",
						type: "pubkey"
					},
					{
						name: "create_v2_enabled",
						type: "bool"
					},
					{
						name: "whitelist_pda",
						type: "pubkey"
					},
					{
						name: "reserved_fee_recipient",
						type: "pubkey"
					},
					{
						name: "mayhem_mode_enabled",
						type: "bool"
					},
					{
						name: "reserved_fee_recipients",
						type: { array: ["pubkey", 7] }
					}
				]
			}
		},
		{
			name: "InitializeFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "fee_config",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "InitializeFeeProgramGlobalEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "authority",
						type: "pubkey"
					},
					{
						name: "social_claim_authority",
						type: "pubkey"
					},
					{
						name: "disable_flags",
						type: "u8"
					},
					{
						name: "claim_rate_limit",
						type: "u64"
					}
				]
			}
		},
		{
			name: "OptionBool",
			type: {
				kind: "struct",
				fields: ["bool"]
			}
		},
		{
			name: "Pool",
			type: {
				kind: "struct",
				fields: [
					{
						name: "pool_bump",
						type: "u8"
					},
					{
						name: "index",
						type: "u16"
					},
					{
						name: "creator",
						type: "pubkey"
					},
					{
						name: "base_mint",
						type: "pubkey"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "lp_mint",
						type: "pubkey"
					},
					{
						name: "pool_base_token_account",
						type: "pubkey"
					},
					{
						name: "pool_quote_token_account",
						type: "pubkey"
					},
					{
						name: "lp_supply",
						type: "u64"
					},
					{
						name: "coin_creator",
						type: "pubkey"
					},
					{
						name: "is_mayhem_mode",
						type: "bool"
					},
					{
						name: "is_cashback_coin",
						type: "bool"
					},
					{
						name: "virtual_quote_reserves",
						type: "i128"
					}
				]
			}
		},
		{
			name: "ResetFeeSharingConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "old_admin",
						type: "pubkey"
					},
					{
						name: "old_shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					},
					{
						name: "new_admin",
						type: "pubkey"
					},
					{
						name: "new_shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					},
					{
						name: "old_version",
						type: "u8"
					},
					{
						name: "new_version",
						type: "u8"
					}
				]
			}
		},
		{
			name: "SetAuthorityEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "old_authority",
						type: "pubkey"
					},
					{
						name: "new_authority",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SetClaimRateLimitEvent",
			type: {
				kind: "struct",
				fields: [{
					name: "timestamp",
					type: "i64"
				}, {
					name: "claim_rate_limit",
					type: "u64"
				}]
			}
		},
		{
			name: "SetDisableFlagsEvent",
			type: {
				kind: "struct",
				fields: [{
					name: "timestamp",
					type: "i64"
				}, {
					name: "disable_flags",
					type: "u8"
				}]
			}
		},
		{
			name: "SetExoticFlatFeesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "fee_config",
						type: "pubkey"
					},
					{
						name: "exotic_flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "SetSocialClaimAuthorityEvent",
			type: {
				kind: "struct",
				fields: [{
					name: "timestamp",
					type: "i64"
				}, {
					name: "social_claim_authority",
					type: "pubkey"
				}]
			}
		},
		{
			name: "Shareholder",
			type: {
				kind: "struct",
				fields: [{
					name: "address",
					type: "pubkey"
				}, {
					name: "share_bps",
					type: "u16"
				}]
			}
		},
		{
			name: "SharingConfig",
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "version",
						type: "u8"
					},
					{
						name: "status",
						type: { defined: { name: "ConfigStatus" } }
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "admin_revoked",
						type: "bool"
					},
					{
						name: "shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					}
				]
			}
		},
		{
			name: "SocialFeePda",
			docs: ["Platform identifier: 0=pump, 1=twitter, etc."],
			type: {
				kind: "struct",
				fields: [
					{
						name: "bump",
						type: "u8"
					},
					{
						name: "version",
						type: "u8"
					},
					{
						name: "user_id",
						docs: ["Max 20 characters to fit u64::MAX (18,446,744,073,709,551,615) as a string.", "Actual storage: 4 bytes (length prefix) + 20 bytes (content) = 24 bytes."],
						type: "string"
					},
					{
						name: "platform",
						type: "u8"
					},
					{
						name: "total_claimed",
						type: "u64"
					},
					{
						name: "last_claimed",
						type: "u64"
					},
					{
						name: "total_stable_claimed",
						type: "u64"
					},
					{
						name: "_reserved",
						type: { array: ["u8", 120] }
					}
				]
			}
		},
		{
			name: "SocialFeePdaClaimed",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "user_id",
						type: "string"
					},
					{
						name: "platform",
						type: "u8"
					},
					{
						name: "social_fee_pda",
						type: "pubkey"
					},
					{
						name: "recipient",
						type: "pubkey"
					},
					{
						name: "social_claim_authority",
						type: "pubkey"
					},
					{
						name: "amount_claimed",
						type: "u64"
					},
					{
						name: "claimable_before",
						type: "u64"
					},
					{
						name: "lifetime_claimed",
						type: "u64"
					},
					{
						name: "recipient_balance_before",
						type: "u64"
					},
					{
						name: "recipient_balance_after",
						type: "u64"
					},
					{
						name: "quote_mint",
						type: "pubkey"
					},
					{
						name: "lifetime_stable_claimed",
						type: "u64"
					}
				]
			}
		},
		{
			name: "SocialFeePdaCreated",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "user_id",
						type: "string"
					},
					{
						name: "platform",
						type: "u8"
					},
					{
						name: "social_fee_pda",
						type: "pubkey"
					},
					{
						name: "created_by",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "SweepBuybackEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "index",
						type: "u8"
					},
					{
						name: "sol_amount",
						type: "u64"
					},
					{
						name: "token_amount",
						type: "u64"
					},
					{
						name: "destination",
						type: "pubkey"
					},
					{
						name: "buyback_vault",
						type: "pubkey"
					},
					{
						name: "mint",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "UpdateAdminEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "old_admin",
						type: "pubkey"
					},
					{
						name: "new_admin",
						type: "pubkey"
					}
				]
			}
		},
		{
			name: "UpdateFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "fee_config",
						type: "pubkey"
					},
					{
						name: "fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "UpdateFeeSharesEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "mint",
						type: "pubkey"
					},
					{
						name: "sharing_config",
						type: "pubkey"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "new_shareholders",
						type: { vec: { defined: { name: "Shareholder" } } }
					},
					{
						name: "version",
						type: "u8"
					}
				]
			}
		},
		{
			name: "UpdateStableFeeConfigEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "fee_config",
						type: "pubkey"
					},
					{
						name: "stable_fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "flat_fees",
						type: { defined: { name: "Fees" } }
					}
				]
			}
		},
		{
			name: "UpsertFeeTiersEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "fee_config",
						type: "pubkey"
					},
					{
						name: "fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "offset",
						type: "u8"
					}
				]
			}
		},
		{
			name: "UpsertStableFeeTiersEvent",
			type: {
				kind: "struct",
				fields: [
					{
						name: "timestamp",
						type: "i64"
					},
					{
						name: "admin",
						type: "pubkey"
					},
					{
						name: "fee_config",
						type: "pubkey"
					},
					{
						name: "stable_fee_tiers",
						type: { vec: { defined: { name: "FeeTier" } } }
					},
					{
						name: "offset",
						type: "u8"
					}
				]
			}
		}
	],
	constants: [
		{
			name: "AMM_CREATOR_VAULT_AUTHORITY_SEED",
			type: { array: ["u8", 13] },
			value: "[99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116]"
		},
		{
			name: "BUYBACK_VAULT_SEED",
			type: { array: ["u8", 13] },
			value: "[98, 117, 121, 98, 97, 99, 107, 45, 118, 97, 117, 108, 116]"
		},
		{
			name: "DEBOUNCER_V1",
			type: "bytes",
			value: "[100, 101, 98, 111, 117, 110, 99, 101, 114, 95, 118, 49]"
		},
		{
			name: "DONATION_FEE_PDA_SEED",
			type: { array: ["u8", 16] },
			value: "[100, 111, 110, 97, 116, 105, 111, 110, 45, 102, 101, 101, 45, 112, 100, 97]"
		},
		{
			name: "EPOCH_TRACKER_V1",
			type: "bytes",
			value: "[101, 112, 111, 99, 104, 95, 116, 114, 97, 99, 107, 101, 114, 95, 118, 49]"
		},
		{
			name: "FEE_CONFIG_SEED",
			type: "bytes",
			value: "[102, 101, 101, 95, 99, 111, 110, 102, 105, 103]"
		},
		{
			name: "FEE_PROGRAM_GLOBAL_SEED",
			type: { array: ["u8", 18] },
			value: "[102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45, 103, 108, 111, 98, 97, 108]"
		},
		{
			name: "IX_DONATE_PUBKEY_CONFIG_ID_WITH_PAYER_V1",
			type: { array: ["u8", 8] },
			value: "[120, 217, 57, 241, 135, 104, 139, 184]"
		},
		{
			name: "MAX_BUYBACK_INDEX",
			type: "u8",
			value: "8"
		},
		{
			name: "MINT_WHITELIST_V1",
			type: "bytes",
			value: "[109, 105, 110, 116, 95, 119, 104, 105, 116, 101, 108, 105, 115, 116, 95, 118, 49]"
		},
		{
			name: "PUMP_CREATOR_VAULT_SEED",
			type: { array: ["u8", 13] },
			value: "[99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116]"
		},
		{
			name: "PUMP_GLOBAL_SEED",
			docs: ["Bonding Curve Program Global Seed"],
			type: { array: ["u8", 6] },
			value: "[103, 108, 111, 98, 97, 108]"
		},
		{
			name: "SHARING_CONFIG_SEED",
			type: { array: ["u8", 14] },
			value: "[115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102, 105, 103]"
		},
		{
			name: "SOCIAL_FEE_PDA_SEED",
			type: { array: ["u8", 14] },
			value: "[115, 111, 99, 105, 97, 108, 45, 102, 101, 101, 45, 112, 100, 97]"
		}
	]
};
var OFFLINE_PUMP_PROGRAM = getPumpProgram(null);
Buffer.from(pump_default.events.find(({ name }) => name === "TradeEvent").discriminator);
function getPumpProgram(connection) {
	return new Program(pump_default, new AnchorProvider(connection, null, {}));
}
var PUMP_PROGRAM_ID = new PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
var PUMP_AMM_PROGRAM_ID = new PublicKey("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");
var MAYHEM_PROGRAM_ID = new PublicKey("MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e");
var PUMP_FEE_PROGRAM_ID = new PublicKey("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");
var BONDING_CURVE_INITIALIZE_SIZE = 49;
var GLOBAL_SIZE = 1088;
function zeroPadded(data, size) {
	return data.length >= size ? data : Buffer.concat([data, Buffer.alloc(size - data.length)]);
}
var CREATE_EVENT_LAYOUT_PADDINGS = [
	0,
	1,
	2,
	10
];
var CREATE_POOL_EVENT_LAYOUT_PADDINGS = [
	0,
	1,
	10
];
var TRADE_EVENT_LAYOUT_PADDINGS = [
	0,
	8,
	24
];
var FEE_CONFIG_INITIALIZE_SIZE = 2512;
var FEE_CONFIG_FEE_TIERS_OFFSET = 65;
var FEE_TIER_LEN = 40;
var FEES_LEN = 24;
var VEC_LEN_PREFIX = 4;
var MAX_FEE_TIERS_SUPPORTED = 50;
function feeTierVecEnd(data, offset) {
	const count = data.readUInt32LE(offset);
	const end = offset + VEC_LEN_PREFIX + count * FEE_TIER_LEN;
	if (count > MAX_FEE_TIERS_SUPPORTED || end > data.length) throw new Error(`Invalid FeeConfig account: ${count} fee tiers declared at offset ${offset} in ${data.length} bytes`);
	return end;
}
var QUOTE_CONTROL_HEADER_LEN = 104 + VEC_LEN_PREFIX;
var QUOTE_CONTROL_LEN_OFFSET = QUOTE_CONTROL_HEADER_LEN - VEC_LEN_PREFIX;
var QUOTE_CONTROL_ENTRY_LEN = 40;
function isRangeError(error) {
	return typeof error === "object" && error !== null && error.name === "RangeError";
}
function decodeWithTrailingDefaults(data, paddings, decode) {
	let rangeError;
	for (const padding of paddings) try {
		return decode(Buffer.concat([data, Buffer.alloc(padding)]));
	} catch (error) {
		if (!isRangeError(error)) throw error;
		rangeError = error;
	}
	throw rangeError;
}
function assertCreateV2FlagsAllowed({ global, mint, cashback, holderReward, creatorFeeBps }) {
	if (cashback) throw new CashbackDeprecatedError(mint);
	if (holderReward && !global.isHolderRewardEnabled) throw new HolderRewardDisabledError();
	if (!creatorFeeBps || creatorFeeBps.isZero()) return;
	if (!global.creatorFeeConfigurable) throw new CreatorFeeNotConfigurableError();
	if (creatorFeeBps.ltn(1) || creatorFeeBps.gt(global.maxConfigurableCreatorFeeBps)) throw new CreatorFeeBpsOutOfRangeError(creatorFeeBps, global.maxConfigurableCreatorFeeBps);
}
function createdCurveCreator(mint, creator, holderReward) {
	return holderReward ? holderRewardsPda(mint) : creator;
}
new PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn");
var MAX_SHAREHOLDERS = 10;
var MIGRATE_FIXED_ACCOUNTS = 25;
var MIGRATE_V2_FIXED_ACCOUNTS = 27;
function assertBoostRemainingAccounts(instruction, fixedAccounts, boostVaultAuthority, boostVault) {
	const expectedLength = fixedAccounts + 2;
	if (instruction.keys.length !== expectedLength) throw new Error(`migrate: expected ${expectedLength} accounts (${fixedAccounts} fixed + 2 boost), got ${instruction.keys.length}`);
	if (!instruction.keys[fixedAccounts].pubkey.equals(boostVaultAuthority)) throw new Error(`migrate: boost_vault_authority expected at index ${fixedAccounts}`);
	if (!instruction.keys[fixedAccounts + 1].pubkey.equals(boostVault)) throw new Error(`migrate: boost_vault expected at index ${fixedAccounts + 1}`);
}
function createV2QuoteRemainingAccounts({ mint, quoteMint, quoteTokenProgram, pumpQuote }) {
	const readonly = (pubkey) => ({
		pubkey,
		isWritable: false,
		isSigner: false
	});
	return [
		readonly(quoteMint),
		{
			pubkey: quoteAta(bondingCurvePda(mint), quoteMint, quoteTokenProgram),
			isWritable: true,
			isSigner: false
		},
		readonly(quoteTokenProgram),
		readonly(QUOTE_CONTROL_PDA),
		...pumpQuote ? [{
			mint: quoteMint,
			pool: pumpQuote.pool
		}, ...pumpQuote.chain ?? []].flatMap(({ mint: coin, pool }) => [readonly(bondingCurvePda(coin)), ...pool ? [
			readonly(pool.pool),
			readonly(pool.baseVault),
			readonly(pool.quoteVault)
		] : []]) : []
	];
}
function createAndBuyQuote(quoteMint, quoteTokenProgram) {
	return quoteMint && !isLegacyQuoteMint(quoteMint) ? {
		buyQuoteMint: quoteMint,
		buyQuoteTokenProgram: quoteTokenProgram
	} : {
		buyQuoteMint: NATIVE_MINT,
		buyQuoteTokenProgram: TOKEN_PROGRAM_ID
	};
}
var DEFAULT_VAULT_QUOTE_CANDIDATES = Object.freeze([
	{
		mint: NATIVE_MINT,
		tokenProgram: TOKEN_PROGRAM_ID
	},
	{
		mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
		tokenProgram: TOKEN_PROGRAM_ID
	},
	{
		mint: new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
		tokenProgram: TOKEN_PROGRAM_ID
	}
]);
function tradeV3Accounts({ user, mint, tokenProgram, quoteMint, quoteTokenProgram, buybackFeeRecipient }) {
	const quote = normalizeQuoteMint(quoteMint);
	const bondingCurve = bondingCurvePda(mint);
	return {
		baseMint: mint,
		quoteMint: quote,
		baseTokenProgram: tokenProgram,
		quoteTokenProgram,
		associatedBaseBondingCurve: getAssociatedTokenAddressSync(mint, bondingCurve, true, tokenProgram),
		associatedQuoteBondingCurve: quoteAta(bondingCurve, quote, quoteTokenProgram),
		user,
		associatedBaseUser: getAssociatedTokenAddressSync(mint, user, true, tokenProgram),
		associatedQuoteUser: quoteAta(user, quote, quoteTokenProgram),
		buybackFeeRecipient: isLegacyQuoteMint(quote) ? buybackFeeRecipient ?? getStaticRandomFeeRecipientForBuyback() : quoteAta(buybackFeeRecipient ?? getBuybackFeeRecipientForTokenQuote(), quote, quoteTokenProgram)
	};
}
function buybackAtaInstructions(payer, quoteMint, quoteTokenProgram, buybackFeeRecipient, route = false) {
	const quote = normalizeQuoteMint(quoteMint);
	if (isLegacyQuoteMint(quote) && !route) return [];
	const recipient = buybackFeeRecipient ?? getBuybackFeeRecipientForTokenQuote();
	return [createAssociatedTokenAccountIdempotentInstruction(payer, quoteAta(recipient, quote, quoteTokenProgram), recipient, quote, quoteTokenProgram)];
}
function lessSlippage(amount, slippage, floor = 0) {
	return import_bn.default.max(amount.sub(amount.mul(new import_bn.default(Math.floor(slippage * 10))).div(new import_bn.default(1e3))), new import_bn.default(floor));
}
function sweepBondingCurveFeeAccounts({ payer, mint, recipient, quoteMint, quoteTokenProgram }) {
	const quote = normalizeQuoteMint(quoteMint);
	return {
		payer,
		baseMint: mint,
		quoteMint: quote,
		quoteTokenProgram,
		associatedQuoteBondingCurve: quoteAta(bondingCurvePda(mint), quote, quoteTokenProgram),
		recipient,
		associatedQuoteRecipient: quoteAta(recipient, quote, quoteTokenProgram),
		eventAuthority: PUMP_EVENT_AUTHORITY_PDA,
		program: PUMP_PROGRAM_ID
	};
}
function normalizeHop(hop) {
	const side = (mint, tokenProgram) => isLegacyQuoteMint(mint) ? {
		mint: NATIVE_MINT,
		tokenProgram: TOKEN_PROGRAM_ID
	} : {
		mint,
		tokenProgram
	};
	const base = side(hop.baseMint, hop.baseTokenProgram);
	const quote = side(hop.quoteMint, hop.quoteTokenProgram);
	return {
		venue: hop.venue,
		baseMint: base.mint,
		baseTokenProgram: base.tokenProgram,
		quoteMint: quote.mint,
		quoteTokenProgram: quote.tokenProgram
	};
}
function multiHopRouteEnds(rawHops, side) {
	const hops = rawHops.map(normalizeHop);
	if (hops.length === 0) throw new Error("multi_hop_swap: a route needs at least one hop");
	const isBuy = side === "buy";
	for (const [index, hop] of hops.entries()) {
		const next = hops[index + 1];
		if (next && !(isBuy ? next.quoteMint : next.baseMint).equals(isBuy ? hop.baseMint : hop.quoteMint)) throw new Error(`multi_hop_swap: hop ${index + 1} does not continue from hop ${index}`);
	}
	const first = hops[0];
	const last = hops[hops.length - 1];
	const input = isBuy ? {
		mint: first.quoteMint,
		tokenProgram: first.quoteTokenProgram
	} : {
		mint: first.baseMint,
		tokenProgram: first.baseTokenProgram
	};
	const output = isBuy ? {
		mint: last.baseMint,
		tokenProgram: last.baseTokenProgram
	} : {
		mint: last.quoteMint,
		tokenProgram: last.quoteTokenProgram
	};
	return {
		input,
		output,
		currency: isBuy ? input : output
	};
}
function multiHopHopAccounts(rawHop) {
	const hop = normalizeHop(rawHop);
	const venue = hop.venue === "pool" ? canonicalPumpPoolPdaWithQuote(hop.baseMint, hop.quoteMint) : bondingCurvePda(hop.baseMint);
	const writable = (pubkey) => ({
		pubkey,
		isWritable: true,
		isSigner: false
	});
	return [
		{
			pubkey: hop.baseMint,
			isWritable: false,
			isSigner: false
		},
		{
			pubkey: hop.quoteMint,
			isWritable: false,
			isSigner: false
		},
		writable(venue),
		writable(quoteAta(venue, hop.baseMint, hop.baseTokenProgram)),
		writable(quoteAta(venue, hop.quoteMint, hop.quoteTokenProgram))
	];
}
var PumpSdk = class {
	constructor() {
		this.offlinePumpProgram = OFFLINE_PUMP_PROGRAM;
		this.offlinePumpFeeProgram = new Program(pump_fees_default, new AnchorProvider(null, null, {}));
		this.offlinePumpAmmProgram = new Program(pump_amm_default, new AnchorProvider(null, null, {}));
	}
	/**
	* Decodes the pump `Global` account, including the live 1045-byte account
	* that predates `creatorFeeConfigurable` / `maxConfigurableCreatorFeeBps`
	* (they read `false` / 0, see `GLOBAL_SIZE`).
	*/
	decodeGlobal(accountInfo) {
		return this.offlinePumpProgram.coder.accounts.decode("global", zeroPadded(accountInfo.data, GLOBAL_SIZE));
	}
	/**
	* Decodes a pump-fees `FeeConfig` account the way the program does
	* (`FeeConfig::deserialize_versioned`): the account length selects the
	* layout version, and the bytes after that version's last field are never
	* read. `stableFeeTiers` is empty below `FEE_CONFIG_POST_STABLE_SIZE` and
	* `exoticFlatFees` is all-zero (unset) below `FEE_CONFIG_CURRENT_SIZE`,
	* whatever bytes follow the shorter layout (a pre-allocated tail, or stale
	* tier bytes left behind when a vector was upserted shorter). Throws on data
	* shorter than `FEE_CONFIG_INITIALIZE_SIZE` or a tier vector the program
	* could not have written.
	*/
	decodeFeeConfig(accountInfo) {
		const { data } = accountInfo;
		if (data.length < 2512) throw new Error(`Invalid FeeConfig account: ${data.length} bytes, expected at least ${FEE_CONFIG_INITIALIZE_SIZE}`);
		const feeTiersEnd = feeTierVecEnd(data, FEE_CONFIG_FEE_TIERS_OFFSET);
		let readEnd;
		if (data.length < 4073) readEnd = feeTiersEnd;
		else {
			const stableFeeTiersEnd = feeTierVecEnd(data, feeTiersEnd);
			readEnd = data.length < 4097 ? stableFeeTiersEnd : stableFeeTiersEnd + FEES_LEN;
		}
		return this.offlinePumpProgram.coder.accounts.decode("feeConfig", Buffer.concat([data.subarray(0, readEnd), Buffer.alloc(VEC_LEN_PREFIX + FEES_LEN)]));
	}
	/**
	* Decodes a `BondingCurve` of every length the program has written (49, 81,
	* 82, 83, 115, 124, 125, 141, the extended 151 and the current 166 bytes)
	* the way its
	* versioned reader does: every layout is a prefix of the next and the
	* fields a shorter account lacks read as their defaults (the zero key,
	* `false`, zero). Bytes past `BONDING_CURVE_SIZE` (an extended curve) are
	* ignored. Throws below
	* the 49-byte initial layout, as the program does. A length the program
	* never writes (say 100 bytes) is not special-cased: the program would read
	* it as the longest layout that fits and ignore the rest, this zero-padded
	* read takes the extra bytes as the start of the next field.
	*/
	decodeBondingCurve(accountInfo) {
		const { data } = accountInfo;
		if (data.length < BONDING_CURVE_INITIALIZE_SIZE) throw new Error(`Invalid BondingCurve account: ${data.length} bytes, expected at least ${BONDING_CURVE_INITIALIZE_SIZE}`);
		return this.offlinePumpProgram.coder.accounts.decode("bondingCurve", zeroPadded(data, 166));
	}
	/**
	* The quote mint a pump-amm coin creator vault ATA holds, found by matching
	* the ATA against `candidates`.
	*
	* @param candidates - The quote mints to try, each with the program that
	*   owns it (the ATA is derived with it). Defaults to WSOL, mainnet USDC and
	*   devnet USDC under SPL Token. Quote-control mints and Token-2022 quotes
	*   are only found when passed here; build the list from
	*   `OnlinePumpSdk.fetchSupportedQuoteMints` plus each mint's
	*   `fetchQuoteTokenProgram` (or `resolveQuoteMint`).
	* @returns The matching mint, or `null` when no candidate matches.
	*/
	getCoinCreatorVaultQuoteMint(coinCreator, coinCreatorVaultAta, candidates = DEFAULT_VAULT_QUOTE_CANDIDATES) {
		const vaultAuthority = ammCreatorVaultPda(coinCreator);
		for (const { mint, tokenProgram } of candidates) if (getAssociatedTokenAddressSync(mint, vaultAuthority, true, tokenProgram).equals(coinCreatorVaultAta)) return mint;
		return null;
	}
	decodeBondingCurveNullable(accountInfo) {
		try {
			return this.decodeBondingCurve(accountInfo);
		} catch (error) {
			console.warn("Failed to decode bonding curve", error);
			return null;
		}
	}
	/**
	* Decodes the pump `QuoteControl` PDA. Like the program's raw reader
	* (`QuoteControl::lookup_initial_virtual_quote_reserves`, error 6075
	* `InvalidQuoteControl`), the declared `mints` length must fit in the data;
	* bytes past it (the pre-allocated tail, or stale entries left behind by a
	* remove) are ignored. The program never writes an over-declared account
	* (it grows before it pushes and never shrinks), so this only rejects
	* corrupt or foreign data, which would otherwise decode as phantom zero-key
	* entries or, for a huge count, allocate until the process dies.
	*/
	decodeQuoteControl(accountInfo) {
		const { data } = accountInfo;
		if (data.length < QUOTE_CONTROL_HEADER_LEN) throw new Error(`Invalid QuoteControl account: ${data.length} bytes, expected at least ${QUOTE_CONTROL_HEADER_LEN}`);
		const count = data.readUInt32LE(QUOTE_CONTROL_LEN_OFFSET);
		if (QUOTE_CONTROL_HEADER_LEN + count * QUOTE_CONTROL_ENTRY_LEN > data.length) throw new Error(`Invalid QuoteControl account: ${count} entries declared in ${data.length} bytes`);
		return this.offlinePumpProgram.coder.accounts.decode("quoteControl", data);
	}
	/**
	* `null` when the account is missing (the PDA is not initialized yet, which
	* the program treats as an empty list) or does not decode as a
	* `QuoteControl` (wrong discriminator, over-declared length; logged with
	* `console.warn`). Note that `OnlinePumpSdk.fetchQuoteControl` is stricter:
	* it returns `null` only for a missing account and throws on a malformed
	* one.
	*/
	decodeQuoteControlNullable(accountInfo) {
		if (!accountInfo) return null;
		try {
			return this.decodeQuoteControl(accountInfo);
		} catch (error) {
			console.warn("Failed to decode quote control", error);
			return null;
		}
	}
	decodeGlobalVolumeAccumulator(accountInfo) {
		return this.offlinePumpProgram.coder.accounts.decode("globalVolumeAccumulator", accountInfo.data);
	}
	decodeUserVolumeAccumulator(accountInfo) {
		return this.offlinePumpProgram.coder.accounts.decode("userVolumeAccumulator", accountInfo.data);
	}
	decodeUserVolumeAccumulatorNullable(accountInfo) {
		try {
			return this.decodeUserVolumeAccumulator(accountInfo);
		} catch (error) {
			console.warn("Failed to decode user volume accumulator", error);
			return null;
		}
	}
	decodeSharingConfig(accountInfo) {
		return this.offlinePumpFeeProgram.coder.accounts.decode("sharingConfig", accountInfo.data);
	}
	decodeSocialFeePda(accountInfo) {
		return this.offlinePumpFeeProgram.coder.accounts.decode("socialFeePda", accountInfo.data);
	}
	decodeSocialFeePdaClaimedEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("socialFeePdaClaimed", data);
	}
	decodeSocialFeePdaCreatedEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("socialFeePdaCreated", data);
	}
	decodeCreateFeeSharingConfigEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("createFeeSharingConfigEvent", data);
	}
	decodeUpdateFeeSharesEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("updateFeeSharesEvent", data);
	}
	decodeUpdateAdminEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("updateAdminEvent", data);
	}
	decodeSetAuthorityEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("setAuthorityEvent", data);
	}
	decodeResetFeeSharingConfigEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("resetFeeSharingConfigEvent", data);
	}
	decodeDonationFeePdaCreatedEvent(data) {
		return this.offlinePumpFeeProgram.coder.types.decode("donationFeePdaCreated", data);
	}
	decodeCollectCreatorFeeEventBc(data) {
		return this.offlinePumpProgram.coder.types.decode("collectCreatorFeeEvent", data);
	}
	decodeCollectCoinCreatorFeeEventAmm(data) {
		return this.offlinePumpAmmProgram.coder.types.decode("collectCoinCreatorFeeEvent", data);
	}
	/**
	* Decodes a pump-amm `CreatePoolEvent` emitted under any layout. The
	* vendored IDL ends the event with `creator_fee_bps: u64`,
	* `can_edit_creator_fee: bool` (configurable creator fees) and
	* `is_holder_reward: bool` (holder-reward coins); the program deployed
	* before the last emits it one byte shorter, the one before the other two
	* ten bytes shorter. The borsh coder rejects either with a RangeError, so
	* the event is retried with the missing fields' defaults appended
	* (`creatorFeeBps` zero, `canEditCreatorFee` / `isHolderReward` false). An
	* event shorter than the oldest layout still throws.
	*/
	decodeCreatePoolEventAmm(data) {
		return decodeWithTrailingDefaults(data, CREATE_POOL_EVENT_LAYOUT_PADDINGS, (bytes) => this.offlinePumpAmmProgram.coder.types.decode("createPoolEvent", bytes));
	}
	decodeDepositEventAmm(data) {
		return this.offlinePumpAmmProgram.coder.types.decode("depositEvent", data);
	}
	decodeWithdrawEventAmm(data) {
		return this.offlinePumpAmmProgram.coder.types.decode("withdrawEvent", data);
	}
	/**
	* Decodes a pump-amm `BuyEvent` emitted under any deployment's layout: the
	* vendored IDL ends it with `holder_rewards_bps` / `holder_rewards`
	* (holder-reward coins) then `creator_fee_unclaimed` (the pool's creator
	* bucket after the trade); an event from a program without them decodes
	* with the missing fields zero.
	*/
	decodeBuyEventAmm(data) {
		return decodeWithTrailingDefaults(data, TRADE_EVENT_LAYOUT_PADDINGS, (bytes) => this.offlinePumpAmmProgram.coder.types.decode("buyEvent", bytes));
	}
	/** Like `decodeBuyEventAmm`, for `SellEvent`. */
	decodeSellEventAmm(data) {
		return decodeWithTrailingDefaults(data, TRADE_EVENT_LAYOUT_PADDINGS, (bytes) => this.offlinePumpAmmProgram.coder.types.decode("sellEvent", bytes));
	}
	decodeAdminCtoPoolEventAmm(data) {
		return this.offlinePumpAmmProgram.coder.types.decode("adminCtoPoolEvent", data);
	}
	/**
	* Decodes a bonding-curve `CreateEvent` emitted under any deployment's
	* layout. The vendored IDL ends the event with `creator_fee_bps: u64`
	* (configurable creator fees), `is_holder_reward: bool` (holder-reward
	* coins) then `depth: u8` (pump-coin quotes). A program without some of
	* these trailing fields emits a shorter event; the borsh coder rejects it
	* with a RangeError, so the event is retried with the missing fields'
	* encodings appended, shortest padding first. A missing field decodes as
	* its default: `creatorFeeBps` zero, `isHolderReward` false, `depth` 0. An
	* event truncated inside a field still throws.
	*/
	decodeCreateEventBc(data) {
		return decodeWithTrailingDefaults(data, CREATE_EVENT_LAYOUT_PADDINGS, (bytes) => this.offlinePumpProgram.coder.types.decode("createEvent", bytes));
	}
	/**
	* Decodes a bonding-curve `TradeEvent` emitted under any deployment's
	* layout: the vendored IDL ends it with `holder_rewards_bps` /
	* `holder_rewards` (holder-reward coins) then `creator_fee_unclaimed` (the
	* curve's creator bucket after the trade); an event from a program without
	* them decodes with the missing fields zero.
	*/
	decodeTradeEventBc(data) {
		return decodeWithTrailingDefaults(data, TRADE_EVENT_LAYOUT_PADDINGS, (bytes) => this.offlinePumpProgram.coder.types.decode("tradeEvent", bytes));
	}
	decodeCompleteEventBc(data) {
		return this.offlinePumpProgram.coder.types.decode("completeEvent", data);
	}
	decodeAdminCtoEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("adminCtoEvent", data);
	}
	decodeDistributeFeeToHoldersEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("distributeFeeToHoldersEvent", data);
	}
	decodeSetQuoteControlAdminEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("setQuoteControlAdminEvent", data);
	}
	decodeAddQuoteControlMintEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("addQuoteControlMintEvent", data);
	}
	decodeRemoveQuoteControlMintEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("removeQuoteControlMintEvent", data);
	}
	decodeUpdateCreatorFeeConfigEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("updateCreatorFeeConfigEvent", data);
	}
	decodeClaimCashbackEventBc(data) {
		return this.offlinePumpProgram.coder.types.decode("claimCashbackEvent", data);
	}
	decodeClaimCashbackEventAmm(data) {
		return this.offlinePumpAmmProgram.coder.types.decode("claimCashbackEvent", data);
	}
	decodePostCompleteBuyEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("postCompleteBuyEvent", data);
	}
	decodeSweepBondingCurveFeeEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("sweepBondingCurveFeeEvent", data);
	}
	decodeSweepPoolFeeEventAmm(data) {
		return this.offlinePumpAmmProgram.coder.types.decode("sweepPoolFeeEvent", data);
	}
	decodeDonationFeePda(accountInfo) {
		return this.offlinePumpFeeProgram.coder.accounts.decode("donationFeePda", accountInfo.data);
	}
	/**
	* @deprecated Use `createV2Instruction` instead.
	*/
	async createInstruction({ mint, name, symbol, uri, creator, user }) {
		return await this.offlinePumpProgram.methods.create(name, symbol, uri, creator).accountsPartial({
			mint,
			user,
			tokenProgram: TOKEN_PROGRAM_ID
		}).instruction();
	}
	/**
	* Builds `create_v2`. Without `quoteMint` (or with legacy WSOL / the zero
	* key) the curve is quoted in SOL and the instruction is unchanged from
	* earlier SDK versions. Any other `quoteMint` must be whitelisted on
	* `Global` or listed in the `QuoteControl` PDA
	* (`OnlinePumpSdk.fetchSupportedQuoteMints`) and is selected by four
	* positional remaining accounts: [0] the quote mint (read-only), [1] the
	* bonding curve's quote ATA derived under `quoteTokenProgram` (writable; the
	* program creates it), [2] `quoteTokenProgram` (read-only), [3] the
	* `QuoteControl` PDA (`QUOTE_CONTROL_PDA`, read-only). The PDA is always
	* sent: the program reads it only for a mint `Global` does not whitelist,
	* and the program deployed before quote control ignores a fourth account.
	*
	* A mint admitted only through quote control cannot be combined with
	* `mayhemMode` (6071 `MayhemModeQuoteMintNotAllowed`). Token-quoted creates
	* are heavy (a mayhem create with a token quote ~200-240k CU, the first
	* `buy_v2` on a Token-2022 quote ~200-220k), so add an explicit
	* `ComputeBudgetProgram.setComputeUnitLimit`: ~500k for create + buy with a
	* token quote, ~250-300k for a standalone `buy_v2` / `sell_v2` on a
	* Token-2022 quote.
	*
	* @param params.quoteTokenProgram - The program that owns `quoteMint`
	*   (`TOKEN_PROGRAM_ID` or `TOKEN_2022_PROGRAM_ID`); the program rejects a
	*   mismatch with 6063 `UnsupportedQuoteMint`. Defaults to
	*   `TOKEN_PROGRAM_ID`, which is right for USDC; resolve it with
	*   `OnlinePumpSdk.fetchQuoteTokenProgram` for anything else. Ignored for
	*   SOL.
	* @param params.creatorFeeBps - The coin's own creator fee rate in basis
	*   points (see `BondingCurve.creatorFeeBps`). Omitted or zero means the
	*   pump-fees schedule rate. Always encoded as the 8-byte `creator_fee_bps`
	*   argument, zero when unset. A nonzero rate needs
	*   `Global.creatorFeeConfigurable` and
	*   `1..=Global.maxConfigurableCreatorFeeBps` (6077 / 6078), and only a
	*   quote admitted through `QuoteControl` stores it (on SOL or USDC it is
	*   ignored); this builder encodes what it is given and leaves the program
	*   to judge. Quote the first buy with the same rate
	*   (`getBuyTokenAmountFromSolAmount`'s `creatorFeeBps`). The rate changes
	*   afterwards only through a CTO (`adminCtoInstruction`).
	* @param params.holderReward - Creates a holder-reward coin: the program
	*   ignores `creator` and makes the coin's `holderRewardsPda(mint)` the
	*   creator, so every creator fee accrues to that PDA's vault and is paid
	*   out to holders through `distribute_fee_to_holders`. Permanent. Always
	*   encoded as the trailing 1-byte `is_holder_reward` argument, `false`
	*   when unset: the program deployed before holder-reward coins ignores
	*   trailing instruction bytes, the new one reads them. Needs
	*   `Global.isHolderRewardEnabled` (6084). The first buy's creator vault
	*   must then be the PDA's: the create-and-buy builders handle it.
	* @param params.cashback - Deprecated. `create_v2` rejects `true` with 6082
	*   `CashbackDeprecated`; existing cashback coins are unaffected. Still
	*   encoded as given so the instruction bytes stay predictable.
	* @param params.pumpQuote - Set when `quoteMint` is a pump coin listed
	*   nowhere: appends Q's bonding curve (and, once Q migrated, its pool
	*   accounts), then the same group for each coin below Q. Such a coin seeds
	*   its reserves from the live reserves of Q's whole quote chain, stores
	*   `depth = Q.depth + 1` (at most `Global.maxCurveDepth` and 5), cannot be
	*   mayhem mode and may set `creatorFeeBps`. Budget ~200k CU; a deep chain
	*   of migrated coins needs a v0 transaction with a lookup table.
	*/
	async createV2Instruction({ mint, name, symbol, uri, creator, user, mayhemMode, cashback = false, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID, creatorFeeBps, holderReward = false, pumpQuote }) {
		const builder = this.offlinePumpProgram.methods.createV2(name, symbol, uri, creator, mayhemMode, [cashback ?? false], [new import_bn.default(creatorFeeBps ?? 0)], [holderReward ?? false]).accountsPartial({
			mint,
			user,
			tokenProgram: TOKEN_2022_PROGRAM_ID,
			mayhemProgramId: MAYHEM_PROGRAM_ID,
			globalParams: getGlobalParamsPda(),
			solVault: getSolVaultPda(),
			mayhemState: getMayhemStatePda(mint),
			mayhemTokenVault: getTokenVaultPda(mint)
		});
		if (quoteMint && !isLegacyQuoteMint(quoteMint)) return await builder.remainingAccounts(createV2QuoteRemainingAccounts({
			mint,
			quoteMint,
			quoteTokenProgram,
			pumpQuote
		})).instruction();
		return await builder.instruction();
	}
	/**
	* `set_max_curve_depth`: how deep a pump-coin quote chain `create_v2` may
	* build (`Global.maxCurveDepth`; 0 disables pump-coin quotes, 1 admits
	* coins quoted in depth-0 coins only; the program caps it at
	* `MAX_CURVE_DEPTH`, 5, whatever is set). `authority` signs and must be
	* `Global.authority`.
	*/
	async setMaxCurveDepthInstruction({ authority, maxCurveDepth }) {
		return await this.offlinePumpProgram.methods.setMaxCurveDepth(maxCurveDepth).accountsPartial({
			global: GLOBAL_PDA,
			authority,
			eventAuthority: PUMP_EVENT_AUTHORITY_PDA,
			program: PUMP_PROGRAM_ID
		}).instruction();
	}
	async buyInstructions({ global, bondingCurveAccountInfo, bondingCurve, associatedUserAccountInfo, mint, user, amount, solAmount, slippage, tokenProgram = TOKEN_PROGRAM_ID }) {
		const instructions = [];
		const associatedUser = getAssociatedTokenAddressSync(mint, user, true, tokenProgram);
		if (!associatedUserAccountInfo) instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint, tokenProgram));
		instructions.push(await this.buyInstruction({
			global,
			mint,
			creator: bondingCurve.creator,
			user,
			associatedUser,
			amount,
			solAmount,
			slippage,
			tokenProgram,
			mayhemMode: bondingCurve.isMayhemMode
		}));
		return instructions;
	}
	/**
	* `create_v2` + the user's base ATA + a first legacy `buy`, SOL-quoted.
	*
	* @param params.creatorFeeBps - Forwarded to `createV2Instruction`. Unlike
	*   that builder this one holds `global`, so a nonzero rate the program
	*   would reject throws up front: `CreatorFeeNotConfigurableError` (gate
	*   off), `CreatorFeeBpsOutOfRangeError` (outside
	*   `1..=global.maxConfigurableCreatorFeeBps`). Quote `amount` with the same
	*   rate (`getBuyTokenAmountFromSolAmount`'s `creatorFeeBps`), or the buy's
	*   `solAmount` falls short of the fees the program charges.
	* @param params.holderReward - Forwarded to `createV2Instruction`; the buy
	*   then targets the holder-rewards PDA's creator vault, as the program
	*   does. Throws `HolderRewardDisabledError` while
	*   `global.isHolderRewardEnabled` is off.
	* @param params.cashback - Deprecated: throws `CashbackDeprecatedError`
	*   when `true`, as `create_v2` would fail with 6082.
	*/
	async createV2AndBuyInstructions({ global, mint, name, symbol, uri, creator, user, amount, solAmount, mayhemMode, cashback, isTokenizedAgent = false, buyBackBps = 0, creatorFeeBps, holderReward = false }) {
		assertCreateV2FlagsAllowed({
			global,
			mint,
			cashback,
			holderReward,
			creatorFeeBps
		});
		const associatedUser = getAssociatedTokenAddressSync(mint, user, true, TOKEN_2022_PROGRAM_ID);
		const buyInstruction = await this.buyInstruction({
			global,
			mint,
			creator: createdCurveCreator(mint, creator, holderReward),
			user,
			associatedUser,
			amount,
			solAmount,
			slippage: 1,
			tokenProgram: TOKEN_2022_PROGRAM_ID,
			mayhemMode
		});
		const instructions = [
			await this.createV2Instruction({
				mint,
				name,
				symbol,
				uri,
				creator,
				user,
				mayhemMode,
				cashback,
				creatorFeeBps,
				holderReward
			}),
			createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint, TOKEN_2022_PROGRAM_ID),
			buyInstruction
		];
		if (isTokenizedAgent) {
			const agentInitializeIx = await v.load(mint).create({
				authority: creator,
				mint,
				agentAuthority: creator,
				buybackBps: buyBackBps
			});
			instructions.push(agentInitializeIx);
		}
		return instructions;
	}
	/**
	* @deprecated Use `createV2AndBuyInstructions` instead.
	*/
	async createAndBuyInstructions({ global, mint, name, symbol, uri, creator, user, amount, solAmount, isTokenizedAgent = false, buyBackBps = 0 }) {
		const associatedUser = getAssociatedTokenAddressSync(mint, user, true);
		const buyInstruction = await this.buyInstruction({
			global,
			mint,
			creator,
			user,
			associatedUser,
			amount,
			solAmount,
			slippage: 1,
			tokenProgram: TOKEN_PROGRAM_ID,
			mayhemMode: false
		});
		const instructions = [
			await this.createInstruction({
				mint,
				name,
				symbol,
				uri,
				creator,
				user
			}),
			createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint),
			buyInstruction
		];
		if (isTokenizedAgent) {
			const agentInitializeIx = await v.load(mint).create({
				authority: creator,
				mint,
				agentAuthority: creator,
				buybackBps: buyBackBps
			});
			instructions.push(agentInitializeIx);
		}
		return instructions;
	}
	async buyInstruction({ global, mint, creator, user, associatedUser, amount, solAmount, slippage, tokenProgram = TOKEN_PROGRAM_ID, mayhemMode = false }) {
		return await this.getBuyInstructionInternal({
			user,
			associatedUser,
			mint,
			creator,
			feeRecipient: getFeeRecipient(global, mayhemMode),
			buybackFeeRecipient: getStaticRandomFeeRecipientForBuyback(),
			amount,
			solAmount: solAmount.add(solAmount.mul(new import_bn.default(Math.floor(slippage * 10))).div(new import_bn.default(1e3))),
			tokenProgram
		});
	}
	async sellInstructions({ global, bondingCurveAccountInfo, bondingCurve, mint, user, amount, solAmount, slippage, tokenProgram = TOKEN_PROGRAM_ID, mayhemMode = false, cashback = false }) {
		const instructions = [];
		instructions.push(await this.getSellInstructionInternal({
			user,
			mint,
			creator: bondingCurve.creator,
			feeRecipient: getFeeRecipient(global, mayhemMode),
			buybackFeeRecipient: getStaticRandomFeeRecipientForBuyback(),
			amount,
			solAmount: solAmount.sub(solAmount.mul(new import_bn.default(Math.floor(slippage * 10))).div(new import_bn.default(1e3))),
			tokenProgram,
			cashback
		}));
		return instructions;
	}
	async extendAccountInstruction({ account, user }) {
		return this.offlinePumpProgram.methods.extendAccount().accountsPartial({
			account,
			user
		}).instruction();
	}
	async migrateInstruction({ withdrawAuthority, mint, user, tokenProgram = TOKEN_PROGRAM_ID }) {
		const bondingCurve = bondingCurvePda(mint);
		const associatedBondingCurve = getAssociatedTokenAddressSync(mint, bondingCurve, true, tokenProgram);
		const poolAuthority = pumpPoolAuthorityPda(mint);
		const poolAuthorityMintAccount = getAssociatedTokenAddressSync(mint, poolAuthority, true, tokenProgram);
		const pool = canonicalPumpPoolPda(mint);
		const poolBaseTokenAccount = getAssociatedTokenAddressSync(mint, pool, true, tokenProgram);
		const boostVaultAuthority = boostVaultAuthorityPda(pool);
		const boostVault = getAssociatedTokenAddressSync(NATIVE_MINT, boostVaultAuthority, true, TOKEN_PROGRAM_ID);
		const instruction = await this.offlinePumpProgram.methods.migrate().accountsPartial({
			mint,
			user,
			withdrawAuthority,
			associatedBondingCurve,
			poolAuthorityMintAccount,
			poolBaseTokenAccount
		}).remainingAccounts([{
			pubkey: boostVaultAuthority,
			isWritable: false,
			isSigner: false
		}, {
			pubkey: boostVault,
			isWritable: true,
			isSigner: false
		}]).instruction();
		assertBoostRemainingAccounts(instruction, MIGRATE_FIXED_ACCOUNTS, boostVaultAuthority, boostVault);
		return instruction;
	}
	/**
	* @param params.quoteMint - The curve's quote mint; `bondingCurve.quoteMint`
	*   can be passed as is. `migrate_v2` accepts the mint the curve stores or,
	*   for a SOL curve (which stores the zero key), legacy WSOL, and the pool
	*   and every quote ATA are derived from WSOL in that case, so the zero key
	*   and `undefined` are normalized to `NATIVE_MINT`.
	* @param params.quoteTokenProgram - The program that owns `quoteMint`; all
	*   quote-side ATAs are derived with it. Defaults to `TOKEN_PROGRAM_ID`
	*   (SOL, USDC); pass `TOKEN_2022_PROGRAM_ID` for a Token-2022 quote.
	*/
	async migrateV2Instruction({ withdrawAuthority, mint, user, quoteMint: quoteMintOrDefault, baseTokenProgram = TOKEN_2022_PROGRAM_ID, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const quoteMint = normalizeQuoteMint(quoteMintOrDefault);
		const bondingCurve = bondingCurvePda(mint);
		const poolAuthority = pumpPoolAuthorityPda(mint);
		const poolAuthorityMintAccount = getAssociatedTokenAddressSync(mint, poolAuthority, true, baseTokenProgram);
		const pool = canonicalPumpPoolPdaWithQuote(mint, quoteMint);
		const poolBaseTokenAccount = getAssociatedTokenAddressSync(mint, pool, true, baseTokenProgram);
		const associatedBaseBondingCurve = getAssociatedTokenAddressSync(mint, bondingCurve, true, baseTokenProgram);
		const associatedQuoteBondingCurve = quoteAta(bondingCurve, quoteMint, quoteTokenProgram);
		const poolAuthorityQuoteAccount = quoteAta(poolAuthority, quoteMint, quoteTokenProgram);
		const poolQuoteTokenAccount = getAssociatedTokenAddressSync(quoteMint, pool, true, quoteTokenProgram);
		const boostVaultAuthority = boostVaultAuthorityPda(pool);
		const boostVault = getAssociatedTokenAddressSync(quoteMint, boostVaultAuthority, true, quoteTokenProgram);
		const instruction = await this.offlinePumpProgram.methods.migrateV2().accountsPartial({
			baseMint: mint,
			quoteMint,
			user,
			withdrawAuthority,
			bondingCurve,
			poolAuthorityMintAccount,
			poolBaseTokenAccount,
			pool,
			poolAuthority,
			systemProgram: SystemProgram.programId,
			pumpAmm: PUMP_AMM_PROGRAM_ID,
			pumpAmmEventAuthority: getEventAuthorityPda(PUMP_AMM_PROGRAM_ID),
			eventAuthority: getEventAuthorityPda(PUMP_PROGRAM_ID),
			program: PUMP_PROGRAM_ID,
			associatedBaseBondingCurve,
			associatedQuoteBondingCurve,
			poolAuthorityQuoteAccount,
			poolQuoteTokenAccount,
			baseTokenProgram,
			quoteTokenProgram
		}).remainingAccounts([{
			pubkey: boostVaultAuthority,
			isWritable: false,
			isSigner: false
		}, {
			pubkey: boostVault,
			isWritable: true,
			isSigner: false
		}]).instruction();
		assertBoostRemainingAccounts(instruction, MIGRATE_V2_FIXED_ACCOUNTS, boostVaultAuthority, boostVault);
		return instruction;
	}
	async syncUserVolumeAccumulator(user) {
		return await this.offlinePumpProgram.methods.syncUserVolumeAccumulator().accountsPartial({ user }).instruction();
	}
	async setCreator({ mint, setCreatorAuthority, creator }) {
		return await this.offlinePumpProgram.methods.setCreator(creator).accountsPartial({
			mint,
			setCreatorAuthority
		}).instruction();
	}
	async initUserVolumeAccumulator({ payer, user }) {
		return await this.offlinePumpProgram.methods.initUserVolumeAccumulator().accountsPartial({
			payer,
			user
		}).instruction();
	}
	async closeUserVolumeAccumulator(user) {
		return await this.offlinePumpProgram.methods.closeUserVolumeAccumulator().accountsPartial({ user }).instruction();
	}
	/**
	* `initialize_quote_control`: creates the `QuoteControl` PDA
	* (`QUOTE_CONTROL_PDA`) with no admin and an empty mint list. Permissionless
	* and once only (a second call fails in the system program, so nobody can
	* reset the list); `user` signs and pays the rent for the initial 2108
	* bytes. Only `Global.authority` can then assign an admin via
	* `setQuoteControlAdminInstruction`.
	*/
	async initializeQuoteControlInstruction({ user }) {
		return await this.offlinePumpProgram.methods.initializeQuoteControl().accountsPartial({ user }).instruction();
	}
	/**
	* `set_quote_control_admin`: `authority` must sign and be `Global.authority`.
	* The zero key revokes the admin, after which only `Global.authority` can
	* change the list.
	*/
	async setQuoteControlAdminInstruction({ authority, newAdmin }) {
		return await this.offlinePumpProgram.methods.setQuoteControlAdmin(newAdmin).accountsPartial({ authority }).instruction();
	}
	/**
	* `add_quote_control_mint`: lists `quoteMint` as a `create_v2` quote, with
	* the `virtualQuoteReserves` a new curve quoted in it starts from (stored as
	* given, in the mint's base units). `authority` signs and must be
	* `QuoteControl.admin` or `Global.authority`; it pays the rent top-up when
	* the list grows past the 50 pre-allocated entries. The program rejects the
	* zero key, WSOL and the Token-2022 native mint (6069), a mint already
	* listed (6067; change its reserves with remove + add) and a full list of
	* 256 (6066). A mint `Global` whitelists may be listed too but keeps
	* `Global.initialVirtualQuoteReserves`.
	*/
	async addQuoteControlMintInstruction({ authority, quoteMint, initialVirtualQuoteReserves }) {
		return await this.offlinePumpProgram.methods.addQuoteControlMint(quoteMint, initialVirtualQuoteReserves).accountsPartial({ authority }).instruction();
	}
	/**
	* `remove_quote_control_mint`: de-lists `quoteMint` (6068 when it is not
	* listed). Same signer rule as `addQuoteControlMintInstruction`. Existing
	* curves quoted in the mint keep trading; only new `create_v2` calls are
	* refused.
	*/
	async removeQuoteControlMintInstruction({ authority, quoteMint }) {
		return await this.offlinePumpProgram.methods.removeQuoteControlMint(quoteMint).accountsPartial({ authority }).instruction();
	}
	/**
	* `update_creator_fee_config`: turns per-coin creator fees on or off and
	* sets the ceiling a coin may configure (`Global.creatorFeeConfigurable`,
	* `Global.maxConfigurableCreatorFeeBps`). `authority` signs and must be
	* `Global.authority`. The program puts no bound on the ceiling: a rate that
	* pushes protocol + creator fees past 100% makes a coin buy-only. With the
	* gate off, configured rates are neither read nor accepted (kill switch).
	* Fails on the live 1045-byte `Global` until `extend_account` grows it to
	* `GLOBAL_SIZE`.
	*/
	async updateCreatorFeeConfigInstruction({ authority, creatorFeeConfigurable, maxConfigurableCreatorFeeBps }) {
		return await this.offlinePumpProgram.methods.updateCreatorFeeConfig(creatorFeeConfigurable, maxConfigurableCreatorFeeBps).accountsPartial({ authority }).instruction();
	}
	/**
	* `update_holder_reward_config`: turns holder-reward coin creation (and CTO
	* holder conversion) on or off and names the one signer
	* `distribute_fee_to_holders` accepts (`Global.isHolderRewardEnabled`,
	* `Global.holderRewardClaimAuthority`). `authority` signs and must be
	* `Global.authority`. Fails on a `Global` shorter than `GLOBAL_SIZE` until
	* `extend_account` grows it.
	*/
	async updateHolderRewardConfigInstruction({ authority, isHolderRewardEnabled, holderRewardClaimAuthority }) {
		return await this.offlinePumpProgram.methods.updateHolderRewardConfig(isHolderRewardEnabled, holderRewardClaimAuthority).accountsPartial({ authority }).instruction();
	}
	/**
	* `admin_cto`, the one community-takeover instruction: re-points where a
	* coin's creator fees go on the bonding curve, its canonical pump-amm pool
	* (through `admin_cto_pool`, when one exists) and its pump-fees
	* `SharingConfig` (through `admin_cto_sharing_config`, when the coin is
	* fee-shared), in one transaction. `adminSetCreatorAuthority` signs, must
	* be `Global.adminSetCreatorAuthority`, and pays the rent that grows a
	* pre-upgrade curve or pool and any ATA created. Budget
	* `ADMIN_CTO_COMPUTE_UNIT_LIMIT` compute units.
	*
	* Two paths, chosen by the arguments (the program rejects the rest):
	* - **new creator**: `newCreator` set, `isHolderReward` unset or `false`.
	*   The outgoing wallet creator is first paid from both vaults; a
	*   fee-shared coin keeps its SharingConfig as creator and the config is
	*   rewritten to `newCreator` at 100%.
	* - **holder rewards**: `isHolderReward: true`, no `newCreator`. The
	*   creator becomes `holderRewardsPda(mint)`, cashback is cleared, a
	*   fee-shared coin's vaults are swept into that PDA's creator vault and
	*   its SharingConfig is terminated. Permanent: a later CTO on the coin may
	*   only repeat this path to change the rate (6083 otherwise). Needs
	*   `Global.isHolderRewardEnabled` (6084).
	*
	* `creatorFeeBps` may be set on either path, only on a quote admitted
	* through `QuoteControl` (6091 on SOL or a whitelisted quote), within
	* `1..=Global.maxConfigurableCreatorFeeBps` with the gate on (6078 / 6077),
	* and not on a coin that stays cashback (6080). Mayhem coins are refused
	* (6088). This builder encodes what it is given;
	* `OnlinePumpSdk.adminCtoInstructions` resolves the accounts from chain,
	* checks these rules up front and prepends the fee sweeps below.
	*
	* Un-swept creator fees block it: put `sweepCreatorFeeInstruction` (and,
	* on a graduated coin, `sweepPoolCreatorFeeInstruction`) first in the same
	* transaction, or it fails with 6095 `CreatorFeesNotSwept` (pump-amm 6081)
	* whenever v3 / pool v2 trades left creator fees behind.
	*
	* @param params.currentCreator - `bondingCurve.creator` as stored (the zero
	*   key on a legacy curve, the SharingConfig PDA on a fee-shared coin, the
	*   holder-rewards PDA on a holder-reward coin). Marked writable unless it
	*   is the zero key, so a wallet creator can be paid (6092 otherwise).
	* @param params.quoteMint - The curve's quote mint, `NATIVE_MINT` for a
	*   SOL-quoted or legacy curve (the program accepts WSOL for a curve that
	*   stores the zero key). Every quote ATA and the pool address derive from
	*   it and `quoteTokenProgram`, the program that owns the mint.
	*/
	async adminCtoInstruction({ adminSetCreatorAuthority, mint, currentCreator, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID, isHolderReward, creatorFeeBps, newCreator }) {
		const creatorVault = creatorVaultPda(currentCreator);
		const holderCreatorVault = creatorVaultPda(holderRewardsPda(mint));
		const coinCreatorVaultAuthority = ammCreatorVaultPda(currentCreator);
		const ata = (owner) => quoteAta(owner, quoteMint, quoteTokenProgram);
		const instruction = await this.offlinePumpProgram.methods.adminCto(isHolderReward ?? null, creatorFeeBps ?? null, newCreator ?? null).accountsPartial({
			adminSetCreatorAuthority,
			global: GLOBAL_PDA,
			mint,
			quoteMint,
			quoteTokenProgram,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			systemProgram: SystemProgram.programId,
			bondingCurve: bondingCurvePda(mint),
			currentCreator,
			currentCreatorQuoteTokenAccount: ata(currentCreator),
			creatorVault,
			creatorVaultQuoteTokenAccount: ata(creatorVault),
			holderCreatorVault,
			holderCreatorVaultQuoteTokenAccount: ata(holderCreatorVault),
			pumpAmm: PUMP_AMM_PROGRAM_ID,
			ammGlobalConfig: GLOBAL_CONFIG_PDA,
			poolAuthority: pumpPoolAuthorityPda(mint),
			pool: canonicalPumpPoolPdaWithQuote(mint, quoteMint),
			pumpAmmEventAuthority: PUMP_AMM_EVENT_AUTHORITY_PDA,
			coinCreatorVaultAuthority,
			coinCreatorVaultAta: ata(coinCreatorVaultAuthority),
			sharingConfig: feeSharingConfigPda(mint),
			pumpFees: PUMP_FEE_PROGRAM_ID,
			pumpFeesEventAuthority: PUMP_FEE_EVENT_AUTHORITY_PDA,
			eventAuthority: PUMP_EVENT_AUTHORITY_PDA,
			program: PUMP_PROGRAM_ID
		}).instruction();
		if (!currentCreator.equals(PublicKey.default)) {
			for (const key of instruction.keys) if (key.pubkey.equals(currentCreator)) key.isWritable = true;
		}
		return instruction;
	}
	/**
	* `distribute_fee_to_holders`: pays the fees collected on a holder-reward
	* coin's `holderRewardsPda(mint)` out to holders. Signed by
	* `Global.holderRewardClaimAuthority`, who also pays the rent of any
	* recipient quote ATA created (token quotes only). `recipients[i].amount`
	* goes to `recipients[i].owner`: as lamports on a SOL quote, as tokens into
	* the owner's quote ATA (created if missing) on a token quote. The program
	* checks `amounts.length * 2 == remaining accounts` and each ATA (6085),
	* refuses to leave the PDA between zero and its rent-exempt minimum on a
	* SOL quote (6086; draining it fully is fine) and needs
	* `holderRewardsTokenAccount` on a token quote (6087).
	*
	* The fees reach the PDA through the permissionless collects with the PDA
	* as `creator`: `collect_creator_fee` / `collect_creator_fee_v2` on the
	* curve and, after graduation, pump-amm's `collect_coin_creator_fee` or
	* `transfer_creator_fees_to_pump`.
	*
	* @param params.holderRewardsTokenAccount - Any quote token account owned
	*   by the PDA, normally `quoteAta(holderRewardsPda(mint), quoteMint,
	*   quoteTokenProgram)`. The payout source on a token quote; on a SOL quote
	*   a parked WSOL account that is closed into the PDA first. Omit when
	*   there is none (SOL quote only).
	*/
	async distributeFeeToHoldersInstruction({ holderRewardClaimAuthority, mint, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID, recipients, holderRewardsTokenAccount }) {
		const isNative = quoteMint.equals(NATIVE_MINT);
		const remainingAccounts = recipients.flatMap(({ owner }) => [{
			pubkey: owner,
			isSigner: false,
			isWritable: isNative
		}, {
			pubkey: quoteAta(owner, quoteMint, quoteTokenProgram),
			isSigner: false,
			isWritable: !isNative
		}]);
		return await this.offlinePumpProgram.methods.distributeFeeToHolders(recipients.map(({ amount }) => amount)).accountsPartial({
			global: GLOBAL_PDA,
			holderRewardClaimAuthority,
			mint,
			holderRewards: holderRewardsPda(mint),
			holderRewardsTokenAccount: holderRewardsTokenAccount ?? null,
			quoteMint,
			quoteTokenProgram,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			systemProgram: SystemProgram.programId,
			eventAuthority: PUMP_EVENT_AUTHORITY_PDA,
			program: PUMP_PROGRAM_ID
		}).remainingAccounts(remainingAccounts).instruction();
	}
	/**
	* pump-fees `set_exotic_flat_fees` on the pump `FeeConfig`
	* (`PUMP_FEE_CONFIG_PDA`): the flat schedule canonical curves and pools pay
	* when quoted in a mint that is neither SOL-like nor a listed stable (see
	* `selectCurveFeeSchedule`). `admin` signs, must be `FeeConfig.admin`, and
	* pays the rent top-up when the account still has the pre-exotic length.
	* All-zero fees mean unset: the program then charges `flatFees`.
	*/
	async setExoticFlatFeesInstruction({ admin, exoticFlatFees }) {
		return await this.offlinePumpFeeProgram.methods.setExoticFlatFees(exoticFlatFees).accountsPartial({
			admin,
			configProgramId: PUMP_PROGRAM_ID
		}).instruction();
	}
	async getBuyInstructionRaw({ user, mint, creator, amount, solAmount, feeRecipient = getStaticRandomFeeRecipient(), tokenProgram = TOKEN_PROGRAM_ID, buybackFeeRecipient = getStaticRandomFeeRecipientForBuyback() }) {
		return await this.getBuyInstructionInternal({
			user,
			associatedUser: getAssociatedTokenAddressSync(mint, user, true, tokenProgram),
			mint,
			creator,
			feeRecipient,
			buybackFeeRecipient,
			amount,
			solAmount,
			tokenProgram
		});
	}
	async getBuyInstructionInternal({ user, associatedUser, mint, creator, feeRecipient, buybackFeeRecipient, amount, solAmount, tokenProgram = TOKEN_PROGRAM_ID }) {
		return await this.offlinePumpProgram.methods.buy(amount, solAmount, { 0: true }, { 0: false }).accountsPartial({
			feeRecipient,
			mint,
			associatedUser,
			user,
			creatorVault: creatorVaultPda(creator),
			tokenProgram
		}).remainingAccounts([{
			pubkey: bondingCurveV2Pda(mint),
			isWritable: false,
			isSigner: false
		}, {
			pubkey: buybackFeeRecipient,
			isWritable: true,
			isSigner: false
		}]).instruction();
	}
	async getSellInstructionRaw({ user, mint, creator, amount, solAmount, feeRecipient = getStaticRandomFeeRecipient(), buybackFeeRecipient = getStaticRandomFeeRecipientForBuyback(), tokenProgram = TOKEN_PROGRAM_ID, cashback = false }) {
		return await this.getSellInstructionInternal({
			user,
			mint,
			creator,
			feeRecipient,
			buybackFeeRecipient,
			amount,
			solAmount,
			tokenProgram,
			cashback
		});
	}
	async getSellInstructionInternal({ user, mint, creator, feeRecipient, buybackFeeRecipient, amount, solAmount, tokenProgram, cashback }) {
		const userVolumeAccumulator = userVolumeAccumulatorPda(user);
		const fixedRemaininAccounts = [{
			pubkey: bondingCurveV2Pda(mint),
			isWritable: false,
			isSigner: false
		}, {
			pubkey: buybackFeeRecipient,
			isWritable: true,
			isSigner: false
		}];
		return await this.offlinePumpProgram.methods.sell(amount, solAmount).accountsPartial({
			feeRecipient,
			mint,
			associatedUser: getAssociatedTokenAddressSync(mint, user, true, tokenProgram),
			user,
			creatorVault: creatorVaultPda(creator),
			tokenProgram
		}).remainingAccounts(cashback ? [{
			pubkey: userVolumeAccumulator,
			isWritable: true,
			isSigner: false
		}, ...fixedRemaininAccounts] : fixedRemaininAccounts).instruction();
	}
	async buyV2Instructions({ global, bondingCurveAccountInfo, bondingCurve, associatedUserAccountInfo, mint, user, amount, quoteAmount, slippage, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const instructions = [];
		const associatedUser = getAssociatedTokenAddressSync(mint, user, true, tokenProgram);
		if (!associatedUserAccountInfo) instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint, tokenProgram));
		const quoteMint = isLegacyQuoteMint(bondingCurve.quoteMint) ? NATIVE_MINT : bondingCurve.quoteMint;
		instructions.push(await this.buyV2Instruction({
			global,
			mint,
			creator: bondingCurve.creator,
			user,
			associatedUser,
			amount,
			quoteAmount,
			slippage,
			tokenProgram,
			quoteMint,
			quoteTokenProgram,
			mayhemMode: bondingCurve.isMayhemMode
		}));
		return instructions;
	}
	/**
	* `create_v2` + the user's base ATA + a first `buy_v2`, all agreeing on the
	* quote. See `createV2Instruction` for the quote rules and the compute
	* budget to add (~500k CU for a token quote).
	*
	* @param params.quoteTokenProgram - The program that owns `quoteMint`; used
	*   by both the create and the buy. Defaults to `TOKEN_PROGRAM_ID` (SOL,
	*   USDC); `OnlinePumpSdk.fetchQuoteTokenProgram` resolves it.
	* @param params.creatorFeeBps - Forwarded to `createV2Instruction`. Unlike
	*   that builder this one holds `global`, so a nonzero rate the program
	*   would reject throws up front: `CreatorFeeNotConfigurableError` (gate
	*   off), `CreatorFeeBpsOutOfRangeError` (outside
	*   `1..=global.maxConfigurableCreatorFeeBps`). Quote `amount` with the same
	*   rate (`getBuyTokenAmountFromSolAmount`'s `creatorFeeBps`), or the buy's
	*   `quoteAmount` falls short of the fees the program charges.
	* @param params.holderReward - Forwarded to `createV2Instruction`; the buy
	*   then targets the holder-rewards PDA's creator vault, as the program
	*   does. Throws `HolderRewardDisabledError` while
	*   `global.isHolderRewardEnabled` is off.
	* @param params.cashback - Deprecated: throws `CashbackDeprecatedError`
	*   when `true`, as `create_v2` would fail with 6082.
	*/
	async createV2AndBuyV2Instructions({ global, mint, name, symbol, uri, creator, user, amount, quoteAmount, mayhemMode, cashback = false, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID, creatorFeeBps, holderReward = false, pumpQuote, slippage = 1 }) {
		assertCreateV2FlagsAllowed({
			global,
			mint,
			cashback,
			holderReward,
			creatorFeeBps
		});
		const associatedUser = getAssociatedTokenAddressSync(mint, user, true, TOKEN_2022_PROGRAM_ID);
		const { buyQuoteMint, buyQuoteTokenProgram } = createAndBuyQuote(quoteMint, quoteTokenProgram);
		return [
			await this.createV2Instruction({
				mint,
				name,
				symbol,
				uri,
				creator,
				user,
				mayhemMode,
				cashback,
				quoteMint,
				quoteTokenProgram,
				creatorFeeBps,
				holderReward,
				pumpQuote
			}),
			createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint, TOKEN_2022_PROGRAM_ID),
			await this.buyV2Instruction({
				global,
				mint,
				creator: createdCurveCreator(mint, creator, holderReward),
				user,
				associatedUser,
				amount,
				quoteAmount,
				slippage,
				tokenProgram: TOKEN_2022_PROGRAM_ID,
				quoteMint: buyQuoteMint,
				quoteTokenProgram: buyQuoteTokenProgram,
				mayhemMode
			})
		];
	}
	async buyV2Instruction({ global, mint, creator, user, associatedUser, amount, quoteAmount, slippage, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID, mayhemMode = false }) {
		return await this.getBuyV2InstructionInternal({
			user,
			associatedUser,
			mint,
			creator,
			feeRecipient: getFeeRecipient(global, mayhemMode),
			buybackFeeRecipient: getStaticRandomFeeRecipientForBuyback(),
			amount,
			quoteAmount: quoteAmount.add(quoteAmount.mul(new import_bn.default(Math.floor(slippage * 10))).div(new import_bn.default(1e3))),
			tokenProgram,
			quoteMint,
			quoteTokenProgram
		});
	}
	async sellV2Instructions({ global, bondingCurveAccountInfo, bondingCurve, mint, user, amount, quoteAmount, slippage, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const instructions = [];
		const quoteMint = isLegacyQuoteMint(bondingCurve.quoteMint) ? NATIVE_MINT : bondingCurve.quoteMint;
		instructions.push(await this.getSellV2InstructionInternal({
			user,
			mint,
			creator: bondingCurve.creator,
			feeRecipient: getFeeRecipient(global, bondingCurve.isMayhemMode),
			buybackFeeRecipient: getStaticRandomFeeRecipientForBuyback(),
			amount,
			quoteAmount: quoteAmount.sub(quoteAmount.mul(new import_bn.default(Math.floor(slippage * 10))).div(new import_bn.default(1e3))),
			tokenProgram,
			quoteMint,
			quoteTokenProgram
		}));
		return instructions;
	}
	async getBuyV2InstructionRaw({ user, mint, creator, amount, quoteAmount, feeRecipient = getStaticRandomFeeRecipient(), buybackFeeRecipient = getStaticRandomFeeRecipientForBuyback(), tokenProgram = TOKEN_2022_PROGRAM_ID, quoteMint = NATIVE_MINT, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		return await this.getBuyV2InstructionInternal({
			user,
			associatedUser: getAssociatedTokenAddressSync(mint, user, true, tokenProgram),
			mint,
			creator,
			feeRecipient,
			buybackFeeRecipient,
			amount,
			quoteAmount,
			tokenProgram,
			quoteMint,
			quoteTokenProgram
		});
	}
	async getBuyV2InstructionInternal({ user, associatedUser, mint, creator, feeRecipient, buybackFeeRecipient, amount, quoteAmount, tokenProgram, quoteMint, quoteTokenProgram }) {
		const bondingCurve = bondingCurvePda(mint);
		const creatorVault = creatorVaultPda(creator);
		const userVolumeAccumulator = userVolumeAccumulatorPda(user);
		return await this.offlinePumpProgram.methods.buyV2(amount, quoteAmount, { 0: false }).accountsPartial({
			baseMint: mint,
			quoteMint,
			baseTokenProgram: tokenProgram,
			quoteTokenProgram,
			feeRecipient,
			associatedQuoteFeeRecipient: quoteAta(feeRecipient, quoteMint, quoteTokenProgram),
			buybackFeeRecipient,
			associatedQuoteBuybackFeeRecipient: quoteAta(buybackFeeRecipient, quoteMint, quoteTokenProgram),
			associatedBaseBondingCurve: getAssociatedTokenAddressSync(mint, bondingCurve, true, tokenProgram),
			associatedQuoteBondingCurve: quoteAta(bondingCurve, quoteMint, quoteTokenProgram),
			user,
			associatedBaseUser: associatedUser,
			associatedQuoteUser: quoteAta(user, quoteMint, quoteTokenProgram),
			creatorVault,
			associatedCreatorVault: quoteAta(creatorVault, quoteMint, quoteTokenProgram),
			associatedUserVolumeAccumulator: quoteAta(userVolumeAccumulator, quoteMint, quoteTokenProgram)
		}).instruction();
	}
	async getSellV2InstructionRaw({ user, mint, creator, amount, quoteAmount, feeRecipient = getStaticRandomFeeRecipient(), buybackFeeRecipient = getStaticRandomFeeRecipientForBuyback(), tokenProgram = TOKEN_2022_PROGRAM_ID, quoteMint = NATIVE_MINT, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		return await this.getSellV2InstructionInternal({
			user,
			mint,
			creator,
			feeRecipient,
			buybackFeeRecipient,
			amount,
			quoteAmount,
			tokenProgram,
			quoteMint,
			quoteTokenProgram
		});
	}
	async getSellV2InstructionInternal({ user, mint, creator, feeRecipient, buybackFeeRecipient, amount, quoteAmount, tokenProgram, quoteMint, quoteTokenProgram }) {
		const bondingCurve = bondingCurvePda(mint);
		const creatorVault = creatorVaultPda(creator);
		const userVolumeAccumulator = userVolumeAccumulatorPda(user);
		return await this.offlinePumpProgram.methods.sellV2(amount, quoteAmount).accountsPartial({
			baseMint: mint,
			quoteMint,
			baseTokenProgram: tokenProgram,
			quoteTokenProgram,
			feeRecipient,
			associatedQuoteFeeRecipient: quoteAta(feeRecipient, quoteMint, quoteTokenProgram),
			buybackFeeRecipient,
			associatedQuoteBuybackFeeRecipient: quoteAta(buybackFeeRecipient, quoteMint, quoteTokenProgram),
			associatedBaseBondingCurve: getAssociatedTokenAddressSync(mint, bondingCurve, true, tokenProgram),
			associatedQuoteBondingCurve: quoteAta(bondingCurve, quoteMint, quoteTokenProgram),
			user,
			associatedBaseUser: getAssociatedTokenAddressSync(mint, user, true, tokenProgram),
			associatedQuoteUser: quoteAta(user, quoteMint, quoteTokenProgram),
			creatorVault,
			associatedCreatorVault: quoteAta(creatorVault, quoteMint, quoteTokenProgram),
			associatedUserVolumeAccumulator: quoteAta(userVolumeAccumulator, quoteMint, quoteTokenProgram)
		}).instruction();
	}
	/**
	* `buy_v3`: buys `amount` tokens for at most `quoteAmount` plus `slippage`
	* percent. Prices and fees are the same as `buy_v2`
	* (`getBuySolAmountFromTokenAmount` quotes it), but only the buyback slice
	* of the protocol fee leaves in the trade: the rest of the protocol fee and
	* the creator fee stay on the curve (`BondingCurve.protocolFees` /
	* `creatorFee`) until `sweepProtocolFeeInstruction` /
	* `sweepCreatorFeeInstruction` pay them out. Creates the user's base ATA
	* when `associatedUserAccountInfo` is null and, on a token quote, the
	* buyback recipient's quote ATA when missing (idempotent; the user pays
	* its rent the first time, as the program never creates it).
	*
	* @param params.buybackFeeRecipient - The listed buyback wallet to pay
	*   (see `getBuyV3InstructionRaw`); defaults as there.
	*
	* A buy past the remaining supply completes the curve and buys the rest
	* from the pool the migration will create (the post-completion leg; a
	* `PostCompleteBuyEvent` follows `CompleteEvent`); quote it with
	* `getBuyV3QuoteAmountFromTokenAmount`. Every later trade is refused until
	* the migration.
	*
	* @param params.partialFill - Matters only where there is no
	*   post-completion leg (a mayhem curve): set, a buy past the remaining
	*   supply stops there; unset, it fails with 6021 `NotEnoughTokensToBuy`.
	* @throws {CashbackCoinNotSupportedError} for a cashback coin (6094); use
	*   `buyV2Instructions`.
	*/
	async buyV3Instructions({ bondingCurve, associatedUserAccountInfo, mint, user, amount, quoteAmount, slippage, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteTokenProgram = TOKEN_PROGRAM_ID, partialFill = false, buybackFeeRecipient }) {
		if (bondingCurve.isCashbackCoin) throw new CashbackCoinNotSupportedError(mint);
		return [
			...this.baseAtaInstructions(associatedUserAccountInfo, mint, user, tokenProgram),
			...buybackAtaInstructions(user, bondingCurve.quoteMint, quoteTokenProgram, buybackFeeRecipient),
			await this.getBuyV3InstructionRaw({
				user,
				mint,
				amount,
				quoteAmount: quoteAmount.add(quoteAmount.mul(new import_bn.default(Math.floor(slippage * 10))).div(new import_bn.default(1e3))),
				tokenProgram,
				quoteMint: bondingCurve.quoteMint,
				quoteTokenProgram,
				partialFill,
				buybackFeeRecipient
			})
		];
	}
	/**
	* `buy_exact_quote_in_v3`: spends at most `quoteAmount` (fees included) and
	* requires at least `amount` tokens less `slippage` percent, `amount` being
	* the quote from `getBuyV3TokenAmountFromQuoteAmount`. Fees are kept as in
	* `buyV3Instructions`. A budget past the remaining supply completes the
	* curve and spends the rest in the pool-to-be; the minimum covers both
	* legs. Creates the user's base ATA when `associatedUserAccountInfo` is
	* null.
	*
	* @param params.partialFill - Matters only on a mayhem curve: set, a budget
	*   past the remaining supply buys what is left and skips the minimum;
	*   unset, it fails with 6021 `NotEnoughTokensToBuy`.
	* @throws {CashbackCoinNotSupportedError} for a cashback coin (6094).
	*/
	async buyExactQuoteInV3Instructions({ bondingCurve, associatedUserAccountInfo, mint, user, amount, quoteAmount, slippage, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteTokenProgram = TOKEN_PROGRAM_ID, partialFill = false, buybackFeeRecipient }) {
		if (bondingCurve.isCashbackCoin) throw new CashbackCoinNotSupportedError(mint);
		return [
			...this.baseAtaInstructions(associatedUserAccountInfo, mint, user, tokenProgram),
			...buybackAtaInstructions(user, bondingCurve.quoteMint, quoteTokenProgram, buybackFeeRecipient),
			await this.getBuyExactQuoteInV3InstructionRaw({
				user,
				mint,
				spendableQuoteIn: quoteAmount,
				minTokensOut: lessSlippage(amount, slippage, 1),
				tokenProgram,
				quoteMint: bondingCurve.quoteMint,
				quoteTokenProgram,
				partialFill,
				buybackFeeRecipient
			})
		];
	}
	/**
	* `sell_v3`: sells `amount` tokens for at least `quoteAmount` less
	* `slippage` percent. Prices and fees are the same as `sell_v2`; the
	* buyback slice leaves the curve in the trade, the rest of the fees stay on
	* it (see `buyV3Instructions`). On a token quote it first creates, when
	* missing, the seller's quote ATA and the buyback recipient's (idempotent).
	*
	* @throws {CashbackCoinNotSupportedError} for a cashback coin (6094); use
	*   `sellV2Instructions`.
	*/
	async sellV3Instructions({ bondingCurve, mint, user, amount, quoteAmount, slippage, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteTokenProgram = TOKEN_PROGRAM_ID, buybackFeeRecipient }) {
		if (bondingCurve.isCashbackCoin) throw new CashbackCoinNotSupportedError(mint);
		const quote = normalizeQuoteMint(bondingCurve.quoteMint);
		return [
			...isLegacyQuoteMint(quote) ? [] : [createAssociatedTokenAccountIdempotentInstruction(user, quoteAta(user, quote, quoteTokenProgram), user, quote, quoteTokenProgram)],
			...buybackAtaInstructions(user, bondingCurve.quoteMint, quoteTokenProgram, buybackFeeRecipient),
			await this.getSellV3InstructionRaw({
				user,
				mint,
				amount,
				quoteAmount: lessSlippage(quoteAmount, slippage),
				tokenProgram,
				quoteMint: bondingCurve.quoteMint,
				quoteTokenProgram,
				buybackFeeRecipient
			})
		];
	}
	/**
	* `buy_v3` with `quoteAmount` as the exact `max_sol_cost` (fees included).
	*
	* @param params.quoteMint - The curve's quote mint; `bondingCurve.quoteMint`
	*   can be passed as is (the zero key is SOL).
	* @param params.buybackFeeRecipient - A listed `Global.buybackFeeRecipients`
	*   wallet. Passed as is on a SOL curve (a random listed one by default);
	*   on a token quote its `quoteMint` ATA is passed (the first listed one by
	*   default), which must already exist.
	*/
	async getBuyV3InstructionRaw({ user, mint, amount, quoteAmount, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteMint = NATIVE_MINT, quoteTokenProgram = TOKEN_PROGRAM_ID, buybackFeeRecipient, partialFill = false }) {
		return await this.offlinePumpProgram.methods.buyV3(amount, quoteAmount, { 0: partialFill }).accountsPartial(tradeV3Accounts({
			user,
			mint,
			tokenProgram,
			quoteMint,
			quoteTokenProgram,
			buybackFeeRecipient
		})).instruction();
	}
	/**
	* `buy_exact_quote_in_v3` with exact `spendable_quote_in` /
	* `min_tokens_out`. Accounts as in `getBuyV3InstructionRaw`.
	*/
	async getBuyExactQuoteInV3InstructionRaw({ user, mint, spendableQuoteIn, minTokensOut, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteMint = NATIVE_MINT, quoteTokenProgram = TOKEN_PROGRAM_ID, buybackFeeRecipient, partialFill = false }) {
		return await this.offlinePumpProgram.methods.buyExactQuoteInV3(spendableQuoteIn, minTokensOut, { 0: partialFill }).accountsPartial(tradeV3Accounts({
			user,
			mint,
			tokenProgram,
			quoteMint,
			quoteTokenProgram,
			buybackFeeRecipient
		})).instruction();
	}
	/**
	* `sell_v3` with `quoteAmount` as the exact `min_sol_output` (net of
	* fees). Accounts as in `getBuyV3InstructionRaw`.
	*/
	async getSellV3InstructionRaw({ user, mint, amount, quoteAmount, tokenProgram = TOKEN_2022_PROGRAM_ID, quoteMint = NATIVE_MINT, quoteTokenProgram = TOKEN_PROGRAM_ID, buybackFeeRecipient }) {
		return await this.offlinePumpProgram.methods.sellV3(amount, quoteAmount).accountsPartial(tradeV3Accounts({
			user,
			mint,
			tokenProgram,
			quoteMint,
			quoteTokenProgram,
			buybackFeeRecipient
		})).instruction();
	}
	baseAtaInstructions(associatedUserAccountInfo, mint, user, tokenProgram) {
		return associatedUserAccountInfo ? [] : [createAssociatedTokenAccountIdempotentInstruction(user, getAssociatedTokenAddressSync(mint, user, true, tokenProgram), user, mint, tokenProgram)];
	}
	/**
	* `sweep_protocol_fee`: pays the protocol fees v3 trades left on `mint`'s
	* curve (`BondingCurve.protocolFees`) to `recipient`, which must be a
	* `Global` fee recipient for the curve, never the zero key:
	* `getFeeRecipient(global, bondingCurve.isMayhemMode)`. Permissionless.
	* `payer` covers growing a pre-upgrade curve to `BONDING_CURVE_SIZE` and,
	* on a token quote, the recipient's quote ATA when it is missing. Nothing
	* moves when the bucket is empty. Works on completed and migrated curves.
	*
	* @param params.quoteMint - The curve's quote mint; `bondingCurve.quoteMint`
	*   can be passed as is (the zero key is SOL).
	*/
	async sweepProtocolFeeInstruction({ payer, mint, recipient, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		return await this.offlinePumpProgram.methods.sweepProtocolFee().accountsPartial(sweepBondingCurveFeeAccounts({
			payer,
			mint,
			recipient,
			quoteMint,
			quoteTokenProgram
		})).instruction();
	}
	/**
	* `sweep_creator_fee`: pays the creator fees v3 trades left on `mint`'s
	* curve (`BondingCurve.creatorFee`) to `creatorVaultPda(creator)`, where
	* `creator` is the curve's current `bondingCurve.creator` (a wallet, the
	* sharing config or the holder-rewards PDA). Permissionless; `payer` as in
	* `sweepProtocolFeeInstruction`, plus the vault's rent floor on SOL.
	*
	* Put it first, in the same transaction, in front of every
	* `distributeCreatorFees(V2)`, `adminCtoInstruction`,
	* `createFeeSharingConfig` and `updateFeeShares(V2)` on a coin that has
	* v3 trades: they fail with 6095 `CreatorFeesNotSwept` while the bucket is
	* nonzero. It is harmless when the bucket is empty.
	*/
	async sweepCreatorFeeInstruction({ payer, mint, creator, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		return await this.offlinePumpProgram.methods.sweepCreatorFee().accountsPartial(sweepBondingCurveFeeAccounts({
			payer,
			mint,
			recipient: creatorVaultPda(creator),
			quoteMint,
			quoteTokenProgram
		})).instruction();
	}
	/**
	* pump-amm `sweep_creator_fee`: pays the creator fees the v2 pool trades
	* left in `mint`'s canonical pool (`Pool.creatorFees`) into the coin
	* creator vault of `coinCreator`, creating the vault's quote ATA when
	* missing (`payer` pays; also for growing a pre-upgrade pool).
	* Permissionless.
	*
	* `coinCreator` must be the pool's own `coin_creator` (read the pool
	* account: pump-swap-sdk's `decodePool`). It usually equals the curve's
	* `creator`, but not always (pump-amm's `set_coin_creator` can set it from
	* the metadata); any other key fails `ConstraintSeeds`, even with an empty
	* bucket. `OnlinePumpSdk` reads it for you.
	*
	* Put it first, in the same transaction, in front of `adminCtoInstruction`
	* and `createFeeSharingConfig` on a graduated coin (pump-amm 6081
	* `CreatorFeesNotSwept` otherwise), in front of `updateFeeShares(V2)`
	* (pump-fees 6033 `PoolCreatorFeesNotSwept`), and in front of
	* `transferCreatorFeesToPump(V2)` so a distribution includes those fees.
	*/
	async sweepPoolCreatorFeeInstruction({ payer, mint, coinCreator, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const quote = normalizeQuoteMint(quoteMint);
		const pool = canonicalPumpPoolPdaWithQuote(mint, quote);
		const recipient = ammCreatorVaultPda(coinCreator);
		return await this.offlinePumpAmmProgram.methods.sweepCreatorFee().accountsPartial({
			payer,
			globalConfig: GLOBAL_CONFIG_PDA,
			pool,
			quoteMint: quote,
			quoteTokenProgram,
			poolQuoteTokenAccount: quoteAta(pool, quote, quoteTokenProgram),
			recipient,
			recipientTokenAccount: quoteAta(recipient, quote, quoteTokenProgram),
			eventAuthority: PUMP_AMM_EVENT_AUTHORITY_PDA,
			program: PUMP_AMM_PROGRAM_ID
		}).instruction();
	}
	/**
	* pump-amm `multi_hop_swap`: routes `amountIn` of the route's input mint
	* through `hops` (canonical pump pools and token-quoted pump curves, all
	* buys or all sells) into the output mint, exact-in, refusing less than
	* `minAmountOut` at the end. The protocol fee (with its buyback slice) is
	* charged once, at the leg trading the user's currency; the creator fee
	* (and a pool's LP fee) once, at the leg trading the coin at the far end;
	* middle hops charge nothing. A single hop pays what `buy_v2` / `sell_v2`
	* / `buy_v3` / `sell_v3` pay. Simulate for the amount out
	* (`OnlinePumpSdk.simulateMultiHopSwap`).
	*
	* Both user token accounts must exist (`multiHopSwapInstructions` creates
	* them and wraps / unwraps SOL). 16 fixed accounts plus 5 per hop: three
	* hops fit a legacy transaction, longer routes need a v0 transaction with a
	* lookup table. Budget compute generously (~200k CU per hop).
	*
	* @param params.buybackFeeRecipient - The listed buyback wallet whose ATA
	*   for the user's currency takes the slice (the first listed one by
	*   default). The ATA must exist.
	*/
	async multiHopSwapInstruction({ user, hops, side, amountIn, minAmountOut, buybackFeeRecipient }) {
		const { input, output, currency } = multiHopRouteEnds(hops, side);
		return await this.offlinePumpAmmProgram.methods.multiHopSwap(amountIn, minAmountOut).accountsPartial({
			user,
			userInTokenAccount: quoteAta(user, input.mint, input.tokenProgram),
			userOutTokenAccount: quoteAta(user, output.mint, output.tokenProgram),
			buybackFeeRecipient: quoteAta(buybackFeeRecipient ?? getBuybackFeeRecipientForTokenQuote(), currency.mint, currency.tokenProgram),
			pumpGlobal: GLOBAL_PDA,
			pumpFeeConfig: PUMP_FEE_CONFIG_PDA,
			pumpEventAuthority: PUMP_EVENT_AUTHORITY_PDA
		}).remainingAccounts(hops.flatMap(multiHopHopAccounts)).instruction();
	}
	/**
	* `multiHopSwapInstruction` with the user's accounts handled: idempotent
	* creates of the output token account (and of the input one when SOL is
	* wrapped; a token input must already hold `amountIn`) and of the buyback
	* recipient's ATA for the user's currency (the program never creates it;
	* the user pays its rent the first time), SOL wrapped into the WSOL
	* account first when the route starts at a WSOL pool, and the WSOL account
	* closed afterwards (returning its lamports, any WSOL it held before
	* included) when the input or the output is SOL. At a SOL-quoted curve end
	* the program moves SOL as lamports between the wallet and the curve (the
	* wallet must hold `amountIn` plus rent on a buy) and reads the WSOL
	* account only for its mint, so it is created but not funded.
	*/
	async multiHopSwapInstructions(params) {
		const { user } = params;
		const { input, output, currency } = multiHopRouteEnds(params.hops, params.side);
		const ata = ({ mint, tokenProgram }) => quoteAta(user, mint, tokenProgram);
		const createAta = (end) => createAssociatedTokenAccountIdempotentInstruction(user, ata(end), user, end.mint, end.tokenProgram);
		const closeWsol = (end) => end.mint.equals(NATIVE_MINT) ? [createCloseAccountInstruction(ata(end), user, user, [], end.tokenProgram)] : [];
		const solIn = input.mint.equals(NATIVE_MINT);
		const wrapsInput = solIn && params.hops[0]?.venue === "pool";
		return [
			...solIn ? [createAta(input)] : [],
			...wrapsInput ? [SystemProgram.transfer({
				fromPubkey: user,
				toPubkey: ata(input),
				lamports: BigInt(params.amountIn.toString())
			}), createSyncNativeInstruction(ata(input), input.tokenProgram)] : [],
			createAta(output),
			...buybackAtaInstructions(user, currency.mint, currency.tokenProgram, params.buybackFeeRecipient, true),
			await this.multiHopSwapInstruction(params),
			...closeWsol(input),
			...closeWsol(output)
		];
	}
	/**
	* Creates a fee sharing configuration for a token.
	*
	* Put `sweepCreatorFeeInstruction` (and, when `pool` is set,
	* `sweepPoolCreatorFeeInstruction`) first in the same transaction, so fees
	* that v3 / pool v2 trades left behind reach the current creator:
	* otherwise it fails with 6095 `CreatorFeesNotSwept` (pump-amm 6081).
	*
	* @param params - Parameters for creating a fee sharing configuration
	* @param params.creator - The creator of the token
	* @param params.mint - The mint address of the token
	* @param params.pool - The pool address of the token (null for ungraduated coins)
	*/
	async createFeeSharingConfig({ creator, mint, pool }) {
		return await this.offlinePumpFeeProgram.methods.createFeeSharingConfig().accountsPartial({
			payer: creator,
			mint,
			pool
		}).instruction();
	}
	/**
	* Updates the fee shares for a token's creator fee distribution.
	*
	* It distributes the pending fees first, so un-swept creator fees block
	* it: put `sweepCreatorFeeInstruction` (creator: the sharing config PDA)
	* first in the same transaction whenever v3 trades left creator fees on
	* the curve (pump 6095 `CreatorFeesNotSwept`), and
	* `sweepPoolCreatorFeeInstruction` whenever pump-amm v2 trades left some
	* in the coin's canonical WSOL pool (pump-fees 6033
	* `PoolCreatorFeesNotSwept`).
	*
	* The canonical WSOL pool goes last, after the shareholders: a complete
	* curve needs it there (the program reads it to check the pool's creator
	* bucket; it may not exist yet), a live curve ignores it. It is sent unless
	* `bondingCurveComplete` is `false`, which saves 33 bytes on a live curve
	* (sending it there is harmless; leaving it out on a complete curve is
	* refused).
	*
	* @param params - Parameters for updating fee shares
	* @param params.authority - The current authority that can modify the fee sharing config
	* @param params.mint - The mint address of the token
	* @param params.currentShareholders - Array of current shareholders
	* @param params.newShareholders - Array of new shareholders and their share percentages
	* @requirements for newShareholders:
	* - Must contain at least 1 shareholder (cannot be empty)
	* - Maximum of 10 shareholders allowed
	* - Each shareholder must have a positive share (shareBps > 0)
	* - Total shares must equal exactly 10,000 basis points (100%)
	* - No duplicate addresses allowed
	* - shareBps is in basis points where 1 bps = 0.01% (e.g., 1500 = 15%)
	* @throws {NoShareholdersError} If shareholders array is empty
	* @throws {TooManyShareholdersError} If more than 10 shareholders
	* @throws {ZeroShareError} If any shareholder has zero or negative shares
	* @throws {InvalidShareTotalError} If total shares don't equal 10,000 basis points
	* @throws {DuplicateShareholderError} If duplicate addresses are found
	* @example
	* ```typescript
	* const instruction = await PUMP_SDK.updateFeeShares({
	*   authority: authorityPublicKey,
	*   mint: mintPublicKey,
	*   curShareholders: [wallet1, wallet2, wallet3],
	*   newShareholders: [
	*     { address: wallet1, shareBps: 5000 }, // 50%
	*     { address: wallet2, shareBps: 3000 }, // 30%
	*     { address: wallet3, shareBps: 2000 }, // 20%
	*   ]
	* });
	* ```
	*/
	async updateFeeShares({ authority, mint, currentShareholders, newShareholders, bondingCurveComplete = true }) {
		if (newShareholders.length === 0) throw new NoShareholdersError();
		if (newShareholders.length > MAX_SHAREHOLDERS) throw new TooManyShareholdersError(newShareholders.length, MAX_SHAREHOLDERS);
		let totalShares = 0;
		const addresses = /* @__PURE__ */ new Set();
		for (const shareholder of newShareholders) {
			if (shareholder.shareBps <= 0) throw new ZeroShareError(shareholder.address.toString());
			totalShares += shareholder.shareBps;
			addresses.add(shareholder.address.toString());
		}
		if (totalShares !== 1e4) throw new InvalidShareTotalError(totalShares);
		if (addresses.size !== newShareholders.length) throw new DuplicateShareholderError();
		const coinCreatorVaultAuthority = coinCreatorVaultAuthorityPda(feeSharingConfigPda(mint));
		return await this.offlinePumpFeeProgram.methods.updateFeeShares(newShareholders.map((sh) => ({
			address: sh.address,
			shareBps: sh.shareBps
		}))).accountsPartial({
			authority,
			mint,
			coinCreatorVaultAta: coinCreatorVaultAtaPda(coinCreatorVaultAuthority, NATIVE_MINT, TOKEN_PROGRAM_ID)
		}).remainingAccounts([...currentShareholders.map((pubkey) => ({
			pubkey,
			isWritable: true,
			isSigner: false
		})), ...bondingCurveComplete ? [{
			pubkey: canonicalPumpPoolPda(mint),
			isWritable: false,
			isSigner: false
		}] : []]).instruction();
	}
	/**
	* Updates the fee shares for a token's creator fee distribution, for a coin
	* quoted in any mint. `updateFeeShares` (v1) only handles SOL-quoted coins;
	* a non-SOL coin must use this instruction so the pending fees it pays out
	* first move through the right quote ATAs. Needs the same sweeps first as
	* `updateFeeShares`, against the canonical pool of the curve's quote mint.
	*
	* @param params - Parameters for updating fee shares
	* @param params.authority - The current authority that can modify the fee sharing config
	* @param params.mint - The mint address of the token
	* @param params.currentShareholders - Array of current shareholders
	* @param params.newShareholders - Array of new shareholders and their share percentages
	* @param params.quoteMint - The coin's quote mint (`NATIVE_MINT` for SOL
	*   coins)
	* @param params.quoteTokenProgram - The program that owns `quoteMint`; every
	*   quote ATA (the vault's and each shareholder's) is derived with it. The
	*   `TOKEN_PROGRAM_ID` default is only right for SOL and USDC; pass the
	*   mint's owner (`OnlinePumpSdk.fetchQuoteTokenProgram`) for anything else.
	*   The canonical pool of `quoteMint`, which must be the curve's quote,
	*   goes last as on `updateFeeShares` (same `bondingCurveComplete`).
	* @requirements for newShareholders:
	* - Must contain at least 1 shareholder (cannot be empty)
	* - Maximum of 10 shareholders allowed
	* - Each shareholder must have a positive share (shareBps > 0)
	* - Total shares must equal exactly 10,000 basis points (100%)
	* - No duplicate addresses allowed
	* - shareBps is in basis points where 1 bps = 0.01% (e.g., 1500 = 15%)
	* @throws {NoShareholdersError} If shareholders array is empty
	* @throws {TooManyShareholdersError} If more than 10 shareholders
	* @throws {ZeroShareError} If any shareholder has zero or negative shares
	* @throws {InvalidShareTotalError} If total shares don't equal 10,000 basis points
	* @throws {DuplicateShareholderError} If duplicate addresses are found
	*/
	async updateFeeSharesV2({ authority, mint, currentShareholders, newShareholders, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID, bondingCurveComplete = true }) {
		quoteMint = normalizeQuoteMint(quoteMint);
		if (newShareholders.length === 0) throw new NoShareholdersError();
		if (newShareholders.length > MAX_SHAREHOLDERS) throw new TooManyShareholdersError(newShareholders.length, MAX_SHAREHOLDERS);
		let totalShares = 0;
		const addresses = /* @__PURE__ */ new Set();
		for (const shareholder of newShareholders) {
			if (shareholder.shareBps <= 0) throw new ZeroShareError(shareholder.address.toString());
			totalShares += shareholder.shareBps;
			addresses.add(shareholder.address.toString());
		}
		if (totalShares !== 1e4) throw new InvalidShareTotalError(totalShares);
		if (addresses.size !== newShareholders.length) throw new DuplicateShareholderError();
		const coinCreatorVaultAuthority = coinCreatorVaultAuthorityPda(feeSharingConfigPda(mint));
		const remainingAccounts = [
			...currentShareholders.map((pubkey) => ({
				pubkey,
				isWritable: true,
				isSigner: false
			})),
			...quoteMint.equals(NATIVE_MINT) ? [] : currentShareholders.map((pubkey) => ({
				pubkey: getAssociatedTokenAddressSync(quoteMint, pubkey, true, quoteTokenProgram),
				isWritable: true,
				isSigner: false
			})),
			...bondingCurveComplete ? [{
				pubkey: canonicalPumpPoolPdaWithQuote(mint, normalizeQuoteMint(quoteMint)),
				isWritable: false,
				isSigner: false
			}] : []
		];
		return await this.offlinePumpFeeProgram.methods.updateFeeSharesV2(newShareholders.map((sh) => ({
			address: sh.address,
			shareBps: sh.shareBps
		}))).accountsPartial({
			authority,
			mint,
			coinCreatorVaultAta: coinCreatorVaultAtaPda(coinCreatorVaultAuthority, quoteMint, quoteTokenProgram),
			quoteMint,
			tokenProgram: quoteTokenProgram,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			systemProgram: SystemProgram.programId
		}).remainingAccounts([...remainingAccounts]).instruction();
	}
	/**
	* Sweeps coin creator fees that have accrued on the Pump AMM into the
	* bonding curve creator vault, so they can later be paid out via
	* `distributeCreatorFeesV2`. Permissionless.
	*
	* For wrapped-SOL quotes the instruction closes & recreates the AMM coin
	* creator vault ATA and forwards the unwrapped lamports to `pump_creator_vault`.
	* For non-native quotes it does a token transfer between ATAs and creates
	* the destination `pump_creator_vault_ata` on the fly if it does not exist
	* (rent paid by `payer`).
	*
	* Assumes the coin has been opted into fee sharing (i.e. `coin_creator` on
	* the AMM pool is the `sharing_config` PDA for `mint`).
	*
	* @param params - Parameters for the transfer
	* @param params.payer - Transaction signer. Pays the rent for `pump_creator_vault_ata` when it has to be initialized (non-WSOL quotes only).
	* @param params.mint - The mint address of the token. Used to derive the sharing_config PDA, which is the coin creator post-migration.
	* @param params.quoteMint - The quote mint of the coin (use `NATIVE_MINT` for SOL-paired coins).
	* @param params.quoteTokenProgram - The program that owns `quoteMint`; both
	*   vault ATAs are derived with it. The `TOKEN_PROGRAM_ID` default is only
	*   right for SOL and USDC; pass the mint's owner
	*   (`OnlinePumpSdk.fetchQuoteTokenProgram`) for a Token-2022 quote.
	*/
	async transferCreatorFeesToPumpV2({ payer, mint, quoteMint, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const sharingConfigPda = feeSharingConfigPda(mint);
		return await this.offlinePumpAmmProgram.methods.transferCreatorFeesToPumpV2().accountsPartial({
			payer,
			quoteMint,
			tokenProgram: quoteTokenProgram,
			coinCreator: sharingConfigPda
		}).instruction();
	}
	decodeDistributeCreatorFeesEvent(data) {
		return this.offlinePumpProgram.coder.types.decode("distributeCreatorFeesEvent", data);
	}
	/**
	* Distributes a SOL coin's creator vault to its shareholders. Put
	* `sweepCreatorFeeInstruction` (creator: `sharingConfigAddress`) first in
	* the same transaction: it fails with 6095 `CreatorFeesNotSwept` while v3
	* trades have creator fees on the curve.
	* `OnlinePumpSdk.buildDistributeCreatorFeesInstructions` does both.
	*/
	async distributeCreatorFees({ mint, sharingConfig, sharingConfigAddress }) {
		return await this.offlinePumpProgram.methods.distributeCreatorFees().accountsPartial({
			mint,
			creatorVault: creatorVaultPda(sharingConfigAddress)
		}).remainingAccounts(sharingConfig.shareholders.map((shareholder) => ({
			pubkey: shareholder.address,
			isWritable: true,
			isSigner: false
		}))).instruction();
	}
	/**
	* Distributes a coin's accrued creator fees to its sharing-config
	* shareholders, for a coin quoted in any mint (`distributeCreatorFees` is
	* SOL-only). For a non-SOL quote the program pays each shareholder's ATA
	* and, with `shouldInitializeAta`, creates missing ones at `payer`'s cost.
	* Needs `sweepCreatorFeeInstruction` first, as `distributeCreatorFees`
	* does.
	*
	* @param params.quoteMint - The coin's quote mint (`NATIVE_MINT` for SOL
	*   coins).
	* @param params.quoteTokenProgram - The program that owns `quoteMint`; the
	*   vault's and every shareholder's quote ATA is derived with it. The
	*   `TOKEN_PROGRAM_ID` default is only right for SOL and USDC; pass the
	*   mint's owner (`OnlinePumpSdk.fetchQuoteTokenProgram`) for anything else.
	*/
	async distributeCreatorFeesV2({ mint, sharingConfig, sharingConfigAddress, quoteMint, payer, shouldInitializeAta = true, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const remainingAccounts = sharingConfig.shareholders.map((shareholder) => ({
			pubkey: shareholder.address,
			isWritable: true,
			isSigner: false
		}));
		if (!quoteMint.equals(NATIVE_MINT)) remainingAccounts.push(...sharingConfig.shareholders.map((shareholder) => ({
			pubkey: getAssociatedTokenAddressSync(quoteMint, shareholder.address, true, quoteTokenProgram),
			isWritable: true,
			isSigner: false
		})));
		return await this.offlinePumpProgram.methods.distributeCreatorFeesV2(shouldInitializeAta).accountsPartial({
			mint,
			creatorVault: creatorVaultPda(sharingConfigAddress),
			quoteMint,
			quoteTokenProgram,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			systemProgram: SystemProgram.programId,
			payer
		}).remainingAccounts([...remainingAccounts]).instruction();
	}
	decodeMinimumDistributableFee(data) {
		return this.offlinePumpProgram.coder.types.decode("minimumDistributableFeeEvent", data);
	}
	async getMinimumDistributableFee({ mint, sharingConfig, sharingConfigAddress }) {
		return await this.offlinePumpProgram.methods.getMinimumDistributableFee().accountsPartial({
			mint,
			creatorVault: creatorVaultPda(sharingConfigAddress)
		}).remainingAccounts(sharingConfig.shareholders.map((shareholder) => ({
			pubkey: shareholder.address,
			isWritable: true,
			isSigner: false
		}))).instruction();
	}
	/**
	* Creates a `DonationFeePda` for a `(mint, configId)` pair under the
	* pump-fees program. This PDA is the on-chain fee destination used when
	* routing a slice of creator fees to a donate.gg config; once created, you
	* can pass `donationFeePda(mint)` as a shareholder address in a
	* subsequent `updateFeeShares` call.
	*
	* The instruction is idempotent.
	*
	* @param params - Parameters for creating the donation fee PDA
	* @param params.coinCreator - The coin creator wallet; signs and pays rent
	*   for the new PDA. This is either the bonding curve's `creator`
	*   or the canonical pump-amm pool's `coin_creator`
	*   or the sharing_config.admin.
	* @param params.mint - Base mint of the coin whose creator fees are routed.
	* @param params.configId - The donate.gg config id this PDA escrows for.
	* @param params.quoteMint - The quote mint of the coin. You can pass
	*   `bondingCurve.quoteMint` directly: it is normalized via
	*   `normalizeQuoteMint`, so `PublicKey.default` (stored by legacy SOL
	*   coins) and `undefined` both resolve to `NATIVE_MINT`. Required for
	*   graduated non-SOL-quote coins: the canonical pool PDA is seeded by
	*   quote mint, so passing the wrong quote derives a nonexistent pool and
	*   the program rejects with `InvalidPool`. Ignored by the program for
	*   ungraduated coins.
	*/
	async createDonationFeePda({ coinCreator, mint, configId, quoteMint }) {
		return await this.offlinePumpFeeProgram.methods.createDonationFeePda().accountsPartial({
			payer: coinCreator,
			configId,
			baseMint: mint,
			pool: canonicalPumpPoolPdaWithQuote(mint, normalizeQuoteMint(quoteMint)),
			donationFeePda: donationFeePda(mint, configId)
		}).instruction();
	}
	/**
	* Cranks a previously-created `DonationFeePda`, forwarding its full
	* `donationFeePdaAta` balance into the donation relay program's debouncer
	* for the relayer to settle later.
	*
	* The instruction is **permissionless** — anyone can call it, paying the
	* tx fee (and rent for the WSOL ATA on first crank). The pump-fees handler
	* also wraps any bare lamports sitting on the `DonationFeePda` into its
	* WSOL ATA before forwarding (native quote path), so the only state needed
	* to crank is the `(mint, configId)` pair (the `configId` is read back from
	* the PDA by the relay CPI, but the caller still needs it to derive the
	* relay-side epoch_tracker / debouncer PDAs).
	*
	* Quote mint defaults to wrapped SOL (`NATIVE_MINT`). If/when other quote
	* mints are supported, override `quoteMint` to match the value stored on
	* the on-chain `DonationFeePda.quote_mint` (the program enforces equality
	* and will error otherwise).
	*
	* @param params - Parameters for cranking the donation fee PDA
	* @param params.payer - Wallet that signs and pays for `init_if_needed` ATAs.
	* @param params.mint - Base mint of the coin (the one whose creator fees
	*   feed the PDA — matches `DonationFeePda.base_mint`).
	* @param params.configId - The 32-byte donate.gg config id bound to the
	*   PDA; used to derive the relay's epoch tracker and debouncer PDAs.
	* @param params.donationRelayProgramId - Program id of the Donation Relay
	*   program for the target cluster (e.g. `DONATION_RELAY_PROGRAM_ID_MAINNET`
	*   or `DONATION_RELAY_PROGRAM_ID_DEVNET`).
	* @param params.quoteMint - Quote mint that the relay debounces in. Defaults
	*   to `NATIVE_MINT` (WSOL). Must equal `DonationFeePda.quote_mint`.
	*/
	async crankDonationFeePda({ payer, mint, configId, donationRelayProgramId, quoteMint = NATIVE_MINT }) {
		const donationFeePdaAddress = donationFeePda(mint, configId);
		const epochTracker = donationRelayEpochTrackerPda(configId, quoteMint, donationRelayProgramId);
		const debouncer = donationRelayDebouncerPda(configId, quoteMint, donationRelayProgramId);
		return await this.offlinePumpFeeProgram.methods.crankDonationFeePda().accountsPartial({
			payer,
			donationFeePda: donationFeePdaAddress,
			quoteMint,
			donationFeePdaAta: getAssociatedTokenAddressSync(quoteMint, donationFeePdaAddress, true, TOKEN_PROGRAM_ID),
			donationRelayProgram: donationRelayProgramId,
			donationRelayEventAuthority: donationRelayEventAuthorityPda(donationRelayProgramId),
			mintWhitelist: donationRelayMintWhitelistPda(donationRelayProgramId),
			epochTracker,
			debouncer,
			debouncerAta: getAssociatedTokenAddressSync(quoteMint, debouncer, true, TOKEN_PROGRAM_ID)
		}).instruction();
	}
	/**
	* Creates a social fee PDA that can accumulate fees for a social media user.
	*
	* @param params - Parameters for creating the social fee PDA
	* @param params.payer - The account paying for the transaction
	* @param params.userId - The user ID string (max 20 characters, typically the numeric social media user ID)
	* @param params.platform - Platform identifier (0=pump, 1=X, etc.)
	*/
	async createSocialFeePda({ payer, userId, platform }) {
		return await this.offlinePumpFeeProgram.methods.createSocialFeePda(userId, platform).accountsPartial({
			payer,
			socialFeePda: socialFeePda(userId, platform)
		}).instruction();
	}
	async claimSocialFeePda({ recipient, socialClaimAuthority, userId, platform }) {
		return await this.offlinePumpFeeProgram.methods.claimSocialFeePda(userId, platform).accountsPartial({
			recipient,
			socialFeePda: socialFeePda(userId, platform),
			socialClaimAuthority
		}).instruction();
	}
	async claimCashbackInstruction({ user }) {
		return await this.offlinePumpProgram.methods.claimCashback().accountsPartial({ user }).instruction();
	}
	/**
	* `claim_cashback_v2`: pays out the cashback a user accrued in `quoteMint`
	* from their volume accumulator's quote ATA to their own quote ATA.
	*
	* @param params.quoteMint - The quote the cashback accrued in; defaults to
	*   `NATIVE_MINT` (SOL).
	* @param params.quoteTokenProgram - The program that owns `quoteMint`; both
	*   ATAs are derived with it. The `TOKEN_PROGRAM_ID` default is only right
	*   for SOL and USDC; pass the mint's owner
	*   (`OnlinePumpSdk.fetchQuoteTokenProgram`) for a Token-2022 quote.
	*/
	async claimCashbackV2Instruction({ user, quoteMint = NATIVE_MINT, quoteTokenProgram = TOKEN_PROGRAM_ID }) {
		const userVolumeAccumulator = userVolumeAccumulatorPda(user);
		return await this.offlinePumpProgram.methods.claimCashbackV2().accountsPartial({
			user,
			quoteMint,
			quoteTokenProgram,
			associatedUserVolumeAccumulator: quoteAta(userVolumeAccumulator, quoteMint, quoteTokenProgram),
			associatedQuoteUser: quoteAta(user, quoteMint, quoteTokenProgram)
		}).instruction();
	}
};
new PumpSdk();
var GLOBAL_PDA = pumpPda([Buffer$1.from("global")]);
var QUOTE_CONTROL_PDA = pumpPda([Buffer$1.from("quote-control")]);
pumpAmmPda([Buffer$1.from("global_config")]);
pumpFeePda([Buffer$1.from("fee-program-global")]);
var PUMP_FEE_CONFIG_PDA = pumpFeePda([Buffer$1.from("fee_config"), PUMP_PROGRAM_ID.toBuffer()]);
pumpPda([Buffer$1.from("global_volume_accumulator")]);
pumpAmmPda([Buffer$1.from("global_volume_accumulator")]);
var PUMP_EVENT_AUTHORITY_PDA = getEventAuthorityPda(PUMP_PROGRAM_ID);
var PUMP_AMM_EVENT_AUTHORITY_PDA = getEventAuthorityPda(PUMP_AMM_PROGRAM_ID);
var PUMP_FEE_EVENT_AUTHORITY_PDA = getEventAuthorityPda(PUMP_FEE_PROGRAM_ID);
function getEventAuthorityPda(programId) {
	return PublicKey.findProgramAddressSync([Buffer$1.from("__event_authority")], programId)[0];
}
function bondingCurvePda(mint) {
	return pumpPda([Buffer$1.from("bonding-curve"), new PublicKey(mint).toBuffer()]);
}
function bondingCurveV2Pda(mint) {
	return pumpPda([Buffer$1.from("bonding-curve-v2"), new PublicKey(mint).toBuffer()]);
}
function creatorVaultPda(creator) {
	return pumpPda([Buffer$1.from("creator-vault"), creator.toBuffer()]);
}
function holderRewardsPda(mint) {
	return pumpPda([Buffer$1.from("holder-rewards"), mint.toBuffer()]);
}
function pumpPoolAuthorityPda(mint) {
	return pumpPda([Buffer$1.from("pool-authority"), mint.toBuffer()]);
}
function canonicalPumpPoolPda(mint) {
	return poolPda(0, pumpPoolAuthorityPda(mint), mint, NATIVE_MINT);
}
function canonicalPumpPoolPdaWithQuote(mint, quoteMint) {
	return poolPda(0, pumpPoolAuthorityPda(mint), mint, quoteMint);
}
function boostVaultAuthorityPda(pool) {
	return pumpAmmPda([Buffer$1.from("boost_vault"), pool.toBuffer()]);
}
function userVolumeAccumulatorPda(user, program = PUMP_PROGRAM_ID) {
	if (program.equals(PUMP_PROGRAM_ID)) return pumpPda([Buffer$1.from("user_volume_accumulator"), user.toBuffer()]);
	return pumpAmmPda([Buffer$1.from("user_volume_accumulator"), user.toBuffer()]);
}
var getGlobalParamsPda = () => {
	return PublicKey.findProgramAddressSync([Buffer$1.from("global-params")], MAYHEM_PROGRAM_ID)[0];
};
var getMayhemStatePda = (mint) => {
	return PublicKey.findProgramAddressSync([Buffer$1.from("mayhem-state"), mint.toBuffer()], MAYHEM_PROGRAM_ID)[0];
};
var getSolVaultPda = () => {
	return PublicKey.findProgramAddressSync([Buffer$1.from("sol-vault")], MAYHEM_PROGRAM_ID)[0];
};
var getTokenVaultPda = (mintPubkey) => {
	return getAssociatedTokenAddressSync(mintPubkey, getSolVaultPda(), true, TOKEN_2022_PROGRAM_ID);
};
var feeSharingConfigPda = (mint) => {
	return pumpFeePda([Buffer$1.from("sharing-config"), mint.toBuffer()]);
};
var isLegacyQuoteMint = (quoteMint) => quoteMint.equals(NATIVE_MINT) || quoteMint.equals(PublicKey.default);
var normalizeQuoteMint = (quoteMint) => !quoteMint || isLegacyQuoteMint(quoteMint) ? NATIVE_MINT : quoteMint;
var quoteAta = (owner, quoteMint, quoteTokenProgram) => getAssociatedTokenAddressSync(quoteMint, owner, true, quoteTokenProgram);
var ammCreatorVaultPda = (creator) => {
	return PublicKey.findProgramAddressSync([Buffer$1.from("creator_vault"), creator.toBuffer()], PUMP_AMM_PROGRAM_ID)[0];
};
var socialFeePda = (userId, platform) => {
	return pumpFeePda([
		Buffer$1.from("social-fee-pda"),
		Buffer$1.from(userId),
		Buffer$1.from([platform])
	]);
};
var donationFeePda = (mint, configId) => {
	return pumpFeePda([
		Buffer$1.from("donation-fee-pda"),
		mint.toBuffer(),
		configId.toBuffer()
	]);
};
new PublicKey("RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu");
new PublicKey("DRLYxueWz6iymdsaRCER6iv6v9zL7gFWANwDL2V5VUx1");
var donationRelayPda = (seeds, donationRelayProgramId) => {
	return PublicKey.findProgramAddressSync(seeds, donationRelayProgramId)[0];
};
var donationRelayEpochTrackerPda = (configId, quoteMint, donationRelayProgramId) => {
	return donationRelayPda([
		Buffer$1.from("epoch_tracker_v1"),
		configId.toBuffer(),
		quoteMint.toBuffer()
	], donationRelayProgramId);
};
var donationRelayDebouncerPda = (configId, quoteMint, donationRelayProgramId) => {
	return donationRelayPda([
		Buffer$1.from("debouncer_v1"),
		configId.toBuffer(),
		quoteMint.toBuffer()
	], donationRelayProgramId);
};
var donationRelayMintWhitelistPda = (donationRelayProgramId) => {
	return donationRelayPda([Buffer$1.from("mint_whitelist_v1")], donationRelayProgramId);
};
var donationRelayEventAuthorityPda = (donationRelayProgramId) => {
	return getEventAuthorityPda(donationRelayProgramId);
};
function getStaticRandomFeeRecipient() {
	const randomIndex = Math.floor(Math.random() * CURRENT_FEE_RECIPIENTS.length);
	return new PublicKey(CURRENT_FEE_RECIPIENTS[randomIndex]);
}
var CURRENT_FEE_RECIPIENTS = [
	"62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV",
	"7VtfL8fvgNfhz17qKRMjzQEXgbdpnHHHQRh54R9jP2RJ",
	"7hTckgnGnLQR6sdH7YkqFTAA7VwTfYFaZ6EhEsU3saCX",
	"9rPYyANsfQZw3DnDmKE3YCQF5E8oD89UXoHn9JFEhJUz",
	"AVmoTthdrX6tKt4nDjco2D775W2YK3sDhxPcMmzUAmTY",
	"CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM",
	"FWsW1xNtWscwNmKv6wVsU1iTzRN6wmmk3MjxRP5tT7hz",
	"G5UZAVbAf46s7cKWoyKu8kYTip9DGTpbLZ2qa9Aq69dP"
];
function getStaticRandomFeeRecipientForBuyback() {
	const randomIndex = Math.floor(Math.random() * CURRENT_FEE_RECIPIENTS_FOR_BUYBACK.length);
	return new PublicKey(CURRENT_FEE_RECIPIENTS_FOR_BUYBACK[randomIndex]);
}
function getBuybackFeeRecipientForTokenQuote() {
	return new PublicKey(CURRENT_FEE_RECIPIENTS_FOR_BUYBACK[0]);
}
var CURRENT_FEE_RECIPIENTS_FOR_BUYBACK = [
	"5YxQFdt3Tr9zJLvkFccqXVUwhdTWJQc1fFg2YPbxvxeD",
	"9M4giFFMxmFGXtc3feFzRai56WbBqehoSeRE5GK7gf7",
	"GXPFM2caqTtQYC2cJ5yJRi9VDkpsYZXzYdwYpGnLmtDL",
	"3BpXnfJaUTiwXnJNe7Ej1rcbzqTTQUvLShZaWazebsVR",
	"5cjcW9wExnJJiqgLjq7DEG75Pm6JBgE1hNv4B2vHXUW6",
	"EHAAiTxcdDwQ3U4bU6YcMsQGaekdzLS3B5SmYo46kJtL",
	"5eHhjP8JaYkz83CWwvGU2uMUXefd3AazWGx4gpcuEEYD",
	"A7hAgCzFw14fejgCp387JUJRMNyz4j89JKnhtKU8piqW"
];
//#endregion
export {};
