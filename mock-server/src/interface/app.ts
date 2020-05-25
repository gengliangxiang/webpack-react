export interface IUser {
	userName: string;
	password: string;
}
export interface IEncryptionBody {
	data: string;
}
export interface IUnencryptedBody {
	data: string;
}
export interface IResponse {
	responseCode: string;
	responseMessage: string;
	responseData: object;
}
