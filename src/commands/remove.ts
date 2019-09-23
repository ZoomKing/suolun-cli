import { prompt } from 'inquirer'
import { TnquirerPrompt } from '../types'
import fs from 'fs'
const tpls  = require('./template.json');

const removeTemplate = ()=> {
    const promptList: TnquirerPrompt[] = [
        {
            type: 'input',
            name: 'name',
            message: 'remove your project name in this list: ',
            validate: (name)=>{
                if (!tpls[name]) {
                    return `Template with name "${name}" is not exist. Please input again!!!`
                }
                return true;
            }
        },
    ]
    prompt(promptList).then(async ({ name })=>{
        tpls[name] = undefined
        fs.writeFileSync(__dirname + '/template.json', JSON.stringify(tpls), 'utf-8');
        console.log('Remove Template success')
    })
}

export default removeTemplate;