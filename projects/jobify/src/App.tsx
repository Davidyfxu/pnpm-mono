import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Landing,
  Error,
  Register,
  ShareLayout,
  Stats,
  AllJobs,
  AddJob,
  Profile,
  ProtectedRoute,
} from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ShareLayout />
            </ProtectedRoute>
          }
        >
          <Route path="stats" element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
