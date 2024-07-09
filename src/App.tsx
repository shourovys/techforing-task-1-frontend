import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import JobList from './pages/JobList.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to='/login' />;
};

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <JobList />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
