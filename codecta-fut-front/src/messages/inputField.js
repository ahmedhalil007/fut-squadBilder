const inputField = (toast) => {
  toast.current.show({
    severity: "error",
    summary: "Warning",
    detail: "Fill all fields",
    life: 3000,
  });
};

export default inputField;
