import { Route, Routes } from "react-router";
import { LogInPage, RegisterPage } from "./pages";
import Private from "./pages/auth/private";
import DashboardLayout from "./layout/dashBoardLayout";

function App() {
  return (
    <Routes>
      {/* Auth Route */}
      <Route path="login" element={<LogInPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route element={<Private />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                    {/* <Route index element={<HomeDashboard />} /> */}

                    {/* ============ Category ================= */}
                    {/* <Route path="index-category" element={<IndexCategory />} /> */}
                    <Route
                        path="create-category"
                        // element={<CreateCategory />}
                    />
                    <Route
                        path="edit-category/:id"
                        // element={<CreateCategory />}
                    />

                    {/* ============ Product ================= */}
                    {/* <Route path="index-product" element={<IndexProduct />} /> */}
                    {/* <Route path="create-product" element={<CreateProduct />} /> */}
                    <Route
                        path="edit-product/:id"
                        // element={<CreateProduct />}
                    />

                    {/* Error Route */}
                    {/* <Route path="*" element={<Error />} /> */}
                </Route>
            </Route>
    </Routes>
  );
}

export default App;
