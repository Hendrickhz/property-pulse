"use client";

import BookmarkBtn from "@/components/BookmarkBtn";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareBtn from "@/components/ShareBtn";
import Spinner from "@/components/Spinner";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PropertyIdPage = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(id);
        setProperty(propertyData);
      } catch (error) {
        console.log("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };
    if (property == null) {
      fetchPropertyData();
    }
  }, [property, id]);
  if (!property && !loading) {
    return (
      <h1 className=" text-center text-2xl font-bold mt-10">
        Property Not Found...
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {property && !loading && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkBtn propertyId={property._id} />
                  <ShareBtn property={property} />
                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyIdPage;
