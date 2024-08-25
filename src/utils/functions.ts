export const toBoolean = (value: any) => {
  if (["true", true].includes(value)) return true;
  if (["false", false].includes(value)) return false;
  return false;
};
