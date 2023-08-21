import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "./Icons";
interface PasswordCheckListContainerProps {
  password: string;
  repeatPassword: string;
  setAllValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordCheckListContainer = ({
  password,
  repeatPassword,
  setAllValid
}: PasswordCheckListContainerProps) => {
  const [containsUL, setContainsUL] = useState(false);
  const [containsLL, setContainsLL] = useState(false);
  const [containsN, setContainsN] = useState(false);
  const [containsSC, setContainsSC] = useState(false);
  const [contains8C, setContains8C] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const checkList = [
    [
      { label: "1 Didžioji raidė", value: containsUL },
      { label: "1 mažoji raidė", value: containsLL },
      { label: "Bent 1 skaičius", value: containsN }
    ],
    [
      { label: "Bent 1 specialus simbolis", value: containsSC },
      { label: "Min 8 simbolių", value: contains8C },
      { label: "Slaptažodžiai sutampa", value: passwordMatch }
    ]
  ];

  useEffect(() => {
    setContainsUL(/[A-Z]/g.test(password));
    setContainsLL(/[a-z]/g.test(password));
    setContainsN(/[\d]/g.test(password));
    setContainsSC(
      /[\!@#\$%\^\&\*\(\)\[\]\'\";:\.\\\-\_?\/\<\>\,\{\}`\~\|\+\=]/g.test(
        password
      )
    );
    setContains8C(password.length >= 8);
    setPasswordMatch(password !== "" && password === repeatPassword);
  }, [password, repeatPassword]);

  useEffect(() => {
    setAllValid(
      containsUL &&
        containsLL &&
        containsN &&
        containsSC &&
        contains8C &&
        passwordMatch
    );
  }, [
    containsUL,
    containsLL,
    containsN,
    containsSC,
    contains8C,
    passwordMatch
  ]);

  return (
    <Container>
      {checkList.map((column) => (
        <InnerContainer>
          {column.map((item) => (
            <Row>
              <StyledIcon checked={item.value} name="active" />
              <Text checked={item.value}>{item.label}</Text>
            </Row>
          ))}
        </InnerContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 138px 1fr;
  gap: 0;
  line-height: 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyledIcon = styled(Icon)<{ checked: boolean }>`
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.success : "white"};

  width: 18px;
  height: 18px;
  border-radius: 50%;

  color: ${({ theme, checked }) => (checked ? "white" : theme.colors.disable)};
  border: ${({ checked }) => (checked ? "none" : "1px solid #cdd5df")};
`;

const Text = styled.div<{ checked: boolean }>`
  font-size: 1.4rem;
  color: ${({ theme, checked }) =>
    checked ? theme.colors.success : theme.colors.disable};
`;

export default PasswordCheckListContainer;
