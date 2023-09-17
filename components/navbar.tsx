"use client";

import { FC } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import MobileSidebar from "@/components/mobile-sidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

type NavbarProps = {
  isPro: boolean;
};

const Navbar: FC<NavbarProps> = ({ isPro }) => {
  const proModal = useProModal();

  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />

        <Link href="/">
          <h1
            className={cn(
              "hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button onClick={proModal.onOpen} variant="premium" size="sm">
            Upgrade <Sparkles className="ml-2 h-4 w-4 fill-white text-white " />
          </Button>
        )}

        <ThemeToggle />

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
