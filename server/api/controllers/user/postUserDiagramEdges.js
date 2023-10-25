import Diagram from '../../../database/models/Diagram.js';

const postUserDiagramEdges = async (aggregatedRequests, retryCount = 0) => {
  if (retryCount > 5) {
    console.error('Maximum retry attempts reached for edge creation');
    return;
  }

  let failedEdgesQueue = [];
  const diagramId = aggregatedRequests[0]?.diagramId;

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      return;
    }

    const existingEdgesMap = new Map(
      diagram.content.edges.map((edge) => [edge.id, edge])
    );

    aggregatedRequests.forEach((req) => {
      if (req.changedEdges) {
        req.changedEdges.forEach((changedEdge) => {
          existingEdgesMap.set(changedEdge.id, changedEdge);
        });
      }
    });

    diagram.content.edges = Array.from(existingEdgesMap.values());
    await diagram.save();
  } catch {
    failedEdgesQueue.push(
      ...aggregatedRequests.flatMap((req) => req.changedEdges || [])
    );
  }

  if (failedEdgesQueue.length > 0) {
    aggregatedRequests.push({ changedEdges: failedEdgesQueue });
    postUserDiagramEdges(aggregatedRequests, retryCount + 1);
  }
};

export default postUserDiagramEdges;
