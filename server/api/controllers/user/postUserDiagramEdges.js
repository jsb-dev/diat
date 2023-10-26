import Diagram from '../../../database/models/Diagram.js';

const postUserDiagramEdges = async (aggregatedRequests, retryCount = 0) => {
  console.log('postUserDiagramEdges');
  console.log('aggregatedRequests:', aggregatedRequests);

  if (aggregatedRequests.length === 0 || !aggregatedRequests[0].changedEdges) {
    console.log('No edges to update');
    return;
  }

  if (retryCount > 5) {
    console.error('Maximum retry attempts reached for edge creation');
    return;
  }

  let failedEdgesQueue = [];
  const diagramId = aggregatedRequests[0]?.diagramId;

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      console.error('Diagram not found');
      return;
    }

    const existingEdgesMap = new Map(
      diagram.content.edges.map((edge) => [edge.id, edge])
    );

    aggregatedRequests.forEach((req) => {
      if (req.changedEdges) {
        req.changedEdges.forEach((changedEdge) => {
          try {
            existingEdgesMap.set(changedEdge.id, changedEdge);
          } catch {
            console.error('Edge not found');
          }
        });
      }
    });

    diagram.content.edges = Array.from(existingEdgesMap.values());

    let isDiagramSaved = false;
    let retry = 0;

    while (!isDiagramSaved && retry < 5) {
      try {
        await diagram.save();
        isDiagramSaved = true;
      } catch {
        console.warn('Waiting for diagram write opening...');
        retry++;
      }
    }
  } catch {
    failedEdgesQueue.push(
      ...aggregatedRequests.flatMap((req) => req.changedEdges || [])
    );
  }

  while (failedEdgesQueue.length > 0) {
    aggregatedRequests.push({ changedEdges: failedEdgesQueue });
    postUserDiagramEdges(aggregatedRequests, retryCount + 1);
  }
};

export default postUserDiagramEdges;
