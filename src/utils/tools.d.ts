// Partial实现原理解析
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 指定 T 类型的 key 变为可选
// K extends keyof T 将 K 约束为 keyof T 的子类型
type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
}

// Readonly实现原理解析
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Pick实现原理解析
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Record实现原理解析
type Record<K extends keyof any, T> = {
  [P in K]: T
}

// Pick、Readonly、Partial 都是同态的 值会被拷贝
// Record 是非同态的 值不会被拷贝

// Exclude原理解析
// 去除指定的 key
type Exclude<T, U> = T extends U ? never : T

// Extract原理解析
// 取指定的 key
type Extract<T, U> = T extends U ? T : never

// Omit原理解析
type Omit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P]
}

// Parameters 获取函数的参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

// ReturnType 获取函数返回类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
