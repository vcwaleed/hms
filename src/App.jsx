import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Rentroom/Homepage";
import BookingForm from "./components/Booking/BookingForm";
import Form2 from "./components/Booking/Form2";
import HotelPackages from "./components/Booking/HotelPackages";

function App() {
 

  return (
    <Router>
    <Routes>
  <Route path="/" element={<Homepage/>} />
  <Route path="/booking" element={<BookingForm/>} />
  <Route path="/form2" element={<Form2/>} />
  <Route path="/confirm" element={<HotelPackages/>} />

    </Routes>
  </Router>
  )
}

export default App
