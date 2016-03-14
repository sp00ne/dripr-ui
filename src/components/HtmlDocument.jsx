import React from 'react';
import serialize from 'serialize-javascript';
import {ActionTypes} from '../constants';
import Helmet from 'react-helmet';

export default class HtmlDocument extends React.Component {
  static propTypes = {
    webpackStats: React.PropTypes.object.isRequired,
    content: React.PropTypes.string.isRequired,
    store: React.PropTypes.object.isRequired
  }

  render() {
    let head = Helmet.rewind();
    const {content, store, webpackStats} = this.props;
    const {app} = store.getState();

    store.dispatch({type: ActionTypes.DEHYDRATE});
    const state = store.getState();
    const dehydratedState = 'window.$STATE=' + serialize(state);

    let styles = [].concat(
      webpackStats.vendor.css,
      webpackStats.main.css
    );

    let scripts = [].concat(
      webpackStats.vendor.js,
      webpackStats.main.js
    );

    return (
      <html>
        <head>
          <meta charSet='utf-8'/>
          <title>{app.title}</title>
          <meta name="google-site-verification" content="x0BVFv1kzbxAKxKNFc2uFscZw4HkTcwfxoUMsQISOAk" />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
          <link href='//fonts.googleapis.com/css?family=Roboto:100,400,300italic,300' rel='stylesheet' type='text/css' />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {styles.map((href, key) => <link rel='stylesheet' type='text/css' href={href} key={key}/>)}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: dehydratedState}}/>
          {scripts.map((src, key) => <script src={src} key={key} defer/>)}
        </body>
      </html>
    );
  }
}
