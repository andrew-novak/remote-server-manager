import {
  DELETION_DIALOG_OPEN,
  DELETION_DIALOG_CHANGE_INPUT,
  DELETION_DIALOG_CANCEL,
  DELETION_DIALOG_WRONG_FILENAME,
} from "../constants/actionTypes";

const initialState = {
  section: null,
  filename: null,
  input: "",
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETION_DIALOG_OPEN:
      return {
        ...state,
        section: action.section,
        filename: action.filename,
      };

    case DELETION_DIALOG_CHANGE_INPUT:
      return {
        ...state,
        input: action.newValue,
      };

    case DELETION_DIALOG_CANCEL:
      return initialState;

    case DELETION_DIALOG_WRONG_FILENAME:
      return {
        ...state,
        error: "Wrong filename provided",
      };

    default:
      return state;
  }
};
