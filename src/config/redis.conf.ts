import Redis from "ioredis";
const redis = new Redis();

export const setGuildLocation = (guildID: string, location: string) => {
  redis.set(guildID, location);
  return "OK";
};

export const getGuildLocation = async (guildID: string) => {
  let results;
  await redis
    .get(guildID)
    .then(async (res) => {
      console.log(res);
      results = res;
    })
    .catch((err) => {
      console.error(err);
      results = null;
    });
  console.log(results);
  return results;
};
