import { useFormik } from 'formik';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import ContentLayout from '../components/layouts/ContentLayout';
import PasswordCheckListContainer from '../components/other/PasswordCheckListContainer';
import { useAppSelector } from '../state/hooks';
import { handleSuccess, useGetUserInfoQuery } from '../utils';
import api from '../utils/api';
import { buttonsTitles, inputLabels, validationTexts } from '../utils/texts';

const Profile = () => {
  const [allValid, setAllValid] = useState(false);

  const { data: user, isLoading: userLoading, error } = useGetUserInfoQuery();

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: (values: {
      password: string;
      repeatPassword: string;
      firstName: string;
      lastName: string;
    }) => {
      return api.updateProfile(values);
    },

    onSuccess: () => {
      handleSuccess(validationTexts.profileUpdated);
    },
  });

  //TODO: would be better if not used as a hook
  const { values, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
    onSubmit: (values) => {
      mutateAsync(values);
    },
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  const { repeatPassword, password } = values;

  const disableSubmit =
    isLoading ||
    ((!!password || !!repeatPassword) && !allValid) ||
    !values.firstName ||
    !values.lastName;

  return (
    <ContentLayout>
      <PasswordContainer noValidate onSubmit={handleSubmit}>
        <TextField
          label={inputLabels.firstName}
          value={values.firstName}
          name="firstName"
          onChange={(firstName) => handleType('firstName', firstName)}
        />
        <TextField
          label={inputLabels.lastName}
          name="lastName"
          value={values.lastName}
          onChange={(lastName) => handleType('lastName', lastName)}
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

export default Profile;

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
