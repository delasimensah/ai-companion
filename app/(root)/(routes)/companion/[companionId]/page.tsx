import { FC } from "react";

import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import CompanionForm from "./components/companion-form";

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

const CompanionIdPage: FC<CompanionIdPageProps> = async ({ params }) => {
  const { userId } = auth();

  const isPro = await checkSubscription();

  if (!isPro) {
    return redirect("/");
  }

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
