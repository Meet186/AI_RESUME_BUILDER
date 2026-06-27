import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'
import { Navigate, Outlet } from 'react-router'
import { useUser } from '@clerk/react'
import Header from './components/ui/Custom/Header'
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Outlet />
        <Toaster />
      </BrowserRouter>
    </>
  )
}


export default App
