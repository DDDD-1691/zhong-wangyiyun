function API() {}

//序列化参数
API.prototype.queryString = function (params) {
    var str = '';
    for (var key in params) {
        str += key + '=' + params[key] + '&';
    }

    str = str.slice(0, -1);

    return str;
}
 
//GET请求
API.prototype.get = function (o) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            o.success(this.responseText);
        }
    }

    var str = this.queryString(o.params);

    xhr.open('GET', o.url + '?' + str, o.isAsync);

    xhr.send();

}

//POST请求
API.prototype.post = function (o) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            o.success(this.responseText);
        }
    }

    xhr.open('POST', o.url, o.isAsync);

    var str = this.queryString(o.params);

    xhr.send(str);
}


// 集成get，post
API.prototype.ajax = function (o) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            o.success(this.responseText);
        }
    }

    var str = this.queryString(o.data);

    xhr.open(o.type.toUpperCase(), o.url + '?' + str, o.isAsync);

    xhr.send();
}

var api = new API();