import { google } from "googleapis";
const sheets = google.sheets("v4");

export async function sincronizar() {
  const authClient = await authorize();
  const request = {
    spreadsheetId: "1uoEV2fmrsqBTIUfJ4NLF2GHV4S6luDA6qIsDIFw31mQ", // TODO: Update placeholder value.
    range: "Sheet1", // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: "RAW", // TODO: Update placeholder value.

    resource: {
      range: "Sheet1",
      majorDimension: "ROWS",
      values: [['nombre','apellidos'], ['luis','motesinos'],['kleyson', 'huanatico'],],
    },

    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.update(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}

import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { OAuth2Client } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "/electron/credentials/token.json");
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "/electron/credentials/credential.json"
);

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = fs.readFileSync(TOKEN_PATH, "utf8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: OAuth2Client) {
  const content = fs.readFileSync(CREDENTIALS_PATH, "utf8");
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  fs.writeFileSync(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function listMajors(auth: OAuth2Client) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    range: "Class Data!A2:E",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  console.log("Name, Major:");
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[4]}`);
  });
}

authorize().then(listMajors).catch(console.error);


export async function syncSheet(fileId: string, sheetName: string) {
  const authClient = await authorize();
  const request = {
    spreadsheetId:fileId,
    range: sheetName,

    valueInputOption: "RAW", // TODO: Update placeholder value.

    resource: {
      range:sheetName,
      majorDimension: "ROWS",
      values: [['nombre','apellidos'], ['luis','motesinos'],['kleyson', 'huanatico'],],
    },

    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.update(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
