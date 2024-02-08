import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import Switch from '../components/buttons/Switch';
import Apps from '../components/other/Apps';
import RadioFrequency from '../components/other/RadioFrequency';
import { Frequency } from '../utils';
import Button from '../components/buttons/Button';
import { Form, Formik } from 'formik';
import app from '../App';

const apps = [
  {
    id: 1,
    name: 'Infostatyba',
    description: 'Statybos leidimai, Užbaigimo deklaracijos',
  },
  {
    id: 2,
    name: 'Valstybinė miškų tarnyba',
    description: 'Miško kirtimo leidimai',
  },
  {
    id: 3,
    name: 'Tvarkau Lietuvą',
    description: 'Aprašymas',
  },
];

const Subscription = () => {
  const { id } = useParams();

  const { data, error } = useQuery({
    queryKey: ['subscription', id],
    queryFn: () => (id && !isNaN(Number(id)) ? api.getSubscription({ id }) : {}),
  });

  // const { data, error } = useQuery({
  //     queryKey: ['apps'],
  //     queryFn: api.getApps,
  // });

  const { mutateAsync: subscriptionMutation } = useMutation(api.createSubscription, {
    onError: (error, variables, context) => {
      console.log('error');
    },
    onSuccess: async (response) => {
      console.log('response');
    },
  });

  const handleSubmit = (values: any) => {
    console.log('submiting...', values);
    subscriptionMutation(values);
  };

  return (
    <ContentLayout>
      <Subtitle>
        Norėdami gauti el. paštu naujus skelbimus, atitinkančius Jūsų paieškos kriterijus,
        užpildykite žemiau esančią formą.
      </Subtitle>
      <Formik
        enableReinitialize={true}
        initialValues={{
          active: true,
          apps: [],
          frequency: Frequency.MONTH,
        }}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => {
          return (
            <Container>
              <SubscriptionFormContainer>
                <SubscriptionActivation>
                  <SubscriptionActiveTitle>Prenumerata aktyvi</SubscriptionActiveTitle>
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
                      apps.map((app) => app.id),
                    )
                  }
                >
                  Esu smalsus domina viskas
                </SubscriptionAppsButton>
                <Apps
                  options={apps}
                  value={values.apps}
                  onChange={(value) => setFieldValue('apps', value)}
                />
              </SubscriptionFormContainer>
              <SubscriptionFormContainer>
                <SectionLabel>
                  Padėkite tašką, kur norite stebėti ir nustatykite spindulį
                </SectionLabel>
                <Iframe src="https://maps.biip.lt/edit?types[]=point" allow="geolocation"></Iframe>
              </SubscriptionFormContainer>
              <SubscriptionFormContainer>
                <SectionLabel>Kokiu dažnumu jums siųsti informaciją</SectionLabel>
                <RadioFrequency
                  value={values.frequency}
                  onChange={(value: Frequency) => setFieldValue('frequency', value)}
                />
              </SubscriptionFormContainer>
              <ButtonContainer>
                <Button type="submit">Prenumeruoti</Button>
              </ButtonContainer>
            </Container>
          );
        }}
      </Formik>
    </ContentLayout>
  );
};

export default Subscription;

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
  margin-top: 8px;
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
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
