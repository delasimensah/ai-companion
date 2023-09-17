import { NextResponse } from "next/server";
import { headers } from "next/headers";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const event = await req.json();
  const signature = headers().get("x-paystack-signature") as string;

  if (!signature) {
    return new NextResponse("No Signature", { status: 400 });
  }

  if (event.event === "subscription.create") {
    await prismadb.userSubscription.create({
      data: {
        paystackCustomerEmail: event.data.customer.email as string,
        paystackCustomerCode: event.data.customer.customer_code as string,
        paystackSubscriptionCode: event.data.subscription_code as string,
        nextPaymentDate: new Date(event.data.next_payment_date),
      },
    });
  }

  if (event.event === "invoice.update") {
    await prismadb.userSubscription.update({
      where: {
        paystackSubscriptionCode: event.data.subscription
          .subscription_code as string,
      },
      data: {
        nextPaymentDate: new Date(event.data.subscription.next_payment_date),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
