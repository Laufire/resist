/* The main entry. */

// #NOTE: Context could both be imported or passed along.

import { map, merge, sanitize } from '@laufire/utils/collection';

const updateContext = (context, accessories) => {
	const { state, setState } = accessories;

	context.state = state;
	context.setState = setState;
};
const buildContext = (context, accessories) => {
	const { actions } = accessories;

	merge(context, {
		...accessories,
		actions: map(actions, (action) => (...args) =>
			context.setState(sanitize(merge(
				{}, context.state, action(context, ...args)
			)))),
	});
};

const getContext = (context, accessories) =>
	(context.state
		? updateContext
		: buildContext)(context, accessories) || context;

export default getContext;
