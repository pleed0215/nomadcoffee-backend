"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type SearchUsersResponse {\n    total: Int!\n    results: [User]\n  }\n  type Query {\n    \"\"\"\n    lastId: cursor based pagination. lastId\uAC00 \uC81C\uACF5\uB418\uBA74 lastId \uB2E4\uC74C record\uBD80\uD130 data fetching.\n    \"\"\"\n    searchUsers(term: String!, lastId: Int): SearchUsersResponse!\n  }\n"], ["\n  type SearchUsersResponse {\n    total: Int!\n    results: [User]\n  }\n  type Query {\n    \"\"\"\n    lastId: cursor based pagination. lastId\uAC00 \uC81C\uACF5\uB418\uBA74 lastId \uB2E4\uC74C record\uBD80\uD130 data fetching.\n    \"\"\"\n    searchUsers(term: String!, lastId: Int): SearchUsersResponse!\n  }\n"])));
var templateObject_1;
