import * as Yup from 'yup';
import { Frequency } from './constants';
import { validationTexts } from './texts';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(validationTexts.requireText).email(validationTexts.badEmailFormat),
  password: Yup.string().required(validationTexts.requireText),
});
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required(validationTexts.requireText).email(validationTexts.badEmailFormat),
  agree: Yup.bool().oneOf([true]),
});
export const validateSubscriptionForm = Yup.object().shape({
  name: Yup.string().required(validationTexts.requireText).min(1),
  active: Yup.boolean().required(validationTexts.requireText),
  apps: Yup.array()
    .min(1, validationTexts.appsNotSelected)
    .of(Yup.number())
    .required(validationTexts.requireText),
  geom: Yup.object().required(validationTexts.requireText),
  frequency: Yup.mixed().oneOf(Object.values(Frequency)).required(validationTexts.requireText),
});
