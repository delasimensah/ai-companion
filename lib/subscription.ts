import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const user = await currentUser();

  if (!user) return false;

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      paystackCustomerEmail: user.emailAddresses[0].emailAddress,
    },
    select: {
      paystackSubscriptionCode: true,
      nextPaymentDate: true,
      paystackCustomerCode: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.paystackSubscriptionCode &&
    userSubscription.nextPaymentDate?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
