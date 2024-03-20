import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BackIcon } from "../assets/Icons";
import { emptyStateAction } from "../store/reducers/orderSlice";
import CardOrderBig from "../components/CardOrderBig";
import Content from "../layouts/Content";
import myAxios from "../utils/axios";
import toRupiah from "../utils/Formatter";

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pay, setPay] = useState(0);

  const { orderData, amount } = useSelector((state) => state.order);

  const onClickNavigateHome = () => {
    navigate("/");
  }

  const onClickCreateOrder = () => {
    const transaction_details = [];

    orderData.forEach((item) => {
      const detail = {
        product_id: item.id,
        quantity: item.quantity,
        subtotal: item.subtotal
      };

      transaction_details.push(detail);
    });

    const payload = {
      total_amount: amount,
      total_pay: pay,
      transaction_details
    };
    
    myAxios.post(`/addtransaction`, payload)
      .then((response) => {
        console.log(response.data);
        dispatch(emptyStateAction());
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Content className="relative">
        <div onClick={() => onClickNavigateHome()}>
          <BackIcon className="absolute w-10 h-10 top-2 left-8 hover:cursor-pointer hover:scale-105 duration-200" />
        </div>
        <div id="grid-container" className=" h-[34rem] grid grid-cols-10 gap-12">
          {/* Order section */}
          <section className="col-start-1 col-end-7">
            {/* header div */}
            <div className="h-8">
              <h1 className="text-2xl font-bold">Rincian Pesanan</h1>
            </div>

            {/* order mapping div */}
            <div className="mt-4 h-[32rem] overflow-y-auto ">
              <div className="flex flex-col gap-4 pr-2">
                {orderData?.map((item) =>
                  <CardOrderBig order={item} key={item.id} />
                )}
              </div>
            </div>
          </section>

          {/* Payment section */}
          <section className="col-start-7 col-end-11 pl-4 border-l-4 border-orange-600">
            <div className="h-8">
              <h1 className="text-2xl font-bold">Pembayaran</h1>
            </div>

            {/* payment detail div */}
            <div className="mt-4 h-[24rem]">
              <div className="flex flex-row justify-between py-4">
                <p className="text-2xl font-bold">Total</p>
                <p className="text-2xl font-bold">{toRupiah(amount)}</p>
              </div>

              <div className="flex flex-col gap-4 mt-8 py-6">
                <label htmlFor="user-pay" className="text-2xl font-bold">Dibayar</label>
                <div className="flex flex-row gap-2">
                  <span className="text-2xl">Rp</span>
                  <input onChange={(e) => setPay(e.target.value)} type="number"
                    className="h-10 w-full rounded-md border border-gray-400 outline-gray-600 text-xl pb-1" />
                </div>
              </div>

              <div className="flex flex-row justify-between mt-8 py-6">
                <p className="text-2xl font-bold">Kembalian</p>
                <p className="text-2xl font-bold">{pay >= amount ? toRupiah(pay - amount) : "Rp -"}</p>
              </div>
            </div>

            {/* total & button div */}
            <div className="flex flex-col gap-4 mt-20">
              <button onClick={pay >= amount ? () => onClickCreateOrder() : null}
                className={`my-button text-2xl font-bold 
                ${pay >= amount ? "order-enable" : "order-disable"}`}>
                SELESAIKAN
              </button>
            </div>
          </section>
        </div>
      </Content>
    </>
  )
}

export default PaymentPage;