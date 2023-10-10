'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEventHandler } from 'react';

type Props = {
  uid: string;
};
export default function AddProductForm({ uid }: Props) {
  console.log(uid);
  const supabase = createClientComponentClient();
  const addProduct: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('image') as File;
    const title = String(formData.get('title'));
    const description = String(formData.get('description'));
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `${uid}-${Math.random()}.${fileExt}`;
    let { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, imageFile);
    if (uploadError) {
      throw uploadError;
    }
    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    let { error } = await supabase
      .from('products')
      .insert({ title, description, image_url: data.publicUrl });
    if (error) {
      alert('Error adding product');
    }
  };
  return (
    <form onSubmit={addProduct} className="flex gap-4 my-auto flex-col">
      <label htmlFor="title">Title (Required)</label>
      <input type="text" required name="title" id="title" />
      <label htmlFor="description">Description (Required)</label>
      <textarea
        name="description"
        required
        id="description"
        cols={30}
        rows={10}
      />
      <label htmlFor="image">Upload Image (Required)</label>
      <input type="file" accept="image/*" required name="image" id="image" />
      <button className="bg-gray-900 py-2 text-gray-100" type="submit">
        Create Product
      </button>
    </form>
  );
}
