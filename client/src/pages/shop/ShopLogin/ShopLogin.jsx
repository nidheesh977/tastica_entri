import { ShopLoginForm } from "../../../components/shop/ShopLoginForm/ShopLoginForm";

export const ShopLogin = ({action ='Login'}) => {
  return (
    <div>
      <ShopLoginForm action={action} />
    </div>
  );
};
