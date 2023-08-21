import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice/authSlice';
import { checkAdmin } from '../../utils/checkAdmin';

interface IPrivateRoute {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: IPrivateRoute): JSX.Element => {
  const user = useSelector(selectUser);

  const isAdmin = checkAdmin(user?.email);

  if (isAdmin) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
