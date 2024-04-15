import * as React from 'react';

export const useActiveSearch = () => {
  const [search, setSearch] = React.useState(
    new URL(window.location.href).searchParams.get('q') ?? '',
  );

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
