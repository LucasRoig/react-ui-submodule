"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  Row,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { cn } from "@lro-ui/utils"
import { DataTablePagination } from "./pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  stickyHeader?: boolean
  rowSelectionModel?: {
    rowSelection: RowSelectionState,
    setRowSelection: OnChangeFn<RowSelectionState>,
    enableRowSelection?: (row: Row<TData>) => boolean
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  stickyHeader = true,
  ...props
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 1,
        pageSize: 50
      }
    },
    state: {
      rowSelection: props.rowSelectionModel?.rowSelection,
    },
    onRowSelectionChange: props.rowSelectionModel?.setRowSelection,
    enableRowSelection: props.rowSelectionModel?.enableRowSelection !== undefined ? props.rowSelectionModel.enableRowSelection : props.rowSelectionModel !== undefined,
  })

  return (
    <div>
      <div className="rounded-md border overflow-auto">
        <Table className="relative overflow-auto max-h-full">
          <TableHeader className={cn("z-20", stickyHeader && "sticky top-0")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-auto">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
