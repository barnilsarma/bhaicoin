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
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
