function toRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
  }).format(price);
}

export default toRupiah;