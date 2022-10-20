import { ipcRenderer, contextBridge } from 'electron';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  createUser: async (user: Prisma.UserCreateInput) => {
    const newUser = await prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return newUser;
  },
  getUsers: async () => {
    return prisma.user.findMany();
  },
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  }
};
contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
