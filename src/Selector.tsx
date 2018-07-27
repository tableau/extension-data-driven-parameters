import * as React from 'react';

import {
    ButtonType,
    ButtonWidget,
    DropdownType,
    DropdownWidget,
} from '@tableau/widgets';

// Shows if setting has not yet been configured
class Selector extends React.Component<any, any> {
    public render() {
        return (
            <div className='controls'>
            <DropdownWidget testId='select' dropdownType={DropdownType.Line} menuItemInfos={this.props.list} onSelect={this.props.onChange} selectedValue={this.props.selected} disabled={!this.props.enabled} containerStyle={{marginLeft: 0, width: '100%', flex: 1}}/>
            <ButtonWidget buttonType={ButtonType.Go} handleClick={this.props.onClick} testId={this.props.selecting + 'set'} disabled={!this.props.enabled || this.props.selected === ''} style={{marginLeft: '12px'}}>Set</ButtonWidget>
            </div>
        )
    }
}

export default Selector;