import * as React from 'react';

import { Selected, SelectedProps } from './Selected';
import { Selector, SelectorProps } from './Selector';

declare global {
    interface Window { tableau: any; }
}

export interface SettingsProps {
    config: boolean;
    enabled: boolean;
    list: string[];
    nextConfig?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClear: () => void;
    onClick: () => void;
    selected: string;
    selecting: string;
}

// An individual setting. Changes based upon setting be set or not
export const Setting: React.SFC<SettingsProps> = (props) => {
    const selectedProps: SelectedProps = {
        nextConfig: props.nextConfig,
        onClear: props.onClear,
        selected: props.selected,
        selecting: props.selecting,
    }

    const selectorProps: SelectorProps = {
        config: props.config,
        enabled: props.enabled,
        list: props.list,
        onChange: props.onChange,
        onClick: props.onClick,
        selected: props.selected,
        selecting: props.selecting,
    }

    return (
        <div className='select'>
            <p>Select a {props.selecting}</p>
            {props.config ? <Selected {...selectedProps} /> : <Selector {...selectorProps}  /> }
        </div>
    )
};

Setting.displayName = 'Setting';
