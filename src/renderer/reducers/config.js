import {
  CONFIG_LOADING_STOP,
  CONFIG_SET,
  CONFIG_SHOW_HINT,
} from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  isConfigured: false,
  helperTexts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };

    case CONFIG_SET:
      return {
        ...state,
        ...action.config,
        isLoading: false,
        isConfigured: true,
      };

    case CONFIG_SHOW_HINT:
      return {
        ...state,
        helperTexts: {
          [action.errElem]: action.error,
        },
      };

    default:
      return state;
  }
};
