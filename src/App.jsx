import { BrowserRouter,Route,Routes } from "react-router-dom"
import * as pages from "./pages/index";


function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<pages.Home/>} />
            <Route path='/transactions' element={<pages.Transactions/>} />
            <Route path='/mine' element={<pages.Mine/>} />
            <Route path='/game' element={<pages.Game/>} />
            <Route path='/room/:user' element={<pages.Room />} />
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
