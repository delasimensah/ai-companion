import { FC } from "react";

import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

const CompanionIdPage: FC<CompanionIdPageProps> = async ({ params }) => {
  // TODO: check subscription

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
