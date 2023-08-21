export enum Resources {
  LOGIN = "auth/login",
  REFRESH_TOKEN = "auth/refresh",
  VERIFY_USER = "auth/change/verify",
  SET_PASSWORD = "auth/change/accept",
  REMIND_PASSWORD = "auth/remind",
  LOG_OUT = "users/logout",
  ME = "users/me",
  events = "events"
}

export enum ServerErrorCodes {
  NOT_FOUND = "404",
  NO_PERMISSION = "401"
}

export enum Size {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE"
}

export enum EventStatusTypes {
  UPCOMING = "UPCOMING",
  FINISHED = "FINISHED"
}
