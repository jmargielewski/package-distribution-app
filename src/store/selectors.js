// Teams
export const getTeamsIds = (state) => state.teams.allIds;

export const getTeam = (state, id) => state.teams.byId[id];
export const getTeams = (state) => {
  const ids = getTeamsIds(state);
  return ids.map((id) => getTeam(state, id));
};

export const getTeamsIsLoading = (state) => state.teams.isLoading;
export const getTeamsErrorMessage = (state) => state.teams.errors;

// Packages
export const getPackagesIds = (state) => state.packages.allIds;

export const getPackage = (state, id) => state.packages.byId[id];
export const getPackages = (state) => {
  const ids = getPackagesIds(state);
  return ids.map((id) => getPackage(state, id));
};

export const getPackagesIsLoading = (state) => state.packages.isLoading;
export const getPackagesErrorMessage = (state) => state.packages.errors;

// TeamPackages
export const getTeamPackagesIds = (state) => state.teamPackages.allIds;

export const getTeamPackage = (state, id) => state.teamPackages.byId[id];
export const getTeamPackages = (state) => {
  const ids = getTeamPackagesIds(state);
  return ids.map((id) => getTeamPackage(state, id));
};

export const getTeamPackagesIsLoading = (state) => state.teamPackages.isLoading;
export const getTeamPackagesErrorMessage = (state) => state.teamPackages.errors;
