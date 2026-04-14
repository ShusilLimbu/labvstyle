const Feature =  require('../../models/feature.model');

const addFeatureImage = async(req,res)=>{
    try {
        const {image} = req.body;
        const featuresImages = new Feature({image});
        await featuresImages.save();
        res.status(201).json({
            success: true,
            data: featuresImages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio un error',
        })
    }
}

const getFeatureImages = async(req,res)=>{
    try {
        const images = await Feature.find({});

        res.status(200).json({
            success:true,
            data: images,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio un error',
        })
    }
}

module.exports = {addFeatureImage, getFeatureImages} 