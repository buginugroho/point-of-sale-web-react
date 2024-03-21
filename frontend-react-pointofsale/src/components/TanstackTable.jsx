import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";

function TanstackTable({ tableData, tableColumns }) {

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <table className="w-full">
      <thead>
        {
          table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {
                headerGroup.headers.map(header => (
                  <th key={header.id} className="py-2 border-b-2 border-gray-600">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      <tbody>
        {
          table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr key={row.id}>
                {
                  row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={`py-2 ${i == 0 ? "pt-4" : ""} ? `}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))
                }
              </tr>
            ))
          ) : null
        }
      </tbody>
    </table>
  );
}

export default TanstackTable;