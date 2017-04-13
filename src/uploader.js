const Dropbox = require('dropbox')
const fs      = require('fs')

class Uploader {
  constructor({ DROPBOX_ACCESS_TOKEN, DROPBOX_FOLDER_NAME, DROPBOX_CLIENT_ID }) {
    this.folderName = DROPBOX_FOLDER_NAME
    this.dropbox = new Dropbox({
      accessToken: DROPBOX_ACCESS_TOKEN,
      clientId:    DROPBOX_CLIENT_ID,
    })
  }
  do(file) {
    const path = `/${this.folderName}/${new Date().toISOString()}-${file.filename}`
    const contents = fs.readFileSync(file.path, 'utf8')
    return this.dropbox.filesUpload({
      path,
      contents,
    }).then(() => {
      console.log('success')
    }).catch(error => {
      console.error('failure', error)
    })
  }
}
module.exports = Uploader
