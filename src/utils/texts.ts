import { EventStatusTypes } from './constants';

export const validationTexts = {
  requireText: 'Privalote įvesti',
  tooFrequentRequest: 'Nepavyko, per dažna užklausa prašome pabandyti veliau ',
  emailExist: 'Naudotojas su tokiu el. paštu egzistuoja',
  error: 'Įvyko nenumatyta klaida, prašome pabandyti vėliau',
  validFirstName: 'Įveskite taisyklingą vardą',
  validLastName: 'Įveskite taisyklingą pavardę',
  formFillError: 'Neteisingai užpildyta forma',
  badPhoneFormat: 'Blogai įvestas telefono numeris',
  badEmailFormat: 'Blogas el. pašto formatas',
  offline: 'Šiuo metu esate neprisijungęs',
  requireMap: 'Privalote pasirinkti vietą žemėlapyje',
  requirePhotos: 'Privalote įkelti nuotrauką',
  userDeniedLocation: 'Turite leisti nustatyti jūsų buvimo vietą',
  profileUpdated: 'Profilis atnaujintas',
};

export const inputLabels = {
  password: 'Slaptažodis',
  phone: 'Telefono numeris',
  rememberMe: 'Likti prisijungus',
  newPassword: 'Naujas slaptažodis',
  repeatNewPassword: 'Pakartokite naują slaptažodį',
  currentLocation: 'dabartinė vieta',
  chooseOption: 'Pasirinkite',
  lastName: 'Pavardė',
  firstName: 'Vardas',
  email: 'Elektroninis paštas',
  noOptions: 'Nėra pasirinkimų',
};

export const buttonLabels = {
  login: 'Prisijungti',
  logout: 'Atsijungti',
  website: 'Tinklalapis',
};

export const titles = {
  myEvents: 'Mano naujienos',
  allEvents: 'Visos naujienos',
  login: 'Prisijungimas',
  profile: 'Profilis',
  forgotPassword: 'Pamiršote slaptažodį?',
  registration: 'Registracija',
  remindPassword: 'Slaptažodžio priminimas',
  passwordChanged: 'Slaptažodis pakeistas',
  createAccount: 'Sukurti Paskyra',
  resetPassword: 'Atkurti slaptažodį',
  passwordCreated: 'Slaptažodis sukurtas',
  newPassword: 'Nustatyti naują slaptažodį',
  emptyState: 'Jūsų naujienų srautas yra tuščias',
};

export const monthShorthands = [
  'SAU',
  'VAS',
  'KOV',
  'BAL',
  'GEG',
  'BIR',
  'LIE',
  'RGP',
  'RGS',
  'SPL',
  'LAP',
  'GRD',
];

export const descriptions = {
  emptyState:
    'Jūsų pasirinktos temos ar šaltiniai šiuo metu neturi naujienų, galite palaukti arba pakoreguoti savo prenumeratos nustatymus',
  forgotPassword:
    'Jeigu pamiršote slaptažodį, įrašykite savo el. pašto adresą ir mes padėsime jį atkurti',
  newAccount:
    'Jeigu norite prisiregistruoti, įrašykite savo el. pašto adresą ir mes jums atsiųsime jums instrukciją, per kuria galėsite užsiregistruoti.',

  resetPassword: 'Naujas slaptažodis neturi sutapti su senuoju slaptažodžiu',
  instructionSent: 'Jūsų nurodytu el. paštu išsiuntėme prisijungimo instrukciją',
  passwordChanged: 'Jūsų slaptažodis sėkmingai pakeistas. Galite prisijungti prie paskyros',
  updateUserInfo: 'Atnaujinti darbuotojo informaciją',
  myProfile: 'Mano profilis',
  login: 'Greitosios pagalbos pavežėjimo aplikacija vairuotojams',
};

export const buttonsTitles = {
  resetPassword: 'Atstatyti slaptažodį',
  createAccount: 'Sukurti paskyrą',
  update: 'Atnaujinti',
  createPassword: 'Nustatyti slaptažodį',
  login: 'Prisijungti',
  loginEvv: 'Prisijungti per El. valdžios vartus',
  save: 'Išsaugoti',
  back: 'Grįžti atgal',
  logout: 'Atsijungti',
  profile: 'Profilis',
  edit: 'Redaguoti',
};

export const toasts = {
  profileUpdated: 'Profilis atnaujintas',
};

export const formLabels = {
  selectProfile: 'Pasirinkite paskyrą',
  login: 'Prisijungti',
  inActiveProfile: 'Anketa neaktyvi',
  tripDeclined: 'Pavėžėjimas atšauktas',
  tripEnded: 'Pavėžėjimas pabaigtas',
};

export const stateLabels = {
  start: 'Atvykau paimti',
  tripStart: 'Pradedu kelionę',
  tripEnd: 'Atvykau į tikslą',
  end: 'Išlaipinau pacientą',
  decline: 'Atšaukti pavėžėjimą',
};

export const eventStatusLabels = {
  [EventStatusTypes.UPCOMING]: 'Būsimi',
  [EventStatusTypes.FINISHED]: 'Įvykę',
};
