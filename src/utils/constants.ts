import { IconName } from '../components/other/Icons';

export enum ServerErrorCodes {
  NOT_FOUND = '404',
  NO_PERMISSION = '401',
}

export enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum EventStatusTypes {
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED',
}

export enum ButtonColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  SUCCESS = 'success',
  TRANSPARENT = 'transparent',
}

export enum AppType {
  INFO_CONSTRUCTION = 'infostatyba',
  FISH_STOCKING = 'zuvinimas',
}

export const appKeyToIconName = {
  [AppType.INFO_CONSTRUCTION]: IconName.home,
  [AppType.FISH_STOCKING]: IconName.fish,
};

export const appKeyToName = {
  [AppType.INFO_CONSTRUCTION]: 'Statybos leidimas',
  [AppType.FISH_STOCKING]: 'Planuojamas Žuvinimas',
};

export enum Frequency {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}
