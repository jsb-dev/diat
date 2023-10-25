import Diagram from '../../../database/models/Diagram.js';

const postUserDiagramNodes = async (aggregatedRequests, retryCount = 0) => {
  if (retryCount > 5) {
    console.error('Maximum retry attempts reached for node creation');
    return;
  }

  let failedNodesQueue = [];
  const diagramId = aggregatedRequests[0]?.diagramId;

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      console.error('Diagram not found');
      return;
    }

    const existingNodesMap = new Map(
      diagram.content.nodes.map((node) => [node.id, node])
    );

    aggregatedRequests.forEach((req) => {
      if (req.changedNodes) {
        req.changedNodes.forEach((changedNode) => {
          try {
            existingNodesMap.set(changedNode.id, changedNode);
          } catch {
            failedNodesQueue.push(changedNode);
          }
        });
      }
    });

    diagram.content.nodes = Array.from(existingNodesMap.values());
    await diagram.save();
  } catch {
    failedNodesQueue.push(
      ...aggregatedRequests.flatMap((req) => req.changedNodes || [])
    );
  }

  if (failedNodesQueue.length > 0) {
    aggregatedRequests.push({ changedNodes: failedNodesQueue });
    postUserDiagramNodes(aggregatedRequests, retryCount + 1);
  }
};

export default postUserDiagramNodes;
