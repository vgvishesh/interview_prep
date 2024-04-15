
import { Injectable } from '@nestjs/common';
@Injectable()
export class DSAService {
  private mem = new Map<number, number>();
  getHello(): string {
    return 'Hello World!';
  }
  missingNumber(array: number[], n: number) {
    const arrSet = new Set<number>();
    for (let i = 1; i <= n; i++) {
      arrSet.add(i);
    }

    array.forEach(element => {
      arrSet.delete(element)
    });

    for (let k of arrSet.values()) {
      return k;
    }
    return -1;
  }

  trailingZeroes(n: number) {
    const floor = Math.floor(n / 5);
    const numZero1 = floor % 2 == 0 ? floor / 2 : Math.floor(floor / 2) + 1;
    const num10s = Math.floor(n / 10);
    return num10s + numZero1
  }

  climbStairs(n: number) {
    if (n < 0) {
      return 0;
    }
    if (n == 0) {
      return 1;
    }
    if (this.mem.has(n)) {
      return this.mem.get(n);
    }

    const steps = this.climbStairs(n - 2) + this.climbStairs(n - 1);
    this.mem.set(n, steps);

    return steps;
  }

  reverseWords(s: string): string {
    const words = s.match(/\b\w+\b/g) || [];
    let fs = ''

    for (let i = words.length - 1; i >= 0; i--) {
      fs += words[i] + " ";
    }

    fs = fs.trim();
    return fs;
  };

  productExceptSelf(nums: number[]): number[] {
    let prod = 1
    const forwardProd = nums.map(x => {
      prod *= x;
      return prod;
    });

    prod = 1
    const revProd: number[] = [nums.length];
    for (let i = nums.length - 1; i >= 0; i--) {
      prod *= nums[i];
      revProd[i] = prod;
    }

    console.log(revProd);
    console.log(forwardProd);

    let finalProd: number[] = [];
    for (let i = 0; i < nums.length; i++) {
      finalProd[i] = i - 1 < 0 ? revProd[i + 1] : i + 1 > nums.length - 1 ? forwardProd[i - 1] : forwardProd[i - 1] * revProd[i + 1];
      finalProd[i] = finalProd[i] == -0 ? 0 : finalProd[i];
    }
    return finalProd;
  }

  increasingTriplet(nums: number[]) {
    let a = Number.MAX_VALUE;
    let b = Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= a) {
        a = nums[i];
      } else if (nums[i] <= b) {
        b = nums[i];
      } else {
        return [a, b, nums[i]];
      }
    }
    return false;
  }

  compress(chars: string[]): number {
    let rep = chars[0];
    let count = 1;
    let str = ''
    for (let i = 1; i < chars.length; i++) {
      if (rep == chars[i]) {
        count++;
      } else {
        if (count == 1) {
          str = str.concat(rep);
          rep = chars[i];
        } else {
          str = str.concat(rep);
          str = str.concat(String(count));
          count = 1;
          rep = chars[i];
        }
      }
    }

    if (count == 1) {
      str = str.concat(rep);
    } else if (count > 1) {
      str = str.concat(rep);
      str = str.concat(String(count));
    }

    console.log(str);
    const pl = chars.length;
    for (let i = 0; i < str.length; i++) {
      chars.push(str.at(i))
    }
    chars.slice()
    return str.length;
  };

  isSubsequence(s: string, t: string): boolean {
    if (s.length > t.length) return false;
    let small = s;
    let big = t;

    let j = 0;
    for (let i = 0; i < big.length && j < small.length; i++) {
      if (big[i] == small[j]) {
        j++;
      }
    }

    if (j == small.length) {
      return true;
    }
    return false;
  };

  maxArea(height: number[]): number {
    let i = 0;
    let j = height.length - 1;
    let mw = 0;
    while (i < j) {
      let wl = Math.min(height[i], height[j]) * (j - i);
      if (wl > mw) {
        mw = wl;
      }
      if (height[i] < height[j]) {
        i++;
      } else {
        j--;
      }
    }
    return mw;
  }

  maxOperations(nums: number[], k: number): number {
    const freq = new Map<number, number>();
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (freq.has(nums[i])) {
        freq.set(nums[i], freq.get(nums[i]) + 1)
      } else {
        freq.set(nums[i], 1);
      }
    }

    for (let i = 0; i < nums.length; i++) {
      if (k < nums[i]) continue;
      const t = k - nums[i];
      const numF = freq.get(nums[i]);
      if (t == nums[i]) {
        if (numF < 2) {
          continue;
        }
      }
      const tF = freq.get(t);

      if (tF && numF > 0 && tF > 0) {
        count++;
        freq.set(nums[i], freq.get(nums[i]) - 1);
        freq.set(t, freq.get(t) - 1);
      }
    }

    return count;
  };

  findMaxAverage(nums: number[], k: number): number {
    let sum = 0;
    let mAvg = 0;
    for (let i = 0; i < k; i++) {
      sum += nums[i];
    }
    mAvg = sum;

    for (let i = 0, j = k; j < nums.length; j++, i++) {
      sum -= nums[i];
      sum += nums[j];
      let avg = sum;
      if (avg > mAvg) {
        mAvg = avg
      }
    }

    return mAvg / k;
  };

  maxVowels(s: string, k: number): number {
    function isVowel(s: string) {
      return ['a', 'e', 'i', 'o', 'u'].includes(s);
    }

    let mCount = 0;
    let pCount = 0;
    for (let i = 0; i < k; i++) {
      if (isVowel(s[i])) {
        pCount++;
      }
    }

    mCount = pCount;
    for (let i = 0, j = k; j < s.length; j++, i++) {
      if (isVowel(s[i])) {
        pCount -= 1;
      }
      if (isVowel(s[j])) {
        pCount += 1
      }
      mCount = Math.max(mCount, pCount)
    }
    return mCount;
  };

  closeStrings(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) {
      return false;
    }

    function createFreqMapArr(w: string): { arr: number[], fr: Map<string, number> } {
      const fM = new Map<string, number>();
      for (let i = 0; i < w.length; i++) {
        if (fM.get(w[i])) {
          fM.set(w[i], fM.get(w[i]) + 1);
        } else {
          fM.set(w[i], 1);
        }
      }
      let arr: number[] = [];
      for (let [k, v] of fM) {
        arr.push(v);
      }
      return { arr: arr.sort(), fr: fM };
    }

    const a1 = createFreqMapArr(word1);
    const a2 = createFreqMapArr(word2);

    for (let i = 0; i < word1.length; i++) {
      if (a1.arr[i] !== a2.arr[i]) {
        return false;
      }
    }

    for (let [k, v] of a1.fr) {
      const find = a2.fr.get(k);
      if (!find || find == 0) {
        return false;
      }
    }

    return true;
  };

  equalPairs(grid: number[][]): number {
    function createHeaderColMap(grid: number[][]): Map<number, number[]> {
      const colMap = new Map<number, number[]>();
      for (let i = 0; i < grid.length; i++) {
        let cols = colMap.get(grid[0][i]);
        if (!cols) {
          colMap.set(grid[0][i], [i]);
        } else {
          cols.push(i);
          colMap.set(grid[0][i], cols);
        }
      }
      return colMap;
    }

    let count = 0;
    const colMap = createHeaderColMap(grid);
    for (let i = 0; i < grid.length; i++) {
      const fe = grid[i][0];
      const colsToCheck = colMap.get(fe);
      if (!colsToCheck) {
        continue;
      }

      colsToCheck.forEach(c => {
        let isMatch = false;
        for (let j = 0; j < grid.length; j++) {
          if (grid[i][j] != grid[j][c]) {
            isMatch = false;
            break;
          }
          isMatch = true;
        }
        if (isMatch) {
          count++;
        }
      })
    }
    return count;
  };

  largestAltitude(gain: number[]): number {
    let max = 0 > gain[0] ? 0 : gain[0];
    let current = gain[0];
    for (let i = 1; i < gain.length; i++) {
      current += gain[i];
      if (current > max) {
        max = current;
      }
    }
    return max;
  };

  removeStars(s: string): string {
    const stack: string[] = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] != '*') {
        stack.push(s[i]);
      } else {
        stack.pop();
      }
    }
    return stack.join("");
  };

  removeKdigits(num: string, k: number): string {
    const p: [{ val: number, index: number }] = [{
      val: parseInt(num[0]), index: 0
    }];
    let i = 0;
    while (i < num.length) {
      const seek = k;
      let isAdded = false;
      let last = p[p.length - 1];
      for (let j = i; j <= i + seek && j < num.length; j++) {
        if (parseInt(num[j]) <= last.val && last.index < j) {
          isAdded = true;
          k -= (j - last.index)
          p.pop();
          p.push({ val: parseInt(num[j]), index: j });
          last = p[p.length - 1];
        }
      }

      i = last.index;
      if (!isAdded) {
        let k = last.index + 1;
        while (num[k] > num[i]) {
          i++;
          k++;
        }
        i = k;
        i < num.length ? p.push({ val: parseInt(num[i]), index: i }) : "";
      } else if (k == 0) {
        for (let k = i + 1; k < num.length; k++) {
          p.push({ val: parseInt(num[k]), index: k });
        }
        i = num.length;
      }
    }

    // console.log(p);
    while (k > 0) {
      p.pop();
      k--;
    }

    //join stirngs

    let final = ""
    p.forEach(obj => {
      // console.log(obj.val.toString());
      final = final.concat(obj.val.toString());
    })

    let trimP = 0;
    for (trimP = 0; trimP < final.length; trimP++) {
      if (final[trimP] == '0') {
      } else {
        break;
      }
    }

    final = final.slice(trimP);

    return final == "" ? "0" : final;
  };

  asteroidCollision(asteroids: number[]): number[] {
    const stack: number[] = [];
    let isAdd: boolean;
    for (let i = 0; i < asteroids.length; i++) {
      if (stack.length == 0) {
        stack.push(asteroids[i]);
        continue;
      }
      isAdd = false;
      let top = stack[stack.length - 1];
      if (top * asteroids[i] > 0 || asteroids[i] > 0) {
        stack.push(asteroids[i]);
      } else {
        while (stack.length >= 0 && top > 0) {
          if (top < Math.abs(asteroids[i])) {
            stack.pop();
            isAdd = true;
          } else if (top == Math.abs(asteroids[i])) {
            stack.pop();
            isAdd = false;
            break;
          } else {
            isAdd = false;
            break;
          }
          top = stack[stack.length - 1] ?? undefined;
        }
        if (isAdd) {
          stack.push(asteroids[i])
        }
      }
    }
    return stack;
  };

  decodeString(s: string): string {
    const stack: string[] = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] != ']') {
        stack.push(s[i]);
      } else {
        let ts: string[] = [];
        while (stack[stack.length - 1] != '[') {
          ts.push(stack.pop())
        }
        let fs = ts.reverse().join('');
        stack.pop(); //pop '['

        let j = stack.length - 1;
        let count = '';
        while (!isNaN(Number(stack[j]))) {
          count += stack[j];
          stack.pop();
          j--;
        }

        let countNum = parseInt(count.split('').reverse().join(''));
        let p = '';
        while (countNum > 0) {
          p = p.concat(fs);
          countNum--;
        }
        stack.push(p);
      }
    }
    let rs = ''
    for (let i = 0; i < stack.length; i++) {
      rs = rs.concat(stack[i]);
    }
    return rs;
  };

  longestOnes(nums: number[], k: number): number {
    let i = 0;
    let j = 0;
    let max = 0;
    let ones = 0;
    let zeros = 0;
    while (i < nums.length) {
      if (nums[i] == 1) {
        ones++;
      } else {
        zeros++;
        if (zeros <= k) {
          ones++;
        } else {
          while (j < i && zeros > k) {
            if (nums[j] == 0) {
              zeros--;
            } else {
              ones--;
            }
            j++;
          }
        }
      }
      i++;
      if (ones > max) {
        max = ones;
      }
    }
    return max;
  };

  longestSubarray(nums: number[]): number {
    let i = 0;
    let j = 0;
    let k = 0;
    let size = 0;
    let hasZeros = false;
    let max = 0;
    while (i < nums.length) {
      if (nums[i] == 1) {
        size++;
      } else {
        hasZeros = true;
        k++;
        while (j < i && k > 1) {
          if (nums[j] == 0) {
            k--;
          } else {
            size--;
          }
          j++;
        }
      }
      if (size > max) {
        max = size;
      }
      i++;
    }
    if (hasZeros) {
      return max;
    }
    return max - 1;
  };
}

export class RecentCounter {
  private record: number[] = [];
  private head = 0;
  constructor() {
  }

  ping(t: number): number {
    if (this.record.length == 0) {
      this.record.push(t);
    } else {
      this.record.push(t);
      for (let j = this.head; j < this.record.length; j++) {
        if (this.record[j] >= t - 3000 && this.record[j] <= t) {
          break;
        } else {
          this.head++;
        }
      }
    }
    return this.record.length - this.head;
  }
}

/**
 * Definition for singly-linked list.
 */
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

export class LinkList {
  head = new ListNode();
  constructor(nums: number[]) {
    let ptr = this.head;
    ptr.val = nums[0];
    for (let i = 1; i < nums.length; i++) {
      ptr.next = new ListNode(nums[i]);
      ptr = ptr.next;
    }
  }

  printLL() {
    let ptr = this.head;
    const a: number[] = [];
    while (ptr != null) {
      a.push(ptr.val);
      ptr = ptr.next;
    }

    return a;
  }

  pairSum(head: ListNode | null): number {
    let size: number;
    function calc(head: ListNode, twin: ListNode, num: number): { sum: number, nextTwin: ListNode } {
      if (head.next == null) {
        size = num + 1;
        let sum = head.val + twin.val;
        return { sum, nextTwin: twin.next };
      }
      let res = calc(head.next, twin, num + 1);
      if (num + 1 > size / 2) {
        let sum = Math.max(res.sum, head.val + res.nextTwin.val);
        return { sum, nextTwin: res.nextTwin.next }
      }
      return { sum: res.sum, nextTwin: res.nextTwin }
    }

    let res = calc(head, head, 0);
    return res.sum;
  };

  reverseList(head: ListNode | null): ListNode | null {
    if (head == null) {
      return head;
    }

    let newHead: ListNode;
    let res = this.revIt(head, newHead);
    head.next = null;
    this.head = res.newHead;
    return head;
  };

  revIt(head: ListNode | null, newHead: ListNode): { head: ListNode | null, newHead: ListNode | null } {
    if (head.next == null) {
      newHead = head;
      return { head, newHead };
    }
    let res = this.revIt(head.next, newHead);
    res.head.next = head;
    return { head, newHead: res.newHead };
  }

  oddEvenList(head: ListNode | null): ListNode | null {
    if (head == null) {
      return head;
    }

    let oPtr = head;
    let ePtr = head.next;
    let eHead = head.next;
    let l: ListNode;


    while (oPtr != null && ePtr != null) {
      if (oPtr.next) {
        oPtr.next = oPtr.next.next;
      }
      if (ePtr.next) {
        ePtr.next = ePtr.next.next;
      }

      l = oPtr;
      oPtr = oPtr.next;
      ePtr = ePtr.next;
    }

    if (oPtr == null) {
      l.next = eHead;
    } else {
      oPtr.next = eHead
    }
    return head;
  };

  deleteMiddle(head: ListNode | null): ListNode | null {
    let ptr = head;
    let nodeCount = 0;
    while (ptr != null) {
      nodeCount++;
      ptr = ptr.next;
    }
    const mid = Math.floor(nodeCount / 2);
    let i = 0;
    if (mid == 0) {
      head = null;
    } else {
      ptr = head;
      while (i < mid) {
        if (i + 1 == mid) {
          ptr.next = ptr.next.next
        } else {
          ptr = ptr.next;
        }
        i++;
      }
    }
    return head;
  };
}

export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

export class BST {
  root = new TreeNode();
  constructor(nums: number[]) {
    this.root.val = nums[0];
    let ptr = this.root;
    for (let i = 1; i < nums.length; i++) {
      while (ptr != null) {
        if (nums[i] > ptr.val) {
          if (ptr.right != null) {
            ptr = ptr.right;
          } else {
            ptr.right = new TreeNode(nums[i]);
            break;
          }
        } else {
          if (ptr.left != null) {
            ptr = ptr.left;
          } else {
            ptr.left = new TreeNode(nums[i]);
            break;
          }
        }
      }
    }
  }

  searchBST(root: TreeNode | null, val: number): TreeNode | null {
    function search(root: TreeNode) {
      if (root == null) {
        return null;
      }
      if (root.val == val) {
        return root;
      }
      if (val > root.val) {
        return search(root.right);
      } else {
        return search(root.left);
      }
    }

    const res = search(root);
    return res;
  }

  inorderTraversal(root: TreeNode): number[] {
    let arr: number[] = [];
    function traverse(root: TreeNode) {
      if (root == null) {
        return;
      }
      traverse(root.left)
      arr.push(root.val);
      traverse(root.right);
    }

    traverse(root);
    return arr;
  }
}

export class BinaryTree {
  root = new TreeNode();
  constructor(nums: (number | null)[]) {
    const nodes: TreeNode[] = [];
    this.root.val = nums[0];
    nodes.push(this.root);
    for (let i = 1; i < nums.length; i++) {
      nums[i] == null ? nodes.push(null) : nodes.push(new TreeNode(nums[i]));
    }
    let k = 0;
    console.log(nodes);
    while (2 * k + 1 < nums.length) {
      if (nodes[k] != null) {
        const leftNode = nodes[2 * k + 1];
        const rightNode = nodes[2 * k + 2];
        nodes[k].left = leftNode;
        nodes[k].right = rightNode;
      }
      k++;
    }
  }

  inorderTraversal(root: TreeNode): number[] {
    let arr: number[] = [];
    function traverse(root: TreeNode) {
      if (root == null) {
        return;
      }
      traverse(root.left)
      arr.push(root.val);
      traverse(root.right);
    }

    traverse(root);
    return arr;
  }

  leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    function findLeafSequence(root: TreeNode): number[] {
      const sequence: number[] = [];
      function find(root: TreeNode) {
        if (root.left == null && root.right == null) {
          sequence.push(root.val);
          return;
        }

        if (root.left) find(root.left);
        if (root.right) find(root.right);
        return;
      }
      find(root);
      return sequence;
    }

    const seq1 = findLeafSequence(root1);
    const seq2 = findLeafSequence(root2);

    if (seq1.length != seq2.length) {
      return false;
    }

    for (let i = 0; i < seq1.length; i++) {
      if (seq1[i] != seq2[i]) {
        return false;
      }
    }
    return true;
  }

  static goodNodes(root: TreeNode | null): number {
    const stack: number[] = [];
    const goodNodes: TreeNode[] = [];
    function findGoodNodes(root: TreeNode) {
      if (root == null) {
        return;
      }

      let isAdded = false;
      const top = stack[stack.length - 1] ?? undefined;
      if (top == undefined || top <= root.val) {
        stack.push(root.val);
        goodNodes.push(root);
        isAdded = true;
      }

      findGoodNodes(root.left);
      findGoodNodes(root.right);

      if (isAdded) {
        stack.pop();
      }
    }
    findGoodNodes(root);
    return goodNodes.length;
  };

  static pathSum(root: TreeNode | null, targetSum: number): number {
    const trail: TreeNode[] = [];
    let pCount = 0;
    let sum = 0;
    function findPaths(root: TreeNode) {
      if (root == null) {
        return;
      }

      sum += root.val;
      trail.push(root);

      if (sum == targetSum) {
        pCount++;
      }

      let p = sum;
      let i = 0;
      while (i < trail.length) {
        p -= trail[i].val;
        if (p == targetSum && trail.slice(i + 1).length > 0) {
          pCount++;
        }
        i++;
      }

      findPaths(root.left);
      findPaths(root.right);
      sum -= root.val;
      trail.pop();
    }
    findPaths(root);
    return pCount;
  };

  static lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    function findNodeRoute(root: TreeNode, target: TreeNode, route: TreeNode[]): boolean {
      if (root == null) {
        return false;
      }
      route.push(root);
      if (root.val == target.val) {
        return true;
      }
      let isInLeft = findNodeRoute(root.left, target, route);
      let isInRight: boolean;

      if (!isInLeft) {
        isInRight = findNodeRoute(root.right, target, route);
      }

      if (isInLeft || isInRight) {
        return true;
      }

      route.pop();
      return false;
    }

    const routeP: TreeNode[] = [];
    const routeQ: TreeNode[] = [];
    findNodeRoute(root, p, routeP);
    findNodeRoute(root, q, routeQ);
    let smaller = routeP.length > routeQ.length ? routeQ : routeP;
    let ancestor: TreeNode;

    for (let i = 0; i < smaller.length; i++) {
      if (routeP[i].val == routeQ[i].val) {
        ancestor = routeP[i];
      } else {
        break;
      }
    }
    return ancestor;
  }

  static rightSideView(root: TreeNode | null): number[] {
    let traverseNode: TreeNode[] = [];
    const rightSideView: number[] = [];
    if (root == null) {
      return rightSideView;
    }
    traverseNode.push(root);

    while (traverseNode.length > 0) {
      rightSideView.push(traverseNode[0].val);
      let nextLevel: TreeNode[] = [];
      for (let i = 0; i < traverseNode.length; i++) {
        if (traverseNode[i].right) {
          nextLevel.push(traverseNode[i].right);
        }
        if (traverseNode[i].left) {
          nextLevel.push(traverseNode[i].left);
        }
      }
      traverseNode = nextLevel;
    }

    return rightSideView;
  };

  static maxLevelSum(root: TreeNode | null): number {
    let traverseNode: TreeNode[] = [];
    const levelSum: { level: number, sum: number }[] = []
    let l = 1;
    traverseNode.push(root);
    while (traverseNode.length > 0) {
      let nextLevel: TreeNode[] = [];
      let sum = 0;
      for (let i = 0; i < traverseNode.length; i++) {
        sum += traverseNode[i].val;
        if (traverseNode[i].right) {
          nextLevel.push(traverseNode[i].right);
        }
        if (traverseNode[i].left) {
          nextLevel.push(traverseNode[i].left);
        }
      }
      levelSum.push({ level: l++, sum });
      traverseNode = nextLevel;
    }

    let max = levelSum[0].sum;
    let level = levelSum[0].level;
    for (let i = 1; i < levelSum.length; i++) {
      if (levelSum[i].sum > max) {
        max = levelSum[i].sum;
        level = levelSum[i].level;
      }
    }
    return level;
  };
}