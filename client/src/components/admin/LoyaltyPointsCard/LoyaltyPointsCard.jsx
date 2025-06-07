import { useState } from "react";
import { FiGift, FiRefreshCcw } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useLoyaltyPoints } from "../../../hooks/useLoayltyPoints";

export const LoyaltyPointsCard = () => {
  const [loyaltyRate, setLoyaltyRate] = useState(null);
  const [updatedLoyaltyPoints, setUpdatedLoyaltyPoints] = useState(null);
  const {
    loyaltyPoints,
    addLoyaltyPoints,
    updateLoyaltyPoints,
    deleteLoyaltyPoints,
  } = useLoyaltyPoints();

  return (
    <>
      <div className="flex justify-center md:mt-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                        my-10  md:w-[500px] md:h-72 p-4 md:p-10   md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="md:text-3xl mb-6 font-thin text-center text-primary ">
            Manage Loyalty Points
          </h1>

          {loyaltyPoints?.loyalityRate && (
            <div className=" flex items-center gap-2">
              <input
                type="text"
                value={loyaltyPoints?.loyalityRate}
                readOnly
                className="p-4 my-1 w-full bg-white shadow-2xl outline-none text-primary"
              />
              <button
                onClick={() => deleteLoyaltyPoints({ id: loyaltyPoints?._id })}
                className="p-4 w-26   bg-red-600 hover:opacity-90  text-white rounded"
              >
                <span className="flex items-center justify-center gap-2 font-semibold">
                  Delete <MdDelete />
                </span>
              </button>
            </div>
          )}
          {!loyaltyPoints?.loyalityRate && (
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
                  addLoyaltyPoints({ loyalityRate: loyaltyRate });
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
          )}
          {loyaltyPoints?.loyalityRate && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={updatedLoyaltyPoints}
                onChange={(e) => setUpdatedLoyaltyPoints(e.target.value)}
                placeholder="Update Loyalty Rate "
                className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
              />
              <button
                onClick={() => {
                  updateLoyaltyPoints({
                    loyalityRate: updatedLoyaltyPoints,
                    id: loyaltyPoints?._id,
                  });
                  setUpdatedLoyaltyPoints("");
                }}
                className="p-4 w-26   bg-secondary hover:opacity-90  text-white rounded"
              >
                <span className="flex items-center justify-center gap-1 font-semibold">
                  Update <FiRefreshCcw />
                </span>
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
