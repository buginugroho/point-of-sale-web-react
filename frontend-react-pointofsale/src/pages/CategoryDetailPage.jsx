import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import { BackIcon } from "../assets/Icons";

function CategoryDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const fetcher = (url) => myAxios.get(url).then((response) => response.data);

  const category = useSWR(`/detailcategory/${id}`, fetcher);

  const onClickNavigateCategory = () => {
    navigate("/category");
  }

  return (
    <>
      <Content className="relative">
        <div onClick={() => onClickNavigateCategory()}>
          <BackIcon className="absolute w-10 h-10 top-2 left-8 hover:cursor-pointer hover:scale-105 duration-200" />
        </div>
        <div id="container" className="h-[34rem]">
          {/* Category detail section */}
          <section>
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Detail Produk</h1>
            </div>

            {/* detail div */}
            <div className="h-56 mt-4 border-t-2 border-gray-600">
              <div className="grid grid-cols-12 leading-8 pt-10">
                <div className="flex flex-col col-span-2">
                  <p>ID Kategori</p>
                  <p>Nama Kategori</p>
                  <p>Jumlah Produk Terkait</p>
                </div>
                <div className="flex flex-col col-span-1 text-right px-1">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                {!category.isLoading ? (
                  <>
                    <div className="flex flex-col col-span-7 px-1">
                      <p>{category.data.category_id}</p>
                      <p>{category.data.category_name}</p>
                      <p>{category.data.total_products}</p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </Content>
    </>
  );
}

export default CategoryDetailPage;