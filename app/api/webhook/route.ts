import { NextResponse } from "next/server";
import { headers } from "next/headers";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const event = await req.json();
  const signature = headers().get("x-paystack-signature") as string;

  if (!signature) {
    return new NextResponse("No Signature", { status: 400 });
  }

  // event for when a subscription is created
  if (event.event === "subscription.create") {
    console.log("subscription create event run");

    await prismadb.userSubscription.create({
      data: {
        paystackCustomerEmail: event.data.customer.email as string,
        paystackCustomerCode: event.data.customer.customer_code as string,
        paystackSubscriptionCode: event.data.subscription_code as string,
        nextPaymentDate: new Date(event.data.next_payment_date),
      },
    });
  }

  // events for each billing cycle
  if (event.event === "invoice.create") {
    console.log("invoice create event run");

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

  if (event.event === "invoice.payment_failed") {
    console.log("invoice payment failed event run");

    await prismadb.userSubscription.delete({
      where: {
        paystackSubscriptionCode: event.data.subscription
          .subscription_code as string,
      },
    });
  }

  // if (event.event === "invoice.update") {
  //   await prismadb.userSubscription.update({
  //     where: {
  //       paystackSubscriptionCode: event.data.subscription
  //         .subscription_code as string,
  //     },
  //     data: {
  //       nextPaymentDate: new Date(event.data.subscription.next_payment_date),
  //     },
  //   });
  // }

  // events for when a subscription is cancelled
  if (event.event === "subscription.not_renew") {
    console.log("subscription not renew event run");

    await prismadb.userSubscription.delete({
      where: {
        paystackSubscriptionCode: event.data.subscription_code as string,
      },
    });
  }

  if (event.event === "subscription.disable") {
    console.log("subscription disable event run");

    await prismadb.userSubscription.delete({
      where: {
        paystackSubscriptionCode: event.data.subscription_code as string,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
