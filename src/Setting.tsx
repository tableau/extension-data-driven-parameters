import * as React from 'react';
import Selected from './Selected';
import Selector from './Selector';

declare global {
    interface Window { tableau: any; }
}

// An individual setting. Chnges based on if setting is set or not
class Setting extends React.Component<any, any> {
    public render() {
        return (
            <div className='select'>
                <p>Select a {this.props.selecting}</p>
                { this.props.config ? <Selected selecting={this.props.selecting} selected={this.props.selected} nextconfig={this.props.nextconfig} onClear={this.props.onClear} /> : <Selector selecting={this.props.selecting} selected={this.props.selected} onClick={this.props.onClick} config={this.props.config} enabled={this.props.enabled} list={this.props.list} onChange={this.props.onChange} /> }
            </div>
        )
    }
}

export default Setting;