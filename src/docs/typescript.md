## learn typescript
### 类型
基本类型: 
```
string number bool 
```

数组 `[]`:  
```
string[]  number[]
```

元祖:  
```
[string, number]. 数组中有不同的数据类型
```

对象:
```
{ name: string; age: number }
```

函数：
```
(arg1: string, arg?: bool) => void
```

Symbol:  
```
let symbol = Symbol("key"); 
```

空：
```
undefined   null
```

任何类型： 
```
any
```

不存在的值： 
```
never
```

### 如何定义类型
`type`  定义类型变量
```
type Person = { name: string; age: number}
ts 使用 const person1：Person = { name: '22', age: 1};
```

`Interfaces` 声明 `对象` 类型的一种方法
```
Interface Person { name: string; age: number}
```

`extends` 类型继承于声明的类型
```
interface a { name: string}
interface b extends a {
	age: number
}
b 的类型等于 { name: string; age: number }
```

in 判断属性是哪个类型中的
```
type PersonListQuery = { user_ids: string[] }
type DogListQuery = { dog_ids: string[] }

function getList(query: PersonListQuery | DogListQuery ) {
	if ('user_ids' in PersonListQuery) {
	 	// 这里可以推导出 query 类型是 PersonListQuery
	}
}

```


### 类型组合

`Required<T>` 将 T 中所有属性变成必选
```
Required<{ a?: bool} > = { a: bool }
```

`Partial<T>` 将 T 中所有属性变成可选
```
Partial<{ a: bool }> = { a?: bool }
```

`Readonly<T>` 将 T 中所有属性变成只读，后续 ts 会检测该类型不允许修改
```
const person2: Readonly<{name: string}> = {name: '22'}
person2.name = '33' //error
```
`Omit<T, keys>` 删除某些属性
```
interface Person {
  name: string;
  age: number;
}
 
type Name = Omit<Person, 'age'>;
Name 的类型定义为 { name: string }
```

`Pick<T, keys>` 选择类型中的某些属性
```
interface Person {
  name: string;
  age: number;
}
type Name = Pick<Person, 'name'>;
Name 的类型定义为 { name: string }
```


`Exclude<T, deleteT>` 删除类型 T 中 deleteT 的类型， 相当于 Omit, 第二个值可以是 keys ，也可以是一个类型变量
```
interface Person {
  name: string;
  age: number;
}
type Age = { age: number }
type Name = Exclude<Person, Age>
Name 的类型定义为 { name: string }
```


`Extract<T, U>` 提取 T 继承于的 U 类型
```
type Person = {  name: string ; age: number } 
type PersonDetail = { pet: any; phone: number } 
type Name = { name: string }
type Name = Extract<Person | PersonDetail , Name>
 将提取出含有 name 的类型 Person
```


`Parameters<function T>` 获取函数类型的函数类型
```
type getName = (perpson: Person) => string;
type queryType = Parameters<getName>;
queryType  的类型定义为 Person
```

`ReturnType<function T>` 获取函数类型的返回值类型
```
type getName = (perpson: Person) => string;
type resType = ReturnType<getName>;
valueType 类型为 string
```

`Awaited<Promise Type>` 获取异步返回的值类型
```
type getPerson = (id: string) => Promise<Person>
type resType = ReturnType<getPerson> // Promise<Person>
type valueType = Awaited<resType> // Person
```

`Record<K extends keyof any, T>`  定义对象的 key 键类型
```
type Keys = 'name' | 'age' 
type person = Record<Keys, any>
// person 的属性只能为 name 和 age
```

`NonNullable<T>` 去除类型中定义的 null 和 undefined 
```
type PersonHobby = hobby: string | undefined;
type Hobby = NonNullable<hobby>
Hobby 类型为  string
```

### 类型操作

`typeof Object` 获得`对象`的类型
```
const person1 = { name: '22', age: 1}
type Person = typeof person1
Person 类型为 { name: string; age: number }
```

`keyof T`  获得类型中的属性
```
type Person = { name: string; age: number }
type Key = keyof Person 
key 的类型为 'name' | 'age'
```
通常我们可以通过 keyof 约束对象的传参， 如
```
type Person = { name: string; age: number }
type Key = keyof Person;
type getPersonAtrribute = (person: Person, key: Key) => Person[Key];
```
或者某些情况下我们想知道一个对象的属性值 
```
const workPerson = { 
	'1': { name: '1', age: 1},
	'2': { name: '2', age: 2},
}
type WorkPerson  = typeof workPerson;  // { '1': {name: string; age: number }, '2': {name: string; age: number }
type Key = keyof WorkPerson  // '1' | '2'
type Person = WorkPerson[Key]   // {name: string; age: number }
```
 `|` 类型兼容
```
type width = 'string' | 'number';

则 width 可以是 '32px' 也可以是 '32' 在 渲染时兼容两种类型
```


### 函数重载

定义不同类型的输入，推到出不同类型的输出

```
type PersonListQuery = { user_ids: string[] };
type DongListQuery = { dog_ids: string[] };
function getList(request: PersonListQuery): Person[];
function getList(request: DogListQuery): Dog[];

function getList(query: PersonListQuery | DogListQuery) {
  if ('user_ids' in query) {  
    return [] as Person[];
  } else {
    return [] as Dog[];
  }
}

const a = getList({ personIds: [], region: 'us'})
此时 a 的类型将能推到出是 Person[]
```

### 泛型
类型的传参。 用 T 标识，在实际运用时你传入什么类型，该类型就作为后续推导。
```
async function request<T>(url: string): Promise<T> {
  const res = await fetch(url)
  return res.json();
}

const res = await request<Person>('getPersonInfo?id=1'); 
此时 ts 可以推导出 res 的类型是 Person
```

### Infer  类型参数使用
通过 Infer 一个类型为变量，定义出获取类型的方法
```
type addResultType<T> = T extends { a: infer U, b: infer U } ?  U : never;
type numberAdd =  addResultType<{ a: 1, b: 2 }>     // 推到出结果类型为 number
type textAdd = addResultType<{ a: 'hello', b: 'world' }>     // 推到出结果类型为 string
```


### 枚举 enum
变量的值是约定的几个取值

```
const enum PageType {
  HOME = 'home',
  VIDEO = 'video',
}

function getPageUrl(page: PageType) {
  return {
    [PageType.VIDEO]: "/video",
    [PageType.HOME]: "/home",
  }[page];
}
```


## tsconfig
了解了 ts 对于类型的定义和各种规则后，我们则可以在编写 js 代码时利用并进行类型约束。于此同时，我们需要引入 typescript 库去获得这些 ts 能力。

### 如何引入
```
npm install  typescript  
// 不必再多说
```

### 命令
typescript 包是有命令文件的，通常 ts 的运行则是通过 tsc 配合相关命令去执行的. 具体命令大家可以安装包之后通过 tsc -h 查看
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/349ffc362f0d831a780d2d7f754893a1.png)

### 配置 [官网](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
如果你看了 tsc 命令，你会发现它是有很多命令的，并且有的命令还伴随这相关参数。在工作文件夹中，我们则通过配置文件 `tsconfig.js ` 去配置，保证在项目中的运用。 配置参数这里就不细讲了，还是看官方文档靠谱点。
