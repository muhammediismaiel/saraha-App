import crypto from "crypto";

// AES-256-CBC requires a 32-byte key
const SECRET_KEY = Buffer.from("12345678123456781234567812345678"); // 32 bytes

export function encryption(plaintext) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);
  let encryptedData = cipher.update(plaintext, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  // Prepend iv so decryption can recover it
  return iv.toString("hex") + ":" + encryptedData;
}

export function decryption(encryptedData) {
  const [ivHex, values] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex"); // was: Buffer.from(ivBuffer, hex) — bare variable
  const deCipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
  let decrypted = deCipher.update(values, "hex", "utf-8");
  decrypted += deCipher.final("utf-8");
  return decrypted;
}
