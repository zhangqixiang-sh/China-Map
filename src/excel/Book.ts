import Sheet from "./Sheet"
import {read, utils as xutils, WorkBook, WorkSheet, writeFile} from 'xlsx'

export default class Book {
    private wb: WorkBook;

    constructor(file?: File) {
        if (file) {
            this.wb = read(file, {type: 'binary'});
        } else {
            this.wb = xutils.book_new();
        }
    }


    public getSheet(idx_name: string | number): Sheet {

        let sheet: WorkSheet
        if (typeof idx_name === 'string') {
            sheet = this.wb.Sheets[idx_name]
        } else {
            let name = this.wb.SheetNames[idx_name]
            sheet = this.wb.Sheets[name]
        }

        if (sheet) {
            return new Sheet(sheet)
        } else {
            throw TypeError("no such sheet, pls check the input index or name is correct")
        }

    }

    public addSheet(sheet: Sheet, sheetName: string) {
        xutils.book_append_sheet(this.wb, sheet.ws, sheetName)
    }

    public writeToFile(fileName: string) {
        writeFile(this.wb, fileName)
    }


}