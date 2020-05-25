export const isMock = true;
export const isAllMock = true;
const list = [
    '/agreementMgt',
    'cats',
    '/incoming/detail',
    '/incoming/list',
    '/customer/entdetail',
    '/customer/persondetail',
    '/banner/list',
    '/banner/enable',
    '/banner/delete',
    '/agreement/list',
	'/corp/detail',
	'/feedback/list',

];

export default url => list.some(item => {
    if (isAllMock && isMock) {
        return true;
    }
    if (isMock) {
        return url.indexOf(item) > -1;
    }
});
