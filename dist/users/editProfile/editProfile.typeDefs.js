"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Mutation {\n    editProfile(\n      id: Int!\n      username: String\n      email: String\n      password: String\n      name: String\n      location: String\n      githubUsername: String\n    ): CommonResponse!\n  }\n"], ["\n  type Mutation {\n    editProfile(\n      id: Int!\n      username: String\n      email: String\n      password: String\n      name: String\n      location: String\n      githubUsername: String\n    ): CommonResponse!\n  }\n"])));
var templateObject_1;
