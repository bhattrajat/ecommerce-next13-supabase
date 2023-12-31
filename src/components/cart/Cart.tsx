import Image from "next/image";
import Link from "next/link";
type Props = {
  cartItems:
    | {
        id: number;
        quantity: number;
        user_id: string;
        product_id: number;
        products: {
          title: string;
          image_url: string | null;
          price: number;
          brand: string;
        } | null;
      }[]
    | null;
};
const Cart = ({ cartItems }: Props) => {
  const countItems = cartItems?.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {countItems} item(s) in Cart
          </h2>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <main className="md:w-3/4">
              {cartItems?.map((item) => (
                <article
                  key={item.id}
                  className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5"
                >
                  <div>
                    <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                      <div className="w-full lg:w-2/5 xl:w-2/4">
                        <figure className="flex leading-5">
                          <div>
                            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                              {item.products?.image_url && (
                                <Image
                                  src={item.products?.image_url}
                                  alt={item.products.title}
                                  width={200}
                                  height={200}
                                />
                              )}
                            </div>
                          </div>
                          <figcaption className="ml-3">
                            <p>{item.products?.title}</p>
                            <p className="mt-1 text-gray-400">
                              {item.products?.brand}
                            </p>
                          </figcaption>
                        </figure>
                      </div>
                      <div>Quantity: {item.quantity}</div>
                      <div>
                        <div className="leading-5">
                          <p className="font-semibold not-italic">
                            ${(item.products?.price ?? 0) * item.quantity}
                          </p>
                          <small className="text-gray-400">
                            {" "}
                            ${item.products?.price ?? 0} / per item{" "}
                          </small>
                        </div>
                      </div>
                      <div className="flex-auto">
                        <div className="float-right">
                          <a className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                </article>
              ))}
            </main>
            <aside className="md:w-1/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <ul className="mb-5">
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Total price:</span>
                    <span>$98</span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Total Units:</span>
                    <span className="text-green-500">7 (Units)</span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>TAX:</span>
                    <span>$78</span>
                  </li>
                  <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                    <span>Total price:</span>
                    <span>$898</span>
                  </li>
                </ul>

                <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                  Continue
                </a>

                <Link
                  href="/"
                  className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                >
                  Back to shop
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
