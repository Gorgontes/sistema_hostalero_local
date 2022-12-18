import { google } from 'googleapis'
const sheets = google.sheets('v4')


export async function sincronizar() {
    console.log("llegando");
    const authClient = await authorize();
    const request = {
        // The ID of the spreadsheet to update.
        spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.

        // The A1 notation of the values to update.
        range: 'my-range',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: '',  // TODO: Update placeholder value.

        resource: {
            // TODO: Add desired properties to the request body. All existing properties
            // will be replaced.
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

// async function authorize() {
//     // TODO: Change placeholder below to generate authentication credentials. See
//     // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
//     //
//     // Authorize using one of the following scopes:
//     //   'https://www.googleapis.com/auth/drive'
//     //   'https://www.googleapis.com/auth/drive.file'
//     //   'https://www.googleapis.com/auth/spreadsheets'
//     let authClient = null;

//     if (authClient == null) {
//         throw Error('authentication failed');
//     }

//     return authClient;
// }

//-----------------------------------------------------------
// const fs = require('fs').promises;
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
// const path = require('path');
// const process = require('process');
import {authenticate} from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/electron/credentials/credential.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist():Promise<OAuth2Client|null> {
  try {
    const content = fs.readFileSync(TOKEN_PATH, 'utf8');
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client) {
  const content = fs.readFileSync(CREDENTIALS_PATH,'utf8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  fs.writeFileSync(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
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

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth: OAuth2Client) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Name, Major:');
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[4]}`);
  });
}

authorize().then(listMajors).catch(console.error);