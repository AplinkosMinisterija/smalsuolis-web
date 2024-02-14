import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import CheckBox from '../components/buttons/Checkbox';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import ContentLayout from '../components/layouts/ContentLayout';
import { useGetUserInfoQuery, useLogin } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, inputLabels, titles } from '../utils/texts';
import { loginSchema } from '../utils/validations';

const Login = () => {
  const navigate = useNavigate();
  const { isLoading: userLoading } = useGetUserInfoQuery();
  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      refresh: false,
    },
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => login(values),
  });

  const { mutateAsync: login, isPending: loginLoading } = useLogin();

  const loading = [loginLoading, userLoading].some((loading) => loading);

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
