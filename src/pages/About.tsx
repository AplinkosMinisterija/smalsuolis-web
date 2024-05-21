import { ContentLayout } from '@aplinkosministerija/design-system';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext, UserContextType } from '../components/UserProvider';
import { device } from '../styles';
import { buttonsTitles, slugs, subtitle, titles, useGetCurrentRoute } from '../utils';
const imageUrls = ['/about1.jpeg', '/about2.jpeg', '/about3.webp'];

const About = () => {
  const currentRoute = useGetCurrentRoute();
  const navigate = useNavigate();
  const { loggedIn } = useContext<UserContextType>(UserContext);

  return (
    <ContentLayout customTitle={<Title>{titles.about}</Title>} currentRoute={currentRoute}>
      <SubTitle>{subtitle.about}</SubTitle>
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
      </ImagesContainer>
    </ContentLayout>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 3.2rem;
  font-weight: 800;
  margin: 16px 0;
  width: 100%;
`;

const Link = styled.a`
  color: rgb(0, 0, 238);
  text-decoration: underline;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 20px;
  width: 100%;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.2rem;
  margin: 24px 0;
  font-weight: 800;
  width: 100%;
`;

const Image = styled.img`
  border-radius: 16px;
  max-width: 100%;
  width: 100%;
  height: 220px;
  object-fit: cover;
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

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

export default About;
