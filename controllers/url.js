// controllers/urlController.js
const Url = require("../models/url");
const shortid = require("shortid");

async function generateShortUrl(req, res) {
  try {
    const { url: redirectUrl } = req.body;
    if (!redirectUrl) {
      return res.status(400).json({ error: "Redirect URL is required" });
    }

    const urlRegex = /^https?:\/\/\S+/i;
    if (!urlRegex.test(redirectUrl)) {
      return res.status(400).json({
        error: "Invalid URL format (must start with http:// or https://)",
      });
    }

    const urlCode = shortid.generate();
    const created = await Url.create({
      shortid: urlCode,
      redirectUrl,
      visitHistory: [],
    });

    const host = req.get("host");
    return res.status(201).json({
      shortid: created.shortid,
      shortUrl: `http://${host}/${created.shortid}`,
    });
  } catch (err) {
    console.error("generateShortUrl error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function redirectHandler(req, res) {
  try {
    const { shortid } = req.params;
    const entry = await Url.findOneAndUpdate(
      { shortid },
      { $push: { visitHistory: { visitTime: Date.now() } } },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: "URL not found" });
    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function handleGetanalytics(req, res) {
const { shortid } = req.params;
const result = await Url.findOne({ shortid });
return res.json({
  totalclicks: result.visitHistory.length, analytics:result.visitHistory
});


};

module.exports = { generateShortUrl, redirectHandler , handleGetanalytics };
