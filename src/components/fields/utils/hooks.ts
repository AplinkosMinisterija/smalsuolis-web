import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFilteredOptions } from './functions';

export const useSelectData = ({
  options,
  disabled,
  onChange,
  getOptionLabel,
  refreshOptions,
  dependantId,
  value,
}: any) => {
  const [input, setInputValue] = useState<any>(null);
  const [showSelect, setShowSelect] = useState(false);
  const [suggestions, setSuggestions] = useState(options);
  const [loading, setLoading] = useState(false);

  const canClearValue =
    !disabled && dependantId && !options?.some((option: any) => option?.id === value?.id);

  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelect(false);
      setInputValue('');
    }
  };

  const handleSetOptions = useCallback(async () => {
    if (!refreshOptions) return;
    setLoading(true);
    await refreshOptions(dependantId);
    setLoading(false);
  }, [dependantId, refreshOptions]);

  useEffect(() => {
    if (!showSelect || !!options?.length) return;
    handleSetOptions();
  }, [showSelect, handleSetOptions, options]);

  useEffect(() => {
    if (typeof dependantId === 'undefined') return;
    handleSetOptions();
  }, [dependantId, handleSetOptions]);

  useEffect(() => {
    if (canClearValue) {
      onChange(null);
    }

    setSuggestions(options);
  }, [options, canClearValue, onChange]);

  const handleClick = (option: any) => {
    setShowSelect(false);
    setInputValue('');
    onChange(option);
  };

  const handleOnChange = (input: string) => {
    if (!options) return;

    setShowSelect(!!input);
    setInputValue(input);
    setSuggestions(getFilteredOptions(options, input, getOptionLabel));
  };

  const handleToggleSelect = () => {
    !disabled && setShowSelect(!showSelect);
  };

  return {
    suggestions,
    input,
    handleToggleSelect,
    showSelect,
    handleBlur,
    handleClick,
    handleOnChange,
    loading,
  };
};
