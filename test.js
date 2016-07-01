require('./dist/src/ArrayAddons.js')
var a = [1, 2, 3, 4, 5]
var list = []
for (var i = 0; i < 40; i++) {
    var id = a[getRandom()]
    var name = a[getRandom()]
    var c = a[getRandom()]
    list.push({ id: id, name: name, c: c })
}
list.sortById('asc', 'id', 'name', 'c')

console.log(list)
function getRandom() {
    return new Number((Math.random() * 3).toFixed(0))
}

