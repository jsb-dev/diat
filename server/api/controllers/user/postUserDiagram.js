import Diagram from '../../../database/models/Diagram.js';
import aggregateRequests from '../../utils/aggregateRequests.js';

// Queue to store failed aggregation attempts
const failedAggregationQueue = [];

const handleNodes = async (existingNodes, changedNodes) => {
  const existingNodesMap = new Map(
    existingNodes.map((node) => [node.data.id, node])
  );

  const mergedNodes = changedNodes.reduce((acc, changedNode) => {
    acc.push(changedNode);
    existingNodesMap.delete(changedNode.data.id);
    return acc;
  }, []);

  return [...mergedNodes, ...existingNodesMap.values()];
};

const handleEdges = async (existingEdges, changedEdges) => {
  const existingEdgesMap = new Map(
    existingEdges.map((edge) => [edge.id, edge])
  );

  const mergedEdges = changedEdges.reduce((acc, changedEdge) => {
    acc.push(changedEdge);
    existingEdgesMap.delete(changedEdge.id);
    return acc;
  }, []);

  return [...mergedEdges, ...existingEdgesMap.values()];
};

// Assuming you have already loaded the Diagram outside of this controller for reusability
let loadedDiagram;

const updateUserDiagram = async (req, res) => {
  try {
    const { diagramId, changedNodes, changedEdges } = req.body;

    // Try to process failed aggregations first
    while (failedAggregationQueue.length > 0) {
      const { diagramId, nodes, edges } = failedAggregationQueue.shift();
      const reAggregatedRequest = await aggregateRequests(
        diagramId,
        nodes,
        edges
      );
      if (reAggregatedRequest) {
        console.log('Successfully re-aggregated failed request');
      } else {
        failedAggregationQueue.push({ diagramId, nodes, edges });
      }
    }

    // Load diagram only if not loaded or different diagramId is received
    if (!loadedDiagram) {
      loadedDiagram = await Diagram.findOne({ _id: diagramId });
    }

    if (!loadedDiagram) {
      console.log('Diagram not found');
      return res.status(404).json({ message: 'Diagram not found' });
    }

    const aggregatedRequest = await aggregateRequests(
      diagramId,
      changedNodes,
      changedEdges
    );

    if (!aggregatedRequest) {
      // Push to the queue for next cycle
      failedAggregationQueue.push({
        diagramId,
        nodes: changedNodes,
        edges: changedEdges,
      });
      console.log('Failed to aggregate request');
      return res.status(500).json({
        message:
          'Failed to aggregate request. Will try again in the next cycle.',
      });
    }

    const [newNodes, newEdges] = await Promise.all([
      handleNodes(
        loadedDiagram.content.nodes,
        Array.from(aggregatedRequest.nodes.values())
      ),
      handleEdges(
        loadedDiagram.content.edges,
        Array.from(aggregatedRequest.edges.values())
      ),
    ]);

    loadedDiagram.content.nodes = newNodes;
    loadedDiagram.content.edges = newEdges;

    await loadedDiagram.save();

    res.status(200).json({ message: 'Diagram updated' });
    console.log('Diagram updated');
  } catch (error) {
    console.error(error.message);
  }
};

export default updateUserDiagram;
