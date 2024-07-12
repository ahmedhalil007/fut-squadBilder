const errorPlayer = (toast) => {
  toast.current.show({
    severity: "warn",
    summary: "Warning",
    detail: "Fill all fields",
    life: 3000,
  });
};

export default errorPlayer;
