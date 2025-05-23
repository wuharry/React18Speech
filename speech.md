
## 最核心的理念是：**一切皆元件（components）**

A:所這個的特點是什麼？
Q:可以重複利用比起HTML的語法，更方便維護。

* Q:反過來問為甚麼JS,jquery不可以？
* A:可以類似的但是也不自然,可維護性跟架構上比不上React,因為JS 缺少結構化(邏輯 + 樣式 + UI 同時集中)與 UI 標記語法(jsx)。
* UI 複雜一點，例如條件渲染、重繪、父子關聯，原生 JS 實作會變得非常繁瑣、容易出 bug
* 邏輯的複用沒什麼問題,問題會出在html那塊上面。
* 因為JS,jquery 他沒有自然更新驅動的機制(需要手寫),今天他的原件資料更新了，但是他的畫面還沒更新，所以他的畫面會有問題。
* 元件之間它可以組合、嵌套,然後有狀態流,這些用js來實作的話，會很麻煩你會需要頻繁的操作dom,這個就會造成效能的問題了。
  
既然談到效能的問題,就可以說說React virtual DOM的概念
,React virtual DOM的概念是什麼？
React virtual DOM是一種虛擬的DOM，它是一個JS物件樹，用來描述UI的結構。藉由react的diff演算法去比對目前的UI和上一次的UI，然後只更新有變化的部分。
這樣可以減少不必要的DOM操作，提高效能。

A:那他是怎麼做到的？
Q:他是用JSX語法來寫的，JSX是一種語法糖，會被轉換為React.createElement(...)。

* Q:那他的diff演算法是怎麼比對的？
* A:他的diff演算法是用「同層比對」的策略來比對的,他會用遞迴的方式跑dom tree。
  
  <!--同層比對 有三個原則:type不同整個直接換,比對 props 與 children,對於子節點（children），採用「同層比對 + key 追蹤」-->
  <!-- React 的 diff 算法雖然實作上會遞迴拜訪 Virtual DOM 子樹，但它採用的是**「同層比對」的邏輯策略**來判斷變化。 -->

* 每當 state 或 props 改變時，React 會建立一棵新的 Virtual DOM。
* 然後 React 會比較新的 Virtual DOM 與舊的 Virtual DOM，找出有變化的部分。那辨別的方式就是用type,key,props等等的方式來比對。
* type就是html,div,span等等的tag,key就是用來辨別哪個節點是哪個節點,props就是用來辨別哪個節點是哪個節點的屬性。
* Q:如果我在 map 渲染元素時沒有加 key，然後陣列中某個值變了，React 在 Diff 虛擬 DOM 時會怎樣做？
* A:先說結論這樣會造成效能的問題。why?
* 沒有key值的情況下他會用元素的順序去比較,今天有情況讓你更改了元素的順序話,他就會認為你是在改變元素的內容,但是他並不知道你是在改變元素的順序,所以他就會認為你是在改變元素的內容,然後他就會重新渲染整個元素,這樣就會造成效能的問題。
* 如果我們在渲染 list 時沒有加 key，React 會用元素的「順序」來對應新舊 Virtual DOM 的節點。
* 當我們移除陣列中的第一個元素時，React 無法辨識這是「刪除第一個元素」。
* React 誤以為第二個元素只是「更新了內容」，結果會造成 input 的值錯位。
* 因此，我們會看到使用者輸入的資料「跳到下一列」或被清除，造成追蹤資料錯亂。

```javascript
const users = ["Amy", "Bob", "Cindy"];

return (
  <ul>
    {users.map(user => (
      <li>{user}</li> // 沒有加 key！
    ))}
  </ul>
);

```

* Q:那今天key值是index的話會出現甚麼問題?數據丟失的問題會有嗎?為甚麼key值必須唯一?
* A:其實還是會有問題,會有數據丟失的問題,用index去做key值的話很像是用順序去對應新舊的virtual dom的節點,並且更改array的話,他所有的元素的key值都會變,所以他就會認為你是在改變元素的內容,然後他就會保留 DOM 但更新內容,然後就會造成資料丟失

* Q:uuid()的key值會出現問題嗎?
* A:會,因為uuid是動態生成key值所以每次生命週期改變他的key值都會重新生成,這樣React virtual dom帶來的效能優勢就會被破壞。

那virtual dom的就會帶來效能的優勢因為他只會重新渲染有變化的部分,這樣就會減少不必要的DOM操作,提高效能。 這樣就很適合那些資料很常變動的應用程式裡,這就是為甚麼很多互動複雜或是資料量大的SPA會用react去建置了。

至於SPA,SSR,SSG的useCase 那又是另一個話題了。

## 🧱 元件與 JSX

那JSX 他看起來很像是模板語法但是實際上他是JS的語法的擴充,到最後實際上他還是會被編譯成js
那php,跟java帶的jsp的差別在哪裡
1.jsx可以在裡面寫js但是jsp跟php不行
2.php模板跟jsp 他們輸出到瀏覽器都是靜態html,但是jsp會先編譯成js語法給瀏覽器跑然後讓瀏覽器渲染html(dom操作)。

## JSX 中多個元素需用單一父元素包裹，可用 `<></>` 簡寫

Q:為甚麼元件名稱會需要大寫
A:這樣能讓React區分他是元件還是html tag。

## React 將元件渲染到 HTML 的根節點（通常是 `#root`）

* 這個地方基本上就是你的index入口文件寫的他會染你的元件到根節點。那標準的react專案第一個也就是最外層的元件是APP。

## Components 與 Props

這些屬性被傳進來的時候會被打包成一個物件,這個物件就叫props。
所以可以用prop.[屬性] 去取的你的值。
那這個東西是單向資料流的關係所以是由父組件傳到子組件由上往下傳,子組件不能改變父組件的狀態。
Q:so今天有單向資料流,那在現代的框架中有雙向資料流嗎
A:理論上存在但是很少用因為資料會在組件之間自由流動(父子都可改props),這樣會造成資料的不確定性並且難以追蹤
Q:單向綁定是甚麼,那有雙向綁定嗎?
A:單向綁定就是UI跟元件的資料的同步方式,只能有state改變UI但是今天UI的改變不會變更state,所以他是單向綁定。
Q:React是單向綁定還是雙向綁定?
A:React是單向綁定。

## 🚀 React 18 hooks

* `useEffect`：處理副作用。
* 在講這個的時候我們要先說說生命週期的部分,大概簡化成三種Mouting,Updating,Unmounting。
* Mounting:也就是元件建立的時候會執行的生命週期。那實作上應該會是 useEffect(()=>{},[])
* Updating:也就是元件更新的時候會執行的生命週期。那實作上應該會是 useEffect(()=>{},[props,state])
* Unmounting:也就是元件銷毀的時候會執行的生命週期。那實作上應該會是 useEffect(()=>{return ()=>{}},[])
* Q:假如今天我有個子組件她有useEffect(()=>{},[]),然後父組件有一個Button,點擊Button後會改變state,但該state跟子組件沒關係,那子組件會重新渲染嗎?useEffect會重新執行嗎
* A:會重新渲染（除非你用了 React.memo() 去包住它）。useEffect(() => {}, [])不會重新執行,因為這個元件被沒有被重新掛載。
* Q:呈上題那state有關係的話呢?
* A:還是不會重新渲染。useEffect(() => {}, [])不會重新執行,因為這個元件被沒有被重新掛載。
* Q:但是我把key屬性掛上state的情況呢?
* A:會重新渲染。useEffect(() => {}, [])會重新執行,因為這個元件被重新掛載。
* `useState`：管理元件狀態。
* 當今天組件要記住一些會變化的資料,比方說按讚按鈕要記住被按幾次,或是輸入框要記住他的值,那我們就可以用useState來記住這些資料。
* 當state改變的時候,他的畫面就會用diff演算法比對 新舊virtual dom 去看說哪個節點要更新，最後只更新實際 DOM 中需要變更的部分。
* 
* 所以state通常會用來綁定那些根據使用者的互動 動態的要呈現的資料,比方說表單的呈現,按鈕計數器,切換開關顯示隱藏區塊,或是tab;
* Q:(切useState沒有同步更新的example )StateErrorExample.jsx, 為甚麼他的log沒有跟畫面一致
* A:log是上個生命週期做的事情
* Q:(承上題)你們覺得這個會有甚麼影響?
* A:今天他如果是handleSubmit送出資料到後端的不就會造成錯誤的資料送出去了嗎(把console.log);
* Q:(切錯誤更新useState的example)ReactErrorExample.jsx 為甚麼score沒有更新?
* A:不能直接修改 state
* Q:為甚麼今天按了按鈕之後我輸入其他的資料,他分數才會更新
* A:這其實只是「碰巧」更新，不是正確流程。React 他沒有偵測到變化因為play物件的參考她其實沒有更新,也就是他的記憶體的地址沒變,所以她不會更新,然後你改了其他的狀態觸發了重新渲染他才會顯示你更新的值
* 所以從這邊可以看出一些React state的端倪你重新渲染只要不是有更動的state的話,他會根據從參考取出值,那有正確更動state的情況不只值會更新其參考也會更新,這也就是跟react state array只能用特定方式更新有關(你們能理解為甚麼不能用for更新了八)
* Q:為甚麼我更改lastName的時候會有報錯?
* A:不完整的狀態更新,更新物件時要展開其他欄位,不然其他的部分會變undefined
* Q:他的報錯是元件不受控,你可以告訴我原因嗎?元件不受控是甚麼情況?
* A:元件不受控是當今天React input本來是受控的他的value本來是有的但是今天你把他的value變成undefided,所以它變成不受控的元件
* Q:firstName的更新有甚麼問題?
* A:複製部分沒錯，但能再更安全,如果今天的state的結構夠深有非同步的更新需求建議用函式的方式更新
* 今天用戶快速點擊或是觸發的時候可能會有資料丟失的風險或市有非同步的情況就會有問題(Example3.jsx)

```javaScript
function handleFirstNameChange(e) {
  setPlayer(prev => ({
    ...prev,
    firstName: e.target.value
  }));
}

```

* `useRef`：存取 DOM
* 在某些情況下React官方不建議直接操作DOM,所以我們可以用useRef來存取DOM。
* 舉例來說我們需要foucs input,那我們可以用useRef來存取DOM。
* Q:有沒有人知道useRef的其他用法
* A:你希望它記住某個值得時候,但是你不希望它重新渲染的時候被重新初始化,但是你更動它得時候畫面不要重新渲染。或是你希望它能夠在組件的生命週期內保持不變。

* forwardRef簡單來說它就是穿透的ref 因為一般的父組件是拿不到子組件的ref的,但是forwardRef可以讓父組件拿到子組件的ref。
* https://react.dev/reference/react/forwardRef


* 是的，在 React 中 每次組件重新渲染時，裡面定義的函式（function）都會被重新宣告一次。
* 在大多數情況下這不會出事，但如果你把這個 function 傳給其他 component、或放在依賴陣列中（像是 useEffect）時，新的 function 會被視為「變了」，導致：

不必要的子元件 re-render

不必要的 effect 重新執行
就是幫你記住這個 function， 讓它不要每次重渲染都重新生出來，除非它依賴的變數變了。




```javaScript
const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );

```
