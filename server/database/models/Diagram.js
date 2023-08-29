import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  nodes: [
    {
      type: Schema.Types.Mixed,
      default: {},
    },
  ],
  edges: [
    {
      type: Schema.Types.Mixed,
      default: {},
    },
  ],
});

const diagramSchema = new Schema({
  diagramId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  content: {
    type: contentSchema,
  },
});

export default mongoose.model('Diagram', diagramSchema);
