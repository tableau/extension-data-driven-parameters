import * as React from 'react';
import { Button, ButtonProps, DropdownSelect, DropdownSelectProps } from '@tableau/tableau-ui';

export interface SelectorProps {
    enabled: boolean;
    list: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick: () => void;
    selected: string;
}

// Shows if setting has not yet been configured
export const Selector: React.SFC<SelectorProps> = (props) => {
    const dropdownSelectProps: DropdownSelectProps = {
        className: 'dropdown-select',
        disabled: !props.enabled,
        kind: 'line',
        onChange: props.onChange,
        onSelect: props.onChange,
        value: props.selected,
    };

    const buttonProps: ButtonProps = {
        disabled: !props.enabled || props.selected === '',
        kind: 'filledGreen',
        onClick: props.onClick,
        style: { marginLeft: '12px' },
    };

    return (
        <div className='selector'>
            <DropdownSelect {...dropdownSelectProps}>
                {props.list.map(option => <option key={option}>{option}</option>)}
            </DropdownSelect>
            <Button {...buttonProps}>Set</Button>
        </div>
    );
};

Selector.displayName = 'Selector';
