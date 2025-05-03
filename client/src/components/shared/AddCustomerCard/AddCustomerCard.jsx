import { useRef } from "react";
import { MdPersonAdd } from "react-icons/md";

export const AddCustomerCard = () => {
  const username = useRef(null);
  const email = useRef(null);
  const phonenumber = useRef(null);

  const handleSubmit = async () => {};

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
          ref={username}
          placeholder="Full Name"
          className="p-4 my-1  w-full  bg-white shadow-2xl outline-primary"
        />

        <input
          type="email"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
        />

        <input
          type="text"
          ref={phonenumber}
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
