const isEmpty = val => {
  return (
    val === undefined ||
    val === null ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === 'object' && Object.keys(val).length === 0) ||
    (typeof val === 'string' && val.trim().length === 0)
  )
};

module.exports = isEmpty;