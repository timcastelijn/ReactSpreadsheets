import React from 'react'
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const LinkItem = (props)=>{
    const {children, link, ...rest} = props
    return (
        <Menu.Item as={Link} to={link} {...rest}>{children}</Menu.Item>
    )
}

export {LinkItem}