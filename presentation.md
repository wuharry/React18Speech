---

marp: true
theme: default
paginate: true
--------------

# React 18 重點整理 🚀

簡報人：Neo.Wu

---

## 🤔 React 是什麼？

* 用於建構 **使用者介面（UI）** 的 JavaScript 函式庫。
* 與 Angular、Vue 並列為主流前端框架。
* 最核心的理念是：**一切皆元件（components）**。
* 虛擬 DOM （Virtual DOM），減少 DOM 操作。

---

## 🧱 元件與 JSX

* 元件是回傳 React 元素的函式，需使用大寫命名（PascalCase）。
* 元件可以巢狀組合，形成 Component Tree。
* JSX 是 JavaScript 語法糖，類似 HTML，但會被轉換為 `React.createElement(...)`。
* JSX 中多個元素需用單一父元素包裹，可用 `<></>` 簡寫。

---

## 🌱 React 元素與渲染原理

* JSX 描述的是 **React 元素**（其實是 JS 物件）。
* React 將元件渲染到 HTML 的根節點（通常是 `#root`）。
* React 18 開始：

```tsx
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

> `createRoot` 是 React 18+ 的標準入口方法。

---

## 🔄 Automatic Batching

在 React 18 中，**多個 state 更新會自動批次處理**：

```tsx
setCount(1);
setName("React 18");
// 只會觸發一次 render
```

這可以提升效能，減少不必要的重新渲染。

---

## 🧵 startTransition API

讓非緊急的 UI 更新變得更平滑：

```tsx
import { startTransition } from 'react';

startTransition(() => {
  setValue(input);
});
```

避免因大量渲染造成的卡頓，常搭配搜尋或過濾列表使用。

---

## ⏳ useTransition & useDeferredValue

* `useTransition`: 追蹤 transition 狀態（是否在 transition 中）
* `useDeferredValue`: 延遲非緊急的更新內容

```tsx
const [isPending, startTransition] = useTransition();
```

---

## 🧠 Suspense Everywhere

React 18 支援 Suspense 用於**任何 UI 部分**，而不只是 lazy-loading。

可以搭配資料取得，例如：

```tsx
<Suspense fallback={<Spinner />}>
  <UserProfile />
</Suspense>
```

---

## 🧪 Server Components（實驗性）

* 可在伺服器端執行 React component，減少傳輸 JS。
* 目前僅 Next.js 13+ 支援，仍在開發中。

---

## 🎛️ 狀態、Props 與事件

* **Props**：由父元件傳給子的資料。只讀。
* **State**：元件內部狀態，使用 `useState` 控制。
* **事件處理**：如 `onClick={() => ...}`，注意不要加括號呼叫函式。

---

## 🔁 副作用與 Hooks

* 副作用（side effect）：如 API 請求、DOM 操作，使用 `useEffect` 處理。
* 其他常用 Hook：

  * `useRef`：儲存 DOM 參照或非 UI 資料。
  * `useReducer`：複雜狀態管理。

---

## 🧠 其他實用概念

* **條件渲染**：用 `if` 或三元運算決定是否渲染。
* **列表渲染**：用 `map` 輸出元素，需提供唯一的 `key`。
* **宣告式程式設計**：描述 UI 應長什麼樣，React 自動處理 DOM 更新。

---

## 🛠️ 建議學習順序與實踐

1. 熟悉 HTML / CSS / JS 基礎。
2. 從靜態元件開始，進階到有互動的 UI。
3. 多練習小專案，加深理解。
4. 使用 VSCode + React DevTools 開發輔助。
5. 熟悉建構工具如 Vite、Next.js。

---

## 📚 推薦資源

* [https://react.dev/](https://react.dev/)
* [https://reactjs.org/blog/2022/03/29/react-v18.html](https://reactjs.org/blog/2022/03/29/react-v18.html)
* [https://react.dev/learn/start-a-new-react-project](https://react.dev/learn/start-a-new-react-project)

---

## 🙌 感謝聆聽！

有問題歡迎發問 💬
