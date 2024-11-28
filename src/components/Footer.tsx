
import { Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              Created by
            </span>
            <a
              href="https://omkargunjote.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Globe size={16} />
              <span className="font-medium">omkargunjote.dev</span>
            </a>
            <a
              href="https://github.com/leoomkar10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}