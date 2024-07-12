const WarnCreateTeam = (toast) => {
  toast.current.show({
    severity: "warn",
    summary: "Warning",
    detail: "Enter a name",
    life: 3000,
  });
};

export default WarnCreateTeam;
