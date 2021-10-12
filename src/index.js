/* The main entry. */

// #NOTE: Context could both be imported or passed along. Yet, it's better to pass it.

import { adopt, map, secure, traverse } from '@laufire/utils/collection';

const buildContext = (context, updates) => {
	const patchState = (patch) => context.setState((state) =>
		({ ...state, ...patch }));

	adopt(
		context, updates, { patchState }
	);

	context.actions = traverse(context.actions, (action) => (data) =>
		context.setState((state) =>
			({
				...state,
				...action({ ...context, state, data }),
			})));

	map(context, secure);
};

const updateContext = (context, updates) =>
	(context.state ? adopt : buildContext)(context, updates) || context;

export default updateContext;
