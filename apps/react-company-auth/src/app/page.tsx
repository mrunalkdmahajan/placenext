import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Login from './login/page';
import Signup from '../../../web/src/app/signup/page';
import CompanyProfile from './company/profile/page';
import CompanyDashboard from './company/dashboard/page';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;