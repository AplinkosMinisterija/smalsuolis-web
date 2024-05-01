import { Button, svgToUrl } from '@aplinkosministerija/design-system';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { device } from '../styles';
import { buttonLabels, Event, getTimeLabel, IconName } from '../utils';
import Icon from './Icons';
import PreviewMap from './PreviewMap';
import Tag from './Tag';

const EventCard = ({ event, isOpen = false }: { event: Event; isOpen?: boolean }) => {
  const [open, setOpen] = useState(isOpen);
  const { app } = event;
  const appIcon = svgToUrl(app.icon);

  return (
    <Container onClick={() => setOpen(!open)}>
      <Row>
        <Column>
          <InnerRow>
            <Tag text={app.name} icon={<AppIcon src={appIcon} />} />
            <Time>{getTimeLabel(event)}</Time>
          </InnerRow>

          <Name>{event.name}</Name>
        </Column>
        <div>
          <Arrow expanded={open} name={IconName.dropdownArrow} />
        </div>
      </Row>
      {open && (
        <>
          <MapContainer>
            <PreviewMap value={event.geom} height={'200px'} />
          </MapContainer>
          <Body>
            <ReactMarkdown>{event.body}</ReactMarkdown>
          </Body>
          {event.url && (
            <Button onClick={() => window.open(event.url)}>
              <>
                {buttonLabels.visitWebsite} <EventIcon name={IconName.openInNew} />
              </>
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default EventCard;

const EventIcon = styled(Icon)`
  width: 20px;
`;

const Arrow = styled(Icon)<{ expanded?: boolean }>`
  font-size: 2.8rem;
  transform: ${({ expanded }) => !expanded && `rotate(-90deg)`};
`;

const MapContainer = styled.div`
  width: 100%;
  border-radius: 24px;
  padding: 8px;
  background-color: white;
  iframe {
    border-radius: 16px;
  }
`;

const Body = styled.div`
  padding: 24px;
  border-radius: 24px;
  background-color: white;
  width: 100%;
`;

const AppIcon = styled.img`
  height: 16px;
`;

const Container = styled.a`
  background: ${({ theme }) => theme.colors.GREY};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 100%;
  display: grid;
  padding: 16px;
  gap: 12px;

  @media ${device.mobileL} {
    max-width: 100%;
  }
`;

const InnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media ${device.mobileL} {
    flex-wrap: wrap;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Time = styled.div`
  white-space: nowrap;
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
