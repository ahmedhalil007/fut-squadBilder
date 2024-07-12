const playerUpdateSu = (toast) => {
  toast.current.show({
    severity: "info",
    summary: "Player Updated",
    detail: "The player has been successfully updated.",
    life: 3000,
  });
};

export default playerUpdateSu;
