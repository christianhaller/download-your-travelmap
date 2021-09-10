const request = async (url: URL): Promise<string> => {
  const { href } = url;

  const c = new AbortController();
  const id = setTimeout(() => c.abort(), 3000);

  const res = await fetch(href, {
    signal: c.signal,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "de-DE,de;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "TADCID=lYzHWxvYPxqXaK9KABQCFdpBzzOuRA-9xvCxaMyI12gTjwfAUBFNfHVo7ukzOwv91jiezSZTk2vfXaoGxdlxYBETVuV3dPrs3x8; TAUnique=%1%enc%3AX9WMxAIL3yuAqNYRs9fFUVM%2BKrltLRHWZC8bMRBo7mQ%3D; __vt=AH6ax0jN-7Egj1LlABQCIf6-ytF7QiW7ovfhqc-AvRfxLw3hGEA0eAsd-yTovz0l8dnC5jMQpPDVZ1kn-0QnJnr3_M_HvUjVpFTamjYSS9dKzwTZvdsA2wGHWojGmBc2t7HfjR19k2lk9RiUQUXdajjCkA; TASSK=enc%3AAOy0H2%2FLh%2FlpfNH8KGzrDsRkhsTI6tmhFpbrFlwUibn1WlFa6IQV7mHCfk%2BMBMWOqlqkg%2BxDA7V7AgrSY75VERyKGRcGcecRFwuZDfY5lUvMLh%2BgukDSn8Qc%2B8dZf4HHmQ%3D%3D; ServerPool=C; PMC=V2*MS.40*MD.20210910*LD.20210910; TART=%1%enc%3AgKjWEbPXxVGxb884kBA%2F%2Bdnc5RJfp6shcudEIuhr4e%2FkNcYq3WSLUx29%2BLrusMQDNox8JbUSTxk%3D; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TASID=FF6C308850584FA5BE3737C1D3F369D1; ak_bmsc=4CF4E0C45438ABB39198D8945A7B2CA1~000000000000000000000000000000~YAAQ5NbdWAiZXL97AQAAF7Kdzg2dSCbauGeDEXQe+yQRaqAo4KacQ1MftJA55+/HnCcD893Xng3du4xEXcfEySM92j3Q8jkt5FBJ1AZbgW/XJWUn3d3Hoo370dgMDoMWqD7o+OY5g7xhzkZAE87wiH/8qBdMgxYKkRHywXlcrfpezAwX2SaUZYtIsaEoZ8kpCwEPEosn7cuLcPS4eA0U+0AW+moW9y/WFIgJA37tVBwAu4VIOmLrzdSgE+2hvfP6QqJERoCC8WHoKjKz0JESpATvm1MOFwui2pb0tXrhvpE2Gv4LzflH0jd/nNP/M92GLaH/aHoTMbg4UYPBSTsFxKICQCuSr4J28fWAv5pqdJpa6oeGwtz/xAqu+FTLZqOZ2MLoNZqqcmVKTr4c2g==; roybatty=TNI1625!AE%2FujrIfl5pgr2BNiftBkrq1DLUeMnaIbpQPAvBgKo%2Be59LWOLNzjipNjf3OYvFnUKdEl2em063xkcYx2oWdtywdm76i6UcJDZ83INzh1S3b7UGLTdqkZFVVlfh65m7IKIOYsJc%2BxzqYOvedXBjooHdKbSKbDyHmFAQ9jL123zZN%2C1; PAC=AIX7kWVBRo6HFKvHHWIbPrMKVMmhhDFc5xIDDxbwzNEl1Ftgyh6ZObeKTpfOa1gFeBM6U8760KkWDsgc5ajou2-wPbF49im2MwzCKDNsUtOlxOmstox41Lohyb6ziVypfNQ2Q7kxruYxAd76-BD8ITw7LUZjGNN6S3FPQ_cUZyVzJoC3fCojX_ygmBKzro-CMg%3D%3D; TASession=V2ID.FF6C308850584FA5BE3737C1D3F369D1*SQ.3*LS.DemandLoadAjax*GR.19*TCPAR.77*TBR.17*EXEX.61*ABTR.60*PHTB.78*FS.47*CPU.74*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*FA.1*DF.0*TRA.true*EAU._; TAUD=LA-1631259049534-1*RDD-1-2021_09_10*LG-372-2.1.F.*LD-373-.....; bm_sv=A5CAF6E49511875A003C83EA8169FF32~JKOudPiMPO5DzXaLUyXb4KFWgvmpfOfx9abotFwo5AZHV8/scJjNGv/wTPgT6utLAlIjm2KVTGPFViiOuiOwlikeVx1NCmnlcrlXQTsuWrak+XyLqB0vmVwS/0C8HYDB1fLDSGx2qIUxoXTGn1TB+Q9ogvrn9MYw4abh75Ob5LY=",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  });
  clearTimeout(id);
  if (!res.ok) {
    throw new Error(`url ${href} is not ok`);
  }
  return res.text();
};
export { request };
