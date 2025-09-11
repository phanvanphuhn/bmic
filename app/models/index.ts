import { ImageSourcePropType } from "react-native";

export type TProblems = {
  id: number;
  icon: ImageSourcePropType;
  title: string;
  description: string;
};

export type TSolutions = {
  id: number;
  icon: ImageSourcePropType;
  title: string;
  description: string;
};

export interface MainAppScreenProps {
  navigation: any;
}

export interface TheProblemScreenProps {
  navigation: any;
}

export interface OurSolutionScreenProps {
  navigation: any;
}

export interface WhyChooseBMICScreenProps {
  navigation: any;
}

export interface TokenomicScreenProps {
  navigation: any;
}

export interface InvestmentOpportunityScreenProps {
  navigation: any;
}

export interface RoadmapScreenProps {
  navigation: any;
}

export interface ProfileScreenProps {
  navigation: any;
}