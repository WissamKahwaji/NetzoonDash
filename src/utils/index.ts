/* eslint-disable @typescript-eslint/no-explicit-any */
export const createFormData = (data: object): FormData => {
  const formData = new FormData();

  const appendToFormData = (obj: any, parentKey?: string): void => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item instanceof File) {
            formData.append(formKey, item);
          } else {
            // appendToFormData(item, `${formKey}[${index}]`);
            formData.append(formKey, item);
          }
        });
      } else if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        appendToFormData(value, formKey);
      } else if (value instanceof File) {
        formData.append(formKey, value);
      } else {
        formData.append(formKey, value);
      }
    });
  };

  appendToFormData(data);

  return formData;
};
