import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = async () => {
  // TODO: replace with check subscription function
  const isPro = false;

  return (
    <div className="h-full space-y-2 p-4">
      <h3 className="text-lg font-medium">Settings</h3>

      <div className="text-sm text-muted-foreground">
        {isPro
          ? "You are currently on a Pro plan"
          : "You are currently on a free plan"}
      </div>

      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
