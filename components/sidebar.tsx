"use client";

import { FC } from "react";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";

const routes = [
  {
    icon: Home,
    href: "/",
    label: "Home",
    pro: false,
  },
  {
    icon: Plus,
    href: "/companion/new",
    label: "Create",
    pro: true,
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
    pro: false,
  },
];

type SidebarProps = {
  isPro: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isPro }) => {
  const pathname = usePathname();
  const router = useRouter();
  const proModal = useProModal();

  const onNavigate = (url: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }

    return router.push(url);
  };

  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary text-primary">
      <div className="flex flex-1 justify-center p-3">
        <div className="space-y-2">
          {routes.map((route) => {
            return (
              <div
                key={route.href}
                className={cn(
                  "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
                  pathname === route.href && "bg-primary/10 text-primary",
                )}
                onClick={() => onNavigate(route.href, route.pro)}
              >
                <div className="flex flex-1 flex-col items-center gap-y-2">
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
