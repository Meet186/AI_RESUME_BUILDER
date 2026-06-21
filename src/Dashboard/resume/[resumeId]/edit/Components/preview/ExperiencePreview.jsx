import React from 'react'

const ExperiencePreview = ({ resumeInfo }) => {
    console.log(
        "Preview Experience =>",
        resumeInfo?.personal_Experience
    );

    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >
                Professional Experience
            </h2>

            <hr
                style={{
                    borderColor: resumeInfo?.themeColor
                }}
            />

            {resumeInfo?.personal_Experience?.map(
                (experience, index) => (
                    <div
                        key={index}
                        className='my-5'
                    >
                        <h2
                            className='text-sm font-bold'
                            style={{
                                color:
                                    resumeInfo?.themeColor
                            }}
                        >
                            {experience?.title}
                        </h2>

                        <h2 className='text-xs flex justify-between'>
                            {experience?.companyName},
                            {experience?.city},
                            {experience?.state}

                            <span>
                                {experience?.startDate}
                                {" "}To{" "}
                                {experience?.endDate}
                            </span>
                        </h2>

                        <div
                            className='mt-4 text-sm text-gray-700'
                            dangerouslySetInnerHTML={{
                                __html:
                                    experience?.workSummery ||
                                    "",
                            }}
                        />
                    </div>
                )
            )}
        </div>
    )
}

export default ExperiencePreview