import React, { useContext, useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '../../../../../components/ui/button'
import { ArrowRight, LayoutGrid, ArrowLeft } from 'lucide-react'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
const FormSection = () => {
  const templates = [
    { id: 'default', label: 'Default' },
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
  ];
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [activeFormIndex, setActiveFormIndex] = useState(3);
  const [enableNext, setEnableNext] = useState(false);

  const selectedTemplate = resumeInfo?.template || 'default';

  const handleTemplateChange = (templateId) => {
    if (!resumeInfo) return;
    setResumeInfo({ ...resumeInfo, template: templateId });
  };

  return (
    <div>

      <div className='flex justify-between items-center'>

        <div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='flex gap-2'>
              <LayoutGrid /> Theme
            </Button>
            <div className='relative'>
              <Button
                variant='outline'
                size='sm'
                className='flex gap-2'
                type='button'
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
              >
                Template: {selectedTemplate}
              </Button>
              {showTemplateMenu && (
                <div className='absolute left-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border bg-white shadow-lg'>
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type='button'
                      className={`w-full px-3 py-2 text-left text-sm ${selectedTemplate === template.id ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'}`}
                      onClick={() => {
                        handleTemplateChange(template.id);
                        setShowTemplateMenu(false);
                      }}
                    >
                      {template.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button
            size='sm' className=""
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
            <ArrowLeft />
          </Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size='sm'
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next<ArrowRight /></Button>
        </div>

      </div>

      {/* personal details */}

      {activeFormIndex == 1 ? <PersonalDetails enableNext={(v) => setEnableNext(v)} /> : null}

      {/* summery */}
      {activeFormIndex == 2 ? <Summery enableNext={(v) => setEnableNext(v)} /> : null}

      {/* Experience */}

      {activeFormIndex == 3 ? <Experience enableNext={(v) => setEnableNext(v)} /> : null}
      {/* Educational Details */}

      {/* skills */}
    </div>
  )
}

export default FormSection
