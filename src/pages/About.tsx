import { Button } from '@aplinkosministerija/design-system';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext, UserContextType } from '../components/UserProvider';
import { device } from '../styles';
import { buttonsTitles, slugs, subtitle, IconName } from '../utils';
import Icon from '../components/Icons';

const bannerUrl = '/about_banner.png';
const mapUrl = '/about_map.png';

const About = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext<UserContextType>(UserContext);

  const openLinkInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const sendEmail = () => {
    window.open('mailto:esu@smalsuolis.lt');
  };

  return (
    <MainContainer>
      <BannerImageContainer>
        <Image src={bannerUrl} />
      </BannerImageContainer>
      <ContentContainer>
        <DescriptionContainer>
          <SubTitle>{subtitle.about}</SubTitle>
          <Description>
            {
              'Mūsų valstybėje vyksta daug įvykių, tačiau apie juos nežinome arba sužinome per vėlai. Nusprendėme tą pakeisti - suteikti galimybę visiems piliečiams sekti kas vyksta šalyje realiu laiku.'
            }
          </Description>
          <Description>
            {
              'Šiuo metu galima sekti statybos leidimų išdavimą, statinio rekonstrukciją, griovimą, patalpų paskirties keitimą, miško kirtimų leidimus bei įžuvinimą, taip pat planuojame turėti želdynų ir želdinių šalinimo leidimus, poveikio aplinkai vertinimą, žemės paskirties keitimą ir daugelį kitų.'
            }
          </Description>
          <ButtonContainer>
            <Button onClick={() => navigate(slugs.events)}>{buttonsTitles.map}</Button>
          </ButtonContainer>
        </DescriptionContainer>
        <ImageContainer>
          <Image src={mapUrl} />
        </ImageContainer>
      </ContentContainer>
      <ActionsContainer>
        <QuestionContainer>
          <Question>{subtitle.howItWorks}</Question>
        </QuestionContainer>
        <SubTitle>{subtitle.fewActions}</SubTitle>
        <ActionsRow>
          <ActionContainer>
            <ActionImage src={'/binoculars.png'} />
            <ActionDescription>
              <Action>
                Tapk Smalsuolio {`\n`} prenumeratoriumi -{' '}
                {<Link href={loggedIn ? slugs.subscriptions : slugs.login}>Užsiregistruok</Link>}
              </Action>
            </ActionDescription>
          </ActionContainer>
          <ActionContainer>
            <ActionImage src={'/arrow.png'} />
            <ActionDescription>
              <Action>Pažymėk tave dominančias {`\n`} įvykių kategorijas</Action>
            </ActionDescription>
          </ActionContainer>
          <ActionContainer>
            <ActionImage src={'/letter.png'} />
            <ActionDescription>
              <Action>
                Gauk elektroniniu paštu naujausią {`\n`} informaciją apie tai, kas įvyko
              </Action>
            </ActionDescription>
          </ActionContainer>
        </ActionsRow>
      </ActionsContainer>
      <SecondBannerContainer>
        <BannerRow>
          <SecondSubTitle>Darome tą, nes esame smalsūs.{`\n`}Kaip ir tu!</SecondSubTitle>
          <BannerActionContainer>
            <GreenCircle />
            <BannerButton onClick={() => navigate(loggedIn ? slugs.subscriptions : slugs.login)}>
              <BannerButtonText>{buttonsTitles.beCurious}</BannerButtonText>
            </BannerButton>
          </BannerActionContainer>
        </BannerRow>
      </SecondBannerContainer>
      <FooterContainer>
        <FooterContent>
          <FooterContentTitle>Smalsuolio komanda</FooterContentTitle>
          <FooterContentSubTitle>
            Valstybės tarnautojai, kurie daro daugiau, nei kad prašoma
          </FooterContentSubTitle>
          <ButtonContainer>
            <Button
              onClick={() => openLinkInNewTab('https://startupgov.lt')}
              rightIcon={<StyledIcon name={IconName.arrowUpRight} />}
            >
              {buttonsTitles.ourTeam}
            </Button>
          </ButtonContainer>
        </FooterContent>
        <FooterContent>
          <FooterContentTitle>Jei turi komentarų ar pastabų</FooterContentTitle>
          <FooterContentSubTitle>Visuomet jų laukiame</FooterContentSubTitle>
          <ButtonContainer>
            <Button onClick={sendEmail} leftIcon={<StyledIcon name={IconName.email} />}>
              esu@smalsuolis.lt
            </Button>
          </ButtonContainer>
        </FooterContent>
        <FooterContent>
          <FooterContentTitle>Duomenų šaltiniai</FooterContentTitle>
          <FooterLinkContainer>
            <FooterStyledIcon name={IconName.arrowUpRight} />
            <FooterLink
              href="https://get.data.gov.lt/datasets/gov/vtpsi/infostatyba/Statinys"
              target="_blank"
            >
              Infostatyba
            </FooterLink>
          </FooterLinkContainer>
          <FooterLinkContainer>
            <FooterStyledIcon name={IconName.arrowUpRight} />
            <FooterLink href="https://lkmp.alisas.lt/static/lkmp-data.geojson.zip" target="_blank">
              Miško kirtimų leidimai
            </FooterLink>
          </FooterLinkContainer>
          <FooterLinkContainer>
            <FooterStyledIcon name={IconName.arrowUpRight} />
            <FooterLink href="https://zuvinimas.biip.lt/api/public/fishStockings" target="_blank">
              Įžuvinimai
            </FooterLink>
          </FooterLinkContainer>
        </FooterContent>
      </FooterContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  @media ${device.desktop} {
    max-width: 1520px;
  }
`;

const BannerImageContainer = styled.div`
  width: 100%;
  margin-bottom: -5px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  @media ${device.desktop} {
    border-radius: 32px;
  }
`;

const ContentContainer = styled.div`
  align-items: center;
  padding: 40px 80px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    margin-top: 0px;
    padding: 40px 24px;
  }
`;

const DescriptionContainer = styled.div`
  flex-grow: 0;
  flex-basis: 50%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 3.1rem;
  margin-bottom: 24px;
  font-weight: 700;
  line-height: 50.4px;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 32px;
  width: 100%;
  margin-bottom: 24px;
  font-size: 1.89rem;
`;

const ButtonContainer = styled.div`
  max-width: 255px;
`;

const ImageContainer = styled.div`
  flex: 0 50%;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 443px;
  max-width: 520px;
  @media ${device.tablet} {
    margin-top: 24px;
  }
`;

const ActionsContainer = styled.div`
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 80px 80px;
  flex-direction: column;
  display: flex;
  width: 100%;
  @media ${device.tablet} {
    padding: 60px 24px;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  background-color: #dff9e5;
  border-radius: 16px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const Question = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 1.6rem;
  line-height: 16px;
`;

const ActionsRow = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
  gap: 20px;
  @media ${device.tablet} {
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 24px;
  }
`;

const ActionContainer = styled.div`
  background-color: rgb(223, 249, 229, 0.21);
  border-radius: 32px;
  padding: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    margin-bottom: 12px;
  }
`;

const ActionImage = styled.img`
  max-width: 112px;
  margin-bottom: 24px;
`;

const ActionDescription = styled.div`
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 0 40px;
  display: flex;
  @media ${device.tablet} {
    margin: 0 16px;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-decoration: underline;
`;

const Action = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 32px;
  font-weight: 500;
  white-space: pre-line;
  align-self: center;
  text-align: center;
  font-size: 1.89rem;
`;

const SecondBannerContainer = styled.div`
  background-image: url('/about_banner_background.png');
  display: flex;
  margin-top: 40px;
  padding: 60px 80px;
  align-items: center;
  justify-content: center;
  @media ${device.desktop} {
    border-radius: 32px;
  }
  @media ${device.tablet} {
    padding: 40px 24px;
    margin-top: 0px;
  }
`;

const BannerRow = styled.div`
  flex-direction: row;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

const BannerActionContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: flex-end;
  @media ${device.tablet} {
    margin-top: 40px;
  }
`;

const BannerButtonText = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 32px;
  font-weight: 500;
  font-size: 1.8rem;
  font-weight: medium;
`;

const SecondSubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 4.1rem;
  font-weight: bold;
  line-height: 72px;
  white-space: pre-line;
`;

const GreenCircle = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 65px;
  background-color: ${({ theme }) => theme.colors.tertiary};
`;

const BannerButton = styled.button`
  margin-top: 24px;
  padding: 20px 100px;
  background-color: white;
  border-radius: 60px;
  cursor: pointer;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px;
  gap: 12px;
  @media ${device.tablet} {
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    margin-top: 0px;
    padding: 24px 24px;
  }
`;

const FooterContent = styled.div`
  flex-direction: column;
  flex: 1;
  @media ${device.tablet} {
    margin-top: 40px;
  }
`;

const FooterContentTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2rem;
  font-weight: 800;
  line-height: 40px;
`;

const FooterContentSubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  line-height: 32px;
  margin-bottom: 24px;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.8rem;
`;

const FooterLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0px;
`;

const FooterLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

const FooterStyledIcon = styled(Icon)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export default About;
