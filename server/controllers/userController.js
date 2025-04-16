import { Webhook } from "svix";
import userModel from "../models/userModel.js";


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

const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const userData = await userModel.findOne({ clerkId });
    console.log(userData)
    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { clerkWebHooks, userCredits };
