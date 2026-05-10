import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.js';
import { Card, CardContent } from '../components/ui/Card.js';
import { Bot, Cog, Database, Headphones, FileText, Wrench, ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-8 h-8" />,
  Cog: <Cog className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
};

const services = [
  { slug: 'ai-agent-development', title: 'AI Agent Development', description: 'Custom AI agents that automate your business processes.', icon: 'Bot', price: '$5K - $50K' },
  { slug: 'process-automation', title: 'Process Automation', description: 'End-to-end automation of repetitive business processes.', icon: 'Cog', price: '$3K - $30K' },
  { slug: 'data-pipeline-automation', title: 'Data Pipeline Automation', description: 'Automated data collection, transformation, and delivery.', icon: 'Database', price: '$4K - $40K' },
  { slug: 'customer-support-automation', title: 'Customer Support Automation', description: 'AI-powered support systems that handle inquiries 24/7.', icon: 'Headphones', price: '$2K - $25K' },
  { slug: 'document-processing', title: 'Document Processing', description: 'Extract, classify, and process documents automatically.', icon: 'FileText', price: '$3K - $35K' },
  { slug: 'custom-solutions', title: 'Custom Solutions', description: 'Bespoke automation solutions tailored to your needs.', icon: 'Wrench', price: '$10K - $100K+' },
];

const stats = [
  { value: '150+', label: 'Automation Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction Rate' },
  { value: '10x', label: 'Average Efficiency Gain' },
  { value: '24/7', label: 'AI Agent Availability' },
];

export function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zoo-900/20 via-dark-900 to-dark-900" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-zoo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-zoo-500/10 border border-zoo-500/30 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-zoo-400" />
              <span className="text-sm text-zoo-400 font-medium">AI-Powered Business Automation</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Automate Your Business with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zoo-400 to-emerald-300">
                Intelligent AI Agents
              </span>
            </h1>
            <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10">
              We build custom AI-powered automation solutions that eliminate manual tasks, 
              reduce costs, and let your team focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-dark-700 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zoo-400 mb-1">{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Automation Services</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              From AI agents to full process automation, we deliver solutions that transform how you work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link key={svc.slug} to={`/services#${svc.slug}`}>
                <Card className="h-full hover:border-zoo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-zoo-500/10 group">
                  <CardContent>
                    <div className="text-zoo-400 mb-4 group-hover:scale-110 transition-transform">{iconMap[svc.icon]}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-dark-400 text-sm mb-4">{svc.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-zoo-400 text-sm font-medium">{svc.price}</span>
                      <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-zoo-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why ZOO Automation?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-zoo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-zoo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast Delivery</h3>
              <p className="text-dark-400">Most automation projects delivered in 2-6 weeks. We iterate fast and ship working solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zoo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-zoo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enterprise-Grade Security</h3>
              <p className="text-dark-400">SOC 2 compliant processes, encrypted data handling, and security-first architecture.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zoo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-zoo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Measurable ROI</h3>
              <p className="text-dark-400">Every project includes KPIs and reporting. Track your automation ROI in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Automate?</h2>
          <p className="text-dark-400 mb-8 max-w-2xl mx-auto">
            Tell us about your automation challenges and we'll propose a custom solution.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Get a Free Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
