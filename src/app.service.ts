
import { Injectable } from '@nestjs/common';
@Injectable()

export class Master {
  private secret: string;
  putSecret(w: string) {
    this.secret = w;
  }
  guess(word: string): number {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] == this.secret[i]) {
        count++;
      }
    }
    return count;
  }
}

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
    citations.sort((a, b) => a - b);
    function findClosest(target: number, low: number, high: number) {
      let mid: number;
      while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (citations[mid] == target) {
          return mid;
        } else if (citations[mid] > target) {
          high = mid - 1;
        } else if (citations[mid] < target) {
          low = mid + 1;
        }
      }
      return mid;
    }
    let j: number;
    let hi: number;
    if (citations.length <= citations[citations.length - 1]) {
      hi = citations.length;
    } else {
      hi = citations[citations.length - 1];
    }
    j = findClosest(hi, 0, citations.length - 1);

    for (let i = hi; i >= 0; i--) {
      let dec: number;
      if (citations[j] >= i) {
        dec = j;
      } else {
        dec = j + 1;
      }
      let num = citations.length - dec;
      if (num >= i) {
        return i;
      } else {
        if (i - 1 < citations[j]) {
          j--;
        }
      }
    }
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

  merge(a: number[], m: number, b: number[], n: number): void {
    let j = m + n - 1;
    let i = m - 1;
    let k = n - 1;
    while (i >= 0 && k >= 0) {
      if (a[i] >= b[k]) {
        a[j] = a[i];
        i--;
      } else {
        a[j] = b[k];
        k--;
      }
      j--;
    }

    while (k >= 0) {
      a[j] = b[k];
      k--;
      j--;
    }
  };

  rotate(nums: number[], k: number): void {
    let n = nums.length;
    let copy: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      let des = (i + k) % n;
      copy[des] = nums[i];
    }
    for (let i = 0; i < nums.length; i++) {
      nums[i] = copy[i];
    }
  };

  searchMatrix(matrix: number[][], target: number): boolean {
    let rows = matrix.length;
    let cols = matrix[0].length;

    function getElement(index: number): number {
      let i = 0;
      let pIndex = index
      while (pIndex - cols >= 0) {
        pIndex -= cols;
        i++;
      }

      return matrix[i][pIndex];
    }

    function binsearch(low: number, high: number, target: number) {
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let element = getElement(mid);
        if (target == element) {
          return true;
        }
        if (target > element) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return false;
    }

    return binsearch(0, (rows * cols) - 1, target);
  };

  totalQueens(n: number): number {
    let board: boolean[][] = [];
    for (let i = 0; i < n; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i].push(false);
      }
    }

    function isValidBox(row: number, col: number): boolean {
      let queens: { i: number, j: number }[] = []
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (board[i][j]) {
            queens.push({ i, j });
          }
        }
      }

      for (let k = 0; k < queens.length; k++) {
        let cq = queens[k];
        if (cq.j == col) {
          return false;
        }
        if (cq.i + cq.j == row + col) {
          return false;
        }
        if (cq.i - cq.j == row - col) {
          return false;
        }
      }
      return true;
    }

    function setQueen(row: number, col: number, val: boolean) {
      board[row][col] = val;
    }

    let count = 0;
    function nQueens(row: number) {
      if (row >= n) {
        count++;
        return;
      }

      for (let i = 0; i < n; i++) {
        if (isValidBox(row, i)) {
          setQueen(row, i, true);
          nQueens(row + 1);
          setQueen(row, i, false);
        }
      }
    }

    nQueens(0);
    return count;
  };

  findSecretWord(words: string[], master: Master): number {
    function getMatchCount(target: string, source: string): number {
      let count = 0;
      for (let i = 0; i < target.length; i++) {
        if (target[i] == source[i]) {
          count++;
        }
      }
      return count;
    }

    let iterationCount = 0
    while (1) {
      let index = Math.floor(Math.random() * (words.length));
      let score = master.guess(words[index])
      if (score == 6) {
        break;
      }

      let nw = words.filter(x => {
        if (getMatchCount(x, words[index]) == score) {
          return true;
        }
        return false;
      });

      words = nw;
      iterationCount++;
    }
    return iterationCount;
  };

  findItinerary(tickets: string[][]): string[] {
    let tm: Map<string, string[]> = new Map();
    for (let i = 0; i < tickets.length; i++) {
      if (tm.has(tickets[i][0])) {
        let val = tm.get(tickets[i][0]);
        val.push(tickets[i][1]);
        tm.set(tickets[i][0], val);
      } else {
        tm.set(tickets[i][0], [tickets[i][1]]);
      }
    }

    let flightCount = 0;
    let indexMap: Map<string, number> = new Map();
    for (let [k, v] of tm) {
      v.sort();
      tm.set(k, v);
      indexMap.set(k, 0);
      flightCount += v.length;
    }

    let trail: string[] = [];
    trail.push('JFK');

    function findPath(trail: string[]) {
      let source = trail[trail.length - 1];
      if (!tm.has(source)) {
        return "";
      }

      let dest = tm.get(source);
      let indexval = indexMap.get(source);
      let next = dest[indexval];
      trail.push(next);
      indexval++;
      indexMap.set(source, indexval);
      while (findPath(trail) == "") {
        let val = trail.pop();
        indexval = indexMap.get(source);
        if (indexval >= dest.length) {

          return '';
        }
        indexMap.set(source, indexval + 1);
        next = dest[indexval];
        dest.push(val);
        trail.push(next);
      }
      return next;
    }

    // while (flightCount > 0) {
    //   let source = trail[trail.length - 1];
    //   let dest = tm.get(source);
    //   let next = dest[dest.length - 1];
    //   if (!tm.has(next) && flightCount > 1) {
    //     let val = dest.pop();
    //     let copy = [val, ...dest];
    //     tm.set(source, copy);
    //     continue;
    //   }
    //   dest.pop();
    //   tm.set(source, dest);
    //   trail.push(next);
    //   flightCount--;
    // }

    findPath(trail);
    return trail;
  };

  isMatch2(s: string, p: string): boolean {
    let dp: number[][] = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
      dp[i] = new Array(p.length).fill(-1);
    }

    function findMatch(i: number, j: number): boolean {
      if (i == s.length) {
        if (j == p.length) {
          return true;
        } else if (j == p.length - 1 && p[j] == '*') {
          return true;
        } else if (j < p.length) {
          while (j < p.length) {
            if (p[j + 1] != '*') {
              return false
            }
            j += 2;
          }
          return true;
        }
      }
      if (j >= p.length) {
        if (i < s.length) {
          return false;
        }
      }

      if (dp[i][j] != -1) {
        return dp[i][j] == 1 ? true : false;
      }

      let isMatch: boolean = false;
      if (s[i] == p[j]) {
        isMatch = findMatch(i + 1, j + 1);
      } else if (p[j] == '.') {
        isMatch = findMatch(i + 1, j + 1);
      } else if (p[j] == '*') {
        if (p[j - 1] == '.' || p[j - 1] == s[i]) {
          isMatch = findMatch(i + 1, j) || findMatch(i, j + 1);
        } else {
          isMatch = findMatch(i, j + 1);
        }
      } else if (i < s.length && j < p.length && s[i] != p[j]) {
        if (j + 1 >= p.length || p[j + 1] != '*') {
          isMatch = false;
        } else {
          isMatch = findMatch(i, j + 1);
        }
      }

      dp[i][j] = isMatch ? 1 : 0;
      return isMatch;
    }

    return findMatch(0, 0);
  };

  isMatch(s: string, p: string): boolean {
    // function isAllStar(j: number) {
    //   for (let k = j; k < p.length; k++) {
    //     if (p[k] != '*') {
    //       return false;
    //     }
    //   }

    //   return true;
    // }

    // function isMatchInner(i: number, j: number): boolean {
    //   while (i < s.length && j < p.length) {
    //     if (p[j] == s[i] || p[j] == '?') {
    //       i++;
    //       j++;
    //     } else if (p[j] == '*') {
    //       while ((p[j] == '*') && j + 1 < p.length) {
    //         j++;
    //       }
    //       if (p[j] == '*') {
    //         return true;
    //       }

    //       let char = p[j];
    //       while (i < s.length) {
    //         if (s[i] == char || char == '?') {
    //           if (isMatchInner(i, j)) {
    //             return true;
    //           }
    //         }
    //         i++;
    //       }
    //     } else {
    //       return false;
    //     }
    //   }

    //   if (j == p.length && i == s.length) {
    //     return true;
    //   }
    //   if (i == s.length && isAllStar(j)) {
    //     return true;
    //   }

    //   return false;
    // }
    // return isMatchInner(0, 0);
    let mem: Map<number, Map<number, number>> = new Map();
    function isMatch(i: number, j: number) {
      if (i > s.length && j == p.length && p[j] == '*') {
        return true;
      }
      if (i < s.length && j == p.length) {
        return false;
      }
      if (i == s.length && j == p.length) {
        return true;
      }
      if (i > s.length && j < p.length) {
        return false;
      }

      if (mem.has(i) && mem.get(i).has(j)) {
        return mem.get(i).get(j);
      }

      let val: boolean = false;
      if (p[j] == '?') {
        if (i >= s.length) {
          val = false;
        } else {
          val = isMatch(i + 1, j + 1);
        }
      } else if (p[j] == s[i]) {
        val = isMatch(i + 1, j + 1);
      } else if (p[j] == '*') {
        val = isMatch(i + 1, j) || isMatch(i, j + 1);
      } else if (i < s.length && j < p.length && s[i] != p[j]) {
        val = false;
      }

      let vSet = val ? 1 : 0;
      if (mem.has(i)) {
        mem.set(i, mem.get(i).set(j, vSet));
      } else {
        mem.set(i, new Map().set(j, vSet));
      }

      return val;
    }
    return isMatch(0, 0);
  };

  reverseVowels(s: string): string {
    function isVowel(s: string): boolean {
      if (s == 'a' || s == 'A') {
        return true;
      }
      if (s == 'e' || s == 'E') {
        return true;
      }
      if (s == 'i' || s == 'I') {
        return true;
      }
      if (s == 'o' || s == 'O') {
        return true;
      }
      if (s == 'u' || s == 'U') {
        return true;
      }
      return false;
    }

    let i = 0;
    let j = s.length - 1;
    while (j > i) {
      if (!isVowel(s[i])) {
        i++;
      } else if (!isVowel(s[j])) {
        j--;
      } else if (isVowel(s[i]) && isVowel(s[j])) {
        let str = s.slice(0, i) + s[j] + s.slice(i + 1, j) + s[i] + s.slice(j + 1);
        s = str;
        i++;
        j--;
      }
    }
    return s;
  };

  pivotIndex(nums: number[]): number {
    let prev = 0
    let ls = nums.map(x => {
      prev += x;
      return prev;
    });
    prev = 0
    let rs = nums.reverse().map(x => {
      prev += x;
      return prev;
    }).reverse();

    for (let i = 0; i < ls.length; i++) {
      if (ls[i] == rs[i]) {
        return i;
      }
    }
    return -1;
  };

  minCostClimbingStairs(cost: number[]): number {
    let top = cost.length;
    let mem: number[] = new Array(cost.length).fill(-1);
    function findCost(top: number): number {
      if (top == 0 || top == 1) {
        return 0;
      }

      if (top < cost.length && mem[top] != -1) {
        return mem[top];
      }

      let c = Math.min(findCost(top - 1) + cost[top - 1], findCost(top - 2) + cost[top - 2]);
      mem[top] = c;
      return c;
    }
    return findCost(top);
  };

  tribonacci(n: number): number {
    if (n == 0) {
      return 0;
    }
    if (n == 1 || n == 2) {
      return 1;
    }

    let ni: number;
    let t0 = 0;
    let t1 = 1;
    let t2 = 1;
    for (let i = 3; i <= n; i++) {
      ni = t0 + t1 + t2;
      t0 = t1;
      t1 = t2;
      t2 = ni;
    }

    return ni;
  };

  zigzagLevelOrder(root: TreeNode | null): number[][] {
    let result: number[][] = [];
    let isEven = true;
    let queue: TreeNode[] = [];
    if (!root) {
      return result;
    }

    queue.push(root);
    result.push([root.val]);
    isEven = true;

    while (queue.length > 0) {
      let newQueue: TreeNode[] = [];
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].left) {
          newQueue.push(queue[i].left);
        }
        if (queue[i].right) {
          newQueue.push(queue[i].right);
        }
      }
      queue = newQueue;

      let arr: number[] = [];
      if (isEven) {
        for (let i = queue.length - 1; i >= 0; i--) {
          arr.push(queue[i].val)
        }
      } else {
        queue.forEach(x => arr.push(x.val));
      }
      if (arr.length > 0) {
        result.push(arr)
      }
      isEven = !isEven;
    }
    return result;
  };

  maxSubArray(nums: number[]): number {
    let sum = nums[0];
    let max = sum;
    for (let i = 1; i < nums.length; i++) {
      let thissum = sum + nums[i];
      sum = Math.max(thissum, nums[i]);
      if (sum > max) {
        max = sum;
      }
    }
    return max;
  };

  longestConsecutive(nums: number[]): number {
    let dataset = new Set<number>();
    nums.forEach(x => dataset.add(x));
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
      if (!dataset.has(nums[i])) {
        continue;
      }

      let count = 1;
      let s = nums[i];
      while (1) {
        if (dataset.has(++s)) {
          count++;
          dataset.delete(s);
        } else {
          break;
        }
      }

      s = nums[i];
      while (1) {
        if (dataset.has(--s)) {
          count++;
          dataset.delete(s);
        } else {
          break;
        }
      }
      if (count > max) {
        max = count;
      }
    }
    return max;
  };

  insert(intervals: number[][], newInterval: number[]): number[][] {
    let s = newInterval[0];
    let e = newInterval[1];

    let i = 0;
    for (i = 0; i < intervals.length; i++) {
      if (s <= intervals[i][0]) break;
      if (s <= intervals[i][1]) break;
    }

    let j = 0
    for (j = i; j < intervals.length; j++) {
      if (e <= intervals[j][0]) break;
      if (e <= intervals[j][1]) break;
    }

    let nI = [];
    if (i < intervals.length) {
      if (s < intervals[i][0]) { // i start
        nI.push(s);
      } else {
        nI.push(intervals[i][0]); // i start
      }
    } else {
      nI.push(s);
    }

    if (j < intervals.length) {
      if (e < intervals[j][0]) {  //j start
        nI.push(e);
      } else {
        nI.push(intervals[j][1]); //j end
      }
    } else {
      nI.push(e);
    }

    let againIntervals: number[][] = [];
    intervals.forEach((x, k) => {
      if (k < i) {
        againIntervals.push(x);
      }
    });
    againIntervals.push(nI);
    if (j < intervals.length && nI[1] < intervals[j][0]) {
      againIntervals.push(intervals[j]);
    }
    intervals.forEach((x, k) => {
      if (k > j) {
        againIntervals.push(x);
      }
    })
    return againIntervals;
  };

  coinChange(coins: number[], amount: number): number {
    let mem: Map<number, Map<number, number>> = new Map();
    coins = coins.sort();
    function findMinChange(amount: number, index: number): number {
      if (amount < 0) {
        return Number.MAX_VALUE;
      }
      if (amount == 0) {
        return 1;
      }

      if (mem.has(index) && mem.get(index).has(amount)) {
        return mem.get(index).get(amount);
      }

      let min = Number.MAX_VALUE;
      for (let i = index; i >= 0; i--) {
        let val = findMinChange(amount - coins[i], i);
        if (val < min) {
          min = val;
        }
      }

      if (mem.has(index)) {
        mem.set(index, mem.get(index).set(amount, min + 1));
      } else {
        mem.set(index, new Map().set(amount, min + 1));
      }

      return min + 1;
    }

    let change = findMinChange(amount, coins.length - 1)
    return change == Number.MAX_VALUE ? -1 : change - 1;
  };

  minimumTotal(triangle: number[][]): number {
    let height = triangle.length;

    let dp: number[][] = new Array(triangle.length);
    for (let i = 0; i < height; i++) {
      dp[i] = new Array(triangle[i].length).fill(-1);
    }

    function findMinSum(level: number, index: number) {
      if (level >= height) {
        return 0;
      }
      if (index > triangle[level].length) {
        return 0;
      }

      if (dp[level][index] != -1) {
        return dp[level][index];
      }

      let sum = triangle[level][index];
      let min = Math.min(findMinSum(level + 1, index), findMinSum(level + 1, index + 1));
      sum += min;
      dp[level][index] = sum;

      return sum;
    }
    return findMinSum(0, 0);
  };

  minPathSum(grid: number[][]): number {
    let m = grid.length;
    let n = grid[0].length;
    let dp: number[][] = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
      dp[i] = new Array(grid[0].length).fill(-1);
    }

    function findMinPathSum(i: number, j: number) {
      if (i >= m) {
        return Number.MAX_VALUE;
      }
      if (j >= n) {
        return Number.MAX_VALUE;
      }

      if (dp[i][j] != -1) {
        return dp[i][j];
      }

      let sum = grid[i][j];
      let min = Math.min(findMinPathSum(i, j + 1), findMinPathSum(i + 1, j));
      min = min == Number.MAX_VALUE ? 0 : min;
      sum += min;
      dp[i][j] = sum;

      return sum;
    }

    return findMinPathSum(0, 0);
  };

  uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp: number[][] = new Array(obstacleGrid.length);
    for (let i = 0; i < obstacleGrid.length; i++) {
      dp[i] = new Array(obstacleGrid[0].length).fill(-1);
    }

    function findPathCount(i: number, j: number) {
      if (i >= m) {
        return 0;
      }
      if (j >= n) {
        return 0;
      }

      if (obstacleGrid[i][j] == 1) {
        return 0;
      }

      if (i == m - 1 && j == n - 1) {
        return 1;
      }

      if (dp[i][j] != -1) {
        return dp[i][j];
      }

      let numPaths = findPathCount(i + 1, j) + findPathCount(i, j + 1);
      dp[i][j] = numPaths;
      return numPaths;
    }

    return findPathCount(0, 0);
  };

  longestPalindrome(s: string): string {
    if (s.length == 1) {
      return s;
    }

    let dp: number[][] = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
      dp[i] = new Array(s.length).fill(-1);
    }

    let longest = '';
    let lcount = 0;

    function findPaliandrome(i: number, j: number) {
      if (i == j) {
        checAndAssign(1, i, j);
        dp[i][j] = 1;
        return 1;
      } else if (i > j) {
        dp[i][j] = 0;
        return 0;
      }


      if (dp[i][j] != -1) {
        return dp[i][j]
      }

      if (j - i == 1) {
        if (s[i] == s[j]) {
          checAndAssign(2, i, j)
          dp[i][j] = 2;
          return 2;
        }
      }

      let p1 = findPaliandrome(i + 1, j - 1);
      if (s[i] == s[j] && p1 > 0) {
        p1 = 2 + p1;
        checAndAssign(p1, i, j);
      } else {
        p1 = 0;
      }

      dp[i][j] = p1;

      findPaliandrome(i, j - 1);
      findPaliandrome(i + 1, j);
      return p1;
    }

    findPaliandrome(0, s.length - 1);
    return longest;

    function checAndAssign(p1: any, i: number, j: number) {
      if (p1 > lcount) {
        lcount = p1;
        longest = s.slice(i, j + 1);
      }
    }
  };

  groupAnagrams(strs: string[]): string[][] {
    let hmap: Map<string, string[]> = new Map();
    for (let i = 0; i < strs.length; i++) {
      let s = strs[i].split('').sort().join();
      if (hmap.has(s)) {
        let d = hmap.get(s);
        d.push(strs[i]);
        hmap.set(s, d);
      } else {
        hmap.set(s, [strs[i]]);
      }
    }

    let rs: string[][] = [];
    for (let [k, v] of hmap) {
      rs.push(v);
    }

    return rs;
  };

  minDistance(word1: string, word2: string): number {
    let m = word1.length;
    let n = word2.length;

    if (m == 0 || n == 0) {
      return m > n ? m : n;
    }

    let dp: number[][] = new Array(m + 1);
    for (let i = 0; i < m + 1; i++) {
      dp[i] = new Array(n + 1).fill(-1);
    }

    function findDistance(i: number, j: number) {
      if (i >= word1.length && j >= word2.length) {
        return 0;
      }

      if (dp[i][j] != -1) {
        return dp[i][j];
      }

      let dist: number;

      if (i < word1.length && j < word2.length && word1[i] == word2[j]) {
        dist = Math.min(findDistance(i + 1, j + 1), 1 + findDistance(i + 1, j), 1 + findDistance(i, j + 1));
      } else {
        if (i >= word1.length && j < word2.length) {
          dist = 1 + findDistance(i, j + 1);
        } else if (j >= word2.length && i < word1.length) {
          dist = 1 + findDistance(i + 1, j);
        } else {
          dist = 1 + Math.min(findDistance(i + 1, j + 1), findDistance(i + 1, j), findDistance(i, j + 1));
        }
      }

      dp[i][j] = dist;
      return dist;
    }

    return findDistance(0, 0);
  };

  knapsack(a, b, c) {
    let dp = new Map();

    function sack(i, w) {
      if (i < 0 || w <= 0) {
        return 0;
      }

      if (dp.has(i) && dp.get(i).has(w)) {
        return dp.get(i).get(w);
      }

      var p1;
      if (b[i] <= w) {
        p1 = Math.max(a[i] + sack(i - 1, w - b[i]), sack(i - 1, w));
      } else {
        p1 = sack(i - 1, w);
      }

      if (dp.has(i)) {
        dp.set(i, dp.get(i).set(w, p1));
      } else {
        dp.set(i, new Map().set(w, p1));
      }
      return p1;
    }

    return sack(a.length - 1, c);
  };

  wordBreak(s: string, wordDict: string[]): boolean {
    let dp: number[][] = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
      dp[i] = new Array(s.length).fill(-1);
    }
    let dict: Set<string> = new Set();
    wordDict.forEach(x => dict.add(x));

    function find(i: number, j: number, wl: string[]) {
      if (j >= s.length) {
        let sn = wl.join('');
        if (sn.length != s.length) {
          return false;
        }
        for (let k = 0; k < s.length; k++) {
          if (sn[k] != s[k]) {
            return false;
          }
        }
        return true;
      }

      if (dp[i][j] != -1) {
        return dp[i][j] == 1 ? true : false;
      }

      let w = s.slice(i, j + 1);
      let thisVal: boolean = false;
      if (dict.has(w)) {
        thisVal = find(j + 1, j + 1, wl.concat(w)) || find(i, j + 1, wl);
      } else {
        thisVal = find(i, j + 1, wl);
      }

      dp[i][j] = thisVal ? 1 : 0;
      return thisVal;
    }

    return find(0, 0, []);
  };

  lengthOfLIS(nums: number[]): number {
    let dp: number[][] = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
      dp[i] = new Array(nums.length).fill(-1);
    }

    function findLength(i: number, lastIndex: number) {
      if (i >= nums.length) {
        return 0;
      }
      if (lastIndex != -1 && dp[i][lastIndex] != -1) {
        return dp[i][lastIndex];
      }

      let seqLength: number;
      if (lastIndex == -1 || nums[i] > nums[lastIndex]) {
        seqLength = Math.max(1 + findLength(i + 1, i), findLength(i + 1, lastIndex));
      } else {
        seqLength = findLength(i + 1, lastIndex);
      }

      dp[i][lastIndex] = seqLength;
      return seqLength;
    }

    return findLength(0, -1);
  };

  maxProfit2(prices: number[]): number {
    let dp: number[][] = new Array(prices.length);
    let k = 4;
    for (let i = 0; i < prices.length; i++) {
      dp[i] = new Array(k).fill(-1);
    }

    function findProfit(i: number, state: number) {
      if (state % 2 == 0 && i >= prices.length) {
        return 0;
      }
      if (i >= prices.length) {
        return Number.MIN_VALUE;
      }
      if (state == k) {
        return 0;
      }

      if (dp[i][state] != -1) {
        return dp[i][state];
      }

      let curr = state % 2 == 0 ? -prices[i] : prices[i];
      let p1 = findProfit(i + 1, state + 1);
      let p2 = findProfit(i + 1, state);
      let profit = Math.max(curr + p1, p2);
      dp[i][state] = profit;
      return profit;
    }

    return findProfit(0, 0);
  };

  mergeSort(nums: number[]) {
    function sort(low: number, high: number) {
      if (high == low) {
        return [nums[low]];
      }

      let mid = Math.floor((low + high) / 2);
      let rs: number[] = [];
      let ls: number[] = [];
      if (mid - low >= 0) {
        ls = sort(low, mid)
      }
      if (high - mid > 0) {
        rs = sort(mid + 1, high);
      }

      let i = 0;
      let j = 0;
      let result: number[] = [];
      while (i < ls.length && j < rs.length) {
        if (ls[i] <= rs[j]) {
          result.push(ls[i]);
          i++;
        } else {
          result.push(rs[j]);
          j++;
        }
      }

      while (i < ls.length) {
        result.push(ls[i]);
        i++;
      }
      while (j < rs.length) {
        result.push(rs[j]);
        j++;
      }

      return result;
    }

    return sort(0, nums.length - 1);
  };

  numIslands(grid: string[][]): number {
    let colorGrid: number[][] = new Array(grid.length);
    let color = 0;

    function fillGrid(i: number, j: number) {
      if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
        return;
      }

      if (colorGrid[i][j] == -1 && grid[i][j] == '1') {
        colorGrid[i][j] = color;
        fillGrid(i - 1, j);
        fillGrid(i + 1, j);
        fillGrid(i, j - 1);
        fillGrid(i, j + 1);
      }
    }

    for (let i = 0; i < grid.length; i++) {
      colorGrid[i] = new Array(grid[0].length).fill(-1);
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == '1' && colorGrid[i][j] == -1) {
          fillGrid(i, j);
          color++;
        }
      }
    }

    return color;
  };

  mySqrt(x: number): number {
    if (x == 0 || x == 1) {
      return x;
    }

    let h = Math.floor(x / 2);
    let l = 0;
    let mid: number;
    while (h >= l) {
      mid = Math.floor((h + l) / 2);
      let square = mid * mid;
      if (square == x) {
        break;
      } else if (square > x) {
        h = mid - 1;
      } else if (square < x) {
        l = mid + 1;
      }
    }
    return mid * mid > x ? mid - 1 : mid;
  };

  findRelativeRanks(score: number[]): string[] {
    function convertRankToString(rank: number): string {
      switch (rank) {
        case 0: return "Gold Medal";
        case 1: return "Silver Medal";
        case 2: return "Bronze Medal";
        default: return (rank + 1).toString();
      }
    }

    let sortedScore: number[][] = [];
    score.forEach((v, i) => {
      let s = [v, i];
      sortedScore.push(s);
    });

    let rankMap: Map<number, number> = new Map();
    sortedScore.sort((b, a) => a[0] - b[0]).forEach((val, index) => {
      rankMap.set(val[1], index);
    });

    let retArr: string[] = [];
    for (let i = 0; i < score.length; i++) {
      let rank = rankMap.get(i);
      retArr.push(convertRankToString(rank))
    }
    return retArr;
  };

  longestValidParentheses(s: string): number {
    if (s == '') return 0;

    let stack: string[] = [];
    function isNumeric(value: string): boolean {
      return !isNaN(Number(value));
    }

    function merge() {
      let top = stack.length - 1;
      while (top - 1 >= 0 && isNumeric(stack[top]) && isNumeric(stack[top - 1])) {
        let t1 = Number(stack.pop());
        let t2 = Number(stack.pop());
        stack.push((t1 + t2).toString());
      }
    }

    for (let i = 0; i < s.length; i++) {
      if (s[i] == '(') {
        stack.push(s[i]);
      } else {   // ')'
        let top = stack.length - 1;
        if (stack.length == 0) continue;
        else if (stack[top] == '(') {
          stack.pop();
          stack.push('2');
        } else if (isNumeric(stack[top]) && stack[top - 1] == '(') {
          let val = Number(stack.pop());
          stack.pop();
          stack.push((val + 2).toString());
        } else {
          stack.push(s[i]);
        }
        merge();
      }
    }

    let max = Number.MIN_VALUE;
    for (let i = 0; i < stack.length; i++) {
      if (isNumeric(stack[i])) {
        let num = Number(stack[i]);
        if (num > max) {
          max = num;
        }
      }
    }
    return max;
  };

  firstMissingPositive(nums: number[]): number {
    this.cyclicSort(nums);
    console.log(nums);
    let start = 1;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] != start) {
        return start;
      }
      start++;
    }

    return start;
  };

  missingNumber2(nums: number[]): number {
    function cyclicSort(nums: number[]) {
      let i = 0;
      while (i < nums.length) {
        let correctPos = nums[i];
        if (correctPos >= 0 && correctPos < nums.length && i != correctPos && nums[i] != nums[correctPos]) {
          let temp = nums[i];
          nums[i] = nums[correctPos];
          nums[correctPos] = temp;
        } else {
          i++;
        }
      }
    }
    cyclicSort(nums);
    let i: number;
    for (i = 0; i < nums.length; i++) {
      if (i != nums[i]) {
        return i;
      }
    }
    return i;
  };

  findDuplicate(nums: number[]): number {
    // this.cyclicSort(nums);
    // let start = 1;
    // for (let i = 0; i < nums.length; i++) {
    //   if (nums[i] != start) {
    //     return nums[i];
    //   }
    //   start++;
    // }
    let fast = nums[0]
    let slow = nums[0]
    do {
      fast = nums[nums[fast]]
      slow = nums[slow]

    } while (fast != slow)

    //  console.log(slow,fast)
    fast = nums[0]

    while (fast != slow) {
      fast = nums[fast]
      slow = nums[slow]
    }

    return fast
  };

  findDisappearedNumbers(nums: number[]): number[] {
    this.cyclicSort(nums);
    let start = 1;
    let ret: number[] = [];
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] != start) {
        ret.push(start);
      }
      start++;
    }
    return ret;
  };

  cyclicSort(nums: number[]) {
    let i = 0;
    while (i < nums.length) {
      let correctPos = nums[i] - 1;
      if (correctPos >= 0 && correctPos < nums.length && i != correctPos && nums[i] != nums[correctPos]) {
        let temp = nums[i];
        nums[i] = nums[correctPos];
        nums[correctPos] = temp;
      } else {
        i++;
      }
    }
  }

  minSwapsCouples(row: number[]): number {
    let buckets = row.length / 2;
    let indexMap: Map<number, number> = new Map();
    row.forEach((val, index) => {
      indexMap.set(val, index);
    })
    let count = 0;
    for (let i = 0; i < buckets; i++) {
      let p1 = row[i * 2];
      let p2 = row[i * 2 + 1];
      if ((p1 % 2 == 0 && p2 == p1 + 1) || (p2 % 2 == 0 && p1 == p2 + 1)) {
        continue;
      } else {
        let vp = p1 % 2 == 0 ? p1 + 1 : p1 - 1;
        let swapIndex = indexMap.get(vp);
        let temp = row[i * 2 + 1];
        row[i * 2 + 1] = row[swapIndex];
        row[swapIndex] = temp;
        indexMap.set(temp, swapIndex);
        indexMap.set(row[i * 2 + 1], i * 2 + 1);
        count++;
      }
    }
    return count;
  };

  maxCount(banned: number[], n: number, maxSum: number): number {
    let banSet: Set<number> = new Set();
    banned.forEach(x => banSet.add(x));
    let sum = 0;
    let count = 0;
    for (let i = 1; i <= n; i++) {
      if (!banSet.has(i)) {
        if (sum + i <= maxSum) {
          sum += i;
          count++;
        }
      }
    }
    return count;
  };

  findSmallestInteger(nums: number[], value: number): number {
    let indexMap: Map<number, number> = new Map();

    function placeInCorrectPosition(i: number) {
      let desPos = i;
      let currPos = indexMap.get(i);
      if (nums[desPos] != i) {
        let temp = nums[desPos];
        nums[desPos] = i;
        nums[currPos] = temp;
        indexMap.set(i, desPos);
        indexMap.set(temp, currPos);
      }
    }

    nums.forEach((val, index) => {
      indexMap.set(val, index);
    });

    let i: number;
    for (i = 0; i < nums.length; i++) {
      if (!indexMap.has(i)) {
        let desPos: number;
        let k: number;
        for (k = i; k < nums.length; k++) {
          let res: number;
          if (nums[k] > 0) {
            if (nums[k] - i >= 0) {
              res = (nums[k] - i) / value;
            } else {
              res = (i - nums[k]) / value;
            }
          } else {
            res = (i + Math.abs(nums[k])) / value;
          }

          if (res == Math.floor(res)) {
            desPos = k;
            break;
          }
        }
        if (k == nums.length) {
          return i;
        }
        // let index = indexMap.get(nums[desPos]);
        indexMap.delete(nums[desPos]);
        indexMap.set(i, desPos);
        nums[desPos] = i;
      } else {
        placeInCorrectPosition(i);
      }
    }
    return i;
  };

  search(nums: number[], target: number): number {
    function findRoationIndex(nums: number[]): number {
      let l = 0;
      let h = nums.length - 1;
      let mid: number;

      while (h > l) {
        mid = Math.floor((l + h) / 2);
        if (nums[mid] > nums[h]) {
          l = mid + 1;
        } else {
          h = mid
        }
      }
      return nums.length - 1 - mid;

    }

    function findNum(k: number): number {
      let l = 0 - k;
      let h = nums.length - 1 - k;
      let mid: number;
      while (h >= l) {
        mid = Math.floor((h + l) / 2);
        let rightMid = mid < 0 ? nums.length + mid : mid;
        if (nums[rightMid] == target) return rightMid;
        else if (nums[rightMid] > target) {
          h = mid - 1;
        } else if (nums[rightMid] < target) {
          l = mid + 1;
        }
      }
      return -1;
    }

    let k = findRoationIndex(nums);
    return findNum(k);
  };

  countOccurence(nums: number[], target: number) {
    let l = 0;
    let h = nums.length;
    while (!(l > h)) {
      let mid = Math.floor((h + l) / 2);
      if (nums[mid] > target) {
        h = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    let h1 = l;

    l = 0;
    h = nums.length;
    while (!(l > h)) {
      let mid = Math.floor((h + l) / 2);
      if (nums[mid] < target) {
        l = mid + 1;
      } else {
        h = mid - 1;
      }
    }

    let l1 = h;

    console.log(h1);
    console.log(l1);
    return h1 - l1 - 1;
  }

  smallestMissingValueSubtree(parents: number[], nums: number[]): number[] {
    type graphNode = {
      val: number;
      index: number;
      isVisited: boolean;
      children: graphNode[];
    }

    let nodes: graphNode[] = [];
    for (let i = 0; i < nums.length; i++) {
      let node: graphNode = {
        val: nums[i],
        index: i,
        isVisited: false,
        children: [],
      }
      nodes.push(node);
    }

    for (let i = 1; i < parents.length; i++) {
      let p = parents[i];
      nodes[p].children.push(nodes[i]);
    }

    let minMissing: number[] = new Array(nodes.length);
    function findDfs(parentIndex: number): { set: Set<number>, maxmissing: number } {
      nodes[parentIndex].isVisited = true;
      let allGenesSet: Set<number> = new Set<number>().add(nodes[parentIndex].val);
      let maxmissing = 1;
      for (let i = 0; i < nodes[parentIndex].children.length; i++) {
        let child = nodes[parentIndex].children[i];
        if (!child.isVisited) {
          let { set: childSet, maxmissing: missing } = findDfs(child.index);
          if (maxmissing < missing) {
            maxmissing = missing;
          }
          if (allGenesSet.size > childSet.size) {
            childSet.forEach(x => allGenesSet.add(x));
          } else {
            allGenesSet.forEach(x => childSet.add(x));
            allGenesSet = childSet;
          }
        }
      }
      for (let i = maxmissing; i <= nums.length + 1; i++) {
        if (!allGenesSet.has(i)) {
          minMissing[parentIndex] = i;
          break;
        }
      }
      return { set: allGenesSet, maxmissing: minMissing[parentIndex] };
    }

    findDfs(0);
    return minMissing;
  };

  solve(board: string[][]): void {
    let m = board.length;
    let n = board[0].length;
    let boardstate: boolean[][] = new Array(m);
    for (let i = 0; i < m; i++) {
      boardstate[i] = new Array(n).fill(true);
    }

    function findNeighbours(i: number, j: number) {
      if (i < 0 || j < 0 || i == m || j == n) {
        return;
      }

      if (boardstate[i][j] == false) {
        return;
      }

      if (board[i][j] == 'O') {
        boardstate[i][j] = false;
        findNeighbours(i - 1, j);
        findNeighbours(i + 1, j);
        findNeighbours(i, j + 1);
        findNeighbours(i, j - 1);
      }
    }

    for (let i of [0, m - 1]) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 'O') {
          findNeighbours(i, j);
        }
      }
    }

    for (let j of [0, n - 1]) {
      for (let i = 0; i < m; i++) {
        if (board[i][j] == 'O') {
          findNeighbours(i, j);
        }
      }
    }

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (boardstate[i][j] == true) {
          board[i][j] = 'X';
        }
      }
    }
  };

  getPermutation(n: number, k: number): string {

    let prod = 1;
    let factorial = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
      prod *= v;
      return prod;
    }, 1)

    function findPermutation(n: number, k: number) {
      if (n == 1) {
        return '1';
      }

      let regularRanks = (n - 1) * factorial[n - 2];
      let groupRank: number;
      let shift: number;
      if (k >= regularRanks) {
        groupRank = k % regularRanks;
        shift = n - 1;
      } else {
        groupRank = Math.ceil(k / (n - 1));
        shift = k % (n - 1);
      }
      let val = findPermutation(n - 1, groupRank);
      let j = val.length - shift;
      let finalVal = val.slice(0, j) + `${n}` + val.slice(j);
      return finalVal;
    }
    return findPermutation(n, k - 1);
  };

  solveNQueens(n: number): string[][] {
    let configs: string[][] = [];
    let board: number[][] = new Array(n);
    for (let i = 0; i < n; i++) {
      board[i] = new Array(n).fill(0);
    }

    function isMoveValid(i: number, j: number) {
      if (board[i][j] == 1) {
        return false;
      }

      for (let row = 0; row < i; row++) {
        for (let col = 0; col < n; col++) {
          if (board[row][col] == 1) {
            if (col == j) {
              return false;
            }
            break;
          }
        }
      }

      for (let row = 0; row < i; row++) {
        for (let col = 0; col < n; col++) {
          if (board[row][col] == 1) {
            let num = j - col;
            let dem = i - row;
            if (num / dem == 1 || num / dem == -1) {
              return false;
            }
          }
        }
      }
      return true;
    }

    function recordBoard() {
      let recording: string[] = [];
      for (let i = 0; i < n; i++) {
        let s = '';
        for (let j = 0; j < n; j++) {
          if (board[i][j] == 0) {
            s += '.';
          } else {
            s += 'Q';
          }
        }
        recording.push(s);
      }
      configs.push(recording);
    }

    function findNqueens(i: number) {
      if (i == n) {
        recordBoard();
        return;
      }

      for (let j = 0; j < n; j++) {
        let isValid = isMoveValid(i, j);
        if (isValid) {
          board[i][j] = 1;
          findNqueens(i + 1);
          board[i][j] = 0;
        }
      }
    }

    findNqueens(0);
    return configs;
  };

  dailyTemperatures(temperatures: number[]): number[] {
    let stack: number[] = [];
    let res: number[] = [];
    stack.push(0);
    for (let i = 1; i < temperatures.length; i++) {
      let top = stack[stack.length - 1];
      while (stack.length > 0 && temperatures[top] < temperatures[i]) {
        let pop = stack.pop();
        res[pop] = i - pop;
        top = stack[stack.length - 1];
      }
      stack.push(i);
    }

    stack.forEach(x => {
      res[x] = 0;
    });

    return res;
  };

  maxNumber(nums1: number[], nums2: number[], k: number): number[] {
    function getMax(s1: number[], s2: number[]): number[] {
      if (s1.length != s2.length) {
        return s1.length > s2.length ? s1 : s2;
      }
      for (let i = 0; i < s1.length; i++) {
        if (s1[i] != s2[i]) {
          return s1[i] > s2[i] ? s1 : s2;
        }
      }

      return s1;
    }

    function greatestNumbers(nums: number[], k: number): number[][] {
      let dp: number[][][] = new Array(nums.length);
      for (let i = 0; i < nums.length; i++) {
        dp[i] = new Array(k + 1).fill([]);
      }

      function findGreatest(i: number, count: number) {
        if (count == 0 || i >= nums.length || nums.length - i < count) {
          return [];
        }

        if (dp[i][count].length != 0) {
          return dp[i][count];
        }

        let thisSeq: number[] = [nums[i]];
        thisSeq.push(...findGreatest(i + 1, count - 1));
        let seq1 = thisSeq;
        let seq2 = findGreatest(i + 1, count);
        let greater = getMax(seq1, seq2);
        dp[i][count] = greater;
        return greater;
      }

      let result: number[][] = [];
      for (let i = 1; i <= k; i++) {
        result.push(findGreatest(0, i));
      }
      return result;
    }

    function breakTie(i: number, j: number, n1: number[], n2: number[]): number {
      if (i + 1 == n1.length) {
        return 2;
      } else if (j + 1 == n2.length) {
        return 1;
      }

      while (i < n1.length && j < n2.length && n1[i] == n2[j]) {
        i++;
        j++;
      }

      if (i == n1.length) {
        if (j == n2.length) {
          return 1;
        } else {
          return 2;
        }
      } else if (j == n2.length) {
        if (i == n1.length) {
          return 2;
        } else {
          return 1;
        }
      }

      if (n1[i] < n2[j]) {
        return 2;
      } else if (n1[i] > n2[j]) {
        return 1;
      }
    }

    function greatestMerge(n1: number[], n2: number[]): number[] {
      let i = 0;
      let j = 0;
      let result: number[] = [];
      while (i < n1.length && j < n2.length) {
        if (n1[i] > n2[j]) {
          result.push(n1[i]);
          i++;
        } else if (n1[i] < n2[j]) {
          result.push(n2[j]);
          j++;
        } else {
          if (breakTie(i, j, n1, n2) == 1) {
            result.push(n1[i]);
            i++;
          } else {
            result.push(n2[j]);
            j++;
          }
        }
      }
      while (i < n1.length) {
        result.push(n1[i]);
        i++;
      }
      while (j < n2.length) {
        result.push(n2[j]);
        j++;
      }
      return result;
    }

    let bigger = nums1.length > nums2.length ? nums1 : nums2;
    if (bigger == nums2) {
      nums2 = nums1;
      nums1 = bigger;
    }

    let num1high = greatestNumbers(nums1, Math.min(nums1.length, k));
    let num2high = greatestNumbers(nums2, Math.min(nums2.length, k));

    // x + y = k
    let x1 = Math.min(k, nums1.length);
    let max = [];

    for (let i = x1; i >= 0; i--) {
      if (k - 1 - i >= nums2.length) {
        continue;
      }

      let greatest = [];
      if (k - 1 - i < 0) {
        greatest = greatestMerge(num1high[i - 1], []);
      } else if (i - 1 < 0) {
        greatest = greatestMerge([], num2high[k - 1 - i]);
      } else {
        greatest = greatestMerge(num1high[i - 1], num2high[k - 1 - i]);
      }

      if (getMax(max, greatest) != max) {
        max = greatest;
      }
    }

    return max;
  };

  eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[1] - b[1]);
    let end = intervals[0][1],
      ans = 0;
    let final: number[][] = [];
    for (let i = 1; i < intervals.length; ++i) {
      let cur = intervals[i];
      if (end > cur[0]) {
        ans++;
      } else {
        final.push(intervals[i]);
        end = cur[1];
      }
    }
    return ans;
  };

  findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[1] - b[1]);
    let end = points[0][1];
    let count = 1;
    for (let i = 0; i < points.length; i++) {
      let curr = points[i];
      if (curr[0] > end) {
        end = curr[1];
        count++;
      }
    }
    return count;
  };

  canVisitAllRooms(rooms: number[][]): boolean {
    let visited: boolean[] = new Array(rooms.length).fill(false);
    let totalVisits = 0;
    function visit(currRoom: number) {
      visited[currRoom] = true;
      totalVisits++;
      for (let i = 0; i < rooms[currRoom].length; i++) {
        let nxtRoom = rooms[currRoom][i];
        if (!visited[nxtRoom]) {
          visit(nxtRoom);
        }
      }
    }
    visit(0);
    if (totalVisits == rooms.length) {
      return true;
    }
    return false;
  };

  uniquePaths(m: number, n: number): number {
    let dp: number[][] = new Array(m);
    for (let i = 0; i < m; i++) {
      dp[i] = new Array(n).fill(-1);
    }

    function findPaths(i: number, j: number) {
      if (i >= m || j >= n) {
        return 0;
      }

      if (i == m - 1 && j == n - 1) {
        return 1;
      }

      if (dp[i][j] != -1) {
        return dp[i][j];
      }

      let sum = findPaths(i + 1, j) + findPaths(i, j + 1);
      dp[i][j] = sum;
      return sum;
    }

    return findPaths(0, 0);
  };

  longestCommonSubsequence(text1: string, text2: string): number {
    let bigger = text1.length > text2.length ? text1 : text2;
    if (bigger == text2) {
      text2 = text1;
      text1 = bigger;
    }

    let dp: number[][] = new Array(text1.length);
    for (let i = 0; i < text1.length; i++) {
      dp[i] = new Array(text2.length).fill(-1);
    }

    function find(i: number, j: number) {
      if (i >= text1.length || j >= text2.length) {
        return 0;
      }
      if (dp[i][j] != -1) {
        return dp[i][j];
      }

      let count = 0;
      if (text1[i] == text2[j]) {
        count = Math.max(1 + find(i + 1, j + 1));
      } else {
        count = Math.max(find(i + 1, j), find(i, j + 1));
      }

      dp[i][j] = count;
      return count;
    }

    return find(0, 0);
  };

  findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
    let all: { p: number, c: number }[] = [];
    capital.forEach((cap, i) => {
      all.push({ p: profits[i], c: cap });
    });
    all.sort((a, b) => a.c - b.c);
    let startCap = w;
    let queuedId = -1;
    let queue: number[] = [];
    while (k > 0) {
      let upperBound = findUpperBound(all, startCap);
      updateQueue(queue, queuedId, upperBound);
      let maxProfit = popQueue(queue);
      if (!isNaN(maxProfit)) {
        startCap += maxProfit;
      }
      queuedId = upperBound;
      k--;
    }
    return startCap ?? 0;

    function findUpperBound(all: { p: number, c: number }[], target: number): number {
      let l = 0;
      let h = all.length - 1;
      let mid: number;
      while (h >= l) {
        mid = Math.floor((l + h) / 2);
        if (all[mid].c > target) {
          h = mid - 1;
        } else {
          l = mid + 1;
        }
      }
      return all[mid].c == target ? mid : all[mid].c < target ? mid : mid - 1;
    }

    function updateQueue(queue: number[], begin: number, end: number) {
      let i = begin + 1;
      while (i <= end) {
        queue.push(all[i].p);
        let child = queue.length - 1;
        let parent = child % 2 == 0 ? (child - 2) / 2 : (child - 1) / 2;
        while (parent >= 0 && queue[parent] < queue[child]) {
          let temp = queue[parent];
          queue[parent] = queue[child];
          queue[child] = temp;
          child = parent;
          parent = child % 2 == 0 ? (child - 2) / 2 : (child - 1) / 2;
        }
        i++;
      }
    }

    function popQueue(queue: number[]): number {
      let ret = queue[0];
      queue[0] = queue[queue.length - 1];
      queue.pop();
      let parent = 0;
      let isSwap: boolean = true;
      while (isSwap) {
        isSwap = false;
        let c1 = 2 * parent + 1;
        let c2 = 2 * parent + 2;
        if (c2 < queue.length - 1) {
          if (queue[parent] < queue[c1] && queue[c1] >= queue[c2]) {
            swap(parent, c1);
            parent = c1;
            isSwap = true;
          } else if (queue[parent] < queue[c2] && queue[c2] > queue[c1]) {
            swap(parent, c2);
            parent = c2;
            isSwap = true;
          }
        } else if (c1 < queue.length - 1) {
          if (queue[parent] < queue[c1]) {
            swap(parent, c1);
            parent = c1;
            isSwap = true;
          }
        }
      }

      return ret;

      function swap(parent: number, child: number) {
        let temp = queue[parent];
        queue[parent] = queue[child];
        queue[child] = temp;
      }
    }
  };

  fullJustify(words: string[], maxWidth: number): string[] {
    let z = 0;
    let result: string[] = [];
    while (z < words.length) {
      let j = z;
      let selectedWords: string[] = [];
      let selectedLength: number = 0;
      while (1) {
        if (j < words.length && selectedLength + words[j].length <= maxWidth) {
          selectedWords.push(words[j]);
          selectedLength += words[j].length;
          selectedLength += 1;
          j++;
        } else {
          break;
        }
      }
      z = j;

      let line: string = selectedWords[0];
      if (z == words.length) {
        for (let i = 1; i < selectedWords.length; i++) {
          line += ' ';
          line += selectedWords[i];
        }
        let spaces = maxWidth - line.length;
        let str = '';
        for (let i = 0; i < spaces; i++) {
          str += ' ';
        }
        line += str;
      } else if (selectedWords.length == 1) {
        let str = '';
        for (let i = 0; i < maxWidth - selectedWords[0].length; i++) {
          str += ' ';
        }
        line += str;
      } else {
        let wordRemaining = selectedWords.length - 2;
        let spaceDivs = wordRemaining + 1;
        let start = maxWidth - (selectedLength - selectedWords.length);
        let divs: number[] = [];
        while (spaceDivs > 0) {
          let space = Math.ceil(start / spaceDivs);
          divs.push(space);
          start -= space;
          spaceDivs -= 1;
        }

        for (let i = 0; i < divs.length; i++) {
          let str = '';
          for (let j = 0; j < divs[i]; j++) {
            str += ' ';
          }
          line += str;
          line += selectedWords[i + 1];
        }
      }
      result.push(line);
    }
    return result;
  };

  maxCandies(status: number[], candies: number[], keys: number[][], containedBoxes: number[][], initialBoxes: number[]): number {
    let queue = initialBoxes;
    let totalCandies = 0;
    let canVisit: Set<number> = new Set();
    while (queue.length > 0) {
      let box = queue.pop();
      if (status[box] == 0) {
        canVisit.add(box);
      } else if (status[box] == 1) {
        totalCandies += candies[box];
        let keysFound = keys[box];
        let boxFound = containedBoxes[box];
        keysFound.forEach(x => status[x] = 1);
        keysFound.forEach(x => {
          if (canVisit.has(x)) {
            queue.push(x);
            canVisit.delete(x);
          }
        });
        boxFound.forEach(x => queue.push(x));
        status[box] = 2;
      }
    }
    return totalCandies;
  };

  maxPoints(points: number[][]): number {
    if (points.length == 1) {
      return 1;
    }
    let lines: Map<number, Map<number, Map<number, Set<number>>>> = new Map();
    let yParallel: Map<number, Set<number>> = new Map();
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        let x1 = points[i][0];
        let y1 = points[i][1];
        let x2 = points[j][0];
        let y2 = points[j][1];
        let m: number;
        let c: number;
        if (x2 - x1 == 0) {
          let pts = yParallel.get(x1);
          pts == undefined ? pts = new Set<number>([y1, y2]) : pts.add(y1).add(y2);
          yParallel.set(x1, pts);
          continue;
        }
        m = (y2 - y1) / (x2 - x1);
        c = y1 - m * x1;

        if (lines.has(m) && lines.get(m).has(c)) {
          let mp = lines.get(m);
          let linepoints = mp.get(c);
          if (linepoints.has(x2)) {
            if (!linepoints.get(x2).has(y2)) {
              let yCoords = linepoints.get(x2);
              yCoords.add(y2);
              linepoints.set(x2, yCoords);
              mp.set(c, linepoints);
              lines.set(m, mp);
            }
          } else {
            linepoints.set(x2, new Set<number>().add(y2));
            mp.set(c, linepoints);
            lines.set(m, mp);
          }
        } else if (lines.has(m)) {
          let mp = lines.get(m);
          let linePoints: Map<number, Set<number>> = new Map();;
          if (x1 == x2) {
            let s = new Set<number>([y1, y2]);
            linePoints.set(x1, s);
          } else {
            linePoints.set(x1, new Set<number>([y1]));
            linePoints.set(x2, new Set<number>([y2]));
          }
          mp.set(c, linePoints);
          lines.set(m, mp);
        } else {
          let linePoints: Map<number, Set<number>> = new Map();;
          if (x1 == x2) {
            let s = new Set<number>([y1, y2]);
            linePoints.set(x1, s);
          } else {
            linePoints.set(x1, new Set<number>([y1]));
            linePoints.set(x2, new Set<number>([y2]));
          }

          lines.set(m, new Map().set(c, linePoints));
        }
      }
    }
    let max = Number.MIN_VALUE;
    lines.forEach((constantMap, m) => {
      constantMap.forEach((linepointsMap, c) => {
        let sum = 0;
        linepointsMap.forEach((yc, x) => {
          sum += yc.size;
        });
        if (sum > max) {
          max = sum;
        }
      });
    });

    yParallel.forEach((pts, x) => {
      if (pts.size > max) {
        max = pts.size;
      }
    })

    return max;
  };

  minReverseOperations(n: number, p: number, banned: number[], k: number): number[] {
    type dto = { curr: number, count: number };
    let result: number[] = new Array(n).fill(-1);
    let visited: boolean[] = new Array(n).fill(false);
    let evenSet: Set<number> = new Set();
    let oddSet: Set<number> = new Set();
    banned.forEach(x => {
      visited[x] = true;
    })

    let queue = new GenericQueue<dto>({
      curr: p,
      count: 0,
    })

    p % 2 == 0 ? evenSet.add(p) : oddSet.add(p);

    while (queue.size() > 0) {
      let pop = queue.dequeue();
      if (!visited[pop.curr]) {
        visited[pop.curr] = true;
        result[pop.curr] = pop.count;
        let combinations = getReversable(pop.curr, pop.count + 1);
        combinations.forEach(x => queue.enqueue(x))
      }
    }

    return result;

    function getReversable(curr: number, count: number) {
      function selectSetParity(): number {
        if (k % 2 == 0) {
          if (curr % 2 == 0) {
            return 1;
          }
          return 0;
        } else {
          if (curr % 2 == 0) {
            return 0;
          }
          return 1;
        }
      }
      let leftStart = (curr - (k - 1)) > 0 ? curr - (k - 1) : 0;
      let rightStop = (curr + (k - 1)) < n ? curr : n - k;
      let possible: dto[] = [];
      let leftRev = (k - 1) - curr + 2 * leftStart;
      let rightRev = (k - 1) - curr + 2 * rightStop;

      let selectedSet = selectSetParity() == 0 ? evenSet : oddSet;
      for (let i = leftRev; i <= rightRev; i += 2) {
        if (selectedSet.has(i)) {
          break;
        }
        selectedSet.add(i);
        possible.push({
          curr: i,
          count: count,
        })
      }

      for (let i = rightRev; i >= leftRev; i -= 2) {
        if (selectedSet.has(i)) {
          break;
        }
        selectedSet.add(i);
        possible.push({
          curr: i,
          count: count,
        })
      }
      return possible;
    }
  };

  maxUniqueSplit(s: string): number {
    let uniqueSet: Set<string> = new Set();
    let max = Number.MIN_VALUE;
    let maxSubStrings: string[] = [];
    function findUniques(i: number) {
      if (i == s.length) {
        if (uniqueSet.size > max) {
          max = uniqueSet.size;
          maxSubStrings = [];
          uniqueSet.forEach(x => maxSubStrings.push(x));
        }
        return;
      }

      for (let j = i; j < s.length; j++) {
        let subString = s.substring(i, j + 1);
        if (!uniqueSet.has(subString)) {
          uniqueSet.add(subString);
          findUniques(j + 1);
          uniqueSet.delete(subString);
        }
      }
    }
    findUniques(0);
    console.log(maxSubStrings);
    return max;
  };

  subtractProductAndSum(n: number): number {
    if (n == 0) {
      return 0;
    }

    function getDigits(n): number[] {
      let nums: number[] = [];
      while (n > 0) {
        let mod = n % 10;
        nums.push(mod);
        n = Math.floor(n / 10);
      }
      return nums;
    }
    let digits = getDigits(n);
    let product = digits.reduce((acc, curr) => acc *= curr, 1);
    let sum = digits.reduce((acc, curr) => acc += curr, 0);

    return product - sum;
  };

  sumZero(n: number): number[] {
    if (n == 1) { return [0] };
    if (n == 2) { return [-1, 1] }
    let arr: number[] = [];
    for (let i = 0; i < n - 1; i++) {
      arr.push(i);
    }

    let sum = (n - 1) * (n - 2) / 2;
    arr.push(-sum);
    return arr;
  };

  generateTrees(n: number): Array<TreeNode | null> {
    let allPermutations: number[][] = [];
    function findPermutations(postition: number, numSet: Set<number>, nums: number[]) {
      if (postition == n) {
        allPermutations.push([...nums]);
        return;
      }

      for (let i = 1; i <= n; i++) {
        if (!numSet.has(i)) {
          nums[postition] = i;
          numSet.add(i);
          findPermutations(postition + 1, numSet, nums);
          numSet.delete(i);
        }
      }
    }
    findPermutations(0, new Set<number>(), new Array(n));
    let treeNodes: TreeNode[] = [];
    allPermutations.forEach(x => {
      treeNodes.push(new BST(x).root);
    });

    // allPermutations.forEach(x => console.log(x));
    let uniqueMap: Map<number, TreeNode> = new Map();
    treeNodes.forEach(x => {
      let pre = BinaryTree.preOrderTraversal(x);

      let unit = pre.length - 1;
      let fullNum = 0;
      for (let i = pre.length - 1; i >= 0; i--) {
        let base = Math.pow(10, (unit - i));
        let partialNum = base * pre[i];
        fullNum += partialNum;
      }
      uniqueMap.set(fullNum, x);
    });

    let uniqueRoots: TreeNode[] = [];
    uniqueMap.forEach((v, k) => {
      // console.log(k);
      uniqueRoots.push(v);
    });
    return uniqueRoots;
  };

  maximumGap(nums: number[]): number {
    if (nums.length == 0) {
      return 0;
    }

    function initRaidx(): number[][] {
      let radix: number[][] = new Array(10);
      for (let i = 0; i < 10; i++) {
        radix[i] = new Array();
      }
      return radix;
    }
    let max = Number.MIN_VALUE;
    for (let i = 0; i < nums.length; i++) {
      if (max < nums[i]) {
        max = nums[i];
      }
    }

    let count = 0;
    while (max > 0) {
      max = Math.floor(max / 10);
      count++;
    }

    // let sortedResult: number[] = nums;
    let radix = initRaidx();
    let i = 0;
    while (i < count) {
      let divisor = Math.pow(10, i);
      for (let j = 0; j < nums.length; j++) {
        let index = Math.floor(nums[j] / divisor) % 10;
        radix[index].push(nums[j]);
      }

      let k = 0;
      let index = 0;
      while (k < 10) {
        let bin = radix[k++];
        for (let m = 0; m < bin.length; m++) {
          nums[index++] = bin[m];
        }
      }

      radix = initRaidx();
      i++;
    }

    console.log(nums);
    let maxDiff = Number.MIN_VALUE;
    for (i = 1; i < nums.length; i++) {
      let diff = nums[i] - nums[i - 1];
      if (diff > maxDiff) {
        maxDiff = diff;
      }
    }
    return maxDiff;
  };

  rob2(nums: number[]): number {
    let dp: number[][] = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
      dp[i] = new Array(2).fill(-1);
    }
    function findMaxMoney(houseIndex: number, hasFirstHouse: boolean) {
      if (houseIndex >= nums.length) {
        return 0;
      }

      if (houseIndex == nums.length - 1) {
        return hasFirstHouse ? 0 : nums[houseIndex];
      }

      if (dp[houseIndex][hasFirstHouse ? 0 : 1] != -1) {
        return dp[houseIndex][hasFirstHouse ? 0 : 1];
      }

      let maxMoney = Number.MIN_VALUE;
      if (houseIndex == 0) {
        maxMoney = Math.max(nums[houseIndex] + findMaxMoney(houseIndex + 2, true), findMaxMoney(houseIndex + 1, false));
      } else {
        maxMoney = Math.max(nums[houseIndex] + findMaxMoney(houseIndex + 2, hasFirstHouse), findMaxMoney(houseIndex + 1, hasFirstHouse));
      }

      if (hasFirstHouse) {
        dp[houseIndex][0] = maxMoney;
      } else {
        dp[houseIndex][1] = maxMoney;
      }

      return maxMoney;
    }

    return findMaxMoney(0, false);
  };

  maxMoves(grid: number[][]): number {
    let dp: number[][] = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
      dp[i] = new Array(grid[0].length).fill(-1);
    }

    let n = grid.length;
    let m = grid[0].length;

    function findPaths(i: number, j: number) {
      if (i < 0 || i > grid.length) {
        return 0;
      }
      if (j >= grid[0].length) {
        return 0;
      }
      if (dp[i][j] != -1) {
        return dp[i][j];
      }

      let p1 = 0;
      let p2 = 0;
      let p3 = 0;
      let curr = grid[i][j];
      if (i - 1 >= 0 && j + 1 < m && grid[i - 1][j + 1] > curr) {
        p1 = 1 + findPaths(i - 1, j + 1);
      }
      if (j + 1 < m && grid[i][j + 1] > curr) {
        p2 = 1 + findPaths(i, j + 1);
      }
      if (i + 1 < n && j + 1 < m && grid[i + 1][j + 1] > curr) {
        p3 = 1 + findPaths(i + 1, j + 1);
      }
      let moves = Math.max(p1, p2, p3);
      dp[i][j] = moves;
      return moves;
    }

    let max = Number.MIN_VALUE;
    for (let i = 0; i < n; i++) {
      let paths = findPaths(i, 0);
      if (paths > max) {
        max = paths;
      }
    }
    return max;
  };

  minCost(colors: string, neededTime: number[]): number {
    let i = 0;
    let j = 1;
    let time = 0;
    while (j < colors.length) {
      if (colors[i] != colors[j]) {
        j++;
        i = j - 1;
      } else {
        if (neededTime[i] < neededTime[j]) {
          time += neededTime[i];
          j++;
          i = j - 1;
        } else {
          time += neededTime[j];
          j++;
        }
      }
    }
    return time;
  };


};

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

  static mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    let targetListHead = null;
    let tptr = null;
    let runLoop = true;

    while (runLoop) {
      let index: number;
      let min = Number.MAX_VALUE;
      let sp: ListNode = null;
      runLoop = false;

      for (let i = 0; i < lists.length; i++) {
        if (lists[i] != null) {
          runLoop = true;

          if (lists[i] != null && lists[i].val < min) {
            min = lists[i].val;
            index = i;
            sp = lists[i];
          }
        }
      }

      if (sp) {
        if (tptr == null) {
          tptr = new ListNode(min);
          targetListHead = tptr;
        } else {
          tptr.next = new ListNode(min);
          tptr = tptr.next;
        }
        sp = sp.next;
        lists[index] = sp;
      }
    }

    return targetListHead;
  };

  static hasCycle(head: ListNode | null): boolean {
    if (!head) {
      return false;
    }
    let i = head;
    let j = head.next;
    let loop = false;
    while (j != null && j.next != null) {
      if (i == j) {
        loop = true;
        break;
      }
      i = i.next;
      j = j.next.next;
    }
    if (loop) {
      return true;
    }
    return false;
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
    for (let i = 1; i < nums.length; i++) {
      let ptr = this.root;
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

  isValidBST(root: TreeNode | null): boolean {
    let trav = this.inorderTraversal(root);
    for (let i = 1; i < trav.length; i++) {
      if (trav[i] <= trav[i - 1]) {
        return false;
      }
    }
    return true;
  };
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

  static preOrderTraversal(root: TreeNode): number[] {
    let arr: number[] = [];
    function traverse(root: TreeNode) {
      if (root == null) {
        return;
      }
      arr.push(root.val);
      traverse(root.left)
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

  static isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    function traverse(root: TreeNode) {
      if (root == null) {
        return '0';
      }
      let l = traverse(root.left)
      let c = l + String(root.val);
      let r = traverse(root.right);
      return l + c + r;
    }

    let ps = traverse(p);
    let qs = traverse(q);

    if (ps.length != qs.length) {
      return false;
    }

    for (let i = 0; i < ps.length; i++) {
      if (qs[i] != ps[i]) {
        return false;
      }
    }

    return true;
  };

  static flatten(root: TreeNode | null): void {
    if (root == null) {
      return;
    }

    let pre = this.preOrderTraversal(root);
    let ptr = root;
    root.left = null
    for (let i = 1; i < pre.length; i++) {
      ptr.right = new TreeNode(pre[i], null, null);
      ptr = ptr.right;
    }
  };

  static levelOrder(root: TreeNode | null): number[][] {
    if (root == null) {
      return [];
    }

    let queue: TreeNode[] = [];
    queue.push(root);

    let result: number[][] = [];
    while (queue.length > 0) {
      let arr: number[] = [];
      for (let i = 0; i < queue.length; i++) {
        arr.push(queue[i].val);
      }
      result.push(arr);

      let newQueue: TreeNode[] = [];
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].left) {
          newQueue.push(queue[i].left);
        }
        if (queue[i].right) {
          newQueue.push(queue[i].right);
        }
      }
      queue = newQueue;
    }

    return result;
  };

  static buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    let cIndex = 0;

    function build(inorder: number[]) {
      if (inorder.length == 0 || !inorder.includes(preorder[cIndex])) {
        return null;
      }

      let split = inorder.findIndex(x => x == preorder[cIndex]);
      let root = new TreeNode(preorder[cIndex], null, null);
      cIndex++;
      root.left = build(inorder.slice(0, split));
      root.right = build(inorder.slice(split + 1));
      return root;
    }
    return build(inorder);
  };

  static buildTree2(inorder: number[], postorder: number[]): TreeNode | null {
    let cIndex = postorder.length - 1;

    function build(inorder: number[]) {
      if (inorder.length == 0 || !inorder.includes(postorder[cIndex])) {
        return null;
      }

      let split = inorder.findIndex(x => x == postorder[cIndex]);
      let root = new TreeNode(postorder[cIndex], null, null);
      cIndex--;
      root.right = build(inorder.slice(split + 1));
      root.left = build(inorder.slice(0, split));
      return root;
    }
    return build(inorder);
  };
}

export class MaxHeap {
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

export class BSTIterator {
  private inorder: number[] = [];
  private index = 0;
  constructor(root: TreeNode | null) {
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
    this.inorder = arr;
  }

  next(): number {
    return this.inorder[this.index++];
  }

  hasNext(): boolean {
    if (this.index < this.inorder.length) {
      return true;
    }
    return false;
  }
}

export class Node {
  val: number
  neighbors: Node[]
  constructor(val?: number, neighbors?: Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.neighbors = (neighbors === undefined ? [] : neighbors)
  }
}

export class G1ListNode<T> {
  val: T
  next: G1ListNode<T> | null
  constructor(val?: T, next?: G1ListNode<T> | null) {
    (this as any).val = (val === undefined ? null : val)
    this.next = (next === undefined ? null : next)
  }
}

export class GenericQueue<T> {
  private queueHead: G1ListNode<T>;
  private queuTail: G1ListNode<T>;
  private count = 0;

  constructor(n: T) {
    this.queueHead = new G1ListNode(n);
    this.queuTail = this.queueHead;
    this.count = 1;
  }
  enqueue(node: T) {
    this.queuTail.next = new G1ListNode(node);
    if (this.queueHead == null) {
      this.queueHead = this.queuTail.next;
    }
    this.queuTail = this.queuTail.next;
    this.count++;
  }
  dequeue(): T {
    if (this.queueHead == null) {
      return null;
    }
    let val = this.queueHead.val;
    this.queueHead = this.queueHead.next;
    this.count--;
    return val;
  }

  size(): number {
    return this.count;
  }
}

export class Graph {
  static getValues(node: Node | null): number[] {
    if (node == null) {
      return [];
    }
    let nodeState: number[] = new Array(100).fill(-1);
    let values: number[] = [];
    function BFS(node: Node) {
      let oQ = new GenericQueue(node);
      nodeState[node.val] = 0;
      while (oQ.size() != 0) {
        let o = oQ.dequeue();
        for (let i = 0; i < o.neighbors.length; i++) {
          if (nodeState[o.neighbors[i].val] >= 0) {
            continue;
          }
          oQ.enqueue(o.neighbors[i]);
          nodeState[o.neighbors[i].val] = 0;
        }
        values.push(o.val);
        nodeState[o.val] = 1;
      }
    }
    BFS(node);
    return values;
  }
};

export class StockSpanner {
  private stockPrices: number[] = [];
  private stack: { index: number, span: number }[] = [];
  constructor() {
  }

  next(price: number): number {
    this.stockPrices.push(price);
    let top = this.stack[this.stack.length - 1];
    let count = 1;
    while (this.stack.length > 0 && this.stockPrices[top.index] <= price) {
      let pop = this.stack.pop();
      count += pop.span;
      top = this.stack[this.stack.length - 1];
    }
    this.stack.push({ index: this.stockPrices.length - 1, span: count });
    return count;
  }
}