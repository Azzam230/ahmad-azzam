export function DataTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <figure className="my-8 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-card">
      {caption && (
        <figcaption className="border-b border-zinc-100 px-5 py-3 text-xs font-bold text-zinc-500">
          {caption}
        </figcaption>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-right">
          <thead>
            <tr className="bg-zinc-50">
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-5 py-3.5 text-xs font-black text-zinc-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 1 ? "bg-zinc-50/50" : "bg-white"}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-5 py-3.5 text-sm leading-relaxed text-zinc-600"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
