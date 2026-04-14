const Address = require('../../models/address.model')

const addAddress = async(req,res)=>{
    try {
        const {userId, address, city, pincode, phone, notes} = req.body;
        if(!userId || !address || !city || !pincode || !phone || !notes ){
            return res.status(400).json({
                success: false,
                messagge: 'Debe completar todos los campos!!'
            })
        }

        const newlyCreatedAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        await newlyCreatedAddress.save();
        
        res.status(201).json({
            success: true,
            data: newlyCreatedAddress,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cargar el domicilio'
        })
    }
}

const fetchAllAddresses = async(req,res)=>{
    try {
     const {userId} = req.params;
     if(!userId){
        return res.status(400).json({
            success:false,
            message:'Id Usuario requerida',
        });
     }   

     const addressList = await Address.find({userId});

        res.status(200).json({
            success: true,
            data: addressList,
        })
     

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cargar el domicilio',
        })
    }
}

const deleteAddress = async(req,res)=>{
    try {
        const {userId, addressId} = req.params;
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:'Completar todos los campos!!'
            })
        }

        const address = await Address.findOneAndDelete({_id: addressId, userId})
        if(!address) {
            return res.status(400).json({
                success:false,
                message:'No se encontro la direccion',
            })
        }

        res.status(200).json({
            success:true,
            message: 'Direccion Eliminada Correctamente',
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cargar el domicilio'
        })
    }
}

const editAddress = async(req,res)=>{
    try {
        const {userId, addressId} = req.params;
        const formData = req.body;
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:'Completar todos los campos!!'
            })
        }
        const address = await Address.findOneAndUpdate({
            _id: addressId, userId,
        },formData, {new:true})

        if(!address){
            return res.status(400).json({
                success:false,
                message:'direccion no encontrada'
            })
        }

        res.status(200).json({
            success: true,
            data: address,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cargar el domicilio'
        })
    }
}

module.exports = {addAddress,fetchAllAddresses,deleteAddress,editAddress}