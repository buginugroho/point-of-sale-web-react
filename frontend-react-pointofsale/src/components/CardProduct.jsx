import toRupiah from "../utils/Formatter"

function CardProduct({ productData, onClick }) {
	return (
		<div className='w-40 rounded-lg border border-orange-400 bg-white' onClick={onClick}>
			<div className='h-36 w-36 mt-2 mx-auto'>
				<img className='h-inherit w-inherit rounded-md border border-orange-400'
					src={productData.image} alt="" />
			</div>
			<div className='text-center my-1'>
				<p >{productData.title}</p>
				<p className='font-bold'>{toRupiah(productData.price)}</p>
			</div>
		</div>
	);
}

export default CardProduct;