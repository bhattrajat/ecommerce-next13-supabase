import Cart from "@/components/cart/Cart";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function CartPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: cartItems } = await supabase.from("carts").select(`
    id,
    quantity,
    user_id,
    product_id,
    products (title, image_url, price, brand)
  `);
  return (
    <div>
      <Cart cartItems={cartItems} />
    </div>
  );
}
