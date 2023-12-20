const request = async (url: URL): Promise<string> => {
  const { href } = url;

  const c = new AbortController();
  const id = setTimeout(() => c.abort(), 2000);

  const res = await fetch(href, {
    signal: c.signal,

    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "TADCID=Fz4MPscwS3L3PNreABQCCKy0j55CTpGVsECjuwJMq3pYh_GnVv2GmDDfLEaGyg3awlu5DsW4HMsxFXdtSWfscBJF_-96fNsL-c4; TASameSite=1; TAUnique=%1%enc%3AZgnMafTMjae2ILHjbvS3H6Htvgf%2FscWt%2B91PH94kuXhUFdTPV1n2QyCn7Je0eV4aNox8JbUSTxk%3D; __vt=rrDIzH9FuWWcE4tpABQCCQPEFUluRFmojcP0P3EgGio2Jz5Bjce2yqWYwyukRSeg9FhgrQFeaLF1UowzT2TpxslztFdqYugLt8dmdGKsasIiDbanFftxqvdIHPEQP52V3289PEsgK2xpWbJwRzmnsWEcYw; TASSK=enc%3AAFMR8RsU81GlsxNaQmB7agGIA%2BPkcf7RSinmqFTlzGX0ZLn3LpR5kTeOyNn33l9Evj2bEdJcgMoz%2FSQiOgq%2FCYj3gyTDZHo0xJ1J2qTCUrePHa9yKVuPfzQ7wSwGpBoJqg%3D%3D; SRT=TART_SYNC; ServerPool=A; PMC=V2*MS.14*MD.20231220*LD.20231220; TART=%1%enc%3A%2BfVCTWwKPsQWXjkkqEcQ%2Bouxi5rQ38xQMhxMXXDG5KyPFhM1s5LCTh4JN1PgYjXwFgvnvOwVdbY%3D; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TASID=2921D378C7744A9AAC16A0F2F07F8EBD; _abck=E64EABB7FB158B9BD6421F20DEBA6D36~-1~YAAQBFATAoj7NGOMAQAAULOBiAs85LOz6DhDo0/q3oEdpWOuU7ytbkfe3+Io3OEiYkZHvEdqAim9LMW8zWAM7eZ70ZhqqPfM1OJs1+G/qZAKq6UDbqoVye0qB6pUqAZh3PStq2UK59Cnp6tpAJWCF+PhdTxFPLt1Z6AlvEvq+u6/dcRcnzedUz4czaC9UwFw3n2VY0CwzGTvxNVcH1oSSeGXe3iSCW/1t4rTdNH8WWVYnXBFuD5n/geDBlx4a/5tD5GIuHXH5dc8w7OykX9cikfHsb++kqU2mhCqWed8r2ScHXClKIQg07cMXTB6+Q2uBk3jsJ4awUvIQSJd7o5s+C20mpuEkaHolSdrAJuZ/2SMYGUE9HE/kvCbY4+LoP0IQQ==~-1~-1~-1; bm_sz=BE02FA7AE32C23FDA9941FA0E79AFA6F~YAAQBFATAon7NGOMAQAAULOBiBaoD5VEW+PPIns9kryP8PgSgsKnLF9Nj6dXLQIZ6J7BAF8ehv/rTtqBbP/MS8ehTPHB6GdF0Mzc2t+6FWmh7UYKnu8bNDhOrYfdCoIzFRbqkUTB1ZfCfmOiQYypJrH1LV1kauETGTEVoLUsVdqjo21T8a2MXCV4s1JtWphLu5Y6+hRs0PHFm9KFRqiylFw2jsvKs5QkKzL3ay1fYfLewhElK9wqa0TZ8NdsaUQixk/0pZrU2aIC52weRbXQIoHFsSCgCKqkP+QHLBo0ThqD3pzh7gy44A==~3487794~4604976; roybatty=TNI1625!AMxlhPI71ShiWiNUu6pAOg49zDd63WF0uVzYHyjBllPrdpFf%2FhFiKy%2FVJ2AUGcStSoY59%2B%2B%2FcxA42M01a%2FYKsm7OMleaW85YOzpj%2B5pdN%2FSP7cNNkROTNdHO0jvQtuEAET9jV7N%2FVImCSvFFHlHs1EOQ29wQuqmze6Du%2FEO%2F%2FHeR4nC%2FzDY10VHRs3fcyKJKig%3D%3D%2C1; PAC=AHVgWMdFBblIa8kDWcnWSe8oQCGf-q_07olpeMU3sTVmvPTzzvoPsJNM5JcjHqrNK2eN7rYuJLJWHzorb75z574diyMdOy7Lj-pXPQgY9L1HiNg72aGwLSjL3OGMwZHNki1BXQXtmtp7hHkJfFiYBy9_e3BhJs6HDT-VzKuHhALyZjrWiIDphxXJHggUmsMkaw%3D%3D; TASession=V2ID.2921D378C7744A9AAC16A0F2F07F8EBD*SQ.3*LS.DemandLoadAjax*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*FA.1*DF.0*TRA.true*EAU._; TAUD=LA-1703097251379-1*RDD-1-2023_12_20*LG-203-2.1.F.*LD-204-.....; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Dec+20+2023+19%3A34%3A12+GMT%2B0100+(Mitteleurop%C3%A4ische+Normalzeit)&version=202310.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=713c8798-5813-4232-b974-120c1776e1cf&interactionCount=1&landingPath=https%3A%2F%2Fwww.tripadvisor.com%2FTravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693&groups=C0001%3A1%2CC0004%3A0%2CC0002%3A0%2CC0003%3A0%2CV2STACK42%3A0",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  });

  clearTimeout(id);
  if (!res.ok) {
    throw new Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
