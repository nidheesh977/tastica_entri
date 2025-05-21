import { primary } from "../../../utils/constants";

export const DashboardCard = ({ icon, action }) => {
  return (
    <div
      className='bg-primary w-full h-20 p-5  shadow-2xl cursor-pointer hover:bg-opacity-90 rounded-lg flex justify-center items-center border'
    >
      <div className="flex flex-col gap-1 justify-center items-center">
        <div>{icon}</div>
        <p className="text-white font-semibold">{action}</p>
      </div>
    </div>
  );
};
