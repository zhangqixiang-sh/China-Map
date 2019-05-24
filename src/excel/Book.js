import Sheet from "./Sheet"
import * as XLSX from 'xlsx'

export default class Book {

    constructor(file) {
        this.wb = XLSX.read(file, {type: 'binary'})
    }

    getSheet(idxname) {

        let sheet = null
        if (typeof idxname === 'string') {
            sheet = this.wb.Sheets[idxname];
        } else if (typeof  idxname === 'number') {
            let name = this.wb.SheetNames[idxname];
            sheet = this.wb.Sheets[name];
        }

        if (sheet && Object.keys(sheet).length > 0) {
            return new Sheet(sheet)
        }


    }


}