export enum IconName {
  book = 'book',
  airBallon = 'airBallon',
  remove = 'remove',
  download = 'download',
  logout = 'logout',
  back = 'back',
  burger = 'burger',
  showMore = 'showMore',
  edit = 'edit',
  deleteItem = 'deleteItem',
  time = 'time',
  calendar = 'calendar',
  exit = 'exit',
  lootsCount = 'lootsCount',
  mapLocation = 'mapLocation',
  users = 'users',
  ticket = 'ticket',
  phone = 'phone',
  email = 'email',
  visibleOn = 'visibleOn',
  visibleOff = 'visibleOff',
  dropdownArrow = 'dropdownArrow',
  invited = 'invited',
  verified = 'verified',
  close = 'close',
  violation = 'violation',
  crown = 'crown',
  person = 'person',
  anchor = 'anchor',
  right = 'right',
  check = 'check',
  scales = 'scales',
  return = 'return',
  eGate = 'eGate',
  fourSquares = 'fourSquares',
  home = 'home',
  journal = 'journal',
  members = 'members',
  tools = 'tools',
  settings = 'settings',
  profile = 'profile',
  investigations = 'investigations',
  logo = 'logo',
  sidebarLogo = 'sidebarLogo',
  active = 'active',
  net = 'net',
  connection = 'connection',
  startFishing = 'startFishing',
  beginFishing = 'beginFishong',
  finishFishing = 'finishFishing',
  fish = 'fish',
  endFishing = 'endFishing',
  location = 'location',
  locationOutline = 'locationOutline',
  researches = 'researches',
  fullscreen = 'fullscreen',
  exitFullScreen = 'exitFullScreen',
  list = 'list',
  openInNew = 'openInNew',
  search = 'search',
}
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
  POWDER = 'powder',
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
