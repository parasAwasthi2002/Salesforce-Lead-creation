import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Load Salesforce Credentials from .env
const SALESFORCE_INSTANCE = process.env.SALESFORCE_INSTANCE!;
const CLIENT_ID = process.env.SALESFORCE_CLIENT_ID!;
const CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SALESFORCE_REFRESH_TOKEN!;
const TOKEN_URL = "https://login.salesforce.com/services/oauth2/token";


// Function to get access token using Refresh Token
async function getAccessToken(): Promise<string> {
  try {
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    throw error;
  }
}

// Sample Lead Data
const leadData = {
    FirstName: "Vibhor",
    LastName: "Goyal",
    Email: "vibhor@example.com",
    Phone: "123-456-7832",
    Company: "test"
  };
  

// Function to create a lead in Salesforce
async function createLead(accessToken: string): Promise<string | null> {
    try {
  
      const API_URL = `${SALESFORCE_INSTANCE}/services/data/v60.0/sobjects/Lead`;
  
      const response = await axios.post(API_URL, leadData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ Lead Created Successfully:", response.data);
      return response.data.id; // Return the Lead ID
    } catch (error: any) {
      console.error("❌ Error creating lead:", error.response?.data || error.message);
      return null;
    }
  }

async function main() {
    const accessToken = await getAccessToken();

    await createLead(accessToken);
  
}
  
main();
  

