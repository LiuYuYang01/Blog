# Zustand

定义一个状态

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StatusState {
  status: number
  nextStep: () => void
  lastStep: () => void
}

export default create<StatusState>((set) => ({
  status: 0,
  nextStep: () => set((state) => ({ status: state.status + 1 })),
  lastStep: () => set((state) => ({ status: state.status - 1 })),
}))
```



在页面中使用

```react
import useStatusStore from '@/stores'

export default () => {
  const status = useStatusStore((state) => state.status)
  const nextStep = useStatusStore(state => state.nextStep)
  const lastStep = useStatusStore(state => state.lastStep)

  return (
    <>
      <h1>{status}</h1>
      <button onClick={nextStep}>+1</button>
      <button onClick={lastStep}>-1</button>
    </>
  )
}
```



持久化

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StatusState {
  status: number
  nextStep: () => void
  lastStep: () => void
}

const useStatusStore = create(
  persist<StatusState>(
    (set) => ({
      status: 0,
      nextStep: () => set((state) => ({ status: state.status + 1 })),
      lastStep: () => set((state) => ({ status: state.status - 1 })),
    }),
    {
      name: 'status',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
```

