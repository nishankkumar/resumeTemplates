/**
 *
 */

import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';

function Html({ title, description, style, css, script, state, children, meta }) {
  const metaTags = meta ? Object.keys(meta) : '';

  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href={css} />
        {metaTags.length ?
          metaTags.map((groupKey) => {
            const group = meta[groupKey];
            const keysForRendering = Object.keys(group);

            return keysForRendering.length ?
              keysForRendering.map((itemKey) => {
                // to prevent render empty meta tags
                if (!group[itemKey]) {
                  return null;
                }

                return <meta property={`${groupKey}:${itemKey}`} content={group[itemKey]} />;
              })
              :
              null;
          })
          :
          null
        }
        {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {state && <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE=${serialize(state, { isJSON: true })}`,
          }}
        />}
        {script && <script src={script} />}
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string,
  css: PropTypes.string,
  script: PropTypes.string,
  state: PropTypes.object,
  children: PropTypes.string,
  // meta tags object
  meta: PropTypes.object,
};

export default Html;
