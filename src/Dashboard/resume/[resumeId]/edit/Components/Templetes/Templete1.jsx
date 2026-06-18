import React from "react";

const Template1 = ({ resumeInfo }) => {
  return (
    <div className="bg-white shadow-lg min-h-[1120px] print:shadow-none">
      <div className="grid grid-cols-12">

        {/* Sidebar */}
        <div
          className="col-span-4 text-white p-6"
          style={{
            backgroundColor:
              resumeInfo?.themeColor || "#1f2937",
          }}
        >
          {/* Profile Image */}
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300">
              {resumeInfo?.userImage || resumeInfo?.img ? (
                <img
                  src={
                    resumeInfo?.userImage ||
                    resumeInfo?.img
                  }
                  alt={`${resumeInfo?.firstName || ""} ${
                    resumeInfo?.lastName || ""
                  }`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gray-500">
                  {(resumeInfo?.firstName?.[0] || "J") +
                    (resumeInfo?.lastName?.[0] || "C")}
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-2">
              Contact
            </h2>

            <div className="w-14 h-1 bg-white mb-5" />

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold">
                  Address
                </h3>

                <p className="text-sm text-gray-200 mt-1">
                  {resumeInfo?.address ||
                    "New York, USA"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Phone
                </h3>

                <p className="text-sm text-gray-200 mt-1">
                  {resumeInfo?.phone ||
                    "+1 234 567 890"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Email
                </h3>

                <p className="text-sm text-gray-200 mt-1 break-all">
                  {resumeInfo?.email ||
                    "example@gmail.com"}
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-2">
              Skills
            </h2>

            <div className="w-14 h-1 bg-white mb-5" />

            <ul className="list-disc pl-5 space-y-2">
              {resumeInfo?.skills?.map(
                (skill, index) => (
                  <li
                    key={skill?.id || index}
                    className="text-sm"
                  >
                    {skill?.name}
                  </li>
                )
              )}
            </ul>
          </section>
        </div>

        {/* Main Content */}
        <div className="col-span-8 p-8">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              {resumeInfo?.firstName || "James"}{" "}
              {resumeInfo?.lastName || "Carter"}
            </h1>

            <p className="text-xl text-gray-700 mt-2">
              {resumeInfo?.jobTitle ||
                "Full Stack Developer"}
            </p>
          </div>

          {/* Profile */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold">
              Profile
            </h2>

            <div className="w-16 h-1 bg-black mt-2 mb-5" />

            <p className="text-sm leading-7 text-gray-700">
              {resumeInfo?.summery}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold">
              Work Experience
            </h2>

            <div className="w-16 h-1 bg-black mt-2 mb-6" />

            {resumeInfo?.experience?.map(
              (exp, index) => (
                <div
                  key={exp?.id || index}
                  className="mb-8"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">
                        {exp?.title}
                      </h3>

                      <p className="text-gray-700">
                        {exp?.companyName}
                        {exp?.city
                          ? ` • ${exp.city}`
                          : ""}
                        {exp?.state
                          ? `, ${exp.state}`
                          : ""}
                      </p>
                    </div>

                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {exp?.startDate} -{" "}
                      {exp?.currentlyWorking
                        ? "Present"
                        : exp?.endDate}
                    </span>
                  </div>

                  <div
                    className="mt-3 text-sm text-gray-700 leading-6
                    [&_ul]:list-disc
                    [&_ul]:pl-5
                    [&_li]:mb-1"
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
            <h2 className="text-3xl font-bold">
              Education
            </h2>

            <div className="w-16 h-1 bg-black mt-2 mb-6" />

            {resumeInfo?.education?.map(
              (edu, index) => (
                <div
                  key={edu?.id || index}
                  className="mb-8"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">
                        {edu?.degree}
                      </h3>

                      <p className="text-gray-700">
                        {
                          edu?.universityName
                        }
                      </p>

                      <p className="text-sm text-gray-600">
                        {edu?.major}
                      </p>
                    </div>

                    <span className="text-sm text-gray-600 whitespace-nowrap">
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
  );
};

export default Template1;