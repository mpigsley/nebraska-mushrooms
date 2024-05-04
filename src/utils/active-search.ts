import * as React from 'react';

// window may not be defined in server-side rendering... so we need to check
const Window = typeof window !== 'undefined' ? window : null;

export const useActiveSearch = () => {
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setSearch(
      Window ? new URL(Window?.location?.href).searchParams.get('q') ?? '' : '',
    );
  }, []);

  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('q') === search) {
      return;
    }

    if (search === '') {
      url.searchParams.delete('q');
    } else {
      url.searchParams.set('q', search);
    }
    window.history.pushState({}, '', url.toString());
  }, [search]);

  return { search, setSearch };
};
