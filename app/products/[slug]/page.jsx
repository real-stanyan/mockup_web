"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "@/store/cartSlice";
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import products from "@/utils/products";

export default function Products({ params }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [product, setProduct] = useState({
    product_name: "",
    flavor: "strawberry",
    quantity: "1",
    price: "",
  });

  useEffect(() => {
    setData(products.find((item) => item.id === parseInt(params.slug)));
  }, [params.slug]);

  useEffect(() => {
    setProduct({
      ...product,
      product_name: data.product_name,
      price: data.price,
    });
  }, [data]);

  const handleAddCart = () => {
    dispatch(addItem(product));
    toast({
      title: `${product.product_name}(${product.flavor} x ${product.quantity} has added to cart)`,
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  return (
    <div className="w-[100vw] flex justify-between px-[10vw] py-10 font-Oswald gap-8">
      <Image
        src={data.image_url}
        width={1000}
        height={1000}
        className="w-[40vw] rounded-xl"
        alt={data.product_name}
      />
      <div className="flex flex-col gap-3 justify-between">
        <h1 className="text-[3vw] whitespace-nowrap">{data.product_name}</h1>
        <p className="place-self-end  text-[1.5vw] text-[var(--primry-color)]">
          {data.price_detail}
        </p>
        <h1 className="text-[1.4vw] font-semibold">Product Features</h1>
        <ul>
          {data &&
            data.product_features?.map((item, i) => (
              <li key={i} className="pl-8 text-[1.5vw]">
                {item}
              </li>
            ))}
        </ul>
        <h1 className="text-[1.4vw] font-semibold">Packaging Design</h1>
        <ul>
          {data &&
            data.packaging_design?.map((item, i) => (
              <li key={i} className="pl-8 text-[1.5vw]">
                {item}
              </li>
            ))}
        </ul>
        <div className="flex justify-evenly items-center w-full h-10">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Flavor options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strawberry">strawberry</SelectItem>
              <SelectItem value="mango">mango</SelectItem>
              <SelectItem value="pineapple">pineapple</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="lg" onClick={handleAddCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
