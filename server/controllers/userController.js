import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import stripe from 'stripe'
import transactionModel from "../models/transactionModel.js";

const clerkWebHooks = async (req, res) => {

  console.log("🔔 Webhook route hit hua");
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;

    console.log("Webhook Data:", data); // Debugging data

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        console.log("Creating user:", userData); // Debugging user creation
        await userModel.create(userData);
        res.json({ message: "User created" });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        console.log("Updating user:", userData); // Debugging user update
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({ message: "User updated" });
        break;
      }
      case "user.deleted": {
        console.log("Deleting user with clerkId:", data.id); // Debugging user deletion
        await userModel.deleteOne({ clerkId: data.id });
        res.json({ message: "User deleted" });
        break;
      }
      default:
        res.status(400).json({ message: "Unknown event type" });
        break;
    }
  } catch (error) {
    console.error("Error:", error); // Error log
    return res.json({ status: "error", message: error.message });
  }
};



//  get user available credit data

const userCredits = async(req,res)=>
{
  try 
  {

    const {clerkId} = req.body;

    const userData = await userModel.findOne({clerkId})
    res.json({success:true, credits:userData.creditBalance})
    
  } 
  
  catch (error) {

    console.error(error)
    res.json({success:false, message:error.message})
  }
}


//  gateway initialize


const stripeInstance = new stripe({

  key_id: process.env.STRIPE_PUBLIC_KEY,
  key_secret: process.env.STRIPE_SECRET_KEY 

}) 


// Api to make payment for credits

const stripePayment = async(req,res)=>
{
  try {
    const {clerkId , planId} = req.body;

    const userData = await userModel.findOne({clerkId})

    if(!userData || !planId)
    {
      return res.json({success:false , message:'invalid credentials'})
    }


    let credits , plan , amount , date

    switch (planId) {
      case 'Basic':
        plan = 'Basic'
        credits=100
        amount=10
        break;
    
        case 'Advanced':
        plan = 'Advanced'
        credits=500
        amount=50
        break;

        case 'Business':
        plan = 'Bussiness'
        credits=5000
        amount=250
        break;

      default:
        break;
    }

    date = Date.now()

    const transactionData =
    {
      clerkId,
      plan,
      amount,
      credits,
      date,
    }

    const newTransaction =  await transactionModel.create(transactionData)

    const options = {
      amount: amount*100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    }


    await stripeInstance.orders.create(options,(error,order)=>
    {
      if(error)
      {
        return res.json({status:'false', message:error})
      }

      res.json({success:true , order})
    })


  } 
  
  catch (error) {
    
  }
}





export { clerkWebHooks , userCredits , stripePayment};
