import * as React from 'react';

import {
    ButtonType,
    ButtonWidget,
} from '@tableau/widgets';

declare global {
    interface Window { tableau: any; }
}

// An individual setting that has been set
class Selected extends React.Component<any, any> {
    public render() {
        return (
            <div className='selected'>
            <p><i>The {this.props.selecting} <b>{this.props.selected}</b> has been selected</i></p>
            <ButtonWidget buttonType={ButtonType.Outline} handleClick={this.props.onClear} testId='clear-single' style={{marginLeft: '12px', display: this.props.nextconfig ? 'none' : 'block'}}>Clear</ButtonWidget>
            </div>
        )
    }
}

export default Selected;