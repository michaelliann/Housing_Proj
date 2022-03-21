import React, { useState, FunctionComponent } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import * as z from 'zod';
import cn from 'classnames';
import styles from './InputLine.module.scss';
import { Icon as IconType, miscIcons } from '@icons';
export interface InputLineProps
  //uses FormControlProps from react bootstrap
  extends FormControlProps,
    Omit<
      React.HtmlHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
      'onChange'
    > {
  label?: string;
  labelClassName?: string;

  inlinePostText?: string;
  postTextClassName?: string;
}
const InputLine: FunctionComponent<InputLineProps> = ({
  label,
  labelClassName,
  inlinePostText,
  postTextClassName,
  className,
  readOnly,
  onChange,
  isInvalid,
  isValid,
  value,
  children,
  ...formControlProps
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(!value || value === '');
  return (
    <div className={styles.root}>
      <Form.Group>
        {label && (
          <Form.Label className={cn(styles.label, labelClassName)}>
            {label}
          </Form.Label>
        )}

        <div className={cn('d-flex', styles.inputRow)}>
          This is a test to render
          <Form.Control
            {...formControlProps}
            value={value}
            className={cn(className, {
              [styles.unfilled]: isEmpty && !readOnly,
              [styles.filled]: !isEmpty || readOnly,
            })}
            isValid={!readOnly && isValid}
            readOnly={readOnly}
            onChange={(e) => {
              setIsEmpty(!e.target.value || e.target.value === '');
              if (onChange) onChange(e);
            }}
          />
        </div>
      </Form.Group>
    </div>
  );
};

export default InputLine;
