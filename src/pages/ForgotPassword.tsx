import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { Button, ContentLayout, TextField } from '@aplinkosministerija/design-system';
import api from '../utils/api';
import { getErrorMessage } from '../utils/functions';
import { buttonsTitles, descriptions, inputLabels, validationTexts } from '../utils/texts';
import { ReactQueryError } from '../utils/types';
import { forgotPasswordSchema } from '../utils/validations';
import PageActions from '../components/PageActions';
import { useNavigate } from 'react-router';
import { slugs } from '../utils';
import { useGetCurrentRoute } from '../utils';

const RemindPassword = () => {
  const navigate = useNavigate();
  const currentRoute = useGetCurrentRoute();
  const handleRemindPassword = async (values: { email: string }) => {
    const { email } = values;
    const params = { email: email.toLocaleLowerCase() };

    return await api.remindPassword(params);
  };

  const handleError = ({ response }: ReactQueryError): any => {
    const text = getErrorMessage(response?.data?.message);
    if (text) {
      return setErrors({ email: text });
    }
  };

  const handleSuccess = (response: { invalidUntil: Date; url: string; success: boolean }): any => {
    if (response.invalidUntil) {
      return setErrors({
        email: validationTexts.tooFrequentRequest,
      });
    }
    if (response?.url) {
      const url = new URL(response.url);
      url.hostname = window.location.hostname;
      url.port = window.location.port;
      url.protocol = window.location.protocol;
      console.log(url.href);
      alert(url.href);
    }
  };

  const {
    mutateAsync,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (params: { email: string }) => handleRemindPassword(params),

    onError: handleError,
    onSuccess: handleSuccess,
  });

  const isSuccess = !!data;

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => mutateAsync({ email: values.email }),
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <ContentLayout
      currentRoute={currentRoute}
      pageActions={<PageActions onGoBack={() => navigate(slugs.login)} />}
    >
      {!isSuccess ? (
        <Container noValidate onSubmit={handleSubmit}>
          <InfoContainer>
            <Description>{descriptions.forgotPassword}</Description>
          </InfoContainer>
          <FormContainer>
            <TextField
              value={values.email}
              type="email"
              name="email"
              error={errors.email}
              onChange={(value) => handleType('email', value)}
              label={inputLabels.email}
            />
            <Button loading={isLoading} disabled={isLoading} type="submit">
              {buttonsTitles.resetPassword}
            </Button>
          </FormContainer>
        </Container>
      ) : (
        <InnerSecondContainer>
          {`El. paštu  `}
          <BoldText> {values.email}</BoldText>
          {` išsiuntėme prisijungimo instrukciją`}
        </InnerSecondContainer>
      )}
    </ContentLayout>
  );
};

export default RemindPassword;
const InnerSecondContainer = styled.span``;

const BoldText = styled.span`
  font-weight: bold;
`;

const Description = styled.div`
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
