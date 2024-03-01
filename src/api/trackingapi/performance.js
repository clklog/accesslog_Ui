import request from '@/utils/request'


// 100ms数据详情
export function getRequestimeGt100msApi(params) {
  return request({
    url: '/accesslog/performance/getRequestimeGt100ms',
    method: 'post',
    data: params
  })
}
// 性能分析详情
export function getPerformanceDetailApi(params) {
  return request({
    url: '/accesslog/performance/getPerformanceDetail',
    method: 'post',
    data: params
  })
}