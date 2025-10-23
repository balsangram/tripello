import React, { useState } from "react";
import FeaturedCard from "../card/FeaturedCard";

function Featured() {
  const [featuredData] = useState([
    {
      image: "https://picsum.photos/400/250",
      bedrooms: 2,
      bathrooms: 2,
      title: "Seaside Villa",
      location: "123 Beach Lane, Panaji, Goa",
      price: 6500,
      rating: 4.8,
      reviews: 124,
      popular: true
    },
    {
      image: "https://picsum.photos/400/251",
      bedrooms: 3,
      bathrooms: 2,
      title: "Lakeview Cottage",
      location: "Nainital, Uttarakhand",
      price: 7200,
      rating: 4.6,
      reviews: 89,
      popular: false
    },
    {
      image: "https://picsum.photos/400/252",
      bedrooms: 1,
      bathrooms: 1,
      title: "Hilltop Cabin",
      location: "Manali, Himachal Pradesh",
      price: 5600,
      rating: 4.9,
      reviews: 156,
      popular: true
    },
    {
      image: "https://picsum.photos/400/253",
      bedrooms: 2,
      bathrooms: 1,
      title: "Urban Studio",
      location: "Connaught Place, Delhi",
      price: 4800,
      rating: 4.4,
      reviews: 67,
      popular: false
    },
  ]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Places to Stay
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover handpicked accommodations that offer exceptional comfort,
            stunning locations, and unforgettable experiences for your next getaway.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredData.map((item, index) => (
            <FeaturedCard
              key={index}
              image={item.image}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              title={item.title}
              location={item.location}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
              popular={item.popular}
            />
          ))}
        </div>


      </div>
    </section>
  );
}

export default Featured;