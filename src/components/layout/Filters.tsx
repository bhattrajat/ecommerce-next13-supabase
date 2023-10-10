"use client";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";

const Filters = () => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const pathname = usePathname();

  function checkHandler(checkBoxType: string, checkBoxValue: string) {
    console.log(checkBoxType, checkBoxValue);
    const params = new URLSearchParams(searchParams);
    const values = params.getAll(checkBoxType);
    if (values.indexOf(checkBoxValue) !== -1) return true;
    return false;
  }

  const updateBrandFilterQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.name, e.target.checked);
    const params = new URLSearchParams(searchParams);
    if (e.target.checked) {
      params.append(e.target.name, e.target.value);
    } else {
      params.delete(e.target.name, e.target.value);
    }
    router.push(pathname + "?" + params.toString());
  };

  const updateRatingFilterQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.name, e.target.checked);
    const params = new URLSearchParams(searchParams);
    params.set(e.target.name, e.target.value);
    router.push(pathname + "?" + params.toString());
  };

  const updatePriceFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const minPrice = String(formData.get("min_price"));
    const maxPrice = String(formData.get("max_price"));
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    router.push(pathname + "?" + params.toString());
  };
  const requestParams = new URLSearchParams(searchParams);

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Price ($)</h3>
        <form
          onSubmit={updatePriceFilter}
          className="grid md:grid-cols-3 gap-x-2"
        >
          <div className="mb-4">
            <input
              name="min_price"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
            />
          </div>

          <div className="mb-4">
            <input
              name="max_price"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
            />
          </div>

          <div className="mb-4">
            <button className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Go
            </button>
          </div>
        </form>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Brands</h3>
        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="brand"
                type="checkbox"
                value="Apple"
                className="h-4 w-4"
                onChange={updateBrandFilterQuery}
                checked={checkHandler("brand", "Apple")}
              />
              <span className="ml-2 text-gray-500"> Apple </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="brand"
                type="checkbox"
                value="HP"
                className="h-4 w-4"
                onChange={updateBrandFilterQuery}
                checked={checkHandler("brand", "HP")}
              />
              <span className="ml-2 text-gray-500"> HP </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="brand"
                type="checkbox"
                value="Dell"
                className="h-4 w-4"
                onChange={updateBrandFilterQuery}
                checked={checkHandler("brand", "Dell")}
              />
              <span className="ml-2 text-gray-500"> Dell </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="brand"
                type="checkbox"
                value="Asus"
                className="h-4 w-4"
                onChange={updateBrandFilterQuery}
                checked={checkHandler("brand", "Asus")}
              />
              <span className="ml-2 text-gray-500"> Asus </span>
            </label>
          </li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="min_rating"
                  type="radio"
                  onChange={updateRatingFilterQuery}
                  value={rating}
                  className="h-4 w-4"
                  checked={Number(requestParams.get("min_rating")) === rating}
                />
                <span className="ml-2 text-gray-500">
                  <ReactRating
                    style={{ maxWidth: 130 }}
                    value={rating}
                    readOnly
                  />
                </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
