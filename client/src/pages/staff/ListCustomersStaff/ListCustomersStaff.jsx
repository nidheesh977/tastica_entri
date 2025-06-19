import { useSelector } from "react-redux";
import { ListCardCustomer } from "../../../components/shared/ListCardCustomer/ListCardCustomer";

export const ListCustomersStaff = () => {
  const permissions = useSelector(
    (state) => state?.auth?.staffData?.permissions
  );
  return (
    <>
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardCustomer permissions={permissions} />
      </div>
    </>
  );
};
