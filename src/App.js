import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import { AuthProvider, useAuth } from 'context/AuthContext';

function AuthRoutes() {
  const { authAttempted, authUser } = useAuth();

  return !authAttempted ? (
    'loading'
  ) : authUser ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>
  );
}
