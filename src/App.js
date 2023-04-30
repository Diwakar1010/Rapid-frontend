import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
// import Example from "./components/Example";
import DetailsPage from "./components/DetailsPage";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/book" element={<Example/>} /> */}
                    <Route path="/login" element={<LoginPage />} /> 
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/details" element={<DetailsPage />} />
                    {/* <Route path="*" element={<div>Not found</div>}/> */}
                    
                </Routes>
            </BrowserRouter>

        </>
    )
}


export default App;