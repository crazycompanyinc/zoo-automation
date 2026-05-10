import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceService } from '../services/serviceService.js';
import { Card, CardContent } from '../components/ui/Card.js';
import { Button } from '../components/ui/Button.js';
import { Badge } from '../components/ui/Badge.js';
import { Bot, Cog, Database, Headphones, FileText, Wrench, ArrowRight, Loader2 } from 'lucide-react';
import type { Service } from '../types/index.js';

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-8 h-8" />,
  Cog: <Cog className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceService.getAll().then((res) => {
      setServices(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-zoo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-dark-400 max-w-2xl mx-auto text-lg">
            Comprehensive AI-powered automation solutions tailored to your business needs.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service) => (
            <Card key={service.id} id={service.slug} className="hover:border-zoo-500/30 transition-colors">
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="text-zoo-400 shrink-0">
                    {iconMap[service.icon] || <Bot className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                      <Badge>{service.priceRange}</Badge>
                    </div>
                    <p className="text-dark-400 mb-4">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-dark-300">
                          <div className="w-1.5 h-1.5 bg-zoo-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link to="/contact">
                      <Button size="sm">
                        Request a Quote <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
