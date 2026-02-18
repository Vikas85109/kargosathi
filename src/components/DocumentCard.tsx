import { FileText, Download, Eye } from 'lucide-react';

interface Props {
  title: string;
  fileName: string;
  status?: 'verified' | 'pending' | 'rejected';
  onView?: () => void;
}

export default function DocumentCard({ title, fileName, status, onView }: Props) {
  const statusColor = status === 'verified'
    ? 'text-emerald-600 bg-emerald-50'
    : status === 'rejected'
    ? 'text-red-600 bg-red-50'
    : 'text-amber-600 bg-amber-50';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
          <FileText size={20} className="text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="text-xs text-slate-400 truncate">{fileName}</p>
          {status && (
            <span className={`inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={onView}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Eye size={15} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <Download size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
