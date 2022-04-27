import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import React from 'react';
import * as XLSX from 'xlsx';

export const ExportCSV = ({getData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (getData, fileName) => {
        const csvData = getData()
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(getData, fileName)}>Export</Button>
    )
}