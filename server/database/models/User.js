import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  diagramId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
});

export default mongoose.model('User', userSchema);
