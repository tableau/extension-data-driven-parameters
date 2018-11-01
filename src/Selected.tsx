import * as React from 'react';

import { Button } from '@tableau/tableau-ui';

declare global {
    interface Window { tableau: any; }
}

export interface SelectedProps {
    nextConfig?: boolean;
    onClear: () => void;
    selected: string;
    selecting: string;
}

// An individual setting that has been set
export const Selected: React.SFC<SelectedProps> = (props) => {
    return (
        <div className='selected'>
            <p><i>The {props.selecting} <b>{props.selected}</b> has been selected</i></p>
            <Button onClick={props.onClear} style={{ display: props.nextConfig ? 'none' : 'block', marginLeft: '12px' }}>Clear</Button>
        </div>
    );
};

Selected.displayName = 'Selected';
