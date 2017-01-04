# Custom react scripts for my personal usage
Latest version of original react-scripts: **0.8.4**

### ⚠️ Disclaimer:
> This is **not** a fork of ```create-react-app```. It's just a fork of ```react-scripts``` with simple babel/webpack modifications that can toggle extra features.

The reason for this fork's existence is explained better in [this Medium article](https://medium.com/@kitze/configure-create-react-app-without-ejecting-d8450e96196a).

### Instalation
```
npm i -D @svrcekmichal/react-scripts
```

### 💡Features:
LESS
Relay
CSS Modules

### ❔How to use it
LESS and CSS modules can be used without setup
Relay setup: Add `.env` file and write `REACT_APP_GRAPHQL_URL=http://localhost:3010/graph` with link to your graphql server

All the work is taken from this [PR](https://github.com/facebookincubator/create-react-app/pull/662) which was not published, because
Relay is out of scope of most CRA packages. This work would be not possible without [@saintsjd](https://github.com/saintsjd) and [@maxwell-oroark](https://github.com/maxwell-oroark) work and many contributors.
Thanks to [@kitze](https://github.com/kitze) for structure of this readme

### Future plans

I will put all of my efforts into supporting this fork to be always on par with features with the newest ```create-react-app``` and ```react-scripts``` versions.
