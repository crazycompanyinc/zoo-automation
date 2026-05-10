import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { leadService } from '../services/leadService.js';
import { serviceService } from '../services/serviceService.js';
import { Button } from '../components/ui/Button.js';
import { Input, TextArea } from '../components/ui/Input.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card.js';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import type { Service } from '../types/index.js';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  company: z.string().max(200).optional(),
  serviceId: z.string().optional(),
  description: z.string().min(10, 'Please describe your needs (min 10 chars)').max(5000),
  budget: z.string().max(100).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [services, setServices] = useState<Service[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    serviceService.getAll().then((res) => setServices(res.data)).catch(() => {});
  }, []);

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    try {
      await leadService.create(data);
      setSubmitted(true);
      reset();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent>
            <CheckCircle className="w-16 h-16 text-zoo-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Request Received!</h2>
            <p className="text-dark-400 mb-6">
              Thank you for your interest. Our team will review your request and get back to you within 24 hours.
            </p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your Automation Project</h1>
          <p className="text-dark-400 max-w-2xl mx-auto text-lg">
            Tell us about your automation needs and we'll get back to you with a custom proposal.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Request Form</CardTitle>
            <CardDescription>Fill out the details below and we'll craft a solution for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" id="name" placeholder="John Doe" error={errors.name?.message} {...register('name')} />
                <Input label="Email" id="email" type="email" placeholder="john@company.com" error={errors.email?.message} {...register('email')} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Company (optional)" id="company" placeholder="Acme Inc." error={errors.company?.message} {...register('company')} />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-dark-300">Service of Interest</label>
                  <select
                    className="w-full px-4 py-2.5 bg-dark-900 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-zoo-500"
                    {...register('serviceId')}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Input label="Budget Range (optional)" id="budget" placeholder="$10,000 - $25,000" error={errors.budget?.message} {...register('budget')} />
              <TextArea
                label="Project Description"
                id="description"
                placeholder="Describe your automation challenge, current process, and what you'd like to achieve..."
                error={errors.description?.message}
                {...register('description')}
                rows={6}
              />
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
