"use client"; // Only if you're using App Router and need hooks like useSearchParams

import { useSearchParams } from "next/navigation";

const MenuPage = () => {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table");

  const menuItems = [
    { name: "Grilled Chicken", price: 12.99 },
    { name: "Veggie Burger", price: 10.99 },
    { name: "Pasta Alfredo", price: 13.5 },
    { name: "Fresh Juice", price: 3.99 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Menu for Table {tableId || "Unknown"}
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
