import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

console.log(" Open this URL in your browser to authorize:");
console.log(
  `${process.env.SALESFORCE_AUTH_URL}/authorize?response_type=code&client_id=${process.env.SALESFORCE_CLIENT_ID}&redirect_uri=${process.env.SALESFORCE_REDIRECT_URI}&code_challenge=${"HFyB7rfBj_4i1LxtVeCHBywp41Lz5V0fI4NYiVdQdng"}&code_challenge_method=S256`
);

async function getAccessToken(authCode) {
  try {
    const response = await axios.post(process.env.SALESFORCE_AUTH_URL + "/token", new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.SALESFORCE_CLIENT_ID,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET,
      redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
      code: authCode,
      code_verifier: "generatePKCE to get code verifier", // Required for PKCE
    }));

    console.log("Access Token:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error.response ? error.response.data : error);
  }
}

// Example Usage: Run `node getOAuthToken.mjs <AUTHORIZATION_CODE>`
if (process.argv[2]) {
  getAccessToken(process.argv[2]);
}
