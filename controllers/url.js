const URL = require('../models/url');
const shortid = require('shortid');

async function generateShortUrl(req,res){
    const body= req.body;
    if(!body.url){
        return res.status(400).json({error: "Redirect URL is required"});
    }
    const shortID = shortid();
    await URL.create({

        shortid: shortID,
        redirectUrl: body.url,
        visitHistory: []

    })
}
module.exports = {generateShortUrl};