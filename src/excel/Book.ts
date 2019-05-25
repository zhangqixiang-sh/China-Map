import Sheet from "./Sheet"
import {read, WorkBook, WorkSheet} from 'xlsx'

export default class Book {
    private wb: WorkBook;

    constructor(file) {
        this.wb = read(file, {type: 'binary'})
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


}