const WarnAddToTeam = (toast) => {
  toast.current.show({
    severity: "warn",
    summary: "Warning",
    detail: "Player is already in the team",
    life: 3000,
  });
};

export default WarnAddToTeam;
