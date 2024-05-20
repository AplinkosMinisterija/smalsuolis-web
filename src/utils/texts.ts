import { Frequency, ServerErrors } from './constants';

export const validationTexts = {
  requireText: 'Privalote įvesti',
  tooFrequentRequest: 'Nepavyko, per dažna užklausa prašome pabandyti veliau ',
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
  registration: 'Registracija sėkminga',
  appsNotSelected: 'Pasirinkite bent vieną sritį',
  [ServerErrors.WRONG_PASSWORD]: 'Neteisingai įvestas el. paštas arba slaptažodis',
  [ServerErrors.USER_NOT_FOUND]: 'Naudotojo su tokiu el. paštu nėra',
  [ServerErrors.WRONG_OLD_PASSWORD]: 'Neteisingai įvestas senas slaptažodis',
  [ServerErrors.USER_EXISTS]: 'Naudotojas su tokiu el. paštu egzistuoja',
};

export const inputLabels = {
  password: 'Slaptažodis',
  repeatPassword: 'Pakartokite slaptažodį',
  oldPassword: 'Dabartinis slaptažodis',
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

export const titles = {
  about: 'Apie mus',
  myEvents: 'Mano naujienos',
  allEvents: 'Visos naujienos',
  login: 'Prisijungimas',
  profile: 'Profilis',
  subscriptions: 'Prenumeratos',
  subscription: 'Prenumeratos valdymas',
  forgotPassword: 'Pamiršote slaptažodį?',
  registration: 'Registracija',
  remindPassword: 'Slaptažodžio priminimas',
  passwordChanged: 'Slaptažodis pakeistas',
  createAccount: 'Sukurti paskyrą',
  resetPassword: 'Atkurti slaptažodį',
  passwordCreated: 'Slaptažodis sukurtas',
  newPassword: 'Nustatyti naują slaptažodį',
  myEventsEmptyState: 'Jūsų naujienų srautas yra tuščias',
  eventsEmptyState: 'Naujienų srautas yra tuščias',
};

export const descriptions = {
  myEventsEmptyState:
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
  subscribeNews: 'Prenumeruoti naujienas',
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
  filter: 'Filtruoti',
  close: 'Uždaryti',
  clearFilter: 'Išvalyti filtrą',
  showMap: 'Rodyti žemėlapį',
  showList: 'Rodyti sąrašą',
  visitWebsite: 'Aplankykite svetainę',
  register: 'Registruotis',
};

export const subtitle = {
  about: 'Domina, kas vyksta aplinkui tave?',
  subscription: 'Prenumerata',
  subscriptions: 'Prenumeratos',
  foundRecords: 'Rasta įrašų',
  future: 'Būsimas',
  category: 'Kategorijos',
  date: 'Data',
  hasNotRegistered: 'Neturite paskyros?',
};

export const subscriptionFrequencyTitles = {
  [Frequency.DAY]: 'kas dieną',
  [Frequency.WEEK]: 'kas savaitę',
  [Frequency.MONTH]: 'kas mėnesį',
};
