import { Redirect } from 'expo-router';

export default function EntryPoint() {
  // For now, redirect to the protected route.
  // Later, this will check for authentication.
  return <Redirect href="/(protected)" />;
}
