import { Button, ContentLayout } from '@aplinkosministerija/design-system';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LoaderComponent from '../components/LoaderComponent';
import UserForm from '../components/UserForm';
import { PasswordForm } from '../utils';
import { useGetCurrentRoute, useSetPassword, useVerifyUser } from '../utils/hooks';
import { slugs } from '../utils/routes';
import { buttonsTitles, descriptions } from '../utils/texts';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useVerifyUser();
  const currentRoute = useGetCurrentRoute();
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
    <ContentLayout currentRoute={currentRoute}>
      <SuccessContainer>
        <Description>{descriptions.passwordChanged}</Description>
        <Button onClick={() => navigate(slugs.login)}>{buttonsTitles.login}</Button>
      </SuccessContainer>
    </ContentLayout>
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
