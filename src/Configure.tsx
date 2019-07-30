import * as React from 'react';

import { Button, Checkbox, DropdownSelect, Radio, Tabs, TextField } from '@tableau/tableau-ui';
import { Setting } from './Setting';

/* tslint:disable:no-console */

declare global {
    interface Window { tableau: any; }
}

interface State {
    applyButton: boolean,
    autoUpdate: boolean,
    bg: string,
    configured: boolean,
    dataType: string,
    delimiter: string,
    displayField: string,
    field: string,
    field_config: boolean,
    field_enabled: boolean,
    field_list: string[],
    ignoreSelection: boolean,
    includeAllValue: boolean,
    multiselect: boolean,
    param_config: boolean,
    param_enabled: boolean,
    param_list: string[],
    parameter: string,
    selectedTabIndex: number;
    showDisplayValues: boolean,
    sort: string,
    txt: string,
    updateOnChange: boolean,
    useFormattedValues: boolean,
    worksheet: string,
    ws_config: boolean,
    ws_enabled: boolean,
    ws_list: string[],
}

const Loading: string = 'Loading...';
const NoFieldsFound: string = 'No fields found that match parameter!';
const NoWorksheetsFound: string = 'No worksheets found!';
const NoParametersFound: string = 'No open input parameters found!';

class Configure extends React.Component<any, State> {
    public readonly state: State = {
        applyButton: false,
        autoUpdate: false,
        bg: '#ffffff',
        configured: false,
        dataType: 'string',
        delimiter: '|',
        displayField: '',
        field: '',
        field_config: false,
        field_enabled: false,
        field_list: [],
        ignoreSelection: true,
        includeAllValue: false,
        multiselect: false,
        param_config: false,
        param_enabled: false,
        param_list: [],
        parameter: '',
        selectedTabIndex: 0,
        showDisplayValues: false,
        sort: 'asc',
        txt: '#333333',
        updateOnChange: false,
        useFormattedValues: false,
        worksheet: '',
        ws_config: false,
        ws_enabled: false,
        ws_list: [],
    };

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
    public ignoreSelectionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ignoreSelection: !e.target.checked });
    };
    
    // Handles change in useFormattedValues checkbox
    public aliasChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ useFormattedValues: e.target.checked });
    };
    
    // Handles change in "(All)" checkbox
    public allChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ includeAllValue: e.target.checked });
    };
    
    // Handles change in sort checkbox
    public sortChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ sort: e.target.value });
    };
    
    // Handles change in delimiter textbox
    public delimiterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ delimiter: e.target.value });
    };
    
    // Handles change in multiselect checkbox
    public multiselectChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ multiselect: e.target.checked });
    };
    
    // Handles change in apply button checkbox
    public applyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ applyButton: e.target.checked });
    };
    
    // Handles change in auto update checkbox
    public autoUpdateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ autoUpdate: e.target.checked });
    };
    
    // Handles change in showDisplayValues checkbox
    public displayChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ showDisplayValues: e.target.checked });
    };
    
    // Handles selection in display values dropdown
    public displayFieldChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ displayField: e.target.value });
    };
    
    // Handles change in updateOnChange checkbox
    public updateOnChangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ updateOnChange: e.target.checked });
    };

    // Handles change in options tabs   
    public tabChange = (index: any): void => {
        this.setState({ selectedTabIndex: index });
    };

    // Tests if extension is configured and if so, if the parameter in settings exists and accepts all values
    public testParamSettings() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        const settings = window.tableau.extensions.settings.getAll();
        if (this.state.configured) {
            dashboard.findParameterAsync(settings.selParam).then((param: any) => {
                if (param && param.allowableValues.type === 'all') {
                    this.setState({
                        dataType: param.dataType,
                        param_config: true,
                        parameter: param.name,
                    });
                    this.testWSSettings();
                } else {
                    this.populateParamList();
                    this.setState({ configured: false });
                }
            })
        } else {
            this.populateParamList();
        }
    }

    // Gets list of parameters in workbook and populates dropdown
    public populateParamList() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        this.setState({
            param_list: [Loading],
            parameter: Loading,
        });
        dashboard.getParametersAsync().then((params: any) => {
            const dropdownList: string[] = [];
            for (const p of params) {
                if (p.allowableValues.type === 'all') {
                    dropdownList.push(p.name);
                }
            }
            dropdownList.sort();
            if (dropdownList.length > 0) {
                this.setState({
                    param_enabled: true,
                    param_list: dropdownList,
                    parameter: dropdownList[0],
                });
            } else {
                this.setState({
                    param_enabled: false,
                    param_list: [NoParametersFound],
                    parameter: NoParametersFound,
                });
            }
        });
    }

    // Sets which tableau parameter to update
    public setParam = (): void => {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        if (this.state.parameter !== '') {
            dashboard.findParameterAsync(this.state.parameter).then((param: any) => {
                this.setState({ 
                    dataType: param.dataType,
                    includeAllValue: (param.dataType === 'string' ? this.state.includeAllValue : false),
                    multiselect: (param.dataType === 'string' ? this.state.multiselect : false),
                    param_config: true,
                });
                this.populateWS();
            });
        }
    }

    // Clears setting for which tableau parameter to update
    public clearParam = (): void => {
        this.setState({
            param_config: false,
            param_enabled: true,
            ws_enabled: false,
        });
        this.populateParamList();
    }

    // Tests if extension is configured and if so, if the worksheet in settings exists
    public testWSSettings() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        const settings = window.tableau.extensions.settings.getAll();
        if (this.state.configured) {
            if (dashboard.worksheets.find((ws: any) => ws.name === settings.selWorksheet)) {
                this.setState({
                    worksheet: settings.selWorksheet,
                    ws_config: true,
                    ws_enabled: false,
                });
                this.testFieldSettings();
            } else {
                this.populateWS();
                this.setState({ configured: false });
            }
        } else {
            this.populateWS();
        }
    }

    // Gets list of worksheets in dashboard and populates dropdown
    public populateWS() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        this.setState({
            worksheet: Loading,
            ws_list: [Loading],
        });
        const dropdownList: string[] = [];
        for (const ws of dashboard.worksheets) {
            dropdownList.push(ws.name);
        }
        dropdownList.sort();
        if (dropdownList.length > 0) {
            this.setState({
                worksheet: dropdownList[0],
                ws_enabled: true,
                ws_list: dropdownList,
            });
        } else {
            this.setState({
                worksheet: NoWorksheetsFound,
                ws_enabled: false,
                ws_list: [NoWorksheetsFound],
            });
        }
    }

    // Sets which worksheet to use for filters
    public setWS = (): void => {
        if (this.state.worksheet !== '') {
            this.setState({ ws_config: true });
            this.populateFieldList();
        }
    }

    // Clears setting for which worksheet to use for filters
    public clearWS = (): void => {
        this.setState({
            field_enabled: false,
            ws_config: false,
            ws_enabled: true,
        });
        this.populateWS();
    }

    // Tests if extension is configued and if so, if the field in settings exists on the selected worksheet
    public testFieldSettings() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        const settings = window.tableau.extensions.settings.getAll();
        if (this.state.configured) {
            dashboard.worksheets.find((w: any) => w.name === this.state.worksheet).getSummaryDataAsync().then((dataTable: any) => {
                if (dataTable.columns.find((column: any) => column.fieldName === settings.selField)) {
                    const dropdownList: string[] = [];
                    for (const f of dataTable.columns) {
                        dropdownList.push(f.fieldName);
                    }
                    dropdownList.sort();
                    this.setState({
                        configured: true,
                        field: settings.selField,
                        field_config: true,
                        field_enabled: false,
                        field_list: dropdownList,
                    });
                } else {
                    this.populateFieldList();
                    this.setState({ configured: false });
                }
            });
        } else {
            this.populateFieldList();
        }
    }

    // Gets list of fields in previously selected worksheet's data and populates dropdown
    public populateFieldList() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        this.setState({
            field: Loading,
            field_list: [Loading],
        });
        let dataType: string;
        dashboard.findParameterAsync(this.state.parameter).then((param: any) => {
            dataType = param.dataType;
            return dashboard.worksheets.find((w: any) => w.name === this.state.worksheet).getSummaryDataAsync();
        })
            .then((dataTable: any) => {
                const dropdownList: string[] = [];
                for (const f of dataTable.columns) {
                    if (f.dataType === dataType) {
                        dropdownList.push(f.fieldName);
                    }
                }
                dropdownList.sort();
                if (dropdownList.length > 0) {
                    this.setState({
                        field: dropdownList[0],
                        field_enabled: true,
                        field_list: dropdownList,
                    });
                } else {
                    this.setState({
                        field: NoFieldsFound,
                        field_enabled: false,
                        field_list: [NoFieldsFound],
                    });
                }
            });
    }

    // Sets the field to pull values from for Data-Driven Parameter
    public setField = (): void => {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        if (this.state.field !== '') {
            this.setState({
                configured: true,
                field_config: true,
            });
        }

        // For display values list
        dashboard.worksheets.find((w: any) => w.name === this.state.worksheet).getSummaryDataAsync().then((dataTable: any) => {
            const dropdownList: string[] = [];
            for (const f of dataTable.columns) {
                dropdownList.push(f.fieldName);
            }
            dropdownList.sort();
            this.setState({
                displayField: dropdownList[0],
                field_list: dropdownList,
            });
        });
    }

    // Clears the field to pull values from for Data-Driven Parameter
    public clearField = (): void => {
        this.setState({
            configured: false,
            field_config: false,
            field_enabled: true,
        });
        this.populateFieldList();
    }

    // Saves settings and closes configure dialog
    public submit = (): void => {
        window.tableau.extensions.settings.set('selParam', this.state.parameter);
        window.tableau.extensions.settings.set('selWorksheet', this.state.worksheet);
        window.tableau.extensions.settings.set('selField', this.state.field);
        window.tableau.extensions.settings.set('bg', this.state.bg);
        window.tableau.extensions.settings.set('txt', this.state.txt);
        window.tableau.extensions.settings.set('sort', this.state.sort);
        window.tableau.extensions.settings.set('ignoreSelection', this.state.ignoreSelection);
        window.tableau.extensions.settings.set('useFormattedValues', this.state.useFormattedValues);
        window.tableau.extensions.settings.set('includeAllValue', (this.state.dataType !== 'string' ? 'false' : this.state.includeAllValue));
        window.tableau.extensions.settings.set('delimiter', this.state.delimiter);
        window.tableau.extensions.settings.set('multiselect', (this.state.dataType !== 'string' ? 'false' : this.state.multiselect));
        window.tableau.extensions.settings.set('autoUpdate', this.state.autoUpdate);
        window.tableau.extensions.settings.set('dataType', this.state.dataType || 'string');
        window.tableau.extensions.settings.set('showDisplayValues', this.state.showDisplayValues);
        window.tableau.extensions.settings.set('displayField', this.state.displayField);
        window.tableau.extensions.settings.set('updateOnChange', this.state.updateOnChange);
        window.tableau.extensions.settings.set('applyButton', this.state.applyButton);
        window.tableau.extensions.settings.set('configured', 'true');
        window.tableau.extensions.settings.saveAsync().then(() => {
            window.tableau.extensions.ui.closeDialog(this.state.worksheet);
        });
    }

    // Clears settings and states
    public clearSettings = (): void => {
        this.setState({
            configured: false,
            displayField: '',
            field: '',
            field_config: false,
            field_enabled: false,
            field_list: [],
            param_config: false,
            param_list: [],
            parameter: '',
            showDisplayValues: false,
            worksheet: '',
            ws_config: false,
            ws_enabled: false,
            ws_list: [],
        });
        this.populateParamList();
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        window.tableau.extensions.initializeDialogAsync().then(() => {
            const settings = window.tableau.extensions.settings.getAll();
            if (settings.configured === 'true') {
                this.setState({
                    applyButton: settings.applyButton === 'true' || false,
                    autoUpdate: settings.autoUpdate === 'true' || false,
                    bg: settings.bg || '#ffffff',
                    configured: true,
                    dataType: settings.dataType,
                    delimiter: settings.delimiter || '|',
                    displayField: settings.displayField || '',
                    ignoreSelection: (settings.ignoreSelection ? settings.ignoreSelection === 'true' : true),
                    includeAllValue: settings.includeAllValue === 'true' || false,
                    multiselect: settings.multiselect === 'true' || false,
                    showDisplayValues: settings.showDisplayValues === 'true' || false,
                    sort: settings.sort || 'asc',
                    txt: settings.txt || '#333333',
                    updateOnChange: settings.updateOnChange === 'true' || false,
                    useFormattedValues: settings.useFormattedValues === 'true' || false,
                });
                this.testParamSettings();
            } else {
                this.populateParamList();
            }
        });
    }

    public render() {
        const configuration = <div className='content'>                      
            <Setting selecting='parameter' onClick={this.setParam} onClear={this.clearParam} config={this.state.param_config} nextConfig={this.state.ws_config} selected={this.state.parameter} enabled={this.state.param_enabled && !this.state.param_config} list={this.state.param_list} onChange={this.paramChange} />
            <Setting selecting='worksheet' onClick={this.setWS} onClear={this.clearWS} config={this.state.ws_config} nextConfig={this.state.field_config} selected={this.state.worksheet} enabled={this.state.ws_enabled} list={this.state.ws_list} onChange={this.wsChange} />
            <Setting selecting='field' onClick={this.setField} onClear={this.clearField} config={this.state.field_config} selected={this.state.field} enabled={this.state.field_enabled} list={this.state.field_list} onChange={this.fieldChange} />
        </div>;

        const options = <div className='content'>
            <div className='option'>
                <Checkbox checked={!this.state.ignoreSelection} onChange={this.ignoreSelectionChange} style={{ flexGrow: 1}}>Filter parameter list based on worksheet selections</Checkbox>
            </div>
            <div className='option'>
                <Checkbox checked={this.state.autoUpdate} onChange={this.autoUpdateChange} style={{ flexGrow: 1}}>Automatically reset values on dashboard load.</Checkbox>
            </div>
            <div className='option'>
                <Checkbox checked={this.state.updateOnChange} onChange={this.updateOnChangeChange} style={{ flexGrow: 1}}>Update list of values on parameter change.</Checkbox>
            </div>
            <div className='option'>
                Sorting: 
                <Radio checked={this.state.sort === 'asc'} onChange={this.sortChange} name='sorting' value='asc' style={{ margin: '0px 12px'}}>Ascending (A-Z)</Radio>
                <Radio checked={this.state.sort === 'desc'} onChange={this.sortChange} name='sorting' value='desc' style={{ margin: '0px 12px'}}>Descending (Z-A)</Radio>
            </div>
            <div className='option'>
                <Checkbox disabled={!this.state.field_config} checked={this.state.showDisplayValues} onChange={this.displayChange} style={{ marginRight: '10px' }}>Use different field for display values</Checkbox>
                <div style={{display: 'flex', width: '150px'}}>
                <DropdownSelect className='dropdown-select' disabled={!this.state.showDisplayValues || !this.state.field_config} kind='line' onChange={this.displayFieldChange} value={this.state.displayField} style={{ flexGrow: 1}}>
                    {this.state.field_list.map(option => <option key={option}>{option}</option>)}
                </DropdownSelect></div>
            </div>
            <div className='option'>
                <p><i>For use with string parameters only:</i></p>
            </div>
            <div className='option'>
                <Checkbox disabled={this.state.dataType !== 'string'} checked={this.state.useFormattedValues && this.state.dataType === 'string'} onChange={this.aliasChange} style={{ flexGrow: 1}}>Use aliased values</Checkbox>
            </div>                            
            <div className='option'>
                <Checkbox disabled={this.state.dataType !== 'string'} checked={this.state.includeAllValue  && this.state.dataType === 'string'} onChange={this.allChange} style={{ flexGrow: 1}}>Include "(All)" in parameter list <br/> <i>Note: This is only a placeholder for calculations.</i></Checkbox>
            </div>
            <div className='option'>
                <Checkbox disabled={this.state.dataType !== 'string'} checked={this.state.multiselect  && this.state.dataType === 'string'} onChange={this.multiselectChange} style={{ marginRight: '10px'}}>Allow for multiple selections.</Checkbox>
                <span children='Delimiter:' style={{ marginRight: '5px' }} />
                <TextField kind='line' onChange={this.delimiterChange} className='delimiter-text-field' value={this.state.delimiter} disabled={!this.state.multiselect || this.state.dataType !== 'string'} maxLength={1} style={{ width: 20 }} />
            </div>
            <div className='option'>
                <Checkbox disabled={!this.state.multiselect} checked={this.state.applyButton && this.state.multiselect} onChange={this.applyChange} style={{ flexGrow: 1}}>Show apply button.</Checkbox>
            </div>
        </div>;

        const formatting = <div className='content'>
            <div className='format'>
                <div className='formattext'>Background Color</div>
                <div>
                    <input type='color' value={this.state.bg} onChange={this.bgChange} style={{ backgroundColor: this.state.bg }} />
                </div>
            </div>
            <div className='format'>
                <div className='formattext'>Text Color</div>
                <div>
                    <input type='color' value={this.state.txt} onChange={this.txtChange} style={{ backgroundColor: this.state.txt }} />
                </div>
            </div>
        </div>;

        const panels = [configuration, options, formatting];
        const tabs = [ { content: 'Configure' }, { content: 'Options' }, { content: 'Formatting' } ];
        // const initialState = { selectedTabIndex: 0 };

        return (
            <React.Fragment>
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
                                        <li>Select a Tableau parameter to manipulate. This parameter must already exists and must allow "all" values.</li>
                                        <li>Select a worksheet with the data you want to use in your parameter.</li>
                                        <li>Select a field to use to populate the parameter. Field data type must match the data type of parameter.</li>
                                    </ol>
                                    <br/>
                                    <p>Note: Mac Desktop 2018.3 and lower, please use arrow keys and 'Enter' to select options</p>
                                </span>
                            </div>
                        </div>
                        <div className='tabs'>
                            <Tabs activation='automatic' alignment='left' onTabChange={this.tabChange} selectedTabIndex={this.state.selectedTabIndex} tabs={tabs}>
                                {panels[this.state.selectedTabIndex]}
                            </Tabs>
                        </div>
                    </div>

                    <div className='footer'>
                        <div className='btncluster'>
                            <Button onClick={this.clearSettings} style={{ marginRight: 'auto' }}>Clear Settings</Button>
                            <Button kind='filledGreen' onClick={this.submit} disabled={!this.state.configured || !this.state.ws_config} style={{ marginLeft: '12px' }}>OK</Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Configure;