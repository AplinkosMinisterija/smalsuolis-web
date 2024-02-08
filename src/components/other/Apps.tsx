import styled from 'styled-components';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import change = Simulate.change;

const Apps = ({ id, checked, onChange, app }: any) => {
  return (
    <Button>
      <InputRadio type="checkbox" id={id} checked={checked} onChange={onChange} />
      <Label htmlFor={id}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-home"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <Title>{app.name}</Title>
        <Description>{app.description}</Description>
      </Label>
    </Button>
  );
};

const RadioGroup = ({
  options,
  value,
  onChange,
}: {
  options: { id: number; name?: string; description?: string }[];
  value: number[];
  onChange: (options: number[]) => void;
}) => {
  const updateValue = (id: number, checked: boolean) => {
    if (checked) {
      return [...value, id];
    } else {
      return value.filter((val) => val !== id);
    }
  };
  return (
    <Container>
      {options.map((option) => (
        <Apps
          id={option.id}
          checked={value.includes(option.id)}
          onChange={(e: any) => {
            const updatedValues = updateValue(option.id, e.target.checked);
            onChange(updatedValues);
          }}
          app={option}
        />
      ))}
    </Container>
  );
};

export default RadioGroup;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
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
  height: 100%;
  justify-content: flex-start;
  align-items: baseline;
  padding: 16px;
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

const Title = styled.div`
  font-weight: 600;
`;

const Description = styled.div`
  color: #525252;
  font-weight: 400;
  font-size: 12px;
`;
