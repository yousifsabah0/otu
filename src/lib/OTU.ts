import {
  pbkdf2Sync,
  randomBytes,
  CipherGCMTypes,
  createCipheriv,
  createDecipheriv,
} from "crypto";

export default class OTU {
  private algorithm: CipherGCMTypes = "aes-256-gcm";
  private salt: number = 64;
  private iv: number = 16;

  private secret;

  private tag = 16;
  private tagPosition = this.salt + this.iv;
  private encryptedPosition = this.tagPosition + this.tag;

  constructor(secret: string) {
    this.secret = secret;
  }

  private getKey(salt: any) {
    return pbkdf2Sync(this.secret, salt, 100000, 32, "sha512");
  }

  encrypt(value: any) {
    if (value == null) {
      throw new Error("A value must be provided to encrypt.");
    }

    const iv = randomBytes(this.iv);
    const salt = randomBytes(this.salt);

    // Generate key
    const key = this.getKey(salt);

    const cipher = createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(String(value), "utf8"),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString("hex");
  }

  decrypt(value: any) {
    if (value == null) {
      throw new Error("A value must be provided to decrypt.");
    }

    const strValue = Buffer.from(String(value), "hex");

    const salt = strValue.slice(0, this.salt);
    const iv = strValue.slice(this.salt, this.tagPosition);
    const tag = strValue.slice(this.tagPosition, this.encryptedPosition);
    const encrypted = strValue.slice(this.encryptedPosition);

    const key = this.getKey(salt);

    const decipher = createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final("utf8");
  }
}
