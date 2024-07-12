const deletePlayerSu = (toast) => {
  toast.current.show({
    severity: "error",
    summary: "Deletion",
    detail: "Player deleted",
    life: 3000,
  });
};

export default deletePlayerSu;
