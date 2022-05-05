import { Button } from 'antd';
import * as Excel from "exceljs";
import * as FileSaver from 'file-saver';

export const ExportCSV = ({getData, fileName}) => {

    const convertNotesToWorkSheet = (users) => {
        // console.log(typeof(users[0].updatedAt));

        let noteWS = users.map(x => {
            const updatedAt = new Date(x.updatedAt)
            const updatedDate = `${updatedAt.getDate() < 10 ? `0${updatedAt.getDate()}` : updatedAt.getDate()}`
            const updatedMonth = `${updatedAt.getMonth() < 10 ? `0${updatedAt.getMonth()}` : updatedAt.getMonth()}`
            const updatedMinutes = `${updatedAt.getMinutes() < 10 ? `0${updatedAt.getMinutes()}` : updatedAt.getMinutes()}`
            const updatedSeconds = `${updatedAt.getSeconds() < 10 ? `0${updatedAt.getSeconds()}` : updatedAt.getSeconds()}`

            return [
                x.username, 
                x.password, 
                x.email, 
                (x.notes.length ? x.notes.reduce((p,c,i) => `${p}\r\n${c}`) : ''),
                `${updatedDate}/${updatedMonth}/${updatedAt.getFullYear()}`,
                `${updatedMinutes} : ${updatedSeconds}`,
            ]
        })

        // console.log(noteWS[0]);
        
        return noteWS
    }

    const exportToCSV = async (getData, fileName) => {
        const data = getData()
        const users = data.data

        // Create workbook & add worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        // add column headers
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 10 },
            { header: 'Password', key: 'password', width: 10 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Notes', key: 'notes', width: 30 },
            { key: 'updatedDate', width: 12 },
            { key: 'updatedTime', width: 6 },
        ];

        worksheet.mergeCells('A1:A2')
        worksheet.mergeCells('B1:B2')
        worksheet.mergeCells('C1:C2')
        worksheet.mergeCells('D1:D2')
        worksheet.mergeCells('E1:F1')

        worksheet.getColumn('notes').alignment = { wrapText: true }

        worksheet.getCell('E1').value = 'Updated At';
        worksheet.getCell('E2').value = 'Date';
        worksheet.getCell('F2').value = 'Time';

        worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('C2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('D2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('E2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('F2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getRows(1, 2).forEach(row => {
            row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                // console.log('Cell ' + colNumber + ' = ' + cell.value);
                cell.fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{argb:'d3d3d3'}
                };
            });
        });
        
        // Commit a completed row to stream
        // row.commit();

        // ... merged cells are linked
        // worksheet.getCell('A4').value = 'Hello, World!';

        // Add row using key mapping to columns
        // worksheet.addRow({ username: {formula: 'A3&CHAR(10)&A4'}, password: "Author 1", email: 'asdf@sdf.com', notes: 'asdf\r\nafdsf' });

        // Add rows as Array values
        // worksheet.addRow(["BCD", "Author Name 3"]);

        // Add rows using both the above of rows
        // const rows = [
        //     ["FGH", "Author Name 4"],
        //     { package_name: "PQR", author_name: "Author 5" }
        // ];

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