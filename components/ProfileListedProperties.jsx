import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const ProfileListedProperties = ({ properties, setProperties }) => {
  const handleDeleteProperty = async (propertyId) => {
    if (!propertyId) return;
    try {
      const confirmed = window.confirm("Are you sure to delete this property?");
      if (!confirmed) {
        return;
      } else {
        const res = await fetch(`/api/properties/${propertyId}`, {
          method: "DELETE",
        });
        if (res.status == 200) {
          setProperties((prev) =>
            [...prev].filter((property) => property._id !== propertyId)
          );
          return toast("This property is deleted successfully.");
        } else {
          toast.error("Failed to deleted.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to deleted.");
    }
  };
  return (
    <>
      {" "}
      {properties.map((property) => (
        <div key={property._id} className="mb-10">
          <Link href={`/properties/${property._id}`}>
            <Image
              className="h-32 w-full rounded-md object-cover"
              src={property.images[0]}
              alt="Property 2"
              width={500}
              height={100}
            />
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold">{property.title}</p>
            <p className="text-gray-600">
              Address: {property.location.street} {property.location.city}{" "}
              {property.location.state}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={`/properties/${property._id}/edit`}
              className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              type="button"
              onClick={() => handleDeleteProperty(property._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileListedProperties;
