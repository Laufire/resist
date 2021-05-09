/* The main entry. */

// #NOTE: Context could both be imported or passed along.

import { map, merge, sanitize } from '@laufire/utils/collection';

const buildContext = (context, updates) => {
	merge(context, updates);

	context.actions = map(context.actions, (action) => (...args) =>
		context.setState(sanitize(merge(
			{}, context.state, action(context, ...args)
		))));

	return context;
};

const updateContext = (context, updates) =>
	(context.state ? merge : buildContext)(context, updates);

export default updateContext;
