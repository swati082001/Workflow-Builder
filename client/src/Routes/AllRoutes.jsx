import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Workflow from '../Pages/Workflow/Workflow'
import RunWorkflow from '../Pages/Run Workflow/RunWorkflow'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path={"/"} element={<Workflow/>} />
            <Route path={"/upload"} element={<RunWorkflow/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes