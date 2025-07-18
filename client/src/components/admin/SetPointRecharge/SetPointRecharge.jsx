import { useState } from "react";
import { useLoyaltyPoints } from "../../../hooks/useLoayltyPoints";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { IoMdSync } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";

export const SetPointRecharge = () => {
  const [loyaltyRate, setLoyaltyRate] = useState("");
  const {
    setPointRecharge,
    loyaltyData,
    updateLoyaltyData,
    deleteLoyaltyData,
  } = useLoyaltyPoints();
  useEffect(() => {
    if (loyaltyData?.loyaltyRate) {
      setLoyaltyRate(loyaltyData.loyaltyRate);
    }
  }, [loyaltyData]);

  return (
    <>
      <div className="flex justify-center md:mt-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                        my-10  md:w-[500px] md:h-72 p-4 md:p-10   md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="md:text-3xl mb-6 font-thin text-center text-primary ">
            Set Loyalty Points To Wallet
          </h1>

          <div className=" flex flex-col items-center gap-2">
            <input
              type="text"
              value={loyaltyRate}
              onChange={(e) => setLoyaltyRate(e.target.value)}
              placeholder="Loyalty Rate "
              className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
            />

            <div className="flex justify-center gap-2 w-full">
              {!loyaltyData && (
                <button
                  onClick={() => {
                    setPointRecharge({ loyaltyRate});
                  }}
                  className="p-4 w-full  bg-primary hover:opacity-90  text-white rounded"
                >
                  <span className="flex items-center justify-center gap-1 font-semibold">
                    Submit
                    <BsFillPiggyBankFill />
                  </span>
                </button>
              )}

              {loyaltyData && (
                <button
                  onClick={() => {
                    updateLoyaltyData({ loyaltyRate, id: loyaltyData?._id });
                  }}
                  className="p-4 w-full   bg-secondary hover:opacity-90  text-white rounded"
                >
                  <span className="flex items-center justify-center gap-1 font-semibold">
                    <IoMdSync size={20} />
                    Update
                  </span>
                </button>
              )}

              {loyaltyData && (
                <button
                  onClick={() => {
                    deleteLoyaltyData({ id: loyaltyData?._id });
                    setLoyaltyRate("");
                  }}
                  className="p-4 w-full  bg-orange-600 hover:opacity-90 text-white rounded"
                >
                  <span className="flex items-center justify-center gap-1 font-semibold">
                    <MdDelete size={20} />
                    Delete
                  </span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
