const TextRenderLine = ({value, onChange}) => {
	const handleChange = function (func, val) {
		val = val.replace(/[^A-z\s]/g, '');
		func(val);
	}
	return (
		<div className="type-text">
			<textarea 
				name="text" 
				id="font-text" 
				cols="30" rows="2" 
				placeholder="Введите текст для футболки"
				value={value}
				onChange={(e) => {handleChange(onChange, e.currentTarget.value)} }
				>
			</textarea>
		</div>
	);
};
