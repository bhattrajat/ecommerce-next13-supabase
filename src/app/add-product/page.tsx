import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import AddProductForm from './form';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AddProduct() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  return <AddProductForm uid={user.id} />;
}
