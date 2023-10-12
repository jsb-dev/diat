import React, { useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { initializeAuth, setAuthState } from '@/redux/slices/authSlice';
import { initializeDiagram, setDiagram, setDiagramInCache } from '@/redux/slices/flowSlice';
import { setUser } from '@/redux/slices/userSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../interfaces/User';
import { Node, Edge } from 'reactflow';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageShell from '@/components/shared/page-shell/PageShell';
import Flow from '@/components/diagram/Flow';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DashboardPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [diagramNodes, setDiagramNodes] = useState<Node[]>([]);
  const [diagramEdges, setDiagramEdges] = useState<Edge[]>([]);
  const { data: diagram } = useSelector((state: any) => state.diagram);
  const authState = useSelector((state: any) => state.auth);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [userCredentials, setUserCredentials] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      // If the data is already loading or if the user isn't authenticated, simply return.
      if (isLoading || !isAuthenticated) {
        return;
      }

      if (user?.email && !authState?.isAuthenticated) {
        const responseData = await getUserDetails(user.email);

        if (responseData) {
          const { user: fetchedUser, diagram: fetchedDiagram } = responseData;
          const diagramContent = fetchedDiagram?.content;
          setDiagramNodes(diagramContent.nodes);
          setDiagramEdges(diagramContent.edges);

          dispatch(setUser(fetchedUser));
          dispatch(setDiagram(diagramContent));
          dispatch(setDiagramInCache(diagramContent));
          dispatch(setAuthState({
            isAuthenticated: true,
            user: fetchedUser,
          }));

          setUserCredentials(fetchedUser);
          setLoading(false);
        }
      } else {
        // This condition handles the scenario when the user isn't authenticated
        dispatch(initializeAuth());
        dispatch(initializeDiagram());
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user, isAuthenticated, isLoading, authState?.isAuthenticated, diagram, dispatch]);

  const getUserDetails = async (email: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/get/credentials?email=${email}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching user details', await response.text());
        return null;
      }
    } catch (error) {
      console.error('Error fetching user details', error);
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
