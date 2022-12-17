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

async function authorize() {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    let authClient = null;

    if (authClient == null) {
        throw Error('authentication failed');
    }

    return authClient;
}