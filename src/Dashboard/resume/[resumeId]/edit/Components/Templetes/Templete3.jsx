import React from "react";

const Template3 = ({ resumeInfo }) => {
  return (
    <div className="bg-white shadow-lg min-h-275 print:shadow-none">

      {/* Header */}
      <div
        className="p-8 flex items-center gap-6"
        style={{
          backgroundColor: `${resumeInfo?.themeColor || "#000000"}20`,
        }}
      >
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-center text-3xl font-bold text-white"
          style={{
            backgroundColor:
              resumeInfo?.themeColor || "#000000",
          }}
        >
          {resumeInfo?.userImage || resumeInfo?.img ? (
            <img
              src={resumeInfo.userImage || resumeInfo.img}
              alt={`${resumeInfo?.firstName || ''} ${resumeInfo?.lastName || ''}`}
              className="object-cover w-full h-full"
            />
          ) : (
            (resumeInfo?.firstName?.[0] || "J") +
            (resumeInfo?.lastName?.[0] || "C")
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold">
            {resumeInfo?.firstName || "James"}{" "}
            {resumeInfo?.lastName || "Carter"}
          </h1>

          <p
            className="font-medium mt-1"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.jobTitle ||
              "Full Stack Developer"}
          </p>

          <div className="mt-3 text-sm text-gray-600">
            <p>{resumeInfo?.email}</p>
            <p>{resumeInfo?.phone}</p>
            <p>{resumeInfo?.address}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-8 p-8">

        {/* Left Side */}
        <div>

          {/* Summary */}
          <section>
            <h2
              className="font-bold border-b-2 pb-2"
              style={{
                color: resumeInfo?.themeColor,
                borderColor:
                  resumeInfo?.themeColor,
              }}
            >
              PROFILE
            </h2>

            <p className="text-xs mt-3 leading-6 text-gray-700">
              {resumeInfo?.summery}
            </p>
          </section>

          {/* Skills */}
          <section className="mt-8">
            <h2
              className="font-bold border-b-2 pb-2"
              style={{
                color: resumeInfo?.themeColor,
                borderColor:
                  resumeInfo?.themeColor,
              }}
            >
              SKILLS
            </h2>

            <div className="mt-4">
              {resumeInfo?.skills?.map(
                (skill, index) => (
                  <div
                    key={skill?.id || index}
                    className="mb-4"
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span>
                        {skill?.name}
                      </span>

                      <span>
                        {skill?.rating * 20}%
                      </span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${
                            skill?.rating * 20 || 0
                          }%`,
                          backgroundColor:
                            resumeInfo?.themeColor || "#000000",
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        {/* Right Side */}
        <div className="col-span-2">

          {/* Experience */}
          <section>
            <h2
              className="font-bold border-b-2 pb-2"
              style={{
                color: resumeInfo?.themeColor,
                borderColor:
                  resumeInfo?.themeColor,
              }}
            >
              EXPERIENCE
            </h2>

            {resumeInfo?.personal_Experience?.map(
              (exp, index) => (
                <div
                  key={exp?.id || index}
                  className="mt-5"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">
                      {exp?.title}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {exp?.startDate} -{" "}
                      {exp?.currentlyWorking
                        ? "Present"
                        : exp?.endDate}
                    </span>
                  </div>

                  <p
                    className="text-sm font-medium"
                    style={{
                      color:
                        resumeInfo?.themeColor,
                    }}
                  >
                    {exp?.companyName}
                    {exp?.city
                      ? ` • ${exp.city}`
                      : ""}
                    {exp?.state
                      ? `, ${exp.state}`
                      : ""}
                  </p>

                  <div
                    className="text-xs mt-2 leading-5 text-gray-700 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{
                      __html: exp?.workSummery || "",
                    }}
                  />
                </div>
              )
            )}
          </section>

          {/* Education */}
          <section className="mt-10">
            <h2
              className="font-bold border-b-2 pb-2"
              style={{
                color: resumeInfo?.themeColor,
                borderColor:
                  resumeInfo?.themeColor,
              }}
            >
              EDUCATION
            </h2>

            {resumeInfo?.Education?.map(
              (edu, index) => (
                <div
                  key={edu?.id || index}
                  className="mt-5"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">
                      {edu?.universityName}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {edu?.startDate} -{" "}
                      {edu?.endDate}
                    </span>
                  </div>

                  <p
                    className="text-sm"
                    style={{
                      color:
                        resumeInfo?.themeColor,
                    }}
                  >
                    {edu?.degree} in{" "}
                    {edu?.major}
                  </p>

                  <p className="text-xs mt-2 text-gray-700 leading-5">
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

export default Template3;