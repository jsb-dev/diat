import React, { useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { initializeAuth, setAuthState } from '@/redux/slices/authSlice';
import { initializeDiagram, setDiagram, setDiagramInCache } from '@/redux/slices/flowSlice';
import { setUser } from '@/redux/slices/userSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { Diagram } from '../interfaces/Diagram';
import { User } from '../interfaces/User';
import { Node, Edge } from 'reactflow';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageShell from '@/components/shared/page-shell/PageShell';
import Flow from '@/components/diagram/Flow';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DashboardPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: diagram } = useSelector((state: any) => state.diagram);
  const authState = useSelector((state: any) => state.auth);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [loading, setLoading] = useState(true);
  const diagramNodes: Node[] = [];
  const diagramEdges: Edge[] = [];
  const [userCredentials, setUserCredentials] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isLoading) {
        if (isAuthenticated && user?.email && !authState?.isAuthenticated) {
          let credentials = await getUserCredentials(user.email);

          if (credentials) {
            let currentDiagram = diagram;
            let currentAuthState = {
              isAuthenticated: true,
              user: credentials,
            };

            if (credentials.diagramId && !diagram) {
              currentDiagram = await getUserDiagram(credentials.diagramId);
              if (currentDiagram) {
                currentDiagram.nodes = currentDiagram.content.nodes;
                currentDiagram.edges = currentDiagram.content.edges;
                delete currentDiagram.diagramId;
                delete currentDiagram.content;
                dispatch(setDiagram(currentDiagram));
                dispatch(setDiagramInCache(currentDiagram));
              }
            }

            const userData: User = {
              email: credentials.email,
              userId: credentials.userId,
              diagramId: credentials.diagramId,
              diagram: currentDiagram,
              authState: currentAuthState,
            };

            dispatch(setUser(userData));
            dispatch(setAuthState(currentAuthState));
            setUserCredentials(credentials);
          }
          setLoading(false);
        } else {
          dispatch(initializeAuth());
          dispatch(initializeDiagram());
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
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

  const main =
    <Flow diagramNodes={diagramNodes} diagramEdges={diagramEdges} />

  if (!isAuthenticated) {
    return (
      <div >
        <LoadingSpinner />
      </div>)
  }

  if (loading) {
    return (
      <div >
        <LoadingSpinner />
        <PageShell content={main} page={'/dashboard-page'} />
      </div>)
  }

  return (
    <PageShell content={main} page={'/dashboard-page'} />
  );
}

export default DashboardPage;
