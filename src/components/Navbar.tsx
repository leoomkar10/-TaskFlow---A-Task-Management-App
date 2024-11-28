
import { auth } from '../lib/firebase';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun} from 'lucide-react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const user = auth.currentUser;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              TaskFlow
            </h1>
          </div>

          <div className="flex items-center gap-4">
           

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            
            <button
                  onClick={() => auth.signOut()}
                  className="ml-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}