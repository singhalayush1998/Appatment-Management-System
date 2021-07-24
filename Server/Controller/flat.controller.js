const express = require('express');
const router = express.Router();
const Flats = require('../model/flat.model');

router.get("/flats",async (req,res)=>{
    const page = +req.query.page;
    const size = +req.query.size;
    const sort = +req.query.sort || 0;
    const offset = (page - 1 ) * size
    const type = req.query.type||null;
    let flats = null
    if(type === "Tenant" || type === "Owner"){
        flats = await Flats.find({type:{$eq:type}}).sort({"flatnumber":sort}).skip(offset).limit(size).lean().exec()
        const totalPages = Math.ceil((await Flats.find().countDocuments().lean().exec())/size)
        const data = {flats, totalPages}
        return res.status(200).json(data)
    }else{
        flats = await Flats.find().sort({"flatnumber":sort}).skip(offset).limit(size).lean().exec()
        const totalPages = Math.ceil((await Flats.find().countDocuments().lean().exec())/size)
        const data = {flats, totalPages}
        return res.status(200).json(data)
    }
    
})

router.get("/flats/:id",async (req,res)=>{
    const flats = await Flats.findById(req.params.id).populate("residents").lean().exec()
    return res.status(200).json(flats)
})

router.post("/flats" ,async (req,res)=>{
    const flats = await Flats.insertMany(req.body)
    return res.status(201).json(flats)
})

module.exports  = router
