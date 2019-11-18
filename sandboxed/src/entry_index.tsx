import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DataDrivenParameter from './DataDrivenParameter';

declare global {
  interface Window { tableau: any; }
}

ReactDOM.render(<DataDrivenParameter />, document.getElementById('container'));
