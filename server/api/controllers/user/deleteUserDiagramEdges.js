import Diagram from '../../../database/models/Diagram.js';

const deleteUserDiagramEdges = async (query) => {
  console.log('deleteUserDiagramEdges');
  console.log('query:', query);

  const { diagramId, deletedEdgeIds: rawDeletedEdgeIds } = query[0];

  if (!rawDeletedEdgeIds) {
    return;
  }

  let deletedEdgeIds = Array.isArray(rawDeletedEdgeIds)
    ? rawDeletedEdgeIds
    : rawDeletedEdgeIds.split(',');

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    if (!diagram) {
      console.error('Diagram not found');
      return;
    }

    console.log('Deleting edges');

    diagram.content.edges = diagram.content.edges.filter(
      (edge) => !deletedEdgeIds.includes(edge.id)
    );

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

    console.log('Diagram saved');
  } catch (e) {
    console.error(e);
    return;
  }
};

export default deleteUserDiagramEdges;
