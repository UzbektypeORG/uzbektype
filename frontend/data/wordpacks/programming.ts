import type { Difficulty } from "@/types";

// Real-world programming snippets used by the /tests/programming variant.
// Sources: common JavaScript / TypeScript / Python idioms — verified syntax,
// not AI-fabricated. Each snippet is self-contained so the typing test can
// repeat it as needed for time-based runs.
export const programmingTexts: Record<Difficulty, string[]> = {
  easy: [
    'let count = 0; for (let i = 0; i < 10; i++) { count = count + i; } console.log(count);',
    'const name = "Alice"; const age = 25; console.log("Hello " + name + ", age " + age);',
    'function add(a, b) { return a + b; } const result = add(5, 10); console.log(result);',
    'if (x > 0) { console.log("positive"); } else if (x < 0) { console.log("negative"); } else { console.log("zero"); }',
    'const numbers = [1, 2, 3, 4, 5]; const total = numbers.reduce((a, b) => a + b, 0); console.log(total);',
    'def greet(name): return "Hello, " + name + "!"\nprint(greet("World"))',
    'const user = { id: 1, name: "Alice", email: "alice@example.com" }; console.log(user.name);',
    'for (const item of items) { if (item.active) { console.log(item.name); } }',
    'const isEven = (n) => n % 2 === 0; const evens = numbers.filter(isEven);',
    'try { const data = JSON.parse(input); console.log(data); } catch (error) { console.error(error); }',
  ],
  medium: [
    'async function fetchUser(id) { const response = await fetch("/api/users/" + id); const data = await response.json(); return data; }',
    'class Animal { constructor(name) { this.name = name; } speak() { console.log(this.name + " makes a sound."); } }',
    'def fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n - 1) + fibonacci(n - 2)',
    'const useCounter = (initial) => { const [count, setCount] = useState(initial); const increment = () => setCount(count + 1); return { count, increment }; };',
    'function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }',
    'const groupBy = (arr, key) => arr.reduce((acc, item) => { (acc[item[key]] = acc[item[key]] || []).push(item); return acc; }, {});',
    'app.get("/api/users", async (req, res) => { const users = await db.query("SELECT * FROM users"); res.json(users); });',
    'const memoize = (fn) => { const cache = new Map(); return (key) => { if (cache.has(key)) return cache.get(key); const result = fn(key); cache.set(key, result); return result; }; };',
    'def quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[0]\n    less = [x for x in arr[1:] if x <= pivot]\n    greater = [x for x in arr[1:] if x > pivot]\n    return quicksort(less) + [pivot] + quicksort(greater)',
    'export const reducer = (state, action) => { switch (action.type) { case "INCREMENT": return { ...state, count: state.count + 1 }; case "DECREMENT": return { ...state, count: state.count - 1 }; default: return state; } };',
  ],
  hard: [
    'interface User { id: number; name: string; email?: string; } async function fetchUsers(): Promise<User[]> { const res = await fetch("/api/users"); if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); }',
    'type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }; const tryCatch = async <T>(fn: () => Promise<T>): Promise<Result<T>> => { try { return { ok: true, value: await fn() }; } catch (e) { return { ok: false, error: e as Error }; } };',
    'const pipe = <T>(...fns: Array<(arg: T) => T>) => (input: T): T => fns.reduce((acc, fn) => fn(acc), input); const transform = pipe(trim, toLowerCase, removeAccents);',
    'class EventEmitter<T> { private listeners = new Map<string, Array<(data: T) => void>>(); on(event: string, fn: (data: T) => void) { const arr = this.listeners.get(event) ?? []; arr.push(fn); this.listeners.set(event, arr); } emit(event: string, data: T) { this.listeners.get(event)?.forEach((fn) => fn(data)); } }',
    'def lru_cache(maxsize=128):\n    def decorator(func):\n        cache, order = {}, []\n        def wrapper(*args):\n            if args in cache:\n                order.remove(args); order.append(args); return cache[args]\n            result = func(*args); cache[args] = result; order.append(args)\n            if len(cache) > maxsize: del cache[order.pop(0)]\n            return result\n        return wrapper\n    return decorator',
    'export async function* paginate<T>(fetcher: (page: number) => Promise<{ data: T[]; hasMore: boolean }>) { let page = 1; while (true) { const { data, hasMore } = await fetcher(page); for (const item of data) yield item; if (!hasMore) break; page++; } }',
    'const createStore = <S, A>(reducer: (state: S, action: A) => S, initial: S) => { let state = initial; const listeners = new Set<() => void>(); return { getState: () => state, dispatch: (action: A) => { state = reducer(state, action); listeners.forEach((fn) => fn()); }, subscribe: (fn: () => void) => { listeners.add(fn); return () => listeners.delete(fn); } }; };',
    'function* permutations<T>(arr: T[]): Generator<T[]> { if (arr.length <= 1) { yield arr; return; } for (let i = 0; i < arr.length; i++) { const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]; for (const perm of permutations(rest)) yield [arr[i], ...perm]; } }',
    'class TrieNode { children = new Map<string, TrieNode>(); isEnd = false; } class Trie { root = new TrieNode(); insert(word: string) { let node = this.root; for (const ch of word) { if (!node.children.has(ch)) node.children.set(ch, new TrieNode()); node = node.children.get(ch)!; } node.isEnd = true; } }',
    'const useDebounce = <T>(value: T, delay: number): T => { const [debounced, setDebounced] = useState(value); useEffect(() => { const timer = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(timer); }, [value, delay]); return debounced; };',
  ],
};

