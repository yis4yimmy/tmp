import { ReactNode } from "react";

export interface TableColumn<DataType> {
  id: string;
  label: string;
  render: (props: { colId: string } & DataType) => ReactNode;
  colspan?: number;
  className?: string;
}

export interface TableProps<DataType> {
  columns: TableColumn<DataType>[];
  data: DataType[];
}

export default function Table<DataType extends { id: string }>({
  columns,
  data,
}: TableProps<DataType>) {
  return (
    <table className="border-collapse table-auto w-full">
      <colgroup>
        {columns.map(({ id, colspan, className }) => (
          <col key={id} span={colspan} className={className} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map(({ id, label }) => (
            <th
              className="bg-slate-200 border border-slate-500 px-4 py-2 text-left"
              key={id}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map(({ id: colId, render }) => (
                <td
                  className="border border-slate-500 px-4 py-2 text-left"
                  key={`${colId}-${row.id}`}
                >
                  {render({ colId, ...row })}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="border border-slate-500 px-4 py-2 text-center"
              colSpan={2}
            >
              No Cached Data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
