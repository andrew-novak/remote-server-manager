import {
  CODE_EDITOR_OPEN,
  CODE_EDITOR_CLOSE,
  CODE_EDITOR_SET_CODE,
} from "../constants/actionTypes";

const initialState = {
  isOpen: false,
  section: null,
  existing: null,
  filename: null,
  code: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CODE_EDITOR_OPEN:
      return {
        ...state,
        isOpen: true,
        section: action.section,
        existing: action.existing,
        filename: action.filename,
        code: action.code,
      };

    case CODE_EDITOR_SET_CODE:
      return {
        ...state,
        code: action.code,
      };

    case CODE_EDITOR_CLOSE:
      return initialState;

    default:
      return state;
  }
};
