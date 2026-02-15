import { useMemo } from 'react';
import guests from '../data/guests.json';

/**
 * Look up a guest by their unique invitation code.
 * Returns the guest object or null if not found.
 */
export function useGuest(code) {
  return useMemo(
    () => guests.find((g) => g.code === code) ?? null,
    [code],
  );
}
