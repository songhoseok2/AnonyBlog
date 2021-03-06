'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('../flask_backend/blog_package/static/react'),
  appPublic: resolveApp('public'),


  indexHtml: resolveApp('public/index.html'),
  navbarJs: resolveModule(resolveApp, 'src/javascripts/react_scripts/navbars'),
  loginHtml: resolveApp('public/login.html'),
  registerHtml: resolveApp('public/register.html'), registerJs: resolveModule(resolveApp, 'src/javascripts/react_scripts/register'),
  accountHtml: resolveApp('public/account.html'),
  createPostHtml: resolveApp('public/create_post.html'),
  updateCommentHtml: resolveApp('public/update_comment.html'),
  postHtml: resolveApp('public/post.html'), postJs: resolveModule(resolveApp, 'src/javascripts/react_scripts/posts'),
  userPostsHtml: resolveApp('public/user_posts.html'),
  resetRequestHtml: resolveApp('public/reset_request.html'),
  resetTokenHtml: resolveApp('public/reset_token.html'),
  error403Html: resolveApp('public/errors/403.html'),
  error404Html: resolveApp('public/errors/404.html'),
  error500Html: resolveApp('public/errors/500.html'),

  buttonJs: resolveModule(resolveApp, 'src/javascripts/react_scripts/buttons'),


  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;
