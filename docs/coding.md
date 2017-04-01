## Coding

To check the source code for syntax errors and potential issues run:

```sh
$ npm run lint
```

#### Coding standarts:
- [The standard shareable config for stylelint](https://github.com/stylelint/stylelint-config-standard)
- [React Style Guide](./coding/react-style-guide.md)

#### How to:
- [Pull Request example](./coding/PULL_REQUEST_TEMPLATE.md)
- [How to Integrate Redux](./coding/how-to-integrate-redux.md)

### Context usage:
To determine current site inside component use Context.

Example:
```
Footer.contextTypes = { isMarcom: PropTypes.bool.isRequired };
```

Available variables in context:
```
  siteName: 'worldview', // or marcom
  isMarcom: false, // or false
```
