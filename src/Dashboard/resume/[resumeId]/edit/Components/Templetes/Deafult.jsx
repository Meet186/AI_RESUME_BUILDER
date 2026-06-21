import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../../../../Context/ResumeInfoContext'
import PersonalDetailsPreview from '../preview/PersonalDetailsPreview'
import SummeryPreview from '../preview/SummeryPreview'
import ExperiencePreview from '../preview/ExperiencePreview'
import SkillsPreview from '../preview/SkillsPreview'
import EducationalPreview from '../preview/EducationalPreview'

const Deafult = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)

  return (
    <div
      className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor: resumeInfo?.themeColor
      }}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummeryPreview resumeInfo={resumeInfo} />

      {/* Experience */}
      {resumeInfo?.personal_Experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}

      {/* Education */}
      {resumeInfo?.Education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
    </div>
  )
}

export default Deafult