import React from 'react';
import './List.css'
interface ListProps<T> {
    items: T[],
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {
    return (
        <div className="many-cards">
            {props.items.map(props.renderItem)}
        </div>
    )
}
