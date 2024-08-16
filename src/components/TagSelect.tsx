import Select, { components } from 'react-select';
import * as React from 'react';

import { Tag, getTagClass } from '../utils/tag.util';

type TagSelectProps = {
  className?: string;
};

export default function TagSelect({ className }: TagSelectProps) {
  return (
    <Select
      isMulti
      className={className}
      classNamePrefix="tag-select"
      placeholder="Filter by tag..."
      components={{
        Option: ({ innerProps, ...props }) => (
          <components.Option
            {...props}
            innerProps={{
              ...innerProps,
              className: `tag-select__option ${props.data.className}`,
            }}
          />
        ),
        MultiValueContainer: ({ innerProps, ...props }) => (
          <components.MultiValueContainer
            {...props}
            innerProps={{
              ...innerProps,
              className: `${innerProps.className} ${props.data.className}`,
            }}
          />
        ),
      }}
      options={Object.values(Tag)
        .sort()
        .map((tag) => ({
          value: tag,
          label: tag,
          className: getTagClass(tag),
        }))}
    />
  );
}
