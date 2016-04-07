'use strict';

/**
 * 通过id来寻找索引
 * @param id
 * @param idName
 * @returns {number}
 */
Array.prototype.findIndexById = function (id) {
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    for (var i = 0; i < this.length; i++) {
        if (this[i][idName] == id) {
            return i;
        }
    }
    return -1;
};

/**
 * 通过id找到该对象
 * @param id
 * @param idName
 * @returns {*}
 */
Array.prototype.findById = function (id) {
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    return this[this.findIndexById(id, idName)];
};

/**
 * 对于数组元素为object的,通过id排序
 * @param order
 * @param idName
 */
Array.prototype.sortById = function () {
    var order = arguments.length <= 0 || arguments[0] === undefined ? 'asc' : arguments[0];
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    var getSort = function getSort(order, sortBy) {
        var ordAlpha = order == 'asc' ? true : false;

        function sort(a, b) {
            var sortResult;
            if (typeof a[sortBy] == 'string') {
                sortResult = a[sortBy].localeCompare(b[sortBy]);
            } else if (typeof a[sortBy] == 'number') {
                sortResult = a[sortBy] > b[sortBy];
            }
            if (!ordAlpha) sortResult = !sortResult;
            return sortResult ? 1 : -1;
        }

        return sort;
    };
    return this.sort(getSort(order, idName));
};

/**
 *判断数组中是否有某个元素,根据ID标示
 * @param id
 * @param idName
 * @returns {boolean}
 */
Array.prototype.hasItem = function (item) {
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    var id = typeof item == 'string' ? item : item[idName];
    return this.findIndexById(id, idName) > -1;
};

/**
 * 判断数组中是否有某一项元素,
 * @param item
 * @returns {boolean}
 */
Array.prototype.has = function (item) {
    return this.indexOf(item) > -1;
};

/**
 * 根据id来删除数组中的某一项
 * @param id
 * @param idName
 */
Array.prototype.removeById = function (id) {
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    var index = this.findIndexById(id, idName);
    this.splice(index, 1);
    return this;
};

/**
 * 根据id更新数组中的某一项
 * @param item
 * @param idName
 * @returns {Array}
 */
Array.prototype.updateById = function (item) {
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    this[this.findIndexById(item[idName], idName)] = item;
    return this;
};

/**
 * 根据id获取某一项并移除
 * @param id
 * @param idName
 */
Array.prototype.takeById = function (id) {
    var idName = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    var item = this.findById(id, idName);
    this.removeById(id, idName);
    return item;
};