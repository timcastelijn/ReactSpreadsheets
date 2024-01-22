import React from "react";
import { Table } from "semantic-ui-react";
import './SimpleTable.css'

const Row = ({children, colSpan, id, ...rest})=>{
    
    const newChildren = Array.isArray(children)? children : [children]
    const filtered = newChildren.filter(e=>!!e)

    return (
        <Table.Row {...rest}>
            {filtered.map((entry, i)=>(
                <Table.Cell colSpan={colSpan} key={i}>{entry}</Table.Cell>
            ))}    
        </Table.Row>
    )
}

const HeaderRow = ({children, colSpan, id, ...rest})=>{
    
    const newChildren = Array.isArray(children)? children : [children]
    const filtered = newChildren.filter(e=>!!e)

    return (
        <Table.Row {...rest}>
            {filtered.map((entry, i)=>(
                <Table.HeaderCell colSpan={colSpan} key={i}>{entry}</Table.HeaderCell>
            ))}    
        </Table.Row>
    )
}

const FooterRow = ({children, colSpan, id, ...rest})=>{
    
    const newChildren = Array.isArray(children)? children : [children]
    const filtered = newChildren.filter(e=>!!e)

    return (
        <Table.Row {...rest}>
            {filtered.map((entry, i)=>(
                <Table.HeaderCell colSpan={colSpan} key={i}>{entry}</Table.HeaderCell>
            ))}    
        </Table.Row>
    )
}

const SimpleTable = ({children, basic, ...rest})=>{
    
    const newChildren = Array.isArray(children)? children : [children]

    return(
    <Table className={basic && 'noBorder'} basic={basic} {...rest}>
        <Table.Header>
            {newChildren.filter(c=>c?.type === HeaderRow)}
        </Table.Header>
        <Table.Body>
            {newChildren.filter(c=>![HeaderRow, FooterRow].includes(c?.type))}
        </Table.Body>
        <Table.Footer>
            {newChildren.filter(c=>c?.type === FooterRow)}
        </Table.Footer>
    </Table>
)}


SimpleTable.Row = Row
SimpleTable.HeaderRow = HeaderRow
SimpleTable.FooterRow = FooterRow

export default SimpleTable