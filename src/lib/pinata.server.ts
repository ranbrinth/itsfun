import { PINATA_JWT } from "./secrets.server";

export type PinInput = {
  name: string;
  symbol: string;
  description: string;
  imageBase64: string;
  imageType: string;
  twitter: string;
  telegram: string;
  website: string;
};

function gateway(cid: string) {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

export async function pinMetadata(input: PinInput): Promise<{ uri: string; image: string }> {
  const raw = input.imageBase64.replace(/^data:[^;]+;base64,/, "");
  const bytes = Buffer.from(raw, "base64");
  if (bytes.length < 32) throw new Error("Image is empty.");
  if (bytes.length > 1_500_000) throw new Error("Image must be under 1.5 MB.");

  const ext = input.imageType.includes("png")
    ? "png"
    : input.imageType.includes("gif")
      ? "gif"
      : input.imageType.includes("webp")
        ? "webp"
        : "jpg";

  const form = new FormData();
  form.append("file", new Blob([bytes], { type: input.imageType || "image/png" }), `logo.${ext}`);
  form.append("pinataMetadata", JSON.stringify({ name: `${input.symbol}-logo` }));

  const fileRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: form,
  });
  if (!fileRes.ok) {
    throw new Error(`Pinata image upload failed (${fileRes.status}).`);
  }
  const fileJson = (await fileRes.json()) as { IpfsHash?: string };
  if (!fileJson.IpfsHash) throw new Error("Pinata did not return an image CID.");
  const image = gateway(fileJson.IpfsHash);

  const meta = {
    name: input.name,
    symbol: input.symbol,
    description: input.description,
    image,
    showName: true,
    createdOn: "https://funned.app",
    twitter: input.twitter,
    telegram: input.telegram,
    website: input.website,
  };

  const jsonRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pinataContent: meta,
      pinataMetadata: { name: `${input.symbol}-meta` },
    }),
  });
  if (!jsonRes.ok) {
    throw new Error(`Pinata metadata upload failed (${jsonRes.status}).`);
  }
  const json = (await jsonRes.json()) as { IpfsHash?: string };
  if (!json.IpfsHash) throw new Error("Pinata did not return a metadata CID.");
  return { uri: gateway(json.IpfsHash), image };
}
