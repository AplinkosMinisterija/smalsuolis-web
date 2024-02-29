import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Button } from 'design-system/lib';
import LoaderComponent from '../components/LoaderComponent';
import { useSetPassword, useVerifyUser } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, descriptions } from '../utils/texts';
import UserForm from '../components/UserForm';
import { PasswordForm } from '../utils';

const ResetPassword = () => {
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

  const handleSubmit = (form: PasswordForm) => {
    const props = {
      password: form.password,
    };
    return setPasswordMutation(props);
  };

  return !isSuccess ? (
    <UserForm
      user={data?.user}
      onSubmit={handleSubmit}
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
  );
};

export default ResetPassword;

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
