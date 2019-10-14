import { productionConfig, devConfig } from './rollup.config.base'

const isProduction = process.env.NODE_ENV === 'production'

export default isProduction ? productionConfig : devConfig
