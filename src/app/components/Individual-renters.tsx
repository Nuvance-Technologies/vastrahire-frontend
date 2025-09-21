"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const imageUrls = [
  "/elegant-dress.png",
  "/luxury-quilted-handbag.png",
  "/fashion-accessories-jewelry-shoes-lifestyle.png",
];

export interface UserI {
  _id: string;
  name: { firstname: string; lastname: string };
  email: string;
  role: string;
  address: string;
}

export function IndividualRenters() {
  const [renters, setRenters] = useState<UserI[]>([]);

  const fetchRenters = async () => {
    try {
      const response = await axios.get(`/api/users?role=individual`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch renters");
      }
      const data = response.data;
      setRenters(data);
    } catch (error) {
      console.error("Error fetching renters:", error);
    }
  };

  useEffect(() => {
    fetchRenters();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lend from Individual&apos;s Closet
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing items from our community of trusted fashion
            enthusiasts
          </p>
        </div>
        {/* Renters Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {renters.map((renter, i) => (
            <div
              key={renter._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center"
            >
              <Image
                src={imageUrls[i % imageUrls.length]}
                alt={renter.name.firstname || "Featured item"}
                className="w-full h-72 object-cover rounded-lg mb-4"
                width={384}
                height={384}
              />
              <p className="text-gray-700 font-bold py-3">
                By: {renter.name.firstname} {renter.name.lastname}
              </p>
              {/* View Profile Button */}
              <Link href={`/rentersProfile?ownerId=${renter._id}`}>
                <button className="mt-auto w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
