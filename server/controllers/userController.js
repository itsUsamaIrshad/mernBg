// // API Controllers function to manage clerk user with database
// // http://localhost:4000/api/user/webhooks

 import { Webhook } from "svix";
 import userModel from "../models/userModel.js";

// const clerkWebHooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-signature": req.headers["svix-signature"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//     });

//     const { data, type } = req.body;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstname: data.first_name,
//           lastname: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.create(userData);
//         res.json({});

//         break;
//       }
//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           firstname: data.first_name,
//           lastname: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.findOneAndUpdate({ clerkId: data.id }, userData);

//         res.json({});
//         break;
//       }
//       case "user.deleted": {
//         await userModel.deleteOne({ clerkId: data.id });
//         res.json({});

//         break;
//       }

//       default:
//         break;
//     }
//   } catch (error) {
//     console.error(error);
//     return res.json({ status: "error", message: error.message });
//   }
// };

// export { clerkWebHooks };

const clerkWebHooks = async (req, res) => {
  try {
    console.log("📩 Webhook hit");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Raw buffer, not parsed body
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    };

    const evt = whook.verify(payload, headers); // No JSON.stringify
    const { data, type } = evt;

    console.log("🔔 Webhook type:", type);
    console.log("📦 Data:", data);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        return res.status(200).json({ message: "User created" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return res.status(200).json({ message: "User updated" });
      }

      case "user.deleted": {
        await userModel.deleteOne({ clerkId: data.id });
        return res.status(200).json({ message: "User deleted" });
      }

      default:
        console.log("⚠️ Unknown event type:", type);
        return res.status(400).json({ message: "Unknown event type" });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return res.status(400).json({ message: "Webhook failed", error: error.message });
  }
};


export {clerkWebHooks}