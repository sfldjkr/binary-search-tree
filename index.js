const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let removeDuplicate = (list) => {
  return list.filter((item, index) => list.indexOf(item) == index);
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

let mergeTwoArray = (listOne, listTwo) => {
  let mergeList = [];
  let listOneLen = listOne.length;
  let listTwoLen = listTwo.length;
  if (listOneLen === 1 && listTwoLen === 1) {
    if (listOne[0] < listTwo[0]) {
      mergeList.push(listOne[0]);
      mergeList.push(listTwo[0]);
    } else {
      mergeList.push(listTwo[0]);
      mergeList.push(listOne[0]);
    }
    return mergeList;
  }
  let listOneHead = 0;
  let listTwoHead = 0;
  while (listTwoHead < listTwoLen && listOneHead < listOneLen) {
    if (listOne[listOneHead] < listTwo[listTwoHead]) {
      mergeList.push(listOne[listOneHead]);
      listOneHead++;
    } else {
      mergeList.push(listTwo[listTwoHead]);
      listTwoHead++;
    }
  }
  if (listOneHead < listOneLen) {
    for (let i = listOneHead; i < listOneLen; i++) {
      mergeList.push(listOne[i]);
    }
  } else if (listTwoHead < listTwoLen) {
    for (let i = listTwoHead; i < listTwoLen; i++) {
      mergeList.push(listTwo[i]);
    }
  }
  return mergeList;
};

let mergeSort = (list) => {
  let listLen = list.length;
  if (list.length === 1) {
    return list;
  }
  let halfIndex = Math.round(listLen / 2);
  let firstHalf = mergeSort(list.slice(0, halfIndex));
  let secondHalf = mergeSort(list.slice(halfIndex, listLen));
  return mergeTwoArray(firstHalf, secondHalf);
};

let buildTreeAlgo = (arr, start, end) => {
  if (start > end) {
    return null;
  }
  const mid = parseInt((start + end) / 2);
  const node = new Node(arr[mid]);
  if (typeof arr[mid] === "undefined") {
    return null;
  }

  node.left = buildTreeAlgo(arr, start, mid - 1);
  node.right = buildTreeAlgo(arr, mid + 1, end);
  return node;
};

class buildTree {
  constructor(List) {
    this.root = buildTreeAlgo(
      mergeSort(removeDuplicate(List)),
      0,
      List.length - 1,
    );
  }

  insertRec = (node, key) => {
    // base case is when node is null
    // that's when we make a new node and return it
    if (node === null) {
      let newNode = new Node(key);
      return newNode;
    }
    if (key < node.data) {
      node.left = this.insertRec(node.left, key);
    } else if (key > node.data) {
      node.right = this.insertRec(node.right, key);
    }
    return node;
  };

  insert(key) {
    this.root = this.insertRec(this.root, key);
  }

  delete(node, key) {
    // deleting node with no children
    if (node.left === null && node.right === null && key === node.data) {
      console.log(`${node.data} has been deleted`);
      return null;
    }

    if (node.left === null) {
    }
    // deleting node with one left children
    if (node.right === null && node.data === key) {
      return node.left;
    }

    // deleting node with one right children
    if (node.left === null && node.data === key) {
      return node.right;
    }

    // deleting node with both left and right
    if (node.data === key && node.left !== null && node.right !== null) {
      // do something
      let pointer = node.right;
      if (pointer.left === null) {
        node.data = pointer.data;
        node.right = pointer.right;
        return node;
      }
      let prev;
      while (pointer.left !== null) {
        prev = pointer;
        pointer = pointer.left;
      }
      prev.left = pointer.right;
      node.data = pointer.data;
      return node;
    }

    if (key < node.data) {
      node.left = this.delete(node.left, key);
    } else if (key > node.data) {
      node.right = this.delete(node.right, key);
    }
    return node;
  }

  deletion(key) {
    this.root = this.delete(this.root, key);
  }

  recurFind = (node, key) => {
    if (node.data === key) {
      return node;
    }
    if (node.left === null && node.right === null) {
      return "Node Not Found";
    }
    if (key < node.data) {
      return this.recurFind(node.left, key);
    } else if (key > node.data) {
      return this.recurFind(node.right, key);
    }
  };
  find(key) {
    return this.recurFind(this.root, key);
  }

  recurInOrder = (node, List) => {
    // base case
    if (node.left === null && node.right === null) {
      List.push(node.data);
      return List;
    }
    if (node.left !== null) {
      List = this.recurInOrder(node.left, List);
    }
    List.push(node.data);
    if (node.right !== null) {
      List = this.recurInOrder(node.right, List);
    }
    return List;
  };

  inOrder() {
    // left root right
    let List = this.recurInOrder(this.root, []);
    return List;
  }

  recurPreOrder = (node, List) => {
    // base case
    if (node.left === null && node.right === null) {
      List.push(node.data);
      return List;
    }
    List.push(node.data);
    if (node.left !== null) {
      List = this.recurPreOrder(node.left, List);
    }
    if (node.right !== null) {
      List = this.recurPreOrder(node.right, List);
    }
    return List;
  };

  preOrder() {
    // root left right
    // 3 1 0 2 5 6
    let List = this.recurPreOrder(this.root, []);
    return List;
  }

  recurPostOrder = (node, List) => {
    // base case
    if (node.left === null && node.right === null) {
      List.push(node.data);
      return List;
    }
    if (node.left !== null) {
      List = this.recurPostOrder(node.left, List);
    }
    if (node.right !== null) {
      List = this.recurPostOrder(node.right, List);
    }
    List.push(node.data);
    return List;
  };

  postOrder() {
    let List = this.recurPostOrder(this.root, []);
    return List;
  }

  getHeight = (node, height) => {
    if (node.left === null && node.right === null) return height;
    let returnHeight;
    let leftHeight = 0;
    if (node.left !== null) {
      leftHeight = this.getHeight(node.left, height);
    }
    let rightHeight = 0;
    if (node.right !== null) {
      rightHeight = this.getHeight(node.right, height);
    }
    if (leftHeight > rightHeight) {
      returnHeight = leftHeight;
    } else {
      returnHeight = rightHeight;
    }
    height += returnHeight;
    return height;
  };

  height() {
    return this.getHeight(this.root, 1) - 1;
  }

  getDepth = (node, number, depth) => {
    if (node.data === number) {
      return depth;
    }
    if (node.left === null && node.right === null) return "Not Found";
    if (node.left !== null && node.data > number) {
      depth++;
      return this.getDepth(node.left, number, depth);
    } else if (node.right !== null && node.data < number) {
      depth++;
      return this.getDepth(node.right, number, depth);
    }
  };

  depth(number) {
    return this.getDepth(this.root, number, 0);
  }

  checkBalanceRecur = (node, height) => {
    if (node.left === null && node.right === null) return "No Depth";

    let leftHeight = 0;
    if (node.left !== null) {
      leftHeight = this.getHeight(node.left, height + 1);
    }
    let rightHeight = 0;
    if (node.right !== null) {
      rightHeight = this.getHeight(node.right, height + 1);
    }
    let diff;
    if (leftHeight > rightHeight) {
      diff = leftHeight - rightHeight;
    } else {
      diff = rightHeight - leftHeight;
    }
    return diff <= 1;
  };

  isBalance() {
    return this.checkBalanceRecur(this.root, 0);
  }
  balanceThisTree = (node) => {
    let List = this.inOrder(node);
    return buildTreeAlgo(mergeSort(removeDuplicate(List)), 0, List.length - 1);
  };

  rebalance() {
    this.root = this.balanceThisTree(this.root);
  }
}

let makeRandomArr = (n) => {
  let Arr = [];
  for (let i = 0; i < n; i++) {
    Arr.push(Math.floor(Math.random() * 100));
  }
  return Arr;
};

let arr = makeRandomArr(11);
let myBinaryTree = new buildTree(arr);
console.log(mergeSort(arr));
console.log(prettyPrint(myBinaryTree.root));
let isBalance = myBinaryTree.isBalance();
console.log({ isBalance }); // true
let inOrder = myBinaryTree.inOrder(); // left root right
let preOder = myBinaryTree.preOrder(); // root left right
let postOrder = myBinaryTree.postOrder(); //left right root
console.log({ inOrder, preOder, postOrder });
for (let i = 101; i < 119; i++) {
  myBinaryTree.insert(i);
}
isBalance = myBinaryTree.isBalance();
console.log({ isBalance }); // false;
myBinaryTree.rebalance();
isBalance = myBinaryTree.isBalance();
console.log({ isBalance }); // true;
inOrder = myBinaryTree.inOrder(); // left root right
preOder = myBinaryTree.preOrder(); // root left right
postOrder = myBinaryTree.postOrder(); //left right root
console.log({ inOrder, preOder, postOrder });
console.log(prettyPrint(myBinaryTree.root));
