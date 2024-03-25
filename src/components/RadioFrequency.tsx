import styled from 'styled-components';
import React from 'react';
import { Frequency, subscriptionFrequencyTitles } from '../utils';

const RadioButton = ({ id, checked, onChange, option }: any) => {
  return (
    <Button>
      <InputRadio type="radio" name="frequency" id={id} checked={checked} onChange={onChange} />
      <Label htmlFor={id}>
        <Title>{option.label}</Title>
      </Label>
    </Button>
  );
};

const RadioFrequency = ({ value, onChange }: { value: Frequency; onChange: any }) => {
  const options: any[] = [
    { id: Frequency.DAY, label: subscriptionFrequencyTitles[Frequency.DAY] },
    { id: Frequency.WEEK, label: subscriptionFrequencyTitles[Frequency.WEEK] },
    { id: Frequency.MONTH, label: subscriptionFrequencyTitles[Frequency.MONTH] },
  ];
  return (
    <Container>
      {options.map((option) => (
        <RadioButton
          key={option.id}
          id={option.id}
          checked={value === option.id}
          onChange={() => onChange(option.id)}
          option={option}
        />
      ))}
    </Container>
  );
};

export default RadioFrequency;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.div``;

const InputRadio = styled.input`
  z-index: 100;
  height: 0;
  padding: 0;
  margin: 0;
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  gap: 4px;
  cursor: pointer;
  z-index: 90;
  font-size: 14px;
  border: 1px solid #d4d5de;
  border-radius: 4px;
  font-weight: 500;

  ${InputRadio}:checked + & {
    border-color: ${({ theme }) =>
      theme.colors.primary}; /* Example: change border color when selected */
    background-color: #f4fdf6; /* Example: change background color when selected */
  }
`;

const Title = styled.div``;
