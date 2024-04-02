import classNames from 'classnames';
import { FC } from 'react';

export interface DebugProps {
  title?: string;
  children: unknown;
}

export const Debug: FC<DebugProps> = ({ title, children }) => {
  // handle special types (empty string, null, undefined etc)
  const content = (() => {
    if (children === undefined) {
      return {
        text: 'undefined',
        special: true,
      };
    } else if (children === null) {
      return {
        text: 'null',
        special: true,
      };
    } else if (typeof children === 'string') {
      if (children === '') {
        return {
          text: 'empty string',
          special: true,
        };
      } else {
        return {
          text: children,
          special: false,
        };
      }
    } else {
      return {
        text: JSON.stringify(children, null, '  '),
        special: false,
      };
    }
  })();

  // get the type name of the children
  const type = (() => {
    if (children === null) {
      return 'null';
    }

    if (children === undefined) {
      return 'undefined';
    }

    // get the constructor name
    return children.constructor.name;
  })();

  return (
    <div className="mb-2 overflow-hidden rounded-md bg-sky-100">
      {title && (
        <div className="flex flex-row items-center justify-between bg-sky-200 px-2 py-1">
          <div className="font-weight-medium text-base">{title}</div>
          <div className="font-mono text-xs italic text-default-gray">{type}</div>
        </div>
      )}
      <pre className={classNames("px-2 py-2 font-mono text-xs", content.special && 'italic')}>{content.text}</pre>
    </div>
  );
};