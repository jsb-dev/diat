export interface Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    [key: string]: any;
  };
}

export interface Edge {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  id: string;
  deletable: boolean;
  focusable: boolean;
  style: {
    [key: string]: any;
  }
}

export interface Content {
  nodes: Node[];
  edges: Edge[];
}

export interface Diagram {
  diagramId: string;
  content: Content;
}
