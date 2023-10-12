import Diagram from '../../../database/models/Diagram.js';

const updateUserDiagram = async (req, res) => {
  const { diagramId, diagram } = req.body;

  try {
    const userDiagram = await Diagram.findOne({ diagramId });

    if (!userDiagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }

    userDiagram.content = diagram;
    console.log('userDiagram', userDiagram);
    await userDiagram.save();

    res.json(userDiagram);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export default updateUserDiagram;
