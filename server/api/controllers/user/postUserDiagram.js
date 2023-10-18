import Diagram from '../../../database/models/Diagram.js';

const handleNodes = async (existingNodes, changedNodes) => {
  const existingNodesMap = new Map(
    existingNodes.map((node) => [node.data.id, node])
  );

  const mergedNodes = changedNodes.reduce((acc, changedNode) => {
    acc.push(changedNode);
    existingNodesMap.delete(changedNode.data.id);
    return acc;
  }, []);

  return [...mergedNodes, ...existingNodesMap.values()];
};

const handleEdges = async (existingEdges, changedEdges) => {
  const existingEdgesMap = new Map(
    existingEdges.map((edge) => [edge.id, edge])
  );

  const mergedEdges = changedEdges.reduce((acc, changedEdge) => {
    acc.push(changedEdge);
    existingEdgesMap.delete(changedEdge.id);
    return acc;
  }, []);

  return [...mergedEdges, ...existingEdgesMap.values()];
};

const updateUserDiagram = async (req, res) => {
  const { diagramId, changedNodes, changedEdges } = req.body;

  try {
    const userDiagram = await Diagram.findOne({ _id: diagramId });

    if (!userDiagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }

    const [newNodes, newEdges] = await Promise.all([
      handleNodes(userDiagram.content.nodes, changedNodes),
      handleEdges(userDiagram.content.edges, changedEdges),
    ]);

    userDiagram.content.nodes = newNodes;
    userDiagram.content.edges = newEdges;

    await userDiagram.save();

    res.status(200).json({ message: 'Diagram updated' });
    console.log('Diagram updated');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
    console.log('error', error);
    console.log('req.body', req.body);
  }
};

export default updateUserDiagram;
