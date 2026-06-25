import React from "react";

function EducationalPreview({ resumeInfo }) {
  if (!resumeInfo?.Education || resumeInfo.Education.length === 0) {
    return null;
  }

  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <section className="my-6 break-inside-auto">
      <h2
        className="text-center font-bold text-sm uppercase tracking-wider mb-2"
        style={{ color: themeColor }}
      >
        Education
      </h2>

      <hr
        className="mb-4"
        style={{
          borderColor: themeColor,
        }}
      />

      {resumeInfo.Education.map((education, index) => (
        <div
          key={education?.id || index}
          className="mb-5 break-inside-avoid"
        >
          <h3
            className="text-sm font-bold"
            style={{ color: themeColor }}
          >
            {education?.universityName}
          </h3>

          <div className="flex justify-between items-center text-xs mt-1">
            <span>
              {education?.degree}
              {education?.major ? ` in ${education.major}` : ""}
            </span>

            <span className="text-gray-600 whitespace-nowrap">
              {education?.startDate} - {education?.endDate}
            </span>
          </div>

          {education?.description && (
            <p className="text-xs text-gray-700 mt-2 leading-5 whitespace-pre-line">
              {education.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}

export default EducationalPreview;