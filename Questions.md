## Questions
#### Question 1:
What is the difference between Component and PureComponent? give an example where it might break my app.
#### Answer 1:
 **PureComponent** implements **shouldComponentUpdate** method which allows to write additional logic for preventing component to be re-rendered.
 When its returned value is false then **render**, **componentDidUpdate** won't be called

 In order to make **Functional component** behave like PureComponents you need to wrap it with **React.memo()**

 Application can be broken in case you are missing some checks in shouldComponentUpdate.
 Also function is costly and can make app slow

---
#### Question 2: 
Context + ShouldComponentUpdate might be dangerous. Can think of why is that? 
#### Answer 2:

  **Context** is mostly used for deriving data in nested components and to avoid from passing them with props to child ones

  Before using context you need to know

  **a:** When data is being changed in Context.Provider then all subcomponents are being rendered again, even if they are not the direct consumers of the context.

  **b:** Direct consumer component which uses data from Context.Provider will be rendered again even it implements shouldComponentUpdate or memoized
   
  **c:** Component which consumes Context.Provider data will be rendered even if the parent one is a PureComponent

---
#### Question 3:
Describe 3 ways to pass information from a component to its PARENT.
#### Answer 3:

1. Pass callback from parent to child and via triggering that callback update data in parent
 ```
  function Parent() {
    const [data, setData] = useState();
    <Children callback={setData} />
  }
  function Children({callback}) {
    //Call callback when needed and pass data
  }
 ```

2. Using Context with callback (The approach is approximately the same just in Context.Provider value you are setting some function which is being called in Consumer Component and do update data in the higher level)
3. Use Refs
```
  function Parent() {
    const myRef = useRef();
    <Children dataChanger={myRef} />
  }
  function Children({dataChanger}) {
    useEffect(() => {
      dataChanger.current = "Some Value/Callback"
    }, [dependency]);
  }
  In this case your parent component won't be re-rendered on every dataChanger.current changes because refs are not monitored
```
In test task I am using 3rd version. It matches my needs

---
#### Question 4:
Give 2 ways to prevent components from re-rendering
#### Answer 4:

1. Use PureComponents or React.memo
2. 
```
   function Parent({children}) {
     const [state, setState] = useState();
     return <> {children} </>
   }
   <Parent>
     <ChildrenComponent />
   </Parent>
```
When state will be updated in parent and it will be rendered again children won't be updated
3. 2nd and also other additional approaches exists in Dan Abramov's official blog which I am regularly checking for updates (https://overreacted.io/before-you-memo/)

---
#### Question 5:
What is a fragment and why do we need it? Give an example where it might break my app
#### Answer 5:

React.Fragment(or <></>) are providing a way to combine many child components into one without any additional html tags which you don't need to be inserted into DOM

They are used only in Virtual DOM but not rendered in browser

Fragments can break you app if you are not setting keys correctly. BTW Some UI frameworks having problems with css in very rarely cases because of Fragments

---
#### Question 6:
Give 3 examples of the HOC pattern
#### Answer 6:

HOC are functions which are receiving a Component, adding some new properties to that and returning wrapped component
The basic example is this
```
   const myHOC = (Component) => {
      const Wrapper = () => {
        return <Component foo="some value" />
      }
      return Wrapper;
   }
   
   let ComponentWithFoo = myHOC(Component);
   <ComponentWithFoo />
```

But since we have hooks the same logic can be implemented in hook and then be used within many Functional components

1. connect function from redux
2. withAuth
3. withRouter

---
#### Question 7:
What's the difference in handling exceptions in promises, callbacks and async...await
#### Answer 7:

Promises are a way to run code in async mode, when promises are being resolved .then() functions are being called

If there are any errors in ```(resolve, reject) => {...}``` or Promise calls reject() then .catch() block works and handles the errors

.catch() is being called when error appears in .then() as well

Code which should be run after promise will continue working because errors are handled in .catch()

```
   let p = new Promise((resolve, reject) => {...});
   p.then(response => {....}).catch(err => {/*handle error here*/})
```

In callback functions you need to handle errors with try {} catch (e) {} blocks

async...await is just a wrapper(syntax sugar for Promise)

```
   async function Foo() {
    try {
       let response = await fetch();
       return await response.json();
    } catch (e) {
       //handle errors
    }
    return null;
   }
```
**As you see in async await and in callbacks we are using try catch block for error handling but in Promise we use catch()**

---
#### Question 8:
How many arguments does setState take and why is it async
#### Answer 8:
```setState(updateCallback, [callback, ...])```

second argument of setState is callback or array of callbacks it is called everytime when setState() called.

In order to optimize rendering process react core groups setState() calls within a 1 and updates state only 1 time.
```
 handleUpdate = () => {
  setState({for: 1});
  setState({bar: 2});
 }
 state updated only 1 time
```
In past grouping didn't work for all cases and there were a function **unstable_batchUpdate** to group setStates();

Now there is **flushSync** which allows to trigger setState without grouping

from React 18th version updating state from useState hooks are grouped as well in all cases and places

---
#### Question 9:
List the steps needed to migrate a Class to Function Component
#### Answer 9:

1. You need to replace lifecycle methods with hooks **useState** and **useEffect**
2. **createRef** => **useRef**
3. **Class.contextType = MyContext** => **useContext()**
4. migrate from class to function

Please note that not all class components can be replaced with functional ones.

For instance there are no hooks which can replace **getDerivedStateFromError** and **componentDidCatch** methods that you can not replace ErrorBoundary with functional one

---
#### Question 9:
List a few ways styles can be used with components
#### Answer 9:
1. ```
   Import css files
   import './index.css';
   function Component() {
    return <div className="App"></div>
   }
   ```

2. ```
   Import css modules
   import styles from './index.module.css';
   function Component() {
    return <div className={styles.App}></div>
   }
   ```
3. ```
   CSS-in-JS
   For this you need a 3thg party app
   nowadays many frameworks support this such as ChakraUI and Mui
   ```

---
#### Question 10:
How to render an HTML string coming from the server.
#### Answer 10:
with dangerouslySetInnerHTML
```
<div dangerouslySetInnerHTML={{_html: ${server.htmlString}}} /> 
```








