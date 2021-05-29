/* The main entry. */

// #NOTE: Context could both be imported or passed along.

import { adopt, map, secure, traverse } from '@laufire/utils/collection';

const buildContext = (context, updates) => {
	adopt(context, updates);

	context.actions = traverse(context.actions, (action) => (data) =>
		context.setState((state) =>
			({ ...state, ...action({ ...context, state, data }) })));

	map(context, secure);
};

const updateContext = (context, updates) =>
	(context.state ? adopt : buildContext)(context, updates) || context;

export default updateContext;
