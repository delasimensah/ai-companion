import { FC } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

type ModieSidebarProps = {
  isPro: boolean;
};

const MobileSidebar: FC<ModieSidebarProps> = ({ isPro }) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="w-32 bg-secondary p-0 pt-10">
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
