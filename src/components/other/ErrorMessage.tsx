import styled from "styled-components";

export const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return <></>;

  return <Container>{error}</Container>;
};

const Container = styled.label`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4rem;
  margin-bottom: 8px;
`;
