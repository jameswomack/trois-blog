# trois-blog

Isomorphic website made with koa and flux/reactjs.


## Running

* `brew install postgres`
* `ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents`
* `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist`
* `nvm use v0.11.15`

**Production**

1. `NODE_ENV=production npm run db:create`
2. `NODE_ENV=production npm run db:migrate`
3. `NODE_ENV=production npm run build`
4. `NODE_ENV=production node index.js`

**Development**

1. `npm run db:create`
2. `npm run db:migrate`
3. `npm run dev`


## Scripts

* `NODE_ENV=(development|test|production) npm run db:create` - create database
* `NODE_ENV=(development|test|production) npm run db:drop` - drop database
* `NODE_ENV=(development|test|production) npm run db:migrate` - migrate database
* `NODE_ENV=(development|test|production) npm run db:refresh` - runs drop, create, migrate
* `npm run dev` - development mode
* `npm run build` - production build
* `npm run test` - execute tests
* `npm run clean` - remove assets folder


## Tasks

* `NODE_ENV=(development|test|production) node lib/sync_repo.js` - synchronizes database with posts, takes location as an argument, defaults to `public/repo`, example: `node lib/sync_repo.js /path/to/blog` 
* `NODE_ENV=(development|test|production) node lib/sync_repo_and_load_posts.js` - downloads repo and synchronizes with database

**cron**

```
DEBUG=*
NODE_ENV=production
0 * * * * node --harmony lib/sync_repo_and_load_posts.js >> logs/cron.log 2>&1
```

## Files / Folders

* `config` - project configuration
* `models` - database models
* `client` - client-related code, the middleware for doing server-side rendering is there as well
* `api` - koa app for handling api requests
* `db` - migrations
* `lib` - tasks for downloading the repo and sychornizing the database model
* `server.js` - parent server that glues everything together along with some middleware
* `index.js` - meta-app that runs the worker and the server


## How does it work?

When you visit a page, there's a middleware (`client/middleware.js`) that loads the client app, it navigates to the page being visited, and then it sends that to the client. Once the user has finished loading, the client app will bootstrap and take over.

The request code is shared. To achieve this supertest is used, and the server instance is passed to it, so it can make a request on itself. Must research if there's better ways to do this.


## TODO

* Tests. I'm not sure how to test some of this flux/reactjs code.
* Logging. Although nginx can collect access logs, it'd be great to have logs of when the worker ran. It'll be a good chance to experiment with existing logging frameworks for node. 
* Meta tags for SEO
* Server-side rendering of comments? https://help.disqus.com/customer/portal/articles/472125-data-synchronization
* Polyfills for older browsers
* Caching
