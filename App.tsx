import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

// Mock API Key check wrapper
const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  // In a real app, we would check for auth token here.
  // For this generator, we assume open access but ensure the environment is set up.
  if (!process.env.API_KEY) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
         <div className="max-w-md text-center">
           <h1 className="text-2xl font-bold text-red-700 mb-2">Configuration Error</h1>
           <p className="text-red-900">
             The <code>API_KEY</code> environment variable is missing. 
             Please configure your Google Gemini API key to use this application.
           </p>
         </div>
       </div>
     );
  }
  return children;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <RequireAuth>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RequireAuth>
    </HashRouter>
  );
};

export default App;