export const Footer = () => {
  return (
    <div className="fixed z-[999] bottom-0 w-full bg-tertiary ">
      <div className="py-4 flex justify-start items-center px-4 bg-tertiary text-primary shadow-2xl">
        <span className="font-thin">Copyright &copy; {new Date().getFullYear()} zensettle.com</span>
      </div>
    </div>
  );
};
