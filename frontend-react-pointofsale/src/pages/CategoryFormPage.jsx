import { useEffect } from "react";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import { BackIcon } from "../assets/Icons";

function CategoryFormPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  // yup schema
  const schema = yup.object().shape({
    category_name: yup.string().required("Masukkan nama kategori")
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

    const { data: category, error } = useSWR(`/detailcategory/${id}`, fetcher);

    useEffect(() => {
      setValue("category_name", category?.category_name)
    }, [category]);
  }

  const onClickNavigateCategory = () => {
    navigate("/category");
  }

  const onSubmitForm = async (data) => {
    const payload = {
      category_name: data?.category_name
    }

    if (isEdit) {
      myAxios.put(`/updatecategory/${id}`, payload)
        .then(() => {
          alert("Kategori berhasil diupdate!");
          navigate("/category");
        })
        .catch((error) => console.log(error));
    } else {
      myAxios.post(`/addcategory`, payload)
        .then(() => {
          alert("Kategori berhasil ditambahkan!");
          navigate("/category");
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <Content className="relative">
        <div onClick={() => onClickNavigateCategory()}>
          <BackIcon className="absolute w-10 h-10 top-2 left-8 hover:cursor-pointer hover:scale-105 duration-200" />
        </div>
        <div id="container" className="h-[34rem]">
          {/* Category Form section */}
          <section>
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Form Kategori</h1>
            </div>

            {/* form div */}
            <div className="mt-4 h-[28rem] border-t-2 border-gray-600">
              <div className="pt-10 w-[32rem]">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="relative flex flex-col gap-1">
                    <label className="text-xl font-medium" htmlFor="title">Nama Produk</label>
                    <input type="text" id="category_name"
                      className="h-8 px-2 pb-1 text-xl rounded-md border border-gray-600 outline-gray-600"
                      {...register("category_name")} />
                    <p className="absolute -bottom-6 text-red-500">{errors.category_name?.message}</p>
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

export default CategoryFormPage;