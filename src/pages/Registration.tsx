import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import TextField from '../components/fields/TextField';
import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import { getErrorMessage, handleAlert, handleToastSuccess } from '../utils/functions';
import { buttonsTitles, inputLabels, validationTexts } from '../utils/texts';
import { ReactQueryError } from '../utils/types';
import { forgotPasswordSchema } from '../utils/validations';

const Registration = () => {
  const handleRemindPassword = async (values: { email: string }) => {
    const { email } = values;
    const params = { ...values, email: email.toLocaleLowerCase() };

    return await api.registration(params);
  };

  const handleError = ({ response }: ReactQueryError): any => {
    const text = getErrorMessage(response?.data?.message);
    if (text) {
      return setErrors({ email: text });
    }
    handleAlert();
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
    handleToastSuccess(validationTexts.registration);
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
    onSubmit: (values) => mutateAsync(values),
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <ContentLayout>
      {!isSuccess ? (
        <Container noValidate onSubmit={handleSubmit}>
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
              {buttonsTitles.createAccount}
            </Button>
          </FormContainer>
        </Container>
      ) : (
        <InnerSecondContainer>
          {`El. paštu  `}
          <BoldText> {values.email}</BoldText>
          {` išsiuntėme registracijos instrukciją`}
        </InnerSecondContainer>
      )}
    </ContentLayout>
  );
};

export default Registration;

const InnerSecondContainer = styled.span``;

const BoldText = styled.span`
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
