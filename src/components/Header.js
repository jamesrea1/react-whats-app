import { auth } from 'lib/firebase';
import { useAuth } from 'auth/useAuth';

function Header() {
  const { authUser } = useAuth();

  const handleLogOut = (e) => {
    auth.signOut();
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-green-300">
        <h1 className="text-lg font-bold">
          Logged In: {authUser.displayName}{' '}
        </h1>
        <button
          className="bg-blue-500 px-4 py-2 text-white rounded"
          onClick={handleLogOut}
        >
          log out
        </button>
      </div>

      {/* <div className="mb-4">
        <div>{authUser.uid}</div>
        <div>{authUser.displayName}</div>
        <div>{authUser.email}</div>
        <div>{authUser.photoURL}</div>
      </div> */}
    </div>
  );
}

export default Header;
