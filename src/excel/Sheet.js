import {utils as xutils} from 'xlsx'

export default class Sheet {

    constructor(sheet) {
        this.sheet = sheet
        this.range = xutils.decode_range(sheet["!ref"])
    }

    /**
     *
     * @param {number} r row index (以0开头)
     * @param {boolean} parseToNum : c>0时 单元格里的值是否解析成number,
     * @default parseToNum默认true
     * @returns {Array}
     */
    getRow(r, parseToNum = true) {

        let rowArray = []
        for (let c = this.range.s.c; c <= this.range.e.c; c++) {
            let ref = xutils.encode_cell({c: c, r: r})
            if (this.sheet[ref]) {
                let value = this.sheet[ref].v
                if (c > 0 && parseToNum) {
                    value = Number.parseFloat(value)
                    if (!isNaN(value)) {
                        rowArray.push(value);
                    }
                } else {
                    rowArray.push(value)
                }
            }
        }
        return rowArray
    }

    /**
     * @param {number} c column index (以0开头)
     * @param {boolean} parseToNum : r>0时 单元格里的值是否解析成number,
     * @default parseToNum默认true
     * @returns {Array}
     */
    getColumn(c, parseToNum = true) {

        let colArray = []
        for (let r = this.range.s.r; r <= this.range.e.r; r++) {
            let ref = xutils.encode_cell({c: c, r: r})
            if (this.sheet[ref]) {
                let value = this.sheet[ref].v
                if (r > 0 && parseToNum) {
                    value = Number.parseFloat(value)
                    if (!isNaN(value)) {
                        colArray.push(value);
                    }
                } else {
                    colArray.push(value)
                }
            }
        }
        return colArray
    }


    /**
     * 得到所有行, 及以行位最外层数组的2重数组
     * @param parseToNum : c>0 && r>0 时, 单元格的值解析为number
     * @default parseToNum 默认true
     * @returns {Array}
     */
    getRows(parseToNum = true) {
        let rows = []
        for (let r = this.range.s.r; r <= this.range.e.r; r++) {
            rows.push(this.getRow(r, parseToNum))
        }
        return rows
    }

    /**
     * 得到所有列, 及以列位最外层数组的2重数组
     * @param parseToNum
     * @default parseToNum 默认true
     * @returns {Array}
     */
    getColumns(parseToNum = true) {
        let cols = []
        for (let c = this.range.s.c; c <= this.range.e.c; c++) {
            cols.push(this.getColumn(c, parseToNum))
        }
        return cols
    }


}