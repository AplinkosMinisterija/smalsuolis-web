import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import ContentLayout from '../components/layouts/ContentLayout';
import { LoginTitle } from '../components/other/CommonStyles';
import LoaderComponent from '../components/other/LoaderComponent';
import PasswordCheckListContainer from '../components/other/PasswordCheckListContainer';
import { useSetPassword, useVerifyUser } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, descriptions, inputLabels, titles } from '../utils/texts';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useVerifyUser();
  const [allValid, setAllValid] = useState(false);
  const {
    mutateAsync: setPasswordMutation,
    isSuccess,
    isLoading: isSubmitLoading,
  } = useSetPassword();

  const { values, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validateOnChange: false,
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
    <ContentLayout>
      {!isSuccess ? (
        <PasswordContainer noValidate onSubmit={handleSubmit}>
          <Description>{descriptions.resetPassword}</Description>
          <TextField value={data?.user?.email} disabled={true} label={inputLabels.email} />
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
          <Button loading={isSubmitLoading} disabled={isSubmitLoading || !allValid} type="submit">
            {buttonsTitles.createPassword}
          </Button>
        </PasswordContainer>
      ) : (
        <SuccessContainer>
          <LoginTitle>{titles.passwordChanged}</LoginTitle>
          <Description>{descriptions.passwordChanged}</Description>
          <Button onClick={() => navigate(slugs.login)}>{buttonsTitles.login}</Button>
        </SuccessContainer>
      )}
    </ContentLayout>
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

const Description = styled.div`
  font-weight: normal;
  font-size: 1.4rem;
  color: #121926;
`;
