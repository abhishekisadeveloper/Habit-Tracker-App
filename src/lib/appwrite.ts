import "react-native-url-polyfill/auto";
import { Client, Account, ID } from "appwrite";



const client = new Client();

const appwriteEndpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const appwriteProjectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "";

client
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

const account = new Account(client);

export { client, account, ID };