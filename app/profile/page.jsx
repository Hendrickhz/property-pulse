"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import profileDefault from "@/assets/images/user.png";
import Spinner from "@/components/Spinner";
import ProfileListedProperties from "@/components/ProfileListedProperties";
const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileProperties = async (userId) => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status == 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchProfileProperties(session.user.id);
    }
  }, [session]);

  return (
    <section className="bg-blue-50 ">
      <div className="container m-auto py-24 container-xl lg:container px-4 ">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Link href="/property.html">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={profileImage || profileDefault}
                    alt="User"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </Link>
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length == 0 && (
                <>
                  <h1>You have no property listed.</h1>
                </>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                <ProfileListedProperties
                  properties={properties}
                  setProperties={setProperties}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
