1. hooks `deps`依赖项比较
   ```javaScript
     function areHookInputsEqual(
       nextDeps: Array<mixed>,
       prevDeps: Array<mixed> | null
     ) {
       if(prevDeps === null) {
         return false;
       }
       for(let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
         if(is(nextDeps[i], prevDeps[i])) {
           continue;
         }
         return false;
       }
       return true;
     }
   ```
