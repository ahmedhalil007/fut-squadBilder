const SuccessUpdateTeam = (toast) => {
  toast.current.show({
    severity: "info",
    summary: "Info",
    detail: "Team name updated successfully",
    life: 3000,
  });
};

export default SuccessUpdateTeam;
