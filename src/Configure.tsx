import * as React from 'react';

import { Button, Checkbox } from '@tableau/tableau-ui';
import { Setting } from './Setting';

declare global {
    interface Window { tableau: any; }
}

let dashboard: any;

interface State {
    bg: string,
    configured: boolean,
    field: string,
    field_config: boolean,
    field_enabled: boolean,
    field_list: string[],
    ignoreSelection: boolean,
    loading: boolean,
    param_config: boolean,
    param_enabled: boolean,
    param_list: string[],
    parameter: string,
    tpexists: boolean,
    txt: string,
    worksheet: string,
    ws_config: boolean,
    ws_enabled: boolean,
    ws_list: string[],
}

const Loading: string = 'Loading...';
const NoFieldsFound: string = 'No fields found that match parameter!';
const NoWorksheetsFound: string = 'No worksheets found!';

// Container for all configurations
class Configure extends React.Component<any, State> {
    public readonly state: State = {
        bg: '#000000',
        configured: false,
        field: '',
        field_config: false,
        field_enabled: false,
        field_list: [],
        ignoreSelection: false,
        loading: true,
        param_config: false,
        param_enabled: false,
        param_list: [],
        parameter: '',
        tpexists: true,
        txt: '#000000',
        worksheet: '',
        ws_config: false,
        ws_enabled: false,
        ws_list: [],
    };

    constructor(props: any) {
        super(props);
        this.bgChange = this.bgChange.bind(this);
        this.txtChange = this.txtChange.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.paramChange = this.paramChange.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
        this.wsChange = this.wsChange.bind(this);
        this.setParam = this.setParam.bind(this);
        this.setField = this.setField.bind(this);
        this.setWS = this.setWS.bind(this);
        this.clearParam = this.clearParam.bind(this);
        this.clearField = this.clearField.bind(this);
        this.clearWS = this.clearWS.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.clearSettings = this.clearSettings.bind(this);
    }

    // Handles change in background color input
    public bgChange = (color: any): void => {
        this.setState({ bg: color.target.value });
    };

    // Handles change in text color input
    public txtChange = (color: any): void => {
        this.setState({ txt: color.target.value });
    };

    // Handles selection in parameter dropdown
    public paramChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ parameter: e.target.value });
    };

    // Handles selection in field dropdown
    public fieldChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ field: e.target.value });
    };

    // Handles selection in worksheet dropdown
    public wsChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ worksheet: e.target.value });
    };

    // Handles change in ignoreSelection checkbox
    public checkChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ignoreSelection: !e.target.checked });
    };

    public checkChangeTwo = (value: boolean): void => {
        this.setState({ ignoreSelection: !value });
    };

    // Tests if currently set Parameter exists and accepts all values
    public testParamSettings() {
        if (this.state.configured) {
            const pset = window.tableau.extensions.settings.getAll().selParam;
            this.setState({loading: true});
            dashboard.getParametersAsync().then((params: any) => {
                const testParam = params.find((param: any) => param.name === pset);
                if (testParam) {
                    if (testParam.allowableValues.type === 'all') {
                        this.setState({
                            param_config: true,
                            param_enabled: false,
                            parameter: testParam.name,
                        });
                        this.testWSSettings();
                    } else {
                        this.populateParamList();
                        this.setState({loading: false, configured: false});
                    }
                } else {
                    this.populateParamList();
                    this.setState({loading: false, configured: false});
                }
            });
        } else {
            this.populateParamList();
            this.setState({loading: false});
        }
    }

    // Gets list of parameters in workbook and populates dropdown
    public populateParamList() {
        this.setState({
            param_list: [ Loading ],
            parameter: Loading,
        });
        dashboard.getParametersAsync().then((params: any) => {
            const options: string[] = [];
            for (const p of params) {
                if (p.allowableValues.type === 'all') {
                    options.push(p.name);
                }
            }
            this.setState({
                param_enabled: true,
                param_list: options,
                parameter: options[0],
            });

        });
    }

    // Sets which tableau parameter to update
    public setParam() {
        if (this.state.parameter !== '') {
            this.setState({
                param_config: true,
                param_enabled: false,
            });
            this.testWSSettings();
        }
    }

    // Clear which tableau parameter to update
    public clearParam() {
        this.setState({
            param_config: false,
            param_enabled: true,
            ws_enabled: false,
        });
        this.populateParamList();
    }

    // Tests if currently set Worksheet to pull filters from exists
    public testWSSettings() {
        if (this.state.configured) {
            this.setState({loading: true});
            const wsset = window.tableau.extensions.settings.get('selWorksheet');
            if (wsset && dashboard.worksheets.find((ws: any) => ws.name === wsset)) {
                this.setState({
                    loading: false,
                    worksheet: wsset,
                    ws_config: true,
                    ws_enabled: false,
                });
                this.testFieldSettings();
            } else {
                this.setState({
                    loading: false, 
                });
                this.populateWS();
            }
        } else {
            this.setState({loading: false});
            this.populateWS();
        }
    }

    // Populates list of worksheets
    public populateWS() {
        this.setState({
            worksheet: Loading,
            ws_list: [ Loading ],
        });
        const options: string[] = [];
        let c = 0;
        for (const ws of dashboard.worksheets) {
            options.push(ws.name);
            c++;
        }
        if (c === 0) {
            this.setState({
                worksheet: NoWorksheetsFound,
                ws_enabled: false,
                ws_list: [ NoWorksheetsFound ],
            });
        } else {
            this.setState({
                worksheet: options[0],
                ws_enabled: true,
                ws_list: options,
            });
        }
    }

    // Sets which worksheet to use for filters
    public setWS() {
        if (this.state.worksheet !== '') {
            this.setState({
                ws_config: true,
                ws_enabled: false,
            });
            this.testFieldSettings();
        }
    }

    // Clears which worksheet to use for filters
    public clearWS() {
        this.setState({
            field_enabled: false,
            ws_config: false,
            ws_enabled: true,
        });
        this.populateWS();
    }

    // Tests if currently set Field to pull domain from exists
    public testFieldSettings() {
        if (this.state.configured) {
            this.setState({loading: true});
            const fset = window.tableau.extensions.settings.get('selField');
            if (fset) {
                dashboard.worksheets.find((w: any) => w.name === this.state.worksheet).getSummaryDataAsync().then((dataTable: any) => {
                    if (dataTable.columns.find((column: any) => column.fieldName === fset)) {
                        this.setState({
                            configured: true,
                            field: fset,
                            field_config: true,
                            field_enabled: false,
                            loading: false,
                        });
                    } else {
                        this.populateFieldList();
                        this.setState({loading: false, configured: false});
                    }
                });
            } else {
                this.populateFieldList();
                this.setState({loading: false, configured: false});
            }
        } else {
            this.populateFieldList();
            this.setState({loading: false});
        }
    }

    // Gets list of fields
    public populateFieldList() {
        this.setState({
            field: Loading,
            field_list: [ Loading ],
        });
        let dataType: string;
        window.tableau.extensions.dashboardContent.dashboard.getParametersAsync().then((params: any) => {
            dataType = params.find((param: any) => param.name === this.state.parameter).dataType;
            return dashboard.worksheets.find((w: any) => w.name === this.state.worksheet).getSummaryDataAsync();
        })
        .then((dataTable: any) => {
            const options: string[] = [];
            let c = 0;
            for (const f of dataTable.columns) {
                if (f.dataType === dataType) {
                    options.push(f.fieldName);
                    c++;
                }
            }
            if (c === 0) {
                this.setState({
                    field: NoFieldsFound,
                    field_enabled: false,
                    field_list: [ NoFieldsFound ],
                });
            } else {
                this.setState({
                    field: options[0],
                    field_enabled: true,
                    field_list: options,
                });
            }
        });
    }

    // Sets the field to pull values from for Data-Driven Parameter
    public setField() {
        if (this.state.field !== '') {
            this.setState({
                configured: true,
                field_config: true,
                field_enabled: false,
            });
        }
    }

    // Clears the field to pull values from for Data-Driven Parameter
    public clearField() {
        this.setState({
            configured: false,
            field_config: false,
            field_enabled: true,
        });
        this.populateFieldList();
    }

    // Saves settings and closes configure dialog with data source payload
    public submit() {
        window.tableau.extensions.settings.set('selParam', this.state.parameter);
        window.tableau.extensions.settings.set('selWorksheet', this.state.worksheet);
        window.tableau.extensions.settings.set('selField', this.state.field);
        window.tableau.extensions.settings.set('bg', this.state.bg);
        window.tableau.extensions.settings.set('txt', this.state.txt);
        window.tableau.extensions.settings.set('ignoreSelection', this.state.ignoreSelection);
        window.tableau.extensions.settings.set('configured', 'true');
        window.tableau.extensions.settings.saveAsync().then(() => {
            window.tableau.extensions.ui.closeDialog(this.state.worksheet);
        });
    }

    // Closes configure dialog with no* payload.
    public cancel() {
        window.tableau.extensions.ui.closeDialog(this.state.configured ? this.state.worksheet : '');
    }

    // Clears settings and states
    public clearSettings() {
        window.tableau.extensions.settings.erase('selParam');
        window.tableau.extensions.settings.erase('selWorksheet');
        window.tableau.extensions.settings.erase('selField');
        window.tableau.extensions.settings.erase('bg');
        window.tableau.extensions.settings.erase('txt');
        window.tableau.extensions.settings.set('configured', 'false');
        this.setState({
            configured: false,
            field: '',
            field_config: false,
            field_enabled: false,
            field_list: [],
            param_config: false,
            param_enabled: false,
            param_list: [],
            parameter: '',
            worksheet: '',
            ws_config: false,
            ws_enabled: false,
            ws_list: [],
        });
        this.populateParamList();
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        const uiPromise = window.tableau.extensions.initializeDialogAsync();
        if (uiPromise) {
            uiPromise.then(() => {
                dashboard = window.tableau.extensions.dashboardContent.dashboard;
                const paramPromise = dashboard.getParametersAsync();
                if (paramPromise) {
                    paramPromise.then((params: any) => {
                        // If there are any parameters:
                        if (params.length > 0) {
                            let c = 0;
                            for (const p of params) {
                                if (p.allowableValues.type === 'all') {
                                    c++;
                                }
                            }
                            // If there are open input parameters:
                            if (c > 0) {
                                const settings  = window.tableau.extensions.settings.getAll();
                                if (settings.configured === 'true') {
                                    if (settings.bg) {
                                        this.setState({
                                            bg: settings.bg,
                                        });
                                    } 
                                    if (settings.txt) {
                                        this.setState({
                                            txt: settings.txt,
                                        });
                                    }
                                    if (settings.ignoreSelection) {
                                        this.setState({
                                            ignoreSelection: settings.ignoreSelection === 'true',
                                        });
                                    }
                                    this.setState({
                                        configured: true,
                                    });
                                    this.testParamSettings();
                                } else {
                                    this.setState({
                                        bg: '#ffffff',
                                    });
                                    this.populateParamList();
                                    this.setState({loading: false});
                                }
                            } else {
                                this.setState({
                                    loading: false,
                                    tpexists: false,
                                });
                            }
                        } else {
                            this.setState({
                                loading: false,
                                tpexists: false,
                            });
                        }
                    });
                }
            });
        }
    }

    public render() {
      return (
        <React.Fragment>
            {/* <div id='loading' className={this.state.loading ? 'loading' : 'loaded'}> */}
                {/* Checking settings... */}
                {/* <Spinner showUnderlay={true} /> */}
            {/* </div> */}
            <div className='container'>
                <div>
                    <div className='header'>
                        Data-Driven Parameter Configuration
                        <div className='tooltip'>
                            <svg xmlns='http://www.w3.org/2000/svg' id='Dialogs_x5F_Info' width='15' height='15' viewBox='0 0 15 15'>
                                <rect id='Line' x='7' y='6' width='1' height='5' fillRule='evenodd' clipRule='evenodd' fill='#666766' />
                                <rect id='Dot_2_' x='7' y='4' width='1' height='1' fillRule='evenodd' clipRule='evenodd' fill='#666766' />
                                <path id='Circle' d='M7.5,1C3.9,1,1,3.9,1,7.5S3.9,14,7.5,14 S14,11.1,14,7.5S11.1,1,7.5,1z M7.5,13C4.5,13,2,10.5,2,7.5C2,4.5,4.5,2,7.5,2S13,4.5,13,7.5C13,10.5,10.5,13,7.5,13z' fillRule='evenodd' clipRule='evenodd' fill='#666766' />
                            </svg>
                            <span className='tooltiptext'>
                                <b>How to Use</b>
                                <ol>
                                    <li>Select a Tableau parameter to manipulate.</li>
                                    <li>Select a worksheet with the data you want.</li>
                                    <li>Select a field to use to populate the parameter.</li>
                                </ol>
                            </span>
                        </div>
                    </div>
                    {this.state.tpexists ? <React.Fragment>
                        <div className='title'>Configure Parameter</div>
                        <Setting selecting='parameter' onClick={this.setParam} onClear={this.clearParam} config={this.state.param_config} nextConfig={this.state.ws_config} selected={this.state.parameter} enabled={this.state.param_enabled} list={this.state.param_list} onChange={this.paramChange}/>
                        <Setting selecting='worksheet' onClick={this.setWS} onClear={this.clearWS} config={this.state.ws_config} nextConfig={this.state.field_config} selected={this.state.worksheet} enabled={this.state.ws_enabled} list={this.state.ws_list} onChange={this.wsChange} />
                        <Setting selecting='field' onClick={this.setField} onClear={this.clearField} config={this.state.field_config} selected={this.state.field} enabled={this.state.field_enabled} list={this.state.field_list} onChange={this.fieldChange}/>
                        <Checkbox checked={!this.state.ignoreSelection} onChange={this.checkChange} style={{ flexGrow: 1, marginTop:'12px', marginLeft: '10px' }}>Filter parameter list based on worksheet selections</Checkbox>
                        <div className='title' style={{marginTop: '30px'}}>
                            Formatting
                        </div>
                        <div className='select'>
                            <div className='format'>
                                <div className='ftext'>Background Color</div>
                                <div>
                                    <input type='color' defaultValue={this.state.bg} onChange={this.bgChange} style={{backgroundColor: this.state.bg}}/>
                                </div>
                            </div>
                            <div className='format'>
                                <div className='ftext'>Text Color</div>
                                <div>
                                    <input type='color' defaultValue={this.state.txt} onChange={this.txtChange} style={{backgroundColor: this.state.txt}}/>
                                </div>
                            </div>
                        </div>
                    </React.Fragment> : <div className='error'>Please create a parameter that allows all values for use with this extension.</div>}
                </div>
                <div className='footer'>
                    <div className='btncluster'>
                        <Button onClick={this.clearSettings} style={{ marginRight: 'auto' }}>Clear Settings</Button>
                        {/* <Button onClick={this.cancel}>Cancel</Button> */}
                        <Button kind='filledGreen' onClick={this.submit} disabled={!this.state.configured || !this.state.ws_config} style={{ marginLeft: '12px' }}>OK</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
      );
    }
}

export default Configure;