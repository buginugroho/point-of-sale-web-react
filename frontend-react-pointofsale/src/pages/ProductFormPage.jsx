import { useEffect } from "react";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import { BackIcon } from "../assets/Icons";

function ProductFormPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  // yup schema
  const schema = yup.object().shape({
    title: yup.string().required("Masukkan nama"),
    category: yup.string().required("Pilih kategori"),
    image: yup.string().required("Masukkan URL gambar").url("Format harus URL"),
    price: yup.number().positive("Nominal harus positif").typeError("Masukkan harga")
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  if (isEdit) {
    const fetcher = (url) => myAxios.get(url).then((response) => response.data);

    const { data: product, error } = useSWR(`/detailproduct/${id}`, fetcher);

    useEffect(() => {
      setValue("title", product?.title),
        setValue("category", product?.category_id),
        setValue("image", product?.image),
        setValue("price", product?.price)
    }, [product]);
  }

  const onClickNavigateAdmin = () => {
    navigate("/admin");
  }

  const onSubmitForm = async (data) => {
    const payload = {
      title: data?.title,
      category_id: data?.category,
      image: data?.image,
      price: data?.price
    }

    if (isEdit) {
      myAxios.put(`/updateproduct/${id}`, payload)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Produk berhasil diperbarui",
            confirmButtonText: "Selesai",
            confirmButtonColor: "#3b82f6"
          })
            .then((result) => {
              if (result.isConfirmed) {
                navigate("/admin");
              }
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal...",
            text: error.response.data.message
          })
        });
    } else {
      myAxios.post(`/addproduct`, payload)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Produk berhasil ditambahkan",
            confirmButtonText: "Selesai",
            confirmButtonColor: "#3b82f6"
          })
            .then((result) => {
              if (result.isConfirmed) {
                navigate("/admin");
              }
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal...",
            text: error.response.data.message
          })
        });
    }
  }

  return (
    <>
      <Content className="relative">
        <div onClick={() => onClickNavigateAdmin()}>
          <BackIcon className="absolute w-10 h-10 top-2 left-8 hover:cursor-pointer hover:scale-105 duration-200" />
        </div>
        <div id="container" className="h-[34rem]">
          {/* Product Form section */}
          <section>
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Form Produk</h1>
            </div>

            {/* form div */}
            <div className="mt-4 h-[28rem] border-t-2 border-gray-600">
              <div className="pt-10 w-[32rem]">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="relative flex flex-col gap-1">
                    <label className="text-xl font-medium" htmlFor="title">Nama Produk</label>
                    <input type="text" id="name"
                      className="h-8 px-2 pb-1 text-xl rounded-md border border-gray-600 outline-gray-600"
                      {...register("title")} />
                    <p className="absolute -bottom-6 text-red-500">{errors.title?.message}</p>
                  </div>

                  <div className="relative flex flex-col gap-1 mt-6">
                    <label className="text-xl font-medium" htmlFor="category">Kategori Produk</label>
                    <select id="category"
                      className="h-8 px-2 pb-1 text-xl rounded-md border border-gray-600 outline-gray-600"
                      {...register("category")}>
                      <option value=''>Pilih kategori</option>
                      <option value='1'>Makanan</option>
                      <option value='2'>Minuman</option>
                      <option value='3'>Snack</option>
                    </select>
                    <p className="absolute -bottom-6 text-red-500">{errors.category?.message}</p>
                  </div>

                  <div className="relative flex flex-col gap-1 mt-6">
                    <label className="text-xl font-medium" htmlFor="image">URL Gambar</label>
                    <input type="text" id="image"
                      className="h-8 px-2 pb-1 text-xl rounded-md border border-gray-600 outline-gray-600"
                      {...register("image")} />
                    <p className="absolute -bottom-6 text-red-500">{errors.image?.message}</p>
                  </div>

                  <div className="relative flex flex-col gap-1 mt-6">
                    <label className="text-xl font-medium" htmlFor="price">Harga Satuan</label>
                    <div className="flex flex-row gap-2">
                      <span className="text-xl">Rp</span>
                      <input type="number" id="price"
                        className="h-8 w-full px-2 pb-1 text-xl rounded-md border border-gray-600 outline-gray-600"
                        {...register("price")} />
                      <p className="absolute -bottom-6 text-red-500">{errors.price?.message}</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <button type="submit" className="my-button w-full text-white font-medium hover:bg-orange-600 duration-200">
                      {isEdit ? "Edit" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </section>
        </div>
      </Content>
    </>
  );
}

export default ProductFormPage;