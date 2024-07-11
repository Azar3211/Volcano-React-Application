import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import { Home, Login, Register, VolcanoList, VolcanoPageData, ErrorPage } from './pages';
import { AuthProvider } from './Contexts/UserContext';
import AlertPopUp from './components/ui-features/alertPopUp';
import { VolcanoHistoryProvider } from './Contexts/VolcanoHistoryContext';
import Volcano from '../src/assets/volcanobackground.jpg'

const App = () => {

  return (
    <div className='tester'>

      <Router>
        <AlertPopUp>
          <AuthProvider>
            <VolcanoHistoryProvider>
              <div className="image-container">
                <img src={Volcano} alt='Volcano'
                  className="background-image" />

                <div className="overlay">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/volcanoes" element={<VolcanoList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/volcanoes/:id" element={<VolcanoPageData />} />
                    <Route path="/404" element={<ErrorPage />} />
                    <Route path="*" exact={true} element={<Navigate replace to="/404" />} />


                  </Routes>



                </div>
              </div>
              <footer>
                <Footer />
              </footer>
            </VolcanoHistoryProvider>

          </AuthProvider>

        </AlertPopUp>
      </Router>


    </div >

  )
}

export default App