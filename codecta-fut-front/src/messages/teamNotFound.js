const teamNotFound = (toast) => {
  toast.current.show({
    severity: "error",
    summary: "Error",
    detail: "Team not found",
    life: 3000,
  });
};

export default teamNotFound;
