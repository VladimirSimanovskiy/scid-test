export type UserId = number | string;

export interface User {
	id: UserId;
	firstName: string;
	lastName: string;
	age: number;
	email?: string | undefined;
	photoUrl?: string | undefined;
}
