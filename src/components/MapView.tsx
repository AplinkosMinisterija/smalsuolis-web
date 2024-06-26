import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles';
import { IconName } from '../utils';
import Icon from './Icons';

const mapsHost = import.meta.env.VITE_MAPS_HOST;

interface MapProps {
  onSave?: (data: any) => void;
  error?: string;
  preview?: boolean;
  filters?: any;
  geom?: any;
}

const src = `${mapsHost}/smalsuolis?preview=1`;

const MapView = ({ error, filters, geom }: MapProps) => {
  const iframeRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const handleLoad = () => {
    setIsIframeLoaded(true);
  };

  useEffect(() => {
    if (!iframeRef?.current || !isIframeLoaded) return;

    const iframe = iframeRef.current;

    const message: any = {};
    if (geom) message.geom = geom;
    if (filters) message.filters = filters;

    if (Object.keys(message).length > 0) {
      iframe.contentWindow?.postMessage(message, '*');
    }
  }, [JSON.stringify(geom), JSON.stringify(filters), iframeRef, isIframeLoaded]);

  return (
    <Container $showModal={showModal} $error={!!error}>
      <InnerContainer $showModal={showModal}>
        <StyledButton
          $popup={showModal}
          onClick={(e) => {
            e.preventDefault();

            setShowModal(!showModal);
          }}
        >
          <StyledIconContainer>
            <StyledIcon name={showModal ? IconName.exitFullScreen : IconName.fullscreen} />
          </StyledIconContainer>
        </StyledButton>
        <StyledIframe
          allow="geolocation *"
          ref={iframeRef}
          src={src}
          $width={'100%'}
          $height={showModal ? '100%' : '60vh'}
          style={{ border: 0 }}
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={1}
          onLoad={handleLoad}
        />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div<{
  $showModal: boolean;
  $error: boolean;
}>`
  width: 100%;
  ${({ $showModal }) =>
    $showModal &&
    `
      display: flex;
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
      justify-content: center;
      align-items: center;
      overflow-y: auto;
      z-index: 1001;
  `}
  ${({ theme, $error }) => $error && `border: 1px solid ${theme.colors.error};`}
`;

const InnerContainer = styled.div<{
  $showModal: boolean;
}>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  ${({ $showModal }) =>
    $showModal &&
    `
    padding: 16px;
  `}

  @media ${device.mobileL} {
    padding: 0;
  }
`;

const StyledIframe = styled.iframe<{
  $height: string;
  $width: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

const StyledButton = styled.div<{ $popup: boolean }>`
  position: absolute;
  z-index: 10;
  top: ${({ $popup }) => ($popup ? 30 : 15)}px;
  left: ${({ $popup }) => ($popup ? 28 : 11)}px;
  min-width: 28px;
  height: 28px;
  @media ${device.mobileL} {
    top: 10px;
    left: 10px;
  }

  border-color: #e5e7eb;
  background-color: white !important;
  width: 30px;
  height: 30px;
  padding: 0;
  box-shadow: 0px 18px 41px #121a5529;
`;

const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: #6b7280;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MapView;
