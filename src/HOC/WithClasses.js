import React from "react";

function WithClasses(Component) {
    return function Wrapper(props) {
        return (
            <div className={props.classes}>
                <Component {...props} />
            </div>
        )
    }
}


export default WithClasses;