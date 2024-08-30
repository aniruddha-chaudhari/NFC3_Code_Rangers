import React, { useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className='bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-xl drop-shadow-md mb-8'>
      <div className='relative mb-6'>
        <input
          type='text'
          placeholder='Search...'
          className='bg-white text-black placeholder-gray-900 bg-opacity-40 rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-md shadow-lg transition-transform duration-300 transform hover:scale-105'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
        />
        <Search className='absolute top-2.5 left-3 h-5 w-5 text-gray-500' />
      </div>
      
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-300 border border-transparent rounded-xl overflow-hidden bg-white backdrop-blur-md shadow-lg transition-transform duration-500'>
          <thead className='bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-all duration-300'
                  >
                    {header.isPlaceholder ? null : (
                      <div className='flex items-center space-x-2'>
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
              <tr key={row.id} className='transition-transform duration-300 hover:scale-105'>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-all duration-300'
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
            disabled={!table.getCanPreviousPage()}
            className='bg-opacity-30 backdrop-blur-lg border border-transparent hover:border-blue-500 text-gray-100 bg-blue-600 hover:bg-blue-500 rounded-full p-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl'
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className='h-6 w-6 text-white' />
          </button>
          <div className='mt-2 text-gray-600'>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <button
            disabled={!table.getCanNextPage()}
            className='bg-opacity-30 backdrop-blur-lg border border-transparent hover:border-blue-500 text-gray-100 bg-blue-600 hover:bg-blue-500 rounded-full p-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl'
            onClick={() => table.nextPage()}
          >
            <ChevronRight className='h-6 w-6 text-white' />
          </button>
        </div>
      </div>
    </div>
  );
}
