import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  nodes: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  edges: [
    {
      type: Schema.Types.Mixed,
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
    default: {
      nodes: [],
      edges: [],
    },
    _id: false,
  },
});

export default mongoose.model('Diagram', diagramSchema);
