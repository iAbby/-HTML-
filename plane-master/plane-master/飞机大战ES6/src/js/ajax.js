
	/** 
     * @ajax封装 
     * 执行基本ajax请求,返回XMLHttpRequest 
     *  ajax.request({
     *      url 
     *      async 是否异步 true(默认) 
     *      type 请求方式 POST or GET(默认) 
     *      data 请求参数 (键值对字符串) 
     *      success 请求成功后响应函数，参数为xhr 
     *      error 请求失败后响应函数，参数为xhr 11 
     *  }); 
     */  

let ajax = function() {
        let onStateChange = (xhr, success, error) => {  
            if (xhr.readyState === 4) { //    请求已完成，且响应已就绪  
                if (xhr.status >= 200 && xhr.status < 300) {  
                    success(xhr.responseText); //  
                } else {  
                    error(xhr.status);  
                }  
            } else {}  
        };  
        let request = (opt) => {  
            let fn = () => {};  
            let url = opt.url || ''; //    获得url  
    		console.log(url);
            
            let async = opt.async !== false,  
                method = opt.method || 'GET',  
                data = opt.data || null,  
                success = opt.success || fn,  
                error = opt.error || fn;  
            method = method.toUpperCase(); //  默认都转换大写  
            if (method === 'GET' && data) {  
                let args = '';  
                if (typeof data === 'string') {  
                    args = data;  
                } else if (typeof data === 'object') {  
                    let arr = new Array();  
                    for (let k in data) { 
                        arr.push(k + '=' + data[k]);  
                    }  
                    args = arr.join('&');  
                }  
                url += (url.indexOf('?') === -1 ? '?' : '') + args;  
                data = null;  
            } 
            let XML = window.XMLHttpRequest ? new XMLHttpRequest() : '';  
            XML.onreadystatechange = () => { // 当请求被发送到服务器时，需要执行一些基于响应的任务  
                onStateChange(XML, success, error);  
            };  
            XML.open(method, url, async); // 创建一个请求，并准备向服务器发送  
            if (method === 'POST') { //   如果是POST请求的时候，需要添加个请求消息头  
                XML.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');  
            }  
            XML.send(data); //   向服务器发送请求  
            return XML;  
        };  
        return  request;  
    }(); 
    console.log(ajax);