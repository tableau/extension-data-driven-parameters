import * as React from 'react';
import './style.css';

/* tslint:disable:no-console */
import { DropdownSelect } from '@tableau/tableau-ui';

declare global {
    interface Window { tableau: any; }
}

let dashboard: any;
let parameter: any;

interface State {
    bg: string,
    configured: boolean,
    currentVal: any[],
    disabled: boolean,
    displayedList: any,
    firstInit: boolean,
    list: any,
    multiselect: boolean,
}

const NeedsConfiguring: string = 'Parameter needs configuration';
const DateFormatList: any[] = [
    {},
    {year: '2-digit', month: 'numeric', day: 'numeric'},
    {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'},
    {year: 'numeric', month: 'long', day: 'numeric'},
    {year: 'numeric', month: 'short', day: 'numeric'},
    {year: 'numeric', month: 'long' }
];

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
        bg: '#ffffff',
        configured: false,
        currentVal: [NeedsConfiguring],
        disabled: true,
        displayedList: [NeedsConfiguring],
        firstInit: true,
        list: [NeedsConfiguring],
        multiselect: false,
    };

    // Pops open the configure page
    public configure = (): void => {
        const popupUrl = (window.location.origin.includes('localhost')) ? `${window.location.origin}/#/config` : `${window.location.origin}/extension-data-driven-parameters/#/config`;
        const payload = '';
        window.tableau.extensions.ui.displayDialogAsync(popupUrl, payload, { height: 700, width: 450 }).then((closePayload: string) => {
            const settings = window.tableau.extensions.settings.getAll();
            if (closePayload !== '') {
                document.body.style.backgroundColor = settings.bg;
                document.body.style.color = settings.txt;
                this.setState({ 
                    bg: (settings.bg ? fakeWhiteOverlay(settings.bg) : '#ffffff'),
                    multiselect: settings.multiselect === 'true',
                });
                this.findParameter();
            } else {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    displayedList: [NeedsConfiguring],
                    list: [NeedsConfiguring],
                });
            }
        }).catch((error: any) => {
            if (window.tableau.extensions.settings.get('configured') !== 'true') {
                this.setState({
                    currentVal: [NeedsConfiguring],
                    disabled: true,
                    displayedList: [NeedsConfiguring],
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
                    displayedList: [NeedsConfiguring],
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
        const settings = window.tableau.extensions.settings.getAll();
        const worksheet = dashboard.worksheets.find((ws: any) => ws.name === settings.selWorksheet);
        if (!worksheet) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                displayedList: [NeedsConfiguring],
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
        const settings = window.tableau.extensions.settings.getAll();
        const field = dataTable.columns.find((column: any) => column.fieldName === settings.selField);
        const lang = window.tableau.extensions.environment.language;

        if (!field) {
            this.setState({
                currentVal: [NeedsConfiguring],
                disabled: true,
                displayedList: [NeedsConfiguring],
                list: [NeedsConfiguring],
            });
        } else {
            let list = [];
            let displayedList = [];
            // Populate list with values from data source
            for (const row of dataTable.data) {
                list.push((settings.useFormattedValues === 'true' ? row[field.index].formattedValue : row[field.index].value));
            }

            // Remove duplicates
            list = list.filter((item, index, inputArray) => {
                return inputArray.indexOf(item) === index;
            });
            
            if(settings.dataType && (settings.dataType === 'int' || settings.dataType === 'float')) {
                list = list.map(Number);
                // Sort according to settings (numerical)
                if (settings.sort && settings.sort === 'desc') {
                    list.sort((a, b) => b - a);
                } else {
                    list.sort((a, b) => a - b);
                }
            } else {
                // Sort according to settings
                if (settings.sort && settings.sort === 'desc') {
                    list.sort();
                    list.reverse();
                } else {
                    list.sort();
                }
            }

            // Add '(All)' according to settings
            if (settings.includeAllValue === 'true') {
                list.unshift('(All)');
            }

            let currentVal;
            // Determine wether to use current param value or first value of list based on settings and if current Tableau parameter value is in list
            if ((settings.autoUpdate === 'false' || (settings.autoUpdate === 'true' && !this.state.firstInit)) && list.find(item => item.toString() === parameter.currentValue.value.toString())) {
                currentVal = parameter.currentValue.value;
            } else {
                currentVal = (settings.includeAllValue === 'true' ? list[1] : list[0]);
            }

            if (settings.dataType === 'date') {
                displayedList = list.map(value => new Date(value).toLocaleDateString(lang, DateFormatList[parseInt(settings.dateFormatIndex, 10)]));               
            } else {
                displayedList = list;
            }

            this.setState({
                currentVal: [currentVal],
                disabled: false,
                displayedList,
                firstInit: false,
                list,
            });
            
            parameter.changeValueAsync(currentVal);
        }
    }

    // Adds event listener to worksheet
    public setupWsEvent() {
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
        const values = [];
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
                displayedList: [NeedsConfiguring],
                list: [NeedsConfiguring],
            });
        } else {
            parameter.changeValueAsync(newValue);
            this.setState({ currentVal: values }, () => {console.log(this.state.currentVal)});
        }
        // Include to refresh domain on every selection:
        if (!this.state.multiselect){
            this.getParamData();
        }
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        window.tableau.extensions.initializeAsync({ configure: this.configure }).then(() => {
            dashboard = window.tableau.extensions.dashboardContent.dashboard;
            const settings = window.tableau.extensions.settings.getAll();
            if (settings.configured === 'true') {
                document.body.style.backgroundColor = settings.bg;
                document.body.style.color = settings.txt;
                this.setState({
                    bg: (settings.bg ? fakeWhiteOverlay(settings.bg) : '#ffffff'),
                    configured: true,
                    multiselect: settings.multiselect === 'true',
                });
                this.findParameter();
            } else {
                this.configure();
            }
        });
    }

    public render() {
        return (
            <React.Fragment>
                <div style={{display: (this.state.multiselect ? 'flex' : 'none')}}>
                    <select multiple={true} id='multi-select-parameter' className='parameter' value={this.state.currentVal} onChange={this.updateParam} disabled={this.state.disabled} style={{backgroundColor: this.state.bg, color: 'inherit' }}>
                    {this.state.list.map( (option: any, index: number) => ( <option key={option} value={option}>{this.state.displayedList[index]}</option> ) )}
                </select>
                </div>
                <div style={{display: (!this.state.multiselect ? 'flex' : 'none')}}>
                    <DropdownSelect id='single-select-parameter' className='singleParameter' disabled={this.state.disabled || this.state.multiselect} kind='outline' onChange={this.updateParam} value={this.state.currentVal[0]} style={{ backgroundColor: this.state.bg, color: 'inherit' }}>
                        {this.state.list.map((option: string, index: number) => <option key={option} value={option}>{this.state.displayedList[index]}</option>)}
                    </DropdownSelect>
                </div>
            </React.Fragment>
        );
    }
}

export default DataDrivenParameter;