import React, {
    useCallback,
    useState,
    useEffect,
} from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Node,
    Edge,
    Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
// import requestSaveDiagram

interface FlowProps {
    diagramNodes: Node[];
    diagramEdges: Edge[];
    nodeTypes: any;
}

const rfStyle = {
    backgroundColor: 'rgb(100, 100, 100)',
};

const Flow: React.FC<FlowProps> = ({ diagramNodes, diagramEdges, nodeTypes }) => {
    const [nodes, setNodes] = useState<Node[]>(diagramNodes);
    const [edges, setEdges] = useState<Edge[]>(diagramEdges);

    // TESTING
    const requestSaveDiagram = (nodes: Node[], edges: Edge[]) => {
        console.log('requestSaveDiagram');
        console.log(nodes);
        console.log(edges);
    }

    const onNodesChange = useCallback(
        (changes: any) => {
            const updatedNodes = applyNodeChanges(changes, nodes);
            setNodes(updatedNodes);
        },
        [nodes]
    );

    const onEdgesChange = useCallback(
        (changes: any) => {
            const updatedEdges = applyEdgeChanges(changes, edges);
            setEdges(updatedEdges);
        },
        [edges]
    );

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds) => {
                const newEdges = addEdge(connection, eds);
                requestSaveDiagram(nodes, newEdges);
                return newEdges;
            });
        },
        [nodes]
    );

    useEffect(() => {
        const interval = setInterval(() => {
            requestSaveDiagram(nodes, edges);
        }, 5000);

        return () => clearInterval(interval);
    }, [nodes, edges]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView={true}
            style={rfStyle}
        />
    );
};

export default Flow;
