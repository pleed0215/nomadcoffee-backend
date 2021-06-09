"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_iso_date_1 = require("graphql-iso-date");
exports.default = {
    Upload: apollo_server_1.GraphQLUpload,
    GraphQLDateTime: graphql_iso_date_1.GraphQLDateTime,
    GraphQLTime: graphql_iso_date_1.GraphQLTime,
    GraphQLDate: graphql_iso_date_1.GraphQLDate,
};
