const Order = require('../../models/order.model')


const getAllOrdersOfAdmin = async(req,res)=>{

    try {

        const orders = await Order.find({})

        if(!orders.length){
            return res.status(404).json({
                success: false,
                message: 'No purchase orders were found.'
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred.'
        })
        
    }
}

const getOrdersDetailsForAdmin = async(req,res)=>{
    try {
        const {id} = req.params;
        const order = await Order.findById(id)
        console.log(order, 'orden detalle')

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'The purchase order was not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred.'
        })
        
    }
}

const updateOrderStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'The order was not found.'
            })
        } 

        await Order.findByIdAndUpdate(id,{orderStatus})

            res.status(200).json({
            success: true,
            message: 'The order status was updated successfully.',
        })
    

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred.'
        })
    }
}

module.exports = {getAllOrdersOfAdmin, getOrdersDetailsForAdmin, updateOrderStatus}