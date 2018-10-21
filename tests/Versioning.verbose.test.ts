import * as request from 'supertest';
import Server from 'ts-framework';
import { Versioning } from "../lib";

describe('lib.Server', () => {
  class TestServer extends Server {
    constructor() {
      super({
        port: process.env.PORT as any || 3333,
        router: {
          routes: {
            get: { '/': (req, res) => res.success({ test: 'ok' }) }
          },
        },
      })
    }

    public async onMount() {
      this.app.use(Versioning.middleware({
        current: '1.2.3',
        minimum: '1.2.0',
        recommended: '1.2.1',
        verbose: true,
      }))
      return super.onMount();
    }
  }

  it('should set the appropriate version headers', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(200, { test: 'ok' });
  });
});
