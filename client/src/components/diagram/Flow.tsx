import React, {
    useCallback,
    useState,
    useEffect,
    ComponentType,
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
import { clearDiagramEditorState } from '../../redux/slices/diagramEditorSlice';
import DocumentNode from './DocumentNode'
import ImgNode from './ImgNode';
import UrlNode from './UrlNode';
import 'reactflow/dist/style.css';

interface FlowProps {
    diagramNodes: Node[];
    diagramEdges: Edge[];
}

const nodeTypes: NodeTypes = {
    documentNode: DocumentNode as ComponentType<NodeProps>,
    imgNode: ImgNode as ComponentType<NodeProps>,
    urlNode: UrlNode as ComponentType<NodeProps>,
};

const Flow: React.FC<FlowProps> = ({ diagramNodes, diagramEdges }) => {
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const diagramEditorState = useSelector((state: RootState) => state.diagramEditor);
    const [nodes, setNodes] = useState<Node[]>(diagramNodes);
    const [edges, setEdges] = useState<Edge[]>(diagramEdges);
    const [focusedNode, setFocusedNode] = useState<string | null>(null);
    const [lastActionProcessed, setLastActionProcessed] = useState<string | null>(null);

    const dispatch = useDispatch();


    const rfStyle: React.CSSProperties = {
        backgroundColor: 'rgb(100, 100, 100)',
    };

    const requestSaveDiagram = useCallback((nodes: Node[], edges: Edge[]) => {
        // placeholder implementation
    }, []);

    // Save diagram every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            requestSaveDiagram(nodes, edges);
        }, 5000);

        return () => clearInterval(interval);
    }, [nodes, edges, requestSaveDiagram]);

    const addDocNode = useCallback((type: string, x: number, y: number) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: x,
                y: y
            },
            data: {
                content: {
                    // NOTE: The payload goes inside data.content, hence the repetition of 'content' fields here 
                    // to accommodate the TipTap mapping structure defined in DocumentNode.tsx
                    id,
                    content: [{ type: 'heading', content: [{ type: 'text', text: 'Document Name' }] }],
                    type: 'doc',
                    position: {
                        x: x,
                        y: y
                    },
                    nodeType: 'documentNode',
                }
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

    const addImgNode = useCallback((type: string, asset: any, x: number, y: number) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: x,
                y: y
            },
            data: {
                content: {
                    id,
                    asset: asset,
                    position: {
                        x: x,
                        y: y
                    },
                    nodeType: type,
                }
            },
        };
        setNodes([...nodes, newNode]);
        dispatch(setDiagram({ nodes: [...nodes, newNode], edges }));
    }
        , [nodes, edges, dispatch]);


    // NOTE: addUrlNode isn't identical to addImgNode, asset is a string here
    const addUrlNode = useCallback((type: string, asset: string, x: number, y: number) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: x,
                y: y
            },
            data: {
                content: {
                    id,
                    asset: asset,
                    position: {
                        x: x,
                        y: y
                    },
                    nodeType: type,
                }
            },
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

    const handleAddDocNode = useCallback((type: string, x: number, y: number, action: string) => {
        if (lastActionProcessed !== action) {
            addDocNode(type, x, y);
            setLastActionProcessed(action);
        } else {
            addDocNode(type, x, y);
            dispatch(clearDiagramEditorState());
        }
    }, [addDocNode, dispatch, lastActionProcessed]);

    const handleAddEdge = useCallback((source: string, sourceHandle: string, target: string, targetHandle: string, action: string) => {
        if (lastActionProcessed !== action) {
            addEdge(source, sourceHandle, target, targetHandle);
            setLastActionProcessed(action);
        } else {
            addEdge(source, sourceHandle, target, targetHandle);
            dispatch(clearDiagramEditorState());
        }
    }, [addEdge, dispatch, lastActionProcessed]);

    const handleAddImgNode = useCallback((type: string, asset: string, x: number, y: number, action: string) => {
        if (lastActionProcessed !== action) {
            addImgNode(type, asset, x, y);
            setLastActionProcessed(action);
        } else {
            addImgNode(type, asset, x, y);
            dispatch(clearDiagramEditorState());
        }
    }, [addImgNode, lastActionProcessed, dispatch]);

    const handleAddUrlNode = useCallback((type: string, asset: string, x: number, y: number, action: string) => {
        if (lastActionProcessed !== action) {
            addUrlNode(type, asset, x, y);
            setLastActionProcessed(action);
        } else {
            addUrlNode(type, asset, x, y);
            dispatch(clearDiagramEditorState());
        }
    }, [addUrlNode, dispatch, lastActionProcessed]);


    useEffect(() => {
        const { action, payload } = diagramEditorState;

        switch (action) {
            case 'addDocNode':
                const { type, x, y }: { type: string; x: number; y: number } = payload;
                handleAddDocNode(type, x, y, action);
                break;
            case 'addEdge':
                const { source, sourceHandle, target, targetHandle }: {
                    source: string;
                    sourceHandle: string;
                    target: string;
                    targetHandle: string;
                } = payload;
                handleAddEdge(source, sourceHandle, target, targetHandle, action);
                break;
            case 'addImgNode':
                const { type: imgType, asset, x: imgX, y: imgY }: {
                    type: string;
                    asset: string;
                    x: number;
                    y: number;
                } = payload;
                handleAddImgNode(imgType, asset, imgX, imgY, action);
                break;
            case 'addUrlNode':
                const { type: urlType, asset: urlAsset, x: urlX, y: urlY }: {
                    type: string;
                    asset: string;
                    x: number;
                    y: number;
                } = payload;
                handleAddUrlNode(urlType, urlAsset, urlX, urlY, action);
                break;
            default:
                break;
        }

    }, [addEdge, addDocNode, addImgNode, addUrlNode, diagramEditorState, lastActionProcessed, handleAddDocNode, handleAddEdge, handleAddImgNode, handleAddUrlNode]);

    const handleNodeClick = useCallback((id: string) => {
        setFocusedNode(id);

        // dispatch the focused node id to the store

    }, []);

    const onNodesChange = useCallback(
        (changes: any) => {
            const updatedNodes = applyNodeChanges(changes, nodes);
            setNodes(updatedNodes);
            console.log(nodes);
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
            className='flow'
        />
    );
};

export default Flow;