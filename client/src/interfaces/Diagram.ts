interface Node {
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

interface Edge {
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

interface Content {
  nodes: Node[];
  edges: Edge[];
}

interface Diagram {
  diagramId: string;
  content: Content;
}
