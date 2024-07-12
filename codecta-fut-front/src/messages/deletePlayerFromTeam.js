const deletePlayerFromTeam = (toast) => {
  toast.current.show({
    severity: "error",
    summary: "Deletion",
    detail: "Player removed from team",
    life: 3000,
  });
};

export default deletePlayerFromTeam;
