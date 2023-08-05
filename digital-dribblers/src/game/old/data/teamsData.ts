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
    gecleorgia: {
      flagKey: string;
      footballers: {};
    };
  };
}

export interface TeamData {
  formation: Array<number>;
  flag: string;
}
