"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageItem = ({ message, setMessages }) => {
  const [isRead, setIsRead] = useState(message.read);
  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status == 200) {
        const data = await res.json();
        setIsRead(data.read);
        toast.success("Message read status is updated.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update message status");
    }
  };
  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.status == 200) {
        setMessages((prev) =>
          [...prev].filter((msg) => msg._id != message._id)
        );
        toast.success("Message is deleted.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to deleted");
    }
  };
  return (
    <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 relative">
      {!isRead && (
        <p className=" top-2 right-2  text-white bg-yellow-500 absolute px-2 py-1 rounded-md">
          New{" "}
        </p>
      )}
      <h2 className="text-xl mb-4">
        {" "}
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {" "}
            {message.phone}
          </a>
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
        }  py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "  Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageItem;
