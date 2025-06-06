import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-1 rounded border text-sm disabled:opacity-50"
      >
        <HiChevronLeft className="w-5 h-5" />
        <span>Prev</span>
      </button>
      <span className="text-sm">{`Page ${page} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-3 py-1 rounded border text-sm disabled:opacity-50"
      >
        <span>Next</span>
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
