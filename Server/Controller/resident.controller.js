const express = require('express');
const router = express.Router();
const Resident = require('../model/resident.model');

router.get("/resident",async (req,res)=>{
    const resident = await Resident.find().lean().exec()
    return res.status(200).json(resident)
})

router.get("/resident/:id", async(req,res)=>{
    const resident = await Resident.findById(req.params.id).lean().exec()
    return res.status(200).json(resident)
})

router.post("/resident" ,async (req,res)=>{
    const resident = await Resident.create(req.body)
    return res.status(201).json({message:"Created successfully",resident})
})

module.exports  = router