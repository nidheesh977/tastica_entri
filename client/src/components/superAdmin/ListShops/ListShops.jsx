import { useSelector } from "react-redux";
import { useSuperAdmins } from "../../../hooks/useSuperAdmins";

export const ListShopCard = () => {
  const { shops } = useSuperAdmins();

  const searchQuery = useSelector((state) => state?.search);

  const shopData = shops?.filter((shop) => {
    const query = searchQuery.toLowerCase();

    return (
      shop?.shopName?.toLowerCase().includes(query) ||
      shop?.email?.toLowerCase().includes(query) ||
      shop?.countryName.toLowerCase().includes(query) ||
      shop?.currencyCode.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full xl:w-auto text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Shops
        </h1>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Shop Name</th>
              <th className="border border-primary px-4 py-2">Email</th>
              <th className="border border-primary px-4 py-2">Country</th>
              <th className="border border-primary px-4 py-2">Currency</th>
            </tr>
          </thead>
          <tbody>
            {shopData?.map((shop, index) => (
              <tr key={shop?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {shop?.shopName}
                </td>
                <td className="border border-primary px-4 py-2">
                  {shop?.email}
                </td>
                <td className="border border-primary px-4 py-2">
                  {shop?.countryName}
                </td>
                <td className="border border-primary px-4 py-2">
                  {shop?.currencyCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
