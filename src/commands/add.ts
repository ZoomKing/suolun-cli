import { prompt } from 'inquirer'
import { TnquirerPrompt } from '../types'
import fs from 'fs'
const tpls  = require('./template.json');

const addTemplate = ()=> {
    console.log('Current list:', tpls)
    const promptList: TnquirerPrompt[] = [
        {
            type: 'input',
            name: 'name',
            message: 'Set your project name: ',
            validate: (name)=>{
                if (tpls[name]) {
                    return `Template with name "${name}" is exist.`
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'path',
            message: 'Set your project path: '
        },
        {
            type: 'input',
            name: 'branch',
            message: 'Set your project branch: ',
            default: 'master',
            suffix: '(默认master)'
        }
    ]
    prompt(promptList).then(async ({ name, path = '---', branch = 'master' })=>{
        tpls[name] = { name, path, branch}
        fs.writeFileSync(__dirname + '/template.json', JSON.stringify(tpls), 'utf-8');
        console.log('Add Template success')
    })
}

export default addTemplate;