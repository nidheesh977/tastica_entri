import { AdminDashBoardButton } from "../../../components/admin/AdminDashBoardButton/AdminDashBoardButton";

export const AdminHome = () => {


  return (
    <>
      <div className="p-2 ">
        <AdminDashBoardButton title={"Sales"} buttonColor={"bg-primary"} route={"/admin/sales"} />

        <div className="mt-5 flex justify-evenly">

          <div className="shadow-md w-[15%] p-5 bg-green-500 rounded-md">
            <div className="stat">
              <div className="text-lg text-[#dcfce7]">Total Sales</div>
              <div className="text-[#ffffff] text-3xl font-bold">89,400</div>
            </div>
          </div>

          <div className="shadow-md w-[15%] p-5 bg-yellow-500 rounded-md">
            <div className="stat">
              <div className="text-lg text-[#dcfce7]">Credit Given</div>
              <div className="text-[#ffffff] text-3xl font-bold">8,200</div>
            </div>
          </div>

          <div className="shadow-md w-[15%] p-5 bg-red-500 rounded-md">
            <div className="stat">
              <div className="text-lg text-[#dcfce7]">Expenses</div>
              <div className="text-[#ffffff] text-3xl font-bold">8,200</div>
            </div>
          </div>

          <div className="shadow-md w-[15%] p-5 bg-blue-500 rounded-md">
            <div>
              <div className="text-lg text-[#dcfce7]">Net Profit</div>
              <div className="text-[#ffffff] text-3xl font-bold">28,550</div>
            </div>
          </div>


        </div>
      </div>

    </>

  );
};
