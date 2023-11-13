import Diagram from '../../../database/models/Diagram.js';
import User from '../../../database/models/User.js';
import validator from 'validator';

const deleteUserAccount = async (req, res) => {
  try {
    const { userEmail, diagramId } = req.body;
    console.log('userEmail:', userEmail);
    console.log('diagramId:', diagramId);

    if (!userEmail || !diagramId) {
      return res
        .status(400)
        .json({ message: 'User email and diagram ID are required.' });
    } else if (!validator.isEmail(userEmail)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    try {
      const diagram = await Diagram.findOne({ _id: diagramId });
      if (!diagram) {
        console.error('Diagram not found.');
        return res.status(404).json({ message: 'Diagram not found.' });
      }

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        console.error('User not found.');
        return res.status(404).json({ message: 'User not found.' });
      }

      await Diagram.deleteOne({ _id: diagramId });
      await User.deleteOne({ email: userEmail });

      res
        .status(200)
        .json({ message: 'User and diagram successfully deleted.' });
    } catch (error) {
      console.error('Delete operation failed:', error);
      console.error(error.message);
      res.status(500).json({
        message: 'An error occurred while deleting the user and diagram.',
      });
    }
  } catch (error) {
    console.error('Delete operation failed:', error);
    console.error(error.message);
    res.status(500).json({
      message: 'An error occurred while deleting the user and diagram.',
    });
  }
};

export default deleteUserAccount;
