const TextRenderLine = ({value, onChange}) => {

	const handleChange = function (e) {
		e.currentTarget.value = e.currentTarget.value.replace(/[^A-z\s]/g, '').toLowerCase();
		onChange(e.currentTarget.value);
	}
	return (
		<div className="type-text">
			<textarea 
				name="text" 
				id="font-text" 
				cols="30" rows="2" 
				placeholder="Введите текст для футболки"
				value={value}
				onChange={handleChange}
				>
			</textarea>
		</div>
	);
};
