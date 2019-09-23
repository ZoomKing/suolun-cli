import fs from 'fs'

export function copy(src,dst) {
    let paths = fs.readdirSync(src); //同步读取当前目录
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            const _stat = fs.statSync(_src);
            if(_stat.isFile() && _src.indexOf('package.json') === -1){ //如果是个文件则拷贝 
                let  readable=fs.createReadStream(_src);//创建读取流
                let  writable=fs.createWriteStream(_dst);//创建写入流
                readable.pipe(writable);
            }else if(_stat.isDirectory()){ //是目录则 递归 
                checkDirectory(_src,_dst,copy);
            }
    });
}


export function checkDirectory(src,dst,callback) {
    try {
        fs.accessSync(dst, fs.constants.F_OK);
        callback(src,dst);
    } catch (error) {
        fs.mkdirSync(dst);
        callback(src,dst);
    }
}