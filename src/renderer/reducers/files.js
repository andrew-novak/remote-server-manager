import { SET_ALL_FILENAMES } from "../constants/actionTypes";

const initialState = {
  config: [],
  static: [],
  nodeApis: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_FILENAMES:
      return action.sections;

    default:
      return state;
  }
};
