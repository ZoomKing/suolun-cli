import { prompt } from 'inquirer'
import { TnquirerPrompt } from '../types'
const exec = require('child_process').exec
const tpls  = require('./template.json')
const chalk = require('chalk')
import ora from 'ora'

const spinner = ora('Downloading template...')

const ListTemplate = ()=> {

    const promptList: TnquirerPrompt[] = [
        {
            type: 'list',
            name: 'frame',
            message: 'Choices your init Pro by:',
            choices: [...Object.keys(tpls)]
        },
        {
            type: 'input',
            name: 'project',
            message: 'Enter your project name:',
            default: (lastAnswer)=>{
                return lastAnswer.frame
            }
        }
    ]

    prompt(promptList).then(async ({ frame, project })=>{

        const downloadPath = tpls[frame];

        const cmdStr = `git clone ${downloadPath.path} ${project} && cd ${project}`

        spinner.start();

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
              process.exit()
            }
            spinner.stop();
            console.log(chalk.green('\n √ Generation completed!'))
            console.log(`\n cd ${project} && npm install \n`)
            process.exit()
        })
        
    })
}

export default ListTemplate;


