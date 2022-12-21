import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";
import ElectronGoogleOAuth2 from "@getstation/electron-google-oauth2";
import isDev from "electron-is-dev";
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), !isDev ? "/resources": "","/electron/credentials/token.json");
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  !isDev ? "/resources": "",
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
  let CLIENT_ID, CLIENT_SECRET;
  try {
    const content = fs.readFileSync(CREDENTIALS_PATH, "utf8");
    console.log("credentials", content);
    const {
      installed: { client_id, client_secret },
    } = JSON.parse(content) as any;
    console.log(client_id, client_secret);
    CLIENT_ID = client_id;
    CLIENT_SECRET = client_secret;
  } catch (e) {
    throw Error("error new package");
  }

  const myApiOauth = new ElectronGoogleOAuth2(CLIENT_ID, CLIENT_SECRET, [
    ...SCOPES,
  ]);
  try {
    const token = await myApiOauth.openAuthWindowAndGetTokens();
    console.log("token", token);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify({
      type: "authorized_user",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: token.refresh_token,
    }));
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
  } catch (e) {
    console.error(e);
    return
  }
  //--------------- ojo -----------------
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  } else {
    console.error("authorize", "hubo un error al authenticar a este usuario");
    throw Error("Hubo un error al authenticar");
  }
  return client;
}

const prisma = new PrismaClient();
export async function saveConfigDrive(fileId: string, sheetName: string) {
  console.log("intentando salver configs");
  const authClient = await authorize();
  if (!!!authClient) throw Error("error al registrarte con google");

  const config = await prisma.configuracionDrive.findMany();
  console.log("registro correcto");
  if (config.length > 0) {
    return prisma.configuracionDrive.update({
      data: {
        idFile: fileId,
        nameFile: sheetName,
      },
      where: {
        id: config[0].id,
      },
    });
  }
  return prisma.configuracionDrive.create({
    data: {
      idFile: fileId,
      nameFile: sheetName,
    },
  });
}

export async function syncSheet() {
  let authClient: Awaited<ReturnType<typeof authorize>>;
  try {
    authClient = await authorize();
  } catch (e) {
    console.log("hubo un error =>", e);
    console.error(e);
    return;
  }
  const configs = await prisma.configuracionDrive.findMany();

  if (configs.length < 0) {
    return;
  }
  const idFile = configs[0].idFile!;
  const sheetName = configs[0].nameFile!;
  const reporte = await prisma.habitacion.findMany({
    include: {
      reservaActual: {
        include: {
          cliente: true,
        },
      },
    },
  });
  const rawData = [];
  for (const habitacion of reporte) {
    rawData.push([
      habitacion.nombreHabitacion,
      habitacion.estado,
      habitacion.reservaActual?.cliente?.numeroDocumento ?? '',
      habitacion.reservaActual?.noches ?? '',
      habitacion.reservaActual?.fechaIngreso?.toISOString().substring(0, 10) ?? '',
      // habitacion.reservaActual?.fechaIngreso?.toISOString().substring(0, 10)!,
      habitacion.reservaActual?.cliente.nombresCompletos ?? '',
      habitacion.reservaActual?.precio ?? '',
    ]);
  }
  const request = {
    spreadsheetId: idFile,
    range: sheetName,

    valueInputOption: "RAW", // TODO: Update placeholder value.

    resource: {
      range: sheetName,
      majorDimension: "ROWS",
      values: [
        ["Sistema de hotel sincronizado"],
        [
          "Nombre habitacion",
          "Estado",
          "Documento",
          "Estadia",
          "FechaIngreso",
          // "fechaSalida",
          "Huesped",
          "Precio",
        ],
        ...rawData,
      ],
    },

    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.update(request)).data;
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
