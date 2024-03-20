import { DeleteIcon } from '../assets/Icons';
import toRupiah from '../utils/Formatter';

function CardOrderSmall({ order, qtyIncrease, qtyDecrease, removeOrder }) {
  return (
    <div className='w-full py-2 px-2 bg-white rounded-md border-b-2 border-gray-400 '>
      <div className='flex flex-row justify-between items-start'>
        {/* title div */}
        <div className='flex flex-row items-center gap-2'>
          <div className='hover:cursor-pointer' onClick={removeOrder}>
            <DeleteIcon />
          </div>
          <p className='text-lg'>{order.title}</p>
        </div>

        {/* price & quantity div */}
        <div className='flex flex-col items-end'>
          <p className='text-lg font-bold'>{toRupiah(order.price)}</p>
          <div className='flex flex-row gap-2'>
            <div className='h-4 w-4 rounded-full border border-gray-600 text-center my-auto leading-3 hover:cursor-pointer'
              onClick={qtyDecrease}> - </div>
            <p>{order.quantity}x</p>
            <div className='h-4 w-4 rounded-full border border-gray-600 text-center my-auto leading-3 hover:cursor-pointer'
              onClick={qtyIncrease}> + </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardOrderSmall;