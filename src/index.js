const app = require('./server')
require('./socket')

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server up and running on port ${port}...`))
