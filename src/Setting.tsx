import * as React from 'react';
import { Selected } from './Selected';
import { Selector } from './Selector';

declare global {
    interface Window { tableau: any; }
}

export interface SettingProps {
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

export const Setting: React.SFC<SettingProps> = (props) => {
    return (
        <div className='select'>
            <p>Select a {props.selecting}</p>
            {renderSelectElement(props)}
        </div>
    );
};

Setting.displayName = 'Setting';

function renderSelectElement(props: SettingProps): JSX.Element {
    const { config, enabled, list, nextConfig, onChange, onClear, onClick, selected, selecting } = props;

    return config ? <Selected nextConfig={nextConfig} onClear={onClear} selected={selected} selecting={selecting} /> :
                    <Selector enabled={enabled} list={list} onChange={onChange} onClick={onClick} selected={selected} />;
}
