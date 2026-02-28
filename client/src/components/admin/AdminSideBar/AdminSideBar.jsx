import {
  FaHome,
  FaUsers,
  FaFileCsv,
  FaBoxOpen,
  FaUserTie,
  FaFileInvoice,
} from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import {
  MdPersonAdd,
  MdGroups,
  MdCategory,
  MdReceipt,
  MdEventNote,
  MdDashboard,
  MdPayment,
  MdAccountBalanceWallet
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { toggleSideBar } from "../../../redux/features/sidebarSlice";
import { useState } from "react";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { usePermissionCheck } from "../../../hooks/usePermissionCheck";


export const AdminSideBar = () => {
  const sidebar = useSelector((state) => state.sidebar.sideBar);
  const [home, setHome] = useState(false);
  const [staffManagement, setStaffManagement] = useState(false);
  const [productManagement, setProductManagement] = useState(false);
  const [customerManagement, setCustomerManagement] = useState(false);
  const [expenseManagement, setExpenseManagement] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state?.auth?.adminData?.permissions
  );

  const { hasPermission } = usePermissionCheck()

  const handleSideBar = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`
      fixed top-15 md:top-[77px]  left-0 h-[81%] md:h-[77%] xl:h-[83%] md:w-96 bg-tertiary backdrop-blur  shadow-2xl text-primary
      transform ${sidebar ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      z-[1000]
    `}
    >
      <ul className="w-full flex flex-col bg-tertiary gap-1 h-[600px] text-[16px] font-bold p-2 transition-all duration-1000 overflow-y-auto">
        <li
          onClick={() => {
            setHome(!home);
          }}
          className={
            " bg-tertiary rounded  border  flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
          }
        >
          <FaHome />
          Home
          <HiChevronDown
            className={`transform transition-transform duration-300 ${home ? "rotate-180" : ""
              }`}
          />
        </li>
        {home && (
          <>
            {" "}
            <li
              onClick={() => {
                handleSideBar("/admin");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary rounded 
              flex items-center hover:bg-orange-50  cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdDashboard />
              Dashboard
            </li>
            {permissions?.includes("product_read") && (
              <li
                onClick={() => {
                  handleSideBar("/admin/product/view");
                  dispatch(toggleSideBar());
                }}
                className="bg-tertiary rounded 
              flex items-center hover:bg-orange-50  cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
              >
                <FaBoxOpen />
                Products
              </li>
            )}
            {permissions?.includes("category_read") && (
              <li
                onClick={() => {
                  handleSideBar("/admin/category/view");
                  dispatch(toggleSideBar());
                }}
                className="bg-tertiary rounded flex items-center  hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
              >
                <MdCategory />
                Categories
              </li>
            )}
            <li
              onClick={() => {
                handleSideBar("/admin/staff/view");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary rounded 
               
             flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdGroups />
              Staff
            </li>
            {permissions?.includes("customer_read") && (
              <li
                onClick={() => {
                  handleSideBar("/admin/customer/view");
                  dispatch(toggleSideBar());
                }}
                className="bg-tertiary
              rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
              >
                <FaUsers />
                Customers
              </li>
            )}
          </>
        )}

        <li
          onClick={() => setStaffManagement(!staffManagement)}
          className=" bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaUserTie />
          Staff Management
          <HiChevronDown
            className={`transform transition-transform duration-300 ${staffManagement ? "rotate-180" : ""
              }`}
          />
        </li>
        {staffManagement && (
          <>
            {" "}
            <li
              onClick={() => {
                handleSideBar("/admin/staff/signup");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary
              
              rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <FaUserTie />
              Add Staff
            </li>
          </>
        )}
        {permissions?.includes("customer_create") && (
          <>
            <li
              onClick={() => setCustomerManagement(!customerManagement)}
              className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
            >
              <FaUsers />
              Customer Management
              <HiChevronDown
                className={`transform transition-transform duration-300 ${customerManagement ? "rotate-180" : ""
                  }`}
              />
            </li>

            {customerManagement && (
              <>
                <li
                  onClick={() => {
                    handleSideBar("/admin/customer/add");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <MdPersonAdd />
                  Add Customer
                </li>
              </>
            )}
          </>
        )}
        <li
          onClick={() => setProductManagement(!productManagement)}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaBoxOpen />
          Product Management
          <HiChevronDown
            className={`transform transition-transform duration-300  ${productManagement ? "rotate-180" : ""
              }`}
          />
        </li>

        {productManagement && (
          <>
            {permissions?.includes("product_create") && (
              <>
                <li
                  onClick={() => {
                    handleSideBar("/admin/add/product");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <FaBox />
                  Add Product
                </li>

                <li
                  onClick={() => {
                    handleSideBar("/admin/upload/products/csv");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary  rounded flex items-center text-[16px] hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <FaFileCsv />
                  Upload Products CSV File
                </li>
              </>
            )}
            {permissions?.includes("category_create") && (
              <>
                <li
                  onClick={() => {
                    handleSideBar("/admin/add/category");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary  rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <BiCategory />
                  Add Category
                </li>
                <li
                  onClick={() => {
                    handleSideBar("/admin/upload/categories/csv");
                    dispatch(toggleSideBar());
                  }}
                  className="bg-tertiary flex
                text-[16px] items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
                >
                  <FaFileCsv />
                  Upload Categories CSV File
                </li>
              </>
            )}
          </>
        )}

        {hasPermission("view_expense") && <li
          onClick={() => setExpenseManagement(prev => !prev)}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaBoxOpen />
          Expense Management
          <HiChevronDown
            className={`transform transition-transform duration-300  ${expenseManagement ? "rotate-180" : ""
              }`}
          />
        </li>}

        {hasPermission("view_expense") && expenseManagement && (
          <>
            {hasPermission("create_expense") && <li
              onClick={() => {
                handleSideBar("/admin/expense/create");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary  rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <FaReceipt />
              Expense Create
            </li>}
            {hasPermission("view_expense") && <li
              onClick={() => {
                handleSideBar("/admin/expense/list");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary  rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <FaReceipt />
              Expense List
            </li>
            }

            {hasPermission("view_expense_account") && <li
              onClick={() => {
                handleSideBar("/admin/expense/account");
                dispatch(toggleSideBar());
              }}
              className="bg-tertiary  rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 w-5/6 ms-10"
            >
              <MdAccountBalanceWallet />
              Expense Account
            </li>
            }
          </>
        )}

        <li
          onClick={() => {
            handleSideBar("/admin/cart");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10 "
        >
          <FaShoppingCart />
          Shopping Cart
        </li>

        {hasPermission("vendor_view") && <li
          onClick={() => {
            handleSideBar("/admin/vendor");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdEventNote />
          Vendor
        </li>}
        {hasPermission("payment_acc_view") && <li
          onClick={() => {
            handleSideBar("/admin/payment/account");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdEventNote />
          Payment Account
        </li>}

        <li
          onClick={() => {
            handleSideBar("/admin/invoices");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdEventNote />
          Invoices
        </li>

        <li
          onClick={() => {
            handleSideBar("/admin/custom/invoice");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FaFileInvoice />
          Custom Invoice
        </li>
        <li
          onClick={() => {
            handleSideBar("/admin/open/orders");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdReceipt />
          Open Orders
        </li>
        <li
          onClick={() => {
            handleSideBar("/admin/loyalty/points");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <FiGift />
          Manage Loyalty Points
        </li>

        {hasPermission("tax_rate_view") && <li
          onClick={() => {
            handleSideBar("/admin/tax/rate");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdEventNote />
          Tax Rates
        </li>}

        <li
          onClick={() => {
            handleSideBar("/admin/manage/recharge");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <BsFillPiggyBankFill />
          Manage Recharge
        </li>

        <li
          onClick={() => {
            handleSideBar("/admin/recharge/wallet");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <MdPayment />
          Recharge Card
        </li>
        {hasPermission("credit_read") && (<li
          onClick={() => {
            handleSideBar("/admin/credit/book");
            dispatch(toggleSideBar());
          }}
          className="bg-tertiary border rounded flex items-center hover:bg-orange-50 cursor-pointer gap-2 justify-start p-5 h-10"
        >
          <BsCreditCard2Back />
          Credit book
        </li>)}
      </ul>
    </div>
  );
};
