"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const ProModal = () => {
  const proModal = useProModal();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/paystack");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>

          <DialogDescription className="space-y-2 text-center">
            Create
            <span className="mx-1 font-medium text-sky-500">Custom AI</span>
            Companions!
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            GH¢ 9<span className="text-sm font-normal">.99 / month</span>
          </p>

          <Button
            onClick={handleSubscribe}
            disabled={loading}
            variant="premium"
          >
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
