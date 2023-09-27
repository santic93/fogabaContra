import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? (
    <Routes>
      <Route element={element} />
    </Routes>
  ) : (
    <Navigate to='/' replace={true} />
  );
};

export default PrivateRoute;
