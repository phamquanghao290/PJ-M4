import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { success, failed } from "../components/ultil";
import publicAxios from "../config/publicAxios";
import privateAxios from "../config/privateAxios";

interface Product {
  idProduct: number;
  nameProduct: string;
  price: number;
  image: string;
  categoryId: number;
}

interface Category {
  categoryId: number;
  nameCategory: string;
}

function Product() {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [renderProducts, setRenderProducts] = useState([]);
  const [flag, setFlag] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

  const handleGetCart = async () => {
    try {
      const response = await publicAxios.get(
        `/api/cart/${userLogin.id}`
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetCategories = async () => {
    try {
      const response = await publicAxios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetProducts = async () => {
    try {
      const response = await publicAxios.get("/api/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCart();
    handleGetCategories();
    handleGetProducts();
  }, [flag]);
  const handleProducts = async (categoryId: number) => {
    const response = await publicAxios.get(
      `/api/product/category/${categoryId}`
    );
    setProducts(response.data);
  };
  const handleAddToCart = async (product: any) => {
    if (!userLogin.id) {
      failed("Bạn cần đăng nhập để mua hàng");
      return;
    }
    try {
      const response = await privateAxios.post(`/api/cart/${userLogin.id}`, product);
      success(response.data.message);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="w-full !bg-blue-800 h-[350px] m-auto text-white text-center">
        <br />
        <br />
        <br />
        <h1 className="text-5xl font-semibold text-white">
          My Product
        </h1>
        <br />
        <div className="w-11 h-1 bg-yellow-500 rounded-lg m-auto"></div>
        <br />
        <p className="text-xl w-1/2 ml-[25%]">
          There are many variations of passages of Lorem Ipsum
          available, have suffered alteration in some form.
        </p>
      </div>

      <div className="flex justify-between max-w-[1300px] m-auto my-10">
        <div className="text-white text-center p-auto  ">
          <div
            className="text-white text-center p-auto !bg-blue-800 rounded-lg m-auto mt-5 h-11 cursor-pointer text-xl py-2"
            onClick={() => handleProducts(0)}
          >
            Tất cả sản phẩm
          </div>
          {categories.map((item: Category, index) => (
            <div
              onClick={() => handleProducts(item.categoryId)}
              key={index}
              className="w-48 h-10 !bg-blue-800 rounded-lg m-auto mt-5 cursor-pointer"
            >
              <p className="px-3 py-1 text-lg ">
                {item.nameCategory}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-[1050px] m-auto">
          {displayedProducts.map((item: Product, index) => (
            <div
              key={index}
              className="border-2 border-indigo-600 rounded-lg p-12"
            >
              <Link to={`/detail/${item.idProduct}`}>
                <img
                  src={item.image}
                  alt=""
                  className="hover:scale-110"
                />
              </Link>

              <br />
              <p className="text-center text-blue-900 text-lg font-semibold">
                {item.nameProduct}
              </p>
              <br />

              <div className="flex justify-center align-center gap-2">
                <p className="text-center text-blue-900 text-xl font-semibold">
                  {USDollar.format(item.price)}
                </p>
                <br />
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to card
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        className="flex mx-[50%]"
        current={currentPage}
        onChange={onPageChange}
        pageSize={itemsPerPage}
        total={products.length}
      />
      <br />
      <br />
    </>
  )
}

export default Product