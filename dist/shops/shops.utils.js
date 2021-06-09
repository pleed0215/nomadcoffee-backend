"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSlugs = exports.makeSlug = void 0;
/**
 * 주어진 str을 소문자로 바꾸고, 양 옆의 공백을 trim 한 후, 문자열 내부에 여러 개의 공백이 있는 경우
 * 한개의 공백으로 만들고 나서, 남은 한 개의 공백은 '-' 하이픈으로 바꾼다.
 * @param {string} str 슬러그 만들 문자
 * @returns {string} 공백 제거 & 스페이스 -> 하이픈(-)으로 바꾼 문자열 리턴.
 */
var makeSlug = function (str) {
    return str.trim().toLowerCase().replace(/\s+/g, " ").replace(/\s/g, "-");
};
exports.makeSlug = makeSlug;
/**
 * 입력 받은 names로 prisma.coffeeShop.create에서 category와 연결 또는 category 레코드를 만들어서
 * 연결할 수 있는 오브젝트 배열 리턴.
 * @param {string[]} names Category 만들 이름 배열.
 * @returns {where, create} prisma relation create에서 이용할 connectOrCreate 오브젝트 리턴.
 */
var processSlugs = function (names) {
    return names.map(function (str) {
        var slug = exports.makeSlug(str);
        return {
            where: {
                slug: slug,
            },
            create: {
                name: str.trim().replace(/\s+/g, " "),
                slug: slug,
            },
        };
    });
};
exports.processSlugs = processSlugs;
