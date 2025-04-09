import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "not authorized login again",
      });
    }

    const token_decode = jwt.decode(token);
    // console.log(token_decode)
    req.body.clerkId = token_decode.clerkId;

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { authUser };
