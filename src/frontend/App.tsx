import "./App.css";
import routers from "./src/routers/index.ts";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {routers.map((route) => {
          const Component = route.component;
          // const isAdmin = route.isAdmin;
          return (
            <Route
              key={route.key}
              path={route.path}
              element={
                <Component />
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
