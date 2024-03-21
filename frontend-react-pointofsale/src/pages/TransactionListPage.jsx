import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TanstackTable from "../components/TanstackTable";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import toRupiah from "../utils/Formatter";

function TransactionListPage() {
  const navigate = useNavigate();

  const fetcher = (url) => myAxios.get(url).then((response) => response.data);

  const transactions = useSWR(`/listtransaction`, fetcher);

  const onClickNavigateTransactionDetail = (id) => {
    navigate(`./${id}`);
  }

  const columns = [
    {
      header: "Tanggal Transaksi",
      accessorKey: "transaction_date",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue().substring(0, 10)}</span>
        </div>
      )
    },
    {
      header: "ID Transaksi",
      accessorKey: "id",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Total Harga",
      accessorKey: "total_amount",
      cell: (info) => (
        <div className="text-center">
          <span>{toRupiah(info.getValue())}</span>
        </div>
      )
    },
    {
      header: "Total Bayar",
      accessorKey: "total_pay",
      cell: (info) => (
        <div className="text-center">
          <span>{toRupiah(info.getValue())}</span>
        </div>
      )
    },
    {
      header: "Action",
      cell: (props) => (
        <div className="text-center">
          {console.log(props.row.original)}
          <button
            onClick={() => onClickNavigateTransactionDetail(props.row.original?.id)}
            className="my-button w-40 text-white font-medium hover:bg-orange-600">
            Detail Transaksi
          </button>
        </div>
      )
    }
  ];

  if (!transactions.isLoading) return (
    <>
      <Sidebar />
      <Content>
        <div id="container" className="h-[34rem]">
        {/* Transaction section */}
          <section>
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
            </div>

            {/* transaction table div */}
            <div className="mt-4 h-[28rem]">
              <TanstackTable tableData={transactions.data} tableColumns={columns}/>
            </div>
          </section>
        </div>
      </Content>
    </>
  )
};

export default TransactionListPage;