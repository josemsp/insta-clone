import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
// import { createHashRouter } from 'react-router-dom'
// import { router } from './router.tsx'

// const mainRouter = createHashRouter([...router])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <RouterProvider router={mainRouter} /> */}
  </React.StrictMode>,
)
