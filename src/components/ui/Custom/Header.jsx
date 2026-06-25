import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router'
import { UserButton, useUser } from '@clerk/react'
const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md' >
            <img src="/logo.png" alt="" width={80} height={80} />

            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button data-variant="outline">Dashboard</Button>
                    </Link>

                    <UserButton />
                </div> :

                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }


        </div>
    )
}

export default Header
