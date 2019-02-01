import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import servicesLoader from './services';
import db from './database';
import ApolloClient from './ssr/apollo';
import React from 'react';
import Graphbook from './ssr/';
import { renderToStringWithData }  from 'react-apollo';
import template from './ssr/template';
import { Helmet } from 'react-helmet';
import Cookies from 'cookies';
import JWT from 'jsonwebtoken';
import { createServer } from 'http';
const { JWT_SECRET } = process.env;
const utils = {
    db,
};
const services = servicesLoader(utils);
const root = path.join(__dirname, '../../');
const app = express();
const server = createServer(app);
if(process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.amazonaws.com"]
        }
    }));
    app.use(compress());
    app.use(cors());
}
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

if(process.env.NODE_ENV === 'development') {
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');
    const webpack = require('webpack');
    const config = require('../../webpack.server.config');
    const compiler = webpack(config);
    app.use(devMiddleware(compiler));
    app.use(hotMiddleware(compiler));
}

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.use(
    (req, res, next) => {
      const options = { keys: ['Some random keys'] }; 
      req.cookies = new Cookies(req, res, options); 
      next();
    }
);
const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
    const name = serviceNames[i];
    switch (name) {
        case 'graphql':
            services[name].applyMiddleware({ app });
            break;
        case 'subscriptions':
            server.listen(8000, () => {
                console.log('Listening on port 8000!');
                services[name](server);
            });
            break;
        default:
            app.use(`/${name}`, services[name]);
            break;
    }
}

app.get('*', async (req, res) => {
    const token = req.cookies.get('authorization', { signed: true });
    var loggedIn;
    try {
        await JWT.verify(token, JWT_SECRET);
        loggedIn = true;
    } catch(e) {
        loggedIn = false;
    }
    const client = ApolloClient(req, loggedIn);
    const context= {};
    const App = (<Graphbook client={client} loggedIn={loggedIn} location={req.url} context={context}/>);
    renderToStringWithData(App).then((content) => {
        if (context.url) {
            res.redirect(301, context.url);
        } else {
            const initialState = client.extract();
            const head = Helmet.renderStatic();
            res.status(200);
            res.send(`<!doctype html>\n${template(content, head, initialState)}`);
            res.end();
        }
    });
});