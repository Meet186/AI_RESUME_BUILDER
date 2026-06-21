import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FormSection from './Components/FormSection';
import ResumePreview from './Components/ResumePreview';
import { ResumeInfoContext } from '../../../../Context/ResumeInfoContext';
import dummy from '../../../../data/dummy';
import GlobalApi from '../../../../../service/GlobalApi';

const EditResume = () => {
    const params = useParams();
    const [resumeInfo,setResumeInfo] = useState();
    useEffect(()=>{
        GetResumeInfo()
        
    },[])

    const GetResumeInfo = async ()=>{
      const response = await GlobalApi.GetResumeById(params.resumeId);
      console.log(response.data.data,"DATA");
      setResumeInfo(response.data.data);

      
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
  <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* formSection */}
      <FormSection/>
      {/* preview section */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
    
  )
}

export default EditResume
