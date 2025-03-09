// noinspection JSDeprecatedSymbols,JSValidateTypes

import React, {useEffect, useState} from "react";

const ResultArea = ({ images }) => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        }, []);


  return (
    <div className="result-area p-4 mt-[5rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="image-card rounded-lg overflow-hidden shadow-lg">

                {/* Anchor tag wrapping image tag to open image in New tab*/}
                <a
                    href={image.urls.full} // Use the full-size image URL
                    target="_blank" // Open image in New tab
                    rel="noopener noreferrer" // Recommended for security
                >
                    <img
                src={image.urls.small} // Use the image URL from the API response
                alt={image.description || "Image"}
                className="w-full h-48 object-cover"
                    />
                </a>

              <div className="p-4 bg-[#404454]">
                <p className="text-white text-sm truncate">
                  {image.description || "No description"}
                </p>
              </div>
            </div>
          ))
        ) : (
            // Display an output if no images are found
          <p className="text-white text-center col-span-full">No images found. Try a different search!</p>

        )}

          {/* Scroll to top button */}
          {showScrollButton && (
              <button
                  onClick={scrollToTop}
                  className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-all">
                  ↑ Top
              </button>
          )}

      </div>
    </div>
  );
};

export default ResultArea;
