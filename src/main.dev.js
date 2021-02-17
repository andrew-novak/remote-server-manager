import "regenerator-runtime/runtime";
import { app, BrowserWindow, shell } from "electron";

import setMainListeners from "./ipc/setMainListeners";

setMainListeners();

let mainWindow = null;

const installExtensions = async () => {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return (
    installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      // eslint-disable-next-line no-console
      .catch(console.log)
  );
};

const createWindow = async () => {
  if (process.env.NODE_ENV === "development") {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
    mainWindow.webContents.openDevTools();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// eslint-disable-next-line no-console
app.whenReady().then(createWindow).catch(console.log);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
