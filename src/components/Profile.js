import { useEffect, useState } from 'react';
import { auth } from 'lib/firebase';
import useInput from 'hooks/useInput';

function Profile({ user, hide }) {
  console.log('render profile');

/*
  import Profile from 'components/Profile';
  <Profile user={authUser} />;
*/

  const displayName = useInput(user.displayName || '');
  const photoURL = useInput(user.photoURL || '');
  const email = useInput(user.email || '', 'email');
  const password = useInput('', 'password');

  useEffect(() => {
    displayName.setValue(user.displayName || '');
    photoURL.setValue(user.photoURL || '');
    email.setValue(user.email || '');
  }, [user]);

  const [error, setError] = useState(false);

  const handleLogOut = (e) => {
    auth.signOut();
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setError(null);
    const user = auth.currentUser;
    user
      .updateProfile({
        displayName: displayName.value,
        photoURL: photoURL.value || `https://i.pravatar.cc/150?u=${user.uid}`,
      })
      .then(() => {
        auth.updateCurrentUser(auth.currentUser);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    setError(null);
    const user = auth.currentUser;
    user
      .updateEmail(email.value)
      .then(() => {
        auth.updateCurrentUser(auth.currentUser);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setError(null);
    const user = auth.currentUser;
    user
      .updatePassword(password.value)
      .then(() => {
        console.log('password updated');
        password.setValue('');
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  // const reAuthenticate = () => {
  //   const user = auth.currentUser;
  //   const credential = firebase.auth.EmailAuthProvider.credential(
  //     user.email,
  //     password.value
  //   );
  //   // Now you can use that to reauthenticate
  //   user
  //     .reauthenticateWithCredential(credential)
  //     .then((UserCredential) => {
  //       console.dir(UserCredential);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };

  return hide ? (
    <button
      className="bg-blue-500 px-4 py-2 text-white rounded mt-2"
      onClick={handleLogOut}
    >
      log out
    </button>
  ) : (
    <>
      <h1 className="text-lg font-bold">Logged In user </h1>
      <div className="mb-4">
        {user &&
          Object.entries(user).map(([key, val]) => (
            <div key={key}>
              <span className="inline-block w-24">{key}:</span>{' '}
              <span className="font-bold pl-2">{val}</span>
            </div>
          ))}
        <button
          className="bg-blue-500 px-4 py-2 text-white rounded mt-2"
          onClick={handleLogOut}
        >
          log out
        </button>
      </div>

      <h1 className="text-lg font-bold">Update profile </h1>
      <form className="mb-4" onSubmit={handleUpdateProfile}>
        <div className="mb-2">
          displayName: <input {...displayName.attrs} />
        </div>
        <div className="mb-2">
          photoURL: <input {...photoURL.attrs} />
        </div>
        <button className="bg-blue-500 px-4 py-2 text-white rounded mt-2">
          Submit
        </button>
      </form>

      <h1 className="text-lg font-bold">Update email </h1>
      <form className="mb-4" onSubmit={handleUpdateEmail}>
        <div className="mb-2">
          email: <input {...email.attrs} />
        </div>
        <button className="bg-blue-500 px-4 py-2 text-white rounded mt-2">
          Submit
        </button>
      </form>

      <h1 className="text-lg font-bold">Update password </h1>
      <form className="mb-4" onSubmit={handleUpdatePassword}>
        <div className="mb-2">
          password: <input {...password.attrs} />
        </div>
        <button className="bg-blue-500 px-4 py-2 text-white rounded mt-2">
          Submit
        </button>
      </form>

      <div className="mb-4 text-red-700 font-bold">{error}</div>

      <h1 className="text-lg font-bold">Profile pic </h1>
      <img src={user.photoURL} alt="" />
    </>
  );
}

export default Profile;
