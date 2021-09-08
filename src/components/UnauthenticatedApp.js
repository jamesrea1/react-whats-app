import { useState } from 'react';
import { auth } from 'lib/firebase';
import { ERROR_CODES } from 'utils/constants';
import useInput from 'utils/useInput';

function UnauthenticatedApp() {
  return (
    <div className="flex justify-center">
      <SignIn />
      <SignUp />
    </div>
  );
}

function SignIn() {
  const email = useInput('jamesreadev@outlook.com', 'email');
  const password = useInput('asdasd', 'password');
  const [error, setError] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    error && setError(null);

    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((UserCredential) => {
        console.log('Signed In: ' + UserCredential.user.displayName);
      })
      .catch((error) => {
        setError('Problem logging you in: ' + error.message);
        console.log(ERROR_CODES[error.code]);
      });
  };

  return (
    <div className="w-64 m-8 p-8 border border-red-600">
      <h1 className="mb-4 text-3xl">Login</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Email
          <input {...email.attrs} className="block mt-1" />
        </label>
        <label className="block mb-4">
          Password
          <input {...password.attrs} className="block mt-1" />
        </label>
        <button
          className={`text-white bold py-2 px-4 rounded ${
            error ? 'bg-red-700' : 'bg-blue-700'
          }`}
        >
          Sign in
        </button>
        <div>{error}</div>
      </form>
    </div>
  );
}

function SignUp() {
  //const displayName = useInput();  //set when logged in
  const email = useInput('', 'email');
  const password = useInput('', 'password');
  const [error, setError] = useState(undefined);

  const handleSignUp = (e) => {
    e.preventDefault();
    error && setError(null);

    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      // .then((UserCredential) => {
      //   const { user } = UserCredential;
      //   return user.updateProfile({
      //     displayName: displayName.value,
      //     sortName: displayName.value.toLowerCase(),
      //     photoURL: `https://i.pravatar.cc/150?u=${user.uid}`,  //upload when logged in ?
      //   });
      // })
      // .then(() => {
      //   auth.updateCurrentUser(auth.currentUser);
      // })
      .catch((error) => {
        setError('Problem logging you in: ' + error.message);
        console.log(ERROR_CODES[error.code]);
      });
  };

  return (
    <div className="w-64 m-8 p-8 border border-red-600">
      <h1 className="mb-4 text-3xl">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        {/* <label className="block mb-4">
          Display Name
          <input {...displayName.attrs} className="block mt-1" />
        </label> */}
        <label className="block mb-4">
          Email
          <input {...email.attrs} className="block mt-1" />
        </label>
        <label className="block mb-4">
          Password
          <input {...password.attrs} className="block mt-1" />
        </label>
        <button
          className={`text-white bold py-2 px-4 rounded ${
            error ? 'bg-red-700' : 'bg-blue-700'
          }`}
        >
          Sign up
        </button>
        <div>{error}</div>
      </form>
    </div>
  );
}

export default UnauthenticatedApp;
