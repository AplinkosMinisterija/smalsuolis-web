import ContentLayout from '../layouts/ContentLayout';
import TextField from '../fields/TextField';
import { buttonsTitles, inputLabels, PasswordReset, User } from '../../utils';
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
}: {
  user?: User;
  onSubmit: (values: PasswordReset) => Promise<void>;
  isLoading: boolean;
}) => {
  const [allValid, setAllValid] = useState(false);
  const { values, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    } as PasswordReset,
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

  return (
    <ContentLayout>
      <PasswordContainer noValidate onSubmit={handleSubmit}>
        <TextField
          label={inputLabels.email}
          value={user?.email || ''}
          name="email"
          disabled={true}
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
