import { FC, ReactNode } from "react";

import Navbar from "@/components/navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-16 md:pl-20">{children}</main>
    </div>
  );
};

export default Layout;
