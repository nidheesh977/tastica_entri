import { ShopLoginForm } from "../../../components/shop/ShopLoginForm/ShopLoginForm";

export const ShopSignup = ({action = 'signup'}) => {
  return (
    <div>
      <ShopLoginForm action={action} />
    </div>
  );
};
