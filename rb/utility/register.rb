# WeatherData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WeatherDataUtility.registrar = ->(u) {
  u.clean = WeatherDataUtilities::Clean
  u.done = WeatherDataUtilities::Done
  u.make_error = WeatherDataUtilities::MakeError
  u.feature_add = WeatherDataUtilities::FeatureAdd
  u.feature_hook = WeatherDataUtilities::FeatureHook
  u.feature_init = WeatherDataUtilities::FeatureInit
  u.fetcher = WeatherDataUtilities::Fetcher
  u.make_fetch_def = WeatherDataUtilities::MakeFetchDef
  u.make_context = WeatherDataUtilities::MakeContext
  u.make_options = WeatherDataUtilities::MakeOptions
  u.make_request = WeatherDataUtilities::MakeRequest
  u.make_response = WeatherDataUtilities::MakeResponse
  u.make_result = WeatherDataUtilities::MakeResult
  u.make_point = WeatherDataUtilities::MakePoint
  u.make_spec = WeatherDataUtilities::MakeSpec
  u.make_url = WeatherDataUtilities::MakeUrl
  u.param = WeatherDataUtilities::Param
  u.prepare_auth = WeatherDataUtilities::PrepareAuth
  u.prepare_body = WeatherDataUtilities::PrepareBody
  u.prepare_headers = WeatherDataUtilities::PrepareHeaders
  u.prepare_method = WeatherDataUtilities::PrepareMethod
  u.prepare_params = WeatherDataUtilities::PrepareParams
  u.prepare_path = WeatherDataUtilities::PreparePath
  u.prepare_query = WeatherDataUtilities::PrepareQuery
  u.result_basic = WeatherDataUtilities::ResultBasic
  u.result_body = WeatherDataUtilities::ResultBody
  u.result_headers = WeatherDataUtilities::ResultHeaders
  u.transform_request = WeatherDataUtilities::TransformRequest
  u.transform_response = WeatherDataUtilities::TransformResponse
}
