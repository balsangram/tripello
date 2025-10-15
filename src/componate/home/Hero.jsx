import React from "react";
// import imagePng from "./hero-right.png"; // adjust the path as needed
// import ButtonMain from "./ButtonMain"; // adjust the path as needed

function Hero() {
  return (
    <div className="nc-SectionHero flex flex-col-reverse lg:flex-col relative">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h4 className="font-medium text-2xl md:text-3xl xl:text-5xl !leading-[114%]">
            Start your journey with Tripeloo
          </h4>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Accompanying us, you have a trip full of experiences. With Tripeloo,
            booking accommodation, resort villas, hotels.
          </span>
          {/* <ButtonMain href="/listing-stay" sizeClass="px-5 py-4 sm:px-7">
            Start your search
          </ButtonMain> */}
        </div>

        {/* <div className="flex-grow">
          <img className="w-full" src={imagePng} alt="hero" />
        </div> */}
      </div>

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        {/* Optional: <HeroSearchForm /> */}
      </div>
    </div>
  );
}

export default Hero;
