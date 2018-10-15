export function countDown(time,fmt) {
	let o = {
        'd+': Math.floor(time/86400),
        'h+': Math.floor(time/3600%24),
        'm+': Math.floor(time/60%60),
        's+': Math.floor(time%60)
    };

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
