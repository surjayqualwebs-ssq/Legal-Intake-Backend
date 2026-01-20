const { generateKeyPairSync } = require("crypto");
const fs = require("fs");

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

fs.mkdirSync("keys", { recursive: true });
fs.writeFileSync("private.key", privateKey);
fs.writeFileSync("public.key", publicKey);

console.log("✅ RSA keys generated successfully");
