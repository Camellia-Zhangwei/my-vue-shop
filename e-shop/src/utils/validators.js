/**
 * 表单验证工具函数
 */

/**
 * 验证用户名
 * @param {string} username - 用户名
 * @returns {string|boolean} 错误信息或true
 */
export const validateUsername = (username) => {
  if (!username) {
    return '用户名不能为空'
  }
  if (username.length < 2 || username.length > 20) {
    return '用户名长度应为2-20个字符'
  }
  if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
    return '用户名只能包含中文、英文、数字和下划线'
  }
  return true
}

/**
 * 验证密码
 * @param {string} password - 密码
 * @param {boolean} requireStrong - 是否需要强密码
 * @returns {string|boolean} 错误信息或true
 */
export const validatePassword = (password, requireStrong = false) => {
  if (!password) {
    return '密码不能为空'
  }
  if (password.length < 6 || password.length > 20) {
    return '密码长度应为6-20个字符'
  }
  
  if (requireStrong) {
    // 强密码验证：至少包含大写字母、小写字母、数字和特殊字符
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    
    if (!hasUpperCase) return '密码必须包含至少一个大写字母'
    if (!hasLowerCase) return '密码必须包含至少一个小写字母'
    if (!hasNumbers) return '密码必须包含至少一个数字'
    if (!hasSpecialChar) return '密码必须包含至少一个特殊字符'
  } else {
    // 普通密码验证：至少包含字母和数字
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      return '密码需包含字母和数字'
    }
  }
  
  return true
}

/**
 * 验证邮箱
 * @param {string} email - 邮箱地址
 * @returns {string|boolean} 错误信息或true
 */
export const validateEmail = (email) => {
  if (!email) {
    return '邮箱不能为空'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return '请输入有效的邮箱地址'
  }
  return true
}

/**
 * 验证手机号
 * @param {string} phone - 手机号
 * @returns {string|boolean} 错误信息或true
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return '手机号不能为空'
  }
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone)) {
    return '请输入有效的手机号（11位数字）'
  }
  return true
}

/**
 * 验证验证码
 * @param {string} code - 验证码
 * @param {number} length - 验证码长度
 * @returns {string|boolean} 错误信息或true
 */
export const validateCode = (code, length = 6) => {
  if (!code) {
    return '验证码不能为空'
  }
  const regex = new RegExp(`^\\d{${length}}$`)
  if (!regex.test(code)) {
    return `验证码应为${length}位数字`
  }
  return true
}

/**
 * 验证价格
 * @param {number|string} price - 价格
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {string|boolean} 错误信息或true
 */
export const validatePrice = (price, min = 0, max = 1000000) => {
  const num = Number(price)
  if (isNaN(num)) {
    return '请输入有效的价格'
  }
  if (num < min) {
    return `价格不能小于${min}`
  }
  if (num > max) {
    return `价格不能超过${max}`
  }
  // 保留两位小数
  if (!/^\d+(\.\d{1,2})?$/.test(price.toString())) {
    return '价格最多保留两位小数'
  }
  return true
}

/**
 * 验证数量
 * @param {number|string} quantity - 数量
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {string|boolean} 错误信息或true
 */
export const validateQuantity = (quantity, min = 1, max = 999) => {
  const num = Number(quantity)
  if (isNaN(num) || !Number.isInteger(num)) {
    return '请输入有效的数量'
  }
  if (num < min) {
    return `数量不能小于${min}`
  }
  if (num > max) {
    return `数量不能大于${max}`
  }
  return true
}

/**
 * 验证URL
 * @param {string} url - URL地址
 * @returns {string|boolean} 错误信息或true
 */
export const validateUrl = (url) => {
  if (!url) {
    return 'URL不能为空'
  }
  try {
    new URL(url)
    return true
  } catch (error) {
    return '请输入有效的URL地址'
  }
}

/**
 * 验证身份证号
 * @param {string} idCard - 身份证号
 * @returns {string|boolean} 错误信息或true
 */
export const validateIdCard = (idCard) => {
  if (!idCard) {
    return '身份证号不能为空'
  }
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!idCardRegex.test(idCard)) {
    return '请输入有效的身份证号'
  }
  return true
}

/**
 * 验证邮政编码
 * @param {string} postalCode - 邮政编码
 * @returns {string|boolean} 错误信息或true
 */
export const validatePostalCode = (postalCode) => {
  if (!postalCode) {
    return '邮政编码不能为空'
  }
  const postalCodeRegex = /^[1-9]\d{5}$/
  if (!postalCodeRegex.test(postalCode)) {
    return '请输入有效的邮政编码'
  }
  return true
}

/**
 * 验证必填字段
 * @param {any} value - 字段值
 * @param {string} fieldName - 字段名称
 * @returns {string|boolean} 错误信息或true
 */
export const validateRequired = (value, fieldName = '字段') => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName}不能为空`
  }
  if (Array.isArray(value) && value.length === 0) {
    return `${fieldName}不能为空`
  }
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldName}不能为空`
  }
  return true
}

/**
 * 验证字符串长度
 * @param {string} str - 字符串
 * @param {number} min - 最小长度
 * @param {number} max - 最大长度
 * @param {string} fieldName - 字段名称
 * @returns {string|boolean} 错误信息或true
 */
export const validateLength = (str, min, max, fieldName = '字段') => {
  if (!str && min > 0) {
    return `${fieldName}不能为空`
  }
  if (str && str.length < min) {
    return `${fieldName}长度不能小于${min}个字符`
  }
  if (str && str.length > max) {
    return `${fieldName}长度不能超过${max}个字符`
  }
  return true
}

/**
 * 验证两个字段是否相等（如密码确认）
 * @param {any} value1 - 第一个值
 * @param {any} value2 - 第二个值
 * @param {string} field1Name - 第一个字段名
 * @param {string} field2Name - 第二个字段名
 * @returns {string|boolean} 错误信息或true
 */
export const validateEqual = (value1, value2, field1Name = '字段1', field2Name = '字段2') => {
  if (value1 !== value2) {
    return `${field1Name}和${field2Name}不一致`
  }
  return true
}

/**
 * 批量验证
 * @param {Object} validations - 验证配置 {字段名: [验证函数, 值, ...参数]}
 * @returns {Object} 验证结果 {valid: boolean, errors: Object}
 */
export const batchValidate = (validations) => {
  const errors = {}
  let valid = true
  
  Object.keys(validations).forEach(field => {
    const [validator, value, ...args] = Array.isArray(validations[field]) 
      ? validations[field] 
      : [validations[field].validator, validations[field].value, ...(validations[field].args || [])]
    
    const result = validator(value, ...args)
    
    if (result !== true) {
      errors[field] = result
      valid = false
    }
  })
  
  return { valid, errors }
}

/**
 * 创建表单验证器
 * @param {Object} rules - 验证规则 {字段名: [验证函数, ...参数]}
 * @returns {Function} 验证函数
 */
export const createValidator = (rules) => {
  return (data) => {
    const errors = {}
    let valid = true
    
    Object.keys(rules).forEach(field => {
      const value = data[field]
      const rule = rules[field]
      
      if (Array.isArray(rule)) {
        for (let i = 0; i < rule.length; i++) {
          const validator = rule[i]
          if (typeof validator === 'function') {
            const result = validator(value, ...rule.slice(i + 1))
            if (result !== true) {
              errors[field] = result
              valid = false
              break
            }
          }
        }
      } else if (typeof rule === 'function') {
        const result = rule(value)
        if (result !== true) {
          errors[field] = result
          valid = false
        }
      }
    })
    
    return { valid, errors }
  }
}

export default {
  validateUsername,
  validatePassword,
  validateEmail,
  validatePhone,
  validateCode,
  validatePrice,
  validateQuantity,
  validateUrl,
  validateIdCard,
  validatePostalCode,
  validateRequired,
  validateLength,
  validateEqual,
  batchValidate,
  createValidator
}