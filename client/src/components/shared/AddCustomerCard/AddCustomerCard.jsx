import { useRef } from "react";
import { MdPersonAdd } from "react-icons/md";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const AddCustomerCard = () => {
  const customerName = useRef(null);
  const phoneNumber = useRef(null);

  const handleSubmit = async () => {
    const data = {
      customerName: customerName.current.value,
      phoneNumber: phoneNumber.current.value,
    };
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/customer/create",
        withCredentials: true,
        data,
      });
      toast.success("Customer created successfully!");
      customerName.current.value = '';
      phoneNumber.current.value = '';
    } catch(error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center my-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className='mx-2
           "my-20 md:my-28" : "my-10"
        max-w-[500px] px-4 py-10 md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg'
      >
        <h1 className="text-3xl py-4 font-thin text-center text-[#155E95] ">
          Add Customer
        </h1>

        <input
          type="text"
          ref={customerName}
          placeholder="Full Name"
          className="p-4 my-1  w-full  bg-white shadow-2xl outline-primary"
        />

        <input
          type="text"
          ref={phoneNumber}
          placeholder="Mobile"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <button
          className="p-4  bg-primary hover:opacity-90 my-2 w-full text-white rounded-lg"
          onClick={handleSubmit}
        >
          <span className="flex items-center justify-center gap-2 font-semibold">
            Add <MdPersonAdd />
          </span>
        </button>
      </form>
    </div>
  );
};
