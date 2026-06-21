import React from "react";

const Template2 = ({ resumeInfo }) => {
  return (
    <div className="bg-white shadow-lg p-10 min-h-[1100px] print:shadow-none">

      {/* Header */}
      <div className="text-center">
        <h1
          className="text-4xl font-serif font-bold uppercase"
          style={{
            color: resumeInfo?.themeColor || "#000",
          }}
        >
          {resumeInfo?.firstName || "James"}{" "}
          {resumeInfo?.lastName || "Carter"}
        </h1>

        <p className="text-sm font-medium mt-2">
          {resumeInfo?.jobTitle || "Full Stack Developer"}
        </p>

        <p className="text-xs mt-3">
          {resumeInfo?.address}
        </p>

        <p className="text-xs">
          {resumeInfo?.email}
        </p>

        <p className="text-xs">
          {resumeInfo?.phone}
        </p>
      </div>

      <hr className="my-6 border-gray-400" />

      {/* Summary */}
      <section>
        <h2
          className="text-center font-bold text-sm tracking-[3px] mb-3"
          style={{
            color: resumeInfo?.themeColor || "#000",
          }}
        >
          SUMMARY
        </h2>

        <p className="text-xs text-center leading-6 text-gray-700">
          {resumeInfo?.summery}
        </p>
      </section>

      {/* Experience */}
      <section className="mt-8">
        <h2
          className="text-center font-bold text-sm tracking-[3px] mb-4"
          style={{
            color: resumeInfo?.themeColor || "#000",
          }}
        >
          EXPERIENCE
        </h2>

        {resumeInfo?.personal_Experience?.map((exp, index) => (
          <div
            key={exp?.id || index}
            className="mb-6"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-sm">
                {exp?.title}
              </h3>

              <span className="text-xs italic">
                {exp?.startDate} -{" "}
                {exp?.currentlyWorking
                  ? "Present"
                  : exp?.endDate}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>
                {exp?.companyName}
                {exp?.city ? `, ${exp.city}` : ""}
                {exp?.state ? `, ${exp.state}` : ""}
              </span>
            </div>

            <div
              className="text-xs mt-3 leading-5 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{
                __html: exp?.workSummery || "",
              }}
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mt-8">
        <h2
          className="text-center font-bold text-sm tracking-[3px] mb-4"
          style={{
            color: resumeInfo?.themeColor || "#000",
          }}
        >
          EDUCATION
        </h2>

        {resumeInfo?.Education?.map((edu, index) => (
          <div
            key={edu?.id || index}
            className="mb-5"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-sm">
                {edu?.universityName}
              </h3>

              <span className="text-xs italic">
                {edu?.startDate} - {edu?.endDate}
              </span>
            </div>

            <p className="text-xs">
              {edu?.degree} in {edu?.major}
            </p>

            <p className="text-xs mt-2 text-gray-600">
              {edu?.description}
            </p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mt-8">
        <h2
          className="text-center font-bold text-sm tracking-[3px] mb-4"
          style={{
            color: resumeInfo?.themeColor || "#000",
          }}
        >
          SKILLS
        </h2>

        <div className="grid grid-cols-2 gap-x-10 gap-y-3">
          {resumeInfo?.skills?.map((skill, index) => (
            <div
              key={skill?.id || index}
              className="flex items-center justify-between"
            >
              <span className="text-xs">
                {skill?.name}
              </span>

              <div className="w-28 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${skill?.rating * 20 || 0}%`,
                    backgroundColor:
                      resumeInfo?.themeColor ||  "#000000",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template2;