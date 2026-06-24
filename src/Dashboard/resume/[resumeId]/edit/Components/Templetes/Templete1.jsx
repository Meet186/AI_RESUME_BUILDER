import React from "react";

const Template1 = ({ resumeInfo }) => {
  console.log(resumeInfo, " skills");

  return (
    <div className="bg-[#f5f5f5] p-10 min-h-[1120px] shadow-lg">
      {/* Header */}
      <div className="mb-8" >
        <h1 className="text-5xl font-bold uppercase tracking-wider leading-none"
          style={{
            color:
              resumeInfo?.themeColor || "#000",
          }}
        >    
          {resumeInfo?.firstName}
          <br />
          {resumeInfo?.lastName}
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          {resumeInfo?.jobTitle}
        </p>
      </div>

      <div className="border-t border-gray-300 pt-8">
        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDE */}
          <div className="col-span-4 border-r border-gray-300 pr-8">

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold tracking-wider">
                INFO
              </h2>

              <div
                className="w-12 h-1 mt-2 mb-8"
                style={{
                  backgroundColor:
                    resumeInfo?.themeColor || "#000",
                }}
              />

              <div className="space-y-6">

                <div>
                  <h3 className="font-bold uppercase text-sm">
                    Address
                  </h3>

                  <p className="text-sm text-gray-700 mt-2">
                    {resumeInfo?.address}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold uppercase text-sm">
                    Phone
                  </h3>

                  <p className="text-sm text-gray-700 mt-2">
                    {resumeInfo?.phone}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold uppercase text-sm">
                    Email
                  </h3>

                  <p className="text-sm text-gray-700 mt-2 break-all">
                    {resumeInfo?.email}
                  </p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-3xl font-bold tracking-wider">
                SKILLS
              </h2>

              <div
                className="w-12 h-1 mt-2 mb-8"
                style={{
                  backgroundColor:
                    resumeInfo?.themeColor || "#000",
                }}
              />

              <div className="space-y-5">
                {resumeInfo?.skills?.map((skill, index) => (
                  <div key={skill?.id || index}>
                    <p className="text-sm font-medium mb-2">
                      {skill?.name}
                    </p>

                    <div className="h-2 bg-gray-300">
                      <div
                        className="h-2"
                        style={{
                          width: `${skill?.rating * 20}%`,
                          backgroundColor:
                            resumeInfo?.themeColor || "#000",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-8">

            {/* Profile */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold tracking-wider">
                PROFILE
              </h2>

              <div
                className="w-12 h-1 mt-2 mb-6"
                style={{
                  backgroundColor:
                    resumeInfo?.themeColor || "#000",
                }}
              />

              <p className="text-sm leading-7 text-gray-700">
                {resumeInfo?.summery}
              </p>
            </section>

            {/* Experience */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold tracking-wider">
                EMPLOYMENT HISTORY
              </h2>

              <div
                className="w-12 h-1 mt-2 mb-6"
                style={{
                  backgroundColor:
                    resumeInfo?.themeColor || "#000",
                }}
              />

              {resumeInfo?.personal_Experience?.map(
                (exp, index) => (
                  <div
                    key={exp?.id || index}
                    className="mb-8"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">
                          {exp?.title}
                          {exp?.companyName &&
                            `, ${exp.companyName}`}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {exp?.startDate} -{" "}
                          {exp?.currentlyWorking
                            ? "Present"
                            : exp?.endDate}
                        </p>
                      </div>

                      <span className="text-sm text-gray-600">
                        {exp?.city}
                      </span>
                    </div>

                    <div
                      className="
                        mt-3
                        text-sm
                        text-gray-700
                        leading-6
                        [&_ul]:list-disc
                        [&_ul]:pl-5
                        [&_li]:mb-1
                      "
                      dangerouslySetInnerHTML={{
                        __html:
                          exp?.workSummery || "",
                      }}
                    />
                  </div>
                )
              )}
            </section>

            {/* Education */}
            <section>
              <h2 className="text-3xl font-bold tracking-wider">
                EDUCATION
              </h2>

              <div
                className="w-12 h-1 mt-2 mb-6"
                style={{
                  backgroundColor:
                    resumeInfo?.themeColor || "#000",
                }}
              />

              {resumeInfo?.Education?.map(
                (edu, index) => (
                  <div
                    key={edu?.id || index}
                    className="mb-6"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg">
                          {edu?.universityName}
                        </h3>

                        <p className="text-gray-700">
                          {edu?.degree} in{" "}
                          {edu?.major}
                        </p>
                      </div>

                      <span className="text-sm text-gray-600">
                        {edu?.startDate} -{" "}
                        {edu?.endDate}
                      </span>
                    </div>

                    {edu?.description && (
                      <p className="mt-2 text-sm text-gray-700 leading-6">
                        {edu?.description}
                      </p>
                    )}
                  </div>
                )
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;