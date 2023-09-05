import { ReactNode, FC } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
};

export default AuthLayout;
