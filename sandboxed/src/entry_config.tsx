import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Configure from './Configure';

declare global {
    interface Window { tableau: any; }
}

ReactDOM.render(<Configure />, document.getElementById('container'));
