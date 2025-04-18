export const formatToCentralTime = (isoString: string): string => {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    return formatter.format(date);
  };
  