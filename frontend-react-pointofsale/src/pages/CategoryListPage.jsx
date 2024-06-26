import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import TanstackTable from "../components/TanstackTable";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";

function CategoryListPage() {
  const navigate = useNavigate();

  const fetcher = (url) => myAxios.get(url).then((response) => response.data);

  const categories = useSWR(`/listcategory`, fetcher);

  const onClickNavigateCategoryDetail = (id) => {
    navigate(`./${id}`);
  }

  const onClickNavigateFormAdd = () => {
    navigate(`./newCategory`);
  }

  const onClickNavigateFormEdit = (id) => {
    navigate(`./newCategory/${id}`);
  }

  const onClickDeleteCategory = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Lanjut hapus kategori?",
      text: "Kategori akan terhapus permanen",
      confirmButtonText: "Hapus",
      confirmButtonColor: "#ef4444",
      showCancelButton: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          myAxios.delete(`/deletecategory/${id}`)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Kategori berhasil dihapus",
                timerProgressBar: true,
                timer: 2000
              })
              categories.mutate();
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
      header: "ID Kategori",
      accessorKey: "category_id",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Nama Kategori",
      accessorKey: "category_name",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Jumlah Produk Terkait",
      accessorKey: "total_products",
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
            onClick={() => onClickNavigateCategoryDetail(props.row.original?.category_id)}
            className="my-button text-white font-medium hover:bg-orange-600">
            Detail
          </button>
          <button
            onClick={() => onClickNavigateFormEdit(props.row.original?.category_id)}
            className="my-button text-white font-medium bg-blue-500 border-blue-500 hover:bg-blue-600">
            Edit
          </button>
          <button
            onClick={() => onClickDeleteCategory(props.row.original?.category_id)}
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
          {/* Category section */}
          <section>
            {/* header div */}
            <div className="flex flex-row justify-between h-8">
              <h1 className="text-2xl font-bold">Daftar Kategori</h1>
              <button
                onClick={() => onClickNavigateFormAdd()}
                className="my-button w-36 text-white font-medium hover:bg-orange-600 duration-200">
                Tambah Kategori
              </button>
            </div>

            {/* product table div */}
            {!categories.isLoading ? (
              <div className="mt-4 h-[28rem]">
                <TanstackTable tableData={categories.data} tableColumns={columns} />
              </div>
            ) : null}

          </section>
        </div>
      </Content>
    </>
  );
}

export default CategoryListPage;