"use client";
import React, { useState } from "react";
const amenities = [
  {
    idAndLabel: "amenity_wifi",
    valueAndText: "Wifi",
  },
  {
    idAndLabel: "amenity_kitchen",
    valueAndText: "Full Kitchen",
  },
  {
    idAndLabel: "amenity_washer_dryer",
    valueAndText: "Washer & Dryer",
  },
  {
    idAndLabel: "amenity_free_parking",
    valueAndText: "Free Parking",
  },
  {
    idAndLabel: "amenity_pool",
    valueAndText: "Swimming Pool",
  },
  {
    idAndLabel: "amenity_hot_tub",
    valueAndText: "Hot Tub",
  },
  {
    idAndLabel: "amenity_24_7_security",
    valueAndText: "24/7 Security",
  },
  {
    idAndLabel: "amenity_wheelchair_accessible",
    valueAndText: "Wheelchair Accessible",
  },
  {
    idAndLabel: "amenity_elevator_access",
    valueAndText: "Elevator Access",
  },
  {
    idAndLabel: "amenity_dishwasher",
    valueAndText: "Dishwasher",
  },
  {
    idAndLabel: "amenity_gym_fitness_center",
    valueAndText: "Gym/Fitness Center",
  },
  {
    idAndLabel: "amenity_air_conditioning",
    valueAndText: "Air Conditioning",
  },
  {
    idAndLabel: "amenity_balcony_patio",
    valueAndText: "Balcony/Patio",
  },
  {
    idAndLabel: "amenity_smart_tv",
    valueAndText: "Smart TV",
  },
  {
    idAndLabel: "amenity_coffee_maker",
    valueAndText: "Coffee Maker",
  },
];
const PropertyAddForm = () => {
  const [fields, setFields] = useState({
    type: "Apartment",
    name: "Test Property",
    description: "",
    location: {
      street: "",
      city: "Test City",
      state: "Test State",
      zipcode: "",
    },
    beds: "3",
    baths: "2",
    square_feet: "1800",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "2000",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "test@test.com",
      phone: "",
    },
    images: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFields((prev) => ({
        ...prev,
        [outerKey]: { ...prev[outerKey], [innerKey]: value },
      }));
    } else {
      setFields((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    //clone the current amenities list
    const updatedAmenities = [...fields.amenities];
    if (checked) {
      //add the value to the list
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    setFields((prev) => ({ ...prev, amenities: updatedAmenities }));
  };
  const handleImageChange = (e) => {
    const { files } = e.target;
    //copy the current images data
    const updatedImagesData = [...fields.images];

    for (const file of files) {
      updatedImagesData.push(file);
    }
    setFields((prev) => ({ ...prev, images: [...updatedImagesData] }));
  };
  return (
    <form encType="multipart/form-data" action="/api/properties" method="POST">
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>
      <div className="mb-4">
        <label
          htmlFor="property_type"
          className="block text-gray-700 font-bold mb-2"
        >
          Property Type
        </label>
        <select
          id="property_type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
          value={fields.type}
          onChange={handleChange}
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          required
          value={fields.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your property"
          value={fields.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          value={fields.location.street}
          onChange={handleChange}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
          value={fields.location.city}
          onChange={handleChange}
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
          value={fields.location.state}
          onChange={handleChange}
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          value={fields.location.zipcode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.beds}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.baths}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.square_feet}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenities.map((amenity, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={amenity.idAndLabel}
                name="amenities"
                value={amenity.valueAndText}
                className="mr-2"
                // checked={false}
                checked={fields.amenities.includes(amenity.valueAndText)}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor={amenity.idAndLabel}>{amenity.valueAndText}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.weekly}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.monthly}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
              value={fields.rates.nightly}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
          value={fields.seller_info.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
          value={fields.seller_info.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
          value={fields.seller_info.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          required
          onChange={handleImageChange}
        />
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <i className="fas fa-plus-circle mr-2"></i> Add Property
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;
