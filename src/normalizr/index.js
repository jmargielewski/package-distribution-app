const formateTeamsEntity = (items) => {
  const allIds = [];
  const byId = {};

  items.forEach((item) => {
    const { teamId } = item;

    byId[teamId] = {
      ...item,
    };
    allIds.push(teamId);
  });

  return { byId, allIds };
};

const formatePackagesEntity = (items) => {
  const allIds = [];
  const byId = {};

  items.forEach((item) => {
    const { packageId } = item;

    byId[packageId] = {
      ...item,
    };
    allIds.push(packageId);
  });

  return { byId, allIds };
};

const formateTeamPackagesEntity = (items) => {
  const allIds = [];
  const byId = {};

  items.forEach((item) => {
    const { teamPackageId } = item;

    byId[teamPackageId] = {
      ...item,
    };
    allIds.push(teamPackageId);
  });

  return { byId, allIds };
};

export { formateTeamsEntity, formatePackagesEntity, formateTeamPackagesEntity };
