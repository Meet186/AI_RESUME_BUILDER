import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../../../components/ui/button'
import { Textarea } from '../../../../../../components/ui/textarea'
import { ResumeInfoContext } from '../../../../../../Context/ResumeInfoContext'
import { useParams } from 'react-router'
import GlobalApi from '../../../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from '../../../../../../../service/AIMODEL'


const Summery = ({ enableNext }) => {
    

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [summery, setSummery] = useState(resumeInfo?.summery || '')
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

    useEffect(() => {
        console.log("State Updated:", aiGeneratedSummeryList);
    }, [aiGeneratedSummeryList]);

    useEffect(() => {
        if (!resumeInfo) return
        setResumeInfo({
            ...resumeInfo,
            summery,
        })
    }, [summery])

    const onSave = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            summery,
        }

        try {
            const resp = await GlobalApi.updateResumeDetails(params?.resumeId, payload)
            console.log(resp)
            enableNext?.(true)
            toast.success('Details updated')
        } catch (error) {
            console.error(error)
            toast.error('Failed to update summary')
        } finally {
            setLoading(false)
        }
    }


    const GenerateSummeryFromAI = async () => {
        const PROMT = `Job Title: ${resumeInfo?.jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`
        try {
            setLoading(true);
            const summaries = await AIChatSession(PROMT);
            console.log("Summaries:", summaries);
            console.log("Is Array:", Array.isArray(summaries));
            setAiGenerateSummeryList(summaries);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Summery</h2>
            <p>Add Summery for your job title</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summery</label>
                    <Button
                        onClick={() => GenerateSummeryFromAI()}
                        variant='outline'
                        type='button'
                        size='sm'
                        className='border-primary text-primary flex gap-2'
                    >
                        <Brain className='h-4 w-4' /> Generate from AI
                    </Button>
                </div>
                <Textarea
                    className='mt-5'
                    required
                    value={summery}
                    onChange={(e) => setSummery(e.target.value)}
                />

                <div className='mt-2 flex justify-end'>
                    <Button type='submit' disabled={loading} className='flex items-center gap-2'>
                        {loading ? (
                            <>
                                <LoaderCircle className='h-4 w-4 animate-spin' />
                                Saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
            </form>

            {aiGeneratedSummeryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList?.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummery(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Summery
