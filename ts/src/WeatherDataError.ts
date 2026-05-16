
import { Context } from './Context'


class WeatherDataError extends Error {

  isWeatherDataError = true

  sdk = 'WeatherData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WeatherDataError
}

