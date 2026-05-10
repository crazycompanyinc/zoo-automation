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

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-zoo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your ZOO Automation account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Input label="Email" id="email" type="email" placeholder="you@company.com" error={errors.email?.message} {...register('email')} />
            <Input label="Password" id="password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-center text-dark-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-zoo-400 hover:text-zoo-300 font-medium">Create one</Link>
          </p>
          <div className="mt-4 p-3 bg-dark-900 rounded-lg text-xs text-dark-500">
            <strong>Demo:</strong> admin@zootechnologies.com / admin123
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
