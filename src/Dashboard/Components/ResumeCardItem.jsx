import { Link } from 'react-router';
import { Notebook } from 'lucide-react';

const ResumeCardItem = ({ resume }) => {
    return (
       <Link to={`/dashboard/resume/${resume.resume_id}/edit`}>
          <div
                className="p-14 bg-secondary flex
        items-center justify-center h-[280px]
        border border-primary rounded-lg
        hover:scale-105 transition-all hover:shadow-md shadow-primary"
            >
                <Notebook />
            </div>

            <h2>{resume.title}</h2>
       </Link>
    );
};

export default ResumeCardItem;