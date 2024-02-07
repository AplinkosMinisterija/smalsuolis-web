import { useFormik } from 'formik';
import { useRef } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import CheckBox from '../components/buttons/Checkbox';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import ContentLayout from '../components/layouts/ContentLayout';
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
    <ContentLayout>
      <Container noValidate onSubmit={handleSubmit}>
        <TextField
          value={values.email}
          type="email"
          name="email"
          error={errors.email}
          onChange={(value) => handleType('email', value)}
          label={inputLabels.email}
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
      </Container>

      <BottomInnerContainer>
        Neturite paskyros?
        <Url onClick={() => navigate(slugs.registration)}>Registruotis</Url>
      </BottomInnerContainer>
    </ContentLayout>
  );
};
const StyledSingleCheckbox = styled(CheckBox)`
  flex-grow: 1;
`;

const BottomInnerContainer = styled.div`
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
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

const StyledButton = styled(Button)`
  flex-basis: auto;
  flex-grow: 1;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Url = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

export default Login;
