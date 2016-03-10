/**
 * Created by Lee on 3/9/16.
 */
import service from './jfwservice'
export default class DBHelper {
    constructor(dbName) {
        this.dbName = dbName
    }

    /**
     * 查询一张表所有数据
     * @param tableName
     * @returns {*}
     */
    findAll(tableName) {
        return this.service({tableName}, "findAllByTableName")
    }

    /**
     * 通过属性筛选查询某张表的数据
     * @param option
     * @param tableName
     * @returns {*}
     */
    findByProperties(option, tableName) {
        return this.service({tableName, props: option}, "findByProperties")
    }

    /**
     * 通过主键来查询某张表的一条数据
     * @param option
     * @param tableName
     * @param idName
     * @returns {*}
     */
    findById(option, tableName, idName = 'id') {
        if (typeof option == 'string') {
            return this.service({tableName, props: {id: option}}, "findById")
        } else {
            return this.service({tableName, props: option}, "findById")
        }
    }

    /**
     * 通过sqlId查询
     * @param sqlId
     * @param param
     * @returns {*}
     */
    findBySqlId(sqlId, param = {}) {
        return this.service({sqlId, param}, "findBySqlId")
    }

/**
 * 新增一条记录
 * @param record
 * @param tableName
 * @returns {*}
 */
create(record, tableName) {
    return this.service({record, tableName}, "create")
}

/**
 * 更新一条记录
 * @param record
 * @param tableName
 * @param skipNull
 * @param idNames
 * @returns {*}
 */
update(record,tableName,skipNull=false,idNames=["id"]){
    return this.service({record,tableName,idNames,skipNull},"update")
}

/**
 * 通过属性删除一条记录
 * @param props
 * @param tableName
 * @returns {*}
 */
deleteByProps(props,tableName){
    return this.service({props,tableName},"deleteByProps")
}

service(option = {}, method) {
    return service("DBProxy", method, this.buildParam(option))
}

buildParam(OPTION) {
    return {OPTION, DBNAME: this.dbName}
}
}
