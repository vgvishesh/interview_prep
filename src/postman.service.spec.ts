import { Config, RateLimiter, Request } from "./postman.service"

it('test_rateLimiter', () => {
  const configs: Config[] = [{
    key: "ip_*",
    duration: 5,
    num: 100,
  }]

  const s = new RateLimiter(configs);
  for (let i = 0; i < 10; i++) {
    const request = new Request(["IP"])
    setTimeout(() => {
      s.ProcessRequest(request);
      console.log(s.getProcessedRequests());
    }, (i * 1000));
  }
})