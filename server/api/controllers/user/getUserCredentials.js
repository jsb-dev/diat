import User from '../../../database/models/User.js';
import Diagram from '../../../database/models/Diagram.js';
import { stripModel } from '../controller-utils.js';

const getUserCredentials = async (req, res) => {
  try {
    const email = req.query.email;
    let diagram;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const newDiagram = await Diagram.create({});
      const newUser = {
        email,
        diagramId: newDiagram._id,
      };
      user = await User.create(newUser);
    }

    if (user.diagramId) {
      const diagramId = user.diagramId;
      diagram = await Diagram.findOne({ _id: diagramId });
    } else {
      const newDiagram = await Diagram.create({});
      user.diagramId = newDiagram._id;
      await user.save();
      diagram = newDiagram;
    }

    return res.json({
      user: stripModel(user),
      diagram: stripModel(diagram),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default getUserCredentials;
