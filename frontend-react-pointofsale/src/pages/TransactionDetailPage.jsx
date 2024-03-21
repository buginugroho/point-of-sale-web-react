import { useParams } from "react-router-dom";

function TransactionDetailPage() {

  const {id} = useParams();

  return (
    <>
      <h1>Hello from transaction detail</h1>
      <h1>Transaction: {id}</h1>
    </>
  );
}

export default TransactionDetailPage;