import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { leadService } from '../services/leadService.js';
import { serviceService } from '../services/serviceService.js';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card.js';
import { Badge } from '../components/ui/Badge.js';
import { Button } from '../components/ui/Button.js';
import { Input, TextArea } from '../components/ui/Input.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '../components/layout/Layout.js';
import { FileText, TrendingUp, Plus, Loader2, Inbox } from 'lucide-react';
import type { Lead, Service } from '../types/index.js';

const leadSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
  serviceId: z.string().optional(),
  description: z.string().min(10, 'Min 10 characters'),
  budget: z.string().optional(),
});

type LeadForm = z.infer<typeof leadSchema>;

export function Dashboard() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState({ total: 0, new: 0, converted: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
  });

  const loadData = async () => {
    try {
      const [leadsRes, servicesRes, statsRes] = await Promise.all([
        leadService.getAll(),
        serviceService.getAll(),
        leadService.getStats().catch(() => null),
      ]);
      setLeads(leadsRes.data);
      setServices(servicesRes.data);
      if (statsRes) setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const onSubmit = async (data: LeadForm) => {
    setSubmitting(true);
    try {
      await leadService.create(data);
      reset();
      setShowForm(false);
      await loadData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create lead');
    } finally {
      setSubmitting(false);
    }
  };

  const statusLabel: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    qualified: 'Qualified',
    converted: 'Converted',
    lost: 'Lost',
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-zoo-400 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-dark-400">Welcome back, {user?.name}</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zoo-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-zoo-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-sm text-dark-400">Total Requests</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Inbox className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.new}</div>
                  <div className="text-sm text-dark-400">New Requests</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.converted}</div>
                  <div className="text-sm text-dark-400">Converted</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Request Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>New Automation Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Name" id="lead-name" error={errors.name?.message} {...register('name')} />
                    <Input label="Email" id="lead-email" type="email" error={errors.email?.message} {...register('email')} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Company" id="lead-company" error={errors.company?.message} {...register('company')} />
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-dark-300">Service</label>
                      <select className="w-full px-4 py-2.5 bg-dark-900 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-zoo-500" {...register('serviceId')}>
                        <option value="">Select...</option>
                        {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <Input label="Budget Range" id="lead-budget" placeholder="$10,000 - $25,000" {...register('budget')} />
                  <TextArea label="Description" id="lead-description" error={errors.description?.message} {...register('description')} rows={4} />
                  <div className="flex gap-3">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Submit Request
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <div className="text-center py-12 text-dark-500">
                  <Inbox className="w-12 h-12 mx-auto mb-3 text-dark-600" />
                  <p className="mb-2">No requests yet</p>
                  <Button size="sm" onClick={() => setShowForm(true)}>Create your first request</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Service</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Budget</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-dark-700/50 hover:bg-dark-800/50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="text-white font-medium">{lead.name}</div>
                              <div className="text-sm text-dark-500">{lead.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-dark-300 text-sm">{lead.service?.title || '—'}</td>
                          <td className="py-3 px-4 text-dark-300 text-sm">{lead.budget || '—'}</td>
                          <td className="py-3 px-4"><Badge status={lead.status}>{statusLabel[lead.status]}</Badge></td>
                          <td className="py-3 px-4 text-dark-500 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
