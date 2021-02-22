import { CONFIG_NOT_FOUND, CONFIG_SET } from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  isConfigured: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_NOT_FOUND:
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

    default:
      return state;
  }
};
