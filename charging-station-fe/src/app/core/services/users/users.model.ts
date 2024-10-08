export class UserUpdateDto {
    _id?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    biography?: string;
    username?: string;
    emailAddress?: string;
    role?: string;
    gender?: string;
}

export class UserGetByIdDto {
    id?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    biography?: string;
    username?: string;
    emailAddress?: string;
    role?: string;
    gender?: string;
}

export class UserGetAllDto {
    items?: UserGetAllItemDto[];
}

export class UserGetAllItemDto {
    id?: string;
    firstName?: string;
    lastName?: string;
    biography?: string;
    username?: string;
    gender?: string;
    isBlocked?: boolean;
    isConfirmed?: boolean;
}

export class UserAllDto {
    items?: UserAllItemDto[];
}

export class UserAllItemDto {
    id?: string;
    fullName?: string;
}

export class UserSearchDto {
    items?: UserSearchItemDto[];
}

export class UserSearchItemDto {
    id?: string;
    firstName?: string;
    lastName?: string;
    biography?: string;
    username?: string;
    gender?: string;
    isBlocked?: boolean;
    isConfirmed?: boolean;
}