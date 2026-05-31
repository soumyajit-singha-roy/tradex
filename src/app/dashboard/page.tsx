'use client';

import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Welcome Back</h1>
        </div>
      </AnimatedContainer>

      {/* Profile Card */}
      <ProfileCard />
    </div>
  );
}

