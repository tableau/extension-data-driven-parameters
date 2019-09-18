import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Configure from './Configure';
import DataDrivenParameter from './DataDrivenParameter';
import Home from './Home';

declare global {
  interface Window { tableau: any; }
}

const PrimaryLayout = () => (
  <React.Fragment>
    <Route path='/' exact={true} component={Home} />
    <Route path='/parameter' component={DataDrivenParameter} />
    <Route path='/config' component={Configure} />
  </React.Fragment>
)

class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <PrimaryLayout />
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
