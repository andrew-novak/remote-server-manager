import { CONFIG_RESTART } from "../constants/actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const restart = () => (dispatch) => dispatch({ type: CONFIG_RESTART });
