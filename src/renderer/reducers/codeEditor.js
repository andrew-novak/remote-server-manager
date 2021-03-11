import {
  CODE_EDITOR_OPEN_NEW,
  CODE_EDITOR_OPEN_EXISTING,
  CODE_EDITOR_CLOSE,
  CODE_EDITOR_SET_FILENAME,
  CODE_EDITOR_SET_CODE,
  CODE_EDITOR_SHOW_HELPER_TEXT,
} from "../constants/actionTypes";

const initialState = {
  isOpen: false,
  isNew: null,
  section: null,
  originalFilename: null,
  filename: null,
  code: null,
  helperTexts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CODE_EDITOR_OPEN_NEW:
      return {
        ...state,
        isOpen: true,
        isNew: true,
        section: action.section,
        filename: "",
        code: "",
      };

    case CODE_EDITOR_OPEN_EXISTING:
      return {
        ...state,
        isOpen: true,
        isNew: false,
        section: action.section,
        originalFilename: action.filename,
        filename: action.filename,
        code: action.code,
      };

    case CODE_EDITOR_SET_FILENAME:
      return {
        ...state,
        filename: action.filename,
      };

    case CODE_EDITOR_SET_CODE:
      return {
        ...state,
        code: action.code,
      };

    case CODE_EDITOR_SHOW_HELPER_TEXT:
      return {
        ...state,
        helperTexts: {
          [action.errElem]: action.error,
        },
      };

    case CODE_EDITOR_CLOSE:
      return initialState;

    default:
      return state;
  }
};
