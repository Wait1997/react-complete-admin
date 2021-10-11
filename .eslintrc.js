/**
 * "off"或0- 关闭规则
 * "warn"或1- 开启规则，使用警告级别的错误：warn(不会导致程序退出)
 * "error"或2- 开启规则，使用错误级别的错误：error(当被触发的时候，程序会退出)
 */

/**
 * tip: 您必须禁用基本规则，因为它会报告不正确的错误(两者同时使用时需要这样)
 * url: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
 * no-use-before-define”："off"
 * @typescript-eslint/no-use-before-define": [ "error" ]
 */

const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  /**
   * extends属性值可以由以下组成：
   * plugin:
   * 包名 (省略了前缀，比如，react)
   * /
   * 配置名称 (比如recommended)
   * ---------------------------------------
   * 插件一个主要的作用就是补充规则
   * 比如eslint:recommended中没有有关react的规则
   * 则需要另外导入规则插件eslint-plugin-react
   * ---------------------------------------
   */
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 12, // 支持的es的版本 12表示2021年
    sourceType: 'module'
  },
  // plugins属性值可以省略包名的前缀eslint-plugin-
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json']
      },
      typescript: {}
    }
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never'
      }
    ],

    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'import/prefer-default-export': OFF,
    'import/no-unresolved': ERROR,
    'import/no-dynamic-require': OFF,

    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true
        }
      }
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN,
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax']
      }
    ],
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,
    'unicorn/no-array-reduce': OFF,
    'unicorn/import-style': OFF,
    'unicorn/prefer-module': OFF,

    'promise/always-return': OFF,
    'promise/catch-or-return': OFF,

    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-var-requires': OFF, // 关闭 require() 引入报错
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-use-before-define': ERROR, // 禁止定义前使用
    '@typescript-eslint/no-unused-vars': WARN,
    'no-unused-vars': OFF,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
    'react/no-unused-prop-types': OFF,

    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,

    'prettier/prettier': ['error', { arrowParens: 'always' }],

    'lines-between-class-members': [ERROR, 'always'], // 要求或禁止类成员之间出现空行
    'linebreak-style': [ERROR, 'unix'], // 强制使用一致的换行风格
    quotes: [ERROR, 'single'], // 强制使用单引号
    semi: [ERROR, 'never'],
    'no-unused-expressions': WARN,
    'no-plusplus': OFF,
    'no-console': WARN,
    'no-param-reassign': OFF,
    'class-methods-use-this': ERROR,
    'jsx-quotes': [ERROR, 'prefer-single'],
    'global-require': OFF, // 要求 require() 出现在顶层模块作用域中
    'no-use-before-define': OFF, // 禁止在变量定义之前使用它们
    'no-restricted-syntax': OFF, // 禁用特定的语法
    'no-var': WARN,
    'no-continue': OFF
  }
}
