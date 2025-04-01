import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { authenticateUser } from '@/lib/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isAuthenticated = await authenticateUser(email, password);
      if (isAuthenticated) {
        toast({ title: 'Login Successful', description: 'Welcome back!' });
        router.push('/app/company/dashboard'); // Redirect to dashboard
      } else {
        toast({ title: 'Login Failed', description: 'Invalid email or password.', variant: 'error' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred during login.', variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;