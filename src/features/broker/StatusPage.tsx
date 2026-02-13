import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBroker } from '../../context/BrokerContext';
import StatusBadge from '../../components/StatusBadge';
import type { AppStatus } from '../../types';

/* ---- Status flow order for the timeline ---- */
const timelineSteps = [
  { key: 'submitted', label: 'Submitted', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key: 'under_review', label: 'Under Review', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { key: 'approved', label: 'Decision', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
] as const;

function getStepState(stepKey: string, appStatus: AppStatus): 'done' | 'active' | 'upcoming' {
  const order: Record<string, number> = { submitted: 0, under_review: 1, approved: 2, rejected: 2, correction_required: 2 };
  const currentIdx = order[appStatus] ?? 0;
  const stepIdx = order[stepKey] ?? 0;

  if (stepIdx < currentIdx) return 'done';
  if (stepIdx === currentIdx) return 'active';
  return 'upcoming';
}

const statusMessages: Record<string, { title: string; desc: string; color: string; emoji: string }> = {
  submitted:           { title: 'Application Submitted',  desc: 'Your application has been received. Our admin team will start reviewing it shortly.', color: 'blue', emoji: '\uD83D\uDCE8' },
  under_review:        { title: 'Under Review',           desc: 'An admin is currently reviewing your documents and business details.',                color: 'amber', emoji: '\uD83D\uDD0D' },
  approved:            { title: 'Congratulations!',        desc: 'Your broker application has been approved! You now have full dashboard access.',       color: 'emerald', emoji: '\uD83C\uDF89' },
  rejected:            { title: 'Application Rejected',   desc: 'Unfortunately your application could not be approved. See admin remarks below.',      color: 'red', emoji: '\u274C' },
  correction_required: { title: 'Corrections Needed',     desc: 'The admin has flagged items that need updating. Please make corrections and resubmit.', color: 'orange', emoji: '\u270F\uFE0F' },
};

const colorClasses: Record<string, { bg: string; border: string; title: string; text: string; iconBg: string }> = {
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    title: 'text-blue-800',    text: 'text-blue-700',    iconBg: 'bg-blue-100' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   title: 'text-amber-800',   text: 'text-amber-700',   iconBg: 'bg-amber-100' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-800', text: 'text-emerald-700', iconBg: 'bg-emerald-100' },
  red:     { bg: 'bg-red-50',     border: 'border-red-200',     title: 'text-red-800',     text: 'text-red-700',     iconBg: 'bg-red-100' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  title: 'text-orange-800',  text: 'text-orange-700',  iconBg: 'bg-orange-100' },
};

export default function StatusPage() {
  const { user } = useAuth();
  const { applications } = useBroker();
  const navigate = useNavigate();
  const app = applications.find((a) => a.phone === user?.phone);

  if (!app) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-700 mb-1">No Application Found</h2>
        <p className="text-sm text-slate-500 mb-4">You haven't submitted a broker application yet.</p>
        <button onClick={() => navigate('/onboarding')} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          Start Application
        </button>
      </div>
    );
  }

  const info = statusMessages[app.status] ?? statusMessages.submitted;
  const c = colorClasses[info.color] ?? colorClasses.blue;

  const docList = [
    { label: 'PAN Card', uploaded: !!app.panFile },
    { label: 'GST Certificate', uploaded: !!app.gstFile },
    { label: 'Aadhaar Card', uploaded: !!app.aadhaarFile },
    { label: 'Cancelled Cheque', uploaded: !!app.chequeFile },
  ];
  const docsUploaded = docList.filter((d) => d.uploaded).length;

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Application Status</h1>

      <div className="max-w-3xl space-y-6">
        {/* Application ID + Badge Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Application ID</p>
              <p className="text-sm font-bold text-slate-700 font-mono mt-0.5">{app.id}</p>
            </div>
            <StatusBadge status={app.status as AppStatus} />
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-5">Application Progress</h3>
          <div className="flex items-start">
            {timelineSteps.map((step, idx) => {
              const state = getStepState(step.key, app.status as AppStatus);
              // For the final "Decision" step, show the actual outcome label
              const label = step.key === 'approved'
                ? (app.status === 'rejected' ? 'Rejected' : app.status === 'correction_required' ? 'Correction' : step.label)
                : step.label;

              return (
                <div key={step.key} className="flex-1 flex flex-col items-center relative">
                  {/* Connector line */}
                  {idx > 0 && (
                    <div className={`absolute top-5 right-1/2 w-full h-0.5 -translate-y-1/2 ${state === 'upcoming' ? 'bg-slate-200' : 'bg-blue-400'}`} />
                  )}
                  {/* Circle */}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all
                    ${state === 'done' ? 'bg-blue-600 text-white' : ''}
                    ${state === 'active' ? (app.status === 'rejected' ? 'bg-red-500 text-white ring-4 ring-red-100' : app.status === 'correction_required' ? 'bg-orange-500 text-white ring-4 ring-orange-100' : 'bg-blue-600 text-white ring-4 ring-blue-100') : ''}
                    ${state === 'upcoming' ? 'bg-slate-100 text-slate-400' : ''}
                  `}>
                    {state === 'done' ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                      </svg>
                    )}
                  </div>
                  {/* Label */}
                  <p className={`mt-2 text-xs font-semibold text-center
                    ${state === 'done' ? 'text-blue-600' : ''}
                    ${state === 'active' ? (app.status === 'rejected' ? 'text-red-600' : app.status === 'correction_required' ? 'text-orange-600' : 'text-blue-600') : ''}
                    ${state === 'upcoming' ? 'text-slate-400' : ''}
                  `}>
                    {label}
                  </p>
                  {/* Timestamp */}
                  {state !== 'upcoming' && (
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {idx === 0
                        ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                        : new Date(app.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                      }
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Message Banner */}
        <div className={`rounded-xl p-5 border ${c.bg} ${c.border}`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${c.iconBg} flex items-center justify-center flex-shrink-0 text-lg`}>
              {info.emoji}
            </div>
            <div>
              <h3 className={`font-semibold mb-1 ${c.title}`}>{info.title}</h3>
              <p className={`text-sm ${c.text}`}>{info.desc}</p>
            </div>
          </div>
        </div>

        {/* Admin Remarks */}
        {app.adminRemarks && (
          <div className="bg-white rounded-xl border-2 border-violet-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-700">Admin Remarks</h3>
            </div>
            <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
              <p className="text-sm text-violet-800 leading-relaxed">{app.adminRemarks}</p>
            </div>
          </div>
        )}

        {/* Application Summary Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Applicant Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Applicant Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Name</span>
                <span className="font-medium text-slate-700">{app.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Phone</span>
                <span className="font-medium text-slate-700">+91 {app.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Email</span>
                <span className="font-medium text-slate-700 truncate ml-4">{app.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">City</span>
                <span className="font-medium text-slate-700">{app.city}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Experience</span>
                <span className="font-medium text-slate-700">{app.experience} years</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Company Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Company</span>
                <span className="font-medium text-slate-700">{app.companyName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Type</span>
                <span className="font-medium text-slate-700">{app.businessType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">GST</span>
                <span className="font-medium text-slate-700 font-mono text-xs">{app.gst}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">PAN</span>
                <span className="font-medium text-slate-700 font-mono text-xs">{app.pan}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Checklist + Dates */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                Documents
              </h3>
              <span className="text-xs font-medium text-slate-400">{docsUploaded}/4 uploaded</span>
            </div>
            <div className="space-y-2.5">
              {docList.map((doc) => (
                <div key={doc.label} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${doc.uploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}>
                    {doc.uploaded ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${doc.uploaded ? 'text-slate-700' : 'text-slate-400'}`}>{doc.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Submitted On</span>
                <span className="font-medium text-slate-700">
                  {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Submitted At</span>
                <span className="font-medium text-slate-700">
                  {new Date(app.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Updated</span>
                <span className="font-medium text-slate-700">
                  {new Date(app.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Commission</span>
                <span className="font-semibold text-blue-600">{app.commissionPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {app.status === 'approved' && (
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-emerald-800">You're all set!</h3>
              <p className="text-sm text-emerald-700 mt-0.5">Your account is active. Access your full broker dashboard to manage loads, trucks, and earnings.</p>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex-shrink-0">
              Go to Dashboard
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}

        {app.status === 'correction_required' && (
          <div className="bg-orange-50 rounded-xl border border-orange-200 p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-orange-800">Action Required</h3>
              <p className="text-sm text-orange-700 mt-0.5">Please review the admin remarks above and update your application accordingly.</p>
            </div>
            <button onClick={() => navigate('/onboarding')} className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Application
            </button>
          </div>
        )}

        {app.status === 'rejected' && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">Need Help?</h3>
              <p className="text-sm text-red-700 mt-0.5">If you believe this was a mistake, contact our support team for assistance.</p>
            </div>
            <a href="mailto:support@kargosathi.in" className="inline-flex items-center gap-2 px-6 py-2.5 border border-red-300 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
