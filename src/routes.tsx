import { Suspense } from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import App from "./App";
import LoadingPage from "./pages/loading-page/LoadingPage";
import SigninPage from "./pages/signin";
import UnAuthorized from "./pages/unAuthorized";
import ServicesPage from "./pages/services-page/ServicesPage";
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import DepartmentCategoriesPage from "./pages/departments/DepartmentCategoriesPage";
import UsersPage from "./pages/users/UsersPage";
import DepartmentCategoryDetailsPage from "./pages/departments/DepartmentCategoryDetailsPage";
import ProductList from "./pages/products/ProductList";
import CategoriesPage from "./pages/categories/CategoriesPage";
import UsersByTypeListPage from "./pages/users/UsersByTypeListPage";
import FactoriesCategoriesListPage from "./pages/categories/FactoriesCategoriesListPage";
import FactoryUsersPage from "./pages/categories/FactoryUsersPage";
import AddUserPage from "./pages/users/AddUserPage";
import EditUserPage from "./pages/users/EditUserPage";
import AddEditProductPage from "./pages/products/AddEditProductPage";
import ChooseOwnerPage from "./pages/users/ChooseOwnerPage";
import AddEditServiceCategory from "./pages/services-page/AddEditServiceCategory";
import ServicesListPage from "./pages/services-page/ServicesListPage";
import AddEditServicePage from "./pages/services-page/AddEditServicePage";
import AdsListPage from "./pages/advertising/AdsListPage";
import AddEditAdsPage from "./pages/advertising/AddEditAdsPage";
import NewsListPage from "./pages/news-pages/NewsListPage";
import AddEditNewsPage from "./pages/news-pages/AddEditNewsPage";
import NotificationListPage from "./pages/notification/NotificationListPage";
import VehicleListPage from "./pages/vehicle-page/VehicleListPage";
import AddEditVehiclePage from "./pages/vehicle-page/AddEditVehiclePage";
import DealsPage from "./pages/deals/DealsPage";
import AddEditDealCategoryPage from "./pages/deals/AddEditDealCategoryPage";
import DealsListPage from "./pages/deals/DealsListPage";

const Routes = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={localStorage.getItem("token") ? <App /> : <UnAuthorized />}
        >
          <Route index element={<Navigate to={"/categories"} />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route
            path="categories/facroties-categories"
            element={<FactoriesCategoriesListPage />}
          />
          <Route
            path="categories/facroties-categories/:id"
            element={<FactoryUsersPage />}
          />
          <Route
            path="departments/:departmentId"
            element={<DepartmentCategoriesPage />}
          />
          <Route
            path="category/:categoryId"
            element={<DepartmentCategoryDetailsPage />}
          />
          <Route
            path="category/:categoryId/products"
            element={<ProductList />}
          />
          <Route
            path="category/:categoryId/products/owner"
            element={<ChooseOwnerPage />}
          />

          <Route
            path="category/:categoryId/products/owner/:ownerId/add"
            element={<AddEditProductPage />}
          />
          <Route
            path="category/:categoryId/products/:id/edit"
            element={<AddEditProductPage />}
          />
          <Route path="services" element={<ServicesPage />} />
          <Route
            path="services/category/:categoryId"
            element={<ServicesListPage />}
          />
          <Route
            path="services/category/:categoryId/owner"
            element={<ChooseOwnerPage />}
          />
          <Route
            path="services/category/:categoryId/:id/edit"
            element={<AddEditServicePage />}
          />
          <Route
            path="services/category/:categoryId/owner/:ownerId/add"
            element={<AddEditServicePage />}
          />
          <Route path="services/add" element={<AddEditServiceCategory />} />
          <Route
            path="services/:id/edit"
            element={<AddEditServiceCategory />}
          />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:userType" element={<UsersByTypeListPage />} />
          <Route path="users/add-user/:userType" element={<AddUserPage />} />
          <Route path="users/edit-user/:userId" element={<EditUserPage />} />

          <Route path="ads" element={<AdsListPage />} />
          <Route path="ads/owner" element={<ChooseOwnerPage />} />
          <Route path="ads/owner/:ownerId/add" element={<AddEditAdsPage />} />
          <Route path="ads/:id/edit" element={<AddEditAdsPage />} />

          <Route path="news" element={<NewsListPage />} />
          <Route path="news/owner" element={<ChooseOwnerPage />} />
          <Route path="news/owner/:ownerId/add" element={<AddEditNewsPage />} />
          <Route path="news/:id/edit" element={<AddEditNewsPage />} />

          <Route path="vehicles" element={<VehicleListPage />} />
          <Route path="vehicles/owner" element={<ChooseOwnerPage />} />
          <Route
            path="vehicles/owner/:ownerId/add"
            element={<AddEditVehiclePage />}
          />
          <Route path="vehicles/:id/edit" element={<AddEditVehiclePage />} />

          <Route path="deals" element={<DealsPage />} />
          <Route path="deals/add" element={<AddEditDealCategoryPage />} />
          <Route path="deals/:id/edit" element={<AddEditDealCategoryPage />} />
          <Route
            path="deals/category/:categoryId"
            element={<DealsListPage />}
          />

          <Route path="notifications" element={<NotificationListPage />} />
        </Route>
        <Route path="/sign-in" element={<SigninPage />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default Routes;
