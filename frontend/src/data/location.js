export const getLocation = (pathname) => {
  const parts = pathname.split("/");
  const lastPart = parts.filter(Boolean).pop();
  const location = "/" + lastPart||' ';
  
  return location;
};
