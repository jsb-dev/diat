import Diagram from '../../../database/models/Diagram.js';

const updateUserDiagram = async (req, res) => {
  const { diagramId, changedNodes, changedEdges } = req.body;

  try {
    const userDiagram = await Diagram.findOne({ _id: diagramId });

    if (!userDiagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }

    // Create a mapping of existing nodes for faster lookup
    const existingNodesMap = new Map(
      userDiagram.content.nodes.map((node) => [node.data.id, node])
    );

    // Merge existing nodes and changed nodes
    const mergedNodes = changedNodes.reduce((acc, changedNode) => {
      let existingNode;

      try {
        existingNode = existingNodesMap.get(changedNode.data.id);
      } catch {
        existingNode = null;
      }

      // Update existing node if found, otherwise add new node
      if (existingNode) {
        existingNode.data = changedNode.data;
      } else {
        acc.push(changedNode);
      }

      // Remove this node from the map as it has been processed
      existingNodesMap.delete(changedNode.data.id);

      return acc;
    }, []);

    const existingEdgesMap = new Map(
      userDiagram.content.edges.map((edge) => [edge.id, edge])
    );

    const mergedEdges = changedEdges.reduce((acc, changedEdge) => {
      let existingEdge;
      try {
        existingEdge = existingEdgesMap.get(changedEdge.id);
      } catch {
        existingEdge = null;
      }

      if (existingEdge) {
        existingEdge.data = changedEdge.data;
      } else {
        acc.push(changedEdge);
      }

      existingEdgesMap.delete(changedEdge.id);

      return acc;
    }, []);

    userDiagram.content.nodes = [...mergedNodes, ...existingNodesMap.values()];
    userDiagram.content.edges = [...mergedEdges, ...existingEdgesMap.values()];

    console.log('userDiagram', userDiagram);
    await userDiagram.save();

    res.json(userDiagram);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
    console.log('error', error);
    console.log('req.body', req.body);
  }
};

export default updateUserDiagram;
