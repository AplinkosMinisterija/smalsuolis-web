import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import ContentLayout from '../components/layouts/ContentLayout';
import LoaderComponent from '../components/other/LoaderComponent';
import PasswordCheckListContainer from '../components/other/PasswordCheckListContainer';
import { useSetPassword, useVerifyUser } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, descriptions, inputLabels } from '../utils/texts';
import UserForm from '../components/forms/UserForm';
import { PasswordForm } from '../utils';

const CreatePassword = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useVerifyUser();
  const {
    mutateAsync: setPasswordMutation,
    isSuccess,
    isLoading: isSubmitLoading,
  } = useSetPassword();

  if (isLoading) {
    return <LoaderComponent />;
  }

  const handlePassword = (form: PasswordForm) => {
    const props = {
      password: form.password,
    };
    return setPasswordMutation(props);
  };

  return (
    <ContentLayout>
      {!isSuccess ? (
        <UserForm
          user={data?.user}
          onSubmit={handlePassword}
          isLoading={isSubmitLoading}
          initialValues={{
            password: '',
            repeatPassword: '',
          }}
        />
      ) : (
        <SuccessContainer>
          <Description>{descriptions.passwordChanged}</Description>
          <Button onClick={() => navigate(slugs.login)}>{buttonsTitles.login}</Button>
        </SuccessContainer>
      )}
    </ContentLayout>
  );
};

export default CreatePassword;

const PasswordContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
`;

const Description = styled.div`
  text-align: center;
`;
