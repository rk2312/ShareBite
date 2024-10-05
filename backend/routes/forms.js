const express = require('express');
const { Recipients } = require('../models/recipients');
const { Donations } = require('../models/donations');
const authenticateJwt = require('../middlewares/authentication');
const { User } = require('../models/user');
const router = express.Router();

router.post('/new-donation', authenticateJwt, async (req, res) => {
    let newDonation = req.body;
    const currentUser = await User.findOne({ username: req.user.username });
    newDonation = {
        addressFrom: currentUser.address,
        donor_id: currentUser._id,
        completed: false,
        date: new Date(),
        ...newDonation
    }
    const newRequest = new Donations(newDonation);
    await newRequest.save();
    res.json({ message: 'Created successfully' });
});

router.post('/new-request', authenticateJwt, async (req, res) => {
    let newRecipient = req.body;
    const currentUser = await User.findOne({ username: req.user.username });
    newRecipient = {
        recipient_id: currentUser._id,
        completed: false,
        date: new Date(),
        ...newRecipient
    }
    const newRequest = new Recipients(newRecipient);
    await newRequest.save();
    res.json({ message: 'Created successfully' });
});
router.get('/my-request', authenticateJwt, async (req, res) => {
    try{
    const currentUser = await User.findOne({ username: req.user.username });
    //  console.log(currentUser);
    const requests = await Recipients.find({ recipient_id: currentUser._id });
    // console.log(requests);
    res.json({ requests });
    }
    catch{
        res.status(404).json({ message: "Failed." })
    }
});
router.get('/my-donation', authenticateJwt, async (req, res) => {
    try {
        const currentUser = await User.findOne({ username: req.user.username });
        const donations = await Donations.find({ donor_id: currentUser._id });
        res.json({ donations });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Failed to fetch donations." });
    }
});

module.exports = router;