import {Range, utils as xutils, WorkSheet} from 'xlsx'
import {number} from "prop-types";

export default class Sheet {

    private readonly sheet: WorkSheet;
    private range: Range;

    constructor(sheet: WorkSheet) {
        this.sheet = sheet
        this.range = xutils.decode_range(sheet["!ref"] + '')
    }

    /**
     * @param {number} r row index (以0开头)
     * @returns {Array}
     */
    public getRow(r): ValueArray {

        let rowArray: ValueArray = []
        for (let c = this.range.s.c; c <= this.range.e.c; c++) {
            this.putValue(c, r, rowArray)
        }
        return rowArray
    }

    /**
     * @param {number} c column index (以0开头)
     * @returns {Array}
     */
    public getColumn(c): ValueArray {

        let colArray: ValueArray = []
        for (let r = this.range.s.r; r <= this.range.e.r; r++) {
            this.putValue(c, r, colArray);
        }
        return colArray
    }


    private putValue(c, r, array: ValueArray) {
        let ref = xutils.encode_cell({c: c, r: r})
        if (this.sheet[ref]) {
            let value = this.sheet[ref].v
            let num = this.parseNum(value)
            if (typeof  num === 'number') {
                array.push(num)
            } else {
                array.push(value)
            }
        }
    }

    /**
     * 得到所有行, 及以行位最外层数组的2重数组
     * @default parseToNum 默认true
     * @returns {Array}
     */
    public getRows(): Table {
        let rows: Table = []
        for (let r = this.range.s.r; r <= this.range.e.r; r++) {
            rows.push(this.getRow(r))
        }
        return rows
    }

    /**
     * 得到所有列, 及以列位最外层数组的2重数组
     * @default parseToNum 默认true
     * @returns {Array}
     */
    public getColumns(): Table {
        let cols: Table = []
        for (let c = this.range.s.c; c <= this.range.e.c; c++) {
            cols.push(this.getColumn(c))
        }
        return cols
    }

    private parseNum(num: any): boolean | number {
        if (typeof num === 'number') {
            return num
        }
        let num2 = Number.parseFloat(num);
        if (isNaN(num2)) {
            return false
        } else {
            return num2
        }
    }


}