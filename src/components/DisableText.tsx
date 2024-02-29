import styled from 'styled-components';

const DisableText = ({ text, description }: { text: string; description?: string }) => (
  <NotFoundContainer>
    <ImageContainer>
      <Image src="/route.svg" />
    </ImageContainer>
    <Title>{text}</Title>
    {description && <Description>{description}</Description>}
  </NotFoundContainer>
);
const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 12px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
`;

const ImageContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 50%;
`;

const Title = styled.div`
  font: normal normal bold 18px/24px Roboto;
  color: #1a202c;
  text-align: center;
`;

const Description = styled.div`
  font: normal normal normal 14px/19px Roboto;
  color: #595e66;
  text-align: center;
`;

export default DisableText;
