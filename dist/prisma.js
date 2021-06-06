"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGE_SIZE = exports.prisma = void 0;
var client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.PAGE_SIZE = 10;
