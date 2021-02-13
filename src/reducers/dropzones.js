import {
  DROPZONE_OPEN,
  DROPZONE_SET_FILES,
  DROPZONE_CLEAR,
  DROPZONE_CLOSE,
} from "../constants/actionTypes";

const initialState = {
  config: { isOpen: false, files: [] },
  static: { isOpen: false, files: [] },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DROPZONE_OPEN:
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          isOpen: true,
        },
      };

    case DROPZONE_SET_FILES:
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          files: action.files,
        },
      };

    case DROPZONE_CLEAR:
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          files: [],
        },
      };

    case DROPZONE_CLOSE:
      return {
        ...state,
        [action.section]: initialState[action.section],
      };

    default:
      return state;
  }
};
