export const ROUTES = {
  AUTH: 'Auth',
  MAIN_TABS: 'MainTabs',
  HOME_TAB: 'HomeTab',
  PROFILE_TAB: 'ProfileTab',
  HOME_STACK: 'HomeStack',
  MAIN_APP: 'MainApp',
  THE_PROBLEM: 'TheProblem',
  OUR_SOLUTION: 'OurSolution',
  WHY_CHOOSE_BMIC: 'WhyChooseBMIC',
  TOKENOMIC: 'Tokenomic',
  INVESTMENT_OPPORTUNITY: 'InvestmentOpportunity',
  ROADMAP: 'Roadmap',
  PROFILE: 'Profile',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];
