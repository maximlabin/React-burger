export type TIngredient = {
    readonly _id: string;
    readonly uniqId: string;
    readonly name: string;
    readonly type: string;
    readonly proteins?: number;
    readonly fat?: number;
    readonly carbohydrates?: number;
    readonly calories?: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile?: string;
    readonly image_large?: string;
    readonly __v?: number;
    index?: number;
};

export type TIngredientItem = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins?: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
    index: number;
};

export type TOrder = {
    _id: string;
    name: string;
    status: 'done' | 'pending' | 'created';
    number: number;
    ingredients: Array<string>;
    orders: [];
    createdAt: string;
    updateAt: string;
}

export interface IOrdersResponse {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
}

export interface IFoundOrderResponse {
    orders: TOrder[];
    success: boolean;
}

export interface IUserFormData {
    name: string;
    email: string;
    password: string;
}

export interface IBurgerConstructorProps {
    isLocked: boolean;
    item: TIngredient;
    index: number;
}

export interface IModal {
    onClick: () => void;
}

export interface IModalOverlay {
    onClick: () => void;
}