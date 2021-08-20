import { log } from "../../deps.ts";
import { userAgent } from "./ua.ts";

const request = async (url: URL): Promise<string> => {
  const { href } = url;

  const c = new AbortController();
  const id = setTimeout(() => c.abort(), 1000);

  const res = await fetch(href, {
    signal: c.signal,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      "sec-ch-ua-mobile": "?1",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        'TAUnique=%1%enc%3A5yOE8aPgi9MCmHVV0eaniCRgtTPpySkIzpJT3MZXbQo2jHwltRJPGQ%3D%3D; fbm_162729813767876=base_domain=.tripadvisor.com; _evidon_consent_cookie={"consent_date":"2020-11-17T09:44:28.491Z","categories":{"3":true},"vendors":{"3":{"14":true,"17":true,"36":true,"56":true,"58":true,"66":true,"80":true,"81":true,"82":true,"99":true,"103":true,"131":true,"134":true,"139":true,"168":true,"174":true,"242":true,"249":true,"253":true,"257":true,"259":true,"265":true,"269":true,"286":true,"290":true,"292":true,"298":true,"310":true,"321":true,"322":true,"348":true,"355":true,"384":true,"395":true,"412":true,"433":true,"442":true,"447":true,"457":true,"459":true,"464":true,"474":true,"480":true,"516":true,"550":true,"560":true,"606":true,"608":true,"631":true,"633":true,"635":true,"650":true,"667":true,"673":true,"735":true,"775":true,"828":true,"831":true,"853":true,"905":true,"920":true,"921":true,"948":true,"1028":true,"1095":true,"1175":true,"1256":true,"1306":true,"1455":true,"1635":true,"1647":true,"1812":true,"1872":true,"1879":true,"1904":true,"1955":true,"2191":true,"2253":true,"2449":true,"2516":true,"2521":true,"2609":true,"2884":true,"2937":true,"3110":true,"3173":true,"3222":true,"3437":true,"3490":true,"3568":true,"3622":true,"3632":true,"3794":true,"3857":true,"3952":true,"3994":true,"4100":true,"4160":true,"4166":true,"4355":true,"4548":true,"4668":true,"4782":true,"5037":true,"5129":true,"5175":true,"5181":true,"5205":true,"5277":true,"5303":true,"5305":true,"5312":true,"5431":true,"6171":true,"6423":true,"6609":true}},"cookies":{"3":true},"consent_type":1}; TATrkConsent=eyJvdXQiOiIiLCJpbiI6IkFMTCJ9; __ssid=f9dc6e5b2fa9a31327b330c90ec4384; VRMCID=%1%V1*id.13091*llp.%2FShowTopic-g1-i12105-k4907156-How_can_I_download_my_travel_map_pins_list-Tripadvisor_Support%5C.html*e.1625569674103; TADCID=1JAhWoOfqprcCTA4ABQCFdpBzzOuRA-9xvCxaMyI12egQt2T-WCj1zuw6hwiGT7MQMV3buX-9hAp4wIe56xdgkqaaBG1y5eHpl4; TAAUTHEAT=NFTl1epOf9YC3RNkABQCab7fMZ8ORguCqJF_E5GxfSd3QnKYQdXKDKaicAgFEcNX52W5iHoG0Kh1Ifehd0gS6G-rhZuLmvk61HIYkdrgRjU34CJ5CHNYBU6szd57dJ7uz-HDcpw2CUsI7-967GLz5dRWSU8kWew11rmuquohQUC_qR07qXMdIL3oGkIEj3ufdbgcVWH_o_DPsgD_6CmOlA; __vt=9fUwsr4Y85tTSvoIABQCIf6-ytF7QiW7ovfhqc-AvRd94gNtJa8LO85_lErSGlXC-Jrftz2Q-4j6mRyP51Xi2n1ZxUq2XmBI774r9PX_AxAgPWgPzYgvUPyLpJWmX9a05bYac4F-mGzEWAboUqkxodSM63gNG0--lYvHPXStB3V3-U18_wOvmCjM5cvKmey7aVWE9-GmdCJzI4RkK2gRsZbfgmWQmHqPvigJnsTJwfbBsYrMS9devBjGhym3uTr44Xm5jfzoWDJwNXdqTNBOitfULrlEGfLe8X7sPg9y7ub2qGY7BECR; TASSK=enc%3AAEoL5IlrYVL5NKywiLq0%2FLJ7CxG9YxbFMjtn5cv1ijl5sGszbPQJrY4INiWiD4lVz5FqomA1C9McMXAJxW%2BzFOP%2FAfxmiquz5y%2BjJRWc4CESqgoLEbTGkwqJnD%2BS%2BX1epw%3D%3D; PAC=AE_4uTLAgX9FGQMdqDHwTMxb9A17Rco2Vf38TDEkzoAeh_pdaEutYcky9Z1Aylx15nLHT-Vet0vnRnNAwGro1EgSz8biBclJ0wz1cKZJl2BBu_Id_tGQXptqdvGgC59elyPp9pHQ087SpoyG_UYPM4be1U5UqgXKuk8ob6EKQVSEHHDAkRYbX1J4fvfeLgodsA%3D%3D; ServerPool=A; PMC=V2*MS.34*MD.20210629*LD.20210820; TART=%1%enc%3AIH4ZBGuWi7QSw8PdFLgVQLJ2vqbeK3gyKzlCWm20UBx2Jup1aLD6L%2F%2BXTknr7OLhW1JxtpsONWQ%3D; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TASID=9A43730298DD4930B3DFAB437E361BCA; fbsr_162729813767876=LmFaHbzu9111BJTZfJD_K3o9dTroYPaXgOTTTp2CFZY.eyJ1c2VyX2lkIjoiNTQ0NjAzNjM0IiwiY29kZSI6IkFRQUlCUElicm5rQXVMM1h5eVA3SVUyT2VzYy1ZaEd5OXVpZTJjc3hkcEhKYVktSUJmWnhTOFh6dDZGU2g1RkpfRXF5NE9mU1JCSUwxUHN1bk1FbzRzN3hoYm14NFZwWGJDeG5lbmV2cURYX2ROdEhSbEFBNHVRNkZ1NkNyM3RRWVNNNkZ6NFQzVUtNTlV4LXYzQzFRVHVjSlM3azk2VmFvRno2Q0ZqWkJ3c1gxTzE4cF9KZ0cwSUctNURqSkFZeDdMWVJ5Z3dBZzQ4SGZLV1Naa2g1TWJPODEteFVnVjZIb2dSSGNWNHhxTU1RZ0dxb1c0Rk9DUXpzN3BQV1FWaHpQRmg4VDExY29scVhiVjY4bEw2VHJwd3pwcld6S2F5OUhfWjJLaWtQVlUtNXRLTDdrRVI4cVl6QkJjcVF1bEQxeE5XTHduSF91dS1QQVEweDZBZFJILTJZZGk2d3R3Q0tsNmpyOVNHNzhRQnoxZyIsIm9hdXRoX3Rva2VuIjoiRUFBQ1VBSHlaQmRzUUJBSnJRenBRU3hoNFpDTnRtWkFFbHFRbG1GYUthcVQ5TktjcUlwNFEyOEI5Z05iSmJaQnBVdXRXYmkwWHIwVXAwSzg5TlRuaFNjSlhsS2pzNFYzajNaQlAwMnROdUROeTBlWkJzSXVaQldUWkFnYkVTWkJPSWlrTGpieUN3UGVVc3pLZE82MW5XRVVZMjJrZE9PNU1HM2ZhU1pCa3Bwc2xaQVJWbzZmdWNrTFJISDVkaVNlaVRVQmRWdURaQ2VKcFRWVll5QVpEWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYyOTQ4Nzk5NX0; roybatty=TNI1625!ABesbSD07%2FLhXjUg8YavvtKwVhOM4PGAzRNVcSugNpkDKCcsbr5TC7WNJxKMa2ulNhjVxKPMN%2Fk8inpXWoDDzYHazUQUEDcY1H4xv9Mzb8KcEGqsd%2F9fjpqe8cJO8f2jwwdbDGiYM8Rt0PKfPVKn%2F%2BPEku4uQix%2FzmgM6d%2BH9qdD%2C1; TASession=V2ID.9A43730298DD4930B3DFAB437E361BCA*SQ.10*LS.DemandLoadAjax*GR.63*TCPAR.4*TBR.74*EXEX.69*ABTR.51*PHTB.56*FS.27*CPU.45*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*TS.F16A76DBDC7075B786CC2C71B9198693*FA.1*DF.0*TRA.true*FBC.1*EAU.6; TAUD=LA-1629487995070-1*RDD-1-2021_08_20*LG-8988-2.1.F.*LD-8989-.....; ak_bmsc=29B7B35C1E6AB416F3998CD27ADF5DA6~000000000000000000000000000000~YAAQBNR7XJTJ5AB7AQAA98INZQzBTHWye8VHxZx0SuoQNVp1IGFwElkUkHthNi0kCNt9v5J+twp00w4QAZ6F1ry9kzkz/9BO/NHLgOtKhKGYYfcnnjNwDzD7L/7A2TBwCfS1L8WfcQxzM/ZApytvuwy0aRbLFT/2mQQqIpO36hPC66a0C3TU7iIwQa/QkoX4vMLhuSoWE4mHMYt802eOeOB3Yf9XOnk8eWa6VLhicaKCNuzUkkYosc37+Qgpl+f/6yC5mnbeg7aIwNU4pObX8fA9xxJ88cBYMfisuShWam0KBO7e3zY+z7vuOv/71Bome6fdd2ij3vlhkmEfY6dauwTBDyDNsRKGHSoYm5ADSuxGgGWwrb2L3OHLGXkJ2OhkRb5tP2uwUcU7Fmw82HcjwwYVXGci1Ao8ZT8119k8Yw==; bm_sv=F4D28DA917098B9C6804C805AB0570E4~4rybYshIN2JnLMWXPFn96Mi++qQGdoWpatKgQYkCKXtxHqGagcj5wT6dL9WUnlceCft/L+sNip1qmGGC1LVPMpXLKMaEixtt/w5u7L7+Jc7LpGjSKIzzS1zaJ6Q/xgPVV0O7kQybkCImxuqjg7k/pntZB8GxIed9T2q+/kWU+UQ=',
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  });
  clearTimeout(id);
  log.info(res.status);
  if (!res.ok) {
    throw new Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
