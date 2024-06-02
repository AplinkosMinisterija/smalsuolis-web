import { Button } from '@aplinkosministerija/design-system';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext, UserContextType } from '../components/UserProvider';
import { device } from '../styles';
import { buttonsTitles, slugs, subtitle, titles, useGetCurrentRoute } from '../utils';
const bannerUrl = '/about_banner.png';
const mapUrl = '/about_map.png';

const About = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext<UserContextType>(UserContext);

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
              'Šiuo metu galima sekti statybos leidimų išdavimą bei įžuvinimą, neužilgo pridėsime ir miško kirtimo leidimus, taip pat planuojame turėti želdynų ir želdinių šalinimo leidimus, poveikio aplinkai vertinimą, žemės paskirties keitimą ir daugelį kitų.'
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
                {<Link href={loggedIn ? slugs.events : slugs.login}>Užsiregistruok</Link>}
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

      {/*
      <DescriptionContainer>
        <Description>
          {
            'Mūsų valstybėje vyksta daug įvykių, tačiau apie juos nežinome arba sužinome per vėlai. Nusprendėme tą pakeisti - suteikti galimybę visiems piliečiams sekti kas vyksta šalyje realiu laiku.'
          }
        </Description>
        <Description>
          {
            'Užsiregistruok, pažymėk tave dominančias įvykių kategorijas ir gauk elektroniniu paštu naujausią informaciją apie tai, kas įvyko. Šiuo metu galima sekti statybos leidimų išdavimą bei įžuvinimą, neužilgo pridėsime ir miško kirtimo leidimus, taip pat planuojame turėti želdynų ir želdinių šalinimo leidimus, poveikio aplinkai vertinimą, žemės paskirties keitimą ir daugelį kitų.'
          }
        </Description>
        <Description>
          <Description>{'Darome tą, nes esame smalsūs. Kaip ir tu.'}</Description>
          <Description>
            {'Smalsuolis.lt komanda - '}
            <Link href="https://startupgov.lt">https://startupgov.lt</Link>
          </Description>
        </Description>
        <Description>
          {'Jei turi komentarų ar pastabų - '}
          <Link href="mailto:esu@smalsuolis.lt">esu@smalsuolis.lt</Link>
        </Description>
      </DescriptionContainer>

      <ImagesContainer>
        {imageUrls.map((url, index) => (
          <Image key={`image-${index}`} src={url} />
        ))}
        <NavigateContainer
          onClick={() => navigate(loggedIn ? slugs.newSubscription : slugs.registration)}
        >
          {buttonsTitles.subscribeNews}{' '}
        </NavigateContainer>
      </ImagesContainer> */}
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

const ButtonContainer = styled.div`
  max-width: 255px;
`;

const Link = styled.a`
  color: #1b4c28;
  text-decoration: underline;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 32px;
  width: 100%;
  margin-bottom: 24px;
`;

const Action = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 32px;
  font-weight: 500;

  white-space: pre-line;
  align-self: center;
  text-align: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

const QuestionContainer = styled.div`
  display: flex;
  background-color: #dff9e5;
  border-radius: 10px;
  padding: 0px 8px;
  max-width: 110px;
  justify-content: center;
  align-items: center;
`;

const Question = styled.div`
  color: #1b4c28;
  font-size: 1rem;
  font-weight: 400;
  line-height: 16px;
`;

const ContentContainer = styled.div`
  justify-content: center;
  align-items: center;
  padding: 50px;
  flex-direction: row;
  display: flex;
  @media ${device.mobileL} {
    flex-wrap: wrap;
    background-color: #f7f7f7;
    flex-direction: column;
  }
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  margin-bottom: 24px;
  font-weight: 700;
  line-height: 50.4px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  @media ${device.mobileL} {
    border-radius: 16px;
  }
`;

const ActionImage = styled.img`
  max-width: 112px;
  margin-bottom: 24px;
`;

const NavigateContainer = styled.div`
  border-radius: 16px;
  max-width: 100%;
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: #fafafa;
  padding: 32px;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: end;
  font-weight: 600;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 443px;
  max-width: 520px;
  @media ${device.mobileL} {
    margin-top: 24px;
  }
`;

const BannerImageContainer = styled.div`
  width: 100%;
`;

const ActionsRow = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media ${device.mobileL} {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

const ActionContainer = styled.div`
  background-color: rgb(223, 249, 229, 0.21);
  border-radius: 32px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media ${device.mobileL} {
    margin-bottom: 12px;
  }
`;

const ActionsContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 50px;
  flex-direction: column;
  display: flex;
`;

const ActionDescription = styled.div` 
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 0 40px;
  display: flex:
`;

const Description1 = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 32px;
  align-self: center;
  margin-bottom: 24px;
  text-align: center;
`;

export default About;
