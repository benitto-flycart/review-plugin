export const getClassNameByField = (className: any, fieldName: String) => {
  return className.replace("{{name}}", fieldName);
};

export const echo = (
  objectName: any,
  keyName: string,
  defaultValue: string,
) => {
  return objectName[keyName] ?? defaultValue;
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.data?.message ?? "Server Error Occurred";
};
export const nl2br = (str: string) => {
  return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
};
