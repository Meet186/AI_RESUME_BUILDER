import { Link } from "react-router";

const ResumeCardItem = ({ resume }) => {
  return (
    <Link
      to={`/dashboard/resume/${resume.documentId}/edit`}
      className="block"
    >
      <div
        className="
          relative overflow-hidden
          h-[280px]
          rounded-3xl
          bg-gradient-to-br
          from-sky-50
          via-white
          to-violet-100
          border border-white/60
          shadow-lg
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
          group
        "
      >
        {/* Background Glow */}
        <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />

        {/* Decorative Pattern */}
        <div className="absolute top-4 right-4 h-20 w-20 rounded-full border border-slate-200/50"></div>
        <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full border border-slate-200/50"></div>

        {/* Image */}
        <div className="flex h-full items-center justify-center">
          <img
            src="/cv.png"
            alt="Resume"
            className="
              relative z-10
              w-36
              h-36
              object-contain
              drop-shadow-2xl
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-2
            "
          />
        </div>

        {/* Bottom Overlay */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            bg-white/70 backdrop-blur-md
            border-t border-white/50
            p-4
          "
        >
          <h2 className="text-center font-semibold text-slate-700 truncate">
            {resume.title}
          </h2>
         
        </div>
      </div>
    </Link>
  );
};

export default ResumeCardItem;