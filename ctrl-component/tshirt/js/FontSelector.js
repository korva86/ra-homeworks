const FontSelector = ({fonts, onSelect, selected}) => {
    return (
    <div className="font-picker">  
        {fonts.map(function (font, i) { 
        return (
        <div className="grid center font-item">
            <input type="radio" name="font" onChange={evt => onSelect(font)} value={"abc" + (i+1)} id={"abc" + (i+1)} checked={font === selected}/>
            <label htmlFor={"abc" + (i+1)} className={"grid-" + (i+1)}>
                <PictureFont
                    text="abc"
                    path={font.path}
                />
            </label>
        </div>)}
        )}
    </div>
    );
};