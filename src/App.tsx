import React, { useEffect, useState } from 'react';
import { auth } from './lib/firebase';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Auth from './components/Auth';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {children}
      </main>

      <Footer />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsTaskFormOpen(true)}
        className="fixed right-8 bottom-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <Plus size={24} />
      </button>

      {/* Task Form Modal */}
      <TaskForm isOpen={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <Toaster position="top-right" />
      {user ? (
        <Layout>
          <TaskList />
        </Layout>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;