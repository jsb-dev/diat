import React, { useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { initializeAuth, setAuthState } from '@/redux/slices/authSlice';
import { initializeDiagram, setDiagram, setDiagramInCache } from '@/redux/slices/diagramSlice';
import { setUser } from '@/redux/slices/userSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { Diagram } from '../interfaces/Diagram';
import { User } from '../interfaces/User';
import AuthToggle from '@/components/auth/AuthToggle';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageShell from '@/components/shared/PageShell';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const DashboardPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: diagram } = useSelector((state: any) => state.diagram);
  const authState = useSelector((state: any) => state.auth);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [userCredentials, setUserCredentials] = useState<User | null>(null);

  // TESTING
  const simulateStateUpdate = () => {
    const simulatedUser: User = {
      email: 'simulated@example.com',
      userId: 'simulatedId',
      diagramId: 'simulatedDiagramId',
      diagram: {
        nodes: [{ id: 'node1', type: 'testNode', position: { x: 100, y: 100 }, data: { content: 'Hello World' } }],
        edges: [{ source: 'sourceEdge', sourceHandle: 'top', target: 'targetEdge', targetHandle: 'bottom', id: 'edge1', deletable: true, focusable: true, style: { stroke: 'black' } }],
      },
      authState: {
        isAuthenticated: true,
        user: { email: 'HAHAHAHAHAHAHAHAHA', userId: 'HAHAHAHAHAHAHAHAHA' },
      },
    };

    dispatch(setUser(simulatedUser));
  };

  useEffect(() => {
    console.log('Updated authState:', authState);
    console.log('Updated diagram:', diagram);
  }, [authState, diagram]);

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

            console.log('userData', userData)

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
    <main>
      <h1>Dashboard</h1>
      <section>
        <h2>User</h2>
        <AuthToggle />
        <ul>
          <li>isAuthenticated: {JSON.stringify(isAuthenticated, null, 2)}</li>
          <li>user: {JSON.stringify(user, null, 2)}</li>
          <li>authState: {JSON.stringify(authState, null, 2)}</li>
          <li>diagram: {JSON.stringify(diagram, null, 2)}</li>
          <li>userCredentials: {JSON.stringify(userCredentials, null, 2)}</li>
        </ul>
        {/* TESTING */}
        <button onClick={simulateStateUpdate}>Simulate User State Update</button>
      </section>
    </main>

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (!isAuthenticated) {
    return (
      <div style={containerStyles}>
        <LoadingSpinner />
      </div>)
  }

  if (loading) {
    return (
      <div style={containerStyles}>
        <LoadingSpinner />
        <PageShell content={main} />
      </div>)
  }

  return (
    <div style={containerStyles}>
      <PageShell content={main} />
    </div>
  );
}

export default DashboardPage;
