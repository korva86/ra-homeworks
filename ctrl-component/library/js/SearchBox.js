const SearchBox = (props) => {
    const change = (e) => props.filterBooks(e.currentTarget.value)
    return (
        <input 
            type="text" 
            placeholder="Поиск по названию или автору"
            value={props.value}
            onChange={change}
        />
    );
};