import Diagram from '../../../database/models/Diagram.js';

const deleteUserDiagramNodes = async (query) => {
  console.log('deleteUserDiagramNodes');
  console.log('query:', query);

  const { diagramId, deletedNodeIds: rawDeletedNodeIds } = query[0];

  if (!rawDeletedNodeIds) {
    console.log('No nodes to delete');
    return;
  }

  let deletedNodeIds = Array.isArray(rawDeletedNodeIds)
    ? rawDeletedNodeIds
    : rawDeletedNodeIds.split(',');

  try {
    const diagram = await Diagram.findOne({ _id: diagramId });

    diagram.content.nodes = diagram.content.nodes.filter(
      (node) => !deletedNodeIds.includes(node.id)
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
  } catch (e) {
    console.error(e);
    return;
  }
};

export default deleteUserDiagramNodes;
