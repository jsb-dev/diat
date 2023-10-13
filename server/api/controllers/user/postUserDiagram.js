import Diagram from '../../../database/models/Diagram.js';

const updateUserDiagram = async (req, res) => {
  const { diagramId, changedNodes } = req.body;
  console.log('diagramId', diagramId);
  console.log('changedNodes', changedNodes);

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
      const existingNode = existingNodesMap.get(changedNode.data.id);

      // Update existing node if found, otherwise add new node
      if (existingNode) {
        acc.push(changedNode); // update existing node
      } else {
        acc.push(changedNode); // add new node
      }

      // Remove this node from the map as it has been processed
      existingNodesMap.delete(changedNode.data.id);

      return acc;
    }, []);

    // Add any remaining existing nodes that were not updated
    userDiagram.content.nodes = [...mergedNodes, ...existingNodesMap.values()];

    console.log('userDiagram', userDiagram);
    await userDiagram.save();

    res.json(userDiagram);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export default updateUserDiagram;
