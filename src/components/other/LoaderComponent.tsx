import styled from "styled-components";
import Loader from "./Loader";

const LoaderComponent = () => (
  <LoaderContainer>
    <Loader />
  </LoaderContainer>
);
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
export default LoaderComponent;
