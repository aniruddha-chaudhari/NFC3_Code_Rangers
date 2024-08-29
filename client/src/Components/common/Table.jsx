import React, { useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Search } from 'lucide-react';




export default function BasicTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 drop-shadow-md mb-8'>
      <div className='relative mb-6'>
        <input
          type='text'
          placeholder='Search...'
          className='bg-white text-black placeholder-gray-900 bg-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
        />
        <Search className='absolute top-2.5 left-2.5 h-5 w-5 text-gray-500' />
      </div>
      

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-300'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: '🔼', desc: '🔽' }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className='divide-y divide-slate-300'>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className='px-6 py-4 whitespace-nowrap text-sm font-medium text-black'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col items-center mt-4'>
  <div className='flex space-x-2 justify-center'>
    <button
      className='text-gray-100 bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2'
      onClick={() => table.setPageIndex(0)}
    >
      First page
    </button>
    <button
      disabled={!table.getCanPreviousPage()}
      className='text-gray-100 bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2'
      onClick={() => table.previousPage()}
    >
      Previous page
    </button>
    <div className='mt-2 text-gray-600'>
    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
  </div>
    <button
      disabled={!table.getCanNextPage()}
      className='text-gray-100 bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2'
      onClick={() => table.nextPage()}
    >
      Next page
    </button>
    <button
      className='text-gray-100 bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2'
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
    >
      Last page
    </button>
  </div>
</div>
    </div>
  );
}
