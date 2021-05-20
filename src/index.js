/* The main entry. */

// #NOTE: Context could both be imported or passed along.

import { adopt, overlay, traverse } from '@laufire/utils/collection';

const buildContext = (context, updates) => {
	adopt(context, updates);

	context.actions = traverse(context.actions, (action) =>
		(...args) => context.setState((state) =>
			overlay(
				{}, state, action({ ...context, state }, ...args)
			)));
};

const updateContext = (context, updates) =>
	(context.state ? adopt : buildContext)(context, updates) || context;

export default updateContext;
