import { ShopLoginForm } from "../../../components/shop/ShopLoginForm/ShopLoginForm";

export const ShopLogin = ({action ='login'}) => {
  return (
    <div>
      <ShopLoginForm action={action} />
    </div>
  );
};
