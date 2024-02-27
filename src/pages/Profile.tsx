import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import { handleToastSuccess, PasswordReset, validationTexts } from '../utils';
import api from '../utils/api';
import { UserContext, UserContextType } from '../components/UserProvider';
import UserForm from '../components/forms/UserForm';

const Profile = () => {
  const queryClient = useQueryClient();

  const { data: user } = useContext<UserContextType>(UserContext);

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: (values: PasswordReset) => {
      return api.updateProfile(values);
    },
    onSuccess: () => {
      handleToastSuccess(validationTexts.profileUpdated);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return <UserForm user={user} onSubmit={mutateAsync} isLoading={isLoading} />;
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

const StyledButton = styled(Button)`
  margin-top: 32px;
`;
