import {
  SNACKBAR_ADD_NEW,
  SNACKBAR_DISPLAY_NEXT,
  SNACKBAR_HIDE_CURRENT,
  SNACKBAR_REMOVE_CURRENT,
} from "../constants/actionTypes";

const initialState = {
  snackPack: [],
  messageInfo: null,
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SNACKBAR_ADD_NEW:
      return {
        ...state,
        snackPack: [
          ...state.snackPack,
          {
            message: action.message,
            variant: action.variant,
            key: new Date().getTime(),
          },
        ],
      };

    case SNACKBAR_DISPLAY_NEXT:
      return {
        ...state,
        snackPack: state.snackPack.slice(1),
        messageInfo: { ...state.snackPack[0] },
        isOpen: true,
      };

    case SNACKBAR_HIDE_CURRENT:
      return {
        ...state,
        isOpen: false,
      };

    case SNACKBAR_REMOVE_CURRENT:
      return {
        ...state,
        messageInfo: null,
      };

    default:
      return state;
  }
};
