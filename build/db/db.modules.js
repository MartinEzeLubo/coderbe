"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./operations/product_create_tables.db"), exports);
__exportStar(require("./operations/product_read.db"), exports);
__exportStar(require("./operations/product_save.db"), exports);
__exportStar(require("./operations/product_update.db"), exports);
__exportStar(require("./operations/product_delete.db"), exports);
__exportStar(require("./operations/chat_create_tables.db"), exports);
__exportStar(require("./operations/chat_read.db"), exports);
//# sourceMappingURL=db.modules.js.map