import orderModel from "../models/orderModel.js";
import userModel  from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// Placing user order for fronted
const placeOrder = async (req, res) => {
    try {
        // Validate request body
        const { userId, items, amount, address } = req.body;
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false,  // Marking payment as false for Cash on Delivery
            status: 'Pending'  // Initial status of the order
        });
        await newOrder.save();

        // Clear cart data for user
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Respond with success
        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}
const verifyOrder = async(req,res)=>{
    const {orderId,success} =req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})

        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// user orders for fronted
const userOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        

    }

}

//Listing Orders for admin panel
const listOrders = async(req,res)=>{
    try{
        const order = await orderModel.find({});
        res.json({success:true,data:order})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// api for updating order status
const updateStatus = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
