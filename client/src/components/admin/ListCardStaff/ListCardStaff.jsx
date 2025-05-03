import { MdDelete } from "react-icons/md";

export const ListCardStaff = () => {
  return (
    <>
      <div className="md:w-1/2 text-center pt-5 pb-14 px-5 m-2 border border-primary shadow h-full">
        <div className="grid grid-cols-12 items-center">
          <h1 className="font-thin text-start col-span-8 text-3xl my-6 text-primary">
            Staffs
          </h1>
          <input
            className="rounded-xl shadow col-span-4 outline-primary h-10 p-5"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto border border-primary text-left">
            <thead className="bg-primary/10">
              <tr className="border-b border-primary">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-primary">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Arjun</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center w-10 cursor-pointer">
                    <MdDelete className="hover:text-red-500 text-secondary" />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-primary">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Vishnu</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center w-10 cursor-pointer">
                    <MdDelete className="hover:text-red-500 text-secondary" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
