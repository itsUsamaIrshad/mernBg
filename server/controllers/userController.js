// // API Controllers function to manage clerk user with database
// // http://localhost:4000/api/user/webhooks

// import { Webhook } from "svix";
// import userModel from "../models/userModel.js";

// const clerkWebHooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     console.log("✅ Webhook received:", req.body)

//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-signature": req.headers["svix-signature"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//     });

//     const { data, type } = req.body;
//  console.log("📌 Webhook type:", type); // Yeh check karein kaunsa event aaya hai


//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstname: data.first_name,
//           lastname: data.last_name,
//           photo: data.image_url,
//         };

//         console.log("📌 User Data to Save:", userData); // Yeh confirm karein data mil raha hai ya nahi

//         await userModel.create(userData);
//         res.json({});

//         console.log("✅ User Saved:", newUser); // Yeh confirm karein ke user database me save ho raha hai ya nahi


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



const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    console.log("✅ Webhook received:", req.body);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;

    // ✅ Fast Response Before DB Operation
    res.status(200).json({ received: true });

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };

        console.log("📌 User Data to Save:", userData);

        try {
          await userModel.create(userData);
          console.log("✅ User Saved:", userData);
        } catch (error) {
          console.error("❌ Database Error:", error.message);
        }
        
        break;
      }

      case "user.updated": {
        try {
          await userModel.findOneAndUpdate(
            { clerkId: data.id },
            {
              email: data.email_addresses[0].email_address,
              firstname: data.first_name,
              lastname: data.last_name,
              photo: data.image_url,
            }
          );
          console.log("✅ User Updated:", data.id);
        } catch (error) {
          console.error("❌ Database Update Error:", error.message);
        }

        break;
      }

      case "user.deleted": {
        try {
          await userModel.deleteOne({ clerkId: data.id });
          console.log("✅ User Deleted:", data.id);
        } catch (error) {
          console.error("❌ Database Deletion Error:", error.message);
        }
        
        break;
      }

      default:
        console.log("ℹ️ Unhandled Event:", type);
        break;
      }
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
  }
};

      export { clerkWebHooks };
