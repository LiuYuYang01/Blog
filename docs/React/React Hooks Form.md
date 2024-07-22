# React Hooks Form

快速入门：[Get Started (react-hook-form.com)](https://react-hook-form.com/get-started#Quickstart)



## Register

这种方式适合原生表单，因为原生表单默认提供了 `value` 和 `onChange` 

```react
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@nextui-org/react"
import styles from '@/styles/tailwind/form'
import { useEffect, useState } from "react"

type FormData = {
  first_name: string
  last_name: string
}

export default () => {
  const [defaultValues, setDefaultValues] = useState<FormData>({
    first_name: "刘",
    last_name: "宇阳",
  })

  useEffect(() => {
    // 模拟回显数据
    setTimeout(() => {
      setDefaultValues({
        first_name: "1111",
        last_name: "2222",
      })

      // 更新表单的数据
      // 如果不使用reset就会导致数据虽然在表单中已经更新了，但是点击提交时候还是之前的老数据
      reset({
        first_name: "1111",
        last_name: "2222",
      })
    }, 1500)
  }, [])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({defaultValues});
  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    event?.preventDefault(); // 阻止默认提交行为

    console.log(data)
  }

  return (
    <>
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="text" label="First name" variant="bordered"
            isInvalid={!!errors.first_name?.message} errorMessage={errors.first_name?.message}
            {...register("first_name", { required: "Please enter first name." })}
            {...styles.inputSty} />

          <Input type="text" label="Last name" variant="bordered"
            isInvalid={!!errors.last_name?.message} errorMessage={errors.last_name?.message}
            {...register("last_name", { required: "Please enter last name." })}
            {...styles.inputSty} />

          <input type="submit" />
        </form>
      </div>
    </>
  )
}
```



## Controller

该方式适合使用第三方组件库表单，因为有些表单可能没有提供 `value` 和 `onChange` 

虽然我们也可以使用 `Controller` 与原生表单搭配，或者 `Register` 与 组件库搭配使用。但不推荐



**我们可以根据不同的需求使用两者：**

如果组件库提供了 `value` 和 `onChange` 那么推荐使用 `Register` 方式，这样代码会更加简洁。

如果没有提供，那么就使用 `Controller` 

```react
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@nextui-org/react"
import styles from '@/styles/tailwind/form'
import { useState } from "react"

type FormData = {
  first_name: string
  last_name: string
}

export default () => {
  const [defaultValues, setDefaultValues] = useState<FormData>({
    first_name: "刘",
    last_name: "宇阳",
  })

  const { handleSubmit, control, formState: { errors }, reset, trigger } = useForm<FormData>({ defaultValues });
  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    event?.preventDefault(); // 阻止默认提交行为

    console.log(data)
  }

  return (
    <>
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="first_name"
            control={control}
            rules={{ required: 'Please enter first name.' }}
            render={({ field }) => (
              <Input type="text" label="First name" variant="bordered" isInvalid={!!errors.first_name?.message} errorMessage={errors.first_name?.message} {...field} />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            rules={{ required: 'Please enter last name.' }}
            render={({ field }) => (
              <Input type="text" label="Last name" variant="bordered" isInvalid={!!errors.last_name?.message} errorMessage={errors.last_name?.message} {...field}
                // 如果我们需要用表单的某个事件，可以直接覆盖，但必须保留React Hooks Form的功能：trigger('last_name')
                onBlur={() => trigger('last_name')} {...styles.inputSty} />
            )}
          />

          <input type="submit" />
        </form>
      </div>
    </>
  )
}
```



如果有这样的需求确实需要用到 `onChange` 等表单事件，那么可以这样做：

```react
<Controller
    name="first_name"
    control={control}
    rules={{ required: 'Please enter first name.' }}
    render={({ field }) => (
      <Input ... {...field as any} value={formData.first_name} 
        onChange={(e) => {
        	field.onChange(e);
            // 在这里写你的业务
        }
        
        onBlur={() => trigger('first_name')}/>
    )}
/>
```



## Reset

默认情况下我们修改了默认值，但是在表单提交时候会发现数据还是之前的，并没有被修改掉。这时就需要用到 `reset` 进行重置了

```react
useEffect(() => {
    // 模拟回显数据
    setTimeout(() => {
      setDefaultValues({
        first_name: "1111",
        last_name: "2222",
      })

      // 更新表单的数据
      // 如果不使用reset就会导致数据虽然在表单中已经更新了，但是点击提交时候还是之前的老数据
      reset({
        first_name: "1111",
        last_name: "2222",
      })
    }, 1500)
}, [])
```



## Watch

详情：[watch (react-hook-form.com)](https://react-hook-form.com/docs/useform/watch)

监听某个数据的变化并返回值

```react
import { SubmitHandler, useForm } from "react-hook-form"
import { Button, Input } from "@nextui-org/react"
import styles from '@/styles/tailwind/form'
import { useEffect, useState } from "react"

type FormData = {
  first_name: string
  last_name: string
}

export default () => {
  const [defaultValues, setDefaultValues] = useState<FormData>({
    first_name: "",
    last_name: "",
  })

  const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm<FormData>({ defaultValues });
  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    event?.preventDefault(); // 阻止默认提交行为

    console.log(data)
  }

  // 监听单个数据的变化
  // const data = watch("first_name");
  // const data = watch("first_name", "宇阳"); // 默认值
  // 111

  // 监听多个数据的变化
  // const data = watch(["first_name", "last_name"]);
  // ["111","222"]

  // 监听表单所有数据的变化
  const data = watch();
  // { first_name: '111', last_name: '222' }

  useEffect(() => {
    console.log(data);

    console.log(data.first_name);
    console.log(data.last_name);
  }, [data])

  return (
    <>
      <h1>{JSON.stringify(data)}</h1>

      <div className="p-10">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)() }} className="space-y-4">
          <Input type="text" label="First name" variant="bordered"
            isInvalid={!!errors.first_name?.message} errorMessage={errors.first_name?.message}
            {...register("first_name", { required: "Please enter first name." })}
            onBlur={() => trigger('first_name')}
            {...styles.inputSty} />

          <Input type="text" label="Last name" variant="bordered"
            isInvalid={!!errors.last_name?.message} errorMessage={errors.last_name?.message}
            {...register("last_name", { required: "Please enter last name." })}
            onBlur={() => trigger('last_name')}
            {...styles.inputSty} />

          <Button color="primary" type="submit">提交</Button>
        </form>
      </div>
    </>
  )
}
```



回调方式

```javascript
useEffect(() => {
    const data = watch((value, { name, type }) =>
      console.log(value, name, type)
      // {first_name: '111', last_name: '222'} 'last_name' 'change'
    )

    return () => data.unsubscribe()
  }, [watch])
```



## unregister

移除状态和表单组件

```react
import { SubmitHandler, useForm } from "react-hook-form"
import { Button, Input } from "@nextui-org/react"
import styles from '@/styles/tailwind/form'
import { useState } from "react"

type FormData = {
  first_name: string
  last_name: string
}

export default () => {
  // 核心代码
  const [firstShow, setFirstShow] = useState(true)

  const [defaultValues, setDefaultValues] = useState<FormData>({
    first_name: "",
    last_name: "",
  })

  const { register, handleSubmit, formState: { errors }, trigger, unregister } = useForm<FormData>({ defaultValues });
  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    event?.preventDefault(); // 阻止默认提交行为

    console.log(data)
  }

  // 核心代码
  const handleRemoveFirstName = () => {
    unregister('first_name'); // 移除表单状态
    setFirstShow(false) // 移除表单组件
  };

  return (
    <>
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {firstShow && <Input type="text" label="First name" variant="bordered"
            isInvalid={!!errors.first_name?.message} errorMessage={errors.first_name?.message}
            {...register("first_name", { required: "Please enter first name." })}
            onBlur={() => trigger('first_name')}
            {...styles.inputSty} />}

          <Input type="text" label="Last name" variant="bordered"
            isInvalid={!!errors.last_name?.message} errorMessage={errors.last_name?.message}
            {...register("last_name", { required: "Please enter last name." })}
            onBlur={() => trigger('last_name')}
            {...styles.inputSty} />

          <Button onClick={handleRemoveFirstName}>移除First</Button>
          <Button color="primary" type="submit">提交</Button>
        </form>
      </div>
    </>
  )
}
```



## getValues

获取表单的数据

```react
<Button onClick={() => {
    // const data = getValues()
    // const data = getValues("first_name")
    const data = getValues(["first_name", "last_name"])
    console.log(data);
}}>获取数据</Button>
```

获取单个：getFieldState



## setFocus

```react
<Button onClick={() => {
    // setFocus("first_name")
    // 选则聚焦后后的输入框内容
    setFocus("first_name", { shouldSelect: true })
}}>聚焦表单</Button>
```

