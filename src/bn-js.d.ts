declare module "bn.js" {
  export default class BN {
    constructor(value: number | string | BN | Uint8Array);
    toString(base?: number | "hex"): string;
    isZero(): boolean;
    lten(n: number): boolean;
    eq(other: BN): boolean;
    add(other: BN): BN;
    sub(other: BN): BN;
    mul(other: BN): BN;
    div(other: BN): BN;
  }
}
