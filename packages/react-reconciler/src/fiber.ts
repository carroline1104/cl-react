import { Key, Props, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: any;
	key: any;
	// 指向fiberRootNode
	stateNode: any;
	// 父FiberNode
	return: FiberNode | null;
	// 右边兄弟FiberNode
	sibling: FiberNode | null;
	// 子FiberNode
	child: FiberNode | null;
	// 当这个节点在父节点中有多个 index代表是第几个 <ul><li * 3></ul>
	// 当前是FiberNode 是li, 第一个li index === 0;
	index: number;
	ref: Ref;

	// 确定下来的props
	memoizeProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	updateQueue: unknown;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		//实例属性
		this.tag = tag;
		this.key = key;
		// HostComponent <div></div> dom
		this.stateNode = null;
		// 对于FunctionComponent来说 就是这个这个Function本身
		this.type = null;
		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps;
		this.memoizeProps = null;
		this.memoizedState = null;
		this.updateQueue = null;

		this.alternate = null;

		// 副作用
		this.flags = NoFlags;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	// 更新完成以后得hostRootFiber
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizeProps = current.memoizeProps;
	wip.memoizedState = current.memoizedState;
	return wip;
};
