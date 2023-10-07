{
  // Use case 1
  
  const defaultExport = require('self')
  defaultExport('Hello')
  
  const { namedExport1, namedExport2 } = defaultExport
  console.log(namedExport1)
  console.log(namedExport2)
}

{
  // Use case 2
  
  const { default: defaultExport, namedExport1, namedExport2 } = require('self')
  defaultExport('Hello')
  
  console.log(namedExport1)
  console.log(namedExport2)
}
