import { useState } from "react";
import { MdEmail } from "react-icons/md";

export const PasswordResetEmailCard = ({ handleEmail, role }) => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="my-20
              w-full md:w-[500px] py-10 md:pb-20 px-4 md:px-10 bg-tertiary text-primary shadow-2xl border rounded-lg"
      >
        <h1 className="text-3xl py-4 font-thin text-center text-primary ">
          Forgot Password
        </h1>

        <div className="relative w-full mt-4 mb-1">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 my-1 w-full bg-white shadow-2xl outline-primary"
          />
        </div>

        <button
          className="p-4  bg-primary mt-2 hover:opacity-90 w-full text-white rounded-lg"
          onClick={() => {
            handleEmail({email, role});
            setShow(!show);
            setEmail("");
          }}
        >
          <span className="flex items-center justify-center gap-2 font-bold">
            Send Mail <MdEmail />
          </span>
        </button>
        {show && (
          <p className="text-green-500 mt-2 text-center"> Mail Sent! </p>
        )}
      </form>
    </>
  );
};
