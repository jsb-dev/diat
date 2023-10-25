import Diagram from '../../../database/models/Diagram.js';

const deleteUserDiagramNodes = async (query, retryCount = 0) => {
  let failedDeleteNodesQueue = [];

  if (retryCount > 5) {
    return;
  }

  let deletedNodeIds = [];

  const { diagramId, deletedNodeIds: rawDeletedNodeIds } = query;

  if (!rawDeletedNodeIds) {
    return;
  }

  if (rawDeletedNodeIds.includes(',')) {
    deletedNodeIds = rawDeletedNodeIds.split(',');
  } else {
    deletedNodeIds[0] = rawDeletedNodeIds;
  }

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      return;
    }

    const existingNodesMap = new Map(
      diagram.content.nodes.map((node) => [node.id, node])
    );

    deletedNodeIds.forEach((id) => {
      if (existingNodesMap.has(id)) {
        existingNodesMap.delete(id);
      } else {
        failedDeleteNodesQueue.push(id);
      }
    });

    diagram.content.nodes = Array.from(existingNodesMap.values());
    await diagram.save();
  } catch {
    failedDeleteNodesQueue.push(...deletedNodeIds);
  }

  if (failedDeleteNodesQueue.length > 0) {
    try {
      query.deletedNodeIds = failedDeleteNodesQueue.join(',');
      deleteUserDiagramNodes(query, retryCount + 1);
    } catch {
      deleteUserDiagramNodes(query, retryCount + 1);
    }
  }
};

export default deleteUserDiagramNodes;
