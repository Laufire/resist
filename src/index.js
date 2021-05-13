/* The main entry. */

// #NOTE: Context could both be imported or passed along.

import { adopt, map, overlay } from '@laufire/utils/collection';

const buildContext = (context, updates) => {
	adopt(context, updates);

	context.actions = map(context.actions, (action) =>
		(...args) => context.setState((state) =>
			overlay(
				{}, state, action({ ...context, state }, ...args)
			)));
};

const updateContext = (context, updates) =>
	(context.state ? adopt : buildContext)(context, updates) || context;

export default updateContext;
