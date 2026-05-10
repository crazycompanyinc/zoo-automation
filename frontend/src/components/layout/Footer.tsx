import { Bot } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-zoo-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ZOO<span className="text-zoo-400">Automation</span></span>
            </div>
            <p className="text-dark-400 max-w-md">
              Custom AI-powered automation solutions that transform how businesses operate. 
              From intelligent agents to end-to-end process automation.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-dark-400">
              <li>AI Agent Development</li>
              <li>Process Automation</li>
              <li>Data Pipelines</li>
              <li>Document Processing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-dark-400">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-500 text-sm">
          &copy; {new Date().getFullYear()} ZOO Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
