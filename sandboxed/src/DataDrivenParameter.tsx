import * as React from 'react';
import './style.css';
import { Button, DropdownSelect } from '@tableau/tableau-ui';
const tableau = window.tableau;

let unregister = [() => { }, () => { }, () => { }, () => { }];

interface State {
    allLabel: string,
    applyButton: boolean,
    applyButtonLabel: string,
    bg: string,
    configured: boolean,
    currentVal: any[],
    disabled: boolean,
    firstInit: boolean,
    list: any[],
    multiselect: boolean,
}

const NeedsConfiguring: any = { value: 'Parameter needs configuration', displayValue: 'Parameter needs configuration' };
const Loading: any = { value: 'Loading...', displayValue: 'Loading...' };

// Switches base URL based on where extension is being hosted
const baseURL: string = window.location.origin.includes('localhost:3000') ? window.location.origin : '.';

function fakeWhiteOverlay(hex: string) {
    const rgb = hexToRgb(hex);
    if (rgb) {
        return `rgb(${Math.min(Math.floor(rgb.r / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.g / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.b / 2) + 127, 255)})`;
    } else {
        return '#ffffff';
    }
}

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16),
    } : null;
}

class DataDrivenParameter extends React.Component<any, State> {
    public readonly state: State = {
        allLabel: 'Apply',
        applyButton: false,
        applyButtonLabel: '(All)',
        bg: '#ffffff',
        configured: false,
        currentVal: [Loading],
        disabled: true,
        firstInit: true,
        list: [Loading],
        multiselect: false,
    };

    // Pops open the configure page
    public configure = (): void => {
        const popupUrl = `${baseURL}/config.html`;
        const payload = '';
        tableau.extensions.ui.displayDialogAsync(popupUrl, payload, { height: 610, width: 450 }).then((closePayload: string) => {
            this.setup();
        }).catch((error: any) => {
            if (tableau.extensions.settings.get('configured') !== 'true') {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            }
            switch (error.errorCode) {
                case tableau.ErrorCodes.DialogClosedByUser:
                    console.log('Dialog was closed by user.');
                    break;
                default:
                    console.error(error.message);
            }
        });
    }

    // Locates the parameter to update
    public findParameter() {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        dashboard.findParameterAsync(settings.selParam).then((parameter: any) => {
            if (!parameter || parameter.allowableValues.type !== 'all') {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            } else {
                this.getParamData();
                this.resetListeners();
            }
        });
    }

    // Gets the values from the selected field
    public getParamData = (): void => {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        const worksheet = dashboard.worksheets.find((ws: any) => ws.name === settings.selWorksheet);
        if (!worksheet) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                list: [NeedsConfiguring],
            });
        } else {
            worksheet.getSummaryDataAsync({ ignoreSelection: settings.ignoreSelection === 'true' }).then((dataTable: any) => {
                this.populateParam(dataTable);
            });
        }
    }

    // Pulls domain of selected field
    public populateParam(dataTable: any) {
        const settings = tableau.extensions.settings.getAll();
        const field = dataTable.columns.find((column: any) => column.fieldName === settings.selField);
        this.setState({
            currentVal: [Loading],
            disabled: true,
            list: [Loading],
        });

        if (!field) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                list: [NeedsConfiguring],
            });
        } else {
            this.createList(field, dataTable);
        }
    }

    // Populate list with values from data source
    public createList(field: any, dataTable: any) {
        const settings = tableau.extensions.settings.getAll();
        const displayField = dataTable.columns.find((column: any) => column.fieldName === settings.displayField);

        let list: any[] = [];
        for (const row of dataTable.data) {
            const value = settings.useFormattedValues === 'true' ? row[field.index].formattedValue : row[field.index].value;
            let displayValue = value;
            if (displayField && settings.showDisplayValues === 'true') {
                displayValue = row[displayField.index].formattedValue
            }
            list.push({
                displayValue,
                value,
            });
        }

        // Remove duplicates
        list = list.filter((item, index, array) => array.indexOf(array.find(i => i.value === item.value)) === index);

        if (settings.dataType && (settings.dataType === 'int' || settings.dataType === 'float')) {
            // Convert to numbers for correct sort
            list = list.map((item) => ({ value: Number(item.value), displayValue: item.displayValue }))
            // Sort according to settings (numerical)
            if (settings.sort && settings.sort === 'desc') {
                list.sort((a, b) => b.value - a.value);
            } else {
                list.sort((a, b) => a.value - b.value);
            }
            if (settings.dataType === 'float') {
                list = list.map((item) => ({ value: item.value.toLocaleString(tableau.extensions.environment.locale), displayValue: item.displayValue }));
            }
        } else {
            // Sort according to settings
            if (settings.sort && settings.sort === 'desc') {
                list.sort((a, b) => a.value < b.value ? 1 : -1);
            } else {
                list.sort((a, b) => a.value > b.value ? 1 : -1);
            }
        }

        // Add '(All)' according to settings
        if (settings.includeAllValue === 'true') {
            list.unshift({ value: this.state.allLabel, displayValue: this.state.allLabel });
        }

        this.setState({
            list,
        }, this.setCurrentValue);

    }

    // Determine whether to use current param value or first value of list based on settings
    public setCurrentValue = (): void => {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        const list = this.state.list;
        let currentVal: any[] = [];
        dashboard.findParameterAsync(settings.selParam).then((parameter: any) => {
            if ((this.state.firstInit && settings.autoUpdate === 'true')) {
                // Then push new values
                currentVal = [(settings.includeAllValue === 'true' ? list[1].value : list[0].value)];
            } else {
                // Then match parameter value
                if (settings.multiselect === 'true') {
                    const tablist = [];
                    for (const value of parameter.currentValue.value.split(settings.delimiter)) {
                        if (list.find((v: any) => v.value.toString() === value || v.value === value)) {
                            tablist.push(value);
                        }
                    }
                    currentVal = tablist;
                } else {
                    if (list.find((v: any) => v.value.toString() === parameter.currentValue.value || v.value === parameter.currentValue.value)) {
                        currentVal = [parameter.currentValue.value];
                    }
                }
                if (currentVal.length === 0) {
                    // If no match, use first value
                    currentVal = [(settings.includeAllValue === 'true' ? list[1].value : list[0].value)];
                }
            }

            parameter.changeValueAsync(settings.multiselect ? currentVal.join(settings.delimiter) : currentVal.toString()).then(console.log);

            this.setState({
                disabled: false,
                firstInit: false,
                currentVal
            });
        });
    }

    // Adds event listener to worksheet and parameter
    public async registerListeners() {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        const worksheet = dashboard.worksheets.find((ws: any) => ws.name === settings.selWorksheet);
        dashboard.findParameterAsync(settings.selParam).then((parameter: any) => {
            if (!worksheet || !parameter) {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            } else {
                if (!settings.updateOnSelectionFix || settings.updateOnSelectionFix === 'true') {
                    unregister[0] = worksheet.addEventListener(tableau.TableauEventType.FilterChanged, this.getParamData);
                    unregister[1] = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, this.getParamData);
                }
                if (settings.matchParam === 'true') {
                    unregister[2] = parameter.addEventListener(tableau.TableauEventType.ParameterChanged, this.matchListener);
                }
                if (settings.listenParam === 'true') {
                    dashboard.findParameterAsync(settings.listenParamName).then((updateParameter: any) => {
                        unregister[3] = updateParameter.addEventListener(tableau.TableauEventType.ParameterChanged, this.getParamData);
                    })
                }
            }
        });
    }

    public matchListener = (): void => {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        dashboard.findParameterAsync(settings.selParam).then((parameter: any) => {
            const currentVal = this.state.multiselect ? parameter.currentValue.value.split(settings.delimiter) : [parameter.currentValue.value];
            this.setState({
                currentVal,
            });
        });
    }

    public resetListeners() {
        for (let fn of unregister) {
            fn();
        }
        this.registerListeners();
    }

    // Updates the parameter based on selection in Data-Driven Parameter
    public updateParam = (e: any) => {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        const values: any = [];
        let newValue: any;
        for (const opt of e.target.options) {
            if (opt.selected) {
                values.push(opt.value);
            }
        }
        this.setState({ currentVal: values });
        newValue = values.join(settings.delimiter);
        dashboard.findParameterAsync(settings.selParam).then((parameter: any) => {
            if (!parameter) {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            } else {
                if (settings.applyButton === 'false') {
                    parameter.changeValueAsync(newValue).then(console.log);
                }
            }

            if (settings.updateOnChange === 'true') {
                // Don't update list if on multi-select, ends up being confusing.
                if (!this.state.multiselect) {
                    this.getParamData();
                }
            }
        });
    }

    public apply = (): void => {
        const settings = tableau.extensions.settings.getAll();
        const dashboard = tableau.extensions.dashboardContent.dashboard;
        dashboard.findParameterAsync(settings.selParam).then((parameter: any) => {
            parameter.changeValueAsync(this.state.currentVal.join(settings.delimiter)).then(console.log);
        });
    }

    public setup() {
        const settings = tableau.extensions.settings.getAll();
        document.body.style.backgroundColor = settings.bg;
        document.body.style.color = settings.txt;
        this.setState({
            allLabel: settings.allLabel || '(All)',
            applyButton: settings.applyButton === 'true' || false,
            applyButtonLabel: settings.applyButtonLabel || 'Apply',
            bg: (settings.bg ? fakeWhiteOverlay(settings.bg) : '#ffffff'),
            configured: true,
            multiselect: settings.multiselect === 'true' || false,
        });
        this.findParameter();
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        tableau.extensions.initializeAsync({ configure: this.configure }).then(() => {
            const settings = tableau.extensions.settings.getAll();
            if (settings.configured === 'true') {
                this.setup();
            } else {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
                this.configure();
            }
        });
    }

    public render() {
        const multi = <div style={{ flexDirection: 'column' }}>
            <select multiple={true} id='multi-select-parameter' className='parameter' value={this.state.currentVal} onChange={this.updateParam} disabled={this.state.disabled} style={{ backgroundColor: this.state.bg, color: 'inherit' }}>
                {this.state.list.map((option: any) => (<option key={option.value || option.value} value={option.value}>{option.displayValue}</option>))}
            </select>
            <Button kind='filled' onClick={this.apply} style={{ display: (this.state.applyButton ? 'block' : 'none'), marginTop: '6px', width: '60px', height: '20px', marginLeft: 'auto' }}>{this.state.applyButtonLabel}</Button>
        </div>

        const single = <div>
            <DropdownSelect id='single-select-parameter' className='singleParameter' disabled={this.state.disabled || this.state.multiselect} kind='outline' onChange={this.updateParam} value={this.state.currentVal[0]} style={{ backgroundColor: this.state.bg, color: 'inherit', fontSize: '11px' }}>
                {this.state.list.map((option: any) => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
            </DropdownSelect>
        </div>

        return (
            <>
                {this.state.multiselect ? multi : single}
            </>
        );
    }
}

export default DataDrivenParameter;
