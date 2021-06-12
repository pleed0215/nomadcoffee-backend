"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Category {\n    id: Int!\n    name: String!\n    slug: String!\n\n    \"\"\"\n    Cursor based \uD398\uC774\uC9C0\uB124\uC774\uC158. lastId\uAC00 \uC8FC\uC5B4\uC9C0\uBA74 lastId \uB2E4\uC74C\uBD80\uD130 PAGE_SIZE\uB9CC\uD07C paging.\n    \"\"\"\n    shops(lastId: Int): [CoffeeShop]\n    totalShops: Int\n\n    createdAt: GraphQLDateTime\n    updatedAt: GraphQLDateTime\n  }\n\n  type Query {\n    seeCategory(slug: String!): Category\n    seeCategories(lastId: Int): [Category]\n    searchCategoriesByTerm(term: String!): [Category]\n  }\n"], ["\n  type Category {\n    id: Int!\n    name: String!\n    slug: String!\n\n    \"\"\"\n    Cursor based \uD398\uC774\uC9C0\uB124\uC774\uC158. lastId\uAC00 \uC8FC\uC5B4\uC9C0\uBA74 lastId \uB2E4\uC74C\uBD80\uD130 PAGE_SIZE\uB9CC\uD07C paging.\n    \"\"\"\n    shops(lastId: Int): [CoffeeShop]\n    totalShops: Int\n\n    createdAt: GraphQLDateTime\n    updatedAt: GraphQLDateTime\n  }\n\n  type Query {\n    seeCategory(slug: String!): Category\n    seeCategories(lastId: Int): [Category]\n    searchCategoriesByTerm(term: String!): [Category]\n  }\n"])));
var templateObject_1;
