"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
/**
 * Create an index (array of file names) of analyzed results files to be published
 * in the results branch. This file can then be fetched by the UI as an index of
 * available results files, that can then be individually be fetched.
 */
const createResultsIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield fs.promises.readdir(path.join('results'));
        const analyzedFiles = files.filter(file => /.analyzed.json/.test(file));
        fs.writeFileSync(path.join('results', 'index.json'), JSON.stringify(analyzedFiles, null, 2));
    }
    catch (err) {
        console.error(err);
    }
});
createResultsIndex();
//# sourceMappingURL=createResultsIndex.js.map