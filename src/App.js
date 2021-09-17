import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import AppLoading from 'components/AppLoading';
import { AuthProvider, useAuth } from 'context/AuthContext';

function AuthRoutes() {
  const { authAttempted, authUser } = useAuth();

  return !authAttempted ? (
    <AppLoading />
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
