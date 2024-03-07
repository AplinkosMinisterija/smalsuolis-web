import ContentLayout from '../components/layouts/ContentLayout';
import api from '../utils/api';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Switch from '../components/buttons/Switch';
import RadioFrequency from '../components/other/RadioFrequency';
import { Frequency, IconName, slugs, SubscriptionForm, validateSubscriptionForm } from '../utils';
import Button from '../components/buttons/Button';
import { Form, Formik } from 'formik';
import LoaderComponent from '../components/other/LoaderComponent';
import Apps from '../components/other/Apps';
import MapField from '../components/fields/MapField';
import PageActions from '../components/PageActions';
import Popup from '../components/Popup';
import { device } from '../styles';

const Subscriptions = (props: any) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDelete, setShowDelete] = useState(false);
  const { data: subscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ['subscription', id],
    queryFn: () => (id && !isNaN(Number(id)) ? api.getSubscription({ id }) : undefined),
  });
  const { data: apps, isLoading: appsLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: () => api.getApps({ page: 1 }),
  });

  const onSuccess = () => {
    navigate(slugs.subscriptions);
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const { mutateAsync: createSubscription } = useMutation({
    mutationFn: api.createSubscription,
    onSuccess,
  });

  const { mutateAsync: updateSubscription } = useMutation({
    mutationFn: api.updateSubscription,
    onSuccess,
  });

  const { mutateAsync: deleteSubscription } = useMutation({
    mutationFn: (id: number) => api.deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      navigate(slugs.subscriptions);
    },
  });

  if (subscriptionLoading || appsLoading) {
    return <LoaderComponent />;
  }

  const initialValues: SubscriptionForm = {
    active: typeof subscription?.active === 'boolean' ? subscription?.active : true,
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
    <>
      <ContentLayout
        customSubTitle={
          <Subtitle>
            Norėdami gauti el. paštu naujus skelbimus, atitinkančius Jūsų paieškos kriterijus,
            užpildykite žemiau esančią formą.
          </Subtitle>
        }
        pageActions={
          <PageActions
            onGoBack={() => navigate(slugs.subscriptions)}
            action={{
              label: 'Ištrinti prenumeratą',
              icon: IconName.remove,
              onClick: () => setShowDelete(true),
              destructive: true,
            }}
          />
        }
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validationSchema={validateSubscriptionForm}
        >
          {({ values, setFieldValue }) => {
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
                      Esant aktyviai prenumeratai bus siunčiamos naujienos į el. paštą, kurį
                      nurodėte registruodamiesi prie mūsų svetainės.
                    </SubscriptionActiveDescription>
                  </SubscriptionActivation>
                </SubscriptionFormContainer>
                <SubscriptionFormContainer>
                  <AppsHeadingRow>
                    <SectionLabel>Pasirinkite dominančias sritis</SectionLabel>
                    <SelectAllAppsButton
                      onClick={() =>
                        setFieldValue(
                          'apps',
                          (apps?.rows || []).map((app) => app.id),
                        )
                      }
                    >
                      Esu smalsus domina viskas
                    </SelectAllAppsButton>
                  </AppsHeadingRow>
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
                  <MapField
                    value={values.geom}
                    onChange={(value) => setFieldValue('geom', value)}
                  />
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
      <Popup
        visible={showDelete}
        title="Ar tikrai norite ištrinti šią prenumeratą?"
        subTitle="Šio veiksmo nebus galima atšaukti ar redaguoti"
      >
        <PopupActions>
          <PopupButton variant={Button.colors.SECONDARY} onClick={() => setShowDelete(false)}>
            Atšaukti
          </PopupButton>
          <PopupButton
            variant={Button.colors.DANGER}
            onClick={() => (subscription?.id ? deleteSubscription(subscription.id) : {})}
          >
            Išstrinti
          </PopupButton>
        </PopupActions>
      </Popup>
    </>
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

const SubscriptionFormContainer = styled.div`
  display: block;
  background: #fafafa;
  padding: 24px;
  border-radius: 16px;
`;

const SubscriptionActivation = styled.div`
  display: grid;
  grid-template-columns: 1fr 48px;
  gap: 8px;
  align-items: center;
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

const AppsHeadingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const SectionLabel = styled.label`
  font-weight: 600;
  align-self: flex-start;
`;

const SelectAllAppsButton = styled.a`
  color: #1f5c2e;
  text-decoration: underline;
  cursor: pointer;
  text-align: end;
`;

const PopupActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  @media ${device.mobileL} {
    padding: 0 16px;
  }
`;

const PopupButton = styled(Button)`
  height: 40px;
`;
