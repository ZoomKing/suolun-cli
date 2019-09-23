import typescript from 'rollup-plugin-typescript'
import common from 'rollup-plugin-commonjs'
import fs from 'fs'
var fileName = 'template.json';
const dist = './dist/'

fs.mkdir(dist,()=>{
    fs.writeFileSync(dist+fileName,fs.readFileSync('./src/'+fileName))
})

const copy = (src,dst) => {
    let paths = fs.readdirSync(src); //同步读取当前目录
        
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            fs.stat(_src,function(err,stats){  //stats  该对象 包含文件属性
                if(err)throw err;
                if(stats.isFile()){ //如果是个文件则拷贝 
                    let  readable=fs.createReadStream(_src);//创建读取流
                    let  writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(stats.isDirectory()){ //是目录则 递归 
                    checkDirectory(_src,_dst,copy);
                }
            });
    });
}


const checkDirectory = (src,dst,callback) => {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if(err){
            fs.mkdirSync(dst);
            callback(src,dst);
        }else{
            callback(src,dst);
        }
    });
}

const SOURCES_DIRECTORY = './templist';  //源目录
checkDirectory(SOURCES_DIRECTORY, dist+ "/templist",copy);

export default {
    input: './src/command.ts',
    output: [
        {
            file: './dist/index.js',
            format: 'commonjs'
        },
    ],
    plugins: [
        common(),
        typescript()
    ]
}


