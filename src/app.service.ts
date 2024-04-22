
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

  removeDuplicates(nums: number[]): number {
    let count = 0;
    let i = 0;
    let j = 0;
    let p = nums[0];
    while (i < nums.length) {
      if (nums[i] != p) {
        count = 0;
        p = nums[i];
      }
      if (count < 2) {
        if (j < i) {
          nums[j] = nums[i];
        }
        j++;
        i++;
        count++;
      } else {
        i++;
        count++;
      }
    }
    return j;
  };

  maxProfit(prices: number[]): number {
    let p = 0;
    let bp = prices[0];
    for (let i = 1; i < prices.length; i++) {
      if (bp < prices[i]) {
        p += prices[i] - bp;
      }
      bp = prices[i];
    }
    return p;
  };

  canJump(nums: number[]): boolean {
    let stack: { val: number, pos: number }[] = [];
    stack.push({ val: nums[0], pos: 0 });
    let mem: Set<number> = new Set();
    function top(): { val: number, pos: number } {
      return stack[stack.length - 1];
    }

    while (stack.length > 0) {
      let postition = top().pos + top().val;
      if (postition >= nums.length - 1) {
        return true;
      }
      if (nums[postition] != 0 && !mem.has(postition)) {
        stack.push({ val: nums[postition], pos: postition });
      } else {
        let seek = stack.pop();
        while (seek.val - 1 <= 0 && stack.length > 0) {
          mem.add(seek.pos);
          seek = stack.pop();
        }
        if (seek.val - 1 > 0) {
          stack.push({ val: seek.val - 1, pos: seek.pos });
        }
      }
    }
    return false;
  };

  hIndex(citations: number[]): number {
    citations.sort();
    let h = 0;
    for (let i = 0; i < citations.length; i++) {
      let count = citations.length - i;
      if (count > h) {
        h = count;
      }
    }
    return h;
  };

  rob(nums: number[]): number {
    const mem: number[] = new Array(nums.length).fill(-1);
    function findRob(index: number): number {
      if (index < 0) {
        return 0;
      }

      if (mem[index] != -1) {
        return mem[index];
      }

      let robAmount = Math.max(nums[index] + findRob(index - 2), findRob(index - 1));
      mem[index] = robAmount;
      return robAmount;
    }
    return findRob(nums.length - 1);
  }

  isInterleave(s1: string, s2: string, s3: string): boolean {
    type entry = {
      i: number,
      j: number,
      k: number,
    }
    let i = 0;
    let j = 0;
    let k = 0;
    let stack: entry[] = [];
    let pop = false;
    let checkMap: Map<number, Map<number, number>> = new Map();

    while (i < s3.length) {
      let target = s3[i];
      if (j < s1.length && k < s2.length && target == s1[j] && target == s2[k]) {
        if (!pop && checkMap?.get(j)?.get(k) === undefined) {
          // stack.push({ i, j, k, selected: 0 });
          stack.push({ i, j, k });
          j++;
          i++;
        } else {
          pop = false;
          i++;
          k++;
        }
      } else if (j < s1.length && target == s1[j]) {
        j++;
        i++;
      } else if (k < s2.length && target == s2[k]) {
        k++;
        i++;
      } else {
        if (stack.length == 0) {
          return false;
        }
        let top = stack.pop();
        i = top.i;
        j = top.j;
        k = top.k;
        pop = true;
        let mv = checkMap.get(j);
        if (mv) {
          mv.set(k, i);
        } else {
          checkMap.set(j, new Map().set(k, i));
        }
      }
    }
    if (k == s2.length && j == s1.length) {
      return true;
    }
    return false;
  };

  candy(ratings: number[]): number {
    const candy: number[] = [1];
    for (let i = 1; i < ratings.length; i++) {
      if (ratings[i] > ratings[i - 1]) {
        candy[i] = candy[i - 1] + 1;
      } else if (ratings[i] == ratings[i - 1]) {
        candy[i] = 1;
      } else {
        candy[i] = 1;
        let k = i;
        while (k - 1 >= 0 && ratings[k - 1] > ratings[k] && candy[k - 1] <= candy[k]) {
          candy[k - 1] += 1;
          k--;
        }
      }
    }

    const sum = candy.reduce((acc, curr) => acc + curr, 0);
    return sum;
  };

  trap(height: number[]): number {
    let count = 0;
    let left: number[] = [height[0]];
    let right: number[] = [];
    let max = height[0];
    for (let i = 1; i < height.length; i++) {
      if (height[i] > max) {
        max = height[i];
      }
      left[i] = max;
    }
    max = height[height.length - 1];
    right[height.length - 1] = max;
    for (let i = height.length - 2; i >= 0; i--) {
      if (height[i] > max) {
        max = height[i];
      }
      right[i] = max;
    }

    for (let i = 0; i < height.length; i++) {
      count += Math.min(left[i], right[i]) - height[i];
    }

    return count;
  };

  findSubString(s: string, words: string[]): number[] {
    const indices: number[] = [];
    let i = 0;
    let wordLength = words[0].length;
    let k = wordLength * words.length;
    let hash = new Map<string, number>()

    words.forEach(w => {
      if (hash.has(w)) {
        const val = hash.get(w);
        hash.set(w, val + 1);
      } else {
        hash.set(w, 1);
      }
    })

    function getWords(startIndex: number, size: number): string[] {
      let count = 0;
      let current = '';
      let windowWords: string[] = [];
      for (let j = startIndex; j < startIndex + size; j++) {
        if (count < wordLength) {
          current += s[j];
          count++;
        } else {
          windowWords.push(current);
          current = s[j];
          count = 1;
        }
      }
      windowWords.push(current);
      return windowWords
    }

    function isSubString(arrWords: string[], stateMap: Map<string, number>): boolean {
      for (let i = 0; i < arrWords.length; i++) {
        const w = arrWords[i];
        if (stateMap.has(w)) {
          const val = stateMap.get(w);
          if (val == 0) {
            return false;
          }
          stateMap.set(w, val - 1);
        } else {
          return false;
        }
      }

      return true;
    }

    while (i + k <= s.length) {
      const arrWords = getWords(i, k);
      if (isSubString(arrWords, new Map(hash))) {
        indices.push(i);
        // i += wordLength;
        // } else {
      }
      i++;
    }

    return indices;
  }

  minWindow(s: string, t: string): string {
    if (t.length > s.length) {
      return '';
    }
    let thash: Map<string, number> = new Map();
    let movingMap: Map<string, number> = new Map();
    let arr = new Array<{ key: string, index: number }>();

    for (let i = 0; i < s.length; i++) {
      if (t.includes(s[i])) {
        arr.push({ key: s[i], index: i });
      }
    }

    if (arr.length < t.length) {
      return '';
    }

    for (let i = 0; i < t.length; i++) {
      if (thash.has(t[i])) {
        let val = thash.get(t[i]);;
        thash.set(t[i], val + 1);
      } else {
        thash.set(t[i], 1);
      }
    }

    for (let i = 0; i < t.length; i++) {
      const val = movingMap.get(arr[i].key);
      if (val) {
        movingMap.set(arr[i].key, val + 1);
      } else {
        movingMap.set(arr[i].key, 1);
      }
    }

    function isMatch(): boolean {
      for (let [k, v] of thash) {
        const mVal = movingMap.get(k);
        if (!mVal || mVal < v) {
          return false;
        }
      }
      return true;
    }

    let start = 0;
    let end = t.length - 1;
    let minWord = '';
    while (start <= arr.length - t.length && end < arr.length) {
      if (isMatch()) {
        let currentword = s.substring(arr[start].index, arr[end].index + 1);
        if (minWord == '' || minWord.length > currentword.length) {
          minWord = currentword;
        }
        const val = movingMap.get(arr[start].key);
        movingMap.set(arr[start].key, val - 1);
        start++;
      } else {
        end++;
        if (end < arr.length) {
          const newVal = movingMap.get(arr[end].key);
          newVal ? movingMap.set(arr[end].key, newVal + 1) : movingMap.set(arr[end].key, 1);
        }
      }
    }

    return minWord;
  }

  calculate(s: string): number {
    let mS: string[] = [];

    function calc(ro: string, o: string, lo: string) {
      let res: number;
      if (o == '') {
        return ro;
      }
      if (ro == '') {
        if (o == '-') {
          res = -1 * parseInt(lo);
        } else {
          res = parseInt(lo);
        }
        return res;
      }

      if (o == '-') {
        res = parseInt(ro) - parseInt(lo);
      } else if (o == '+') {
        res = parseInt(ro) + parseInt(lo);
      }
      return res;
    }

    function calibrate() {
      let sS: string[] = [];
      while (mS.length > 0 && mS[mS.length - 1] != '(') {
        let pop = mS.pop();
        sS.push(pop);
      }

      if (mS.length > 0 && mS[mS.length - 1] == '(') {
        mS.pop();
      }

      let isRightBuilt = false;
      let isOpertorRecorded = false;
      let ro: string = '';
      let lo: string = '';
      let o: string = '';
      while (sS.length > 0) {
        let top = sS.length - 1;
        if (!isRightBuilt && (sS[top] !== '+' && sS[top] !== '-')) {
          ro += sS.pop();
        } else if (sS[top] == '+' || sS[top] == '-') {
          if (isOpertorRecorded) {
            let res = calc(ro, o, lo);
            sS.push(res.toString());
            isOpertorRecorded = false;
            isRightBuilt = false;
            ro = '';
            lo = '';
            o = '';
          } else {
            o = sS.pop();
            isRightBuilt = true;
            isOpertorRecorded = true
          }
        } else {
          lo += sS.pop();
        }
      }

      let res = calc(ro, o, lo);
      sS.push(res.toString());

      mS.push(sS.pop());
    }

    for (let i = 0; i < s.length; i++) {
      if (s[i] == ' ') {
        continue;
      } else if (s[i] != ')') {
        mS.push(s[i]);
      } else {
        calibrate()
      }
    }

    if (mS.length > 1) {
      calibrate();
    }

    return parseInt(mS.pop());
  }

  ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    let originalSet: Set<string> = new Set(wordList);
    let queue: string[] = [];
    queue.push(beginWord);
    let count = 0;
    originalSet.delete(beginWord);
    function score(source: string, destination: string): number {
      let score = 0;
      for (let i = 0; i < source.length; i++) {
        if (source[i] != destination[i]) {
          score++;
        }
      }
      return score;
    }

    while (queue.length > 0) {
      for (let word of queue) {
        if (word == endWord) {
          return count + 1;
        }
      }

      let adjacents: string[] = [];
      queue.forEach(q => {
        originalSet.forEach(x => {
          if (score(x, q) == 1) {
            adjacents.push(x);
          }
        });
        adjacents.forEach(a => originalSet.delete(a));
      })
      queue = adjacents;
      count++;
    }

    return 0;
  };

  findWords(board: string[][], words: string[]): string[] {
    type Index = {
      row: number,
      col: number
    }
    let letterMap: Map<string, Index[]> = new Map();
    let stateMap: Map<number, Set<number>> = new Map();
    let mem: Map<number, Map<number, Set<string>>> = new Map();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (letterMap.has(board[i][j])) {
          let data = letterMap.get(board[i][j]);
          data.push({ row: i, col: j });
          letterMap.set(board[i][j], data);
        } else {
          letterMap.set(board[i][j], [{ row: i, col: j }]);
        }
      }
    }

    function getValidNeighbors(next: string, index: Index, stateMap: Map<number, Set<number>>): Index[] {
      function isInBounds(index: Index): boolean {
        if (0 <= index.row && index.row < board.length && 0 <= index.col && index.col < board[0].length) {
          return true;
        }
        return false;
      }

      function isNotInStateMap(index: Index) {
        let cols = stateMap.get(index.row);
        if (!cols) {
          return true;
        }

        if (!cols.has(index.col)) {
          return true;
        }

        return false;
      }

      let ids: Index[] = [{ row: index.row + 1, col: index.col },
      { row: index.row, col: index.col + 1 },
      { row: index.row - 1, col: index.col },
      { row: index.row, col: index.col - 1 }]

      let valid: Index[] = [];
      ids.forEach(id => {
        if (isInBounds(id) && board[id.row][id.col] == next && isNotInStateMap(id)) {
          valid.push(id);
        }
      });
      return valid;
    }

    function findWord(word: string, start: number, index: Index, stateMap: Map<number, Set<number>>): { result: boolean, length: number } {
      if (start >= word.length) {
        return { result: true, length: start };
      }

      let memData = mem.get(index.row)?.get(index.col) ?? new Set();
      let currWord = word.slice(start, word.length);
      for (let w of memData) {
        if (w.includes(currWord)) {
          let found = true;
          for (let i = 0; i < currWord.length; i++) {
            if (w[i] != currWord[i]) {
              found = false;
              break;
            }
          }
          if (found) {
            return { result: true, length: start + currWord.length }
          }
        }
      }

      let next = word[start];
      let neighbors = getValidNeighbors(next, index, stateMap);
      if (neighbors.length == 0) {
        return { result: false, length: start };
      }

      for (let i = 0; i < neighbors.length; i++) {
        let data = stateMap.get(neighbors[i].row);
        if (!data) {
          stateMap.set(neighbors[i].row, new Set([neighbors[i].col]));
        } else {
          data.add(neighbors[i].col)
          stateMap.set(neighbors[i].row, data);
        }
        let res = findWord(word, start + 1, neighbors[i], stateMap);
        if (!res.result) {
          // return true;
          // } {
          data = stateMap.get(neighbors[i].row);
          data.delete(neighbors[i].col);
          if (data.size == 0) {
            stateMap.delete(neighbors[i].row);
          }
        }
        let d1 = mem.get(index.row);
        if (!d1) {
          mem.set(index.row, new Map([[index.col, new Set([word.slice(start, res.length)])]]));
        } else {
          let d2 = d1.get(index.col) ?? new Set();
          mem.set(index.row, d1.set(index.col, d2.add(word.slice(start, res.length))));
        }

        if (res.result) {
          return { result: res.result, length: res.length }
        }
      }

      return { result: false, length: start };
    }

    let foundWords: string[] = [];
    words.forEach(x => {
      let indices = letterMap.get(x[0]);
      let i = 0;
      while (indices && i < indices.length) {
        stateMap = new Map();
        stateMap.set(indices[i].row, new Set([indices[i].col]));
        let res = findWord(x, 1, indices[i], stateMap);
        let d1 = mem.get(indices[i].row);
        if (!d1) {
          mem.set(indices[i].row, new Map([[indices[i].col, new Set([x.slice(0, res.length)])]]));
        } else {
          let d2 = d1.get(indices[i].col) ?? new Set();
          mem.set(indices[i].row, d1.set(indices[i].col, d2.add(x.slice(0, res.length))));
        }

        if (res.result) {
          foundWords.push(x);
          break;
        }
        i++;
      }
    });
    return foundWords;
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

  reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let stack: ListNode[] = [];
    function readjustLL() {
      let tailnext = stack[stack.length - 1].next;
      let ptr = stack.pop();
      let head = ptr;
      let prev: ListNode;
      while (stack.length > 0) {
        prev = stack.pop();
        ptr.next = prev;
        ptr = prev;
      }
      if (prev) {
        prev.next = tailnext;
      }
      return { head, prev };
    }

    let ptr = head;
    let count = 0;
    let newHead: ListNode = null;
    let prev: ListNode = null;
    while (ptr != null) {
      if (count < k) {
        count++;
        stack.push(ptr);
        ptr = ptr.next;
      } else {
        const res = readjustLL();
        if (!newHead) {
          newHead = res.head;
        }
        if (prev != null) {
          prev.next = res.head;
        }
        prev = res.prev;
        count = 0;
      }
    }

    if (count == k) {
      const res = readjustLL();
      if (!newHead) {
        newHead = res.head;
      }
      if (prev != null) {
        prev.next = res.head;
      }
    }

    return newHead ?? head;
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

  static maxPathSum(root: TreeNode | null): number {
    let max = Number.NEGATIVE_INFINITY;
    function findMaxPath(root: TreeNode): number {
      if (root == null) {
        return Number.NEGATIVE_INFINITY;
      }

      let lp = findMaxPath(root.left);
      let rp = findMaxPath(root.right);

      let a = root.val + lp;
      let b = root.val + rp;
      let c = root.val + lp + rp;
      let d = lp;
      let e = rp;
      let f = root.val;

      let thisMax = Math.max(a, b, c, d, e, f);
      let ret = Math.max(a, b, f);
      if (thisMax > max) {
        max = thisMax;
      }
      return ret;
    }
    findMaxPath(root);
    return max;
  };
}

export class Heap {
  private arr: number[] = [];
  constructor(input: number[]) {
    for (let i = 0; i < input.length; i++) {
      this.arr.push(input[i]);
      this.maxHeap(i);
    }
  }

  getParent(i: number): number {
    if (i == 0) {
      return 0;
    }
    const parent = i % 2 == 0 ? (i - 2) / 2 : (i - 1) / 2;
    return parent;
  }

  maxHeap(i: number) {
    while (this.arr[i] > this.arr[this.getParent(i)]) {
      const parent = this.getParent(i);
      let temp = this.arr[parent];
      this.arr[parent] = this.arr[i];
      this.arr[i] = temp;
      i = parent;
    }
  }

  popMax() {
    const max = this.arr[0];
    const last = this.arr.pop();
    this.arr[0] = last;

    if (this.arr.length > 1) {
      let i = 0;
      while (1) {
        let lc = 2 * i + 1;
        let rc = 2 * i + 2;
        let bigchild;
        if (lc < this.arr.length && rc < this.arr.length) {
          bigchild = this.arr[lc] > this.arr[rc] ? lc : rc;
        } else if (rc >= this.arr.length && lc < this.arr.length) {
          bigchild = lc;
        }

        if (this.arr[bigchild] > this.arr[i]) {
          let temp = this.arr[bigchild];
          this.arr[bigchild] = this.arr[i];
          this.arr[i] = temp;
          i = bigchild;
        } else {
          break;
        }
      }
    }
    return max;
  }
}

export class HeapMod {
  private arr: { val: number, index: number }[] = [];
  constructor(input: number[]) {
    for (let i = 0; i < input.length; i++) {
      this.arr.push({ val: input[i], index: i });
      this.maxHeap(i);
    }
  }

  getParent(i: number): number {
    if (i == 0) {
      return 0;
    }
    const parent = i % 2 == 0 ? (i - 2) / 2 : (i - 1) / 2;
    return parent;
  }

  maxHeap(i: number) {
    while (this.arr[i].val > this.arr[this.getParent(i)].val) {
      const parent = this.getParent(i);
      let temp = this.arr[parent];
      this.arr[parent] = this.arr[i];
      this.arr[i] = temp;
      i = parent;
    }
  }

  popMax() {
    const max = this.arr[0];
    const last = this.arr.pop();
    this.arr[0] = last;

    if (this.arr.length > 1) {
      let i = 0;
      while (1) {
        let lc = 2 * i + 1;
        let rc = 2 * i + 2;
        let bigchild;
        if (lc < this.arr.length && rc < this.arr.length) {
          bigchild = this.arr[lc].val > this.arr[rc].val ? lc : rc;
        } else if (rc >= this.arr.length && lc < this.arr.length) {
          bigchild = lc;
        } else {
          break;
        }

        if (this.arr[bigchild].val > this.arr[i].val) {
          let temp = this.arr[bigchild];
          this.arr[bigchild] = this.arr[i];
          this.arr[i] = temp;
          i = bigchild;
        } else {
          break;
        }
      }
    }
    return max;
  }
}

export class SmallestInfiniteSet {
  current: number;
  arr: number[] = [];
  ds: Set<number> = new Set();
  constructor() {
    this.current = 0;
    for (let i = 0; i < 1000; i++) {
      this.arr.push(i + 1);
    }
  }

  popSmallest(): number {
    const pop = this.arr[this.current];
    this.ds.add(pop);
    while (this.ds.has(this.arr[this.current])) {
      this.current += 1;
    }
    return pop;
  }

  addBack(num: number): void {
    if (!this.ds.has(num)) {
      return;
    }

    this.ds.delete(num);
    if (num < this.current + 1) {
      this.current = num - 1;
    }
  }
}

export class TrieNode {
  val: string;
  next: TrieNode[];
  isWordEnd: boolean;
  constructor(val: string) {
    this.val = val;
    this.next = new Array(26).fill(null);
    this.isWordEnd = false;
  }
}

export class Trie {
  root: TrieNode = new TrieNode("");
  constructor() {
  }

  insert(word: string): void {
    let ptr = this.root;
    for (let w of word) {
      let ascii = w.charCodeAt(0) - 97;
      if (ptr.next[ascii] == null) {
        ptr.next[ascii] = new TrieNode(w);
      }
      ptr = ptr.next[ascii];
    }
    ptr.isWordEnd = true;
  }

  search(word: string): boolean {
    let ptr = this.root;
    for (let w of word) {
      let ascii = w.charCodeAt(0) - 97;
      if (ptr.next[ascii] == null) {
        return false;
      }
      ptr = ptr.next[ascii];
    }
    return ptr.isWordEnd;
  }

  startsWith(prefix: string): boolean {
    let ptr = this.root;
    for (let w of prefix) {
      let ascii = w.charCodeAt(0) - 97;
      if (ptr.next[ascii] == null) {
        return false;
      }
      ptr = ptr.next[ascii];
    }
    return true;
  }

  prefixWords(prefix: string): string[] {
    let suggesstions: string[] = []
    function findSuggesstions(ptr: TrieNode, prefix: string) {
      if (ptr == null || suggesstions.length == 3) {
        return;
      }

      if (ptr.isWordEnd) {
        let prod = prefix;
        suggesstions.push(prod);
      }

      for (let i = 0; i < 26; i++) {
        if (ptr.next[i] && suggesstions.length < 3) {
          findSuggesstions(ptr.next[i], prefix + ptr.next[i].val)
        }
      }
    }

    let ptr = this.root;
    for (let w of prefix) {
      let ascii = w.charCodeAt(0) - 97;
      ptr = ptr.next[ascii];
      if (ptr == null) {
        return [];
      }
    }

    findSuggesstions(ptr, prefix);
    return suggesstions;
  }
}