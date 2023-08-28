import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  diagramId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
