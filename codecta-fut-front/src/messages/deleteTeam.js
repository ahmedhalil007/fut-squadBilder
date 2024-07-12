const DeleteTeam = (toast) => {
  toast.current.show({
    severity: "error",
    summary: "Deletion",
    detail: "Team removed successfully",
    life: 3000,
  });
};

export default DeleteTeam;
