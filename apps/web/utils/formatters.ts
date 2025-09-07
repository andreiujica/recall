/**
 * Utility functions for formatting data
 */

/**
 * Formats a date to a readable string format
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

/**
 * Extracts domain from URL for display
 * @param url - The URL to extract domain from
 * @returns Clean domain name without www prefix
 */
export function formatDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}
