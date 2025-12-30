/**
 * 本地存储工具函数
 * 提供对 localStorage 和 sessionStorage 的封装
 */

/**
 * 获取localStorage数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {any}
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return defaultValue
  }
}

/**
 * 设置localStorage数据
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error)
  }
}

/**
 * 移除localStorage数据
 * @param {string} key - 存储键名
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

/**
 * 获取sessionStorage数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {any}
 */
export const getSessionStorage = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from sessionStorage:`, error)
    return defaultValue
  }
}

/**
 * 设置sessionStorage数据
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 */
export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing ${key} to sessionStorage:`, error)
  }
}

/**
 * 移除sessionStorage数据
 * @param {string} key - 存储键名
 */
export const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from sessionStorage:`, error)
  }
}

/**
 * 获取存储数据（自动选择存储方式）
 * @param {string} key - 存储键名
 * @param {boolean} useSession - 是否使用sessionStorage
 * @param {any} defaultValue - 默认值
 * @returns {any}
 */
export const getStorage = (key, useSession = false, defaultValue = null) => {
  return useSession ? 
    getSessionStorage(key, defaultValue) : 
    getLocalStorage(key, defaultValue)
}

/**
 * 设置存储数据（自动选择存储方式）
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 * @param {boolean} useSession - 是否使用sessionStorage
 */
export const setStorage = (key, value, useSession = false) => {
  if (useSession) {
    setSessionStorage(key, value)
  } else {
    setLocalStorage(key, value)
  }
}

/**
 * 移除存储数据（自动选择存储方式）
 * @param {string} key - 存储键名
 * @param {boolean} useSession - 是否使用sessionStorage
 */
export const removeStorage = (key, useSession = false) => {
  if (useSession) {
    removeSessionStorage(key)
  } else {
    removeLocalStorage(key)
  }
}

/**
 * 检查存储中是否存在某个键
 * @param {string} key - 存储键名
 * @param {boolean} useSession - 是否使用sessionStorage
 * @returns {boolean}
 */
export const hasStorage = (key, useSession = false) => {
  return useSession ? 
    sessionStorage.getItem(key) !== null : 
    localStorage.getItem(key) !== null
}

/**
 * 清空所有存储
 * @param {boolean} includeSession - 是否清空sessionStorage
 */
export const clearAllStorage = (includeSession = false) => {
  try {
    localStorage.clear()
    if (includeSession) {
      sessionStorage.clear()
    }
  } catch (error) {
    console.error('Error clearing storage:', error)
  }
}

/**
 * 存储带有过期时间的数据
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 * @param {number} expiresIn - 过期时间（毫秒）
 * @param {boolean} useSession - 是否使用sessionStorage
 */
export const setStorageWithExpire = (key, value, expiresIn = 24 * 60 * 60 * 1000, useSession = false) => {
  const data = {
    value,
    expires: Date.now() + expiresIn
  }
  setStorage(key, data, useSession)
}

/**
 * 获取带有过期时间的数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @param {boolean} useSession - 是否使用sessionStorage
 * @returns {any}
 */
export const getStorageWithExpire = (key, defaultValue = null, useSession = false) => {
  const data = getStorage(key, useSession, null)
  
  if (!data) return defaultValue
  
  // 检查是否过期
  if (Date.now() > data.expires) {
    removeStorage(key, useSession)
    return defaultValue
  }
  
  return data.value
}

/**
 * 存储数组（追加模式）
 * @param {string} key - 存储键名
 * @param {any} item - 要追加的项
 * @param {number} maxLength - 最大长度（可选）
 * @param {boolean} useSession - 是否使用sessionStorage
 */
export const pushToStorageArray = (key, item, maxLength = null, useSession = false) => {
  const array = getStorage(key, useSession, [])
  array.push(item)
  
  if (maxLength && array.length > maxLength) {
    array.splice(0, array.length - maxLength)
  }
  
  setStorage(key, array, useSession)
  return array
}

// 导出别名（保持向后兼容）
export {
  getLocalStorage as getStorage,
  setLocalStorage as setStorage,
  removeLocalStorage as removeStorage,
  clearAllStorage as clearStorage
}