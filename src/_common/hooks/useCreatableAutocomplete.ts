import { useState, useCallback } from 'react';

export interface IUseCreatableAutocomplete {
  list: Array<string>;
  groupBy: (opt: string) => string;
  onChange: (value: string | null) => void;
}

export function useCreatableAutocomplete({
  list,
  groupBy,
  onChange,
}: IUseCreatableAutocomplete) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((_: unknown, value: string) => {
    setInputValue(value);
  }, []);

  const handleOnChange = useCallback((_: unknown, value: { title: string } | null) => {
    onChange(value?.title || null);
  }, []);

  const handleGroupBy = useCallback((value: { title: string }) => {
    return groupBy(value.title);
  }, []);

  return {
    options: (list || []).concat(inputValue).map((val) => ({ title: val })),
    groupBy: handleGroupBy,
    onInputChange: handleInputChange,
    onChange: handleOnChange,
  };
}
