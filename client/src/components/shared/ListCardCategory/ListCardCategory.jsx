import { MdDelete } from "react-icons/md";

export const ListCardCategory = () => {
  return (
    <>
      <div className="xl:w-1/2 text-center md:pt-5 pb-14 px-1 m-2 md:px-5 border border-primary shadow h-full">
        <div className="grid grid-cols-12 items-center">
          <h1 className="font-thin text-xs text-start col-span-8 sm:text-3xl my-6 text-primary">
            Categories
          </h1>
          <input
            className="rounded-xl text-primary shadow col-span-4 outline-primary h-10 p-5"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto border border-primary text-left text-xs sm:text-base">
            <thead className="bg-primary/10">
              <tr className="border-b border-primary">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-primary">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Curry Powder</td>
                <td className="px-4 py-2">5%</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center cursor-pointer">
                    <MdDelete className="hover:text-red-500 w-10 text-secondary" />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-primary">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Detergents</td>
                <td className="px-4 py-2">10%</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center cursor-pointer">
                    <MdDelete className="hover:text-red-500 w-10 text-secondary" />
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
