import { startSession } from 'mongoose';
import Diagram from '../../../database/models/Diagram.js';
import { diagramLock } from '../../utils/diagramLock.js';

let queue = Promise.resolve();

const postUserDiagram = async (req, res) => {
  try {
    const { diagramId, changedNodes, changedEdges } = req.body;

    if (!diagramId || !changedNodes || !changedEdges) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    const release = await diagramLock.acquire();

    queue = queue
      .then(async () => {
        const session = await startSession();
        session.startTransaction();

        try {
          const diagram = await Diagram.findOne({ _id: diagramId }).session(
            session
          );

          if (!diagram) {
            throw new Error('Diagram not found');
          }

          changedNodes.forEach((changedNode) => {
            const index = diagram.content.nodes.findIndex(
              (node) => node.id === changedNode.id
            );

            if (index !== -1) {
              diagram.content.nodes[index] = changedNode;
            } else {
              diagram.content.nodes.push(changedNode);
            }
          });

          changedEdges.forEach((changedEdge) => {
            const index = diagram.content.edges.findIndex(
              (edge) => edge.id === changedEdge.id
            );

            if (index !== -1) {
              diagram.content.edges[index] = changedEdge;
            } else {
              diagram.content.edges.push(changedEdge);
            }
          });

          await diagram.save({ session });
          await session.commitTransaction();
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
          .json({ message: 'An error occurred while saving your diagram' });
      });

    res
      .status(202)
      .json({ message: 'Post request queued and will be processed' });
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default postUserDiagram;
