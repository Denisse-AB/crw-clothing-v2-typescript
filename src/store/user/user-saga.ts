import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';
import { USER_ACTION_TYPES } from './user-types';

import { signInSuccess, signInFailed, signUpSuccess, signOutSuccess, signOutFailed, EmailSignInStart, SignUpStart, SignUpSuccess } from './user-actions';

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInUserAuthWithEmailAndPassword,
    createUserAuthWithEmailAndPassword,
    additionalInformation,
    SignOut
} from '../../utils/firebase/firebase';

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: additionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({payload: {email, password, displayName}}: SignUpStart) {
  try {
    const userCredential = yield* call(createUserAuthWithEmailAndPassword, email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, {displayName}));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signInWithEmail({ payload: { email, password }}: EmailSignInStart) {
  try {
    const userCredential = yield* call(signInUserAuthWithEmailAndPassword, email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signOutUser() {
  try {
    yield* call(SignOut)
    yield* put(signOutSuccess())
  } catch (error) {
    yield* put(signOutFailed(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
};

export function* onGoogleSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle
  )
}

export function* onCheckUserSession() {
  yield* takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated
  )
}

export function* onEmailSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail
  );
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutUser);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ])
};