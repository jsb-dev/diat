import { Diagram } from './Diagram';

export interface User {
  email: string;
  userId: string;
  diagramId: string;
  diagram: Diagram;
  authState: {
    isAuthenticated: boolean;
    user: {
      email: string;
      userId: string;
    };
  };
}
