"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type CoffeeShop {\n    id: Int!\n    name: String!\n    lat: String\n    lng: String\n    address: String\n    user: User\n    photos(lastId: Int): [CoffeeShopPhoto]\n    categories: [Category]\n\n    firstPhotoUrl: String\n\n    \"\"\"\n    Is my shop?\n    \"\"\"\n    isMine: Boolean\n\n    createdAt: GraphQLDateTime\n    updatedAt: GraphQLDateTime\n  }\n\n  type CoffeeShopPhoto {\n    id: Int!\n    url: String\n    shop: CoffeeShop\n\n    createdAt: GraphQLDateTime\n    updatedAt: GraphQLDateTime\n  }\n\n  type Query {\n    seeCoffeeShop(id: Int!): CoffeeShop\n    seeCoffeeShops(lastId: Int): [CoffeeShop]\n  }\n"], ["\n  type CoffeeShop {\n    id: Int!\n    name: String!\n    lat: String\n    lng: String\n    address: String\n    user: User\n    photos(lastId: Int): [CoffeeShopPhoto]\n    categories: [Category]\n\n    firstPhotoUrl: String\n\n    \"\"\"\n    Is my shop?\n    \"\"\"\n    isMine: Boolean\n\n    createdAt: GraphQLDateTime\n    updatedAt: GraphQLDateTime\n  }\n\n  type CoffeeShopPhoto {\n    id: Int!\n    url: String\n    shop: CoffeeShop\n\n    createdAt: GraphQLDateTime\n    updatedAt: GraphQLDateTime\n  }\n\n  type Query {\n    seeCoffeeShop(id: Int!): CoffeeShop\n    seeCoffeeShops(lastId: Int): [CoffeeShop]\n  }\n"])));
var templateObject_1;
