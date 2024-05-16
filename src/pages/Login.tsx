import {
  Button,
  CheckBox,
  ContentLayout,
  PasswordField,
  TextField,
} from '@aplinkosministerija/design-system';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext, UserContextType } from '../components/UserProvider';
import { useGetCurrentRoute, useLogin } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, inputLabels, subtitle, titles } from '../utils/texts';
import { loginSchema } from '../utils/validations';
import { getErrorMessage } from '../utils';
const Login = () => {
  const env: any = import.meta.env;
  const currentRoute = useGetCurrentRoute();
  const navigate = useNavigate();

  const { isLoading: userLoading } = useContext<UserContextType>(UserContext);

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: env.VITE_USER || '',
      password: env.VITE_PASSWORD || '',
      refresh: false,
    },
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => login(values),
  });

  const { mutateAsync: login, isPending: loginLoading, error } = useLogin();
  const loading = loginLoading || userLoading;

  const errorMessage = error ? getErrorMessage((error as any)?.response?.data?.type) : null;

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <ContentLayout currentRoute={currentRoute}>
      <Container noValidate onSubmit={handleSubmit}>
        <TextField
          value={values.email}
          type="email"
          name="email"
          error={errors.email as string}
          onChange={(value) => handleType('email', value)}
          label={inputLabels.email}
        />
        <PasswordField
          value={values.password}
          name="password"
          onChange={(value) => handleType('password', value)}
          label={inputLabels.password}
          error={errors.password as string}
          secondLabel={
            <Url onClick={() => navigate(slugs.forgotPassword)}>{titles.forgotPassword}</Url>
          }
        />
        {!!error && <Error>{errorMessage}</Error>}
        <Row>
          <StyledSingleCheckbox
            onChange={(value: any) => handleType('refresh', value)}
            value={values.refresh}
            label={inputLabels.rememberMe}
          />
          <StyledButton loading={loading} disabled={loading} type="submit">
            {buttonsTitles.login}
          </StyledButton>
        </Row>
      </Container>

      <BottomInnerContainer>
        {subtitle.hasNotRegistered}
        <Url onClick={() => navigate(slugs.registration)}>{buttonsTitles.register}</Url>
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

const Error = styled.div`
  color: ${({ theme }) => theme.colors.text.error};
  font-size: 1.4rem;
`;

export default Login;
