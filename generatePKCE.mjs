import crypto from "crypto";
import base64url from "base64url";

// Generate random code verifier
const codeVerifier = base64url(crypto.randomBytes(32));

// Hash it to generate the challenge
const codeChallenge = base64url(
  crypto.createHash("sha256").update(codeVerifier).digest()
);

console.log("Code Verifier:", codeVerifier);
console.log("Code Challenge:", codeChallenge);
