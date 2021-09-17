const ERROR_CODES = {
  'auth/invalid-email': 'Invalid email address',
  'auth/user-disabled':
    'The account associated with this email address has been disabled',
  'auth/user-not-found':
    'No account found for the email address you entered',
  'auth/wrong-password':
    'The password you entered does not match the email address',
  'auth/email-already-in-use':
    'An account already exists for this email address',
  'auth/operation-not-allowed':
    'Email/password accounts are not enabled',
  'auth / weak - password': 'The password is too weak [rules]',
  'auth/requires-recent-login':
    "Please re-authenticate",
};

export { ERROR_CODES };
