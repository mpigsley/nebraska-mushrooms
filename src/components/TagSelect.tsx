import Select from 'react-select';
import * as React from 'react';

import { Tag, getTagClass } from '../utils/tag.util';

export default function TagSelect() {
  return (
    <Select
      isMulti
      options={Object.values(Tag).map((tag) => ({
        value: tag,
        label: tag,
        className: getTagClass(tag),
      }))}
    />
  );
}
