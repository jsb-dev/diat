import Diagram from '../../../database/models/Diagram.js';

const failedEdgesQueue = [];

const postUserDiagramEdges = async (aggregatedRequests) => {
  const diagramId = aggregatedRequests[0]?.diagramId;
  if (!diagramId) {
    console.error('Diagram ID not found in the aggregated requests');
    return;
  }

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      res.status(404).send('Diagram not found');
    }

    const existingEdgesMap = new Map(
      diagram.content.edges.map((edge) => [edge.id, edge])
    );

    const mergedEdges = [];

    aggregatedRequests.forEach((req) => {
      if (req.changedEdges) {
        req.changedEdges.forEach((changedEdge) => {
          existingEdgesMap.set(changedEdge.id, changedEdge);
          mergedEdges.push(changedEdge);
        });
      }
    });

    diagram.content.edges = Array.from(existingEdgesMap.values());
    await diagram.save();
  } catch (error) {
    console.error('Failed to save edges:', error);
    aggregatedRequests.forEach((req) => {
      failedEdgesQueue.push(...req.changedEdges);
    });
  }

  if (failedEdgesQueue.length > 0) {
    try {
      aggregatedRequests.push({ changedEdges: failedEdgesQueue });
      failedEdgesQueue = [];
      postUserDiagramEdges(aggregatedRequests);
    } catch {
      aggregatedRequests.forEach((req) => {
        failedEdgesQueue.push(...req.changedEdges);
      });
    }
  }
};

export default postUserDiagramEdges;
