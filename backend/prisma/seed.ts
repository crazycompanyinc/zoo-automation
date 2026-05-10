import { prisma } from '../src/config/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // Services
  const services = [
    {
      slug: 'ai-agent-development',
      title: 'AI Agent Development',
      description: 'Custom AI agents that automate your business processes. From intelligent chatbots to autonomous workflow agents that handle complex multi-step operations.',
      features: ['Custom LLM-powered agents', 'Multi-step workflow automation', 'API integrations', 'Natural language processing', 'Continuous learning & improvement'],
      icon: 'Bot',
      priceRange: '$5,000 - $50,000',
    },
    {
      slug: 'process-automation',
      title: 'Process Automation',
      description: 'End-to-end automation of repetitive business processes. Eliminate manual tasks, reduce errors, and free your team to focus on high-value work.',
      features: ['Workflow analysis & optimization', 'RPA bot development', 'System integration', 'Error handling & monitoring', 'Performance dashboards'],
      icon: 'Cog',
      priceRange: '$3,000 - $30,000',
    },
    {
      slug: 'data-pipeline-automation',
      title: 'Data Pipeline Automation',
      description: 'Automated data collection, transformation, and delivery pipelines. Get clean, structured data flowing to your analytics and ML systems.',
      features: ['ETL/ELT pipeline design', 'Real-time data streaming', 'Data quality monitoring', 'Automated reporting', 'Cloud-native architecture'],
      icon: 'Database',
      priceRange: '$4,000 - $40,000',
    },
    {
      slug: 'customer-support-automation',
      title: 'Customer Support Automation',
      description: 'AI-powered support systems that handle customer inquiries 24/7. Reduce response times and support costs while improving customer satisfaction.',
      features: ['Intelligent ticket routing', 'AI response generation', 'Multi-channel support', 'Escalation management', 'Analytics & insights'],
      icon: 'Headphones',
      priceRange: '$2,000 - $25,000',
    },
    {
      slug: 'document-processing',
      title: 'Document Processing Automation',
      description: 'Extract, classify, and process documents automatically. From invoices to contracts, let AI handle your document workflows.',
      features: ['OCR & data extraction', 'Document classification', 'Automated data entry', 'Compliance checking', 'Archive & retrieval'],
      icon: 'FileText',
      priceRange: '$3,000 - $35,000',
    },
    {
      slug: 'custom-solutions',
      title: 'Custom Automation Solutions',
      description: 'Have a unique automation challenge? We build bespoke solutions tailored to your specific business needs and technical requirements.',
      features: ['Requirements analysis', 'Custom architecture design', 'Full-stack development', 'Testing & QA', 'Deployment & support'],
      icon: 'Wrench',
      priceRange: '$10,000 - $100,000+',
    },
  ];

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
  }
  console.log(`  Created ${services.length} services`);

  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@zootechnologies.com' },
    update: {},
    create: {
      email: 'admin@zootechnologies.com',
      password: adminPassword,
      name: 'ZOO Admin',
      company: 'ZOO Technologies',
      role: 'admin',
    },
  });
  console.log(`  Created admin user: ${admin.email}`);

  // Demo client
  const clientPassword = await bcrypt.hash('client123', 12);
  const client = await prisma.user.upsert({
    where: { email: 'demo@client.com' },
    update: {},
    create: {
      email: 'demo@client.com',
      password: clientPassword,
      name: 'Demo Client',
      company: 'Acme Corp',
      role: 'client',
    },
  });
  console.log(`  Created demo client: ${client.email}`);

  // Demo leads
  const aiService = await prisma.service.findUnique({ where: { slug: 'ai-agent-development' } });
  const processService = await prisma.service.findUnique({ where: { slug: 'process-automation' } });

  if (aiService) {
    await prisma.lead.create({
      data: {
        userId: client.id,
        serviceId: aiService.id,
        name: 'Demo Client',
        email: 'demo@client.com',
        company: 'Acme Corp',
        description: 'We need an AI agent to handle our customer onboarding process. Currently it takes 3 days manually. We want to reduce it to under 1 hour with an intelligent agent that can guide new customers through setup, answer questions, and escalate to humans when needed.',
        budget: '$15,000 - $25,000',
        status: 'qualified',
      },
    });
  }

  if (processService) {
    await prisma.lead.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@techcorp.io',
        company: 'TechCorp Inc.',
        description: 'Looking to automate our invoice processing workflow. We receive 500+ invoices per month in various formats (PDF, email, scanned). Need a system that extracts key data, validates against PO numbers, and routes for approval.',
        budget: '$10,000 - $20,000',
        status: 'new',
      },
    });
  }

  await prisma.lead.create({
    data: {
      name: 'Carlos Rodriguez',
      email: 'carlos@startup.co',
      company: 'StartupCo',
      description: 'We are a fintech startup looking to build an AI-powered compliance monitoring system. It needs to scan transactions in real-time and flag potential issues.',
      budget: '$30,000 - $50,000',
      status: 'contacted',
    },
  });

  console.log('  Created 3 demo leads');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
