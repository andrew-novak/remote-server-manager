import { Menu } from "electron";

import onConfigClick from "./onConfigClick";

const isMac = process.platform === "darwin";

export default (webContents) => {
  const template = [
    {
      label: "File",
      submenu: [{ role: isMac ? "close" : "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Configuration",
          click: () => onConfigClick(webContents),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
