"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  #from graphql-iso-date package\n\n  scalar GraphQLDateTime\n  scalar GraphQLDate\n  scalar GraphQLTime\n\n  # GraphQL Upload\n  scalar Upload\n\n  type CommonResponse {\n    ok: Boolean!\n    id: Int\n    error: String\n  }\n\n  type MutationResponse {\n    ok: Boolean!\n    error: String\n  }\n"], ["\n  #from graphql-iso-date package\n\n  scalar GraphQLDateTime\n  scalar GraphQLDate\n  scalar GraphQLTime\n\n  # GraphQL Upload\n  scalar Upload\n\n  type CommonResponse {\n    ok: Boolean!\n    id: Int\n    error: String\n  }\n\n  type MutationResponse {\n    ok: Boolean!\n    error: String\n  }\n"])));
var templateObject_1;
