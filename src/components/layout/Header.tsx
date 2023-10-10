"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "../old/logout-button";
import UserIcon from "../user/user-icon";
import Search from "./Search";

type Props = {
  user: User | null;
  cartItems: {
    id: number;
    product_id: number;
    quantity: number;
  }[];
};
const Header = ({ user, cartItems }: Props) => {
  const [cartItemsClient, setCartItemsClient] = useState(cartItems);
  const supabase = createClientComponentClient();
  useEffect(() => {
    const channel = supabase
      .channel("realtime carts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "carts",
        },
        (payload) => {
          const remainingItems = cartItemsClient.filter(
            (item) => item.id !== (payload.new.id as number),
          );
          console.log({ payload });
          console.log({ remainingItems });
          setCartItemsClient([...remainingItems, payload.new]);
        },
      )
      .subscribe();
    console.log({ cartItemsClient });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, cartItemsClient]);
  const totalItemsSum = cartItemsClient.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );
  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5 text-2xl text-blue-600 font-bold">
            <Link href="/">Lappiez</Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{totalItemsSum}</b>)
              </span>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <UserIcon />
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <Link href="/me">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <UserIcon />
                  <div className="space-y-1 font-medium">
                    <p>
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {user.user_metadata.fullName ?? user.email}
                      </time>
                    </p>
                  </div>
                  <LogoutButton />
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
