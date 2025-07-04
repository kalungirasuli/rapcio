import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export interface DataTableColumn<T> {
  key: keyof T | "actions"; // Allow "actions" as a valid key
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchKeys: (keyof T)[];
  entriesPerPageOptions?: number[];
}

const DataTable = <T,>({
  data,
  columns,
  searchKeys,
  entriesPerPageOptions = [5, 10, 15, 20],
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(entriesPerPageOptions[0]);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  // Filter data based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredData(
      data.filter((item) =>
        searchKeys.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(lowercasedQuery)
        )
      )
    );
  }, [searchQuery, data, searchKeys]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset current page when entries per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [entriesPerPage]);

  return (
    <div>
      {/* Search and Entries Per Page */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center py-1 px-2 border border-label dark:border-labelDark rounded max-w-[12rem]">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 border-none bg-transparent placeholder-label dark:placeholder-labelDark rounded-md focus:outline-none focus:ring-0 w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="ml-2"
            >
              <MdClose />
            </button>
          )}
        </div>
        <div>
          <label htmlFor="entries" className="mr-2">
            Entries:
          </label>
          <select
            id="entries"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="p-1.5 border border-label dark:border-labelDark focus:ring-0 rounded bg-card dark:bg-cardDark text-sm"
            >
            {entriesPerPageOptions.map((option) => (
              <option key={option} value={option} className="bg-card dark:bg-cardDark"> 
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-muted dark:border-mutedDark">
          <thead>
            <tr className="bg-muted dark:bg-mutedDark text-nowrap">
              {columns.map((col) => (
                <th key={String(col.key)} className="p-2 border border-muted dark:border-mutedDark">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-2 text-center">
                  Sorry, no results found!
                </td>
              </tr>
            ) : (
              displayedData.map((row, index) => (
                <tr key={index} className="text-left text-nowrap">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="p-2 border border-muted dark:border-mutedDark text-nowrap">
                      {col.render
                        ? col.render(row[col.key as keyof T], row)
                        : typeof row[col.key as keyof T] === "string" ||
                          typeof row[col.key as keyof T] === "number" ||
                          typeof row[col.key as keyof T] === "boolean"
                        ? String(row[col.key as keyof T]) // Convert primitive types to string
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded font-medium ${
            currentPage === 1
              ? "bg-muted dark:bg-mutedDark"
              : "bg-primary dark:bg-primaryDark hover:bg-primaryHover dark:hover:bg-primaryDarkHover text-white"
          }`}
        >
          Previous
        </button>
        <p className="text-sm">
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded font-medium ${
            currentPage === totalPages
              ? "bg-muted dark:bg-mutedDark"
              : "bg-primary dark:bg-primaryDark hover:bg-primaryHover dark:hover:bg-primaryDarkHover text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
