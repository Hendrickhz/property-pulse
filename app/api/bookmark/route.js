import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";
//GET /api/bookmark
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const user = await User.findById(sessionUser.userId);

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};

export const POST = async (request) => {
  const { propertyId } = await request.json();
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const user = await User.findById(sessionUser.userId);

    let isBookmarked;
    let message;
    // check property is in user's bookmark
    isBookmarked = user.bookmarks.includes(propertyId);
    if (isBookmarked) {
      //remove the property from bookmarks
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully.";
      isBookmarked = false;
    } else {
      //added the property to bookmarks
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully.";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ isBookmarked, message }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
