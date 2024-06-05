import connectDB from "@/config/database";
import Property from "@/models/Property";


// /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    if (!properties) return new Response("Properties Not Found", { status: 404 });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
