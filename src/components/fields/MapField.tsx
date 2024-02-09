import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FeatureCollection } from '../../utils';

const MapField = ({
  value,
  onChange,
}: {
  value: FeatureCollection;
  onChange: (value: FeatureCollection) => void;
}) => {
  const iframeRef = useRef<any>(null);

  const handleSaveGeom = useCallback((event: any) => {
    if (event.origin === import.meta.env.VITE_MAPS_URL) {
      onChange(JSON.parse(event?.data?.mapIframeMsg?.data));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleSaveGeom);
    return () => window.removeEventListener('message', handleSaveGeom);
  }, [handleSaveGeom]);

  const handleLoadMap = () => {
    if (!value) return;
    iframeRef?.current?.contentWindow?.postMessage({ geom: value }, '*');
  };

  return (
    <>
      <Iframe
        src={`${import.meta.env.VITE_MAPS_URL}/edit?types[]=point&buffer=true`}
        ref={iframeRef}
        width={'100%'}
        allowFullScreen={true}
        onLoad={handleLoadMap}
        aria-hidden="false"
        tabIndex={1}
      />
    </>
  );
};

export default MapField;

const Iframe = styled.iframe`
  height: 400px;
  width: 100%;
  display: block;
  border: 1px solid #d4d5de;
  border-radius: 4px;
  margin-top: 8px;
`;
