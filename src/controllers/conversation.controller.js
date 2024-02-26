import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    res.send("con");
    const sender_id = req.user.userId;
    const { receiver_id, isGroup } = req.body;
    if (isGroup == false) {
      //check if receiver_id is provided
      if (!receiver_id) {
        logger.error(
          "please provide the user id you wanna start a conversation with !"
        );
        throw createHttpError.BadGateway("Oops...Something went wrong !");
      }
    }
  } catch (error) {
    next(error);
  }
};
