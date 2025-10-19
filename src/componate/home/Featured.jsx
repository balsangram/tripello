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
    },
    {
      image: "https://picsum.photos/400/251",
      bedrooms: 3,
      bathrooms: 2,
      title: "Lakeview Cottage",
      location: "Nainital, Uttarakhand",
      price: 7200,
    },
    {
      image: "https://picsum.photos/400/252",
      bedrooms: 1,
      bathrooms: 1,
      title: "Hilltop Cabin",
      location: "Manali, Himachal Pradesh",
      price: 5600,
    },
  ]);

  return (
    <div className="p-6 flex flex-wrap gap-6">
      {featuredData.map((item, index) => (
        <FeaturedCard
          key={index}
          image={item.image}
          bedrooms={item.bedrooms}
          bathrooms={item.bathrooms}
          title={item.title}
          location={item.location}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default Featured;
