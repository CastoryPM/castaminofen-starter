'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { CreatorStudioHome } from '@/features/create/components/CreatorStudioHome';

export default function CreatePage() {
  return (
    <ProtectedRoute>
      <CreatorStudioHome />
    </ProtectedRoute>
  );
}
