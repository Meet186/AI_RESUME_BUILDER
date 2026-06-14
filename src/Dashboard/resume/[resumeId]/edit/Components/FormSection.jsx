import React from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '../../../../../components/ui/button'
import { ArrowRight, LayoutGrid, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(false);

  return (
    <div>

      <div className='flex justify-between items-center'>

        <div>
          <Button variant='outline' size='sm' className={`flex gap-2`}> <LayoutGrid />Theme</Button>
        </div>

        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button
            size='sm' className=""
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
              </Button>}
          <Button
           disabled={!enableNext}
           className="flex gap-2" size='sm'
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next<ArrowRight /></Button>
        </div>

      </div>

      {/* personal details */}

      {activeFormIndex == 1 ? <PersonalDetails enableNext={(v)=> setEnableNext(v)} /> : null}

      {/* summery */}

      {/* Experience */}

      {/* Educational Details */}

      {/* skills */}
    </div>
  )
}

export default FormSection
