const AUTH = {
  SIGNIN: "/admin/signin",
};

const DEPARTMENT = {
  GET_ALL: "/departments/all-departments",
  GET_ALL_CATEGORIES_IN_DEPARTMENT: (departmentId: string) =>
    `/departments/${departmentId}/all-categories`,
  GET_CATEGORY_BY_ID: (categoryId: string) =>
    `/departments/category/${categoryId}`,
  EDIT_DEPARTMENT_CATEGORY: (categoryId: string) =>
    `/departments/edit-category/${categoryId}`,
  DELETE_DEPARTMENT_CATEGORY: (categoryId: string) =>
    `/departments/delete-category/${categoryId}`,
};

const CATEGORIES = {
  GET_FACTORIES_CATEGORIES: "/categories/factories",
  GET_FACTORY_USERS: (id: string) => `/categories/get-all-factories/${id}`,
};

const USER = {
  GET_ALL: "/user/get-all-users",
  GET_BY_ID: (userId: string) => `/user/getUser/${userId}`,
  GET_BY_TYPE: (userType: string) => `/user/getUserByType?userType=${userType}`,
  ADD: "/user/register",
  EDIT: (userId: string) => `/user/net-editUser/${userId}`,
  DELETE: (userId: string) => `/user/delete-user/${userId}`,
};

const PRODUCT = {
  GET_BY_CATEGORY: (categoryId: string) =>
    `/departments/${categoryId}/all-products`,
  ADD: "/departments/addProduct",
  GET_BY_ID: (productId: string) => `/departments/getproduct/${productId}`,
  EDIT: (productId: string) => `/departments//editProduct/${productId}`,
  DELETE: (productId: string) => `/departments/delete-product/${productId}`,
};

const SERVICES = {
  GET_SERVICES_CATEGORIES: "/categories/services-categories",
  GET_SERVICES_BY_CATEGORY: (category: string, country: string) =>
    `/categories/services-by-category?category=${category}&country=${country}`,
  GET_CATEGORY_BY_ID: (id: string) =>
    `/categories/services-categories/byid/${id}`,
  DELETE_CATEGORY: (id: string) =>
    `/categories/services-categories/delete/${id}`,
  ADD_CATEGORY: "/categories/services-categories/add",
  EDIT_CATEGORY: (id: string) => `/categories/services-categories/edit/${id}`,
  DELETE_SERVICE: (id: string) => `/categories/local-company/service/${id}`,
  GET_BY_ID: (id: string) => `/categories/local-company/get-service/${id}`,
  ADD_SERVICE: (category: string, country: string) =>
    `/categories/local-company/add-service?category=${category}&country=${country}`,
  EDIT_SERVICE: (id: string) => `/categories/local-company/edit-service/${id}`,
};

const ADS = {
  GET_ALL: "/advertisements",
  GET_BY_ID: (id: string) => `/advertisements/${id}`,
  DELETE: (id: string) => `/advertisements/${id}`,
  ADD: `/advertisements/createAds`,
  EDIT: (id: string) => `/advertisements/${id}`,
};

const NEWS = {
  GET_ALL: "/news",
  DELETE: (id: string) => `/news/${id}`,
  GET_BY_ID: (id: string) => `/news/${id}`,
  EDIT: (id: string) => `/news/${id}`,
  ADD: `/news/createNews`,
};

const NOTI = {
  GET_ALL: "/notifications/get-notification",
};

const VEHICLE = {
  GET_ALL_CAR: (country: string) => `/categories/cars?country=${country}`,
  GET_ALL_PLANES: (country: string) => `/categories/planes?country=${country}`,
  GET_BY_ID: (id: string) => `/categories/vehicle/${id}`,
  DELETE: (id: string) => `/categories/vehicle/${id}`,
  EDIT: (id: string) => `/categories/vehicle/edit-vehicle/${id}`,
  ADD: `/categories/vehicle/create-vehicle`,
};

const DEALS = {
  GET_DEALS_CATEGORIES: "/deals",
  ADD_CATEGORY: "/deals/add-category",
  DELETE_CATEGORY: (id: string) => `/deals/delete-category/${id}`,
  EDIT_CATEGORY: (id: string) => `/deals/edit-category/${id}`,
  GET_CATEGORY_BY_ID: (id: string) => `/deals/get-category/${id}`,
  GET_DEALS_BY_CATEGORY: (category: string, country: string) =>
    `/deals/get-deals-ByCat?category=${category}&country=${country}`,
};

const API_ROUTES = {
  AUTH,
  DEPARTMENT,
  USER,
  PRODUCT,
  CATEGORIES,
  SERVICES,
  ADS,
  NEWS,
  NOTI,
  VEHICLE,
  DEALS,
};
export default API_ROUTES;
