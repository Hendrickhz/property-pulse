import connectDB from "@/config/database";

export const GET = async () => {
  try {
    await connectDB();
    return new Response("Hello World", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
