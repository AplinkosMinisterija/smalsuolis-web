import ContentLayout from '../layouts/ContentLayout';
import TextField from '../fields/TextField';
import { buttonsTitles, inputLabels, PasswordForm, User } from '../../utils';
import PasswordField from '../fields/PasswordField';
import PasswordCheckListContainer from '../other/PasswordCheckListContainer';
import styled from 'styled-components';
import Button from '../buttons/Button';
import { useFormik } from 'formik';
import { useState } from 'react';

const UserForm = ({
  user,
  onSubmit,
  isLoading,
  initialValues,
}: {
  user?: User;
  onSubmit: (values: PasswordForm) => Promise<void>;
  isLoading: boolean;
  initialValues: {
    password: string;
    repeatPassword: string;
    oldPassword?: string;
  };
}) => {
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
  const disableSubmit = isLoading || ((!!password || !!repeatPassword) && !allValid);

  const setPassword = values.oldPassword === undefined;

  return (
    <ContentLayout>
      <PasswordContainer noValidate onSubmit={handleSubmit}>
        <TextField
          label={inputLabels.email}
          value={user?.email || ''}
          name="email"
          disabled={true}
        />
        {!setPassword && (
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
          label={setPassword ? inputLabels.password : inputLabels.newPassword}
        />
        <PasswordField
          value={repeatPassword}
          name="repeatPassword"
          onChange={(value) => handleType('repeatPassword', value)}
          label={setPassword ? inputLabels.repeatPassword : inputLabels.repeatNewPassword}
        />
        <PasswordCheckListContainer
          setAllValid={setAllValid}
          password={password}
          repeatPassword={repeatPassword}
        />
        <StyledButton loading={isLoading} disabled={disableSubmit} type="submit">
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
