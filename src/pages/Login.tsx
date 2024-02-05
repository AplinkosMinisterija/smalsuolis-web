import { useFormik } from 'formik';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import CheckBox from '../components/buttons/Checkbox';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import LoginLayout from '../components/layouts/LoginLayout';
import { LoginTitle } from '../components/other/CommonStyles';
import api from '../utils/api';
import { getErrorMessage } from '../utils/functions';
import { useCheckAuthMutation } from '../utils/hooks';
import { handleUpdateTokens } from '../utils/loginFunctions';
import { slugs } from '../utils/routes';
import { buttonsTitles, inputLabels, titles } from '../utils/texts';
import { ReactQueryError } from '../utils/types';
import { loginSchema } from '../utils/validations';

interface LoginProps {
  email: string;
  password: string;
  refresh: boolean;
}

const Login = () => {
  const captchaRef = useRef<any>();
  const navigate = useNavigate();
  const handleLogin = async (values: LoginProps) => {
    const captchaToken = await captchaRef?.current?.execute();
    const { email, password, refresh } = values;
    const params = {
      password,
      refresh,
      email: email.toLocaleLowerCase(),
      captchaToken,
    };

    return await api.login(params);
  };

  const handleError = ({ response }: ReactQueryError): any => {
    const text = getErrorMessage(response?.data?.message);
    return setErrors({ email: text });
  };

  const loginMutation = useMutation((params: LoginProps) => handleLogin(params), {
    onError: handleError,
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
    retry: false,
  });

  const { isLoading: checkAuthLoading } = useCheckAuthMutation();

  const loading = [loginMutation.isLoading, checkAuthLoading].some((loading) => loading);

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      refresh: false,
    },
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => loginMutation.mutateAsync(values),
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <LoginLayout>
      <Container noValidate onSubmit={handleSubmit}>
        <LoginTitle>{titles.login}</LoginTitle>
        <TextField
          value={values.email}
          type="email"
          name="email"
          error={errors.email}
          onChange={(value) => handleType('email', value)}
          label={inputLabels.email}
          testId="login_email_field"
        />
        <PasswordField
          value={values.password}
          name="password"
          error={errors.password}
          onChange={(value) => handleType('password', value)}
          label={inputLabels.password}
          secondLabel={
            <Url onClick={() => navigate(slugs.forgotPassword)}>{titles.forgotPassword}</Url>
          }
          testId="login_password_field"
        />
        <Row>
          <StyledSingleCheckbox
            onChange={(value) => handleType('refresh', value)}
            value={values.refresh}
            label={inputLabels.rememberMe}
          />
          <StyledButton loading={loading} disabled={loading} type="submit">
            {buttonsTitles.login}
          </StyledButton>
        </Row>

        <ReCAPTCHA
          ref={captchaRef}
          size="invisible"
          sitekey="6LdydlggAAAAAO-vBvg9yBWEVxlulH5b4X6BijMV"
        />
      </Container>

      <BottomInnerContainer>
        Neturite paskyros?
        <Url onClick={() => navigate(slugs.registration)}>Susikurkite</Url>
      </BottomInnerContainer>
    </LoginLayout>
  );
};

const BottomInnerContainer = styled.div`
  margin-top: 20px;
  font-size: 1.4rem;
  color: #4b5565;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 16px;
`;

const StyledSingleCheckbox = styled(CheckBox)`
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  flex-basis: auto;
  flex-grow: 1;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Url = styled.div`
  font-size: 1.4rem;
  color: #0862ab;
  cursor: pointer;
`;

export default Login;
