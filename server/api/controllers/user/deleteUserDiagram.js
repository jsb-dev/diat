import { startSession } from 'mongoose';
import Diagram from '../../../database/models/Diagram.js';
import { diagramLock } from '../../utils/diagramLock.js';

let queue = Promise.resolve();

const deleteUserDiagram = async (req, res) => {
  console.log('Entering deleteUserDiagram');
  console.log(req.body);

  const release = await diagramLock.acquire();

  queue = queue
    .then(async () => {
      const session = await startSession();
      session.startTransaction();

      try {
        const { diagramId, nodesToDelete, edgesToDelete } = req.body;

        if (!diagramId || !nodesToDelete || !edgesToDelete) {
          res.status(400).json({ message: 'Invalid request body' });
          return;
        }

        const diagram = await Diagram.findOne({ _id: diagramId }).session(
          session
        );

        if (!diagram) {
          throw new Error('Diagram not found');
        }

        // Deleting nodes
        nodesToDelete.forEach((nodeId) => {
          const index = diagram.content.nodes.findIndex(
            (node) => node.id === nodeId
          );
          if (index !== -1) {
            diagram.content.nodes.splice(index, 1);
          }
        });

        // Deleting edges
        edgesToDelete.forEach((edgeId) => {
          const index = diagram.content.edges.findIndex(
            (edge) => edge.id === edgeId
          );
          if (index !== -1) {
            diagram.content.edges.splice(index, 1);
          }
        });

        await diagram.save({ session });
        await session.commitTransaction();

        console.log('Delete request processed successfully');
      } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
      } finally {
        session.endSession();
      }

      release();
      return;
    })
    .catch((err) => {
      console.error('Error in queue', err);
      release();
      res
        .status(500)
        .json({ message: 'An error occurred while deleting your diagram' });
    });

  res
    .status(202)
    .json({ message: 'Delete request queued and will be processed' });
};

export default deleteUserDiagram;
