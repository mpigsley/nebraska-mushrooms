import { Link } from 'gatsby';
import * as React from 'react';

interface TaxonomyBreadcrumbsProps {
  noLastLink?: boolean;
  taxonomy: string[];
}

export default function TaxonomyBreadcrumbs({
  noLastLink = false,
  taxonomy,
}: TaxonomyBreadcrumbsProps) {
  return taxonomy.map((taxa, index: number) => (
    <i key={taxa}>
      {index > 0 && <> &gt; </>}
      {noLastLink && index === taxonomy.length - 1 ? (
        taxa
      ) : (
        <Link to={`/taxa/${taxa.toLowerCase()}`}>{taxa}</Link>
      )}
    </i>
  ));
}
