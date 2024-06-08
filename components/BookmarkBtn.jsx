"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkBtn = ({ propertyId }) => {
  const [isBookmarked, setIsBookmarked] = useState();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClick = async () => {
    if (!propertyId) return;
    if (!userId)
      return toast.error("You need to login to bookmark the property,");
    try {
      const res = await fetch(`/api/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId }),
      });
      if (res.status == 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        return toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to bookmark");
    }
  };
  useEffect(() => {
    const checkIsBookmark = async () => {
      try {
        const res = await fetch(`/api/bookmark/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }),
        });
        if (res.status == 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (userId !== null) {
      checkIsBookmark();
    }
  }, [userId, propertyId]);
  if (loading) {
    return (
      <div>
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
          <FaBookmark className="mr-2" />
          Loading...
        </button>
      </div>
    );
  }
  return (
    <div>
      {isBookmarked ? (
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" />
          Remove Bookmark
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" />
          Bookmark Property
        </button>
      )}
    </div>
  );
};

export default BookmarkBtn;
