# react_source_code

react源码学习@小马哥_老师
### npm依赖

```js
"devDependencies": {
  "babel-core": "^6.26.3",
  "babel-plugin-transform-react-jsx": "^6.24.1",
  "babel-preset-env": "^1.7.0",
  "parcel-bundler": "1.12.3"
}
```
### .babelrc

```js
{
  "presets": ["env"],
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "React.createElement"
    }]
  ]
}
```