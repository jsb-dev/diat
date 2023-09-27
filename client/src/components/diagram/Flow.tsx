import React, {
    useCallback,
    useState,
    useEffect,
} from 'react';
import ReactFlow from 'reactflow'
import {
    applyEdgeChanges,
    applyNodeChanges,
    Node,
    Edge,
    Connection,
    NodeTypes,
    NodeProps,
} from '@reactflow/core';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setDiagram } from '../../redux/slices/flowSlice';
import DocumentNode from './DocumentNode'
import 'reactflow/dist/style.css';

interface FlowProps {
    diagramNodes: Node[];
    diagramEdges: Edge[];
}

const nodeTypes: NodeTypes = {
    documentNode: DocumentNode as React.ComponentType<NodeProps>,
};

const Flow: React.FC<FlowProps> = ({ diagramNodes, diagramEdges }) => {
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const diagramEditorState = useSelector((state: RootState) => state.diagramEditor);
    const [nodes, setNodes] = useState<Node[]>(diagramNodes);
    const [edges, setEdges] = useState<Edge[]>(diagramEdges);
    const [focusedNode, setFocusedNode] = useState<string | null>(null);

    const dispatch = useDispatch();

    ///////////////////////////////////////////////////////////////////////////// TESTING 
    const requestSaveDiagram = useCallback((nodes: Node[], edges: Edge[]) => {
        console.log('requestSaveDiagram TEST');
        console.log(nodes);
        console.log(edges);

        // implement db save here
    }, []);
    /////////////////////////////////////////////////////////////////////////////

    // Save diagram every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            requestSaveDiagram(nodes, edges);
        }, 5000);

        return () => clearInterval(interval);
    }, [nodes, edges, requestSaveDiagram]);

    const addNode = useCallback((type: string, x: number, y: number) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: x,
                y: y
            },
            data: {
                content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
                type: 'doc',
            },
            draggable: true,
            selectable: true,
            connectable: true,
            style: {},
        };
        setNodes([...nodes, newNode]);
        dispatch(setDiagram({ nodes: [...nodes, newNode], edges }));
    }
        , [nodes, edges, dispatch]);


    const addEdge = useCallback((source: string, sourceHandle: string, target: string, targetHandle: string) => {
        const newEdge = {
            id: uuid(),
            source,
            sourceHandle,
            target,
            targetHandle,
        };
        setEdges([...edges, newEdge]);
        dispatch(setDiagram({ nodes, edges: [...edges, newEdge] }));
    }
        , [nodes, edges, dispatch]);


    useEffect(() => {
        const { action, payload } = diagramEditorState;

        console.log('nodes', nodes);

        if (action === 'addNode') {
            const { type, x, y } = payload;
            addNode(type, x, y);
        }

        if (action === 'addEdge') {
            const { source, sourceHandle, target, targetHandle } = payload;
            addEdge(source, sourceHandle, target, targetHandle);
        }

        // Additional logic as needed

    }, [diagramEditorState, addEdge, addNode]);


    const rfStyle: React.CSSProperties = {
        backgroundColor: 'rgb(100, 100, 100)',
        pointerEvents: editorIsOpen ? 'none' : 'auto',
    };

    const handleNodeClick = useCallback((id: string) => {
        setFocusedNode(id);

        console.log('handleNodeClick', id, editorIsOpen)

        if (editorIsOpen) {
            const updatedNodes = nodes.map((n) => {
                if (n.id === id) {
                    return { ...n, draggable: false, selectable: false, connectable: false };
                }
                return n;
            });

            setNodes(updatedNodes);
            dispatch(setDiagram({ nodes: updatedNodes, edges }));
        }


    }, [editorIsOpen, nodes, edges, dispatch]);

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
            setEdges((prevEdges: Edge[]) => {
                if (
                    connection.source === null ||
                    connection.sourceHandle === null ||
                    connection.target === null ||
                    connection.targetHandle === null
                ) {
                    console.error("Incomplete edge information. Not creating new edge.");
                    return prevEdges;
                }

                const newEdge: Edge = {
                    id: uuid(),
                    source: connection.source,
                    sourceHandle: connection.sourceHandle,
                    target: connection.target,
                    targetHandle: connection.targetHandle,
                };

                const newEdges: Edge[] = [...prevEdges, newEdge];
                requestSaveDiagram(nodes, newEdges);
                return newEdges;
            });
        },
        [nodes, requestSaveDiagram]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            style={rfStyle}
            onNodeClick={
                (event, node) => {
                    handleNodeClick(node.id);
                }
            }
            nodesDraggable={editorIsOpen ? false : true}
            panOnDrag={editorIsOpen ? false : true}
        />
    );
};

export default Flow;
