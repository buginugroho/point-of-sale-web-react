import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import TanstackTable from "../components/TanstackTable";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import toRupiah from "../utils/Formatter";

function ProductListPage() {
  const navigate = useNavigate();

  const fetcher = (url) => myAxios.get(url).then((response) => response.data);

  const products = useSWR(`/listproduct`, fetcher);

  const onClickNavigateProductDetail = (id) => {
    navigate(`./product/${id}`);
  }

  const onClickNavigateFormAdd = () => {
    navigate(`./newProduct`);
  }

  const onClickNavigateFormEdit = (id) => {
    navigate(`./newProduct/${id}`);
  }

  const onClickDeleteProduct = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Lanjut hapus produk?",
      text: "Produk akan terhapus permanen",
      confirmButtonText: "Hapus",
      confirmButtonColor: "#ef4444",
      showCancelButton: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          myAxios.delete(`/deleteproduct/${id}`)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Produk berhasil dihapus",
                timerProgressBar: true,
                timer: 2000
              })
              products.mutate();
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Gagal...",
                text: error.response.data.message
              })
            });
        }
      });
  }

  const columns = [
    {
      header: "ID Produk",
      accessorKey: "id",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Nama Produk",
      accessorKey: "title",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Harga Satuan",
      accessorKey: "price",
      cell: (info) => (
        <div className="text-center">
          <span>{toRupiah(info.getValue())}</span>
        </div>
      )
    },
    {
      header: "Kategori",
      accessorKey: "category_name",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Action",
      cell: (props) => (
        <div className="flex flex-row justify-center gap-2">
          <button
            onClick={() => onClickNavigateProductDetail(props.row.original?.id)}
            className="my-button text-white font-medium hover:bg-orange-600">
            Detail
          </button>
          <button
            onClick={() => onClickNavigateFormEdit(props.row.original?.id)}
            className="my-button text-white font-medium bg-blue-500 border-blue-500 hover:bg-blue-600">
            Edit
          </button>
          <button
            onClick={() => onClickDeleteProduct(props.row.original?.id)}
            className="my-button text-white font-medium bg-red-500 border-red-500 hover:bg-red-600">
            Hapus
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <Sidebar />
      <Content>
        <div id="container" className="h-[34rem]">
          {/* Prodcut section */}
          <section>
            {/* header div */}
            <div className="flex flex-row justify-between h-8">
              <h1 className="text-2xl font-bold">Daftar Produk</h1>
              <button
                onClick={() => onClickNavigateFormAdd()}
                className="my-button w-36 text-white font-medium hover:bg-orange-600 duration-200">
                Tambah Produk
              </button>
            </div>

            {/* product table div */}
            {!products.isLoading ? (
              <div className="mt-4 h-[28rem]">
                <TanstackTable tableData={products.data} tableColumns={columns} />
              </div>
            ) : null}

          </section>
        </div>
      </Content>
    </>
  );
}

export default ProductListPage;