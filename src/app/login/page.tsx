import Messages from './messages';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Login from '@/components/auth/Login';
export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session) {
  //   console.log('coming here');
  //   redirect('/');
  // }
  return (
    <>
      <Login />
      {/* <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
          Sign In
        </button>
        <button
          formAction="/auth/sign-up"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
        >
          Sign Up
        </button>
        <Messages />
      </form> */}
    </>
  );
}
