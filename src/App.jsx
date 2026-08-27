import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ItemsProvider } from './context/ItemsContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import CategoryPage from './Pages/CategoryPage';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ItemsProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <Navbar />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/category/:category" element={
                      <ProtectedRoute>
                        <CategoryPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </ItemsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
