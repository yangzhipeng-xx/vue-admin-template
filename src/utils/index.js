/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 时间解析与格式化工具函数
 *
 * @param {string|number|Date} time 需要格式化的原始时间
 * @param {string} cFormat 自定义格式，默认：'{y}-{m}-{d} {h}:{i}:{s}'
 * @param {boolean} isUTC 是否使用 UTC 时间（默认 true）
 * @returns {string|null}
 */
export function parseTimeHm(time, cFormat, isUTC = true) {
  if (arguments.length === 0 || !time) {
    return null
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date

  // 如果是对象，直接使用
  if (typeof time === 'object') {
    date = time
  } else if (typeof time === 'string') {
    // 处理纯数字字符串（如时间戳）
    if (/^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else {
      // Safari 不支持 '-' 分隔的 ISO 格式，替换为 '/'
      time = time.replace(new RegExp(/-/gm), '/')
    }
  } else if (typeof time === 'number' && time.toString().length === 10) {
    // 秒级时间戳转毫秒
    time *= 1000
  }

  // 创建 Date 对象
  date = new Date(time)

  // 如果无效时间，返回 null
  if (isNaN(date.getTime())) {
    return null
  }

  // 获取年月日时分秒（根据是否使用 UTC）
  const get = isUTC ? 'UTC' : ''
  const formatObj = {
    y: date[`get${get}FullYear`](),
    m: date[`get${get}Month`]() + 1, // 月份从 0 开始
    d: date[`get${get}Date`](),
    h: date[`get${get}Hours`](),
    i: date[`get${get}Minutes`](),
    s: date[`get${get}Seconds`](),
    a: date[`get${get}Day`]() // 星期几
  }

  // 替换模板中的占位符
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })

  return time_str
}
