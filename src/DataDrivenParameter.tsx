import * as React from 'react';
import './style.css';

declare global {
    interface Window { tableau: any; }
}

let dashboard: any;
let parameter: any;

interface State {
    bg: string,
    configured: boolean,
    currentVal: string,
    disabled: boolean,
    list: any,
}

class DataDrivenParameter extends React.Component<any, State> {
    public readonly state: State = {
        bg: '#ffffff',
        configured: false,
        currentVal: '1',
        disabled: true,
        list: [{value: '1', displayValue: 'Parameter needs configuration'}],
    };

    constructor(props: any) {
        super(props);
        this.populateParam = this.populateParam.bind(this);
        this.getParamData = this.getParamData.bind(this);
        this.updateParam = this.updateParam.bind(this);
        this.findParameter = this.findParameter.bind(this);
        this.configure = this.configure.bind(this);
    }

    // Pops open the configure page
    public configure() {
        const popupUrl = (window.location.origin.includes('localhost')) ? `${window.location.origin}/#/config` : `${window.location.origin}/extension-data-driven-parameters/#/config`;
        const payload = '';
        // let h = Math.floor(500 / window.devicePixelRatio);
        // let w = Math.floor(450 / window.devicePixelRatio);
        window.tableau.extensions.ui.displayDialogAsync(popupUrl, payload, { height: 420, width: 420 }).then((closePayload: string) => {
            if (closePayload !== '') {
                const settings  = window.tableau.extensions.settings.getAll();
                document.body.style.backgroundColor = settings.bg;
                document.body.style.color = settings.txt;
                const rgb = this.hexToRgb(settings.bg);
                if (rgb) {
                    this.setState({
                        bg:  `rgb(${Math.min(Math.floor(rgb.r / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.g / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.b / 2) + 127, 255)})`,
                    });
                }
                this.findParameter();
            } else {
                this.setState({
                    currentVal: '1',
                    disabled: true,
                    list: [{value: '1', displayValue: 'Parameter needs configuration'}],
                });
            }
        }).catch((error: any) => {
            if (window.tableau.extensions.settings.get('configured') !== 'true') {
                this.setState({
                    currentVal: '1',
                    disabled: true,
                    list: [{value: '1', displayValue: 'Parameter needs configuration'}],
                });
            }
            switch (error.errorCode) {
                case window.tableau.ErrorCodes.DialogClosedByUser:
                    // tslint:disable-next-line:no-console
                    console.log('Dialog was closed by user.');
                    break;
                default:
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
            }
        });
    }

    // Locates the parameter to update
    public findParameter() {
        window.tableau.extensions.dashboardContent.dashboard.getParametersAsync().then((params: any) => {
            parameter = params.find((param: any) => param.name === window.tableau.extensions.settings.get('selParam'));
            if (!parameter || parameter.allowableValues.type !== 'all') {
                this.setState({
                    currentVal: '1',
                    disabled: true,
                    list: [{value: '1', displayValue: 'Parameter needs configuration'}],
                });
            } else {
                this.getParamData();
                this.wsEvent();
            }
        });
    }

    // Gets the values from the selected field and populates the Data-Driven Parameter
    public getParamData() {
        const settings  = window.tableau.extensions.settings.getAll();
        const worksheet = dashboard.worksheets.find((ws: any) => ws.name === window.tableau.extensions.settings.get('selWorksheet'));
            if (!worksheet) {
                this.setState({
                    currentVal: '1',
                    disabled: true,
                    list: [{value: '1', displayValue: 'Parameter needs configuration'}],
                });
            } else {
                worksheet.getSummaryDataAsync({ignoreSelection: settings.ignoreSelection === 'true'}).then((dataTable: any) => {
                    this.populateParam(dataTable);
                });
            }
    }

    // Pulls domain of selected field
    public populateParam(dataTable: any) {
        const dataField = window.tableau.extensions.settings.get('selField');
        const field = dataTable.columns.find((column: any) => column.fieldName === dataField);
        if (!field) {
            this.setState({
                currentVal: '1',
                disabled: true,
                list: [{value: '1', displayValue: 'Parameter needs configuration'}],
            });
        } else {
            const fieldIndex = field.index;
            let list = [];
            const options = [];
            for (const row of dataTable.data) {
                list.push(row[fieldIndex].value);
            }
            list = list.filter((item, index, inputArray) => {
                return inputArray.indexOf(item) === index;
            });
            list.sort();
            for (const l of list) {
                options.push({value: l, displayValue: l});
            }
            let value;
            if (options.find(o => o.value === parameter.currentValue.value)) {
                value = parameter.currentValue.value;
            } else {
                value = options[0].value;
            }
            this.setState({
                currentVal: value,
                disabled: false,
                list: options,
            });
            parameter.changeValueAsync(value);
        }
    }

    // Adds event listener to worksheet
    public wsEvent() {
        const worksheet = dashboard.worksheets.find((ws: any) => ws.name === window.tableau.extensions.settings.get('selWorksheet'));
        if (!worksheet) {
            this.setState({
                currentVal: '1',
                disabled: true,
                list: [{value: '1', displayValue: 'Parameter needs configuration'}],
            });
        } else {
            worksheet.addEventListener(window.tableau.TableauEventType.FilterChanged, this.getParamData);
            worksheet.addEventListener(window.tableau.TableauEventType.MarkSelectionChanged, this.getParamData);
        }
    }

    // Updates the parameter based on selection in Data-Driven Parameter
    public updateParam(e: any) {
        const newValue = e.target.value;
        if (!parameter) {
            this.setState({
                currentVal: '1',
                disabled: true,
                list: [{value: '1', displayValue: 'Parameter needs configuration'}],
            });
        } else {
            parameter.changeValueAsync(newValue);
            this.setState({currentVal: newValue});
        }
        // Include to refresh domain on every selection:
        this.getParamData();
    }

    public hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            b: parseInt(result[3], 16),
            g: parseInt(result[2], 16),
            r: parseInt(result[1], 16),
        } : null;
    }

    // Once we have mounted, we call to initialize
    public componentWillMount() {
        const initialziePromise = window.tableau.extensions.initializeAsync({ configure: this.configure });
        if (initialziePromise) {
            initialziePromise.then(() => {
                dashboard = window.tableau.extensions.dashboardContent.dashboard;
                const configured = (window.tableau.extensions.settings.get('configured') === 'true');
                if (!configured) {
                    this.configure();
                } else {
                    this.setState({
                        configured: true,
                    });
                    this.findParameter();
                    const settings  = window.tableau.extensions.settings.getAll();
                    document.body.style.backgroundColor = settings.bg;
                    document.body.style.color = settings.txt;
                    const rgb = this.hexToRgb(settings.bg);
                    if (rgb) {
                        this.setState({
                            bg:  `rgb(${Math.min(Math.floor(rgb.r / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.g / 2) + 127, 255)}, ${Math.min(Math.floor(rgb.b / 2) + 127, 255)})`,
                        });
                    }
                }
          });
        }
    }

    public render() {
      return (
        <div style={{padding: 0, width: '100%', backgroundColor: this.state.bg}}>
            <select id='data-driven-parameter' className='parameter' value={this.state.currentVal} onChange={this.updateParam} disabled={this.state.disabled} style={{backgroundColor: this.state.bg}}>
                {this.state.list.map( (option: any) => ( <option key={option.value} value={option.value}>{option.displayValue}</option> ) )}
            </select>
        </div>
      );
    }
}

export default DataDrivenParameter;