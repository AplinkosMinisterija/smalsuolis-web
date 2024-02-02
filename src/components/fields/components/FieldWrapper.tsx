import styled from 'styled-components';
import { ErrorMessage } from '../../other/ErrorMessage';
export interface FieldWrapperProps {
  error?: string;
  showError?: boolean;
  label?: string;
  className?: string;
  padding?: string;
  onClick?: () => void;
  handleBlur?: (event: any) => void;
  bottomLabel?: string;
  subLabel?: string;
  secondLabel?: JSX.Element;
  children: any;
}

const FieldWrapper = ({
  error,
  showError = true,
  label,
  className,
  padding = '0',
  onClick,
  handleBlur,
  subLabel,
  bottomLabel,
  secondLabel,
  children,
}: FieldWrapperProps) => {
  return (
    <Container
      tabIndex={-1}
      onBlur={handleBlur}
      className={className}
      padding={padding}
      onClick={onClick}
    >
      <LabelRow>
        {!!label && (
          <LabelContainer>
            <Label htmlFor={label}>{label}</Label>
            {!!subLabel && <SubLabel>{subLabel}</SubLabel>}
          </LabelContainer>
        )}
        {secondLabel}
      </LabelRow>
      {children}
      {showError && <ErrorMessage error={error} />}
      {bottomLabel && <BottomLabel>{bottomLabel}</BottomLabel>}
    </Container>
  );
};

const Container = styled.div<{ padding: string }>`
  display: block;
  position: relative;
  padding: ${({ padding }) => padding};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BottomLabel = styled.div`
  margin-top: 6px;
  font-size: 1.2rem;
  color: #697586;
`;

const Label = styled.label`
  text-align: left;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.label};
  opacity: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 2.4rem;
  max-height: 5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubLabel = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0b1f518f;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
`;

export default FieldWrapper;
