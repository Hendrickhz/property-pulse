import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    if (!properties) {
      return new Response("Properties Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.user) {
      return new Response(JSON.stringify("User Id is required"), {
        status: 403,
      });
    }
    const userId = session.userId; // Correcting session.userId to session.user.id
    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    // const images = formData.getAll("images").filter((img) => img.name !== "");
    // Create the propertyData object with embedded seller_info
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      // images,
      owner: userId,
    };

    console.log(propertyData);

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${newProperty._id}`
    );
    // return new Response(JSON.stringify("Success"), { status: 201 });
  } catch (error) {
    return new Response("Something went wrong...", { status: 500 });
  }
};
