# quick-start

### eslint 与 prettier

- eslint 定义代码约定
- prettier 执行自动格式化基础上 ESLint 规则

### prettier

1. `npm install --save-dev prettier`

   - 安装依赖文件

2. `touch .prettierrc`

   - 终端输入
   - 生成一个 JSON 文件.prettierrc 以将我们的配置放入其中

   ```json
   # semi 末尾是否添加分号
   # Object、Array最后是否添加逗号
   # singleQuote 是否使用单引号
   # printWidth 但行字符最长的长度
   {
     "semi": true,
     "trailingComma": "none",
     "singleQuote": true,
     "printWidth": 80
   }
   ```

3. `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`
   - eslint-config-prettier：关闭所有可能干扰 Prettier 规则的 ESLint 规则
   - eslint-plugin-prettier：将更漂亮的规则转换为 ESLint 规则

### eslint

plugins

- elsint
- @typescript-eslint/parser
- @typescript-eslint/eslint-plugin

1. `eslint-config-airbnb` 使用
   package:
   - eslint-config-airbnb
   - eslint
   - eslint-plugin-import
   - eslint-plugin-react
   - eslint-plugin-react-hooks
   - eslint-plugin-jsx-a11y
     > eslint-config-airbnb 开启(react-hooks)使用 需要在 extends 中 add `['airbnb','airbnb/hooks']`
2. `@typescript-eslint/eslint-plugin` 使用
   package:

   - @typescript-eslint/parser
   - @typescript-eslint/eslint-plugin
     > tips:
     > It is important that you use the same version number for @typescript-eslint/parser and @typescript-eslint/eslint-plugin
     > use:

   ```javaScript
   {
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint"],
     "rules": {
       "@typescript-eslint/rule-name": "error"
     }
   }
   #or
   {
     "extends": ["plugin:@typescript-eslint/recommended"]
   }
   ```

3. `eslint-plugin-promise` 使用 Promise 语法写成最佳实践
   package:

   - npm install eslint-plugin-promise --save-dev
     use:

   ```javaScript
   # 使用推荐的语法
   {
     "extends": ["plugin:promise/recommended"]
   }
   ```

4. `eslint-plugin-unicorn`使用 提供了更多有用的配置项，比如我会用来规范关于文件命名的方式
   package:
   - npm install --save-dev eslint eslint-plugin-unicorn
     use:
   ```javaScript
   # 使用推荐的语法
   {
     "extends": ["plugin:promise/recommended"]
   }
   ```
5. `eslint-config-prettier` 使用 插件会禁用所有和 prettier 起冲突的规则
   package:
   - npm install eslint-config-prettier -D

### stylelint

> npm install stylelint stylelint-config-standard -D

1. 然后在项目根目录新建 .stylelintrc.js 文件，输入以下内容
   ```javaScript
   # glob模式
   module.exports = {
      extends: ['stylelint-config-standard'],
      rules: {
       'comment-empty-line-before': null,
       'declaration-empty-line-before': null,
       'function-name-case': 'lower',
       'no-descending-specificity': null,
       'no-invalid-double-slash-comments': null,
       'rule-empty-line-before': 'always',
      },
      ignoreFiles: ['node_modules/**/*', 'build/**/*']
   }
   ```
2. 优秀的 plugins

   ```shell
   npm install stylelint-order stylelint-config-rational-order stylelint-declaration-block-no-ignored-properties -D

   ```

### tool

1. `.gitignore` 输入 Add gitignore 命令 生成 .gitignore 文件
2. `.npmrc` 终端 `touch .npmrc` 命令 在该文件内输入配置 `registry=https://registry.npm.taobao.org/`

### EditorConfig 统一编辑器风格

1. vscode 安装相应的扩展 EditorConfig For vs Code
2. vscode 中使用快捷键 ctrl+shift+p 打开命令台，输入 Generate .editorcofig 即可快速生成 .editorconfig 文件

### tree shaking

### splitChunks

### tsconfig.json

ts 的 compilerOptions description

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}
```
