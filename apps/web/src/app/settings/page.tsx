import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { SettingsPage } from '@/features/settings/components/SettingsPage';

export default function SettingsRoutePage() {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
}
