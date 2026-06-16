import React from "react";

const Template1 = ({ resumeInfo }) => {
  return (
    <div className="bg-white shadow-lg min-h-275 print:shadow-none">
      <div className="grid grid-cols-3">

        {/* Sidebar */}
        <div className="bg-gray-100 p-6">
          <h1 className="text-3xl font-light uppercase leading-tight">
            {resumeInfo?.firstName || "James"}
          </h1>

          <h1 className="text-3xl font-light uppercase leading-tight">
            {resumeInfo?.lastName || "Carter"}
          </h1>

          <p className="text-sm mt-2">
            {resumeInfo?.jobTitle || "Full Stack Developer"}
          </p>

          {/* Details */}
          <div className="mt-8">
            <h2
              className="font-bold text-sm border-b pb-2"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              DETAILS
            </h2>

            <div className="mt-3 space-y-2">
              <p className="text-xs break-all">
                {resumeInfo?.email || "example@gmail.com"}
              </p>

              <p className="text-xs">
                {resumeInfo?.phone || "(123) 456-7890"}
              </p>

              <p className="text-xs">
                {resumeInfo?.address || "Address"}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2
              className="font-bold text-sm border-b pb-2"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              SKILLS
            </h2>

            <div className="mt-4">
              {resumeInfo?.skills?.length > 0 ? (
                resumeInfo.skills.map((skill, index) => (
                  <div
                    key={skill?.id || index}
                    className="mb-4"
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill?.name}</span>
                      <span>{skill?.rating}%</span>
                    </div>

                    <div className="h-2 bg-gray-300 rounded">
                      <div
                        className="h-2 rounded"
                        style={{
                          width: `${skill?.rating || 0}%`,
                          backgroundColor:
                            resumeInfo?.themeColor || "#ff6666",
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs">
                  No skills added
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">

          {/* Summary */}
          <section>
            <h2
              className="font-bold text-lg border-b pb-2"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              SUMMARY
            </h2>

            <p className="text-sm leading-6 mt-4 text-gray-700">
              {resumeInfo?.summery}
            </p>
          </section>

          {/* Experience */}
          <section className="mt-8">
            <h2
              className="font-bold text-lg border-b pb-2"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              EXPERIENCE
            </h2>

            {resumeInfo?.experience?.map(
              (exp, index) => (
                <div
                  key={exp?.id || index}
                  className="mt-5"
                >
                  <h3 className="font-bold text-base">
                    {exp?.title}
                  </h3>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {exp?.companyName}
                      {exp?.city
                        ? `, ${exp.city}`
                        : ""}
                      {exp?.state
                        ? `, ${exp.state}`
                        : ""}
                    </span>

                    <span>
                      {exp?.startDate} -{" "}
                      {exp?.currentlyWorking
                        ? "Present"
                        : exp?.endDate}
                    </span>
                  </div>

                  <p className="text-xs leading-5 whitespace-pre-line mt-2">
                    {exp?.workSummery}
                  </p>
                </div>
              )
            )}
          </section>

          {/* Education */}
          <section className="mt-8">
            <h2
              className="font-bold text-lg border-b pb-2"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              EDUCATION
            </h2>

            {resumeInfo?.education?.map(
              (edu, index) => (
                <div
                  key={edu?.id || index}
                  className="mt-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {edu?.universityName}
                    </h3>

                    <span className="text-xs">
                      {edu?.startDate} -{" "}
                      {edu?.endDate}
                    </span>
                  </div>

                  <p className="text-sm">
                    {edu?.degree} in {edu?.major}
                  </p>

                  <p className="text-xs text-gray-600 mt-2">
                    {edu?.description}
                  </p>
                </div>
              )
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template1;