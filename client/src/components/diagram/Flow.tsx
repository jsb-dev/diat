import React, {
    useCallback,
    useState,
    useEffect,
    useRef,
    ComponentType,
} from 'react';
import ReactFlow, { ReactFlowProvider, useStoreApi } from 'reactflow';
import {
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
import DocumentNode from './nodes/DocumentNode'
import ImgNode from './nodes/ImgNode';
import UrlNode from './nodes/UrlNode';
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

const rfStyle: React.CSSProperties = {
    backgroundColor: 'rgb(70, 70, 70)',
    padding: 0,
    margin: 0,
};

const Flow: React.FC<FlowProps> = ({ diagramNodes, diagramEdges }) => {
    const user = useSelector(selectUser);
    const editorIsOpen = useSelector((state: RootState) => state.editor.editorIsOpen);
    const prevEditorIsOpen = useRef(editorIsOpen);
    const diagramEditorState = useSelector((state: RootState) => state.diagramEditor);
    const tiptapState = useSelector((state: RootState) => state.editor);
    const [nodes, setNodes] = useState<Node[]>(diagramNodes);
    const [edges, setEdges] = useState<Edge[]>(diagramEdges);
    const [nodeChanges, setNodeChanges] = useState<string[]>([]);
    const [edgeChanges, setEdgeChanges] = useState<string[]>([]);
    const [deletedNodes, setDeletedNodes] = useState<Node[]>([]);
    const [deletedEdges, setDeletedEdges] = useState<Edge[]>([]);
    const [lastActionProcessed, setLastActionProcessed] = useState<string | null>(null);
    const [diagramEdited, setDiagramEdited] = useState<boolean>(false);
    const [centerCoordinates, setCenterCoordinates] = useState<number[]>([0, 0]);
    const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
    const [panOnDrag, setPanOnDrag] = useState<boolean>(true);

    const dispatch = useDispatch();
    const store = useStoreApi();

    ////////////////////////////// NODE FOCUSING //////////////////////////////
    useEffect(() => {
        if (prevEditorIsOpen.current === true && !editorIsOpen) {
            setFocusedNodeId(null);

            const updatedNodes = nodes.map((n) => {
                return { ...n, className: '' };
            });

            setNodes(updatedNodes);

            // Allow panning as soon as the editor is closed
            setPanOnDrag(true);
        }

        prevEditorIsOpen.current = editorIsOpen;
    }, [editorIsOpen, nodes]);

    ////////////////////////////// CENTER COORDS //////////////////////////////
    const calculateCenterCoords = useCallback(() => {
        const {
            height,
            width,
            transform: [transformX, transformY, zoomLevel]
        } = store.getState();
        const zoomMultiplier = 1 / zoomLevel;

        const centerX = (-transformX * zoomMultiplier + (width * zoomMultiplier) / 2) - (width / 2);
        const centerY =
            (-transformY * zoomMultiplier + (height * zoomMultiplier) / 2) - (height / 2);

        return { centerX, centerY };
    }, [store]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const { centerX, centerY } = calculateCenterCoords();
            setCenterCoordinates([centerX, centerY]);
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    ////////////////////////////// SAVE DIAGRAM ON UPDATE //////////////////////////////
    useEffect(() => {
        const saveUserDiagram = async (changedNodes: Node[], changedEdges: Edge[]) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/post/diagram`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        diagramId: user.diagramId,
                        changedNodes,
                        changedEdges,
                    }),
                });

                if (response.ok) {
                    console.log('Diagram saved successfully');
                    setNodeChanges([]);
                    setEdgeChanges([]);
                } else {
                    console.error('Error saving diagram:', response.statusText);
                }
            } catch (error) {
                console.error('Error saving diagram:', error);
            }
        };

        const handleDiagramSave = async () => {
            let changedNodes: Node[] = [];
            let changedEdges: Edge[] = [];

            if (nodeChanges.length > 0) {
                changedNodes = nodes.filter((node: { data: { id: string; }; }) => nodeChanges.includes(node.data.id));
            }
            if (edgeChanges.length > 0) {
                changedEdges = edges.filter((edge: { id: string; }) => edgeChanges.includes(edge.id));
            }

            if (changedNodes.length > 0 || changedEdges.length > 0) {
                saveUserDiagram(changedNodes, changedEdges);
                dispatch(setUser({ ...user, diagram: { nodes, edges } }));
                setDiagramEdited(false);
            }
        };

        const deleteDiagramElements = async (nodesToDelete: string[], edgesToDelete: string[]) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete/diagram`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        diagramId: user.diagramId,
                        nodesToDelete,
                        edgesToDelete,
                    }),
                });

                if (response.ok) {
                    console.log('Diagram elements deleted successfully');
                    setDeletedNodes([]);
                    setDeletedEdges([]);
                } else {
                    console.error('Error deleting diagram elements:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting diagram elements:', error);
            }
        };

        const handleDiagramDelete = async () => {
            let nodesToDelete: string[] = [];
            let edgesToDelete: string[] = [];

            if (deletedNodes.length > 0) {
                nodesToDelete = deletedNodes.map(node => node.data.id);
            }

            if (deletedEdges.length > 0) {
                edgesToDelete = deletedEdges.map(edge => edge.id);
            }

            if (nodesToDelete.length > 0 || edgesToDelete.length > 0) {
                deleteDiagramElements(nodesToDelete, edgesToDelete);
            }
        };

        if (deletedNodes.length > 0 || deletedEdges.length > 0) {
            const timer = setTimeout(() => {
                console.log('Deleting diagram elements...')
                handleDiagramDelete();
            }, 1000);

            return () => clearTimeout(timer);
        }

        if (diagramEdited) {
            const timer = setTimeout(() => {
                console.log('Saving diagram...')
                handleDiagramSave();
            }, 1000);

            return () => clearTimeout(timer);
        }

    }, [deletedEdges, deletedNodes, diagramEdited, dispatch, edgeChanges, edges, nodeChanges, nodes, user]);

    ///////////////////////// DETECT CHANGES IN NODES AND EDGES (AND TIPTAP IN REAL TIME) /////////////////////////

    useEffect(() => {
        const handleUpdateNodeDocument = (actionPayload: { id: string; content: any }) => {
            const { id, content } = actionPayload;

            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, content } } : node
                )
            );

            setNodeChanges([...nodeChanges, id]);
            setDiagramEdited(true);

        };

        tiptapState.documentUpdates.forEach(update => {
            handleUpdateNodeDocument(update);
            dispatch(removeProcessedDocUpdate(update.id));
        });
    }, [tiptapState.documentUpdates, dispatch, nodeChanges]);

    const onNodesChange = useCallback(
        (changes: any) => {

            const updatedNodes = applyNodeChanges(changes, nodes);
            setNodes(updatedNodes);

            const changedNodeIds = changes.map((change: { id: string }) => change.id);
            setNodeChanges(prev => {
                const mergedArray = [...prev, ...changedNodeIds];
                return mergedArray.filter((value, index, self) => self.indexOf(value) === index);
            });

            setDiagramEdited(true);
        },
        [nodes]
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
                setEdges(newEdges);
                setEdgeChanges([...edgeChanges, newEdge.id]);
                setDiagramEdited(true);
                return newEdges;
            });

        },
        [edgeChanges]
    );

    ////////////////////////////// EDITING ACTIONS //////////////////////////////

    const addDocNode = useCallback((type: string) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: centerCoordinates[0],
                y: centerCoordinates[1]
            },
            data: {
                id,
                content: {
                    content: [{ type: 'heading', content: [{ type: 'text', text: 'Document Name' }] }],
                    type: 'doc',
                },
                position: {
                    x: centerCoordinates[0],
                    y: centerCoordinates[1]
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
        , [centerCoordinates, nodes, dispatch, edges]);

    const addImgNode = useCallback((type: string, asset: any,) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: centerCoordinates[0],
                y: centerCoordinates[1]
            },
            data: {
                id,
                content: {
                    asset: asset,
                },
                position: {
                    x: centerCoordinates[0],
                    y: centerCoordinates[1]
                },
                nodeType: type,
            },
        };
        setNodes([...nodes, newNode]);
        dispatch(setDiagram({ nodes: [...nodes, newNode], edges }));
    }
        , [centerCoordinates, nodes, dispatch, edges]);

    // NOTE: addUrlNode isn't identical to addImgNode, asset is a string here
    const addUrlNode = useCallback((type: string, asset: string) => {
        const id = uuid();
        const newNode: Node = {
            id: id,
            type,
            position: {
                x: centerCoordinates[0],
                y: centerCoordinates[1]
            },
            data: {
                id,
                content: {
                    asset: asset,
                    position: {
                        x: centerCoordinates[0],
                        y: centerCoordinates[1]
                    },
                },
                nodeType: type,
            },
        };
        setNodes([...nodes, newNode]);
        dispatch(setDiagram({ nodes: [...nodes, newNode], edges }));
    }
        , [centerCoordinates, nodes, dispatch, edges]);

    const deleteNode = useCallback((nodeId: string) => {

        const deletedNode = nodes.find((node) => node.id === nodeId);
        if (!deletedNode) {
            deletedNodes.filter((node) => node.id !== nodeId);
            return;
        }

        if (deletedNode) {
            setDeletedNodes([...deletedNodes, deletedNode]);

            edges.forEach((edge) => {
                if (edge.source === nodeId || edge.target === nodeId) {
                    setDeletedEdges([...deletedEdges, edge])
                }
            });
        } else {
            console.log('node not found, available nodes are', nodes);
        }

        const newNodes = nodes.filter((node) => node.id !== nodeId);
        const newEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
        setNodes(newNodes);
        setEdges(newEdges);
        dispatch(setDiagram({ nodes: newNodes, edges: newEdges }));
    }, [edges, nodes, dispatch, deletedEdges, deletedNodes]);

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

    ////////////////////////////// EDITING ACTION HANDLERS //////////////////////////////

    const handleAddDocNode = useCallback((type: string, x: number, y: number, action: string) => {
        if (lastActionProcessed !== action) {
            addDocNode(type);
            setLastActionProcessed(action);
        } else {
            addDocNode(type);
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
            addImgNode(type, asset);
            setLastActionProcessed(action);
        } else {
            addImgNode(type, asset);
            dispatch(clearDiagramEditorState());
        }
    }, [addImgNode, lastActionProcessed, dispatch]);

    const handleAddUrlNode = useCallback((type: string, asset: string, x: number, y: number, action: string) => {
        if (lastActionProcessed !== action) {
            addUrlNode(type, asset);
            setLastActionProcessed(action);
        } else {
            addUrlNode(type, asset);
            dispatch(clearDiagramEditorState());
        }
    }, [addUrlNode, dispatch, lastActionProcessed]);

    const handleDeleteNode = useCallback((nodeId: string, action: string) => {
        if (lastActionProcessed !== action) {
            deleteNode(nodeId);
            setLastActionProcessed(action);
        } else {
            deleteNode(nodeId);
            dispatch(clearDiagramEditorState());
        }
    }, [deleteNode, lastActionProcessed, dispatch]);

    const handleNodeClick = useCallback((id: string) => {
        setFocusedNode(id);

        // Allows each document to be dragged after the editor has 
        // been opened before locking it on editor focus for better UX
        if (editorIsOpen) {
            const updatedNodes = nodes.map((n) => {
                if (n.id === id) {
                    return { ...n, draggable: false };
                }
                // allow panning until the user starts editing
                setPanOnDrag(false);
                return n;
            });

            // We don't need to dispatch the diagram state here because
            // there's no need to save changes to draggable property in the backend or store
            setNodes(updatedNodes);
        } else {
            const updatedNodes = nodes.map((n) => {
                if (n.id === id) {
                    return { ...n, draggable: true };
                }

                return n;
            });

            setNodes(updatedNodes);
        }
    }, [editorIsOpen, nodes]);

    ////////////////////////////// ACTION SWITCH CASE //////////////////////////////

    useEffect(() => {
        const { action, payload } = diagramEditorState;

        switch (action) {
            case 'addDocNode':
                const { type, x, y }: { type: string; x: number; y: number } = payload;
                handleAddDocNode(type, x, y, action);
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
            case 'deleteNode':
                handleDeleteNode(payload.nodeId, action);
                break;
            default:
                break;
        }
    }, [addEdge, addDocNode, addImgNode, addUrlNode, diagramEditorState, lastActionProcessed, handleAddDocNode, handleAddEdge, handleAddImgNode, handleAddUrlNode, handleDeleteNode]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeDoubleClick={
                (event, node) => {
                    if (focusedNodeId === node.id) {
                        setFocusedNodeId(null);
                        const updatedNodes = nodes.map(n => {
                            if (n.id === node.id) {
                                return { ...n, className: '' };
                            }
                            return n;
                        });

                        setNodes(updatedNodes);
                    }

                    else {
                        setFocusedNodeId(node.id);

                        const updatedNodes = nodes.map(n => {
                            if (n.id === node.id) {
                                return { ...n, className: 'focused-node', draggable: editorIsOpen ? false : n.draggable };
                            } else if (n.className === 'focused-node') {
                                return { ...n, className: '' };
                            }
                            return n;
                        });

                        setNodes(updatedNodes);
                    }
                }
            }
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            style={rfStyle}
            nodesDraggable={!editorIsOpen}
            nodesFocusable={!editorIsOpen}
            panOnDrag={
                panOnDrag
            }
            onNodeClick={
                (event, node) => {
                    handleNodeClick(node.id);
                }
            }
            onEdgeClick={
                (event, edge) => {
                    const updatedEdge = {
                        ...edge,
                        sourceHandle: null,
                        targetHandle: null,
                    };

                    const updatedEdges = edges.filter((e) => e.id !== edge.id);
                    setEdges(updatedEdges);
                    dispatch(setDiagram({ nodes, edges: updatedEdges }));

                    setDeletedEdges([...deletedEdges, updatedEdge]);
                    setDiagramEdited(true);
                }
            }
            id='Flow'
        />

    );
};

const FlowWrapper: React.FC<FlowProps> = ({ diagramNodes, diagramEdges }) => {
    return (
        <ReactFlowProvider
        >
            <Flow diagramNodes={diagramNodes} diagramEdges={diagramEdges} />
        </ReactFlowProvider>
    );
};

export default FlowWrapper;