import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { TextosModacad } from './pages/TextosModacad.tsx'
import { Home } from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: "textos-modacad",
    element: <TextosModacad />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
