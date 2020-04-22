export const createRandomId = () => {
	// (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
	const mathRandom = (Math.random() * 10000000).toString(16).substr(0, 4);
	const dateRandom = new Date().getTime();
	const random = Math.random()
		.toString()
		.substr(2, 5);
	return mathRandom + dateRandom + random;
};

export const getCodeLength = value => {
	let len = 0;
	const v = value ? String(value) : '';
	for (let i = 0; i < v.length; i++) {
		const a = v.charAt(i);
		len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
	}
	return len;
};
