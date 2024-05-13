"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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

  const handleAddCart = () => {
    // 更新产品状态
    setProduct({
      ...product,
      product_name: data.product_name,
      price: data.price,
    });

    // 检查是否存在购物车，如果不存在，则创建一个空的购物车
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify({}));
    }

    // 从localStorage获取购物车
    let cart = JSON.parse(localStorage.getItem("cart"));

    // 获取商品ID或名称作为键
    const productKey = data.product_name;

    // 检查购物车中是否已经有了该商品
    if (cart[productKey]) {
      // 如果商品已存在，更新其数量
      cart[productKey].quantity += 1; // 假设每次添加1个商品，或者可以传递一个数量参数
    } else {
      // 如果商品不存在，添加新的条目
      cart[productKey] = { quantity: 1, price: data.price };
    }

    // 将更新后的购物车保存回localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
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
