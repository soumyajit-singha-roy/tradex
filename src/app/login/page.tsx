import type { Metadata } from 'next';
import { LoginPageClient } from './LoginPageClient';

export const metadata: Metadata = {
  title: 'TradeX',
  description: 'Sign in to your TradeX premium trading dashboard. Secure access for institutional and HNI clients.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}
