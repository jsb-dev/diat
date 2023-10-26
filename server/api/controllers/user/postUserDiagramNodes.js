import Diagram from '../../../database/models/Diagram.js';

const postUserDiagramNodes = async (aggregatedRequests, retryCount = 0) => {
  console.log('postUserDiagramNodes');
  console.log('aggregatedRequests:', aggregatedRequests);

  if (aggregatedRequests.length === 0 || !aggregatedRequests[0].changedNodes) {
    console.log('No nodes to update');
    return;
  }

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

    const latestNodesMap = new Map();

    aggregatedRequests.forEach((req) => {
      if (req.changedNodes) {
        req.changedNodes.forEach((changedNode) => {
          try {
            latestNodesMap.set(changedNode.id, changedNode);
          } catch (e) {
            console.error('Node not found');
          }
        });
      }
    });

    latestNodesMap.forEach((value, key) => {
      existingNodesMap.set(key, value);
    });

    diagram.content.nodes = Array.from(existingNodesMap.values());

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
  } catch (error) {
    console.error(error);
    failedNodesQueue.push(
      ...aggregatedRequests.flatMap((req) => req.changedNodes || [])
    );
  }

  while (failedNodesQueue.length > 0) {
    aggregatedRequests.push({ changedNodes: failedNodesQueue });
    postUserDiagramNodes(aggregatedRequests, retryCount + 1);
  }
};

export default postUserDiagramNodes;
