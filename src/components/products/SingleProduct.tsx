import Image from 'next/image';

type Props = {
  id: string;
  title: string;
  image_url: string;
  description: string;
};
export default function SingleProduct({
  id,
  image_url,
  title,
  description,
}: Props) {
  return (
    <div className="border-gray-900 flex items-center justify-center flex-col border-2 rounded">
      <Image src={image_url} alt={title} width={300} height={300} />
      <div className="text-center">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
