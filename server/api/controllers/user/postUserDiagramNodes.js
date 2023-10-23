import Diagram from '../../../database/models/Diagram.js';

const failedNodesQueue = [];

const postUserDiagramNodes = async (aggregatedRequests) => {
  const diagramId = aggregatedRequests[0]?.diagramId;

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      res.status(404).send('Diagram not found');
    }

    const existingNodesMap = new Map(
      diagram.content.nodes.map((node) => [node.id, node])
    );

    const mergedNodes = [];

    aggregatedRequests.forEach((req) => {
      if (req.changedNodes) {
        req.changedNodes.forEach((changedNode) => {
          try {
            existingNodesMap.set(changedNode.id, changedNode);
            mergedNodes.push(changedNode);
          } catch {
            changedNode.__v++;
            failedNodesQueue.push(...req.changedNode);
          }
        });
      }
    });

    diagram.content.nodes = Array.from(existingNodesMap.values());
    await diagram.save();
  } catch (error) {
    console.error('Failed to save nodes:', error);
    aggregatedRequests.forEach((req) => {
      failedNodesQueue.push(...req.changedNodes);
    });
  }

  if (failedNodesQueue.length > 0) {
    try {
      aggregatedRequests.push({ changedNodes: failedNodesQueue });
      failedNodesQueue = [];
      postUserDiagramNodes(aggregatedRequests);
    } catch {
      aggregatedRequests.forEach((req) => {
        failedNodesQueue.push(...req.changedNodes);
      });
    }
  }
};

export default postUserDiagramNodes;
