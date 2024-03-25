import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import TanstackTable from "../components/TanstackTable";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import toRupiah from "../utils/Formatter";
import { BackIcon } from "../assets/Icons";

function TransactionDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const fetcher = (url) => myAxios.get(url).then((response) => response.data);

  const transactionDetails = useSWR(`/listtransaction/${id}`, fetcher);

  const onClickNavigateTransaction = () => {
    navigate("./..");
  }

  const columns = [
    {
      header: "ID Produk",
      accessorKey: "product_id",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Nama Produk",
      accessorKey: "product_title",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Harga Satuan",
      accessorKey: "product_price",
      cell: (info) => (
        <div className="text-center">
          <span>{toRupiah(info.getValue())}</span>
        </div>
      )
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: (info) => (
        <div className="text-center">
          <span>{info.getValue()}</span>
        </div>
      )
    },
    {
      header: "Subtotal",
      accessorKey: "subtotal",
      cell: (info) => (
        <div className="text-center">
          <span>{toRupiah(info.getValue())}</span>
        </div>
      )
    }
  ];

  return (
    <>
      <Content className="relative">
        <div onClick={() => onClickNavigateTransaction()}>
          <BackIcon className="absolute w-10 h-10 top-2 left-8 hover:cursor-pointer hover:scale-105 duration-200" />
        </div>
        <div id="container" className="h-[34rem]">
          {/* Transaction detail section */}
          <section>
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Detail Transaksi</h1>
            </div>

            {/* detail div */}
            <div className="h-56 mt-4 border-t-2 border-gray-600">
              <div className="grid grid-cols-10 w-[36rem] leading-8 pt-10">
                <div className="flex flex-col col-span-3">
                  <p>ID Transaksi</p>
                  <p>Tanggal Transaksi</p>
                  <p>Total Harga</p>
                  <p>Total Bayar</p>
                </div>
                <div className="flex flex-col col-span-1 text-right px-1">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                {!transactionDetails.isLoading ? (
                  <div className="flex flex-col col-span-6 px-1">
                    <p>{transactionDetails.data.id}</p>
                    <p>{transactionDetails.data.transaction_date.substring(0, 10)}</p>
                    <p>{transactionDetails.data.total_amount}</p>
                    <p>{transactionDetails.data.total_pay}</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* transaction detail table div */}
            {!transactionDetails.isLoading ? (
            <div className="mt-4 h-64">
              <TanstackTable tableData={transactionDetails.data.transaction_details} tableColumns={columns} />
            </div>
            ) : null}

          </section>
        </div>
      </Content>
    </>
  );
}

export default TransactionDetailPage;