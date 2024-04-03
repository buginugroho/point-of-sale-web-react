import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";

function TanstackTable({ tableData, tableColumns }) {

  const table = useReactTable({
    data: tableData ? tableData : [],
    columns: tableColumns ? tableColumns : [],
    initialState: {
      pagination: {
        pageSize: 8
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div>
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

      <div className="flex flex-row justify-end gap-2 font-medium">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className={`${!table.getCanPreviousPage()
            ? "text-gray-400" : "text-gray-600"}`}>
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`${!table.getCanPreviousPage()
            ? "text-gray-400" : "text-gray-600"}`}>
          {'<'}
        </button>
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`${!table.getCanNextPage()
            ? "text-gray-400" : "text-gray-600"}`}>
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className={`${!table.getCanNextPage()
            ? "text-gray-400" : "text-gray-600"}`}>
          {'>>'}
        </button>
      </div>
    </div>
  );
}

export default TanstackTable;