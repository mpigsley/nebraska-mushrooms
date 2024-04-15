import { X } from 'react-feather';
import * as React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
}

export default function ClearableInput({ onClear, className, ...rest }: Props) {
  return (
    <div className="relative">
      <input className={[className, 'clearable-input'].join(' ')} {...rest} />
      <button className="input-clear" onClick={onClear}>
        <X />
      </button>
    </div>
  );
}
