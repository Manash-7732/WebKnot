import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegsiterForm";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import EventList from "./pages/Events/EventList";
import AttendeeList from "./pages/Attendees/AttendeeList";
import TaskList from "./pages/Tasks/TaskList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EventList />} />
            <Route path="attendees" element={<AttendeeList />} />
            <Route path="tasks" element={<TaskList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
