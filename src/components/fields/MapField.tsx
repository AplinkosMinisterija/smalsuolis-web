import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FeatureCollection } from '../../utils';

const mapsHost = import.meta.env.VITE_MAPS_HOST || 'https://dev.maps.biip.lt';

const MapField = ({
  value,
  error,
  label,
  onChange,
}: {
  value: FeatureCollection;
  error?: string;
  label?: string;
  onChange: (value: FeatureCollection) => void;
}) => {
  const iframeRef = useRef<any>(null);

  const handleSaveGeom = useCallback(
    (event: any) => {
      if (event.origin === mapsHost) {
        onChange(JSON.parse(event?.data?.mapIframeMsg?.data));
      }
    },
    [onChange],
  );

  useEffect(() => {
    window.addEventListener('message', handleSaveGeom);
    return () => window.removeEventListener('message', handleSaveGeom);
  }, [handleSaveGeom]);

  const handleLoadMap = () => {
    if (!value) return;
    iframeRef?.current?.contentWindow?.postMessage({ geom: value }, '*');
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Iframe
        src={`${mapsHost}/edit?types[]=point&buffer=xl`}
        ref={iframeRef}
        width={'100%'}
        allowFullScreen={true}
        onLoad={handleLoadMap}
        aria-hidden="false"
        tabIndex={1}
        $error={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default MapField;

const Iframe = styled.iframe<{ $error: boolean }>`
  height: 400px;
  width: 100%;
  display: block;
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : '#d4d5de')};
  border-radius: 4px;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4rem;
  margin-bottom: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  padding: 24px;
  border-radius: 16px;
`;

const Label = styled.label`
  font-weight: 600;
  align-self: flex-start;
  font-size: 1.6rem;
`;
