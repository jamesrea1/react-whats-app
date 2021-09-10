import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import { AuthProvider, useAuth } from 'context/AuthContext';

function AuthRoutedApp() {
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
      <AuthRoutedApp />
    </AuthProvider>
  );
}
