import React from "react";

export const Item: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
      <h2 className="mb-2 text-xl font-bold">Item Heading</h2>
      <p className="mb-4">Item Description</p>
      <img
        src="https://via.placeholder.com/150"
        alt="Item Image"
        className="rounded-lg"
      />
    </div>
  );
};

export default Item;
