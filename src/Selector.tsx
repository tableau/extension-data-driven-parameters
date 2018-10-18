import * as React from 'react';

import { Button, ButtonProps, DropdownSelect, DropdownSelectProps  } from '@tableau/tableau-ui';

export interface SelectorProps {
    config: boolean;
    enabled: boolean;
    list: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick: () => void;
    selected: string;
    selecting: string;
}

// Shows if setting has not yet been configured
export const Selector: React.SFC<SelectorProps> = (props) => {
    const dropdownSelectProps: DropdownSelectProps = {
        disabled: !props.enabled,
        kind: 'line',
        onChange: props.onChange,
        onSelect: props.onChange,
        style: { flex: 1, marginLeft: 0, width: '100%' },
        value: props.selected,
    };

    const buttonProps: ButtonProps = {
        disabled: !props.enabled || props.selected === '',
        kind: 'filledGreen',
        onClick: props.onClick,
        style: { marginLeft: '12px' },
    }

    return (
        <div className='controls'>
            <DropdownSelect {...dropdownSelectProps}>
                {props.list.map(option => <option key={option}>{option}</option>)}
            </DropdownSelect>
            <Button {...buttonProps}>Set</Button>
        </div>
    );
};

Selector.displayName = 'Selector';
