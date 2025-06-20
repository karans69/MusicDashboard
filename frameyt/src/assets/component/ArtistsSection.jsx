import React from "react";

const ArtistsSection = () => {
  const artists = [
    { name: "Manas" },
    { name: "Shresh..." },
    { name: "Suraj..." },
    { name: "Rinki..." },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h5 className="text-lg font-semibold mb-4">Artists</h5>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div className="text-center min-w-[60px]">
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center text-xl font-bold blur-[1px]">
            +
          </div>
          <small className="text-sm">Add New</small>
        </div>

        {artists.map((artist, index) => (
          <div key={index} className="text-center min-w-[60px]">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full mx-auto mb-1 filter blur-[1px]"></div>
            <small className="text-sm">{artist.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsSection;
