export const teamsData = {
  nations: {
    georgia: {
      flagKey: "georgia-flag",
      footballers: {},
    },
  },
  teams: {},
};

export interface TeamsData {
  nations: {
    georgia: {
      flagKey: string;
      footballers: {};
    };
  };
}

export interface TeamData {
  formation: [4, 4, 2];
  flag: "georgia-flag";
}
