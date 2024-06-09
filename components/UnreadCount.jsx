"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";

const UnreadCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!session) return;
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.status == 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadCount();
  }, []);

  return (
    <>
      {unreadCount == 0 ? null : (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {unreadCount}
        </span>
      )}
    </>
  );
};

export default UnreadCount;
