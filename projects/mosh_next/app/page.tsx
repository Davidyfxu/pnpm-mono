import React from "react";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";

export default function Home() {
  return (
    <main>
      <div>hello</div>
      <Link href={"/users"}>users</Link>
      <ProductCard />
    </main>
  );
}
