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

const CreatePassword = () => {
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
          <StyledButton
            loading={isSubmitLoading}
            disabled={isSubmitLoading || !allValid}
            type="submit"
          >
            {buttonsTitles.update}
          </StyledButton>
        </PasswordContainer>
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
