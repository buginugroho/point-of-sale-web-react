import axios from "axios";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import {
  addOrderAction,
  qtyIncreaseAction,
  qtyDecreaseAction,
  removeOrderAction
} from "../store/reducers/orderSlice";
import CardOrderSmall from "../components/CardOrderSmall";
import CardProduct from "../components/CardProduct";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import toRupiah from "../utils/Formatter";
import { SearchIcon, SortAsc, SortDesc } from "../assets/Icons";

function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");
  const title = searchParams.get("title");
  const sort_by = searchParams.get("sort_by");
  const sort_order = searchParams.get("sort_order");

  const [category, setCategory] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [titleSearch, setTitleSearch] = useState("");

  const { orderData, amount } = useSelector((state) => state.order);

  const onClickAddOrder = (product) => {
    const payload = {
      ...product
    }
    dispatch(addOrderAction(payload));
  }

  const onClickQtyIncrease = (product) => {
    const payload = {
      ...product
    }
    dispatch(qtyIncreaseAction(payload));
  }

  const onClickQtyDecrease = (product) => {
    const payload = {
      ...product
    }
    dispatch(qtyDecreaseAction(payload));
  }

  const onClickRemoveOrder = (product) => {
    const payload = {
      ...product
    }
    dispatch(removeOrderAction(payload));
  }

  const onClickNavigatePayment = () => {
    navigate("/payment");
  }

  const onChangeTitleSearch = (title) => {
    setTitleSearch(title.target.value);
  }

  const onSubmitTitleSearch = (event) => {
    event.preventDefault();
    setCategory(0);

    if (titleSearch == "") {
      navigate("/");
    } else {
      navigate({
        pathname: "",
        search: createSearchParams({
          title: titleSearch,
          ...(sort_by ? { sort_by } : {}),
          ...(sort_order ? { sort_order } : {})
        }).toString()
      });
    }
  }

  const onChangeSortOption = (sort) => {
    setCategory(0);
    setSortBy(sort.target.value);

    navigate({
      pathname: "",
      search: createSearchParams({
        ...(title ? { title } : {}),
        sort_by: sort.target.value,
        ...(sort_order ? { sort_order } : {})
      }).toString()
    });
  }

  const onClickSortSwap = (order) => {
    setCategory(0);
    setSortOrder(order);

    navigate({
      pathname: "",
      search: createSearchParams({
        ...(title ? { title } : {}),
        ...(sort_by ? { sort_by } : {}),
        sort_order: order
      }).toString()
    });
  }

  const onClickGetData = (category_id) => {
    setCategory(category_id);
    setSortBy("");
    setTitleSearch("");

    if (category_id != category) {
      if (category_id == 0) {
        navigate("/");
      } else {
        navigate({
          pathname: "",
          search: createSearchParams({
            category_id: category_id
          }).toString()
        });
      }
    }
  }

  const fetcher = (url, params) =>
    myAxios.get(url, { params: params }).then((response) => response.data);

  const products = useSWR((
    category_id
      ? [`/listproduct`, { category_id }]
      : [`/listproduct`, { title, sort_by, sort_order }]
  ), ([url, params]) => fetcher(url, params));

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <Content>
        <div id="grid-container" className=" h-[34rem] grid grid-cols-10 gap-12">
          {/* Product section */}
          <section className="col-start-1 col-end-7">
            {/* header div */}
            <div className="flex flex-row justify-between items-center h-8">
              <h1 className="text-2xl font-bold">Daftar Produk</h1>
              <div className="flex flex-row">
                <form onSubmit={(e) => onSubmitTitleSearch(e)} className="relative">
                  <input onChange={(e) => onChangeTitleSearch(e)} value={titleSearch} type="text" placeholder="Cari..."
                    className="h-8 mr-4 px-2 pb-1 rounded-md border border-orange-400 outline-orange-600 focus:placeholder-transparent" />
                  {titleSearch != "" ?
                    <button type="submit" className="absolute right-5 top-0.5 p-1">
                      <SearchIcon className="h-5 w-5 text-gray-600" />
                    </button> : null
                  }
                </form>
                <select onChange={(e) => onChangeSortOption(e)} value={sortBy} name="sort" id="sort"
                  className="h-8 mr-4 pb-1 pr-2 rounded-md border border-orange-400 outline-orange-600">
                  <option value="" disabled>Default</option>
                  <option value="title">Nama</option>
                  <option value="price">Harga</option>
                </select>
                <div
                  onClick={
                    sortOrder == "asc"
                      ? () => onClickSortSwap("desc")
                      : () => onClickSortSwap("asc")
                  }
                  className="h-8 w-10 rounded-md bg-orange-400 hover:cursor-pointer hover:bg-orange-500 duration-200">
                  {
                    sortOrder == "asc" ? (
                      <SortAsc className="h-inherit w-inherit text-white" />
                    ) : (
                      <SortDesc className="h-inherit w-inherit text-white" />
                    )
                  }
                </div>
              </div>
            </div>

            {/* product mapping div */}
            <div className="mt-4 h-[28rem] overflow-y-auto">
              <div className="flex flex-row flex-wrap gap-x-6 gap-y-6">
                {products?.data?.map((item) =>
                  <CardProduct productData={item} key={item.id} onClick={() => onClickAddOrder(item)} />
                )}
              </div>
            </div>

            {/* categories div */}
            <div className="mt-6">
              <ul className="flex flex-row justify-evenly">
                <li>
                  <button onClick={() => onClickGetData(0)}
                    className={`my-button ${category == 0 ? "category-active" : "category-inactive"}`} >
                    Semua
                  </button>
                </li>
                <li>
                  <button onClick={() => onClickGetData(1)}
                    className={`my-button ${category == 1 ? "category-active" : "category-inactive"}`}>
                    Makanan
                  </button>
                </li>
                <li>
                  <button onClick={() => onClickGetData(2)}
                    className={`my-button ${category == 2 ? "category-active" : "category-inactive"}`}>
                    Minuman
                  </button>
                </li>
                <li>
                  <button onClick={() => onClickGetData(3)}
                    className={`my-button ${category == 3 ? "category-active" : "category-inactive"}`}>
                    Snack
                  </button>
                </li>
              </ul>
            </div>
          </section>

          {/* Order section */}
          <section className="col-start-7 col-end-11 pl-4 border-l-4 border-orange-600">
            <div className="h-8">
              <h1 className="text-2xl font-bold">Daftar Pesanan</h1>
            </div>

            {/* transaction detail mapping div */}
            <div className="mt-4 h-[24rem] overflow-y-auto">
              <div className="flex flex-col gap-4 w-full text-center">
                {
                  orderData?.length > 0 ? (
                    orderData?.map((item) => (
                      <React.Fragment key={item.id}>
                        <CardOrderSmall
                          order={item}
                          qtyIncrease={() => onClickQtyIncrease(item)}
                          qtyDecrease={() => onClickQtyDecrease(item)}
                          removeOrder={() => onClickRemoveOrder(item)}
                        />
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      <p className="mt-32 text-xl">Anda belum membuat pesanan</p>
                      <p className="text-2xl">Ayo pesan sekarang!</p>
                    </>
                  )
                }
              </div>
            </div>

            {/* total & button div */}
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-row justify-between">
                <p className="text-2xl font-bold">Total</p>
                <p className="text-2xl font-bold">{toRupiah(amount)}</p>
              </div>
              <button onClick={orderData?.length > 0 ? () => onClickNavigatePayment() : null} 
                className={`my-button text-2xl font-bold 
                ${orderData?.length > 0 ? "order-enable" : "order-disable"}`}>
                BAYAR
              </button>
            </div>
          </section>
        </div>
      </Content>
    </>
  );
}

export default ProductPage;