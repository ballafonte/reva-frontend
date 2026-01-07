'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { useDebouncedValue, DEFAULT_DELAY } from '@reva-frontend/common/client';

export interface SearchBarProps {
  /**
   * The current search value (controlled)
   */
  value?: string;
  /**
   * Callback fired when the search value changes
   * If autoApply is true, this is called with debounced value
   * If autoApply is false, this is called when the search button is clicked
   */
  onChange: (value: string) => void;
  /**
   * Placeholder text for the search input
   * @default "Search..."
   */
  placeholder?: string;
  /**
   * If true, automatically apply changes after debounce delay
   * If false, shows a search button to manually apply changes
   * @default true
   */
  autoApply?: boolean;
  /**
   * Debounce delay in milliseconds (only used when autoApply is true)
   * @default 500
   */
  debounceDelay?: number;
  /**
   * Label for the search input
   */
  label?: string;
  /**
   * If true, shows a clear button to reset the search
   * @default true
   */
  showClearButton?: boolean;
}

export function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search...',
  autoApply = true,
  debounceDelay = DEFAULT_DELAY,
  label,
  showClearButton = true,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  // Only use debounce when autoApply is enabled
  // Use a very short delay (10ms) when autoApply is false to avoid debouncing but satisfy hook requirements
  const debouncedValue = useDebouncedValue(
    localValue,
    autoApply ? debounceDelay : 10
  );
  const [lastAppliedValue, setLastAppliedValue] = useState(value);

  // Sync local value with controlled value prop
  useEffect(() => {
    setLocalValue(value);
    setLastAppliedValue(value);
  }, [value]);

  // Auto-apply debounced value when autoApply is true
  useEffect(() => {
    if (
      autoApply &&
      debouncedValue !== undefined &&
      debouncedValue !== lastAppliedValue
    ) {
      setLastAppliedValue(debouncedValue);
      onChange(debouncedValue);
    }
  }, [debouncedValue, autoApply, onChange, lastAppliedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);

    // If autoApply is false, update immediately for local state only
    // The onChange will be called when search button is clicked
  };

  const handleSearch = () => {
    onChange(localValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !autoApply) {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
      <Input
        fullWidth
        label={label}
        placeholder={placeholder}
        value={localValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        prefix={<SearchIcon />}
        suffix={
          showClearButton && localValue ? (
            <IconButton
              aria-label="clear search"
              component={ClearIcon}
              edge="end"
              onClick={handleClear}
              size="sm"
              variant="ghost"
            />
          ) : undefined
        }
      />
      {!autoApply && (
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ minWidth: 100 }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Search
        </Button>
      )}
    </Box>
  );
}
