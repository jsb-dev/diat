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
import { useSelector } from 'react-redux';
import 'reactflow/dist/style.css';
import DocumentNode from './DocumentNode'
import { RootState } from '../../redux/store';
// import requestSaveDiagram

interface FlowProps {
    diagramNodes: Node[];
    diagramEdges: Edge[];
}

const nodeTypes = {
    documentNode: DocumentNode,
}

const Flow: React.FC<FlowProps> = ({ diagramNodes, diagramEdges }) => {
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const [nodes, setNodes] = useState<Node[]>(diagramNodes);
    const [edges, setEdges] = useState<Edge[]>(diagramEdges);

    const rfStyle: React.CSSProperties = {
        backgroundColor: 'rgb(100, 100, 100)',
        pointerEvents: editorIsOpen ? 'none' : 'auto',
    };

    // TESTING
    const requestSaveDiagram = (nodes: Node[], edges: Edge[]) => {
        console.log('requestSaveDiagram');
        console.log(nodes);
        console.log(edges);
    }
    /////////////////////////////////////////////////////////////////////////////

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
            style={rfStyle}

        />
    );
};

export default Flow;
