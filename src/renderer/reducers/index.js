import { combineReducers } from "redux";

import config from "./config";
import files from "./files";
import dropzones from "./dropzones";
import snackbars from "./snackbars";
import deletionDialog from "./deletionDialog";
import codeEditor from "./codeEditor";

const rootReducer = combineReducers({
  config,
  files,
  dropzones,
  snackbars,
  deletionDialog,
  codeEditor,
});

export default rootReducer;
