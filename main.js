import testFun from './src/testFun.js';
import supplierList from './src/supplierList/index.js';

const COMPONENTS = [
    supplierList
]

class SmartxComponents {
    static install() {
        COMPONENTS.map(e => e.install())
    }
}

export {
    // 全局注册
    SmartxComponents,
    SmartxComponents as default,
    // 按需注册
    supplierList,
    // 导出函数、类
    testFun
}