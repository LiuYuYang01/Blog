# React

## 快速入门

### 表达式

```javascript
function App(){
  const msg = 'this is message'

  function getAge(){
    return 18
  }
    
  const list = [<div>1</div>, <div>2</div>, <div>3</div>]
    
  return (
    <div>
      <h1>this is title</h1>
      {/* 字符串识别 */}
      {'this is str'}
      {/* 变量识别 */}
      {msg}
      {/* 变量识别 */}
      {msg}
      {/* 函数调用 渲染为函数的返回值 */}
      {getAge()}
      {/* 渲染数组的数据 */}
      {list}
      {/* 三元表达式 */}
      {true ? <h1>H1</h1> : <h2>H2</h2>}
      {/* 条件表达式 */}
   	  <h3>{isShow && '显示'}</h3>

      {/* JSX本身也可以当做表达式放在插值符号中，往往配合其它的使用方式 */}
      <h4>{<span>123</span>}</h4>
    </div>
  )
}
```

**注意：**

1、 `null`、`undefined`、`boolean` 不会在 `JSX` 表达式中显示

2、对象不能直接放在 `JSX` 当中，会报错



### 列表渲染

```javascript
function App(){
  const list = [
    {id:1001, name:'Vue'},
    {id:1002, name: 'React'},
    {id:1003, name: 'Angular'}
  ]
    
  return (
    <ul>
      {list.map(item=><li key={item.id}>{item.name}</li>)}
    </ul>
  )
}
```



### 条件渲染

```javascript
const flag = true
const loading = true

function App() {
  return (
    <>
      {flag && <span>Hello</span>}
      {loading ? <span>加载中~</span> : <span>加载成功</span>}
    </>
  );
}

export default App;
```



复杂条件渲染

```javascript
const type = 2

const getArticleJSX = () => {
  switch (type) {
    case 1:
      return <h1>无图模式</h1>
    case 2:
      return <h1>单图模式</h1>
    case 3:
      return <h1>多图模式</h1>
  }
}

function App() {
  return (
    <>
      {getArticleJSX()}
    </>
  );
}

export default App;
```



### 事件

```javascript
function App() {
    const clickHandler = () => {
    	console.log("button被点击了");
    }
    
  return (
    <>
      {<button onClick={clickHandler}>click me</button>}
    </>
  );
}

export default App;
```



event

```javascript
const clickHandler1 = (n) => {
  console.log("button被点击了1", n);
}

const clickHandler2 = (e, n) => {
  console.log("button被点击了2", e, n);
}

function App() {
  return (
    <>
      {<button onClick={() => clickHandler1(100)}>click me</button>}
      {<button onClick={(e) => clickHandler2(e, 200)}>click me</button>}
    </>
  );
}

export default App;
```



## 组件

```javascript
// 定义一个组件
const Button = () => {
  return <button>按钮</button>
}

function App() {
  return (
    <>
      {/* 使用组件 */}
      {<Button />}
      {<Button></Button>}
    </>
  );
}

export default App;
```



## 样式

```css
.sty {
    color: red;
}
```

```javascript
import "./index.css"

function App() {
  // 属性名不可以连写，必须遵循大驼峰命名
  const sty = { backgroundColor: 'red' }

  return (
    <>
      {/* 设置数值可以不加单位，默认就是px */}
      <h1 style={{ fontSize: 20 }}>Hello World!</h1>
      <h1 style={sty}>Hello World!</h1>

      {/* 推荐写法 */}
      <h1 className="sty">Hello World!</h1>
      <h1 className={`sty ${1 === 1 && 'axtive'}`}>Hello World!</h1>
    </>
  )
}

export default App;
```



## 事件

```javascript
const App = () => {
  const btn = () => {
    console.log('事件触发了')
  }

  return (
    <>
      <button onClick={btn}>按钮</button>
    </>
  )
}

export default App
```

**注意：** `onClick` 事件需要接收的是一个函数，所以它的值不能是函数的调用，但这样的话就不能传参了，那么我们可以这么做

```javascript
const App = () => {
  const btn = (n: number) => {
    console.log(n)
  }

  return (
    <>
      <button onClick={() => btn(100)}>按钮</button>
    </>
  )
}

export default App
```



## 表单绑定

```javascript
import { useState } from "react";

function App() {
  const [value, setValue] = useState('')

  const change = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <h1>{ value }</h1>
      <input value={value} onChange={change} />
    </>
  );
}

export default App;
```



## 获取DOM

```javascript
import { useRef, useState } from "react";

function App() {
  const domRef = useRef()

  // 视图还未渲染成功，无法获取
  console.log(domRef.current) // undefined

  // 暂时可以这么做
  setTimeout(() => console.log(domRef.current))

  return (
    <>
      <h1 ref={domRef}>Hello World!</h1>
    </>
  );
}

export default App;
```



## 组件

### 父传子

```javascript
// 子组件
const Son = (props) => {
  console.log(props); // {msg: 'Hello World!', age: 20, is: true, list: Array(3), obj: {…}, …}

  return <h1>{props.msg}</h1>
}

// 父组件
function App() {
  return (
    <>
      <Son msg={'Hello World!'} age={20} is={true} list={[1, 2, 3]} obj={{ name: "jack" }} cb={() => console.log(123)} child={<span>Hello</span>} />
    </>
  );
}

export default App;
```



当给组件中传递一个html标签，可以在组件中通过children来接收

```javascript
// 子组件
const Son = (props) => {
  console.log(props); // {children: {…}}

  return props.children
}

// 父组件
function App() {
  return (
    <>
      <Son>
        <h1>Hello World!</h1>
      </Son>
    </>
  );
}

export default App;
```



### 子传父

```javascript
// 子组件
const Son = ({ onGetMsg }) => {
  return <h1 onClick={() => onGetMsg('Hello World!')}>Hello World!</h1>
}

// 父组件
function App() {
  const getMsg = (msg) => {
    console.log(msg);
  }

  return (
    <>
      <Son onGetMsg={getMsg} />
    </>
  );
}

export default App;
```



### 兄弟组件通信

子组件（A）给父组件传值，父组件再把值传给子组件（B）

```javascript
import { useState } from "react"

const A = ({ onSetMsg }) => {
  const msg = "Hello World!"

  return <button onClick={() => onSetMsg(msg)}>按钮</button>
}

const B = ({ msg }) => {
  return <h1>{msg}</h1>
}


function App() {
  const [msg, setMsg] = useState("")

  return (
    <>
      <A onSetMsg={(msg) => setMsg(msg)} />
      <B msg={msg} />
    </>
  );
}

export default App;
```



### 跨组件通信

```javascript
import { createContext, useContext } from "react"

// 1. 创建上下文对象
const MsgContext = createContext()

const A = () => {
  // 3. 获取数据
  const msg = useContext(MsgContext)
  console.log(msg); // Hello World!

  return <h1>{msg}</h1>
}


function App() {
  const msg = "Hello World!"

  return (
    <>
      {/* 2. 传递数据 */}
      <MsgContext.Provider value={msg}>
        <A />
      </MsgContext.Provider>
    </>
  );
}

export default App;
```



### 展开props

```javascript
const MyInput = (props: { type: string, placeholder: string }) => {
  return (
    <>
      <input {...props} />
      {/* 等价于：<input type="text" placeholder="请输入账号" /> */}
    </>
  )
}

const App = () => {
  return (
    <>
      <MyInput type="text" placeholder="请输入账号"></MyInput>
    </>
  )
}

export default App
```



## Hooks

自定义 `Hook` 是以 `use` 开头的函数，通过自定义 `Hook` 函数可以用来实现逻辑的封装和复用

**注意：** 自定义 `Hook` 不能在函数组件外部调用并且不能嵌套在 if、for、其他函数中

```javascript
import { useState } from "react";

// 自定义Hooks
const useToggle = () => {
  const [value, setValue] = useState()

  const toggle = () => {
    setValue(!value)
  }

  return { value, toggle }
}

// const { value, toggle } = useToggle() 不能在这里调用！！

function App() {
  const { value, toggle } = useToggle()

  return (
    <>
      <button onClick={toggle}>按钮</button>
      {value && <h1>Hello World!</h1>}
    </>
  );
}

export default App;
```



### useEffect

等组件渲染成功后触发useEffect里面的代码，通常用于发起网络请求、操作dom等

```javascript
import axios from "axios"
import { useEffect, useState } from 'react'

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data: { data } } = await axios.get("http://geek.itheima.net/v1_0/channels")
      setList(data.channels)
    }

    getData()
  }, [])

  return (
    <>
      <ul>
        {
          list.map(item => (
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
    </>
  );
}

export default App;
```



他的第一个参数是一个回调函数，第二个参数是一个数组

如果不写就表示初始执行一次，并且每当组件的数据发生变化都会触发。如果指定对应的状态变量则表示只有指定的数据发生变化才会触发，如果为空表示只在组件渲染成功后执行一次

```javascript
import { useEffect, useState } from 'react'

function App() {
  const [num, setNum] = useState(1)

  // 在组件渲染完毕后与组件状态变量发生变化后都会触发
  // useEffect(() => {
  //   console.log("useEffect触发了~");
  // })

  // 在组件渲染完毕后只触发一次
  // useEffect(() => {
  //   console.log("useEffect触发了~");
  // }, [])

  // 在组件渲染完毕后触发一次，当指定的状态变量num发生变化后还会触发
  useEffect(() => {
    console.log("useEffect触发了~");
  }, [num])

  const btn = async () => {
    setNum(num + 1)
  }

  return (
    <>
      <button onClick={btn}>按钮</button>
    </>
  );
}

export default App;
```



清除副作用：当我们在useEffect中书写定时器等代码，那么当组件被销毁后定时器并没有释放资源。所以可以在useEffect里面返回一个函数，当组件被卸载后就会触发返回的这个函数，我们可以在这个函数里面做一些清理逻辑

```javascript
import { useEffect, useState } from "react";

function Son() {
  // 默认情况下组件被卸载后，定时器等代码并没有被销毁，还会继续执行
  // useEffect(() => {
  //   let n = 1;

  //   setInterval(() => {
  //     console.log(n++);
  //   }, 500)
  // }, [])

  useEffect(() => {
    let n = 1;

    const time = setInterval(() => {
      console.log(n++);
    }, 500)

    // 组件被卸载时自动执行
    return () => {
      clearInterval(time)
    }
  }, [])
}

function App() {
  const [is, setIs] = useState(true)
  const btn = () => setIs(false)

  return (
    <>
      {is && <Son />}
      <button onClick={btn}>销毁组件</button>
    </>
  );
}

export default App;
```



### useMemo

默认情况下 `React` 组件中的状态发生变化就会导致整个组件重新渲染

就比如下面这段代码：当我们点击 `5` 次 按钮 `A`，此时就会调用 `5` 次 `fn` 函数。而当我们点击了按钮 `B` 改变了 `b` 的状态，此时也会触发`5` 次 `fn` 函数

这种情况是因为状态每次发生变化时都会重新渲染组件，重新触发循环打印数据

```javascript
import { useMemo, useState } from "react";

const Home = () => {
  const [a, setA] = useState(1)
  const [b, setB] = useState(1)

  const fn = () => {
    let n = 0;

    for (let i = 1; i <= a; i++) {
      console.log(i);
      n += i
    }

    return n
  }

  fn()

  return (
    <>
      <button onClick={() => setA(a + 1)}>按钮 A</button>
      <button onClick={() => setB(b + 1)}>按钮 B</button>
    </>
  )
}

export default Home
```



我们可以通过 `useMemo` 来解决这个问题

```javascript
import { useMemo, useState } from "react";

const Home = () => {
  const [a, setA] = useState(1)
  const [b, setB] = useState(1)

  const fn = () => {
    let n = 0;

    for (let i = 1; i <= a; i++) {
      console.log(i);
      n += i
    }

    return n
  }

  const n = useMemo(fn, [a])

  return (
    <>
      <h1>{n}</h1>
      <button onClick={() => setA(a + 1)}>按钮 A</button>
      <button onClick={() => setB(b + 1)}>按钮 B</button>
    </>
  )
}

export default Home
```

这样的话只有依赖的数据 `a` 发生变化才会重新触发 `fn` 函数，如果没有发生变化，就会将 `a` 的值缓存起来



### useCallback

### useContext

当我们的组件越来越复杂时，组件通信就会非常繁琐，需要将数据一层一层的传递下去，这显然不是一个很好的办法，所以我们可以使用`useContext` 来解决这个问题

**演示：** 多层组件的数据传递与接收

```javascript
import { useContext, createContext } from "react";

const MyContext = createContext<string>("")

const Home = () => {
  const data = "Hello World!"

  return (
    <>
      {/* 传递数据 */}
      <MyContext.Provider value={data}>
        <AAA></AAA>
      </MyContext.Provider>
    </>
  )
}

const AAA = () => {
  return (
    <>
      <BBB></BBB>
    </>
  )
}
const BBB = () => {
  return (
    <>
      <CCC></CCC>
    </>
  )
}
const CCC = () => {
  // 接收数据
  const data = useContext(MyContext)

  return (
    <>
      <h1>{data}</h1>
    </>
  )
}

export default Home
```

当然不止 `CCC` 组件可以接收，只要是在 `<MyContext.Provider>` 标签包裹的组件都可以接收传递过来的数据



### useState

`useState` 的返回值是一个数组

第一个参数是状态变量，第二个参数是 `set` 函数，用来修改状态变量，而 `useState` 的参数作为初始值

```javascript
import { useState } from "react";

function App() {
  const [num, setNum] = useState(1)

  const btn = () => {
    // num = num + 1 不能赋值, 只能修改
    setNum(num + 1)
  }

  return (
    <>
      <h1>{num}</h1>
      <button onClick={btn}>按钮</button>
    </>
  );
}

export default App;
```

需要注意的 `useState` 的状态变量是只读的，不能直接给赋值，会丢失响应式。需要通过 `set` 函数修改



**修改复杂数据**

```javascript
import { useState } from "react";

function App() {
  const [obj, setObj] = useState({ name: "yuyang", age: 21 })

  const btn = () => {
    setObj({
      ...obj,
      age: 22
    })
  }

  return (
    <>
      <h1>{obj.name} {obj.age}</h1>
      <button onClick={btn}>按钮</button>
    </>
  );
}

export default App;
```



### useRef



### React.memo

允许组件在 `Props` 没有改变的情况下跳过渲染

默认情况下父组件的数据发生变化就会引发组件重新渲染，从而也会影响到子组件的重新渲染，如果我们不想让子组件重新渲染可以这么做，通过 `React.memo` 做一个缓存，只要 `props` 的值不发生变化，就不会重新渲染子组件

```javascript
import { memo, useState } from "react";

const Son = memo(() => {
  console.log("子组件重新渲染");

  return (
    <>
      <h1>Son</h1>
    </>
  )
})

const App = () => {
  console.log("父组件重新渲染");

  const [count, setCount] = useState(0)

  return (
    <>
      <Son/>
      <button onClick={() => setCount(count + 1)}>按钮</button>
    </>
  )
}

export default App
```



**props比较机制**

如果是基本数据类型那么在值修改时候他会对比旧值，如果没有发生变化就不会触发子组件重新渲染。

但如果是引用类型，比如数组在更新时候他的引用地址变了，就会导致与之前旧值的地址不一样，从而就会触发子组件重新渲染

```javascript
import { memo, useState } from "react";

const Son = memo(({ list }: { list: number[] }) => {
  console.log("子组件重新渲染");

  return (
    <>
      <h1>Son</h1>
    </>
  )
})

const App = () => {
  console.log("父组件重新渲染");

  const [list, setList] = useState([1, 2, 3])

  return (
    <>
      <Son list={list}></Son>
      <button onClick={() => setList([1, 2, 3])}>按钮</button>
    </>
  )
}
```



### React.forwardRef

`forwardRef` 用于在组件中转发 `ref` 属性到子组件，以便可以从父组件访问子组件的 `DOM` 元素或实例，简单来说就是可以在父组件中拿到子组件的 `dom` 元素并进行一些操作，如：表单聚焦

```javascript
import { useRef, useState, forwardRef } from "react";
import type { LegacyRef } from 'react'

const MyInput = forwardRef((props, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <>
    	<input type="text" placeholder="请输入账号" ref={ref} />
    </>
  )
})

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <MyInput ref={inputRef}></MyInput>
      <button onClick={() => inputRef.current?.focus()}>聚焦</button>
    </>
  )
}

export default App
```



### useImperativeHandle

`useImperativeHandle` 的作用是搭配 `forwardRef` 暴露自定义的函数或属性给外部组件

```javascript
"use client"

import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";

const MyInput = forwardRef((props, ref) => {
  const data = "Hello World!"

  // 定义暴露给父组件的属性或方法
  // 定义之后会自动添加到对应的ref上
  useImperativeHandle(ref, () => ({
    data,
    fn: () => console.log(data)
  }))

  return (
    <>
      <h1>{data}</h1>
    </>
  )
})

const App = () => {
  const myInputRef = useRef<{ data: string, fn: () => void }>(null)

  useEffect(() => {
    // 调用子组件的属性或方法
    console.log(myInputRef.current?.data);
    myInputRef.current?.fn()
  }, [])

  return (
    <>
      <MyInput ref={myInputRef}></MyInput>
    </>
  )
}

export default Home
```



## 配置 @ 快捷路径

**tsconfig.json**

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    // ...
  }
```



**vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
})
```



# Router

```
npm i react-router-dom
```



最小应用

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入路由
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function Aricle(){
    return <h1>Aricle</h1>
}

function Cate(){
    return <h1>Cate</h1>
}

// 创建路由表
const router = createBrowserRouter([
    {
        path: "/article",
        element: <Aricle />
    },
    {
        path: "/cate",
        element: <Cate />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // 使用路由
    <RouterProvider router={router}></RouterProvider>
);
```



## 路由跳转

### 声明式导航

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

function Aricle() {
    return (
        <>
            <Link to="/cate">跳转到分类页</Link>
            <h1>Aricle</h1>
        </>
    )
}

function Cate() {
    return (
        <>
            <Link to="/article">跳转到文章页</Link>
            <h1>Cate</h1>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/article",
        element: <Aricle />
    },
    {
        path: "/cate",
        element: <Cate />
    }
])
// 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RouterProvider router={router}></RouterProvider>
);
```



### 编程式导航

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Link, useNavigate } from 'react-router-dom'

function Aricle() {
    const navigate = useNavigate()

    return (
        <>
            <button onClick={() => navigate('/cate')}>跳转到分类页</button>
            <h1>Aricle</h1>
        </>
    )
}

function Cate() {
    const navigate = useNavigate()
    
    return (
        <>
            <button onClick={() => navigate('/article')}>跳转到文章页</button>
            <h1>Cate</h1>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/article",
        element: <Aricle />
    },
    {
        path: "/cate",
        element: <Cate />
    }
])
// 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RouterProvider router={router}></RouterProvider>
);
```



### Navigate

`<Navigate>` 元素在渲染时会改变当前位置。它是 [`useNavigate`](https://baimingxuan.github.io/react-router6-doc/hooks/use-navigate) 的组件包装器，并接受与 props 相同的参数。

```javascript
import { persistence } from '@/utils'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = persistence.getToken()

  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthRoute
```



### 跳转传参

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Link, useNavigate, useSearchParams, useParams } from 'react-router-dom'

function Aricle() {
    const navigate = useNavigate()

    const [params] = useSearchParams()
    console.log(params); // URLSearchParams {size: 1}

    const params1 = useParams() // {id: '100'} 111

    return (
        <>
            <button onClick={() => navigate('/cate?name=大前端')}>跳转到分类页</button>
            <h1>Aricle query参数：{params1.id} {params.get('title')}</h1>
        </>
    )
}

function Cate() {
    const [params] = useSearchParams()

    return (
        <>
            <Link to="/article/100?title=大前端新趋势">跳转到文章页</Link>
            <h1>Cate params参数：{params.get('name')}</h1>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/article/:id",
        element: <Aricle />
    },
    {
        path: "/cate",
        element: <Cate />
    }
])
// 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RouterProvider router={router}></RouterProvider>
);
```



## 嵌套路由

### 二级路由

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入路由
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom'

// 头部组件
function Header() {
    return (
        <>
            <h1>Header</h1>
        </>
    )
}

// 页脚组件
function Footer() {
    return (
        <>
            <h1>Footer</h1>
        </>
    )
}

// 布局
function Layout() {
    return (
        <>
            <Header />

            <Link to="/">首页</Link>
            <Link to="/article">文章页</Link>
            <Link to="/cate">分类页</Link>

            {/* 类似于router-view */}
            <Outlet />

            <Footer />
        </>
    )
}

// 首页
function Index() {
    return (
        <>
            <h1>Index</h1>
        </>
    )
}

// 文章页
function Article() {
    return (
        <>
            <h1>Article</h1>
        </>
    )
}

// 分类页
function Cate() {
    return (
        <>
            <h1>Cate</h1>
        </>
    )
}

// 登录页
function Login() {
    return (
        <>
            <h1>Login</h1>
        </>
    )
}

// 路由表
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // 二级路由
        children: [
            {
                // 设置为主页，当路由访问父路径相当于访问了这个
                index: true,
                element: <Index />
            },
            {
                path: "article",
                element: <Article />
            },
            {
                path: "cate",
                element: <Cate />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // 注入路由
    <RouterProvider router={router}></RouterProvider>
);
```



### 404配置

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入路由
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

// 首页
function Index() {
    return (
        <>
            <Link to="/">首页</Link>
            <Link to="/article">文章页</Link>
            <Link to="/cate">分类页</Link>

            <h1>Index</h1>
        </>
    )
}

// 文章页
function Article() {
    return (
        <>
            <h1>Article</h1>
        </>
    )
}

// 404页
function NotFound() {
    return (
        <>
            <h1>404：页面未找到</h1>
        </>
    )
}

// 路由表
const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/article",
        element: <Article />
    },
    {
        path: "*",
        element: <NotFound />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // 注入路由
    <RouterProvider router={router}></RouterProvider>
);
```



## 路由模式

各个主流框架的路由常用的路由模式有俩种，history模式和hash模式, ReactRouter分别由 createBrowerRouter 和 createHashRouter 函数负责创建

| 路由模式 | url表现     | 底层原理                    | 是否需要后端支持 |
| -------- | ----------- | --------------------------- | ---------------- |
| history  | url/login   | history对象 + pushState事件 | 需要             |
| hash     | url/#/login | 监听hashChange事件          | 不需要           |



## 路由懒加载

```

```



# Redux

**安装**

```
npm i @reduxjs/toolkit  react-redux
```



## 快速上手

1、定义一个最简单的 `Store` 模块


```javascript
// src/store/modules/CountStore.js

import { createSlice } from '@reduxjs/toolkit'

const countStore = createSlice({
    // 自定义一个独一无二模块名称
    name: "count",
    // 在这里定义数据
    initialState: {
        n: 1
    },
    // 在这里定义方法，用于修改状态
    reducers: {
        add(state) {
            state.n++
        },
        minus(state) {
            state.n--
        }
    },
})

// 解构出reducers中的方法
const { add, minus } = countStore.actions

// 获取reducer函数
const countReducer = countStore.reducer

// 导出
export { add, minus }
export default countReducer
```



2、注册 `Store` 模块

```javascript
// src/store/index.js

import { configureStore } from '@reduxjs/toolkit'

// 导入此状态模块
import countReducer from './modules/CountStore'

export default configureStore({
    reducer: {
        // 注册模块
        count: countReducer
    }
})
```



3、最后一步

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'

// 导入store
import store from './store'
// 导入store提供的组件Provider
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // 提供store数据
    <Provider store={store}>
        <App />
    </Provider>
);
```



在页面中使用

```javascript
// src/App.js

import { useDispatch, useSelector } from "react-redux";
// 导入Store中的方法
import { add, minus } from './store/modules/CountStore'

function App() {
  // 导入Store中的数据
  const { n } = useSelector(state => state.count)
  // 方法必须当做参数传给dispatch进行使用
  const dispatch = useDispatch()

  return (
    <>
      <button onClick={() => dispatch(add())}>+</button>
      <span>{n}</span>
      <button onClick={() => dispatch(minus())}>-</button>
    </>
  );
}

export default App;
```



## 传递参数

可以通过 `reducers` 中的方法的第二个参数来接收传递的数据，如果需要传递多个数据，那么可以传递一个对象

```javascript
const countStore = createSlice({
    name: "count",
    // 在这里定义数据
    initialState: {
        n: 1
    },
    reducers: {
        add(state, action) {
            // 有值就根据指定的值相加，没有值就加1
            action.payload ? state.n += action.payload : state.n++

        },
        minus(state, action) {
            action.payload ? state.n -= action.payload : state.n--
        }
    },
})
```

```javascript
function App() {
  // ...

  return (
    <>
      <button onClick={() => dispatch(add(10))}>+</button>
      <span>{n}</span>
      <button onClick={() => dispatch(minus())}>-</button>
    </>
  );
}
```



## 异步操作

```javascript
import { useDispatch, useSelector } from "react-redux";
import { getDataList } from './store/modules/CountStore'
import { useEffect } from "react";

function App() {
  const { list } = useSelector(state => state.count)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataList())
  }, [dispatch])

  return (
    <>
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </>
  );
}

export default App;
```



```javascript
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const countStore = createSlice({
    // 自定义一个独一无二模块名称
    name: "count",
    // 在这里定义数据
    initialState: {
        list: []
    },
    // 在这里定义方法，用于修改状态
    reducers: {
        setList(state, actions) {
            // 只能只能同步赋值，不能异步赋值
            state.list = actions.payload
        }
    },
})

// 解构出reducers中的方法
const { setList } = countStore.actions

// 获取reducer函数
const countReducer = countStore.reducer

// 获取接口中的数据
const getDataList = () => {
    // 必须返回一个函数，因为不能在外层使用async，否则外层函数就变成了promise，不符合dispatch参数类型
    return async (dispatch) => {
        const { data: { data } } = await axios.get("http://geek.itheima.net/v1_0/channels")
        dispatch(setList(data.channels))
    }
}

export { getDataList }
export default countReducer
```



# 极客园项目

## 路由守卫

1. 定义一个组件，将需要登录后才能访问的页面插入到组件中，比如 `Layout`

```javascript
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
```



2. 通过 `children` 拿到插入的组件 `Layout`

3. 如果有 `token` 就渲染这个组件，没有 `token` 就跳转到登录页

```javascript
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = persistence.getToken()

  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthRoute
```

