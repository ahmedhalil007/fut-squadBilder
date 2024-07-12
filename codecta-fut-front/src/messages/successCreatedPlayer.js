const SuccessCreatedPlayer = (toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: "Player created successfully",
    life: 3000,
  });
};

export default SuccessCreatedPlayer;
