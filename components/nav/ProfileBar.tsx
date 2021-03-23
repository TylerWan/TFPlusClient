import BaseLoginButton from "./BaseLoginButton";
import React, {useState} from "react";

const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }: any, ref: any) => {
        const [value, setValue] = useState('');
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>// @ts-ignore
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);
function ProfileBar(props: any) {
    let isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (<>

        </>)
    }
    return <>
        <BaseLoginButton/>
    </>
}


export default ProfileBar
