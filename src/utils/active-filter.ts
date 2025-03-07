import * as React from 'react';
import { Tag } from './tag.util';

// window may not be defined in server-side rendering... so we need to check
const Window = typeof window !== 'undefined' ? window : null;
const PARAM_NAME = 't';

export const useActiveFilters = () => {
  const [filters, setFilters] = React.useState<Tag[]>([]);

  React.useEffect(() => {
    const param = Window
      ? (new URL(Window?.location?.href).searchParams.get(PARAM_NAME) ?? '')
      : '';
    setFilters(param.split(',').filter(Boolean) as Tag[]);
  }, []);

  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get(PARAM_NAME) === filters.join(',')) {
      return;
    }

    if (!filters.length) {
      url.searchParams.delete(PARAM_NAME);
    } else {
      url.searchParams.set(PARAM_NAME, filters.join(','));
    }
    window.history.replaceState({}, '', url.toString());
  }, [filters]);

  return { filters, setFilters };
};
