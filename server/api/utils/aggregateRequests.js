let requestBuffer = new Map();

const aggregateRequests = async (diagramId, changedNodes, changedEdges) => {
  const existingBuffer = requestBuffer.get(diagramId) || {
    nodes: new Map(),
    edges: new Map(),
  };

  changedNodes.forEach((node) => {
    existingBuffer.nodes.set(node.data.id, node);
  });

  changedEdges.forEach((edge) => {
    existingBuffer.edges.set(edge.id, edge);
  });

  requestBuffer.set(diagramId, existingBuffer);

  return new Promise((resolve) => {
    setTimeout(() => {
      const buffer = requestBuffer.get(diagramId);
      requestBuffer.delete(diagramId);
      resolve(buffer);
    }, 6000);
  });
};

export default aggregateRequests;
