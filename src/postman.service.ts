// ip , api key, route, etc... 

import { config } from "process";

// multiple configs, 

// request : {ip , api key, route, etc... , time}
// configs : {key, count, start_time, end_time, duration}[]

// naming convention for key:
// ip_*
// ip_192.168.1.1
// api_key_*
// route_*

// bootup:
//   hashmap<config_key, data>

//   on request receive: 
//     k = get_request_keys();
//     for all k {
//       generic = 
//       specific = 

//       if(isAllowed(generic, request) || isAllowed(specific, request)) {

//       }
//     }

//   isAllowed(key) :
//   now = request.time(); //erquest time
//   ckd = hashmap.get(key);
//   if(ckd):
//     if(now > kd.start && now< kd.end) {
//       ckd.count++;
//       return true
//     } else {
//       return false
//     }
//   }

//   get_request_keys(reqeust): string[] {
//   }

export type Config = {
  key: string;
  duration: number;
  num: number;
}

export type keyData = Config & {
  startTime: number;
  endTime: number;
  count: number;
}

export class Request {
  private keys: string[];
  time: number;
  constructor(keys: string[]) {
    this.keys = keys
    this.time = Date.now();
  }

  getKeys(): string[] {
    const allKeys: string[] = [];
    this.keys.forEach(k => {
      allKeys.push(k);
      allKeys.push(this.findGenericKey(k));
    })
    return allKeys;
  }

  findGenericKey(k: string): string {
    if (this.typeKey(k) == 'IP')
      return "ip_*";
  }

  typeKey(key: any): string {
    return 'IP';
  }
}

export class RateLimiter {
  private keyConfigMap = new Map<string, keyData>();
  private processedRequestes = 0;
  private starttime = Date.now();
  constructor(configs: Config[]) {
    configs.forEach(c => {
      const data: keyData = {
        key: c.key,
        duration: c.duration,
        num: c.num,
        startTime: Date.now(),
        endTime: Date.now(),
        count: 0,
      }
      this.keyConfigMap.set(c.key, data);
      setInterval(() => {
        data.startTime = Date.now();
        data.endTime = Date.now() + data.duration;
        data.count = 0;
        this.keyConfigMap.set(data.key, data);
      }, c.duration * 1000);
    })
  }

  getProcessedRequests() {
    return this.processedRequestes;
  }

  ProcessRequest(request: Request) {
    if (!this.IsRequestAllowd(request)) {
      return;
    }

    this.increaseKeysLimit(request);
    this.processedRequestes++;
  }

  private increaseKeysLimit(request: Request) {
    request.getKeys().forEach(k => {
      const data = this.keyConfigMap.get(k);
      data.count += 1;
      this.keyConfigMap.set(k, data);
    });
  }

  IsRequestAllowd(request: Request): boolean {
    const keys = request.getKeys();
    keys.forEach(k => {
      const data = this.keyConfigMap.get(k);
      if (data) {
        if (!(request.time >= data.startTime && request.time <= data.endTime && data.count + 1 < data.num)) {
          return false;
        }
      } else {
        return false;
      }
    })
    return true;
  }
}


