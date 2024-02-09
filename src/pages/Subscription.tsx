import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import Switch from '../components/buttons/Switch';
import RadioFrequency from '../components/other/RadioFrequency';
import { Frequency, Subscription, SubscriptionForm, validateSubscriptionForm } from '../utils';
import Button from '../components/buttons/Button';
import { Form, Formik } from 'formik';
import LoaderComponent from '../components/other/LoaderComponent';
import Apps from '../components/other/Apps';
import MapField from '../components/fields/MapField';

const Subscriptions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: subscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ['sub', id],
    queryFn: () => (id && !isNaN(Number(id)) ? api.getSubscription({ id }) : undefined),
  });

  const { data: apps, isLoading: appsLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: () => api.getApps({ page: 1 }),
  });

  const onSuccess = () => {
    navigate(-1);
  };

  const { mutateAsync: createSubscription } = useMutation(api.createSubscription, {
    onSuccess,
  });

  const { mutateAsync: updateSubscription } = useMutation(api.updateSubscription, {
    onSuccess,
  });

  if (subscriptionLoading || appsLoading) {
    return <LoaderComponent />;
  }

  const initialValues: SubscriptionForm = {
    active: !!subscription?.active,
    apps: subscription?.apps || [],
    geom: subscription?.geom,
    frequency: subscription?.frequency || Frequency.DAY,
  };

  const handleSubmit = (values: SubscriptionForm) => {
    if (subscription?.id) {
      return updateSubscription({ id: subscription?.id?.toString(), params: values });
    }
    return createSubscription(values);
  };

  return (
    <ContentLayout
      customSubTitle={
        <Subtitle>
          Norėdami gauti el. paštu naujus skelbimus, atitinkančius Jūsų paieškos kriterijus,
          užpildykite žemiau esančią formą.
        </Subtitle>
      }
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validationSchema={validateSubscriptionForm}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => {
          return (
            <Container>
              <SubscriptionFormContainer>
                <SubscriptionActivation>
                  <SubscriptionActiveTitle>
                    {values.active ? 'Prenumerata aktyvi' : 'Prenumerata neaktyvi'}
                  </SubscriptionActiveTitle>
                  <Switch
                    value={values.active}
                    onChange={(e) => setFieldValue('active', e.target.checked)}
                  />
                  <SubscriptionActiveDescription>
                    Esant aktyviai prenumeratai bus siunčiamos naujienos į el. paštą, kurį nurodėte
                    registruodamiesi prie mūsų svetainės.
                  </SubscriptionActiveDescription>
                </SubscriptionActivation>
              </SubscriptionFormContainer>
              <SubscriptionFormContainer>
                <SectionLabel>Pasirinkite dominančias sritis</SectionLabel>
                <SubscriptionAppsButton
                  onClick={() =>
                    setFieldValue(
                      'apps',
                      (apps?.rows || []).map((app) => app.id),
                    )
                  }
                >
                  Esu smalsus domina viskas
                </SubscriptionAppsButton>
                <Apps
                  options={apps?.rows || []}
                  value={values.apps}
                  onChange={(value) => setFieldValue('apps', value)}
                />
              </SubscriptionFormContainer>
              <SubscriptionFormContainer>
                <SectionLabel>
                  Padėkite tašką, kur norite stebėti ir nustatykite spindulį
                </SectionLabel>
                <MapField value={values.geom} onChange={(value) => setFieldValue('geom', value)} />
              </SubscriptionFormContainer>
              <SubscriptionFormContainer>
                <SectionLabel>Kokiu dažnumu jums siųsti informaciją</SectionLabel>
                <RadioFrequency
                  value={values.frequency}
                  onChange={(value: Frequency) => setFieldValue('frequency', value)}
                />
              </SubscriptionFormContainer>
              <ButtonContainer>
                <Button type="submit">{subscription?.id ? 'Išsaugoti' : 'Prenumeruoti'}</Button>
              </ButtonContainer>
            </Container>
          );
        }}
      </Formik>
    </ContentLayout>
  );
};

export default Subscriptions;

const Container = styled(Form)`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-top: 32px;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
`;

const Subtitle = styled.div`
  line-height: 24px;
  text-align: center;
  font-size: 1em;
  font-weight: 500;
`;

const SubscriptionActivation = styled.div`
  display: grid;
  grid-template-columns: 1fr 48px;
  gap: 8px;
  align-items: center;
  background: #fafafa;
  padding: 24px;
  border-radius: 16px;
`;

const SubscriptionActiveTitle = styled.div`
  font-weight: bold;
`;
const SubscriptionActiveDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  display: block;
  grid-column: 1 / span 2;
`;

const SubscriptionFormContainer = styled.div`
  display: block;
`;
const SectionLabel = styled.label`
  font-weight: 600;
`;
const SubscriptionAppsButton = styled.a`
  color: #1f5c2e;
  text-decoration: underline;
  float: right;
`;

const Iframe = styled.iframe`
  height: 400px;
  width: 100%;
  display: block;
  border: 1px solid #d4d5de;
  border-radius: 4px;
  margin-top: 8px;
`;
