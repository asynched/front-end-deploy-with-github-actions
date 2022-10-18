import { useEffect, useState } from 'react'

type BaseState = Record<string, unknown>
type Box<State extends Record<string, unknown>> = {
  get: () => State
  getInner: <Key extends keyof State>(key: Key) => State[Key]
  set: (newState: Partial<State>) => void
  update: (updater: (state: State) => void) => void
  subscribe: (listener: (newState: State) => void) => () => void
}

export type InferBoxType<State extends BaseState> = State extends Box<infer T>
  ? T
  : never

export function createBox<State extends BaseState>(
  initialState: State
): Box<State> {
  let inner = structuredClone(initialState)
  let subscribers: Array<(state: State) => void> = []

  const notify = () => {
    for (const subscriber of subscribers) {
      subscriber(inner)
    }
  }

  const get = () => {
    return structuredClone(inner)
  }

  const getInner = <Key extends keyof State>(key: Key): State[Key] => {
    return inner[key]
  }

  const set = (newState: Partial<State>) => {
    Object.assign(inner, newState)
    notify()
  }

  const update = (updater: (state: State) => void) => {
    updater(inner)
    notify()
  }

  const subscribe = (callback: (state: State) => void) => {
    subscribers.push(callback)

    return () => {
      subscribers = subscribers.filter((subscriber) => subscriber !== callback)
    }
  }

  return {
    get,
    getInner,
    set,
    update,
    subscribe,
  }
}

export function useBox<State extends BaseState>(box: Box<State>) {
  const [state, set] = useState(box.get())

  useEffect(() => {
    return box.subscribe((state) => set({ ...state }))
  }, [box])

  return state
}

export function useDerived<State extends BaseState, Derived>(
  box: Box<State>,
  selector: (state: State) => Derived
) {
  const [derived, setDerived] = useState(selector(box.get()))

  useEffect(() => {
    return box.subscribe((state) => setDerived(selector(state)))
  }, [box, selector])

  return derived
}
