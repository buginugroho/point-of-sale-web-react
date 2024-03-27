import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import toRupiah from "../utils/Formatter";
import { BackIcon } from "../assets/Icons";

function ProductDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const fetcher = (url) => myAxios.get(url).then((response) => response.data);

  const product = useSWR(`/detailproduct/${id}`, fetcher);

  const onClickNavigateAdmin = () => {
    navigate("/admin");
  }

  return (
    <>
      <Content className="relative">
        <div onClick={() => onClickNavigateAdmin()}>
          <BackIcon className="absolute w-10 h-10 top-2 left-8 hover:cursor-pointer hover:scale-105 duration-200" />
        </div>
        <div id="container" className="h-[34rem]">
          {/* Product detail section */}
          <section>
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Detail Produk</h1>
            </div>

            {/* detail div */}
            <div className="h-56 mt-4 border-t-2 border-gray-600">
              <div className="grid grid-cols-12 leading-8 pt-10">
                <div className="flex flex-col col-span-1">
                  <p>ID Produk</p>
                  <p>Nama Produk</p>
                  <p>Harga Satuan</p>
                  <p>URL Gambar</p>
                  <p>ID Kategori</p>
                  <p>Nama Kategori</p>
                </div>
                <div className="flex flex-col col-span-1 text-right px-1">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                {!product.isLoading ? (
                  <>
                    <div className="flex flex-col col-span-7 px-1">
                      <p>{product.data.id}</p>
                      <p>{product.data.title}</p>
                      <p>{toRupiah(product.data.price)}</p>
                      <p>{product.data.image}</p>
                      <p>{product.data.category_id}</p>
                      <p>{product.data.category_name}</p>
                    </div>

                    <div className="col-span-3">
                      <img src={product.data.image}
                        className="mx-auto h-72 w-72 rounded-md border-2 border-orange-400" />
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

export default ProductDetailPage;