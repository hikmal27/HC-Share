import { createServer, Model, Response } from "miragejs"

import users from "./data/users"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.urlPrefix = 'http://localhost:8888'
      this.namespace = '/api/v1'

      // User
      this.post('/users', (schema) => {
        return new Response(200, {}, users)
      })


    }
  })

  return server
}
