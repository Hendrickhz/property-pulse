const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    //* Since the app is deployed on vercel, the api domain from env will not be available at once, and the server side rendering will result as error
    //Handle the case if the api domain is null
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to Fetch Properties...");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    //Handle the case if the api domain is null
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to Fetch Property...");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
export { fetchProperties, fetchProperty };
