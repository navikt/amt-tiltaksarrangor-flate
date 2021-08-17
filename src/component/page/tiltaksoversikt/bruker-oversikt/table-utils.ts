import { OrNothing } from '../../../../utils/types/or-nothing';
import { OrderByDirection, OrderByField } from './types';

export const INITIAL_DIRECTION = OrderByDirection.ASC;

export type OnOrderByChanged = (orderByData: OrderByData) => void;

export interface OrderByData {
	field: OrNothing<OrderByField>;
	direction: OrNothing<OrderByDirection>;
}

export const toggleOrderByDirection = (orderByDirection: OrNothing<OrderByDirection>): OrNothing<OrderByDirection> => {
	switch (orderByDirection) {
		case OrderByDirection.ASC:
			return OrderByDirection.DESC;
		case OrderByDirection.DESC:
			return undefined;
		default:
			return INITIAL_DIRECTION;
	}
}
