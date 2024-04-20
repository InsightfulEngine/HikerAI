import { MouseEventHandler } from "react";

export interface TrailProps {
  name: string;
  location: string;
  difficulty: string;
  length: string;
  noise: string;
  rating: string;
}

export interface FilterProps {
  borough?: string;
  length?: string;
  rating?: string;
  noise?: string;
  difficulty?: string;
  limit?: number;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface TrailCardProps {
  name: string;
  location: string;
  difficulty: string;
  length: string;
  noise: string;
  rating: string;
}

export interface LimitedTrails {
  [borough: string]: TrailCardProps[];
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
