const SuccessCreatedTeam = (toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: "Team created successfully",
    life: 3000,
  });
};

export default SuccessCreatedTeam;
