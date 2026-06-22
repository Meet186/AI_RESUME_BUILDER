import React, { useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import PersonalDetails from './forms/PersonalDetails';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';

import { Button } from '../../../../../components/ui/button';
import {
  ArrowRight,
  LayoutGrid,
  ArrowLeft,
  House,
} from 'lucide-react';
import GlobalApi from '../../../../../../service/GlobalApi';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';

const FormSection = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 'default', label: 'Default' },
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
  ];

  const { resumeInfo, setResumeInfo } =
    useContext(ResumeInfoContext);

  const [showTemplateMenu, setShowTemplateMenu] =
    useState(false);

  const [activeFormIndex, setActiveFormIndex] =
    useState(1);

  const [enableNext, setEnableNext] =
    useState(false);

  const { resumeId } = useParams()

  const selectedTemplate =
    resumeInfo?.template || 'default';

  const handleTemplateChange = async (templateId) => {
    // Update UI immediately
    setResumeInfo((prev) => ({
      ...prev,
      template: templateId,
    }));

    try {
      await GlobalApi.updateResumeDetails0(resumeId, {
        template: templateId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* Top Navigation */}
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          {/* Home Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            <House className="h-4 w-4" />
          </Button>

          {/* Theme Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            Theme
          </Button>

          {/* Template Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() =>
                setShowTemplateMenu(
                  !showTemplateMenu
                )
              }
            >
              Template: {selectedTemplate}
            </Button>

            {showTemplateMenu && (
              <div className="absolute left-0 mt-2 w-44 rounded-xl border bg-white shadow-lg z-50">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    className={`w-full px-4 py-2 text-left text-sm ${selectedTemplate ===
                      template.id
                      ? 'bg-slate-100 font-semibold'
                      : 'hover:bg-slate-50'
                      }`}
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

        {/* Navigation Buttons */}
        <div className="flex gap-2">

          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() =>
                setActiveFormIndex(
                  activeFormIndex - 1
                )
              }
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}

          <Button
            size="sm"
            disabled={!enableNext}
            className="flex gap-2"
            onClick={() =>
              setActiveFormIndex(
                activeFormIndex + 1
              )
            }
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Form Sections */}

      {activeFormIndex === 1 && (
        <PersonalDetails
          enableNext={(v) => setEnableNext(v)}
        />
      )}

      {activeFormIndex === 2 && (
        <Summery
          enableNext={(v) => setEnableNext(v)}
        />
      )}

      {activeFormIndex === 3 && (
        <Experience
          enableNext={(v) => setEnableNext(v)}
        />
      )}

      {activeFormIndex === 4 && (
        <Education
          enableNext={(v) => setEnableNext(v)}
        />
      )}

      {activeFormIndex === 5 && (
        <Skills
          enableNext={(v) => setEnableNext(v)}
        />
      )}

      {activeFormIndex === 6 && (
        <Navigate to={'/my-resume/' + resumeId + "/view"} />
      )}

    </div>
  );
};

export default FormSection;