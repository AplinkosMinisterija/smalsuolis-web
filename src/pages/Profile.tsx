import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleToastSuccess, PasswordForm, validationTexts, UpdatePassword } from '../utils';
import api from '../utils/api';
import { UserContext, UserContextType } from '../components/UserProvider';
import UserForm from '../components/UserForm';

const Profile = () => {
  const queryClient = useQueryClient();

  const { data: user } = useContext<UserContextType>(UserContext);

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: (values: UpdatePassword) => {
      return api.updateProfile(values);
    },
    onSuccess: () => {
      handleToastSuccess(validationTexts.profileUpdated);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleSubmit = (form: PasswordForm) => {
    const props: any = {
      password: form.password,
      oldPassword: form.oldPassword,
    };
    return mutateAsync(props);
  };

  return (
    <UserForm
      user={user}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialValues={{
        password: '',
        repeatPassword: '',
        oldPassword: '',
      }}
    />
  );
};

export default Profile;
