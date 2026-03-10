const Donation = require("../models/Donation");

exports.createDonation = async (req,res)=>{

    try{

        const donation = new Donation(req.body);

        await donation.save();

        res.status(201).json({
            success:true,
            message:"Donation saved",
            donation
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:"Server Error"
        });

    }

};