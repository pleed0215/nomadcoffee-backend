"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type LoginResponse {\n    ok: Boolean!\n    error: String\n    token: String\n  }\n\n  type Mutation {\n    login(email: String!, password: String!): LoginResponse!\n  }\n"], ["\n  type LoginResponse {\n    ok: Boolean!\n    error: String\n    token: String\n  }\n\n  type Mutation {\n    login(email: String!, password: String!): LoginResponse!\n  }\n"])));
var templateObject_1;
