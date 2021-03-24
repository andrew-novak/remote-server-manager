import os from "os";
import path from "path";

import {
  CONFIG_LOADING_STOP,
  CONFIG_SET_STORED,
  CONFIG_SET_INPUTS,
  CONFIG_SET_INPUT,
  CONFIG_SHOW_HELPER_TEXT,
} from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  isConfigured: false,
  helperTexts: {},
  stored: {},
  inputs: {
    ssh: {
      host: "",
      username: "",
      privateKey: path.join(os.homedir(), ".ssh/id_rsa"),
    },
    temporary: path.join(__dirname, "../../temporary"),
    sections: {
      config: "/etc/nginx/conf.d",
      static: "/usr/share/nginx/static",
      nodeApis: "",
      deploy: "",
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };

    case CONFIG_SET_STORED:
      return {
        ...state,
        isLoading: false,
        isConfigured: true,
        helperTexts: {},
        stored: action.config,
        inputs: state.inputs,
      };

    case CONFIG_SET_INPUTS:
      return {
        ...state,
        inputs: action.inputs,
      };

    case CONFIG_SET_INPUT:
      return action.outerField
        ? {
            ...state,
            inputs: {
              ...state.inputs,
              [action.outerField]: {
                ...state.inputs[action.outerField],
                [action.field]: action.value,
              },
            },
          }
        : {
            ...state,
            inputs: {
              ...state.inputs,
              [action.field]: action.value,
            },
          };

    case CONFIG_SHOW_HELPER_TEXT:
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
