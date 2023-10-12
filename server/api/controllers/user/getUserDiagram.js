import Diagram from '../../../database/models/Diagram.js';
import { stripModel } from '../controller-utils.js';

const getUserDiagram = async (req, res) => {
  try {
    const diagramId = req.query.diagramId;

    if (!diagramId) {
      return res.status(400).json({ message: 'Diagram ID is required' });
    }

    const diagram = await Diagram.findOne({ where: { diagramId } });

    if (!diagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }

    console.log('diagram', diagram);

    return res.json(stripModel(diagram));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default getUserDiagram;
