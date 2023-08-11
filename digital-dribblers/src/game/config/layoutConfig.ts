export const layoutConfig = {
  desktop: {
    gamePlay: {
      stadium: {
        width: 870,
        height: 500,
      },
      hostTeamText: {
        fontSize: 30,
      },
    },
    menu: {
      formationButton: {
        width: 200,
        height: 80,
      },
      menuButton: {
        width: 180,
        height: 150,
        fontSize: 18,
      },
      selectOponentTeamButton: {
        width: 270,
        height: 90,
        fontSize: 26,
      },
      teamOptions: {
        width: 45,
        height: 80,
      },
      tacticsButton: {
        y: 10,
      },
      tacticsOption: {
        background: {
          width: 40,
          height: 80,
        },
      },
      optionsBar: {
        background: {
          height: 20,
        },
        oprionText: {
          fontSize: 15,
          y: 40,
        },
        indicatorTextobject: {
          fontSize: 20,
          x: 0,
          y: -40,
        },
        indicator: {
          width: 40,
        },
      },
    },
  },
  mobile: {
    gamePlay: {
      stadium: {
        width: 500,
        height: 300,
      },
      hostTeamText: {
        fontSize: 14,
      },
    },
    menu: {
      formationButton: {
        width: 200,
        height: 40,
      },
      menuButton: {
        width: 140,
        height: 110,
        fontSize: 12,
      },
      selectOponentTeamButton: {
        width: 170,
        height: 60,
        fontSize: 16,
      },
      teamOptions: {
        width: 50,
        height: 100,
      },
      tacticsButton: {
        y: 10,
      },
      tacticsOption: {
        background: {
          width: 100,
          height: 100,
        },
      },
      optionsBar: {
        background: {
          height: 4,
        },
        oprionText: {
          fontSize: 13,
          y: 16,
        },
        indicatorTextobject: {
          fontSize: 0,
          x: 0,
          y: -10,
        },
        indicator: {
          width: 20,
        },
      },
    },
  },
};

export const screenSize = () => {
  if (document.body.clientWidth > 1038) return layoutConfig.desktop;
  return layoutConfig.mobile;
};
