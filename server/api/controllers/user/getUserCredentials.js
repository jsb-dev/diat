import User from '../../../database/models/User.js';
import Diagram from '../../../database/models/Diagram.js';
import { stripModel } from '../controller-utils.js';

const getUserCredentials = async (req, res) => {
  try {
    const email = req.query.email;
    console.log('email', email);

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const newDiagram = await Diagram.create({});

      const newUser = {
        email: email,
        diagramId: newDiagram.diagramId,
      };

      user = await User.create(newUser);
    }

    return res.json(stripModel(user));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default getUserCredentials;
