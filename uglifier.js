const clipboardy = require('clipboardy')

// Get js from clipboard
const js = clipboardy.readSync()

// Create an array from each line of the input text
const lines = js.split('\n')

const escaped = lines.map(val => {
  const line = val.split('').reduce((acc, curr) => {
    if (curr == '"') {
      curr = '\\"'
    }
    return acc + curr
  }, ``)

  if (line.length === 0) {
    return '\n'
  }

  return ` ui += L"${line}" + endl;\n`
})

const combined = escaped.reduce((acc, curr, i) => {
  return `${acc} ${curr}`
}, ``)

const final = `
CString ui;

${combined}

return ui;
`
console.log(combined)
clipboardy.writeSync(final)
