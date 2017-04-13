const _           = require('lodash')
const Koa         = require('koa')
const logger      = require('koa-logger')
const serve       = require('koa-static')
const asyncBusboy = require('async-busboy')
const path        = require('path')
const Uploader    = require('./uploader')

class Server {
  constructor(env) {
    this.PORT = env.PORT
    this.uploader = new Uploader(env)
    this.app = new Koa()
    this.setup()
  }
  setup() {
    this.app.use(logger())
    this.app.use(serve(path.join(__dirname, '..', 'public')));
    this.app.use(async (ctx, next) => {
      try {
        const { files, fields } = await asyncBusboy(ctx.req, { autoFields: true });
        const file = _.first(files)
        await this.uploader.do(file)
      } catch (error) {
        console.error('error uploading...', error)
      }
      ctx.redirect('/');
    });
  }
  run(){
    this.app.listen(this.PORT)
  }
}

module.exports = Server
