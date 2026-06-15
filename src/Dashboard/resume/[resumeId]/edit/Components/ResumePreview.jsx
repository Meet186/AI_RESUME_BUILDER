import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../../../Context/ResumeInfoContext'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import Templete1 from './Templetes/templete1'
import Templete2 from './Templetes/Templete2'
import Templete3 from './Templetes/Templete3'
import Deafult from './Templetes/Deafult'

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)
  const templateId = resumeInfo?.template || 'default'

  const templates = {
    default: Deafult,
    classic: Templete1,
    modern: Templete2,
    creative: Templete3,
  }

  const SelectedTemplate = templates[templateId] || Deafult

  return <SelectedTemplate resumeInfo={resumeInfo} />
}

export default ResumePreview
