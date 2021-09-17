import { useState } from 'react';
import { auth } from 'lib/firebase';
import { ERROR_CODES } from 'utils/constants';
import useInput from 'utils/useInput';
import { XCircleIcon } from '@heroicons/react/solid';

function UnauthenticatedApp() {
  return (
    <div className="">
      <SignIn />
      {/* <SignUp /> */}
    </div>
  );
}

function SignIn() {
  return (
    <div className="relative z-0 flex flex-col items-center">
      <div
        className="absolute top-0 h-56 sm:h-48 w-full bg-[#00bfa5]"
        style={{ zIndex: -1 }}
      ></div>
      <div className="max-w-[1000px] sm:w-full sm:px-16 pt-8 pb-6 sm:pt-8 sm:pb-12 flex-none flex flex-col sm:flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 sm:w-10 sm:h-10"
          viewBox="0 0 39 39"
        >
          <path
            fill="#00E676"
            d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
          ></path>
          <path
            fill="#FFF"
            d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
          ></path>
        </svg>
        <h1 className="text-white text-sm font-bold sm:ml-3 mt-3 sm:mt-0">
          WHATSAPP WEB
        </h1>
      </div>
      <div className="flex-none w-96">
        <div className="px-11 pb-12 pt-12 bg-white rounded shadow-xl">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
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
          setError(ERROR_CODES[error.code]);
          console.log(ERROR_CODES[error.code]);
        });
  };

  return (
    <div className="">
      <h2 className="text-3xl font-light text-gray-900">
        Sign in to your account
      </h2>
      {error && <Alert>{error}</Alert>}
      <div className="mt-8">
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...email.attrs}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#84c4bd] focus:border-[#84c4bd] text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  {...password.attrs}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#84c4bd] focus:border-[#84c4bd] text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#009688] focus:ring-[#84c4bd] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button className="font-medium text-[#009688] hover:opacity-95">
                  Forgot your password?
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#009688] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84c4bd]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


function Alert({children}) {
  return (
    <div className="rounded-md bg-red-50 p-3 mt-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-2">
          <h3 className="text-sm font-medium text-red-800">Error signing in</h3>
          <div className="mt-1 text-sm text-red-700 max-w-[200px]">
            <p>
              {children}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




// function SignUp() {
//   //const displayName = useInput();  //set when logged in
//   const email = useInput('', 'email');
//   const password = useInput('', 'password');
//   const [error, setError] = useState(undefined);

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     error && setError(null);

//     auth
//       .createUserWithEmailAndPassword(email.value, password.value)
//       // .then((UserCredential) => {
//       //   const { user } = UserCredential;
//       //   return user.updateProfile({
//       //     displayName: displayName.value,
//       //     sortName: displayName.value.toLowerCase(),
//       //     photoURL: `https://i.pravatar.cc/150?u=${user.uid}`,  //upload when logged in ?
//       //   });
//       // })
//       // .then(() => {
//       //   auth.updateCurrentUser(auth.currentUser);
//       // })
//       .catch((error) => {
//         setError('Problem logging you in: ' + error.message);
//         console.log(ERROR_CODES[error.code]);
//       });
//   };

//   return (
//     <div className="w-64 m-8 p-8 border border-red-600">
//       <h1 className="mb-4 text-3xl">Sign Up</h1>
//       <form onSubmit={handleSignUp}>
//         {/* <label className="block mb-4">
//           Display Name
//           <input {...displayName.attrs} className="block mt-1" />
//         </label> */}
//         <label className="block mb-4">
//           Email
//           <input {...email.attrs} className="block mt-1" />
//         </label>
//         <label className="block mb-4">
//           Password
//           <input {...password.attrs} className="block mt-1" />
//         </label>
//         <button
//           className={`text-white bold py-2 px-4 rounded ${
//             error ? 'bg-red-700' : 'bg-blue-700'
//           }`}
//         >
//           Sign up
//         </button>
//         <div>{error}</div>
//       </form>
//     </div>
//   );
// }

export default UnauthenticatedApp;
