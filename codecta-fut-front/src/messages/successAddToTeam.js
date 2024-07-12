const SuccessAddToTeam = (toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: "Player added to team successfully",
    life: 3000,
  });
};

export default SuccessAddToTeam;
