import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Button } from '../components/ui/Button.js';
import { Input } from '../components/ui/Input.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card.js';
import { Bot, Loader2 } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  company: z.string().max(200).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register: formRegister, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    try {
      await registerUser(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-zoo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Get started with ZOO Automation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Input label="Full Name" id="name" placeholder="John Doe" error={errors.name?.message} {...formRegister('name')} />
            <Input label="Email" id="email" type="email" placeholder="you@company.com" error={errors.email?.message} {...formRegister('email')} />
            <Input label="Company (optional)" id="company" placeholder="Acme Inc." error={errors.company?.message} {...formRegister('company')} />
            <Input label="Password" id="password" type="password" placeholder="Min 6 characters" error={errors.password?.message} {...formRegister('password')} />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          <p className="text-center text-dark-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-zoo-400 hover:text-zoo-300 font-medium">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
