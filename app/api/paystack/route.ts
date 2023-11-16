import dotenv from "dotenv";
import axios from "axios";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

dotenv.config({ path: `.env` });

export async function GET(_: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        paystackCustomerEmail: user.emailAddresses[0].emailAddress,
      },
    });

    if (userSubscription && userSubscription.paystackCustomerCode) {
      const response = await axios.get(
        `https://api.paystack.co/subscription/${userSubscription.paystackSubscriptionCode}/manage/link`,
        {
          headers: {
            Authorization: `BEARER ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      return new NextResponse(JSON.stringify({ url: response.data.data.link }));
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.emailAddresses[0].emailAddress,
        amount: 999,
        plan: "PLN_awfkzjw9c4vbdul",
      },
      {
        headers: {
          Authorization: `BEARER ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return new NextResponse(
      JSON.stringify({ url: response.data.data.authorization_url }),
    );
  } catch (error: any) {
    console.log("[PAYSTACK]", error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
