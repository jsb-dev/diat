import User from '../../../database/models/User.js';

const updateUserEmail = async (req, res) => {
  const { currentEmail, newEmail } = req.body;

  try {
    const emailTaken = await User.findOne({ email: newEmail });
    if (emailTaken) {
      return res.status(409).json({ message: 'Email is already taken.' });
    }

    const user = await User.findOne({ email: currentEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.email = newEmail;
    const updatedUser = await user.save();

    if (!updatedUser) {
      return res.status(500).json({ message: 'Could not update user email.' });
    }

    return res
      .status(200)
      .json({ message: 'Email updated successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error while updating email.' });
  }
};

export default updateUserEmail;
