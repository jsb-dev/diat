import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { addDocNode, addEdge } from '../../../redux/slices/diagramEditorSlice';

const DiagramEditor: React.FC = () => {
    const dispatch = useDispatch();

    const handleAddDocument = () => {
        dispatch(addDocNode({ type: 'documentNode', x: 0, y: 0 }));
    };

    const handleConnect = () => {
        // Placeholder implementation
        dispatch(addEdge({ source: 'sourceNodeId', sourceHandle: 'sourceHandle', target: 'targetNodeId', targetHandle: 'targetHandle' }));
    };

    return (
        <ul style={{ listStyleType: 'none', position: 'absolute', bottom: '13rem', right: '2rem' }}>
            <li>
                <Button onClick={handleAddDocument} style={{ ...buttonStyle }}>Add Document</Button>
            </li>
            <li>
                <Button onClick={handleConnect} style={{ ...buttonStyle }}>Connect</Button>
            </li>
            <li>
                <Button style={{ ...buttonStyle }}>Add Image</Button>
            </li>
            <li>
                <Button style={{ ...buttonStyle }}>Add URL</Button>
            </li>
        </ul>
    );
};

const buttonStyle: React.CSSProperties = {
    borderRadius: '1rem',
    width: '6rem',
    height: '6rem',
    backgroundColor: '#c37ee0',
    color: '#fff',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
};

export default DiagramEditor;
