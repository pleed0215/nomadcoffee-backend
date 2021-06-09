"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type FollowResponse {\n    ok: Boolean!\n    error: String\n    \"Return boolean according to follow or unfollow\"\n    followed: Boolean\n    message: String\n  }\n  type Mutation {\n    toggleFollow(userId: Int!): FollowResponse!\n  }\n"], ["\n  type FollowResponse {\n    ok: Boolean!\n    error: String\n    \"Return boolean according to follow or unfollow\"\n    followed: Boolean\n    message: String\n  }\n  type Mutation {\n    toggleFollow(userId: Int!): FollowResponse!\n  }\n"])));
var templateObject_1;
