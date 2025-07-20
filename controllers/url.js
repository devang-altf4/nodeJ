const URL = require('../models/url');
const shortid = require('shortid');
const Url = require('../models/url');

async function generateShortUrl(req,res){
    const body= req.body;
    if(!body.url){
        return res.status(400).json({error: "Redirect URL is required"});
    }
    const shortID = shortid();
    await Url.create({

        shortid: shortID,
        redirectUrl: body.url,
        visitHistory: []

    })
    return res.status(200).json({shortid: shortID});
 
}
async function getUrlById(req, res) {
  try {
    const { shortID } = req.params;

    const entry = await Url.findOneAndUpdate(
      { id: shortID }, // query
      { $push: { visitHistory:{ timestamp: Date.now(), } } }, // update
      { new: true } // options (optional: return updated doc)
    );

    if (!entry) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
    


module.exports = {
  generateShortUrl,
  getUrlById
};
