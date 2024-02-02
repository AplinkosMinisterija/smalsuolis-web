import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import LoginLayout from '../components/layouts/LoginLayout';
import { LoginTitle } from '../components/other/CommonStyles';
import LoaderComponent from '../components/other/LoaderComponent';
import PasswordCheckListContainer from '../components/other/PasswordCheckListContainer';
import ReturnToLogin from '../components/other/ReturnToLogin';
import { useSetPassword, useVerifyUser } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, descriptions, inputLabels, titles } from '../utils/texts';
import { validateCreateUserForm } from '../utils/validations';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useVerifyUser();
  const [allValid, setAllValid] = useState(false);
  const {
    mutateAsync: setPasswordMutation,
    isSuccess,
    isLoading: isSubmitLoading,
  } = useSetPassword();

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      repeatPassword: '',
    },
    validateOnChange: false,
    validationSchema: validateCreateUserForm,
    onSubmit: (values: { password: string }) => {
      if (!allValid) return;

      setPasswordMutation({ password: values.password });
    },
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  const { repeatPassword, password } = values;

  return (
    <LoginLayout>
      {!isSuccess ? (
        <PasswordContainer noValidate onSubmit={handleSubmit}>
          <LoginTitle>{titles.createAccount}</LoginTitle>
          <TextField value={data?.user?.email} disabled={true} label={inputLabels.email} />
          <TextField
            label={inputLabels.firstName}
            value={values.firstName}
            error={errors.firstName}
            name="firstName"
            onChange={(firstName) => handleType('firstName', firstName?.trim())}
          />
          <TextField
            label={inputLabels.lastName}
            name="lastName"
            value={values.lastName}
            error={errors.lastName}
            onChange={(lastName) => handleType('lastName', lastName?.trim())}
          />
          <TextField
            label={inputLabels.phone}
            value={values.phone}
            error={errors.phone}
            name="phone"
            placeholder="868888888"
            onChange={(phone) => handleType('phone', phone)}
          />

          <PasswordField
            value={password}
            name="password"
            onChange={(value) => handleType('password', value)}
            label={inputLabels.password}
          />
          <PasswordField
            value={repeatPassword}
            name="repeatPassword"
            onChange={(value) => handleType('repeatPassword', value)}
            label={inputLabels.password}
          />
          <PasswordCheckListContainer
            setAllValid={setAllValid}
            password={password}
            repeatPassword={repeatPassword}
          />
          <StyledButton
            loading={isSubmitLoading}
            disabled={isSubmitLoading || !allValid}
            type="submit"
          >
            {buttonsTitles.createAccount}
          </StyledButton>

          <ReturnToLogin />
        </PasswordContainer>
      ) : (
        <SuccessContainer>
          <LoginTitle>{titles.createAccount}</LoginTitle>
          <Description>{descriptions.passwordChanged}</Description>
          <Button onClick={() => navigate(slugs.login)}>{buttonsTitles.login}</Button>
        </SuccessContainer>
      )}
    </LoginLayout>
  );
};

export default ResetPassword;

const PasswordContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
`;

const Description = styled.div`
  font-weight: normal;
  font-size: 1.4rem;
  color: #121926;
`;
