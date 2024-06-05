import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { TextosModacad } from './pages/TextosModacad.tsx'
import { Home } from './pages/Home.tsx'
import { PilulasMCD } from './pages/PilulasMCD.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>404 NOT FOUND</div>
  },
  {
    path: "/textomodacad",
    element: <TextosModacad />,
    errorElement: <div>404 NOT FOUND</div>
  },
  {
    path: "/pilula",
    element: <PilulasMCD />,
    errorElement: <div>404 NOT FOUND</div>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
