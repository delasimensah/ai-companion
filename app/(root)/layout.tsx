import { FC, ReactNode } from "react";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const isPro = false;

  return (
    <div className="h-full">
      <Navbar isPro={isPro} />

      <div className="fixed inset-y-0 mt-16 hidden w-20 flex-col md:flex">
        <Sidebar isPro={isPro} />
      </div>

      <main className="h-full pt-16 md:pl-20">{children}</main>
    </div>
  );
};

export default Layout;
