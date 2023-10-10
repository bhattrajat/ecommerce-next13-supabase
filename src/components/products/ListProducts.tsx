"use client";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  products: Database["public"]["Views"]["products_view"]["Row"][];
  user: User | null;
};

const ListProducts = ({ products, user }: Props) => {
  const router = useRouter();
  console.log("user", user);
  const supabase = createClientComponentClient();

  const addToCart = async (productId: number) => {
    if (!user) router.push("/login");
    const { data } = await supabase
      .from("carts")
      .select()
      .eq("user_id", user?.id)
      .eq("product_id", productId);
    const { error } = await supabase.from("carts").upsert(
      {
        user_id: user?.id,
        product_id: productId,
        quantity: data?.[0].quantity + 1 ?? 1,
      },
      { onConflict: "user_id, product_id" },
    );
    if (!error) {
      toast.success("Cart updated successfully");
    }
  };
  return (
    <>
      {/* <Header /> */}
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* <Filters /> */}
            <Toaster />
            <main className="md:w-2/3 lg:w-3/4 px-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 flex p-3">
                      <div
                        style={{
                          width: "80%",
                          height: "70%",
                          position: "relative",
                        }}
                      >
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt={product.title ?? ""}
                            height="240"
                            width="240"
                          />
                        )}
                      </div>
                    </div>
                    <div className="md:w-2/4">
                      <div className="p-4">
                        <Link href={`/`} className="hover:text-blue-600">
                          {product.title}
                        </Link>
                        <div className="flex flex-wrap items-center space-x-2 mb-2">
                          <div className="ratings">
                            <div className="my-1">
                              <ReactRating
                                style={{ maxWidth: 130 }}
                                value={product.rating_avg ?? 0}
                                readOnly
                              />
                            </div>
                          </div>
                          <b className="text-gray-300">•</b>
                          <span className="ml-1 text-yellow-500">
                            {product.rating_count}
                          </span>
                        </div>
                        <p className="text-gray-500 mb-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
                      <div className="p-5">
                        <span className="text-xl font-semibold text-black">
                          ${product.price}
                        </span>
                        <p className="text-green-500">Free Shipping</p>
                        <div className="my-3">
                          <button
                            onClick={() => {
                              if (product.id) addToCart(product.id);
                            }}
                            className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListProducts;
