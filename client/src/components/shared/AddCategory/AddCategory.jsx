import { useRef } from "react";
import { BiCategory } from "react-icons/bi";
import { SideBar } from "../../shared/SideBar/SideBar";

export const AddCategory = () => {
  const categoryname = useRef(null);
  const description = useRef(null);
  const discountrate = useRef(null);
  const isDiscount = useRef(null);

  const handleSubmit = () => {};

  return (
    <>
      <SideBar />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                my-10  max-w-[500px] py-10 p-4  md:px-10 bg-[#E8F9FF] text-[#155E95] shadow-2xl rounded-lg"
        >
          <h1 className="text-3xl mb-6 font-thin text-center text-[#155E95] ">
            Add Category
          </h1>

          <input
            type="text"
            ref={categoryname}
            placeholder="Category"
            className="p-4 my-1  w-full  bg-white shadow-2xl outline-[#155E95]"
          />

          <textarea
            type="text"
            ref={description}
            placeholder="Description"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />

          <input
            type="number"
            ref={discountrate}
            placeholder="Cost Price"
            className="p-4 my-1 w-full bg-white shadow-2xl outline-[#155E95]"
          />
          <label className="flex mx-auto gap-2 " htmlFor="isDiscount">
            Discount
            <input
              type="checkbox"
              ref={isDiscount}
              className="p-4 my-1  bg-white shadow-2xl outline-[#155E95]"
            />
          </label>

          <button
            className="p-4 my-4  bg-[#155E95] hover:opacity-90 w-full text-white rounded-lg"
            onClick={handleSubmit}
          >
            <span className="flex items-center justify-center gap-2 font-semibold">
              Add Category <BiCategory />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
