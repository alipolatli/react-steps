import React from "react";


export function useKey(key :string, action: () => void){
    React.useEffect(
        function () {
          function callback(e: KeyboardEvent) {
            if (e.code === key) {
                action();
              console.log("Closing");
            }
          }
          document.addEventListener("keydown", callback);
    
          return function () {
            document.removeEventListener("keydown", callback);
          };
        },
        [action,key]
      );
}