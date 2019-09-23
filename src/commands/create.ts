import { prompt } from 'inquirer'
import { TnquirerPrompt } from '../types'
import ora from 'ora'
import fs from 'fs'
import { checkDirectory, copy } from '../utils'
const exec = require('child_process').exec

const chalk = require('chalk')

const { resolve } = require('path')

const spinner = ora('Downloading template...')

const host =  '/Users/suolun/demoSpace/suolun-cli/dist/tempList/'

const SOURCES_DIRECTORY_REACT_TS = host + 'react-ts';  //源目录
const SOURCES_DIRECTORY_REACT_JS = host + 'react-js';  //源目录
const SOURCES_DIRECTORY_VUE_TS = host + 'vue-ts';  //源目录
const SOURCES_DIRECTORY_VUE_JS = host + 'vue-js';  //源目录

let _package_react_ts  = require( SOURCES_DIRECTORY_REACT_TS + '/package.json')
let _package_react_js  = require( SOURCES_DIRECTORY_REACT_JS + '/package.json')
let _package_vue_ts  = require( SOURCES_DIRECTORY_VUE_TS + '/package.json')
let _package_vue_js  = require( SOURCES_DIRECTORY_VUE_JS + '/package.json')

const CreateTemplate = async ()=> {
    
    const promptList: TnquirerPrompt[] = [
        {
            type: 'input',
            name: 'name',
            message: 'Set your project name: ',
            default: 'my-project'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Set your project version: ',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Set your project description: ',
            default: 'description'
        },
        {
            type: 'input',
            name: 'keywords',
            message: "Set your project keywords (Separated by spaces): ",
            default : 'key'
        },
        {
            type: 'list',
            name: 'frame',
            message: 'Choose your frame: ',
            choices: ['react-ts', 'react-js', 'vue-ts', 'vue-js']
        }
    ]
    
    prompt(promptList).then( ( { name, version, description, keywords, frame })=>{
        switch (frame) {
            case 'react-ts':
                dealFunc({ name, version, description, keywords }, _package_react_ts, SOURCES_DIRECTORY_REACT_TS)
                break;
            case 'react-js':
                dealFunc({ name, version, description, keywords }, _package_react_js, SOURCES_DIRECTORY_REACT_JS)
                break;
            case 'vue-ts':
                dealFunc({ name, version, description, keywords }, _package_vue_ts, SOURCES_DIRECTORY_VUE_TS)
                break;
            case 'vue-js':
                dealFunc({ name, version, description, keywords }, _package_vue_js, SOURCES_DIRECTORY_VUE_JS)
                break;
        }
    })
}


function dealFunc({ name, version, description, keywords }, _package, SOURCES_DIRECTORY_REACT_TS) {
    const _keywords = keywords.split(' ');
    if( !fs.existsSync(SOURCES_DIRECTORY_REACT_TS) ) {
        fs.mkdirSync(SOURCES_DIRECTORY_REACT_TS)
    }

    new Promise((resolve)=>{
        checkDirectory(SOURCES_DIRECTORY_REACT_TS,process.cwd()+'/'+ name, copy)
        resolve()
    }).then(()=>{
        const  newPackage = { ..._package,  name, version, description, keywords: _keywords}

        fs.writeFileSync(process.cwd() + '/'+ name +'/package.json', JSON.stringify(newPackage, null, 4), 'utf-8')

        const { dependencies, devDependencies } = require(resolve(process.cwd() + '/' + name +'/package.json'))
    
        let str = `cd ${name} && yarn add `
        
        str = Object.keys(dependencies).reduce((pre, item)=>{
            return pre + item + ' '
        }, str)
        
        str = Object.keys(devDependencies).reduce((pre, item)=>{
            return pre + item + ' '
        }, (str+= '&& yarn add '))

        str += '--dev'

        console.log(str)        
        spinner.start()
    
        exec(str, async (error, stdout, stderr)=>{
            if(error) {
                process.exit()
            }
            spinner.stop()
            console.log(chalk.green('\n √ Generation completed!'))
            process.exit()
        })

    }).catch(()=>{}) 
}

export default CreateTemplate;


