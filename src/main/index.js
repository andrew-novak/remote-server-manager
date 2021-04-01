import "regenerator-runtime/runtime";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";
import { app, BrowserWindow, shell } from "electron";
import path from "path";

import setAllListeners from "./ipc/setAllListeners";
import createMenu from "./createMenu";

setAllListeners();

const isMac = process.platform === "darwin";
let mainWindow = null;

const installExtensions = async () => {
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  return installExtension(extensions)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log(`An error occurred: ${err}`));
  /*
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  return (
    installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      // eslint-disable-next-line no-console
      .catch(console.log)
  );
  */
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

  const { webContents } = mainWindow;

  createMenu(webContents);

  const address =
    process.env.NODE_ENV === "production"
      ? "./index.html"
      : "../renderer/index.html";

  mainWindow.loadURL(`file://${path.join(__dirname, address)}`);

  webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
    webContents.openDevTools();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
};

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

// eslint-disable-next-line no-console
app.whenReady().then(createWindow).catch(console.log);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
