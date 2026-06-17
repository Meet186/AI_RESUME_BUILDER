import React from 'react'

const ExperiencePreview = ({ resumeInfo }) => {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{experience?.title}</h2>
                    <h2 className='text-xs flex justify-between'>{experience?.companyName},
                        {experience?.city},
                        {experience?.state}
                        <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate} </span>
                    </h2>
                    {/* <p className='text-xs my-2'>
                        {experience.workSummery}
                    </p> */}
                    <div
                        className="
    mt-4
    text-sm
    text-gray-700
    leading-6

    [&_ul]:list-disc
    [&_ul]:pl-6
    [&_ul]:space-y-2

    [&_ol]:list-decimal
    [&_ol]:pl-6
    [&_ol]:space-y-2

    [&_li]:leading-6
    [&_li]:ml-1

    [&_p]:mb-2
    [&_strong]:font-semibold
  "
                        dangerouslySetInnerHTML={{
                            __html: experience?.workSummery || "",
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview
