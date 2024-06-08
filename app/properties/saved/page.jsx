"use client";

import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmark");
        if (res.status == 200) {
          const bookmarks = await res.json();
          setSavedProperties(bookmarks);
        } else {
          toast.error("Failed to fetch saved properties.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);
  if (loading) {
    <Spinner loading={loading} />;
  }
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
      <h1 className=" text-2xl font-semibold mb-4">Saved Properties</h1>
        {savedProperties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
