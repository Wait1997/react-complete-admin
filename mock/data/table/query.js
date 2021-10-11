const list = Array.from({ length: 1000 }).fill(1)

const handleStatus = (index) => {
  if (index % 5 === 0) {
    return 'success'
  }
  if (index % 3 === 0 && index % 4 === 0) {
    return 'running'
  }
  if (index % 13 === 0) {
    return 'close'
  }
  return 'error'
}

const datalist = list.map((item, index) => {
  return {
    key: index + 1,
    name: `名称${index}`,
    desc: `这是一段描述${index}`,
    serveCount: 1000000,
    status: handleStatus(index),
    serveTime: Date.now()
  }
})

module.exports = datalist
