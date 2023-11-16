import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setAuthState } from '@/redux/slices/authSlice';
import { setDiagram, setDiagramInCache } from '@/redux/slices/flowSlice';
import { setUser, getCachedAuthState, getCachedUserCredentials } from '@/redux/slices/userSlice';
import { updateLayout } from "@/redux/slices/uiSlice";
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '@/interfaces/User';
import { Node, Edge } from 'reactflow';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageShell from '@/components/shared/page-shell/PageShell';
import Container from '@mui/material/Container';
import Flow from '@/components/diagram/Flow';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DashboardPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [diagramNodes, setDiagramNodes] = useState<Node[]>([]);
  const [diagramEdges, setDiagramEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCredentials] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const diagram = useSelector((state: any) => state.diagram.data);
  const authState = useSelector((state: any) => state.auth);
  const { isAuthenticated, user, isLoading: auth0Loading } = useAuth0();

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateLayout({ innerWidth: window.innerWidth, innerHeight: window.innerHeight }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth0Loading) {
      return;
    }

    const initializeFromCache = async () => {
      const cachedUserCredentials = await getCachedUserCredentials();
      const cachedAuthState = getCachedAuthState();
      const cachedDiagram = cachedUserCredentials?.diagram;

      if (cachedUserCredentials) {
        dispatch(setUser(cachedUserCredentials));
      }

      if (cachedAuthState) {
        dispatch(setAuthState(cachedAuthState));
      }

      if (cachedDiagram) {
        setDiagramNodes(cachedDiagram.nodes);
        setDiagramEdges(cachedDiagram.edges);
      }
    };

    const fetchAndUpdateDetails = async () => {
      if (user?.email && isAuthenticated) {
        if (!loggedIn) {
          try {
            const responseData = await getUserDetails(user.email);
            if (!responseData) {
              console.log("No response data.");
              return;
            }

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
            setLoading(false);
          } catch (e) {
            console.error('Error fetching user details', e);
          }
        }
      }
    };

    initializeFromCache();
    fetchAndUpdateDetails();
    setLoggedIn(isAuthenticated);

    if (!loading) {
      return;
    }

  }, [isAuthenticated, auth0Loading, user, authState.isAuthenticated, diagram, dispatch, loading, userCredentials, loggedIn]);

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

  const main = loading ? (
    <Container component="main" className='primary-section' id='FlowContainer'>
      <LoadingSpinner />
      <Flow diagramNodes={diagramNodes} diagramEdges={diagramEdges} />
    </Container>
  ) : (
    <Container component="main" className='primary-section' id='FlowContainer'>
      <Flow diagramNodes={diagramNodes} diagramEdges={diagramEdges} />
    </Container>
  );

  return <PageShell content={main} page={'/dashboard-page'} />;
};

export default DashboardPage;
