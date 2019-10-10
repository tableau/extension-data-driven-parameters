import * as React from 'react';
import { Button } from '@tableau/tableau-ui';

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
            <Button onClick={props.onClear} style={{ visibility: props.nextConfig ? 'hidden' : 'visible', marginLeft: '12px' }}>Clear</Button>
        </div>
    );
};

Selected.displayName = 'Selected';
