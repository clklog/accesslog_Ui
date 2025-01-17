import request from '@/utils/request'


// 获取应用列表
export function getServerApi(params) {
  return request({
    url: '/accesslog/getApplicationCode',
    method: 'post',
    data: params
  })
}
//  获取host列表
export function getHostApi(params) {
  return request({
    url: '/accesslog/getHttpHost',
    method: 'post',
    data: params
  })
}

// 获取应用流量指标概览
export function getServerOverviewApi(params) {
  return request({
    url: '/accesslog/getServerOverview',
    method: 'post',
    data: params
  })
}
// 趋势统计数据
export function getFlowTrendApi(params) {
  return request({
    url: '/accesslog/getFlowTrend',
    method: 'post',
    data: params
  })
}

// 获取IP访问量TOP10数据
export function getIpTop10Api(params) {
  return request({
    url: '/accesslog/getIpTop10',
    method: 'post',
    data: params
  })
}
// 访问来源top10
export function getReferrerTop10Api(params) {
  return request({
    url: '/accesslog/getReferrerTop10',
    method: 'post',
    data: params
  })
}
// 获取状态码数据

export function getStatusApi(params) {
  return request({
    url: '/accesslog/status/getStatus',
    method: 'post',
    data: params
  })
}

//获取UA数据
export function getUaApi(params) {
  return request({
    url: '/accesslog/getUa',
    method: 'post',
    data: params
  })
}
// 获取请求接口数据
export function getRequestMethodApi(params) {
  return request({
    url: '/accesslog/getRequestMethod',
    method: 'post',
    data: params
  })
}
// ip分布中国地图数据
export function getIpByProvinceApi(params) {
  return request({
    url: '/accesslog/getIpByProvince',
    method: 'post',
    data: params
  })
}

// 按应用流量指标概览
export function getHostOverviewApi(params) {
  return request({
    url: '/getHostOverview',
    method: 'post',
    data: params
  })
}
// 指标概览
export function getOverviewApi(params) {
  return request({
    url: '/getOverview',
    method: 'post',
    data: params
  })
}
//性能分析
export function getPerformanceDetailApi(params) {
  return request({
    url: '/getPerformanceDetail',
    method: 'post',
    data: params
  })
}
//获取ip列表
export function getIpListApi(params) {
  return request({
    url: '/accesslog/ip/getIpList',
    method: 'post',
    data: params
  })
}

//按地域获取IP分布统计数据
export function getIpByAreaApi(params) {
  return request({
    url: '/accesslog/ip/getIpByArea',
    method: 'post',
    data: params
  })
}

//获取ip详情列表
export function getIpDetailListApi(params) {
  return request({
    url: '/accesslog/ip/getIpDetailList',
    method: 'post',
    data: params
  })
}
