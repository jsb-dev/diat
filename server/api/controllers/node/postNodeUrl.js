import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const isPathDisallowed = (robotsTxt, path) => {
  const lines = robotsTxt.split('\n');
  let disallowRules = [];

  let isUserAgentAll = false;
  for (const line of lines) {
    const [directive, value] = line.split(':').map((str) => str.trim());
    if (directive === 'User-agent' && value === '*') {
      isUserAgentAll = true;
    }

    if (isUserAgentAll && directive === 'Disallow') {
      disallowRules.push(value);
    }
  }

  return disallowRules.some((rule) => path.startsWith(rule));
};

const submitNodeUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const robotsRes = await fetch(`${parsedUrl.origin}/robots.txt`);

    if (robotsRes.ok) {
      const robotsTxt = await robotsRes.text();
      if (isPathDisallowed(robotsTxt, path)) {
        return res
          .status(403)
          .json({ message: 'Not allowed to scrape this website' });
      }
    } else {
      return res.status(403).json({
        message:
          'No robots.txt found or could not be retrieved. URL cannot be summarized.',
      });
    }

    const response = await fetch(url);
    const data = await response.text();
    const $ = cheerio.load(data);

    const title =
      $('head title').text() ||
      $('meta[property="og:title"]').attr('content') ||
      $('h1').first().text() ||
      'N/A';

    let description =
      $('meta[name="description"]').attr('content') ||
      $('meta[name="Description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      'N/A';

    const websiteName = parsedUrl.host || 'N/A';

    return res.json({ title, description, websiteName });
  } catch (error) {
    console.error('Error scraping webpage:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default submitNodeUrl;
