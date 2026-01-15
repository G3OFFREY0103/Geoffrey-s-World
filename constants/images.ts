
import { ImageData } from '../types';

const URLS = [
  "https://G3OFFREY0103.github.io/picx-images-hosting/000041-01.9ddgdyj89p.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20210705_191140-01.8vnepdhuxo.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20210804_165628-01.4g4zk45gl0.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20210905_074326-01.3ns42douxn.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211011_190051-01.7psaaf7zb.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211105_180316-01.9ddgdyj8hd.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211212_174529-01.8vnepdhuzg.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211216_195008-01.4n87fjrm7r.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211217_174915-01.41yjt8x5wu.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211230_165607-01.175vnghz5s.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20230610_144645-01.60uqjl2nws.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20230628_054646-(1).3uvbxtb04t.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20240212_175026.4qrtd9kokf.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF4771.4qrtd9xk3n.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF4771.7eh9nqyh9k.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF5045.6bhkcqhvt9.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF6042.8z70n3ax6j.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF6048.7axnpwkmml.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF6124.3yexvj42qv.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/DSCF8447.83aj7rm0dy.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1661159535815.pftyvglkx.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_20180623_163731.6wr7zo7v0u.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/微信图片_20191227164901.4n87g6n4ju.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/微信图片_20191227164915.102nsnrc21.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_20170420_090837.4qrtdwg79k.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1613654928248.1ovxcoev19.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1614864939970.7snpf4hjf0.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1618207832080.175vo3dhfu.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20260113_174638.92qmlgjmqa.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/22091.45i5rm5ux9.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20251011_104253.7snpf51neu.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20251010_132150.8dxd1fw3p0.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20251009_084348.5j4ovngwwz.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1757909024158.4xv19cmglt.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_4210.86u5609y81.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1738398063869.5j4ovngww0.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/retouch_2025011411582085.77e1su7726.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IlDQEMHapNjA.1e93jjjqt3.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1679017097777.466d81rhu.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1687158735845.4g4zkrl2zf.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport6ded8ee422dcdfd87f18005b9cd86ed1_1705718520178.szfx8pah9.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1705748454542.7axnqk09qh.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/171sw3nthhno269a9dmjsmtv4.6bhkddxikm.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_4222.b9e8nnww1.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_4217.1e93jjjqri.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_4216.7psaxuu5z.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_4207.et06dgzl5.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/IMG_4219.8ok6ulbbq5.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20210828_223958-01.2a5kyztf6h.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/20211218_105628-01.7p43hf8kjz.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/mmexport1633250997339-01.szfx8pae3.webp",
  "https://G3OFFREY0103.github.io/picx-images-hosting/大画幅东京塔-横.3622eh3ryj.webp"
];

// Helper to parse date from various filename formats
const parseDateFromUrl = (url: string): Date | null => {
  const filename = url.split('/').pop() || "";
  
  // Format 1: YYYYMMDD_HHMMSS (Standard, includes separators like _ or -)
  const matchSep = filename.match(/(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (matchSep) {
    return new Date(
      parseInt(matchSep[1]),
      parseInt(matchSep[2]) - 1,
      parseInt(matchSep[3]),
      parseInt(matchSep[4]),
      parseInt(matchSep[5]),
      parseInt(matchSep[6])
    );
  }

  // Format 2: YYYYMMDDHHMMSS (Compact, common in WeChat/Retouch)
  // We check for 20xx to ensure it's a likely year and not a random ID
  const matchCompact = filename.match(/(20\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
  if (matchCompact) {
    return new Date(
      parseInt(matchCompact[1]),
      parseInt(matchCompact[2]) - 1,
      parseInt(matchCompact[3]),
      parseInt(matchCompact[4]),
      parseInt(matchCompact[5]),
      parseInt(matchCompact[6])
    );
  }

  // Format 3: Unix Timestamp (mmexport + 13 digits)
  const matchTs = filename.match(/mmexport(\d{13})/);
  if (matchTs) {
    return new Date(parseInt(matchTs[1]));
  }

  return null;
};

const formatDisplayDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${y}.${m}.${d} / ${h}:${min}`;
};

const processImages = (): ImageData[] => {
  // 1. Parse all images
  const parsedImages = URLS.map((url) => {
    const date = parseDateFromUrl(url);
    let dateStr = "";
    if (date) {
      dateStr = formatDisplayDate(date);
    }
    
    return {
      data: {
        url,
        title: dateStr,
        titleZh: dateStr,
        phrase: "",
        phraseZh: "",
        date: dateStr,
        location: "",
        locationZh: ""
      },
      dateObj: date
    };
  });

  // 2. Separate dated and undated
  const datedImages = parsedImages.filter(img => img.dateObj !== null);
  const undatedImages = parsedImages.filter(img => img.dateObj === null);

  // 3. Sort dated images: Oldest to Newest (Chronological Timeline)
  datedImages.sort((a, b) => a.dateObj!.getTime() - b.dateObj!.getTime());

  // 4. Shuffle undated images for random insertion
  for (let i = undatedImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [undatedImages[i], undatedImages[j]] = [undatedImages[j], undatedImages[i]];
  }

  // 5. Interleave undated images randomly into the sorted sequence
  const finalSequence = [...datedImages];
  
  undatedImages.forEach(undated => {
    // Insert at a random position within the current sequence
    const insertIndex = Math.floor(Math.random() * (finalSequence.length + 1));
    finalSequence.splice(insertIndex, 0, undated);
  });

  // 6. Return pure ImageData
  return finalSequence.map(item => item.data);
};

export const GALLERY_IMAGES: ImageData[] = processImages();
