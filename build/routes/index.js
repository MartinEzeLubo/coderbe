"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const chat_1 = __importDefault(require("./chat"));
const login_1 = __importDefault(require("./login"));
let router = express_1.default.Router();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
router.use('/productos', productos_1.default);
router.use('/chat', chat_1.default);
router.use('/login', login_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map