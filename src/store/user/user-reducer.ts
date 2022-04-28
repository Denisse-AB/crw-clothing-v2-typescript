import { AnyAction } from "redux";
import {
  signInSuccess,
  signOutSuccess,
  signOutFailed,
  signInFailed,
  signUpFailed,
} from "./user-actions";
import { userData } from "../../utils/firebase/firebase";

export type UserState = {
  readonly currentUser: userData | null,
  readonly isLoading: boolean,
  readonly error: Error | null
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  const { type, payload } = action;
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload }
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null }
  }
  if (signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
    // return { ...state, error: action.payload }
    return { ...state, error: payload }
  }
  return state;
}
