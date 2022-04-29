// import { Button } from 'antd';
// import * as FileSaver from 'file-saver';
// import React from 'react';
// import * as XLSX from 'xlsx';

// export const ExportCSV = ({getData, fileName}) => {

//     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     const fileExtension = '.xlsx';

//     const convertNotesToWorkSheet = (users) => {
//         let noteWS = users.map(x => [x.username, x.password, x.email, 
//                                         {t: "s",v: `asdf\r\nasdf`}
//                                     ])
//         console.log(noteWS[0]);
//         noteWS.forEach(x => x.s = {alignment: {wrapText: true}})
//         // if (notes.length) 
//         //     return notes.reduce((prev, curr) => prev + ',' + curr)
//         // else return ''
//         return noteWS
//     }

//     const exportToCSV = async (getData, fileName) => {
//         const convertData = convertNotesToWorkSheet(getData().data)
//         const ws = XLSX.utils.aoa_to_sheet(convertData);

//         // const fetchData = getData()
//         // const csvData = fetchData.data
//         // console.log(csvData)
//         // const ws = XLSX.utils.json_to_sheet(csvData);
//         // ws["D1"].s = {alignment: {wrapText: true}}
//         // const wsReCal = XLSX.utils.sheet_set_array_formula(ws, "D1:D3", '"asdf"&CHAR(10)&"asdf"');

//         const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
//         const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], {type: fileType});
        
//         FileSaver.saveAs(data, fileName + fileExtension);
//     }

    

//     return (
//         <Button variant="warning" onClick={(e) => exportToCSV(getData, fileName)}>Export</Button>
//     )
// }


import { Button } from 'antd';
import * as Excel from "exceljs";
import * as FileSaver from 'file-saver';

export const ExportCSV = ({getData, fileName}) => {

    const convertNotesToWorkSheet = (users) => {
        let noteWS = users.map(x => [x.username, x.password, x.email, 
                                        (x.notes.length ? x.notes.reduce((p,c,i) => `${p}\r\n${c}`) : '')
                                    ])
        console.log(noteWS[0]);
        return noteWS

        // if (notes.length) 
        //     return notes.reduce((prev, curr) => prev + ',' + curr)
        // else return ''
    }

    const exportToCSV = async (getData, fileName) => {
        const data = getData()
        const users = data.data

        // Create workbook & add worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('ExampleSheet');

        // add column headers
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 10 },
            { header: 'Password', key: 'password', width: 10 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Notes', key: 'notes', width: 30 }
        ];

        worksheet.getColumn('notes').alignment = { wrapText: true }

        // Add row using key mapping to columns
        // worksheet.addRow({ username: {formula: 'A3&CHAR(10)&A4'}, password: "Author 1", email: 'asdf@sdf.com', notes: 'asdf\r\nafdsf' });

        // Add rows as Array values
        // worksheet.addRow(["BCD", "Author Name 3"]);

        // Add rows using both the above of rows
        // const rows = [
        //     ["FGH", "Author Name 4"],
        //     { package_name: "PQR", author_name: "Author 5" }
        // ];

        worksheet.getColumn(5).values = [1,2,3]
        const rows = convertNotesToWorkSheet(users)
        worksheet.addRows(rows);

        workbook.xlsx.writeBuffer()
        .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
        .catch(err => console.log('Error writing excel export:', err))
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(getData, fileName)}>Export</Button>
    )
}