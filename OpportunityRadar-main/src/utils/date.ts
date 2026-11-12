import { format, parseISO, differenceInDays, isPast, isValid } from 'date-fns';

export function parseDateSafe(dateStr: string): Date | null {
  try {
    const parsed = parseISO(dateStr);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function formatFriendlyDate(dateStr: string): string {
  const d = parseDateSafe(dateStr);
  if (!d) return dateStr;
  return format(d, 'd MMMM yyyy');
}

export function formatShortDate(dateStr: string): string {
  const d = parseDateSafe(dateStr);
  if (!d) return dateStr;
  return format(d, 'MMM d, yyyy');
}

export function getDaysUntil(dateStr: string): number {
  const d = parseDateSafe(dateStr);
  if (!d) return 999;
  // Use today: 2026-10-31
  const today = new Date('2026-10-31T00:00:00');
  return differenceInDays(d, today);
}

export function getDeadlineUrgency(dateStr: string): {
  daysRemaining: number;
  label: string;
  isUrgent: boolean; // 7 days or fewer
  isCritical: boolean; // 3 days or fewer
  isPastDeadline: boolean;
} {
  const days = getDaysUntil(dateStr);
  const isPastDeadline = days < 0;

  if (isPastDeadline) {
    return {
      daysRemaining: days,
      label: 'Deadline Passed',
      isUrgent: false,
      isCritical: false,
      isPastDeadline: true
    };
  }

  if (days === 0) {
    return {
      daysRemaining: 0,
      label: 'Closing Today',
      isUrgent: true,
      isCritical: true,
      isPastDeadline: false
    };
  }

  if (days === 1) {
    return {
      daysRemaining: 1,
      label: 'Closing Tomorrow',
      isUrgent: true,
      isCritical: true,
      isPastDeadline: false
    };
  }

  if (days <= 3) {
    return {
      daysRemaining: days,
      label: `${days} days left`,
      isUrgent: true,
      isCritical: true,
      isPastDeadline: false
    };
  }

  if (days <= 7) {
    return {
      daysRemaining: days,
      label: `${days} days left`,
      isUrgent: true,
      isCritical: false,
      isPastDeadline: false
    };
  }

  return {
    daysRemaining: days,
    label: formatShortDate(dateStr),
    isUrgent: false,
    isCritical: false,
    isPastDeadline: false
  };
}

