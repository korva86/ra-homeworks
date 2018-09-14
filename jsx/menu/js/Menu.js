'use strict';

const Menu = ({items, opened}) => {
    const list = items.map((item, i) =>
        <li key={i}><a href={item.href}>{item.title}</a></li>
    );

    return (
        <div className={`menu ${opened ? "menu-open" : null}`}>
            <div className="menu-toggle"><span></span></div>
            {(opened && 
            <nav>
                <ul>
                    {list}
                </ul>
            </nav>
            )}
        </div>
    )
};