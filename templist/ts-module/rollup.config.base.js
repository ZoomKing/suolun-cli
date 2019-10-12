import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import uglify from 'rollup-plugin-uglify'
import progress from 'rollup-plugin-progress'
import filesize from 'rollup-plugin-filesize'

export const dtsConfig = {
    input: 'src/index.ts',
    output: [
        // 输出 es module 模块
        { file: './index.d.ts', format: 'es' },
    ],
    plugins: [dts()],
}

const generateConf = entry => {
    return {
        input: 'src/index.ts',
        output: [
            // 输出 es module 模块
            {
                file: './lib/es/index.js',
                format: 'es',
            },
            // 输出 commonJS 模块
            {
                file: './lib/es5/index.js',
                format: 'cjs',
            },
            // 输出 umd 模块
            {
                name: 'testModule',
                file: './lib/umd/index.js',
                format: 'umd',
            },
        ],
        plugins: [
            typescript(),
            progress({ clearLine: false }),
            filesize(),
            ...entry.plugins,
        ],
    }
}

export const productionConfig = generateConf({
    plugins: [uglify()],
})

export const devConfig = generateConf({
    plugins: [],
})
