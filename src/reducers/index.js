import { combineReducers } from "redux";

import files from "./files";
import dropzones from "./dropzones";
import snackbars from "./snackbars";
import deletionDialog from "./deletionDialog";

const rootReducer = combineReducers({
  files,
  dropzones,
  snackbars,
  deletionDialog,
});

export default rootReducer;
