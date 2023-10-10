import Filters from "@/components/layout/Filters";
import ListProducts from "@/components/products/ListProducts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let query = supabase.from("products_view").select();

  if (searchParams?.q) {
    query = query.textSearch("title", `%${searchParams.q}%`);
  }
  if (searchParams?.brand) {
    query = query.in(
      "brand",
      typeof searchParams?.brand === "string"
        ? [searchParams?.brand]
        : searchParams?.brand,
    );
  }
  if (searchParams?.min_rating) {
    const ratings = searchParams.min_rating;
    query = query.gte("rating_avg", Number(ratings));
  }
  if (searchParams?.min_price) {
    query = query.gte("price", Number(searchParams.min_price));
  }
  if (searchParams?.max_price) {
    query = query.lte("price", Number(searchParams.max_price));
  }
  const { data: products } = await query;
  return (
    <div className="flex px-20 my-10">
      <Filters />
      {products && products.length > 0 && (
        <ListProducts user={user} products={products} />
      )}
    </div>
  );
}
