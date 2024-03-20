import toRupiah from "../utils/Formatter";

function CardOrderBig({ order }) {
  return (
    <div className="h-40 w-full rounded-md border-b-2 border-gray-400 bg-white" >
      <div className="grid grid-cols-10 mt-2">
        <div className="col-span-2 h-32 w-32 mx-auto">
          <img className="object-fill h-inherit w-inherit rounded-md border border-orange-400"
            src={order.image} />
        </div>
        <div className="col-span-8 w-full flex flex-col gap-4 pr-4">
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-xl">{order.title}</p>
            <div className="flex flex-row gap-32">
              <p className="text-xl">{order.quantity}x</p>
              <p className="text-xl font-bold">{toRupiah(order.subtotal)}</p>
            </div>
          </div>
          <p className="text-xl font-bold">{toRupiah(order.price)}</p>
        </div>
      </div>
    </div>
  );
}

export default CardOrderBig;