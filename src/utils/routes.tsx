import CreateUser from "../pages/CreateUser";
import Event from "../pages/Event";
import Events from "../pages/Events";
import RemindPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const slugs = {
  login: "/prisijungimas/",
  forgotPassword: "/pamirsau",
  registration: "/registracija",
  createAccount: "/sukurti-paskyra",
  profile: "/profilis",
  events: "/ivykiai",
  event: (id: string) => `/ivykis/${id}`
};

export const routes = [
  {
    component: <Login />,
    slug: slugs.login
  },
  {
    component: <RemindPassword />,
    slug: slugs.forgotPassword
  },
  {
    component: <Registration />,
    slug: slugs.registration
  },
  {
    component: <CreateUser />,
    slug: slugs.createAccount
  },
  {
    component: <Events />,
    slug: slugs.events
  },
  {
    component: <Event />,
    slug: slugs.event(":id")
  }
];
