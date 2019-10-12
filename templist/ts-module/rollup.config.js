import { dtsConfig, productionConfig, devConfig } from './rollup.config.base'

const isProduction = process.env.NODE_ENV === 'production'
const isDts = process.env.BUILD_ENV === 'dts'

export default isProduction ? (isDts ? dtsConfig : productionConfig) : devConfig
