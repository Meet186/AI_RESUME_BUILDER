import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './Home/index.jsx'
import Dashboard from './Dashboard/index.jsx'
import { ClerkProvider } from '@clerk/react'
import EditResume from './Dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import SingUp from './auth/sign-in/SingUp.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const routers = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path: '/auth/sign-up',
    element: <SingUp/>
  },
  {
    path : "/my-resume/:resumeId/view",
    element : <ViewResume/>

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={routers} />
    </ClerkProvider>
  </StrictMode>,
)
