import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfilePage } from '@/features/profile';

export default function ProfileRoutePage() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
