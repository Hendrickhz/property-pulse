import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response({ message: "User Id is required" }, { status: 401 });
    }
    if (sessionUser.userId == recipient) {
      return new Response(
        { message: "You cannot send message to yourself." },
        {
          status: 200,
        }
      );
    }

    const messageData = {
      name,
      email,
      phone,
      body: message,
      property,
      recipient,
      sender: sessionUser.userId,
    };

    await Message.create(messageData);
    return new Response(
      { message: "The message is sent successfully." },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
