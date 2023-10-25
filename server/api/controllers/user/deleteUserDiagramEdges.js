import Diagram from '../../../database/models/Diagram.js';

const deleteUserDiagramEdges = async (query, retryCount = 0) => {
  let failedDeleteEdgesQueue = [];

  if (retryCount > 5) {
    return;
  }

  let deletedEdgeIds = [];

  const { diagramId, deletedEdgeIds: rawDeletedEdgeIds } = query;

  if (!rawDeletedEdgeIds) {
    return;
  }

  if (rawDeletedEdgeIds.includes(',')) {
    deletedEdgeIds = rawDeletedEdgeIds.split(',');
  } else {
    deletedEdgeIds[0] = rawDeletedEdgeIds;
  }

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      return;
    }

    const existingEdgesMap = new Map(
      diagram.content.edges.map((edge) => [edge.id, edge])
    );

    deletedEdgeIds.forEach((id) => {
      if (existingEdgesMap.has(id)) {
        existingEdgesMap.delete(id);
      } else {
        failedDeleteEdgesQueue.push(id);
      }
    });

    diagram.content.edges = Array.from(existingEdgesMap.values());
    await diagram.save();
  } catch {
    failedDeleteEdgesQueue.push(...deletedEdgeIds);
  }

  if (failedDeleteEdgesQueue.length > 0) {
    try {
      query.deletedEdgeIds = failedDeleteEdgesQueue.join(',');
      deleteUserDiagramEdges(query, retryCount + 1);
    } catch {
      deleteUserDiagramEdges(query, retryCount + 1);
    }
  }
};

export default deleteUserDiagramEdges;
