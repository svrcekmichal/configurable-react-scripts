# Configurable react-scripts
Latest version of original react-scripts: 0.9.0

## ⚠️ Warning

This is **not** a fork of [```create-react-app```](https://github.com/facebookincubator/create-react-app). It's just a fork of ```react-scripts``` with possible modification of webpack config.

## Why I've built this?

Create-react-app is great. It is so great I've migrated most of my apps from different boilerplates. But I've always find something I missed.

In first app, I've needed support of CSS-modules, so I've created my custom react-scripts with scope `@svrcekmichal/react-scripts`. Everything was great for a while, until I've needed to add LESS, so I published new version. In second app I've been using Relay, so I've added Relay to my package. As you can see, it started growing, but I've added it and pretend everything is fine. In third app I wanted to test styled-components and I wanted to add custom babel plugin fore better react-devtools.

That's the point where everything in me broken. I've started to search for better alternatives and opened npms.io. I found 164+ packages with or withous scope which handled most of the time same stuff. LESS, SASS, CSS-modules, css variables etc. This is all stuff which can be added with few lines of code to webpack config.

And here I am, and you are here too. Probably with the same problem.

## ☢ DANGER ☢

There is multiple reasons why not to do it this way! This solution was proposed multiple times before, so I link few PRs where is everything better explained.

[#99](https://github.com/facebookincubator/create-react-app/issues/99)
[#145](https://github.com/facebookincubator/create-react-app/issues/145)
[#460](https://github.com/facebookincubator/create-react-app/issues/460)
[#481](https://github.com/facebookincubator/create-react-app/issues/481)
[#1060](https://github.com/facebookincubator/create-react-app/issues/1060)
[#1103](https://github.com/facebookincubator/create-react-app/issues/1103)
[#1111](https://github.com/facebookincubator/create-react-app/issues/1111)

As [@gaearon](https://github.com/gaearon) mentioned multiple times there, it's not good idea to extend it. From my point of view, I'm giving you gun, so try not to shot yourself, because probably nobody will help you. When you modify something, be completely sure what you doing!

## Instalation

```
create-react-app my-app --scripts-version configurable-react-scripts
```

## Usage

To modify webpack config create `webpack.config.js` file in your project directory.  Add following body and modify whatever you want inside function body.
First argument is original config from `react-scripts`, second is for target only dev or only prod features. Don't forget to return modified config!

```js
module.exports = function(webpackConfig, isDevelopment) {

  //here you can modify webpack config

  return webpackConfig;
}
```

## Examples

I've added example with Relay. It can be seen in `examples` folder. If you can, I will accept any PR with features like LESS, SASS, CSS-modules etc.

