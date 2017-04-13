const envalid = require('envalid')
const Server  = require('./src/server')

const env = envalid.cleanEnv(process.env, {
  DROPBOX_ACCESS_TOKEN: envalid.str(),
  DROPBOX_FOLDER_NAME: envalid.str(),
  DROPBOX_CLIENT_ID: envalid.str(),
  PORT: envalid.num({ devDefault: 3000, default: 80 })
})

new Server(env).run()
