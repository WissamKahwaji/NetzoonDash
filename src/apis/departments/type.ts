export type DepartmentModel = {
  _id: string;
  name: string;
};

export type DepartmentCategoryModel = {
  _id: string;
  name: string;
  nameAr?: string;
  department: {
    _id: string;
    name: string;
  };
  imageUrl: string;
};

export type EditDepartmentCategoryParams = {
  _id: string;
  name: string;
  nameAr?: string;
};

export type FactoryCategoryModel = {
  _id: string;
  title: string;
};
