import User from '../../../database/models/User.js';
import Diagram from '../../../database/models/Diagram.js';
import { stripModel } from '../controller-utils.js';

const getUserCredentials = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user = await User.findOne({ email }).populate('diagramId');
    console.log('found user?', user);
    let diagram;

    if (!user) {
      const newDiagram = await Diagram.create({});
      const newUser = {
        email: email,
        diagramId: newDiagram._id,
      };

      user = await User.create(newUser);
    } else {
      try {
        diagram = await Diagram.findOne({ diagramId: user.diagramId });
      } catch {
        diagram = await Diagram.create({});
      }
    }

    console.log('user', user);
    console.log('diagram', diagram);

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
