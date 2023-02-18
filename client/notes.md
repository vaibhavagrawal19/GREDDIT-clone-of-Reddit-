# React JS 
### Render and Commit
So whenever we change the state of a component, ... ? ... the re-render process begins. Suppose the state of a component has changed. Then, for each sub-component that our main component returns, it is checked whether or not the state of the sub-component is affected. *But this information is not used yet*.
Now, once all the information on state change has been collected, React commits to the DOM, making the minimal number of changes (calculated during the render stage)