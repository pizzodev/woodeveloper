import {ScaffoldComponent} from "@/app/components/ScaffoldComponent";
import React from "react";

const HomeBody: React.FC = () => (
    <>
      <WhoIAmComponent />
      <section id="products" className="mx-auto max-w-7xl px-6 py-0">
        <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Le mie creazioni</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
              <ProductComponent
                  key={product.id}
                  name={product.name}  // match ProductComponent prop
                  price={product.price}
                  imageSrc={product.image}
              />
          ))}
        </div>
      </section>
    </>
);

export default function Home() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent body={HomeComponent}/>
        </div>
    );
}