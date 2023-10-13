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
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setDiagram } from '@/redux/slices/flowSlice';
import { clearDiagramEditorState, setFocusedNode } from '@/redux/slices/diagramEditorSlice';
import { removeProcessedDocUpdate } from '@/redux/slices/tiptapSlice';
import { selectUser, setUser } from '@/redux/slices/userSlice';
import DocumentNode from './DocumentNode'
import ImgNode from './ImgNode';
import UrlNode from './UrlNode';
import 'reactflow/dist/style.css';
import { Diagram } from '@/interfaces/Diagram';

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
    const user = useSelector(selectUser);
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const diagramEditorState = useSelector((state: RootState) => state.diagramEditor);
    const tiptapState = useSelector((state: RootState) => state.editor);
    const [nodes, setNodes] = useState<Node[]>(diagramNodes);
    const [edges, setEdges] = useState<Edge[]>(diagramEdges);
    const [nodeChanges, setNodeChanges] = useState<string[]>([]);
    const [lastActionProcessed, setLastActionProcessed] = useState<string | null>(null);
    const [diagramUpdated, setDiagramUpdated] = useState(false);

    const dispatch = useDispatch();

    const rfStyle: React.CSSProperties = {
        backgroundColor: 'rgb(100, 100, 100)',
    };

    ////////////////////////////// SAVE DIAGRAM ON UPDATE //////////////////////////////
    const saveUserDiagram = useCallback(async () => {
        if (!diagramUpdated || nodeChanges.length === 0) {
            return;
        }

        const changedNodes = nodes.filter(node => nodeChanges.includes(node.data.id));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/post/diagram`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    diagramId: user.diagramId,
                    changedNodes,
                })
            });

            setNodeChanges([]);

            if (response.ok) {
                dispatch(setUser({ ...user, diagram: { nodes, edges } }));
                setDiagramUpdated(false);
                return;
            } else {
                console.error('Error saving diagram:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving diagram:', error);
        }
    }, [diagramUpdated, dispatch, edges, nodeChanges, nodes, user]);

    useEffect(() => {
        tiptapState.documentUpdates.forEach(update => {
            handleUpdateNodeDocument(update);
            dispatch(removeProcessedDocUpdate(update.id));
        });
    }, [tiptapState.documentUpdates, dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            saveUserDiagram();
        }, 1000);

        return () => clearInterval(interval);
    }, [nodes, edges, saveUserDiagram]);

    const onNodesChange = useCallback(
        (changes: any) => {
            const updatedNodes = applyNodeChanges(changes, nodes);
            setNodes(updatedNodes);

            const changedNodeIds = changes.map((change: { id: string }) => change.id);
            setNodeChanges(prev => {
                const mergedArray = [...prev, ...changedNodeIds];
                return mergedArray.filter((value, index, self) => self.indexOf(value) === index);
            });

            setDiagramUpdated(true);
        },
        [nodes]
    );


    const onEdgesChange = useCallback(
        (changes: any) => {
            const updatedEdges = applyEdgeChanges(changes, edges);
            setEdges(updatedEdges);
            setDiagramUpdated(true);
            console.log('edges changed', user.diagram);
        },
        [edges, user]
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
                saveUserDiagram();
                return newEdges;
            });
        },
        [saveUserDiagram]
    );

    ////////////////////////////// ACTIONS //////////////////////////////

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
                id,
                content: {
                    content: [{ type: 'heading', content: [{ type: 'text', text: 'Document Name' }] }],
                    type: 'doc',
                },
                position: {
                    x: x,
                    y: y
                },
                nodeType: 'documentNode',
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
                id,
                content: {
                    asset: asset,
                },
                position: {
                    x: x,
                    y: y
                },
                nodeType: type,
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

    ////////////////////////////// ACTION HANDLERS //////////////////////////////

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

    const handleUpdateNodeDocument = (actionPayload: { id: string; content: any }) => {
        const { id, content } = actionPayload;

        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, content } } : node
            )
        );
        setDiagramUpdated(true);
    };

    const handleNodeClick = useCallback((id: string) => {
        setFocusedNode(id);
        if (editorIsOpen) {
            const updatedNodes = nodes.map((n) => {
                if (n.id === id) {
                    return { ...n, draggable: false };
                }
                return n;
            });

            setNodes(updatedNodes);
            dispatch(setDiagram({ nodes: updatedNodes, edges }));
        } else {
            const updatedNodes = nodes.map((n) => {
                if (n.id === id) {
                    return { ...n, draggable: true };
                }
                return n;
            });

            setNodes(updatedNodes);
            dispatch(setDiagram({ nodes: updatedNodes, edges }));
        }
    }, [editorIsOpen, nodes, edges, dispatch]);

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

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            style={rfStyle}
            nodesDraggable={!editorIsOpen}
            panOnDrag={!editorIsOpen}
            onNodeClick={
                (event, node) => {
                    handleNodeClick(node.id);
                }
            }
            className='Flow'
        />
    );
};

export default Flow;