import { useState } from "react";
import { FiGift } from "react-icons/fi";
import { useLoyaltyPoints } from "../../../hooks/useLoayltyPoints";

export const LoyaltyPointsCard = () => {
  const [loyaltyRate, setLoyaltyRate] = useState("");

  const { addLoyaltyPoints } = useLoyaltyPoints();

  return (
    <>
      <div className="flex justify-center md:mt-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                        my-10  md:w-[500px] md:h-72 p-4 md:p-10   md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="md:text-3xl mb-6 font-thin text-center text-primary ">
            Add Loyalty Points To Product
          </h1>

          <div className=" flex items-center gap-2">
            <input
              type="text"
              value={loyaltyRate}
              onChange={(e) => setLoyaltyRate(e.target.value)}
              placeholder="Loyalty Rate "
              className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
            />
            <button
              onClick={() => {
                addLoyaltyPoints({loyaltyRate});
                setLoyaltyRate("");
              }}
              className="p-4 w-26   bg-primary hover:opacity-90  text-white rounded"
            >
              <span className="flex items-center justify-center gap-1 font-semibold">
                Submit
                <FiGift />
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
