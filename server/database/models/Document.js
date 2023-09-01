import { mongoose, Schema } from 'mongoose';

const documentSchema = new Schema({
  documentId: {
    type: string,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  dateModified: {
    type: Date,
  },
  content: {
    type: Schema.Types.Mixed,
    default: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '',
            },
          ],
        },
      ],
    },
  },
});

documentSchema.methods.currentDate = function () {
  const date = new Date(Date.now());
  const format = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const dateString = date.toLocaleDateString('en-US', format);
  return dateString;
};

export default mongoose.model('Document', documentSchema);
