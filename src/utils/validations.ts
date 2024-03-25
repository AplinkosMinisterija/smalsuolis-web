import * as Yup from 'yup';
import { validationTexts } from './texts';
import { Frequency } from './constants';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(validationTexts.requireText).email(validationTexts.badEmailFormat),
  password: Yup.string().required(validationTexts.requireText),
});
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required(validationTexts.requireText).email(validationTexts.badEmailFormat),
});
export const validateSubscriptionForm = Yup.object().shape({
  active: Yup.boolean().required(validationTexts.requireText),
  apps: Yup.array()
    .min(1, validationTexts.appsNotSelected)
    .of(Yup.number())
    .required(validationTexts.requireText),
  geom: Yup.object().required(validationTexts.requireText),
  frequency: Yup.mixed().oneOf(Object.values(Frequency)).required(validationTexts.requireText),
});
