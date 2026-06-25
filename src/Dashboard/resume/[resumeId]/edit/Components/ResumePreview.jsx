import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../../../Context/ResumeInfoContext";
import Templete1 from "./Templetes/Templete1";
import Templete2 from "./Templetes/Templete2";
import Templete3 from "./Templetes/Templete3";
import Deafult from "./Templetes/Deafult";

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  if (!resumeInfo) return null;

  const templates = {
    default: Deafult,
    classic: Templete1,
    modern: Templete2,
    creative: Templete3,
  };

  const SelectedTemplate =
    templates[resumeInfo?.template] || Deafult;

  return (
    <div
      id="resume-preview"
      className="bg-white w-full h-full"
    >
      <SelectedTemplate resumeInfo={resumeInfo} />
    </div>
  );
};  

export default ResumePreview;