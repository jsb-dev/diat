import React, { useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { initializeAuth, setAuthState } from '@/redux/slices/authSlice';
import { initializeDiagram, setDiagram, setDiagramInCache } from '@/redux/slices/diagramSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { Diagram } from '../interfaces/Diagram';
import { User } from '../interfaces/User';
import AuthToggle from '@/components/auth/AuthToggle';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const DashboardPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: diagram } = useSelector((state: any) => state.diagram);
  const authState = useSelector((state: any) => state.auth);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user?.email && !authState?.isAuthenticated) {
        getUserCredentials(user.email).then(credentials => {
          if (credentials) {
            dispatch(setAuthState({ isAuthenticated: true, user: credentials }));
            if (credentials.diagramId && !diagram) {
              getUserDiagram(credentials.diagramId).then(diagram => {
                if (diagram) {
                  dispatch(setDiagram(diagram));
                  dispatch(setDiagramInCache(diagram));
                }
                setLoading(false);
              });
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        });
      } else {
        dispatch(initializeAuth());
        dispatch(initializeDiagram());
        setLoading(false);
      }
    }
  }, [user, isAuthenticated, isLoading, authState?.isAuthenticated, diagram, dispatch]);

  const getUserCredentials = async (email: string): Promise<User | null> => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/get/credentials?email=${email}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching user credentials', await response.text());
        return null;
      }
    } catch (error) {
      console.error('Error fetching user credentials', error);
      return null;
    }
  };
  
  const getUserDiagram = async (diagramId: string): Promise<Diagram | null> => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/get/diagram?diagramId=${diagramId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching user diagram', await response.text());
        return null;
      }
    } catch (error) {
      console.error('Error fetching user diagram', error);
      return null;
    }
  };

  console.log('DashboardPage', { isAuthenticated, user, authState, diagram });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <AuthToggle />
    </div>
  );
}

export default DashboardPage;
