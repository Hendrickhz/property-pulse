"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkBtn = ({ propertyId }) => {
  const [isBookmarked, setIsBookmarked] = useState();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.log(propertyId);
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
        body: JSON.stringify({ propertyId: propertyId }),
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
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookmark className="mr-2" />
        Bookmark Property
      </button>
    </div>
  );
};

export default BookmarkBtn;
