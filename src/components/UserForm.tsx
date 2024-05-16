import { ButtonVariants, ContentLayout, TextField } from '@aplinkosministerija/design-system';
import { buttonsTitles, inputLabels, PasswordForm, useGetCurrentRoute, User } from '../utils';
import PasswordCheckListContainer from './PasswordCheckListContainer';
import styled from 'styled-components';
import { Button, PasswordField } from '@aplinkosministerija/design-system';
import { useFormik } from 'formik';
import { useState } from 'react';

const UserForm = ({
  user,
  onSubmit,
  isLoading,
  initialValues,
  error,
}: {
  user?: User;
  onSubmit: (values: PasswordForm) => Promise<void>;
  isLoading: boolean;
  initialValues: {
    password: string;
    repeatPassword: string;
    oldPassword?: string;
  };
  error?: string | null;
}) => {
  const currentRoute = useGetCurrentRoute();
  const [allValid, setAllValid] = useState(false);
  const { values, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };
  const { repeatPassword, password } = values;

  const updatingPassword = values.oldPassword !== undefined;

  const disableSubmit = isLoading || !allValid || (updatingPassword && !values.oldPassword);

  return (
    <ContentLayout currentRoute={currentRoute}>
      <PasswordContainer noValidate onSubmit={handleSubmit}>
        <TextField
          label={inputLabels.email}
          value={user?.email || ''}
          name="email"
          disabled={true}
        />
        {updatingPassword && (
          <PasswordField
            value={values.oldPassword}
            name="oldPassword"
            onChange={(value) => handleType('oldPassword', value)}
            label={inputLabels.oldPassword}
          />
        )}
        <PasswordField
          value={password}
          name="password"
          onChange={(value) => handleType('password', value)}
          label={updatingPassword ? inputLabels.newPassword : inputLabels.password}
        />
        <PasswordField
          value={repeatPassword}
          name="repeatPassword"
          onChange={(value) => handleType('repeatPassword', value)}
          label={updatingPassword ? inputLabels.repeatNewPassword : inputLabels.repeatPassword}
        />
        <PasswordCheckListContainer
          setAllValid={setAllValid}
          password={password}
          repeatPassword={repeatPassword}
        />
        {!!error && <Error>{error}</Error>}
        <StyledButton
          variant={ButtonVariants.PRIMARY}
          loading={isLoading}
          disabled={disableSubmit}
          type="submit"
        >
          {buttonsTitles.update}
        </StyledButton>
      </PasswordContainer>
    </ContentLayout>
  );
};

export default UserForm;

const PasswordContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
`;

const Error = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.text.error};
  font-size: 1.4rem;
`;
