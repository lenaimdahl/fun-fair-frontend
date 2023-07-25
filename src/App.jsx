import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import NotFound from "./component/NotFound";
import Profile from "./pages/Profile";
import DayView from "./pages/DayView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WeeklyMood from "./pages/WeeklyMood";
import Protected from "./component/Protected";
import NewNav from "./component/NewNav";

function App() {
  return (
    <div className="App">
      <Navbar />
      <NewNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/day-view"
          element={
            <Protected>
              <DayView />
            </Protected>
          }
        />
        <Route
          path="/weekly-mood"
          element={
            <Protected>
              <WeeklyMood />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
