import mongoose from 'mongoose';

const webpageScrapeSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: false },
  websiteName: { type: String, required: true },
});

export default mongoose.model('WebpageScrape', webpageScrapeSchema);
