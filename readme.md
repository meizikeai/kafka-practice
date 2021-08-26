# kafka-practice

### 项目构架

基于[kafka](https://kafka.js.org)构建，支持[mysql](https://www.npmjs.com/package/mysql)、[redis](https://www.npmjs.com/package/redis)查询，依赖[Node.js](https://nodejs.org)环境。

#### 项目地址

https://github.com/meizikeai/kafka-practice.git

#### 项目结构

| 路径   | 描述     | 详情 |
| ------ | -------- | ---- |
| pm2    | 进程守护 | -    |
| server | 服务文件 | -    |

#### 开发环境

  + 克隆项目 - `$ git clone https://github.com/meizikeai/kafka-practice.git`
  + 安装依赖 - `$ cd kafka-practice && npm i`
  + 启动项目 - `$ npm run start`

#### 代码提交

使用了@commitlint/cli / @commitlint/config-conventional的勾子，支持以下方式提交

  + feat[特性]: 新增feature
  + fix[修复]: 修复bug     
  + docs[文档]: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
  + style[格式]: 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
  + refactor[重构]: 代码重构，没有加新功能或者修复bug
  + perf[优化]: 优化相关，比如提升性能、体验
  + test[测试]: 测试用例，包括单元测试、集成测试等
  + chore[工具]: 改变构建流程、或者增加依赖库、工具等
  + revert[回滚]: 回滚到上一个版本

#### 帮助文档

  + Producer https://kafka.js.org/docs/producer-example
  + Consumer https://kafka.js.org/docs/consumer-example
