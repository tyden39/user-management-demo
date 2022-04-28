import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import React from 'react';
import * as XLSX from 'xlsx';

export const ExportCSV = ({getData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const convertNotesToWorkSheet = (users) => {
        let noteWS = users.map(x => [x.username, x.password, x.email, 
                                        {t: "s",v: `asdf\r\nasdf`}
                                    ])
        console.log(noteWS[0]);
        noteWS.forEach(x => x.s = {alignment: {wrapText: true}})
        // if (notes.length) 
        //     return notes.reduce((prev, curr) => prev + ',' + curr)
        // else return ''
        return noteWS
    }

    const exportToCSV = async (getData, fileName) => {
        const convertData = convertNotesToWorkSheet(getData().data)
        const ws = XLSX.utils.aoa_to_sheet(convertData);

        // const fetchData = getData()
        // const csvData = fetchData.data
        // console.log(csvData)
        // const ws = XLSX.utils.json_to_sheet(csvData);
        // ws["D1"].s = {alignment: {wrapText: true}}
        // const wsReCal = XLSX.utils.sheet_set_array_formula(ws, "D1:D3", '"asdf"&CHAR(10)&"asdf"');

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(getData, fileName)}>Export</Button>
    )
}
