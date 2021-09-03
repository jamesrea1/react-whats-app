const ERROR_CODES = {
  'auth/invalid-email': 'Thrown if the email address is not valid.',
  'auth/user-disabled':
    'Thrown if the user corresponding to the given email has been disabled.',
  'auth/user-not-found':
    'Thrown if there is no user corresponding to the given email.',
  'auth/wrong-password':
    'Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.',
  'auth/email-already-in-use':
    'Thrown if there already exists an account with the given email address.',
  'auth/operation-not-allowed':
    'Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.',
  'auth / weak - password': 'Thrown if the password is not strong enough.',
  'auth/requires-recent-login':
    "Thrown if the user's last sign-in time does not meet the security threshold. Use firebase.User.reauthenticateWithCredential to resolve. This does not apply if the user is anonymous.",
};

export { ERROR_CODES };
