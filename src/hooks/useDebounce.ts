import { useEffect, useState } from "react";

/**
 * useDebounce Hook
 * Returns a debounced version of a value that only updates
 * after the specified delay has passed.
 *
 * @template T - Generic type of the value to debounce.
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds before updating.
 * @returns The debounced value with the same type as input.
 */
export function useDebounce<T>(value: T, delay: number): T {
	// State is initialized with the same type as value
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// Validate delay (strict typing encourages defensive code)
		if (typeof delay !== "number" || delay < 0) {
			throw new Error("Delay must be a non-negative number.");
		}

		const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
