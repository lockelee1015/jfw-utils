"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Lee on 3/9/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _jfwservice = require("./jfwservice");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DBHelper = function () {
    function DBHelper(dbName) {
        _classCallCheck(this, DBHelper);

        this.dbName = dbName;
    }

    /**
     * 查询一张表所有数据
     * @param tableName
     * @returns {*}
     */


    _createClass(DBHelper, [{
        key: "findAll",
        value: function findAll(tableName) {
            return this.service({ tableName: tableName }, "findAllByTableName");
        }

        /**
         * 通过属性筛选查询某张表的数据
         * @param option
         * @param tableName
         * @returns {*}
         */

    }, {
        key: "findByProperties",
        value: function findByProperties(option, tableName) {
            return this.service({ tableName: tableName, props: option }, "findByProperties");
        }

        /**
         * 通过主键来查询某张表的一条数据
         * @param option
         * @param tableName
         * @param idName
         * @returns {*}
         */

    }, {
        key: "findById",
        value: function findById(option, tableName) {
            var idName = arguments.length <= 2 || arguments[2] === undefined ? 'id' : arguments[2];

            if (typeof option == 'string') {
                return this.service({ tableName: tableName, props: { id: option } }, "findById");
            } else {
                return this.service({ tableName: tableName, props: option }, "findById");
            }
        }

        /**
         * 通过sqlId查询
         * @param sqlId
         * @param param
         * @returns {*}
         */

    }, {
        key: "findBySqlId",
        value: function findBySqlId(sqlId) {
            var param = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.service({ sqlId: sqlId, param: param }, "findBySqlId");
        }

        /**
         * 新增一条记录
         * @param record
         * @param tableName
         * @returns {*}
         */

    }, {
        key: "create",
        value: function create(record, tableName) {
            return this.service({ record: record, tableName: tableName }, "create");
        }

        /**
         * 更新一条记录
         * @param record
         * @param tableName
         * @param skipNull
         * @param idNames
         * @returns {*}
         */

    }, {
        key: "update",
        value: function update(record, tableName) {
            var skipNull = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
            var idNames = arguments.length <= 3 || arguments[3] === undefined ? ["id"] : arguments[3];

            return this.service({ record: record, tableName: tableName, idNames: idNames, skipNull: skipNull }, "update");
        }

        /**
         * 通过属性删除一条记录
         * @param props
         * @param tableName
         * @returns {*}
         */

    }, {
        key: "deleteByProps",
        value: function deleteByProps(props, tableName) {
            return this.service({ props: props, tableName: tableName }, "deleteByProps");
        }
    }, {
        key: "service",
        value: function service() {
            var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var method = arguments[1];

            return (0, _jfwservice.service)("DBProxy", method, this.buildParam(option));
        }
    }, {
        key: "buildParam",
        value: function buildParam(OPTION) {
            return { OPTION: OPTION, DBNAME: this.dbName };
        }
    }]);

    return DBHelper;
}();

exports.default = DBHelper;