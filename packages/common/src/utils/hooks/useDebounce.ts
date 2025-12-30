import { useCallback, useEffect, useRef, useState } from 'react';

export const DEFAULT_DELAY = 500;

export const useDebouncedValue = <T>(value: T, delay: number = DEFAULT_DELAY) => {
	const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
	const [debouncedValue, setDebouncedValue] = useState<T>();

	useEffect(() => {
		// Clear any existing timeout
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// Set a new timeout to update the debounced value
		timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [value, delay]);

	return debouncedValue;
};

export const useDebouncedCallback = <T>(
	callback: (...args: T[]) => unknown,
	delay: number = DEFAULT_DELAY
) => {
	// Use a ref to store the timeout between renders
	// and prevent changes to it from causing re-renders
	const timerRef = useRef<NodeJS.Timeout>(undefined);

	return useCallback(
		(...args: T[]) => {
			const later = () => {
				clearTimeout(timerRef?.current);
				callback(...args);
			};

			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(later, delay);
		},
		[callback, delay]
	);
};