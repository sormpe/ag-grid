import {
    ChartCreated,
    ColDef,
    CreateRangeChartParams,
    FirstDataRenderedEvent,
    Grid,
    GridOptions
} from '@ag-grid-community/core';
import { getData } from "./data";

const columnDefs: ColDef[] = [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
]

const gridOptions: GridOptions = {
    defaultColDef: {
        flex: 1,
    },
    columnDefs: columnDefs,
    rowData: getData(),
    onFirstDataRendered: onFirstDataRendered,
    popupParent: document.body,
    enableRangeSelection: true,
    enableCharts: true,
    chartToolPanelsDef: {
        defaultToolPanel: 'settings',
        settingsPanel: {
            chartGroupsDef: {
                pieGroup: [
                    'pie',
                    'doughnut'
                ],
                columnGroup: [
                    'stackedColumn',
                    'column',
                    'normalizedColumn'
                ],
                barGroup: [
                    'bar'
                ],
            }
        },
    },
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
    const createRangeChartParams: CreateRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 4,
            columns: ['country', 'gold', 'silver', 'bronze'],
        },
        chartType: 'groupedColumn',
        chartThemeOverrides: {
            column: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }

    params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    let gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    new Grid(gridDiv, gridOptions)
})
