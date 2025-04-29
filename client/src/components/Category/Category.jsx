import React from "react";

export const Category = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <div className="bg-[#E8F9FF] font-semibold border my-1 cursor-pointer hover:bg-opacity-50 shadow-2xl rounded-lg p-5">
          <p>{category.title}</p>
        </div>
      ))}
    </>
  );
};
