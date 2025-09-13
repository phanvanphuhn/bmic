export const ROUTES = {
  AUTH: 'Auth',
  MAIN_TABS: 'MainTabs',
  HOME_TAB: 'HomeTab',
  PROFILE_TAB: 'ProfileTab',
  HOME_STACK: 'HomeStack',
  PROFILE_STACK: 'ProfileStack',
  MAIN_APP: 'MainApp',
  THE_PROBLEM: 'TheProblem',
  OUR_SOLUTION: 'OurSolution',
  WHY_CHOOSE_BMIC: 'WhyChooseBMIC',
  TOKENOMIC: 'Tokenomic',
  INVESTMENT_OPPORTUNITY: 'InvestmentOpportunity',
  ROADMAP: 'Roadmap',
  PROFILE: 'Profile',
  APP_INFO: 'AppInfo',
  ACCOUNT_SETTINGS: 'AccountSettings',
  NOTIFICATION_SETTINGS: 'NotificationSettings',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];
