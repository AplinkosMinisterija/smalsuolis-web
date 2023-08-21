import styled from "styled-components";
import { device } from "../../styles";

const InfoRow = ({ info }: { info: any[] }) => (
  <Row>
    {info
      ?.filter((item) => item)
      .map((item, index, arr) => {
        return (
          <InnerRow key={`tenant-info-${index}`}>
            <Label>{item}</Label>
          </InnerRow>
        );
      })}
  </Row>
);
const InnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media ${device.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  @media ${device.mobileL} {
    flex-direction: column;
    margin-top: 12px;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Label = styled.div`
  font-size: 1.6rem;
  line-height: 20px;
  color: #697586;
  opacity: 1;
`;

export default InfoRow;
