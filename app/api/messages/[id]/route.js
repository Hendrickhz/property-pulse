import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { id } = params;
    const message = await Message.findById(id);
    if (!message) {
      return new Response("Message Not Found", { status: 404 });
    }
    //verify ownership
    if (message.recipient.toString() !== sessionUser.userId.toString()) {
      return new Response("Unauthorized", { status: 403 });
    }

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { id } = params;
    const message = await Message.findById(id);
    if (!message) {
      return new Response("Message Not Found", { status: 404 });
    }
    //verify ownership
    if (message.recipient.toString() !== sessionUser.userId.toString()) {
      return new Response("Unauthorized", { status: 403 });
    }

    await message.deleteOne();

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
