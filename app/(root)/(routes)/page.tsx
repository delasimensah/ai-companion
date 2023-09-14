import { FC } from "react";

import SearchInput from "@/components/search-input";
import Categories from "@/components/categories";
import prismadb from "@/lib/prismadb";
import Companions from "@/components/companions";

type RootPageProps = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const RootPage: FC<RootPageProps> = async ({ searchParams }) => {
  const categories = await prismadb.category.findMany();
  const companions = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={companions} />
    </div>
  );
};

export default RootPage;
