"use client";

import { useState, FC } from "react";
// import axios from "axios";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useProModal } from "@/hooks/use-pro-modal";

type SubscriptionButtonProps = {
  isPro: boolean;
};

const SubscriptionButton: FC<SubscriptionButtonProps> = ({ isPro = false }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const proModal = useProModal();

  const handleClick = async () => {
    try {
      // setLoading(true);
      // const response = await axios.get("/api/stripe");
      // window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={isPro ? "default" : "premium"}
      disabled={loading}
      onClick={isPro ? handleClick : proModal.onOpen}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
