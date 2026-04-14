
const Order = require('../../models/order.model');
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const axios = require('axios');

// Khalti API Configuration
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
const KHALTI_API_URL = 'https://a.khalti.com/api/v2'; // For test environment
// const KHALTI_API_URL = 'https://khalti.com/api/v2'; // For production

// 1️⃣ Create Order and Initiate Khalti Payment
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      paymentMethod,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Create order in database first
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod,
      paymentStatus: "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: null,
    });

    await newlyCreatedOrder.save();

    // Prepare Khalti payment initiation payload
    const khaltiPayload = {
      return_url: `${process.env.CLIENT_URL}/shop/payment-success`,
      website_url: process.env.CLIENT_URL || 'http://localhost:5173',
      amount: totalAmount * 100, // Convert to paisa (1 NPR = 100 paisa)
      purchase_order_id: newlyCreatedOrder._id.toString(),
      purchase_order_name: 'Shopping Order',
      customer_info: {
        name: addressInfo.address || 'Customer',
        email: 'customer@example.com', // You can add email to addressInfo if needed
        phone: addressInfo.phone || '9800000000',
      },
    };

    // Call Khalti API to initiate payment
    const khaltiResponse = await axios.post(
      `${KHALTI_API_URL}/epayment/initiate/`,
      khaltiPayload,
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (khaltiResponse.data && khaltiResponse.data.pidx) {
      // Store pidx in order for verification later
      newlyCreatedOrder.khaltiPidx = khaltiResponse.data.pidx;
      await newlyCreatedOrder.save();

      return res.status(200).json({
        success: true,
        payment_url: khaltiResponse.data.payment_url,
        orderId: newlyCreatedOrder._id,
        pidx: khaltiResponse.data.pidx,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to initiate Khalti payment',
      });
    }
  } catch (error) {
    console.error('Khalti initiate error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.detail || 'Payment initiation failed',
      error: error.response?.data || error.message,
    });
  }
};

// 2️⃣ Capture Payment - Verify Khalti Payment
const capturePayment = async (req, res) => {
  try {
    const { pidx, transaction_id, amount, mobile, purchase_order_id } = req.body;

    if (!pidx) {
      return res.status(400).json({
        success: false,
        message: 'pidx is required',
      });
    }

    // Verify payment with Khalti
    const khaltiResponse = await axios.post(
      `${KHALTI_API_URL}/epayment/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(khaltiResponse.data);

    const paymentData = khaltiResponse.data;

    // Check if payment is completed
    if (paymentData.status === 'Completed') {
      // Find and update order
      const order = await Order.findById(purchase_order_id || paymentData.purchase_order_id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Update order status
      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      order.paymentId = paymentData.transaction_id || transaction_id;
      order.khaltiPidx = pidx;

      // Update product stock
      for (let item of order.cartItems) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.productId}`,
          });
        }
        
        if (product.totalStock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product: ${product.title}`,
          });
        }
        
        product.totalStock -= item.quantity;
        await product.save();
      }

      // Delete cart after order confirmation
      await Cart.findByIdAndDelete(order.cartId);
      
      await order.save();

      return res.status(200).json({
        success: true,
        message: 'Payment verified and order confirmed',
        data: order,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Payment status: ${paymentData.status}`,
        status: paymentData.status,
      });
    }
  } catch (error) {
    console.error('Khalti verify error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.response?.data || error.message,
    });
  }
};

// 3️⃣ Get all orders by user
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

// 4️⃣ Get order details
const getOrdersDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Get order detail error:', error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrdersDetail,
};



// const Order = require('../../models/order.model');
// const Cart = require("../../models/cart.model");
// const Product = require("../../models/product.model");


// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       paymentMethod,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       cartId,
//     } = req.body;

//     const newlyCreatedOrder = new Order({
//       userId,
//       cartId,
//       cartItems,
//       addressInfo,
//       orderStatus: "Pending",      // Payment not done yet
//       paymentMethod,
//       paymentStatus: "Pending",
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId: null,
//     });

//     await newlyCreatedOrder.save();

//     res.status(201).json({
//       success: true,
//       message: "Order created, ready for Khalti payment",
//       orderId: newlyCreatedOrder._id,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error creating order",
//     });
//   }
// };

// // 2️⃣ Verify Khalti payment and capture
// const  capturePayment = async (req, res) => {
//   try {
//     const { token, amount, orderId } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Khalti Payment Verification API
//     const response = await axios.post(
//       "https://khalti.com/api/v2/payment/verify/",
//       { token, amount },
//       { headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` } }
//     );

//     if (response.data && response.data.idx) {
//       // Payment successful
//       order.paymentStatus = "Paid";
//       order.orderStatus = "Confirmed";
//       order.paymentId = response.data.idx;

//       // Update product stock
//       for (let item of order.cartItems) {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           return res.status(404).json({
//             success: false,
//             message: `Product not found: ${item.productId}`,
//           });
//         }
//         product.totalStock -= item.quantity;
//         await product.save();
//       }

//       // Delete cart after order confirmation
//       await Cart.findByIdAndDelete(order.cartId);
//       await order.save();

//       return res.status(200).json({
//         success: true,
//         message: "Order confirmed",
//         data: order,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//   } catch (error) {
//     console.log(error.response?.data || error);
//     return res.status(500).json({
//       success: false,
//       message: "Error verifying payment",
//     });
//   }
// };

// // 3️⃣ Get all orders by user
// const getAllOrdersByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const orders = await Order.find({ userId });

//     if (!orders.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No orders found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//     });
//   }
// };

// // 4️⃣ Get order details
// const getOrdersDetail = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//     });
//   }
// };

// module.exports = {
//   createOrder,
//   capturePayment,
//   getAllOrdersByUser,
//   getOrdersDetail,
// };


// const createOrder = async (req, res) => {

//     const mercadoPago = new MercadoPagoConfig({
//         accessToken:'APP_USR-7127313862060433-090914-ad385fc625344ac34978fead21475333-2682535062'
//     })


//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       cartId,
//     } = req.body;

//     const items = cartItems.map((item) => ({
//       title: item.title,
//       quantity: item.quantity,
//       unit_price: Number(item.price),
//       currency_id: "NPR",
//     }));

//     // const preference =  await new Preference(mercadoPago).create({
//     // body:{
//     //   items,
//     //   back_urls: {
//     //     success: "https://sendasalud.cloud/shop/mercadoPagoReturn",
//     //     failure: "http://sendasalud.cloud/shop/mercadopago-failure",
//     //     pending: "http://sendasalud.cloud/shop/mercadopago-pending",
//     //   },
//     //   auto_return: "approved",
//     //   external_reference: userId,
//     //   //notification_url:"https://1567a1d0bd88.ngrok-free.app/mercadoPagoReturnel"
//     // }});
 
//     // console.log('Preferencia creada : ', preference)
//     const newlyCreatedOrder = new Order({
//       userId,
//       cartId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId: null,
//       payerId: null,
//     });

//     await newlyCreatedOrder.save();

//     res.status(201).json({
//       success: true,
//       approvalURL: preference.init_point,
//       orderId: newlyCreatedOrder._id,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error al crear la preferencia de MercadoPago",
//     });
//   }
// };


// const capturePayment = async (req, res) => {
//   try {
//     const { paymentId, /*payerId,*/ orderId } = req.body;
//     let order = await Order.findById(orderId);
//     if (!orderId) {
//       return res.status(404).json({
//         success: false,
//         message: "Orden de Compra no encontrada",
//       });
//     }

//     order.paymentStatus = "Pagado";
//     order.orderStatus = "Confirmado";
//     order.paymentId = paymentId;
//     /*order.payerId = payerId;*/

//     for (let item of order.cartItems) {
//       let product = await Product.findById(item.productId);
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: `Sin Stock suficiente para este producto: ${product.title}`,
//         });
//       }
//       product.totalStock -= item.quantity;
//       await product.save();
//     }

//     const getCartId = order.cartId;
//     await Cart.findByIdAndDelete(getCartId);

//     await order.save();
//     res.status(200).json({
//       success: true,
//       message: "Orden Confirmada",
//       data: order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Ocurrio un error",
//     });
//   }
// };

// const getAllOrdersByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const orders = await Order.find({ userId });

//     if (!orders.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No se encontraron ordenes de compra",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Ocurrio algun error",
//     });
//   }
// };

// const getOrdersDetail = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "No se encontro la orden de compra",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Ocurrio algun error",
//     });
//   }
// };

// module.exports = {
//   createOrder,
//   capturePayment,
//   getAllOrdersByUser,
//   getOrdersDetail,
// };
// */
