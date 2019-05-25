/// <reference types="react-scripts" />
import {Sheet} from "xlsx";

declare module 'save-svg-as-png'

declare function getSheet(idx_name: number | string): Sheet;