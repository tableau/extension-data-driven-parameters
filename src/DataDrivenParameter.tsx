import * as React from 'react';
import './style.css';

/* tslint:disable:no-console */
import { Button, DropdownSelect } from '@tableau/tableau-ui';

declare global {
    interface Window { tableau: any; }
}

let parameter: any;

interface State {
    applyButton: boolean,
    bg: string,
    configured: boolean,
    currentVal: any[],
    disabled: boolean,
    firstInit: boolean,
    list: any[],
    multiselect: boolean,
}

const NeedsConfiguring: any = {value: 'Parameter needs configuration', displayValue: 'Parameter needs configuration'};
const Loading: any = {value: 'Loading...', displayValue: 'Loading...'};

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
        applyButton: false,
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
        const popupUrl = `${window.location.origin}${process.env.PUBLIC_URL}/#/config`;
        const payload = '';
        window.tableau.extensions.ui.displayDialogAsync(popupUrl, payload, { height: 525, width: 450 }).then((closePayload: string) => {
            const settings = window.tableau.extensions.settings.getAll();
            if (closePayload !== '') {
                document.body.style.backgroundColor = settings.bg;
                document.body.style.color = settings.txt;
                this.setState({ 
                    applyButton: settings.applyButton === 'true' || false,
                    bg: (settings.bg ? fakeWhiteOverlay(settings.bg) : '#ffffff'),
                    multiselect: settings.multiselect === 'true' || false,
                });
                this.findParameter();
            } else {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            }
        }).catch((error: any) => {
            if (window.tableau.extensions.settings.get('configured') !== 'true') {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            }
            switch (error.errorCode) {
                case window.tableau.ErrorCodes.DialogClosedByUser:
                    console.log('Dialog was closed by user.');
                    break;
                default:
                    console.error(error.message);
            }
        });
    }

    // Locates the parameter to update
    public findParameter() {
        const settings = window.tableau.extensions.settings.getAll();
        window.tableau.extensions.dashboardContent.dashboard.findParameterAsync(settings.selParam).then((param: any) => {
            parameter = param;
            if (!parameter || parameter.allowableValues.type !== 'all') {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    list: [NeedsConfiguring],
                });
            } else {
                this.getParamData();
                this.setupWsEvent();
            }
        });
    }

    // Gets the values from the selected field and populates the Data-Driven Parameter
    public getParamData = (): void => {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        const settings = window.tableau.extensions.settings.getAll();
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
        this.setState({
            currentVal: [Loading],
            disabled: true,
            list: [Loading],
        });
        const settings = window.tableau.extensions.settings.getAll();
        const field = dataTable.columns.find((column: any) => column.fieldName === settings.selField);
        const displayField = dataTable.columns.find((column: any) => column.fieldName === settings.displayField);
        if (!field) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                list: [NeedsConfiguring],
            });
        } else {
            let list: any[]  = [];
            // Populate list with values from data source
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
            
            if(settings.dataType && (settings.dataType === 'int' || settings.dataType === 'float')) {
                // Convert to numbers for correct sort
                list = list.map((item) => ( {value: Number(item.value), displayValue: item.displayValue}))
                // Sort according to settings (numerical)
                if (settings.sort && settings.sort === 'desc') {
                    list.sort((a, b) => b.value - a.value);
                } else {
                    list.sort((a, b) => a.value - b.value);
                }
                if (settings.dataType === 'float') {
                    list = list.map((item) => ( {value: item.value.toLocaleString(window.tableau.extensions.environment.locale), displayValue: item.displayValue}));
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
                list.unshift({value: '(All)', displayValue: '(All)'});
            }

            let currentVal: any;
            // Determine wether to use current param value or first value of list based on settings
            if ((settings.autoUpdate === 'false' || (settings.autoUpdate === 'true' && !this.state.firstInit))  ) {
                if (settings.multiselect === 'true') {
                    // Use current param values if found in list, otherwise pick first of list.
                    const tablist = [];
                    for (const value of parameter.currentValue.value.split(settings.delimiter)){
                        if (list.find(v => v.value === value)) {
                            tablist.push(value)
                        }
                    }
                    if (tablist.length > 0){
                        currentVal = tablist;
                    } else {
                        currentVal = [(settings.includeAllValue === 'true' ? list[1].value : list[0].value)]
                    }
                } else {
                    // Use current param value if found in list, otherwise pick first of list.
                    if (list.find(v => v.value === parameter.currentValue.value)) {
                        currentVal = [parameter.currentValue.value];
                    } else {
                        currentVal = [(settings.includeAllValue === 'true' ? list[1].value : list[0].value)]
                    }
                }
            } else {
                currentVal = [(settings.includeAllValue === 'true' ? list[1].value : list[0].value)];
            }
            
            parameter.changeValueAsync(settings.multiselect ? currentVal.join(settings.delimiter) : currentVal.toString());

            this.setState({
                currentVal,
                disabled: false,
                firstInit: false,
                list,
            });
        }
    }

    // Adds event listener to worksheet
    public setupWsEvent() {
        const dashboard = window.tableau.extensions.dashboardContent.dashboard;
        const settings = window.tableau.extensions.settings.getAll();
        const worksheet = dashboard.worksheets.find((ws: any) => ws.name === settings.selWorksheet);
        if (!worksheet) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                list: [NeedsConfiguring],
            });
        } else {
            worksheet.addEventListener(window.tableau.TableauEventType.FilterChanged, this.getParamData);
            worksheet.addEventListener(window.tableau.TableauEventType.MarkSelectionChanged, this.getParamData);
        }
    }

    // Updates the parameter based on selection in Data-Driven Parameter
    public updateParam = (e: any) => {
        const settings = window.tableau.extensions.settings.getAll();
        const values: any = [];
        let newValue;
        for (const opt of e.target.options) {
            if (opt.selected) {
            values.push(opt.value);
            }
        }
        newValue = values.join(settings.delimiter);

        if (!parameter) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                list: [NeedsConfiguring],
            });
        } else {
            this.setState({ currentVal: values }, () => {console.log(this.state.currentVal)});
            if (!settings.applyButton || settings.applyButton === 'false') {
                parameter.changeValueAsync(newValue);
            }
        }

        // Refresh domain on every selection. Keeps original functionality for those with older settings.
        if (!settings.updateOnChange || settings.updateOnChange === 'true') {
            if (!this.state.multiselect){
                this.getParamData();
            }
        }
    }

    public apply = (): void => {
        const settings = window.tableau.extensions.settings.getAll();
        parameter.changeValueAsync(this.state.currentVal.join(settings.delimiter))
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        window.tableau.extensions.initializeAsync({ configure: this.configure }).then(() => {
            const settings = window.tableau.extensions.settings.getAll();
            if (settings.configured === 'true') {
                document.body.style.backgroundColor = settings.bg;
                document.body.style.color = settings.txt;
                this.setState({
                    applyButton: settings.applyButton === 'true' || false,
                    bg: (settings.bg ? fakeWhiteOverlay(settings.bg) : '#ffffff'),
                    configured: true,
                    multiselect: settings.multiselect === 'true' || false,
                });
                this.findParameter();
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
        return (
            <React.Fragment>
                <div style={{display: (this.state.multiselect ? 'flex' : 'none'), flexDirection: 'column'}}>
                    <select multiple={true} id='multi-select-parameter' className='parameter' value={this.state.currentVal} onChange={this.updateParam} disabled={this.state.disabled} style={{backgroundColor: this.state.bg, color: 'inherit' }}>
                        {this.state.list.map( (option: any) => ( <option key={option.value || option.value} value={option.value}>{option.displayValue}</option> ) )}
                    </select>
                    <Button kind='filled' onClick={this.apply} style={{ display: (this.state.applyButton ? 'block' : 'none'), marginTop: '6px', width: '60px', height: '20px', marginLeft: 'auto' }}>Apply</Button>
                </div>
                <div style={{display: (!this.state.multiselect ? 'flex' : 'none')}}>
                    <DropdownSelect id='single-select-parameter' className='singleParameter' disabled={this.state.disabled || this.state.multiselect} kind='outline' onChange={this.updateParam} value={this.state.currentVal[0]} style={{ backgroundColor: this.state.bg, color: 'inherit' }}>
                        {this.state.list.map((option: any) => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
                    </DropdownSelect>
                </div>
            </React.Fragment>
        );
    }
}

export default DataDrivenParameter;