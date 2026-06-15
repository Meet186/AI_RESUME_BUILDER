import React, { useEffect, useState } from 'react'
import AddResume from './Components/AddResume'
import { useUser } from '@clerk/react'
import GlobalApi from '../../service/GlobalApi';
import ResumeCardItem from './Components/ResumeCardItem';
import Loader from '../components/ui/Loader';

const Dashboard = () => {

  const { user } = useUser();
  const [resumeList, SetResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    user && GetResumeList();
    console.log(resumeList);

  }, [user]);
  // used to get user resumeList
  const GetResumeList = async () => {
    try {
      setIsLoading(true);
      const res = await GlobalApi.getUserResume(
        user?.primaryEmailAddress?.emailAddress
      )
      SetResumeList(res?.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
      SetResumeList([]);
    } finally {
      setIsLoading(false);
    }
  }
  return (

    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl' >My Resume</h2>
      <p>Start Creating AI resume for your next job role </p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5' >
        <AddResume />
        {isLoading ? (
          <div className="mt-10 min-h-[240px] flex items-center justify-center">
            <Loader message="Fetching resumes..." />
          </div>
        ) : (
          resumeList.length > 0 && resumeList.map((resume, index) => {
            return <ResumeCardItem resume={resume} key={index} />
          })

        )}
      </div>
    </div>
  )
}

export default Dashboard
